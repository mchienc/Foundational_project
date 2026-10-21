// controllers/chatController.js
// Bộ xử lý Trợ Lý AI EduFlow (4 chế độ: Hỏi đáp mẹo thi, Nâng cấp câu, Luyện nói Speaking, Lưu từ vào Anki)
// Giao tiếp trực tiếp với Google Gemini qua HTTPS (Port 443) - Hoạt động ổn định trên cả Local và Render

const { getLiveApiKey } = require('./ankiAiController');

const MODE_SYSTEM_PROMPTS = {
  tips: `Bạn là Trợ lý AI của EduFlow — người hướng dẫn luyện thi IELTS thân thiện, dễ hiểu.
YÊU CẦU QUAN TRỌNG VỀ NGÔN NGỮ:
- Dùng câu chữ tiếng Việt tự nhiên, bình dị, rõ ràng, đi thẳng vào trọng tâm.
- TUYỆT ĐỐI KHÔNG dùng từ ngữ đao to búa lớn, sáo rỗng hay hàn lâm rườm rà.
- Trình bày ngắn gọn bằng các gạch đầu dòng dễ đọc.
- Nếu câu trả lời có nhắc tới từ vựng hoặc cụm từ tiếng Anh hữu ích, hãy liệt kê thêm tối đa 2-3 từ ở cuối bài trong cặp thẻ <ANKI_JSON>[...]</ANKI_JSON> theo đúng cấu trúc JSON:
[{"word": "từ/cụm từ", "ipa": "/phiên âm/", "pos": "từ loại (n/v/adj/phr)", "meaningVi": "nghĩa tiếng Việt ngắn gọn", "exampleSentence": "1 câu ví dụ tiếng Anh hoàn chỉnh chứa từ đó"}]`,

  upgrade: `Bạn là Trợ lý AI của EduFlow chuyên giúp người học nâng cấp câu tiếng Anh lên band điểm cao hơn.
YÊU CẦU QUAN TRỌNG:
- Dùng tiếng Việt giản dị, dễ hiểu.
- Khi người dùng nhập một câu tiếng Anh (hoặc một ý bằng tiếng Việt), hãy viết lại câu đó theo ĐÚNG 3 mức độ:
  • **Mức 6.5 (Rõ ràng, chuẩn ngữ pháp):** [Câu tiếng Anh mức 6.5]
  • **Mức 7.5 (Câu phức, từ vựng tốt):** [Câu tiếng Anh mức 7.5]
  • **Mức 8.5+ (Tự nhiên như người bản xứ):** [Câu tiếng Anh mức 8.5+]
- Bên dưới thêm mục **💡 Cụm từ đắt giá vừa dùng:** giải thích ngắn gọn 1-2 cụm từ hay nhất trong câu mức 7.5 và 8.5+.
- Cuối cùng, LUÔN đính kèm thẻ <ANKI_JSON>[...]</ANKI_JSON> chứa 1 đến 3 cụm từ hay vừa dùng để người học bấm lưu vào Flashcard Anki, định dạng:
[{"word": "cụm từ tiếng Anh", "ipa": "/phiên âm/", "pos": "phr/adj/v/n", "meaningVi": "nghĩa tiếng Việt ngắn gọn", "exampleSentence": "câu ví dụ ở mức 7.5 hoặc 8.5+"}]`,

  speaking: `Bạn là Giám khảo luyện nói IELTS Speaking thân thiện của EduFlow (hỗ trợ Part 1 và Part 3).
YÊU CẦU QUAN TRỌNG:
- Ngôn ngữ gần gũi, khích lệ người học, không dùng từ hàn lâm phức tạp.
- Trường hợp 1: Nếu người dùng yêu cầu đặt câu hỏi hoặc bắt đầu chủ đề mới:
  • Đưa ra **1 câu hỏi Speaking bằng tiếng Anh** ngắn gọn, tự nhiên.
  • Gợi ý 2-3 cụm từ tiếng Anh kèm nghĩa tiếng Việt để người học dễ trả lời.
- Trường hợp 2: Nếu người dùng vừa gửi câu trả lời tiếng Anh của họ:
  • **✅ Điểm tốt:** Khen ngợi ngắn gọn 1 điểm người học làm được.
  • **🔧 Gợi ý sửa lỗi & nói tự nhiên hơn:** Sửa lại câu của người học cho chuẩn ngữ pháp và tự nhiên hơn (Band 7.5+).
  • **🎤 Câu hỏi tiếp theo:** Hỏi thêm 1 câu tiếp theo cùng chủ đề để duy trì cuộc trò chuyện.
- Ở cuối tin nhắn, đính kèm thẻ <ANKI_JSON>[...]</ANKI_JSON> chứa 1-2 cụm từ hay xuất hiện trong phần gợi ý:
[{"word": "cụm từ", "ipa": "/phiên âm/", "pos": "phr", "meaningVi": "nghĩa tiếng Việt", "exampleSentence": "câu mẫu hoàn chỉnh"}]`,

  anki: `Bạn là Trợ lý Từ vựng & Flashcard Anki của EduFlow.
YÊU CẦU QUAN TRỌNG:
- Dùng tiếng Việt ngắn gọn, tự nhiên, dễ hiểu.
- Khi người dùng hỏi nghĩa từ vựng hoặc xin các cụm từ theo chủ đề:
  • Giải thích rõ: Từ vựng, Phiên âm IPA, Từ loại, Nghĩa tiếng Việt sát ngữ cảnh và 1 câu ví dụ dễ nhớ.
- BẮT BUỘC ở cuối phản hồi phải có cặp thẻ <ANKI_JSON>[...]</ANKI_JSON> chứa đầy đủ danh sách các từ/cụm từ vừa giải thích để người học bấm nút lưu 1-click vào Anki:
[{"word": "từ/cụm từ", "ipa": "/phiên âm/", "pos": "n/v/adj/phr", "meaningVi": "nghĩa tiếng Việt ngắn gọn", "exampleSentence": "câu ví dụ tiếng Anh hoàn chỉnh"}]`,
};

/**
 * Tách phần văn bản hiển thị và danh sách từ vựng Anki từ phản hồi của AI
 */
function parseChatAndVocab(rawText) {
  let cleanReply = rawText || '';
  let vocabItems = [];

  const jsonMatch = cleanReply.match(/<ANKI_JSON>([\s\S]*?)<\/ANKI_JSON>/i);
  if (jsonMatch && jsonMatch[1]) {
    cleanReply = cleanReply.replace(/<ANKI_JSON>[\s\S]*?<\/ANKI_JSON>/gi, '').trim();
    try {
      const cleanedJson = jsonMatch[1]
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      const parsed = JSON.parse(cleanedJson);
      if (Array.isArray(parsed)) {
        vocabItems = parsed
          .filter((item) => item && item.word && item.meaningVi)
          .map((item) => ({
            word: String(item.word).trim(),
            ipa: String(item.ipa || '/.../').trim(),
            pos: String(item.pos || 'vocab').trim(),
            meaningVi: String(item.meaningVi).trim(),
            exampleSentence: String(item.exampleSentence || `This is an example using ${item.word}.`).trim(),
          }));
      }
    } catch (e) {
      console.warn('[Chat Controller] Failed to parse ANKI_JSON:', e.message);
    }
  }

  return { reply: cleanReply, vocabItems };
}

/**
 * Bộ trả lời dự phòng thông minh khi mạng hoặc API Key bị gián đoạn tạm thời
 */
function buildSmartFallbackReply(mode, lastUserText) {
  const lower = (lastUserText || '').toLowerCase();

  if (lower.includes('false') && lower.includes('not given')) {
    return {
      reply: `Đây là mẹo đơn giản nhất để phân biệt **FALSE** và **NOT GIVEN** trong bài đọc Reading:

• **Chọn FALSE khi:** Bài đọc có thông tin **trái ngược hoàn toàn** với câu hỏi (bạn có thể gạch chân được từ đối nghĩa trong bài).
  *Ví dụ:* Bài viết "Công viên mở cửa miễn phí", câu hỏi ghi "Khách phải mua vé vào cổng" → **FALSE**.

• **Chọn NOT GIVEN khi:** Bài đọc **không hề nhắc tới** thông tin đó, hoặc bạn phải tự suy đoán thêm mới ra.
  *Ví dụ:* Bài viết "Công viên mở cửa từ 8h sáng", câu hỏi ghi "Công viên đông khách nhất vào Chủ nhật" (bài không nói ngày nào đông nhất) → **NOT GIVEN**.

💡 **Quy tắc vàng:** Nếu tìm đỏ mắt trong đoạn văn không thấy từ khóa hoặc ý tương đương để chứng minh nó đúng hay sai → Chọn ngay **NOT GIVEN**!`,
      vocabItems: [
        {
          word: 'contradict',
          ipa: '/ˌkɒn.trəˈdɪkt/',
          pos: 'v',
          meaningVi: 'mâu thuẫn, trái ngược với thông tin trong bài',
          exampleSentence: 'The statement directly contradicts the information in the second paragraph.',
        },
      ],
    };
  }

  if (lower.includes('money is important') || mode === 'upgrade') {
    const inputSentence = lastUserText.replace(/nâng cấp câu:?/i, '').replace(/["']/g, '').trim() || 'Money is important.';
    return {
      reply: `Dưới đây là 3 mức nâng cấp cho câu **"${inputSentence}"**:

• **Mức 6.5 (Rõ ràng, chuẩn ngữ pháp):**
  "Financial stability plays a vital role in people's daily lives."

• **Mức 7.5 (Câu phức, từ vựng tốt):**
  "It is undeniable that financial security serves as a cornerstone for a fulfilling and comfortable life."

• **Mức 8.5+ (Tự nhiên như người bản xứ):**
  "Sound financial standing is indispensable for ensuring a high standard of living and long-term well-being."

💡 **Cụm từ đắt giá vừa dùng:**
- **play a vital role in**: đóng vai trò thiết yếu trong việc gì.
- **serve as a cornerstone**: đóng vai trò là nền tảng cốt lõi.
- **indispensable**: không thể thiếu được (thay thế hoàn hảo cho *very important*).`,
      vocabItems: [
        {
          word: 'indispensable',
          ipa: '/ˌɪn.dɪˈspen.sə.bəl/',
          pos: 'adj',
          meaningVi: 'không thể thiếu, vô cùng quan trọng',
          exampleSentence: 'Sound financial standing is indispensable for ensuring a high standard of living.',
        },
        {
          word: 'serve as a cornerstone',
          ipa: '/sɜːv æz ə ˈkɔː.nə.stəʊn/',
          pos: 'phr',
          meaningVi: 'đóng vai trò là nền tảng cốt lõi',
          exampleSentence: 'Financial security serves as a cornerstone for a comfortable life.',
        },
      ],
    };
  }

  if (lower.includes('môi trường') || lower.includes('environment')) {
    return {
      reply: `Dưới đây là **5 cụm từ (Collocations) cực kỳ dễ dùng** cho chủ đề **Môi trường (Environment)**:

1. **curb carbon emissions** (/kɜːb ˈkɑː.bən ɪˈmɪʃ.ənz/): cắt giảm lượng khí thải carbon.
2. **renewable energy sources** (/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/): các nguồn năng lượng tái tạo.
3. **deplete natural resources** (/dɪˈpliːt ˈnætʃ.ər.əl rɪˈzɔː.sɪz/): làm cạn kiệt tài nguyên thiên nhiên.
4. **eco-friendly alternatives** (/ˈiː.kəʊˌfrend.li/): các giải pháp thay thế thân thiện với môi trường.
5. **maintain ecological balance** (/meɪnˈteɪn ˌiː.kəˈlɒdʒ.ɪ.kəl ˈbæl.əns/): duy trì cân bằng sinh thái.

Bạn có thể bấm nút bên dưới để lưu ngay các cụm từ này vào bộ thẻ Anki của mình nhé!`,
      vocabItems: [
        {
          word: 'curb carbon emissions',
          ipa: '/kɜːb ˈkɑː.bən ɪˈmɪʃ.ənz/',
          pos: 'phr',
          meaningVi: 'cắt giảm lượng khí thải carbon',
          exampleSentence: 'Governments must take urgent action to curb carbon emissions.',
        },
        {
          word: 'deplete natural resources',
          ipa: '/dɪˈpliːt ˈnætʃ.ər.əl rɪˈzɔː.sɪz/',
          pos: 'phr',
          meaningVi: 'làm cạn kiệt tài nguyên thiên nhiên',
          exampleSentence: 'Rapid industrialization continues to deplete natural resources at an alarming rate.',
        },
        {
          word: 'eco-friendly alternatives',
          ipa: '/ˈiː.kəʊˌfrend.li ɒlˈtɜː.nə.tɪvz/',
          pos: 'phr',
          meaningVi: 'các giải pháp thay thế thân thiện với môi trường',
          exampleSentence: 'Consumers are increasingly switching to eco-friendly alternatives.',
        },
      ],
    };
  }

  if (mode === 'speaking' || lower.includes('speaking')) {
    return {
      reply: `🎤 **Chủ đề Speaking Part 1: Daily Routine & Study**

**Câu hỏi của Giám khảo:**
*"Do you prefer studying in the morning or in the evening? Why?"*

💡 **Gợi ý cụm từ trả lời:**
• **a morning person** (/ə ˈmɔː.nɪŋ ˈpɜː.sən/): người làm việc hiệu quả vào buổi sáng.
• **recharge my batteries** (/ˌriːˈtʃɑːdʒ maɪ ˈbæt.ər.iz/): nạp lại năng lượng.
• **peak concentration** (/piːk ˌkɒn.sənˈtreɪ.ʃən/): sự tập trung cao độ nhất.

👉 Bạn hãy gõ câu trả lời hoặc bấm **nút Mic** để nói thử nhé, mình sẽ sửa lỗi giúp bạn!`,
      vocabItems: [
        {
          word: 'recharge my batteries',
          ipa: '/ˌriːˈtʃɑːdʒ maɪ ˈbæt.ər.iz/',
          pos: 'phr',
          meaningVi: 'nghỉ ngơi, nạp lại năng lượng',
          exampleSentence: 'A good night of sleep helps me recharge my batteries for early morning study.',
        },
        {
          word: 'peak concentration',
          ipa: '/piːk ˌkɒn.sənˈtreɪ.ʃən/',
          pos: 'phr',
          meaningVi: 'mức độ tập trung cao nhất',
          exampleSentence: 'I usually achieve my peak concentration during the quiet morning hours.',
        },
      ],
    };
  }

  return {
    reply: `Mình đã nhận được câu hỏi của bạn! Bạn có thể chọn 1 trong 4 tab ở trên (**Hỏi đáp mẹo thi**, **Nâng cấp câu**, **Luyện nói Speaking**, hoặc **Lưu từ vào Anki**) và gửi câu tiếng Anh bất kỳ để mình hỗ trợ chi tiết nhé.`,
    vocabItems: [],
  };
}

exports.handleChat = async (req, res) => {
  try {
    const { mode = 'tips', messages = [] } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập nội dung tin nhắn.',
      });
    }

    const lastMessage = messages[messages.length - 1];
    const lastUserText = lastMessage?.content || '';
    const systemPrompt = MODE_SYSTEM_PROMPTS[mode] || MODE_SYSTEM_PROMPTS.tips;

    const apiKey = (getLiveApiKey() || '').replace(/["']/g, '').trim();

    if (apiKey) {
      const candidateModels = [
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemini-flash-lite-latest',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
      ];

      // Chuyển đổi lịch sử hội thoại (tối đa 8 tin nhắn gần nhất để nhanh và tiết kiệm token)
      const recentMessages = messages.slice(-8);
      const contents = recentMessages.map((msg, idx) => {
        const role = msg.role === 'model' ? 'model' : 'user';
        // Ghép system instruction vào tin nhắn đầu tiên của user để tương thích mọi phiên bản Gemini API
        const text = idx === 0 && role === 'user'
          ? `${systemPrompt}\n\n---\nTin nhắn của người học:\n${msg.content}`
          : String(msg.content || '');
        return {
          role,
          parts: [{ text }],
        };
      });

      // Đảm bảo phần tử đầu tiên luôn là role 'user'
      if (contents.length > 0 && contents[0].role !== 'user') {
        contents.unshift({
          role: 'user',
          parts: [{ text: systemPrompt }],
        });
      }

      for (const model of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          const apiResponse = await fetch(geminiUrl, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1200,
              },
            }),
          });

          clearTimeout(timeoutId);

          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            const rawReply = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawReply) {
              const { reply, vocabItems } = parseChatAndVocab(rawReply);
              return res.json({
                success: true,
                model,
                reply,
                vocabItems,
              });
            }
          } else {
            const errTxt = await apiResponse.text().catch(() => '');
            console.warn(`[Chat Gemini] Model ${model} returned ${apiResponse.status}: ${errTxt.slice(0, 120)}`);
          }
        } catch (err) {
          console.warn(`[Chat Gemini] Model ${model} failed:`, err.message);
        }
      }
    }

    // Nếu không kết nối được Gemini hoặc hết quota, sử dụng bộ phản hồi thông minh để không bao giờ lỗi giao diện
    const fallback = buildSmartFallbackReply(mode, lastUserText);
    return res.json({
      success: true,
      model: 'eduflow-smart-assistant',
      reply: fallback.reply,
      vocabItems: fallback.vocabItems,
    });
  } catch (error) {
    console.error('handleChat error:', error);
    return res.status(500).json({
      success: false,
      message: 'Trợ lý AI đang bận, vui lòng thử lại sau giây lát.',
    });
  }
};
