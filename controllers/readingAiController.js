// controllers/readingAiController.js
// Bộ phân tích dẫn chứng & giải thích bẫy đề Cambridge Reading bằng Gemini AI IELTS 9.0

const { getLiveApiKey } = require('./ankiAiController');

const READING_AI_PROMPT = `Bạn là một cựu giám khảo chấm thi IELTS và chuyên gia học thuật Cambridge 9.0.
Nhiệm vụ của bạn là phân tích câu hỏi Cambridge Reading, trích xuất câu dẫn chứng chính xác từ đoạn văn và giải thích bẫy đề giúp học viên hiểu sâu sắc tại sao đáp án lại đúng/sai.

Bạn PHẢI trả về ĐÚNG MỘT JSON OBJECT duy nhất (không bọc trong markdown code fence, chỉ trả về chuỗi JSON thuần) có cấu trúc:
{
  "evidenceQuote": "Trích nguyên văn chính xác 1-2 câu chứa dẫn chứng trong đoạn văn được cung cấp.",
  "paragraphLetter": "Ký tự đoạn văn (ví dụ: A, B, C, D...)",
  "paraphraseAnalysis": [
    {
      "questionKeyword": "Từ hoặc cụm từ trong câu hỏi",
      "passageMatch": "Từ hoặc cụm từ tương đương trong câu dẫn chứng của bài đọc",
      "note": "Giải thích ngắn sự tương đồng nghĩa học thuật"
    }
  ],
  "coreReason": "Giải thích cô đọng (2-3 câu) vì sao đáp án đúng lại là đáp án này.",
  "trapExplanation": "Chỉ rõ bẫy đề của Cambridge (ví dụ: tại sao là FALSE chứ không phải NOT GIVEN; hoặc tại sao phương án của thí sinh chọn bị đánh lạc hướng).",
  "keyVocabulary": {
    "collocation": "Cụm từ học thuật đắt giá nhất trích ra từ câu dẫn chứng",
    "vietnameseHint": "Gợi ý nghĩa tiếng Việt ngắn gọn + loại từ",
    "clozeSentence": "Câu dẫn chứng với cụm từ trên được bọc trong {{c1::cụm_từ::gợi ý tiếng Việt}}"
  }
}

Quy tắc bắt buộc:
- Tuyệt đối chính xác theo nội dung đoạn văn được cung cấp.
- Giải thích bằng tiếng Việt sư phạm, dễ hiểu, nhấn mạnh vào tư duy làm bài IELTS Reading Band 8.0+.
- evidenceQuote phải được trích NGUYÊN VĂN từ đoạn văn, không tự bịa đặt câu mới.`;

// Parser an toàn cho chuỗi JSON trả về từ LLM
function cleanAndParseJson(rawText) {
  if (!rawText) return null;
  let text = rawText.trim();

  // Loại bỏ markdown code block nếu có
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    // Thử trích xuất khối {...} bằng regex
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.warn('Regex JSON parse failed:', e.message);
      }
    }
    return null;
  }
}

// Fallback phân tích khi không có API key hoặc offline
function generateFallbackExplanation(body) {
  const { paragraphLetter, paragraphText, questionText, correctAnswer, userAnswer } = body;
  const letter = paragraphLetter || 'A';
  const sentences = (paragraphText || '').split(/(?<=[.?!])\s+/).filter(Boolean);
  const evidence = sentences[0] || paragraphText || 'Dẫn chứng nằm trong đoạn văn được chỉ định.';

  return {
    evidenceQuote: evidence,
    paragraphLetter: letter,
    paraphraseAnalysis: [
      {
        questionKeyword: questionText ? questionText.slice(0, 30) : 'Từ khóa trong câu hỏi',
        passageMatch: 'Cụm từ tương đồng trong bài đọc',
        note: 'Cambridge sử dụng thủ thuật Paraphrase đồng nghĩa học thuật',
      },
    ],
    coreReason: `Đáp án chính xác là "${correctAnswer}". Đoạn ${letter} nêu rõ thông tin đối chiếu tương ứng với câu hỏi.`,
    trapExplanation: userAnswer && userAnswer !== correctAnswer
      ? `Bạn đã chọn "${userAnswer}". Bẫy phổ biến của Cambridge là sử dụng từ vựng giống nhau nhưng thay đổi phạm vi tuyệt đối/tương đối.`
      : 'Thí sinh cần chú ý các trạng từ chỉ tần suất và mức độ để tránh bẫy của đề thi.',
    keyVocabulary: {
      collocation: 'academic analysis',
      vietnameseHint: 'phân tích học thuật (noun phrase)',
      clozeSentence: `The passage demonstrates that {{c1::academic analysis::phân tích học thuật (noun phrase)}} is essential for understanding evidence.`,
    },
  };
}

exports.explainReadingQuestion = async (req, res) => {
  try {
    const {
      passageTitle = '',
      paragraphLetter = 'A',
      paragraphText = '',
      questionNumber = 1,
      questionType = 'reading_question',
      questionText = '',
      options = [],
      userAnswer = '',
      correctAnswer = '',
      explanation = '',
    } = req.body;

    if (!questionText && !paragraphText) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu dữ liệu câu hỏi hoặc đoạn văn bài đọc.',
      });
    }

    const apiKey = getLiveApiKey();

    if (apiKey) {
      const candidateModels = [
        'gemini-flash-lite-latest',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
      ];

      const userPrompt = `Bài đọc: ${passageTitle}
Đoạn văn [${paragraphLetter}]:
"""
${paragraphText}
"""

Câu hỏi số ${questionNumber} (Dạng: ${questionType}):
"${questionText}"
${options && options.length > 0 ? `Các phương án lựa chọn:\n${options.map((o) => `- ${o.id || o.label}: ${o.text}`).join('\n')}` : ''}

Đáp án đúng của đề thi: "${correctAnswer}"
Đáp án thí sinh đã chọn: "${userAnswer || '(Chưa chọn / Bỏ trống)'}"
${explanation ? `Gợi ý ban đầu: "${explanation}"` : ''}

Hãy phân tích và trả về đúng JSON theo yêu cầu hệ thống.`;

      for (const model of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 9000);

          const apiResponse = await fetch(geminiUrl, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${READING_AI_PROMPT}\n\n${userPrompt}` }],
                },
              ],
              generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 1200,
                responseMimeType: 'application/json',
              },
            }),
          });

          clearTimeout(timeoutId);

          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            const textPart = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsed = cleanAndParseJson(textPart);

            if (parsed && parsed.evidenceQuote) {
              return res.json({
                success: true,
                source: `Gemini AI (${model})`,
                data: parsed,
              });
            }
          }
        } catch (mErr) {
          console.warn(`[Reading AI] Model ${model} failed:`, mErr.message);
        }
      }
    }

    // Fallback an toàn nếu Gemini tạm thời gián đoạn
    const fallback = generateFallbackExplanation(req.body);
    return res.json({
      success: true,
      source: 'reading-academic-engine (fallback)',
      data: fallback,
    });
  } catch (error) {
    console.error('explainReadingQuestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi phân tích câu hỏi bằng AI.',
    });
  }
};
