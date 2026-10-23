// controllers/chatController.js
// Bộ xử lý Trợ Lý AI eng4u - Hỏi gì đáp đó chuyên sâu Tiếng Anh & Luyện thi Cambridge IELTS
// Giới hạn phạm vi nghiêm ngặt trong lĩnh vực Tiếng Anh & IELTS (Từ chối câu hỏi ngoài luồng)
// Giao tiếp trực tiếp với Google Gemini qua HTTPS (Port 443) - Hoạt động ổn định trên cả Local và Render

const { getLiveApiKey } = require('./ankiAiController');

const AI_TUTOR_SYSTEM_PROMPT = `Bạn là Trợ lý Học tập AI của eng4u (eng4u IELTS Tutor) — gia sư chuyên sâu về Tiếng Anh và luyện thi Cambridge IELTS.

================ PHẠM VI HỖ TRỢ NGHIÊM NGẶT (STRICT DOMAIN BOUNDARY) ================
1. BẠN CHỈ ĐƯỢC PHÉP TRẢ LỜI CÁC CÂU HỎI LIÊN QUAN ĐẾN:
   - Học Tiếng Anh và luyện thi Cambridge IELTS (cả 4 kỹ năng: Reading, Listening, Writing, Speaking).
   - Tra nghĩa từ vựng, cụm từ học thuật (Collocations, Idioms, Phrasal Verbs), phiên âm quốc tế IPA.
   - Giải thích ngữ pháp tiếng Anh, phân tích cấu trúc câu.
   - Nâng cấp câu văn (Sentence Upgrade) từ câu đơn giản lên các mức Band 6.5, 7.5 và 8.5+.
   - Hướng dẫn chiến thuật làm các dạng bài thi Cambridge IELTS (True/False/Not Given, Heading Matching, Multiple Choice, Map Labelling...).
   - Đóng vai giám khảo hỏi đáp luyện nói Speaking hoặc góp ý sửa lỗi bài viết Writing.
   - Phương pháp ghi nhớ ngắt quãng (Spaced Repetition / Flashcard Anki).

2. TỪ CHỐI CÁC CÂU HỎI NGOÀI PHẠM VI (TUYỆT ĐỐI TUÂN THỦ):
   - Nếu người dùng hỏi các chủ đề KHÔNG thuộc phạm vi học tiếng Anh/IELTS (ví dụ: lập trình, viết code phần mềm, chính trị, thể thao giải trí, ẩm thực, tình cảm cá nhân, thời tiết ngoài lề...), bạn PHẢI TỪ CHỐI LỊCH SỰ bằng câu trả lời tương tự như sau:
   "Dạ, mình là Trợ lý Học tập của eng4u, chuyên hỗ trợ bạn về học tiếng Anh và luyện thi Cambridge IELTS. Bạn vui lòng đặt câu hỏi liên quan đến từ vựng, ngữ pháp, các kỹ năng IELTS (Reading, Listening, Writing, Speaking) hoặc mẹo làm bài thi để mình hỗ trợ bạn tốt nhất nhé! 😊"

================ NGUYÊN TẮC PHẢN HỒI (HỎI GÌ ĐÁP ĐÓ) ================
- Phong cách: Thân thiện, gần gũi, đi thẳng vào trọng tâm câu hỏi của người học ("hỏi gì đáp đó").
- Ngôn ngữ: Dùng tiếng Việt tự nhiên, giản dị, dễ hiểu. Tuyệt đối KHÔNG dùng từ ngữ đao to búa lớn hay từ ngữ hàn lâm rườm rà.
- Định dạng: Trình bày rõ ràng, dùng gạch đầu dòng và in đậm các từ vựng cốt lõi.
- Tích hợp Flashcard Anki: BẤT KỲ KHI NÀO trong câu trả lời có từ vựng hoặc cụm từ tiếng Anh hay (khoảng 1 đến 3 từ/cụm từ), bạn BẮT BUỘC đính kèm ở CUỐI CÙNG của tin nhắn cặp thẻ <ANKI_JSON>[...]</ANKI_JSON> để hệ thống tự tạo nút bấm "Lưu 1-click vào Flashcard Anki", định dạng JSON chuẩn:
<ANKI_JSON>[{"word": "từ hoặc cụm từ", "ipa": "/phiên âm IPA/", "pos": "từ loại (n/v/adj/phr)", "meaningVi": "nghĩa tiếng Việt ngắn gọn", "exampleSentence": "1 câu ví dụ tiếng Anh hoàn chỉnh chứa từ đó"}]</ANKI_JSON>`;

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
 * Kiểm tra câu hỏi người dùng có nằm ngoài phạm vi học tiếng Anh/IELTS không
 */
function isOffTopicQuery(text) {
  const lower = (text || '').toLowerCase();
  const offTopicKeywords = [
    'viết code', 'lập trình', 'python', 'javascript', 'html', 'css', 'react', 'java', 'c++', 'sql',
    'bóng đá', 'chelsea', 'mu', 'arsenal', 'real madrid', 'barca',
    'nấu ăn', 'công thức nấu', 'thời tiết hôm nay', 'chính trị', 'bầu cử', 'bitcoin', 'crypto',
    'tâm sự tình cảm', 'người yêu', 'chiêm tinh', 'tử vi', 'bói toán'
  ];

  // Nếu chứa từ khóa ngoài luồng và không có từ khóa tiếng anh/ielts nào đi kèm
  const hasOffTopic = offTopicKeywords.some((kw) => lower.includes(kw));
  const hasEnglishContext = lower.includes('tiếng anh') || lower.includes('english') || lower.includes('ielts') || lower.includes('dịch') || lower.includes('translate');

  return hasOffTopic && !hasEnglishContext;
}

/**
 * Bộ trả lời dự phòng thông minh khi mạng hoặc API Key bị gián đoạn tạm thời
 */
function buildSmartFallbackReply(lastUserText) {
  const lower = (lastUserText || '').toLowerCase();

  // 1. Kiểm tra ngoài phạm vi (Domain restriction)
  if (isOffTopicQuery(lastUserText)) {
    return {
      reply: `Dạ, mình là Trợ lý Học tập của eng4u, chuyên hỗ trợ bạn về học tiếng Anh và luyện thi Cambridge IELTS.

Bạn vui lòng đặt câu hỏi liên quan đến từ vựng, ngữ pháp, các kỹ năng IELTS (Reading, Listening, Writing, Speaking) hoặc mẹo làm đề thi để mình hỗ trợ tốt nhất nhé! 😊`,
      vocabItems: [],
    };
  }

  // 2. Phân biệt False vs Not Given
  if (lower.includes('false') && lower.includes('not given')) {
    return {
      reply: `Đây là mẹo đơn giản và hiệu quả nhất để bạn phân biệt **FALSE** và **NOT GIVEN** trong bài đọc Cambridge IELTS:

• **Chọn FALSE khi:** Bài đọc có thông tin **trái ngược hoàn toàn** với câu đề bài (bạn có thể gạch chân được dẫn chứng mang nghĩa đối lập trực tiếp trong bài).
  *Ví dụ:* Bài đọc viết "Khách được vào cổng miễn phí", câu hỏi ghi "Khách phải mua vé vào cổng" → Chọn **FALSE**.

• **Chọn NOT GIVEN khi:** Bài đọc **không hề nhắc tới** khía cạnh thông tin đó, hoặc bạn phải tự suy diễn thêm chứ tác giả không khẳng định.
  *Ví dụ:* Bài đọc viết "Công viên mở cửa lúc 8h sáng", câu hỏi ghi "Công viên đông khách nhất vào ngày Chủ nhật" (bài không hề so sánh số lượng khách giữa các ngày) → Chọn **NOT GIVEN**.

💡 **Quy tắc vàng:** Nếu tìm khắp đoạn văn liên quan mà không thấy từ khóa hoặc ý tương đương để chứng minh đúng hay sai → Hãy tự tin chọn **NOT GIVEN**!`,
      vocabItems: [
        {
          word: 'contradict',
          ipa: '/ˌkɒn.trəˈdɪkt/',
          pos: 'v',
          meaningVi: 'mâu thuẫn, trái ngược với thông tin trong bài',
          exampleSentence: 'The statement directly contradicts the information provided in paragraph 3.',
        },
      ],
    };
  }

  // 3. Nâng cấp câu (Sentence Upgrade)
  if (lower.includes('nâng cấp') || lower.includes('upgrade') || lower.includes('viết lại')) {
    const inputSentence = lastUserText.replace(/nâng cấp câu:?/i, '').replace(/nâng cấp:?/i, '').replace(/["']/g, '').trim() || 'Education is very important.';
    return {
      reply: `Dưới đây là 3 mức nâng cấp tự nhiên cho ý câu của bạn:

• **Mức 6.5 (Rõ ràng, chuẩn ngữ pháp):**
  "Acquiring a solid education plays a crucial role in shaping a person's future."

• **Mức 7.5 (Câu phức, từ vựng học thuật tốt):**
  "It is widely acknowledged that access to quality education serves as a fundamental catalyst for personal and professional advancement."

• **Mức 8.5+ (Tự nhiên và sắc sảo như người bản xứ):**
  "Quality education remains an indispensable cornerstone for fostering intellectual growth and societal prosperity."

💡 **Cụm từ đắt giá vừa dùng:**
- **serve as a fundamental catalyst**: đóng vai trò như một đòn bẩy nền tảng.
- **indispensable cornerstone**: nền tảng cốt lõi không thể thiếu.
- **foster intellectual growth**: thúc đẩy sự phát triển trí tuệ.`,
      vocabItems: [
        {
          word: 'indispensable cornerstone',
          ipa: '/ˌɪn.dɪˈspen.sə.bəl ˈkɔː.nə.stəʊn/',
          pos: 'phr',
          meaningVi: 'nền tảng cốt lõi không thể thiếu',
          exampleSentence: 'Quality education remains an indispensable cornerstone for societal prosperity.',
        },
        {
          word: 'foster intellectual growth',
          ipa: '/ˈfɒs.tər ˌɪn.təˈlek.tʃu.əl ɡrəʊθ/',
          pos: 'phr',
          meaningVi: 'thúc đẩy sự phát triển trí tuệ',
          exampleSentence: 'Universities aim to foster intellectual growth and critical thinking among students.',
        },
      ],
    };
  }

  // 4. Tra từ vựng chủ đề Môi trường / Environment
  if (lower.includes('môi trường') || lower.includes('environment')) {
    return {
      reply: `Dưới đây là **các cụm từ học thuật (Collocations) rất dễ ghi điểm** trong IELTS chủ đề **Môi trường (Environment)**:

1. **curb carbon emissions** (/kɜːb ˈkɑː.bən ɪˈmɪʃ.ənz/): cắt giảm lượng khí thải nhà kính/carbon.
2. **deplete natural resources** (/dɪˈpliːt ˈnætʃ.ər.əl rɪˈzɔː.sɪz/): làm cạn kiệt tài nguyên thiên nhiên.
3. **eco-friendly alternatives** (/ˈiː.kəʊˌfrend.li ɒlˈtɜː.nə.tɪvz/): các giải pháp thay thế thân thiện với môi trường.
4. **maintain ecological balance** (/meɪnˈteɪn ˌiː.kəˈlɒdʒ.ɪ.kəl ˈbæl.əns/): duy trì cân bằng sinh thái.

Bạn có thể bấm nút **+ Lưu vào Flashcard Anki** bên dưới để học và ôn lại bất cứ lúc nào nhé!`,
      vocabItems: [
        {
          word: 'curb carbon emissions',
          ipa: '/kɜːb ˈkɑː.bən ɪˈmɪʃ.ənz/',
          pos: 'phr',
          meaningVi: 'cắt giảm lượng khí thải carbon',
          exampleSentence: 'Strict policies are urgently needed to curb carbon emissions.',
        },
        {
          word: 'deplete natural resources',
          ipa: '/dɪˈpliːt ˈnætʃ.ər.əl rɪˈzɔː.sɪz/',
          pos: 'phr',
          meaningVi: 'làm cạn kiệt tài nguyên thiên nhiên',
          exampleSentence: 'Overconsumption threatens to deplete natural resources rapidly.',
        },
      ],
    };
  }

  // 5. Câu hỏi tiếng Anh thông thường
  return {
    reply: `Mình đã nhận được câu hỏi của bạn! Là trợ lý chuyên sâu về tiếng Anh và luyện thi IELTS của eng4u, mình có thể giúp bạn:

• Giải thích ngữ pháp và sửa lỗi câu tiếng Anh.
• Nâng cấp câu văn đơn giản lên các mức Band 6.5, 7.5 và 8.5+.
• Chia sẻ mẹo làm bài Reading & Listening các bộ đề Cambridge.
• Gợi ý từ vựng học thuật theo chủ đề để lưu trực tiếp vào Flashcard Anki.

Bạn hãy gửi câu tiếng Anh hoặc thắc mắc cụ thể để mình giải đáp ngay nhé!`,
    vocabItems: [],
  };
}

exports.handleChat = async (req, res) => {
  try {
    const { messages = [] } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập nội dung câu hỏi.',
      });
    }

    const lastMessage = messages[messages.length - 1];
    const lastUserText = lastMessage?.content || '';

    // Kiểm tra nhanh câu hỏi ngoài phạm vi trước khi gọi API để tiết kiệm thời gian
    if (isOffTopicQuery(lastUserText)) {
      const offTopicReply = buildSmartFallbackReply(lastUserText);
      return res.json({
        success: true,
        model: 'eduflow-domain-guard',
        reply: offTopicReply.reply,
        vocabItems: [],
      });
    }

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
        // Ghép system instruction vào tin nhắn đầu tiên của user
        const text = idx === 0 && role === 'user'
          ? `${AI_TUTOR_SYSTEM_PROMPT}\n\n---\nCâu hỏi của người học:\n${msg.content}`
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
          parts: [{ text: AI_TUTOR_SYSTEM_PROMPT }],
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
                temperature: 0.35,
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

    // Nếu không kết nối được Gemini hoặc hết quota, sử dụng bộ phản hồi thông minh dự phòng
    const fallback = buildSmartFallbackReply(lastUserText);
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
      message: 'Trợ lý AI đang bận, bạn vui lòng thử lại sau giây lát nhé.',
    });
  }
};
