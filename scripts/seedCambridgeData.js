// scripts/seedCambridgeData.js
// Khởi tạo các bảng và nạp dữ liệu chuẩn Cambridge IELTS (Reading 13-14 câu, Dictation, Anki SRS) vào MySQL

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function runSeed() {
  console.log('🚀 Đang bắt đầu khởi tạo CSDL Cambridge IELTS & Anki SRS trong MySQL...');

  try {
    // 1. Đọc và thực thi file create_cambridge_tables.sql
    const sqlPath = path.join(__dirname, '../database/create_cambridge_tables.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    const statements = sqlScript
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await db.query(stmt);
    }
    console.log('✅ Đã khởi tạo thành công 8 bảng CSDL Cambridge & Anki!');

    // 2. Dữ liệu Reading Passages
    const passages = [
      {
        id: 'cambridge-18-test-2-p2',
        title: 'Biophilic Architecture in Urban Design',
        subtitle: 'Reconnecting Modern Cities with the Natural Environment',
        source: 'Cambridge 18 - Test 2',
        topic: 'Architecture & Urban Planning',
        difficulty: 'Band 7.5-8.5',
        estimated_minutes: 20,
        word_count: 980,
        paragraphs: JSON.stringify([
          {
            label: 'A',
            content:
              'For decades, standard architectural doctrine dictated an aggressive subjugation of nature in metropolitan territories. Massive concrete monoliths, impermeable steel frames, and sealed glass curtain facades served as triumphant badges of human industrial prowess. However, this clinical alienation from organic environments has triggered severe psychological fatigue, elevated chronic cortisol levels, and an acute degradation in civic well-being across sprawling megalopolises.'
          },
          {
            label: 'B',
            content:
              'In response, contemporary theorists have revived and operationalized the concept of biophilia—an innate evolutionary affinity between human biology and living ecosystems. Biophilic architecture does not merely treat vegetation as superficial ornamentation. Instead, it systematically weaves multi-sensory natural elements directly into structural geometry, ensuring steady daylight transitions, acoustic water buffers, and dynamic microclimate ventilation.'
          },
          {
            label: 'C',
            content:
              'Empirical studies conducted across corporate environments demonstrate that biophilic retrofitting stimulates cognitive rejuvenation. Workers inside biophilic towers register an 18% improvement in sustained problem-solving stamina and a 26% decline in stress-induced absenteeism. Furthermore, the deliberate deployment of vegetation walls actively moderates ambient thermal islands, noticeably slashing artificial HVAC energy consumption.'
          },
          {
            label: 'D',
            content:
              'Critics have consistently posited that biophilic construction introduces unsustainable fiscal overheads and demanding horticultural maintenance. Sophisticated irrigation networks, soil load-bearing reinforcements, and specialized botanical upkeep inevitably inflate early capital expenditure. In high-density financial districts, developers frequently prioritize rentable floor area over internal garden atriums.'
          },
          {
            label: 'E',
            content:
              'Nonetheless, forward-thinking urban planners argue that the long-term economic dividends comprehensively outweigh initial financial outlays. By mitigating urban heat island impacts, enhancing storm water retention, and driving up tenant retention, green-certified towers yield superior life-cycle returns. Leading financial hubs like Singapore have already codified green plot ratio benchmarks into municipal building legislation.'
          },
          {
            label: 'F',
            content:
              'Ultimately, the maturation of biophilic design reflects a philosophical paradigm shift from environmental exploitation toward symbiotic cohabitation. As climate instability accelerates, integrating living nature into the urban fabric will no longer be considered an eccentric luxury, but rather a non-negotiable imperative for municipal resilience and human survival.'
          }
        ])
      },
      {
        id: 'actual-tests-vol-5-p1',
        title: 'Vertical Farming: Agriculture for the 21st Century',
        subtitle: 'Can indoor skyscraper agriculture feed a planet of 10 billion?',
        source: 'Actual Tests Vol 5',
        topic: 'Agriculture & Technology',
        difficulty: 'Band 7.0-8.0',
        estimated_minutes: 20,
        word_count: 940,
        paragraphs: JSON.stringify([
          {
            label: 'A',
            content:
              'By the year 2050, nearly 80 percent of the earth\'s population will reside in urban centers. Applying conventional agricultural approaches, an estimated area of arable land larger than Brazil would be required to produce sufficient sustenance. Historically, agrarian expansion has caused extensive deforestation, topsoil erosion, and severe disruption of indigenous freshwater ecosystems.'
          },
          {
            label: 'B',
            content:
              'Enter vertical farming: an innovative agricultural framework wherein crops are cultivated in stacked layers inside climate-controlled structures. Utilizing hydroponic and aeroponic systems rather than organic soil, plants receive precise water and mineral nutrients directly to their root networks, consuming up to 95 percent less water than traditional surface fields.'
          },
          {
            label: 'C',
            content:
              'A critical virtue of indoor cultivation is total insulation from inclement weather anomalies. Floods, unseasonal droughts, and sudden frost no longer jeopardize annual crop yields. Furthermore, because vertical farming facilities operate within hermetically sealed enclosures, the application of chemical pesticides and synthetic herbicides is entirely eradicated.'
          },
          {
            label: 'D',
            content:
              'The paramount economic obstacle hindering widespread vertical farming adoption remains prohibitive electrical energy expenditure. Artificial LED illumination arrays and advanced HVAC environmental management require continuous power inputs. Until renewable solar and wind grids achieve widespread cost parity, the operational expenditure per kilogram of produce remains considerably higher than standard open-field agriculture.'
          },
          {
            label: 'E',
            content:
              'Despite these fiscal challenges, municipal authorities in dense metropolises such as Tokyo, Singapore, and New York are accelerating development grants. The capacity to harvest fresh produce within city boundaries drastically truncates logistical food miles, slashing carbon footprints and guaranteeing urban nutritional autonomy in an era of geopolitical volatility.'
          }
        ])
      },
      {
        id: 'cambridge-19-test-1-p1',
        title: 'The Evolution of Ancient Roman Aqueducts',
        subtitle: 'Masterpieces of Hydrological Engineering in Classical Antiquity',
        source: 'Cambridge 19 - Test 1',
        topic: 'History & Civil Engineering',
        difficulty: 'Band 7.5-8.5',
        estimated_minutes: 20,
        word_count: 1020,
        paragraphs: JSON.stringify([
          {
            label: 'A',
            content:
              'Among the enduring marvels of ancient Roman engineering, none symbolized imperial mastery over nature quite like the aqueduct networks. Stretching across vast provinces from the hills of central Italy to the arid frontiers of North Africa and Iberia, these colossal water channels transported millions of gallons of fresh mountain water daily into dense urban centers.'
          },
          {
            label: 'B',
            content:
              'Contrary to popular imagination fostered by picturesque stone arcades crossing valleys, over eighty percent of Roman aqueduct systems ran underground. Subterranean tunneling served multiple strategic functions: it protected precious water channels from airborne contaminants, preserved cool temperatures, prevented surface evaporation, and guarded supply conduits against hostile military sabotage during border raids.'
          },
          {
            label: 'C',
            content:
              'The fundamental driving force behind aqueduct function was remarkably simple yet demanding: gravity. Roman land surveyors, known as agrimensores, used sophisticated instruments such as the chorobates—a wooden bench equipped with water levels and plumb bobs—to calculate minuscule gradients. Maintaining an unbroken downward slope of merely 0.03% across dozens of kilometers of rugged mountain terrain required exceptional mathematical precision.'
          },
          {
            label: 'D',
            content:
              'The material secret enabling long-term hydraulic integrity was opus caementicium—Roman volcanic concrete. Formulated by blending volcanic ash (pozzolana) with slaked lime, this extraordinary mortar underwent a chemical reaction that allowed it to cure and harden even when fully submerged underwater. Water channels were lined with opus signinum, a waterproof plaster crushed from terracotta tiles.'
          },
          {
            label: 'E',
            content:
              'Upon arriving at the city perimeter, incoming water discharged into a grand terminal reservoir called the castellum aquae. From this central distribution hub, water flowed through lead and terracotta pipes into three distinct tiers: public street fountains for general citizens, lavish thermal bath complexes for recreation, and private residential estates belonging to wealthy patricians.'
          },
          {
            label: 'F',
            content:
              'The catastrophic decline of Roman aqueducts coincided with the disintegration of western imperial administration. Maintaining thousands of kilometers of conduits demanded substantial municipal budgets and skilled labor guilds. When Germanic invasions fractured trade lines and severed public treasuries, aqueducts fell into disrepair, forcing populations to abandon grand urban centers and relocate near muddy riverbanks.'
          }
        ])
      }
    ];

    for (const p of passages) {
      await db.query(
        `INSERT INTO cambridge_reading_passages 
          (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
          title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
          topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
          word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
        [p.id, p.title, p.subtitle, p.source, p.topic, p.difficulty, p.estimated_minutes, p.word_count, p.paragraphs]
      );
    }
    console.log(`✅ Đã nạp thành công ${passages.length} bài đọc chuẩn Cambridge!`);

    // 3. Dữ liệu Questions cho Cambridge 18 Test 2 (13 câu)
    const qCam18 = [
      {
        id: 'c18-t2-q1',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 1,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE if the statement agrees, FALSE if the statement contradicts, NOT GIVEN if there is no information.',
        prompt: 'Mid-20th century urban architecture intentionally excluded natural elements to symbolize technological supremacy.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'TRUE',
        academic_explanation: 'Đoạn [A] khẳng định rõ: "Massive concrete monoliths... served as triumphant badges of human industrial prowess" chứng minh kiến trúc thời kỳ này cố tình áp đặt sự thống trị lên tự nhiên.',
        paragraph_ref: 'A'
      },
      {
        id: 'c18-t2-q2',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 2,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        prompt: 'Living in strictly concrete environments has been empirically proven to decrease cortisol production in the human body.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'FALSE',
        academic_explanation: 'Đoạn [A] nêu: "...triggered severe psychological fatigue, elevated chronic cortisol levels" (làm tăng cortisol chứ không phải giảm). Do đó nhận định mâu thuẫn trực tiếp (FALSE).',
        paragraph_ref: 'A'
      },
      {
        id: 'c18-t2-q3',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 3,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        prompt: 'Biophilic design principles regard indoor vegetation primarily as an aesthetic tool for visual decoration.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'FALSE',
        academic_explanation: 'Đoạn [B] chỉ rõ: "Biophilic architecture does not merely treat vegetation as superficial ornamentation. Instead, it systematically weaves multi-sensory natural elements directly into structural geometry."',
        paragraph_ref: 'B'
      },
      {
        id: 'c18-t2-q4',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 4,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        prompt: 'Office workers in buildings with natural elements experienced measurable declines in absenteeism rates.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'TRUE',
        academic_explanation: 'Đoạn [C] khẳng định: "Workers inside biophilic towers register... a 26% decline in stress-induced absenteeism."',
        paragraph_ref: 'C'
      },
      {
        id: 'c18-t2-q5',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 5,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        prompt: 'Most corporate tenants are willing to pay higher rents specifically for offices with water features.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'NOT GIVEN',
        academic_explanation: 'Bài đọc đề cập đến "acoustic water buffers" ở đoạn B và "tenant retention" ở đoạn E, nhưng hoàn toàn KHÔNG nhắc đến việc đa số người thuê sẵn sàng trả giá cao hơn riêng cho hồ nước.',
        paragraph_ref: 'B'
      },
      {
        id: 'c18-t2-q6',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 6,
        type: 'tfng',
        group_header: 'Questions 1–6',
        group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        prompt: 'Singapore has officially incorporated green building standards into its municipal legal framework.',
        options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
        correct_answer: 'TRUE',
        academic_explanation: 'Đoạn [E] viết: "Leading financial hubs like Singapore have already codified green plot ratio benchmarks into municipal building legislation."',
        paragraph_ref: 'E'
      },
      {
        id: 'c18-t2-q7',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 7,
        type: 'matching_info',
        group_header: 'Questions 7–9',
        group_instruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        prompt: 'Specific statistical data verifying enhanced cognitive stamina in corporate staff.',
        options: JSON.stringify(['A', 'B', 'C', 'D', 'E', 'F']),
        correct_answer: 'C',
        academic_explanation: 'Đoạn [C] trích dẫn số liệu thống kê thực nghiệm cụ thể: "18% improvement in sustained problem-solving stamina and a 26% decline in stress-induced absenteeism".',
        paragraph_ref: 'C'
      },
      {
        id: 'c18-t2-q8',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 8,
        type: 'matching_info',
        group_header: 'Questions 7–9',
        group_instruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        prompt: 'A description of initial financial and technical burdens that deter conventional developers.',
        options: JSON.stringify(['A', 'B', 'C', 'D', 'E', 'F']),
        correct_answer: 'D',
        academic_explanation: 'Đoạn [D] phân tích các rào cản chi phí ban đầu: "unsustainable fiscal overheads and demanding horticultural maintenance. Sophisticated irrigation networks, soil load-bearing reinforcements..."',
        paragraph_ref: 'D'
      },
      {
        id: 'c18-t2-q9',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 9,
        type: 'matching_info',
        group_header: 'Questions 7–9',
        group_instruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        prompt: 'An assertion that nature integration will shift from an eccentric extravagance to an essential survival strategy.',
        options: JSON.stringify(['A', 'B', 'C', 'D', 'E', 'F']),
        correct_answer: 'F',
        academic_explanation: 'Đoạn [F] khẳng định: "...will no longer be considered an eccentric luxury, but rather a non-negotiable imperative for municipal resilience and human survival."',
        paragraph_ref: 'F'
      },
      {
        id: 'c18-t2-q10',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 10,
        type: 'summary_completion',
        group_header: 'Questions 10–13',
        group_instruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        prompt: 'According to researchers, human biology possesses an innate evolutionary affinity termed [10] with natural living systems.',
        correct_answer: 'biophilia',
        acceptable_answers: JSON.stringify(['biophilia']),
        academic_explanation: 'Đoạn [B] giải thích: "...the concept of biophilia—an innate evolutionary affinity between human biology and living ecosystems."',
        paragraph_ref: 'B'
      },
      {
        id: 'c18-t2-q11',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 11,
        type: 'summary_completion',
        group_header: 'Questions 10–13',
        group_instruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        prompt: 'In corporate retrofitting projects, vertical plant installations help regulate surrounding thermal conditions, consequently curbing [11] energy costs.',
        correct_answer: 'HVAC',
        acceptable_answers: JSON.stringify(['HVAC', 'cooling']),
        academic_explanation: 'Đoạn [C] chỉ ra: "...vegetation walls actively moderates ambient thermal islands, noticeably slashing artificial HVAC energy consumption."',
        paragraph_ref: 'C'
      },
      {
        id: 'c18-t2-q12',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 12,
        type: 'summary_completion',
        group_header: 'Questions 10–13',
        group_instruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        prompt: 'Conventional builders often hesitate due to the complex nature of watering systems and structural [12] required for soil weight.',
        correct_answer: 'load-bearing reinforcements',
        acceptable_answers: JSON.stringify(['reinforcements', 'load-bearing reinforcements', 'load-bearing']),
        academic_explanation: 'Đoạn [D] liệt kê: "Sophisticated irrigation networks, soil load-bearing reinforcements, and specialized botanical upkeep..."',
        paragraph_ref: 'D'
      },
      {
        id: 'c18-t2-q13',
        passage_id: 'cambridge-18-test-2-p2',
        question_number: 13,
        type: 'summary_completion',
        group_header: 'Questions 10–13',
        group_instruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        prompt: 'Urban planners argue that certified green developments deliver superior returns over their complete [13] through improved efficiency.',
        correct_answer: 'life-cycle',
        acceptable_answers: JSON.stringify(['life-cycle', 'lifecycle']),
        academic_explanation: 'Đoạn [E] khẳng định: "...green-certified towers yield superior life-cycle returns."',
        paragraph_ref: 'E'
      }
    ];

    for (const q of qCam18) {
      await db.query(
        `INSERT INTO cambridge_reading_questions
          (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, acceptable_answers, academic_explanation, paragraph_ref)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          type = VALUES(type), group_header = VALUES(group_header), group_instruction = VALUES(group_instruction),
          prompt = VALUES(prompt), options = VALUES(options), correct_answer = VALUES(correct_answer),
          acceptable_answers = VALUES(acceptable_answers), academic_explanation = VALUES(academic_explanation),
          paragraph_ref = VALUES(paragraph_ref)`,
        [
          q.id, q.passage_id, q.question_number, q.type, q.group_header, q.group_instruction,
          q.prompt, q.options || null, q.correct_answer, q.acceptable_answers || null,
          q.academic_explanation, q.paragraph_ref
        ]
      );
    }
    console.log(`✅ Đã nạp ${qCam18.length} câu hỏi chuẩn cho Cambridge 18 Test 2!`);

    // 4. Dữ liệu Từ vựng Mục tiêu (Target Words)
    const targetWords = [
      {
        id: 'tw-c18-1',
        passage_id: 'cambridge-18-test-2-p2',
        word: 'subjugation',
        part_of_speech: 'noun',
        ipa: '/ˌsʌb.dʒʊˈɡeɪ.ʃən/',
        meaning_en: 'The act of conquering, subduing, or bringing under complete control.',
        meaning_vi: 'Sự chinh phục, khuất phục, đàn áp và đưa vào tầm kiểm soát tuyệt đối.',
        context_sentence: 'For decades, standard architectural doctrine dictated an aggressive subjugation of nature in metropolitan territories.'
      },
      {
        id: 'tw-c18-2',
        passage_id: 'cambridge-18-test-2-p2',
        word: 'biophilia',
        part_of_speech: 'noun',
        ipa: '/ˌbaɪ.oʊˈfɪl.i.ə/',
        meaning_en: 'An innate tendency in humans to seek connections with nature and other forms of life.',
        meaning_vi: 'Xu hướng bản năng của con người tìm kiếm sự kết nối mật thiết với thế giới tự nhiên.',
        context_sentence: 'Contemporary theorists have revived and operationalized the concept of biophilia—an innate evolutionary affinity between human biology and living ecosystems.'
      },
      {
        id: 'tw-c18-3',
        passage_id: 'cambridge-18-test-2-p2',
        word: 'monolith',
        part_of_speech: 'noun',
        ipa: '/ˈmɒn.ə.lɪθ/',
        meaning_en: 'A massive, indivisible, and uniform structure that feels imposing.',
        meaning_vi: 'Khối đá tảng đồ sộ, công trình kiến trúc nguyên khối khổng lồ và áp đảo.',
        context_sentence: 'Massive concrete monoliths, impermeable steel frames, and sealed glass curtain facades served as triumphant badges of human industrial prowess.'
      },
      {
        id: 'tw-c18-4',
        passage_id: 'cambridge-18-test-2-p2',
        word: 'rejuvenation',
        part_of_speech: 'noun',
        ipa: '/rɪˌdʒuː.vənˈeɪ.ʃən/',
        meaning_en: 'The action or process of giving new energy or vitality to something.',
        meaning_vi: 'Sự trẻ hóa, tái tạo và phục hồi nguồn năng lượng, sức sống tinh thần.',
        context_sentence: 'Empirical studies conducted across corporate environments demonstrate that biophilic retrofitting stimulates cognitive rejuvenation.'
      },
      {
        id: 'tw-c18-5',
        passage_id: 'cambridge-18-test-2-p2',
        word: 'symbiotic',
        part_of_speech: 'adjective',
        ipa: '/ˌsɪm.baɪˈɒt.ɪk/',
        meaning_en: 'Involving interaction between two different organisms living in close physical association, often to the advantage of both.',
        meaning_vi: 'Cộng sinh, hỗ trợ và tương tác cùng có lợi giữa các thực thể.',
        context_sentence: 'The maturation of biophilic design reflects a philosophical paradigm shift from environmental exploitation toward symbiotic cohabitation.'
      }
    ];

    for (const tw of targetWords) {
      await db.query(
        `INSERT INTO cambridge_target_words
          (id, passage_id, word, part_of_speech, ipa, meaning_en, meaning_vi, context_sentence)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          word = VALUES(word), part_of_speech = VALUES(part_of_speech), ipa = VALUES(ipa),
          meaning_en = VALUES(meaning_en), meaning_vi = VALUES(meaning_vi),
          context_sentence = VALUES(context_sentence)`,
        [tw.id, tw.passage_id, tw.word, tw.part_of_speech, tw.ipa, tw.meaning_en, tw.meaning_vi, tw.context_sentence]
      );
    }
    console.log(`✅ Đã nạp ${targetWords.length} từ vựng học thuật C1-C2!`);

    // 5. Dữ liệu Listening Tests & Dictation
    const listeningTests = [
      {
        id: 'cam18-t2-p3',
        title: 'Architecture Fieldwork & Environmental Analysis',
        source: 'Cambridge 18 - Test 2 Part 3',
        part: 3,
        speaker_accent: 'British Academic',
        wpm: 150,
        estimated_minutes: 15,
        audio_url: 'https://cdn.freesound.org/previews/560/560241_11861866-lq.mp3',
        instructions: 'Nghe từng câu và chép lại chính xác từng từ (Dictation). Tập trung vào các liên từ nối và hiện tượng nối âm học thuật.'
      },
      {
        id: 'cam17-t1-p1',
        title: 'City Transport Survey & Commuter Feedback',
        source: 'Cambridge 17 - Test 1 Part 1',
        part: 1,
        speaker_accent: 'British Standard',
        wpm: 135,
        estimated_minutes: 10,
        audio_url: 'https://cdn.freesound.org/previews/560/560241_11861866-lq.mp3',
        instructions: 'Chép chính tả hội thoại đăng ký dịch vụ giao thông công cộng. Chú ý số liệu ngày tháng và tên riêng.'
      }
    ];

    for (const lt of listeningTests) {
      await db.query(
        `INSERT INTO cambridge_listening_tests
          (id, title, source, part, speaker_accent, wpm, estimated_minutes, audio_url, instructions)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          title = VALUES(title), source = VALUES(source), part = VALUES(part),
          speaker_accent = VALUES(speaker_accent), wpm = VALUES(wpm),
          estimated_minutes = VALUES(estimated_minutes), audio_url = VALUES(audio_url),
          instructions = VALUES(instructions)`,
        [lt.id, lt.title, lt.source, lt.part, lt.speaker_accent, lt.wpm, lt.estimated_minutes, lt.audio_url, lt.instructions]
      );
    }
    console.log(`✅ Đã nạp ${listeningTests.length} đề nghe Cambridge Listening!`);

    // 6. Dữ liệu Dictation Sentences
    const dictationSentences = [
      {
        id: 'ds-c18-1',
        test_id: 'cam18-t2-p3',
        sentence_order: 1,
        start_time_ms: 0,
        end_time_ms: 6500,
        text_en: 'Before we finalize the site survey, we need to calibrate the acoustic measurement instruments thoroughly.',
        translation_vi: 'Trước khi chốt đợt khảo sát hiện trường, chúng ta cần hiệu chuẩn kỹ lưỡng các thiết bị đo âm học.',
        connected_speech_notes: 'Nối âm: "need to" đọc thành /niːtə/, "acoustic measurement" nhấn mạnh âm đầu.',
        target_words: JSON.stringify([
          { word: 'calibrate', ipa: '/ˈkæl.ɪ.breɪt/', meaningVi: 'hiệu chuẩn thông số kỹ thuật' },
          { word: 'acoustic', ipa: '/əˈkuː.stɪk/', meaningVi: 'thuộc về âm học' }
        ])
      },
      {
        id: 'ds-c18-2',
        test_id: 'cam18-t2-p3',
        sentence_order: 2,
        start_time_ms: 6500,
        end_time_ms: 13000,
        text_en: 'The environmental sensors recorded anomalous fluctuations in ambient humidity during the late afternoon hours.',
        translation_vi: 'Các cảm biến môi trường đã ghi nhận những dao động bất thường về độ ẩm xung quanh vào khoảng cuối buổi chiều.',
        connected_speech_notes: 'Nuốt âm: "recorded anomalous" nối âm /d/ sang nguyên âm /ə/.',
        target_words: JSON.stringify([
          { word: 'anomalous', ipa: '/əˈnɒm.ə.ləs/', meaningVi: 'bất thường, dị biệt' },
          { word: 'fluctuations', ipa: '/ˌflʌk.tʃuˈeɪ.ʃənz/', meaningVi: 'những sự biến động' }
        ])
      }
    ];

    for (const ds of dictationSentences) {
      await db.query(
        `INSERT INTO cambridge_dictation_sentences
          (id, test_id, sentence_order, start_time_ms, end_time_ms, text_en, translation_vi, connected_speech_notes, target_words)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          sentence_order = VALUES(sentence_order), start_time_ms = VALUES(start_time_ms),
          end_time_ms = VALUES(end_time_ms), text_en = VALUES(text_en),
          translation_vi = VALUES(translation_vi), connected_speech_notes = VALUES(connected_speech_notes),
          target_words = VALUES(target_words)`,
        [ds.id, ds.test_id, ds.sentence_order, ds.start_time_ms, ds.end_time_ms, ds.text_en, ds.translation_vi, ds.connected_speech_notes, ds.target_words]
      );
    }
    console.log(`✅ Đã nạp ${dictationSentences.length} câu phân đoạn Dictation Audio Slicing!`);

    // 7. Dữ liệu Anki Decks
    const decks = [
      {
        id: 'deck-personal',
        name: 'Deck Cá Nhân (Tích Lũy Từ Bài Học)',
        description: 'Kho từ vựng tích lũy tự động từ các bài đọc Cambridge và bài luyện nghe Dictation.',
        badge: 'Tự động đồng bộ',
        color: 'emerald'
      },
      {
        id: 'deck-core-500',
        name: 'Cambridge Core 500 (Academic Collocations)',
        description: '500 cụm từ học thuật có tần suất xuất hiện cao nhất trong các đề Cambridge 16-19.',
        badge: 'C1-C2 Master',
        color: 'amber'
      },
      {
        id: 'deck-awl',
        name: 'Academic Word List (AWL) Band 7.5+',
        description: 'Toàn bộ các từ vựng trừu tượng và chuyên luận phục vụ band điểm xuất sắc.',
        badge: 'Band 7.5+',
        color: 'stone'
      }
    ];

    for (const d of decks) {
      await db.query(
        `INSERT INTO anki_decks (id, name, description, badge, color)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          name = VALUES(name), description = VALUES(description), badge = VALUES(badge), color = VALUES(color)`,
        [d.id, d.name, d.description, d.badge, d.color]
      );
    }
    console.log(`✅ Đã nạp ${decks.length} bộ bài Anki Decks chuẩn!`);

    // 8. Dữ liệu Starter Anki Flashcards
    const starterCards = [
      {
        id: 'card-init-1',
        deck_id: 'deck-core-500',
        word: 'subjugation',
        part_of_speech: 'noun',
        ipa: '/ˌsʌb.dʒʊˈɡeɪ.ʃən/',
        meaning_en: 'The act of conquering or bringing under complete control.',
        meaning_vi: 'Sự chinh phục, khuất phục, áp chế hoàn toàn.',
        cloze_sentence: 'For decades, standard architectural doctrine dictated an aggressive [ ________ ] of nature in metropolitan territories.',
        full_sentence: 'For decades, standard architectural doctrine dictated an aggressive subjugation of nature in metropolitan territories.',
        source: 'Cambridge 18 - Test 2 Passage 2',
        stage: 'learning',
        interval_days: 1,
        repetition_count: 1,
        ease_factor: 2.5,
        due_date: new Date()
      },
      {
        id: 'card-init-2',
        deck_id: 'deck-core-500',
        word: 'biophilia',
        part_of_speech: 'noun',
        ipa: '/ˌbaɪ.oʊˈfɪl.i.ə/',
        meaning_en: 'An innate affinity between human biology and living ecosystems.',
        meaning_vi: 'Xu hướng bản năng gắn kết mật thiết với thiên nhiên.',
        cloze_sentence: 'Contemporary theorists have revived and operationalized the concept of [ ________ ]—an innate evolutionary affinity.',
        full_sentence: 'Contemporary theorists have revived and operationalized the concept of biophilia—an innate evolutionary affinity.',
        source: 'Cambridge 18 - Test 2 Passage 2',
        stage: 'new',
        interval_days: 0,
        repetition_count: 0,
        ease_factor: 2.5,
        due_date: new Date()
      }
    ];

    for (const c of starterCards) {
      await db.query(
        `INSERT INTO anki_cards
          (id, deck_id, word, part_of_speech, ipa, meaning_en, meaning_vi, cloze_sentence, full_sentence, source, stage, interval_days, repetition_count, ease_factor, due_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          word = VALUES(word), part_of_speech = VALUES(part_of_speech), ipa = VALUES(ipa),
          meaning_en = VALUES(meaning_en), meaning_vi = VALUES(meaning_vi),
          cloze_sentence = VALUES(cloze_sentence), full_sentence = VALUES(full_sentence),
          source = VALUES(source)`,
        [
          c.id, c.deck_id, c.word, c.part_of_speech, c.ipa, c.meaning_en, c.meaning_vi,
          c.cloze_sentence, c.full_sentence, c.source, c.stage, c.interval_days,
          c.repetition_count, c.ease_factor, c.due_date
        ]
      );
    }
    console.log(`✅ Đã nạp các thẻ Anki khởi tạo!`);

    console.log('\n🎉 TOÀN BỘ CƠ SỞ DỮ LIỆU CAMBRIDGE ĐÃ ĐƯỢC NẠP THÀNH CÔNG VÀO MYSQL!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo CSDL:', error);
    process.exit(1);
  }
}

runSeed();
