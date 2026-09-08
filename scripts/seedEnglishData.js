// scripts/seedEnglishData.js
// Khởi tạo các bảng CSDL cho hệ thống học Tiếng Anh và nạp dữ liệu mẫu ban đầu vào MySQL.

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function runSeed() {
  console.log('🚀 Đang bắt đầu khởi tạo CSDL tiếng Anh trong MySQL...');

  try {
    // 1. Đọc và thực thi file create_english_tables.sql
    const sqlPath = path.join(__dirname, '../database/create_english_tables.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    // Tách các câu lệnh theo dấu ;
    const statements = sqlScript
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await db.query(stmt);
    }
    console.log('✅ Đã tạo các bảng CSDL: english_flashcards, english_speaking_lessons, english_listening_lessons, english_transcript_segments, english_sentence_builders, user_srs_progress, user_english_stats.');

    // 2. Nạp dữ liệu Thẻ Flashcard
    const [[{ count: flashcardCount }]] = await db.query('SELECT COUNT(*) AS count FROM english_flashcards');
    if (flashcardCount === 0) {
      const flashcards = [
        {
          word: 'Resilient',
          part_of_speech: 'adjective',
          ipa_uk: '/rɪˈzɪl.jənt/',
          ipa_us: '/rɪˈzɪl.jənt/',
          meaning_vi: 'Kiên cường, dẻo dai; có khả năng phục hồi nhanh chóng sau nghịch cảnh hay khó khăn.',
          meaning_en: 'Able to recover quickly from difficult situations, illness, or change.',
          examples: JSON.stringify([
            { en: 'The local community proved to be remarkably resilient after the severe crisis.', vi: 'Cộng đồng địa phương đã tỏ ra kiên cường phi thường sau cuộc khủng hoảng nghiêm trọng.' },
            { en: 'Developing a resilient mindset is essential for long-term career growth.', vi: 'Phát triển tư duy kiên cường là yếu tố thiết yếu cho sự phát triển sự nghiệp lâu dài.' }
          ]),
          collocations: JSON.stringify(['highly resilient', 'resilient economy', 'resilient mindset', 'remain resilient']),
          image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
          topic: 'IELTS Academic',
          level: 'B2-C1'
        },
        {
          word: 'Meticulous',
          part_of_speech: 'adjective',
          ipa_uk: '/məˈtɪk.jə.ləs/',
          ipa_us: '/məˈtɪk.jə.ləs/',
          meaning_vi: 'Tỉ mỉ, cẩn trọng, trau chuốt kỹ lưỡng từng chi tiết nhỏ nhất.',
          meaning_en: 'Showing great attention to detail; very careful and precise.',
          examples: JSON.stringify([
            { en: 'The senior software architect carried out meticulous research before writing any code.', vi: 'Kiến trúc sư phần mềm cấp cao đã tiến hành nghiên cứu tỉ mỉ trước khi viết bất kỳ đoạn mã nào.' },
            { en: 'Her meticulous attention to design guidelines created a seamless user interface.', vi: 'Sự chú ý tỉ mỉ của cô ấy tới quy chuẩn thiết kế đã tạo nên giao diện người dùng mượt mà.' }
          ]),
          collocations: JSON.stringify(['meticulous planning', 'meticulous attention to detail', 'meticulous researcher', 'meticulous care']),
          image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
          topic: 'IELTS Academic',
          level: 'C1'
        },
        {
          word: 'Pragmatic',
          part_of_speech: 'adjective',
          ipa_uk: '/præɡˈmæt.ɪk/',
          ipa_us: '/præɡˈmæt̬.ɪk/',
          meaning_vi: 'Thực dụng, thực tế; giải quyết vấn đề dựa trên hiệu quả thực tiễn thay vì lý thuyết suông.',
          meaning_en: 'Solving problems in a realistic and practical way, rather than following theoretical ideas.',
          examples: JSON.stringify([
            { en: 'We need to adopt a pragmatic approach to achieve the project deadline within budget.', vi: 'Chúng ta cần áp dụng phương pháp tiếp cận thực tế để đạt tiến độ dự án trong phạm vi ngân sách.' }
          ]),
          collocations: JSON.stringify(['pragmatic approach', 'pragmatic solution', 'pragmatic decision', 'highly pragmatic']),
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
          topic: 'Business English',
          level: 'B2-C1'
        },
        {
          word: 'Ubiquitous',
          part_of_speech: 'adjective',
          ipa_uk: '/juːˈbɪk.wɪ.təs/',
          ipa_us: '/juːˈbɪk.wə.t̬əs/',
          meaning_vi: 'Phổ biến khắp nơi, có mặt ở mọi nơi cùng một lúc.',
          meaning_en: 'Seeming to be everywhere or in several places at the same time.',
          examples: JSON.stringify([
            { en: 'Smartphones and artificial intelligence tools have become ubiquitous in modern academic life.', vi: 'Điện thoại thông minh và các công cụ trí tuệ nhân tạo đã trở nên phổ biến khắp nơi trong đời sống học thuật hiện đại.' }
          ]),
          collocations: JSON.stringify(['become ubiquitous', 'ubiquitous presence', 'ubiquitous technology']),
          image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
          topic: 'IELTS Academic',
          level: 'C1-C2'
        },
        {
          word: 'Ambiguous',
          part_of_speech: 'adjective',
          ipa_uk: '/æmˈbɪɡ.ju.əs/',
          ipa_us: '/æmˈbɪɡ.ju.əs/',
          meaning_vi: 'Mơ hồ, nhập nhằng, có thể hiểu theo nhiều nghĩa khác nhau.',
          meaning_en: 'Having or expressing more than one possible meaning, sometimes intentionally.',
          examples: JSON.stringify([
            { en: 'The survey question was deliberately ambiguous to test candidates critical thinking.', vi: 'Câu hỏi khảo sát đã được cố tình làm mơ hồ để kiểm tra tư duy phản biện của ứng viên.' }
          ]),
          collocations: JSON.stringify(['highly ambiguous', 'ambiguous statement', 'remain ambiguous', 'ambiguous wording']),
          image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
          topic: 'Academic Writing',
          level: 'B2-C1'
        }
      ];

      for (const card of flashcards) {
        await db.query(
          `INSERT INTO english_flashcards 
           (word, part_of_speech, ipa_uk, ipa_us, meaning_vi, meaning_en, examples, collocations, image_url, topic, level)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            card.word,
            card.part_of_speech,
            card.ipa_uk,
            card.ipa_us,
            card.meaning_vi,
            card.meaning_en,
            card.examples,
            card.collocations,
            card.image_url,
            card.topic,
            card.level
          ]
        );
      }
      console.log(`✅ Đã nạp ${flashcards.length} thẻ từ vựng vào bảng english_flashcards.`);
    }

    // 3. Nạp dữ liệu Luyện Phát Âm (Speaking Lessons)
    const [[{ count: speakingCount }]] = await db.query('SELECT COUNT(*) AS count FROM english_speaking_lessons');
    if (speakingCount === 0) {
      const speakingLessons = [
        {
          title: 'Workplace Resilience & Professional Attitude',
          category: 'IELTS Speaking Part 3 / Business English',
          target_sentence: 'She has demonstrated a resilient attitude towards all recent challenges.',
          ipa_full: '/ʃiː hæz ˈdem.ən.streɪ.tɪd ə rɪˈzɪl.jənt ˈæt.ɪ.tjuːd təˈwɔːdz ɔːl ˈriː.sənt ˈtʃæl.ɪn.dʒɪz/',
          translation_vi: 'Cô ấy đã thể hiện thái độ kiên cường trước tất cả những thử thách gần đây.',
          difficulty: 'Medium',
          tips_vi: 'Lưu ý nối âm giữa "demonstrated a" (/ˈdem.ən.streɪ.tɪd‿ə/) và phát âm rõ âm cuối /dz/ của từ "towards".',
          audio_duration_seconds: 4.5,
          words: JSON.stringify([
            { word: 'She', ipa: '/ʃiː/', score: 96, phonemes: [{ phoneme: 'ʃ', score: 98 }, { phoneme: 'iː', score: 95 }] },
            { word: 'has', ipa: '/hæz/', score: 90, phonemes: [{ phoneme: 'h', score: 92 }, { phoneme: 'æ', score: 88 }, { phoneme: 'z', score: 91 }] },
            { word: 'demonstrated', ipa: '/ˈdem.ən.streɪ.tɪd/', score: 93, phonemes: [{ phoneme: 'ˈdem', score: 95 }, { phoneme: 'ən', score: 92 }, { phoneme: 'streɪ', score: 94 }, { phoneme: 'tɪd', score: 90 }] },
            { word: 'a', ipa: '/ə/', score: 100, phonemes: [{ phoneme: 'ə', score: 100 }] },
            { word: 'resilient', ipa: '/rɪˈzɪl.jənt/', score: 95, phonemes: [{ phoneme: 'rɪ', score: 96 }, { phoneme: 'ˈzɪl', score: 93 }, { phoneme: 'jənt', score: 96 }] },
            { word: 'attitude', ipa: '/ˈæt.ɪ.tjuːd/', score: 84, phonemes: [{ phoneme: 'ˈæt', score: 90 }, { phoneme: 'ɪ', score: 85 }, { phoneme: 'tjuːd', score: 77 }] },
            { word: 'towards', ipa: '/təˈwɔːdz/', score: 74, phonemes: [{ phoneme: 'tə', score: 82 }, { phoneme: 'wɔː', score: 76 }, { phoneme: 'dz', score: 65 }] },
            { word: 'all', ipa: '/ɔːl/', score: 98, phonemes: [{ phoneme: 'ɔː', score: 98 }, { phoneme: 'l', score: 97 }] },
            { word: 'recent', ipa: '/ˈriː.sənt/', score: 91, phonemes: [{ phoneme: 'ˈriː', score: 94 }, { phoneme: 'sənt', score: 88 }] },
            { word: 'challenges', ipa: '/ˈtʃæl.ɪn.dʒɪz/', score: 86, phonemes: [{ phoneme: 'ˈtʃæl', score: 90 }, { phoneme: 'ɪn', score: 85 }, { phoneme: 'dʒɪz', score: 83 }] }
          ])
        },
        {
          title: 'Academic Research & Detailed Methodology',
          category: 'IELTS Academic Presentation',
          target_sentence: 'The senior researcher conducted a meticulous investigation into the experimental results.',
          ipa_full: '/ðə ˈsiː.ni.ər rɪˈsɜː.tʃər kənˈdʌk.tɪd ə məˈtɪk.jə.ləs ɪnˌves.tɪˈɡeɪ.ʃən ˈɪn.tuː ði ɪkˌsper.ɪˈmen.təl rɪˈzʌlts/',
          translation_vi: 'Nhà nghiên cứu cấp cao đã tiến hành một cuộc điều tra tỉ mỉ vào các kết quả thử nghiệm.',
          difficulty: 'Hard',
          tips_vi: 'Trọng âm từ "meticulous" rơi vào âm tiết thứ 2 (/məˈtɪk.jə.ləs/). Giữ luồng hơi đều khi phát âm từ "investigation".',
          audio_duration_seconds: 5.2,
          words: JSON.stringify([
            { word: 'The', ipa: '/ðə/', score: 97, phonemes: [{ phoneme: 'ð', score: 96 }, { phoneme: 'ə', score: 98 }] },
            { word: 'senior', ipa: '/ˈsiː.ni.ər/', score: 92, phonemes: [{ phoneme: 'ˈsiː', score: 95 }, { phoneme: 'ni', score: 90 }, { phoneme: 'ər', score: 91 }] },
            { word: 'researcher', ipa: '/rɪˈsɜː.tʃər/', score: 89, phonemes: [{ phoneme: 'rɪ', score: 90 }, { phoneme: 'ˈsɜː', score: 88 }, { phoneme: 'tʃər', score: 89 }] },
            { word: 'conducted', ipa: '/kənˈdʌk.tɪd/', score: 94, phonemes: [{ phoneme: 'kən', score: 95 }, { phoneme: 'ˈdʌk', score: 94 }, { phoneme: 'tɪd', score: 93 }] },
            { word: 'a', ipa: '/ə/', score: 100, phonemes: [{ phoneme: 'ə', score: 100 }] },
            { word: 'meticulous', ipa: '/məˈtɪk.jə.ləs/', score: 92, phonemes: [{ phoneme: 'mə', score: 92 }, { phoneme: 'ˈtɪk', score: 94 }, { phoneme: 'jə', score: 88 }, { phoneme: 'ləs', score: 94 }] },
            { word: 'investigation', ipa: '/ɪnˌves.tɪˈɡeɪ.ʃən/', score: 86, phonemes: [{ phoneme: 'ɪn', score: 90 }, { phoneme: 'ˌves', score: 85 }, { phoneme: 'tɪ', score: 88 }, { phoneme: 'ˈɡeɪ', score: 86 }, { phoneme: 'ʃən', score: 81 }] },
            { word: 'into', ipa: '/ˈɪn.tuː/', score: 95, phonemes: [{ phoneme: 'ˈɪn', score: 96 }, { phoneme: 'tuː', score: 94 }] },
            { word: 'the', ipa: '/ði/', score: 98, phonemes: [{ phoneme: 'ð', score: 98 }, { phoneme: 'i', score: 98 }] },
            { word: 'experimental', ipa: '/ɪkˌsper.ɪˈmen.təl/', score: 88, phonemes: [{ phoneme: 'ɪk', score: 90 }, { phoneme: 'ˌsper', score: 87 }, { phoneme: 'ɪ', score: 89 }, { phoneme: 'ˈmen', score: 89 }, { phoneme: 'təl', score: 85 }] },
            { word: 'results', ipa: '/rɪˈzʌlts/', score: 90, phonemes: [{ phoneme: 'rɪ', score: 92 }, { phoneme: 'ˈzʌlt', score: 90 }, { phoneme: 's', score: 88 }] }
          ])
        }
      ];

      for (const lesson of speakingLessons) {
        await db.query(
          `INSERT INTO english_speaking_lessons 
           (title, category, target_sentence, ipa_full, translation_vi, difficulty, tips_vi, audio_duration_seconds, words)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            lesson.title,
            lesson.category,
            lesson.target_sentence,
            lesson.ipa_full,
            lesson.translation_vi,
            lesson.difficulty,
            lesson.tips_vi,
            lesson.audio_duration_seconds,
            lesson.words
          ]
        );
      }
      console.log(`✅ Đã nạp ${speakingLessons.length} bài luyện phát âm vào english_speaking_lessons.`);
    }

    // 4. Nạp dữ liệu Luyện Nghe & Karaoke Dictation
    const [[{ count: listeningCount }]] = await db.query('SELECT COUNT(*) AS count FROM english_listening_lessons');
    if (listeningCount === 0) {
      const [insertResult] = await db.query(
        `INSERT INTO english_listening_lessons 
         (title, topic, speaker_name, speaker_role, level, audio_duration_ms, audio_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'Mastering Job Interviews in Global Tech Companies',
          'Career & Workplace Communication',
          'Dr. Sarah Jenkins',
          'Executive Communication Coach (Oxford)',
          'Upper-Intermediate (B2-C1)',
          38000,
          'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
        ]
      );
      const lessonId = insertResult.insertId;

      const segments = [
        {
          start_ms: 0,
          end_ms: 5500,
          speaker: 'Dr. Sarah Jenkins',
          text_en: 'Welcome everyone! Today we are discussing how to present your strengths effectively in behavioral interviews.',
          text_vi: 'Chào mừng các bạn! Hôm nay chúng ta sẽ thảo luận cách trình bày thế mạnh bản thân hiệu quả trong các buổi phỏng vấn hành vi.',
          dictation_blanks: JSON.stringify([{ wordIndex: 8, correctWord: 'strengths', hint: 'Điểm mạnh, ưu thế' }])
        },
        {
          start_ms: 5500,
          end_ms: 11200,
          speaker: 'Dr. Sarah Jenkins',
          text_en: 'When answering behavioral interview questions, the STAR framework is an indispensable tool.',
          text_vi: 'Khi trả lời các câu hỏi phỏng vấn hành vi, mô hình STAR là một công cụ không thể thiếu.',
          dictation_blanks: JSON.stringify([{ wordIndex: 9, correctWord: 'indispensable', hint: 'Không thể thiếu, tối cần thiết' }])
        },
        {
          start_ms: 11200,
          end_ms: 17800,
          speaker: 'Candidate Alex',
          text_en: 'Could you elaborate on how we should highlight our resilience when talking about past project failures?',
          text_vi: 'Cô có thể giải thích chi tiết hơn về cách làm nổi bật sự kiên cường khi nói về những thất bại trong dự án trước đây không?',
          dictation_blanks: JSON.stringify([{ wordIndex: 2, correctWord: 'elaborate', hint: 'Giải thích chi tiết hơn' }, { wordIndex: 8, correctWord: 'resilience', hint: 'Sự kiên cường, dẻo dai' }])
        },
        {
          start_ms: 17800,
          end_ms: 24500,
          speaker: 'Dr. Sarah Jenkins',
          text_en: 'Excellent inquiry! You should meticulously break down the root cause and emphasize the proactive steps you took.',
          text_vi: 'Câu hỏi rất tuyệt vời! Bạn nên phân tích tỉ mỉ nguyên nhân gốc rễ và nhấn mạnh các bước chủ động bạn đã thực hiện.',
          dictation_blanks: JSON.stringify([{ wordIndex: 4, correctWord: 'meticulously', hint: 'Một cách tỉ mỉ, cẩn trọng' }])
        }
      ];

      for (const seg of segments) {
        await db.query(
          `INSERT INTO english_transcript_segments 
           (lesson_id, start_ms, end_ms, speaker, text_en, text_vi, dictation_blanks)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [lessonId, seg.start_ms, seg.end_ms, seg.speaker, seg.text_en, seg.text_vi, seg.dictation_blanks]
        );
      }
      console.log(`✅ Đã nạp 1 bài nghe và ${segments.length} phân đoạn karaoke vào english_listening_lessons.`);
    }

    // 5. Nạp dữ liệu Ghép Câu Ngữ Pháp (Sentence Builders)
    const [[{ count: sentenceCount }]] = await db.query('SELECT COUNT(*) AS count FROM english_sentence_builders');
    if (sentenceCount === 0) {
      const sentenceExercises = [
        {
          target_sentence_vi: 'Ngay khi anh ấy vừa hoàn thành bài báo cáo, dự án mới đã lập tức bắt đầu.',
          target_sentence_en: 'No sooner had he finished the report than the new project started',
          correct_words: JSON.stringify(['No sooner', 'had he', 'finished', 'the report', 'than', 'the new project', 'started']),
          shuffled_words: JSON.stringify([
            { id: 'w-1', text: 'the report' },
            { id: 'w-2', text: 'No sooner' },
            { id: 'w-3', text: 'than' },
            { id: 'w-4', text: 'started' },
            { id: 'w-5', text: 'had he' },
            { id: 'w-6', text: 'the new project' },
            { id: 'w-7', text: 'finished' }
          ]),
          explanation_vi: 'Cấu trúc đảo ngữ thời gian: "No sooner + had + S + V3/ed + than + S + V2/ed" dùng để diễn tả một hành động vừa kết thúc thì hành động khác lập tức xảy ra.',
          grammar_topic: 'Đảo ngữ phủ định (Inversion)',
          points: 25,
          difficulty: 'Hard'
        },
        {
          target_sentence_vi: 'Nếu tôi biết về buổi hội thảo sớm hơn, tôi đã đăng ký tham gia rồi.',
          target_sentence_en: 'Had I known about the seminar earlier I would have registered',
          correct_words: JSON.stringify(['Had I', 'known about', 'the seminar', 'earlier', 'I would have', 'registered']),
          shuffled_words: JSON.stringify([
            { id: 'sb2-1', text: 'earlier' },
            { id: 'sb2-2', text: 'Had I' },
            { id: 'sb2-3', text: 'registered' },
            { id: 'sb2-4', text: 'the seminar' },
            { id: 'sb2-5', text: 'I would have' },
            { id: 'sb2-6', text: 'known about' }
          ]),
          explanation_vi: 'Đảo ngữ câu điều kiện loại 3: Thay vì dùng "If I had known...", ta đảo trợ động từ lên đầu: "Had I known...".',
          grammar_topic: 'Đảo ngữ câu điều kiện loại 3',
          points: 25,
          difficulty: 'Hard'
        },
        {
          target_sentence_vi: 'Mặc dù thời tiết khắc nghiệt, đội cứu hộ vẫn quyết định tiếp tục sứ mệnh.',
          target_sentence_en: 'Despite the severe weather conditions the rescue team decided to continue the mission',
          correct_words: JSON.stringify(['Despite', 'the severe weather conditions', 'the rescue team', 'decided', 'to continue', 'the mission']),
          shuffled_words: JSON.stringify([
            { id: 'sb3-1', text: 'the mission' },
            { id: 'sb3-2', text: 'Despite' },
            { id: 'sb3-3', text: 'decided' },
            { id: 'sb3-4', text: 'the severe weather conditions' },
            { id: 'sb3-5', text: 'to continue' },
            { id: 'sb3-6', text: 'the rescue team' }
          ]),
          explanation_vi: 'Cấu trúc nhượng bộ: "Despite + Noun Phrase, Clause". Sau Despite luôn là danh từ hoặc cụm danh từ.',
          grammar_topic: 'Mệnh đề nhượng bộ (Concession Clauses)',
          points: 20,
          difficulty: 'Medium'
        }
      ];

      for (const ex of sentenceExercises) {
        await db.query(
          `INSERT INTO english_sentence_builders 
           (target_sentence_vi, target_sentence_en, correct_words, shuffled_words, explanation_vi, grammar_topic, points, difficulty)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            ex.target_sentence_vi,
            ex.target_sentence_en,
            ex.correct_words,
            ex.shuffled_words,
            ex.explanation_vi,
            ex.grammar_topic,
            ex.points,
            ex.difficulty
          ]
        );
      }
      console.log(`✅ Đã nạp ${sentenceExercises.length} bài tập ghép câu vào english_sentence_builders.`);
    }

    // 6. Cập nhật chỉ số Stats ban đầu cho các User trong database
    const [users] = await db.query('SELECT id FROM users');
    for (const u of users) {
      await db.query(
        `INSERT INTO user_english_stats 
         (user_id, streak_days, last_active_date, xp_total, xp_this_week, league, vocab_learned_count, speaking_accuracy_avg, listening_completed_count, grammar_mastered_count)
         VALUES (?, 14, CURDATE(), 2020, 2020, 'Bạch Kim', 148, 94.0, 32, 28)
         ON DUPLICATE KEY UPDATE streak_days = 14, xp_this_week = 2020`,
        [u.id]
      );
    }
    console.log(`✅ Đã khởi tạo chỉ số học tập ban đầu (Streak 14 ngày, 2020 XP) cho ${users.length} tài khoản trong CSDL.`);

    console.log('\n🎉 Nạp dữ liệu hoàn tất! Cơ sở dữ liệu MySQL đã sẵn sàng 100% phục vụ API.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi trong quá trình seed dữ liệu:', err);
    process.exit(1);
  }
}

runSeed();
