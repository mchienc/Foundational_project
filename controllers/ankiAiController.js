// controllers/ankiAiController.js
// Huấn luyện viên IELTS 9.0 & Chuyên gia Anki Cloze Deletion tự động bằng Gemini AI

const fs = require('fs');
const path = require('path');

function getLiveApiKey() {
  // Thử các đường dẫn có thể có của file .env
  const candidatePaths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'online-learning-website/.env'),
  ];

  for (const envPath of candidatePaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('GEMINI_API_KEY=')) {
            const rawVal = trimmed.slice('GEMINI_API_KEY='.length).trim();
            const cleanVal = rawVal.replace(/^["']|["']$/g, '').trim();
            if (cleanVal) {
              process.env.GEMINI_API_KEY = cleanVal;
              return cleanVal;
            }
          }
        }
      }
    } catch (err) {
      console.warn('Cannot read .env dynamically from', envPath, err.message);
    }
  }

  let key = process.env.GEMINI_API_KEY;
  if (key && key.trim()) {
    return key.replace(/["']/g, '').trim();
  }

  return '';
}

const SYSTEM_PROMPT = `Bạn là một huấn luyện viên IELTS 9.0 và chuyên gia ngôn ngữ học thuật. Nhiệm vụ của bạn là chuyển đổi từ vựng, cụm từ hoặc câu văn do tôi cung cấp thành thẻ Anki Cloze Deletion tối ưu cho band 8.0+.

Khi tôi nhập một từ vựng, một cụm từ, hoặc một câu văn:
1. Xác định collocation/cụm từ học thuật đắt giá nhất.
2. Trả về kết quả theo ĐÚNG 3 mục riêng biệt bên dưới để tôi copy nhanh vào Anki:

---
[TEXT]
(Chứa câu học thuật hoàn chỉnh. Nếu tôi đưa câu gốc, hãy ưu tiên dùng câu gốc của tôi. Bọc cụm từ cần học vào cú pháp Cloze: {{c1::cụm_từ::gợi ý nghĩa tiếng Việt ngắn gọn + loại từ/cấu trúc}}. Nếu tôi chỉ đưa từ, hãy tự tạo 1 câu mẫu chuẩn phong cách The Economist hoặc IELTS Writing Task 2).

[BACK EXTRA]
(Tối đa 3 đến 4 dòng, cực kỳ súc tích, đọc xong trong 3-5 giây:
- Dòng 1: Phiên âm + từ loại + nghĩa tiếng Việt vắn tắt.
- Dòng 2: 2 đến 3 từ đồng nghĩa/paraphrase chất lượng cao.
- Dòng 3 [Word Family & Nominalization chọn lọc]: Chỉ chọn 1 trong 2 trường hợp giá trị nhất sau:
    + Cấu trúc Danh từ hóa đắt giá đi kèm Collocation/Giới từ mới (Ví dụ: rely on -> place heavy reliance on; consume -> excessive consumption of).
    + HOẶC cảnh báo bẫy họ từ dễ nhầm lẫn/thay đổi giới từ (Ví dụ: economic vs. economical; deter sb from -> deterrent against).
    *TUYỆT ĐỐI KHÔNG liệt kê bảng N/V/Adj/Adv cơ bản hoặc từ phái sinh chỉ thêm đuôi -ly*).

[TAGS]
(Các thẻ ngắn gọn cách nhau bằng dấu cách, ví dụ: ielts_writing environment nominalization c1)
---

Quy tắc bắt buộc:
- Không giải thích ngoài lề, không viết lời chào hay kết thúc.
- Phần [BACK EXTRA] phải ngắn gọn, tập trung vào tính ứng dụng cho Writing Task 2 và Speaking Part 3.
Quy tắc xử lý Cloze bắt buộc:
- Khi người dùng gửi vào một câu văn: KHÔNG ĐƯỢC đục lỗ một từ đơn lẻ (ví dụ: KHÔNG làm {{c1::deter}}).
- BẮT BUỘC phải gom trọn cụm Collocation tự nhiên chứa từ đó (Ví dụ: {{c1::deter violent crime}}, {{c1::alleviate poverty}}, {{c1::pose a grave threat to}}).
- Câu trong thẻ phải giữ nguyên câu gốc của người dùng (hoặc rút gọn nhẹ nếu câu gốc quá dài), đảm bảo ngữ cảnh thực tế được giữ nguyên.`;

// Parser trích xuất 3 khối [TEXT], [BACK EXTRA], [TAGS]
function parseAnkiResponse(rawText) {
  let text = '';
  let backExtra = '';
  let tags = '';

  const textMatch = rawText.match(/\[TEXT\]\s*([\s\S]*?)(?=\[BACK EXTRA\]|$)/i);
  if (textMatch) {
    text = textMatch[1].trim();
  }

  const backMatch = rawText.match(/\[BACK EXTRA\]\s*([\s\S]*?)(?=\[TAGS\]|$)/i);
  if (backMatch) {
    backExtra = backMatch[1].trim();
  }

  const tagsMatch = rawText.match(/\[TAGS\]\s*([\s\S]*?)$/i);
  if (tagsMatch) {
    tags = tagsMatch[1].trim();
  }

  // Dự phòng nếu định dạng không chứa tag rõ ràng
  if (!text && rawText.includes('{{c1::')) {
    text = rawText;
  }

  return { text, backExtra, tags, raw: rawText };
}

// Bộ phân tích ngôn ngữ học nội bộ (Chế độ Fallback thông minh khi chưa có API Key hoặc offline)
function generateSmartFallback(word, sentence) {
  const cleanWord = (word || '').trim();
  const cleanSentence = (sentence || '').trim();

  // Tìm cụm collocation tự nhiên chứa word trong sentence
  let clozeSentence = cleanSentence;
  let collocation = cleanWord;

  if (cleanSentence) {
    // Regex tìm từ và 1-2 từ lân cận tạo cụm collocation tự nhiên
    const patterns = [
      new RegExp(`(?:to|cannot|can|should|will|would|must)?\\s*(\\b(?:\\w+\\s+)?${cleanWord}(?:\\s+\\w+){1,2}\\b)`, 'i'),
      new RegExp(`(\\b${cleanWord}\\s+\\w+\\b)`, 'i'),
      new RegExp(`(\\b\\w+\\s+${cleanWord}\\b)`, 'i'),
    ];

    for (const pat of patterns) {
      const match = cleanSentence.match(pat);
      if (match && match[1]) {
        collocation = match[1].trim();
        break;
      }
    }

    const escapedColloc = collocation.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    clozeSentence = cleanSentence.replace(
      new RegExp(escapedColloc, 'i'),
      `{{c1::${collocation}::nghĩa học thuật ngữ cảnh (Collocation Band 8.0+)}}`
    );
  } else {
    clozeSentence = `The academic literature underscores the need to examine {{c1::${cleanWord}::nghĩa học thuật}} within contemporary analytical frameworks.`;
  }

  const text = clozeSentence;
  const backExtra = `/${cleanWord}/ • [Chế độ ngoại tuyến]\n• Lưu ý: Cần kết nối Gemini AI để phân tích Collocation & Paraphrase chính xác cho từ này.\n• [Cấu hình]: Đảm bảo GEMINI_API_KEY hợp lệ trong file .env.`;
  const tags = `ielts_vocabulary academic c1`;

  return { text, backExtra, tags, raw: `[TEXT]\n${text}\n\n[BACK EXTRA]\n${backExtra}\n\n[TAGS]\n${tags}` };
}

// Controller chính: Tạo thẻ Anki Cloze Collocation 9.0
exports.generateAnkiCloze = async (req, res) => {
  try {
    const { word, sentence, customApiKey } = req.body;

    if (!word && !sentence) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ít nhất một từ vựng hoặc câu văn ngữ cảnh.',
      });
    }

    const apiKey = (customApiKey || getLiveApiKey()).replace(/["']/g, '').trim();

    // Nếu có API Key, thử gọi danh sách các model Gemini thế hệ mới
    let lastErrorDetails = '';
    if (apiKey) {
      const candidateModels = [
        'gemini-flash-lite-latest',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
      ];

      const userPrompt = `Từ vựng / Cụm từ: ${word || 'Trích xuất từ câu dưới'}\n${
        sentence ? `Câu văn ngữ cảnh: ${sentence}` : ''
      }`;

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
                  parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000,
              },
            }),
          });

          clearTimeout(timeoutId);

          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            const candidate = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (candidate) {
              const parsed = parseAnkiResponse(candidate);
              return res.json({
                success: true,
                source: `Gemini AI (${model})`,
                data: parsed,
              });
            }
          } else {
            const errText = await apiResponse.text().catch(() => '');
            lastErrorDetails = `Model ${model} HTTP ${apiResponse.status}: ${errText.slice(0, 100)}`;
            console.warn(`[Gemini API] ${lastErrorDetails}`);
          }
        } catch (mErr) {
          lastErrorDetails = `Model ${model} Error: ${mErr.message}`;
          console.warn(`[Gemini API] ${lastErrorDetails}`);
        }
      }

      // Nếu đã có API key nhưng các model Gemini đều lỗi, trả về lỗi chi tiết thay vì giả mạo kết quả
      return res.status(502).json({
        success: false,
        message: `Không thể kết nối Gemini AI (${lastErrorDetails || 'Mô hình không phản hồi'}). Vui lòng kiểm tra lại kết nối mạng hoặc API Key.`,
      });
    }

    // Cơ chế Fallback an toàn (Smart Academic Fallback Engine) - CHỈ KHI HOÀN TOÀN KHÔNG CÓ API KEY
    const fallbackResult = generateSmartFallback(word, sentence);
    res.json({
      success: true,
      source: 'smart-academic-engine (offline-safe)',
      data: fallbackResult,
    });
  } catch (error) {
    console.error('generateAnkiCloze error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi tạo thẻ Anki AI.',
    });
  }
};
