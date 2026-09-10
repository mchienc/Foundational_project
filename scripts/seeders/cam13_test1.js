// scripts/seeders/cam13_test1.js
// Cambridge IELTS 13 - Test 1: Full 3 Passages (Passage 1, Passage 2, Passage 3) - 40 Questions

const db = require('../../config/db');

async function seedTest1() {
  console.log('📖 Đang nạp Cambridge 13 - Test 1 (Passage 1, 2, 3)...');

  // ==========================================
  // PASSAGE 1: Case Study: Tourism New Zealand website
  // ==========================================
  const p1 = {
    id: 'cambridge-13-test-1-p1',
    title: 'Case Study: Tourism New Zealand website',
    subtitle: 'How a small nation successfully marketed itself to international independent travelers',
    source: 'Cambridge 13 - Test 1',
    topic: 'Tourism & Marketing',
    difficulty: 'Passage 1 (Cơ bản)',
    estimated_minutes: 20,
    word_count: 850,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'New Zealand is a small nation with a population of approximately 4.5 million, positioned in the remote South Pacific. In 1999, the government agency Tourism New Zealand (TNZ) launched the "100% Pure New Zealand" campaign. Unlike conventional promotional efforts that targeted package tour groups, this initiative deliberately focused on a niche demographic: the independent, high-yield global traveler.'
      },
      {
        label: 'B',
        content: 'Central to this strategy was the creation of a comprehensive national website (newzealand.com). TNZ recognised that independent travelers require extensive, reliable information to compose their own custom itineraries. The website was engineered not just as a brochure, but as an interactive travel planner cataloguing over 9,000 local tourism businesses, ranging from scenic flights to farm-stay accommodations.'
      },
      {
        label: 'C',
        content: 'Crucially, TNZ implemented an egalitarian listing policy. To support regional economic development, any registered tourism enterprise in New Zealand could be featured on the portal free of charge. This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates.'
      },
      {
        label: 'D',
        content: 'To facilitate seamless transport logistics, the website provided a dynamic travel route calculator. Users could input two destination points, and the software would generate realistic driving durations alongside detailed terrain warnings. This feature proved indispensable, as many overseas motorists chronically underestimated the arduous nature of New Zealand’s winding alpine road corridors.'
      },
      {
        label: 'E',
        content: 'Furthermore, the platform developed dedicated sub-sections catering to niche passion points, including extreme adventure sports, eco-tourism sanctuaries, and cultural Māori heritage experiences. User-generated reviews and traveler testimonials were systematically aggregated, providing impartial credibility that resonated far more effectively than traditional marketing hyperbole.'
      },
      {
        label: 'F',
        content: 'The long-term dividends of this targeted digital ecosystem were extraordinary. Between 1999 and 2013, international visitor arrivals surged from 1.5 million to over 2.7 million annually. More importantly, tourist expenditures increased by more than 120%, demonstrating that catering to independent travelers generated sustained economic vitality across the country.'
      }
    ])
  };

  await db.query(
    `INSERT INTO cambridge_reading_passages 
      (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
      title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
      topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
      word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
    [p1.id, p1.title, p1.subtitle, p1.source, p1.topic, p1.difficulty, p1.estimated_minutes, p1.word_count, p1.paragraphs]
  );

  // Questions for Passage 1 (Q1 - Q13)
  const qP1 = [
    {
      id: 'c13-t1-q1',
      passage_id: p1.id,
      question_number: 1,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7, choose TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The "100% Pure New Zealand" campaign primarily aimed to attract travelers who prefer all-inclusive package tours.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [A] khẳng định: "Unlike conventional promotional efforts that targeted package tour groups, this initiative deliberately focused on a niche demographic: the independent, high-yield global traveler." (Ngược lại với tour trọn gói, chiến dịch nhắm đến khách du lịch tự túc).',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t1-q2',
      passage_id: p1.id,
      question_number: 2,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Local tourism businesses were required to pay an annual fee to be listed on the newzealand.com website.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [C] nêu rõ: "...any registered tourism enterprise in New Zealand could be featured on the portal free of charge." (Được đăng ký miễn phí, không phải trả phí thường niên).',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q3',
      passage_id: p1.id,
      question_number: 3,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Many overseas visitors fail to realize how difficult it can be to drive on New Zealand\'s mountain roads.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'TRUE',
      academic_explanation: 'Đoạn [D] chỉ ra: "...many overseas motorists chronically underestimated the arduous nature of New Zealand\'s winding alpine road corridors." ("underestimated" = đánh giá thấp / không nhận thức hết độ khó khăn).',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q4',
      passage_id: p1.id,
      question_number: 4,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The website only allowed reviews from travelers who had booked their trips directly through certified travel agents.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [E] giải thích: "User-generated reviews and traveler testimonials were systematically aggregated..." (Đánh giá do chính người dùng đăng tải, không có điều kiện chỉ giới hạn cho khách đặt qua đại lý).',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q5',
      passage_id: p1.id,
      question_number: 5,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Māori cultural organizations were consulted during the initial design of the website layout.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [E] có nhắc đến "cultural Māori heritage experiences" nhưng bài đọc hoàn toàn KHÔNG đề cập đến việc có tham vấn các tổ chức người Māori trong quá trình thiết kế giao diện hay không.',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q6',
      passage_id: p1.id,
      question_number: 6,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Between 1999 and 2013, the total amount of money spent by international tourists in New Zealand more than doubled.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'TRUE',
      academic_explanation: 'Đoạn [F] khẳng định: "...tourist expenditures increased by more than 120%" (Tăng hơn 120% tương đương với tăng hơn gấp đôi).',
      paragraph_ref: 'F'
    },
    {
      id: 'c13-t1-q7',
      passage_id: p1.id,
      question_number: 7,
      type: 'tfng',
      group_header: 'Questions 1–7',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Tourism New Zealand planned to replace the website with mobile smartphone applications after 2013.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Bài đọc không có bất kỳ thông tin nào về kế hoạch thay thế website bằng ứng dụng di động sau năm 2013.',
      paragraph_ref: 'F'
    },
    {
      id: 'c13-t1-q8',
      passage_id: p1.id,
      question_number: 8,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Rather than treating the website as a passive catalog, TNZ designed it as an interactive [8] for global visitors.',
      correct_answer: 'planner',
      acceptable_answers: JSON.stringify(['planner']),
      academic_explanation: 'Đoạn [B]: "The website was engineered not just as a brochure, but as an interactive travel planner..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q9',
      passage_id: p1.id,
      question_number: 9,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'The portal included details for over 9,000 businesses, including scenic flights and rural [9] facilities.',
      correct_answer: 'farm-stay',
      acceptable_answers: JSON.stringify(['farm-stay', 'farmstay']),
      academic_explanation: 'Đoạn [B]: "...ranging from scenic flights to farm-stay accommodations."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q10',
      passage_id: p1.id,
      question_number: 10,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Free listings on the portal enabled small rural enterprises to obtain global [10] without financial barriers.',
      correct_answer: 'exposure',
      acceptable_answers: JSON.stringify(['exposure']),
      academic_explanation: 'Đoạn [C]: "This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q11',
      passage_id: p1.id,
      question_number: 11,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'An online travel route calculator helped drivers calculate accurate travel times and identify road [11] hazards.',
      correct_answer: 'terrain',
      acceptable_answers: JSON.stringify(['terrain']),
      academic_explanation: 'Đoạn [D]: "...software would generate realistic driving durations alongside detailed terrain warnings."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q12',
      passage_id: p1.id,
      question_number: 12,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Travelers could access specialized sections for adrenaline sports, wildlife, and native [12] heritage.',
      correct_answer: 'cultural',
      acceptable_answers: JSON.stringify(['cultural', 'māori', 'maori']),
      academic_explanation: 'Đoạn [E]: "...extreme adventure sports, eco-tourism sanctuaries, and cultural Māori heritage experiences."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q13',
      passage_id: p1.id,
      question_number: 13,
      type: 'summary_completion',
      group_header: 'Questions 8–13',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Unbiased customer reviews provided genuine [13] that proved superior to commercial advertising.',
      correct_answer: 'credibility',
      acceptable_answers: JSON.stringify(['credibility']),
      academic_explanation: 'Đoạn [E]: "...providing impartial credibility that resonated far more effectively than traditional marketing hyperbole."',
      paragraph_ref: 'E'
    }
  ];

  for (const q of qP1) {
    await db.query(
      `INSERT INTO cambridge_reading_questions
        (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, acceptable_answers, academic_explanation, paragraph_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        type = VALUES(type), group_header = VALUES(group_header), group_instruction = VALUES(group_instruction),
        prompt = VALUES(prompt), options = VALUES(options), correct_answer = VALUES(correct_answer),
        acceptable_answers = VALUES(acceptable_answers), academic_explanation = VALUES(academic_explanation),
        paragraph_ref = VALUES(paragraph_ref)`,
      [q.id, q.passage_id, q.question_number, q.type, q.group_header, q.group_instruction, q.prompt, q.options || null, q.correct_answer, q.acceptable_answers || null, q.academic_explanation, q.paragraph_ref]
    );
  }

  // Target words for Passage 1
  const twP1 = [
    { id: 'tw-c13-1', passage_id: p1.id, word: 'demographic', part_of_speech: 'noun', ipa: '/ˌdem.əˈɡræf.ɪk/', meaning_en: 'A particular sector of a population.', meaning_vi: 'Nhóm nhân khẩu học cụ thể trong đối tượng khách hàng.', context_sentence: 'This initiative deliberately focused on a niche demographic: the independent, high-yield global traveler.' },
    { id: 'tw-c13-2', passage_id: p1.id, word: 'egalitarian', part_of_speech: 'adjective', ipa: '/ɪˌɡæl.ɪˈteə.ri.ən/', meaning_en: 'Believing in or based on the principle that all people are equal and deserve equal rights and opportunities.', meaning_vi: 'Bình đẳng, công bằng không phân biệt quy mô doanh nghiệp.', context_sentence: 'Crucially, TNZ implemented an egalitarian listing policy.' },
    { id: 'tw-c13-3', passage_id: p1.id, word: 'conglomerate', part_of_speech: 'noun', ipa: '/kənˈɡlɒm.ər.ət/', meaning_en: 'A number of different things or parts that are grouped together to form a whole.', meaning_vi: 'Tập đoàn đa ngành, doanh nghiệp quy mô lớn.', context_sentence: 'This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates.' },
    { id: 'tw-c13-4', passage_id: p1.id, word: 'hyperbole', part_of_speech: 'noun', ipa: '/haɪˈpɜː.bəl.i/', meaning_en: 'Exaggerated statements or claims not meant to be taken literally.', meaning_vi: 'Lời nói quá, quảng cáo thổi phồng hoa mỹ.', context_sentence: 'User-generated reviews provided impartial credibility that resonated far more effectively than traditional marketing hyperbole.' }
  ];

  for (const tw of twP1) {
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

  // ==========================================
  // PASSAGE 2: Why being bored is stimulating – and useful, too
  // ==========================================
  const p2 = {
    id: 'cambridge-13-test-1-p2',
    title: 'Why being bored is stimulating – and useful, too',
    subtitle: 'Scientific insights into how modern society misunderstands boredom',
    source: 'Cambridge 13 - Test 1',
    topic: 'Psychology & Cognitive Science',
    difficulty: 'Passage 2 (Trung cấp)',
    estimated_minutes: 20,
    word_count: 920,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'We all know the feeling: the clock ticks with agonizing slowness, our eyes glaze over, and an itchy restlessness takes over our body. In contemporary culture, boredom is widely treated as a toxic state—a mental vacuum that must be instantly remedied by scrolling through smartphone feeds or seeking external digital stimulation.'
      },
      {
        label: 'B',
        content: 'However, psychologists such as Dr. Sandi Mann at the University of Central Lancashire suggest that boredom serves an indispensable evolutionary purpose. In a series of pioneering experiments, Mann tasked participants with mundane activities, such as copying numbers from a telephone directory, before asking them to brainstorm innovative uses for everyday plastic cups. The results were startling: subjects exposed to tedious tasks generated significantly more inventive, lateral solutions than a control group.'
      },
      {
        label: 'C',
        content: 'According to cognitive theorists, boredom acts as an emotional catalyst. When external stimuli fail to engage our executive mental faculties, the brain shifts into what neuroscientists call the "default mode network." In this state, unconstrained daydreams allow disparate neurological concepts to collide, paving the way for subconscious problem-solving and artistic illumination.'
      },
      {
        label: 'D',
        content: 'Yet, modern psychologists caution that not all boredom is beneficial. Dr. John Eastwood of York University argues that chronic boredom often stems from an inability to focus attention internally. Individuals who struggle to direct their own mental concentration experience chronic dissatisfaction, which can manifest in maladaptive behaviors such as compulsive overeating, addictive gambling, or risk-prone substance abuse.'
      },
      {
        label: 'E',
        content: 'Moreover, Professor Thomas Goetz has classified boredom into distinct typologies. These range from "calibrating boredom" (a tranquil, reflective openness to new ideas) to "reactant boredom" (an aggressive impulse to flee an unstimulating environment). Recognizing these nuances implies that rather than eradicating boredom with constant digital gadgets, we should learn to embrace its calm varieties as fertile soil for human creativity.'
      }
    ])
  };

  await db.query(
    `INSERT INTO cambridge_reading_passages 
      (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
      title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
      topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
      word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
    [p2.id, p2.title, p2.subtitle, p2.source, p2.topic, p2.difficulty, p2.estimated_minutes, p2.word_count, p2.paragraphs]
  );

  // Questions for Passage 2 (Q14 - Q26)
  const qP2 = [
    {
      id: 'c13-t1-q14',
      passage_id: p2.id,
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information? Write the correct letter, A–E.',
      prompt: 'A description of laboratory experiments involving monotonous copying tasks and plastic cups.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B] mô tả chi tiết thí nghiệm của Dr. Sandi Mann: sao chép số danh bạ và nghĩ công dụng sáng tạo cho cốc nhựa.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q15',
      passage_id: p2.id,
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?',
      prompt: 'The harmful psychological and physical consequences linked to prolonged or chronic boredom.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'D',
      academic_explanation: 'Đoạn [D] liệt kê các hệ quả tiêu cực: ăn uống vô độ (compulsive overeating), cờ bạc nghiện ngập (gambling), lạm dụng chất kích thích.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q16',
      passage_id: p2.id,
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?',
      prompt: 'A formal categorization differentiating between tranquil and aggressive variants of boredom.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'E',
      academic_explanation: 'Đoạn [E] nêu phân loại của Giáo sư Thomas Goetz: "calibrating boredom" (yên ả, mở rộng ý tưởng) và "reactant boredom" (hung hăng, muốn bỏ chạy).',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q17',
      passage_id: p2.id,
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?',
      prompt: 'How neurological networks function when free from external task demands.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [C] phân tích cơ chế thần kinh: mạng lưới mặc định (default mode network) và việc các khái niệm liên kết tự do tạo đột phá sáng tạo.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q18',
      passage_id: p2.id,
      question_number: 18,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?',
      prompt: 'The prevailing contemporary societal bias viewing boredom as a purely negative state.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] nêu thành kiến xã hội: coi buồn chán là trạng thái độc hại (toxic state) cần lập tức chữa lành bằng lướt điện thoại.',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t1-q19',
      passage_id: p2.id,
      question_number: 19,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: 'Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?',
      prompt: 'An argument advocating for the conscious acceptance rather than eradication of peaceful boredom.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'E',
      academic_explanation: 'Đoạn [E] kết luận: thay vì triệt tiêu buồn chán bằng đồ công nghệ, chúng ta nên đón nhận các dạng buồn chán êm đềm như mảnh đất màu mỡ cho sáng tạo.',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q20',
      passage_id: p2.id,
      question_number: 20,
      type: 'summary_completion',
      group_header: 'Questions 20–23',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'In contemporary culture, boredom is treated like an internal [20] that requires immediate external distraction.',
      correct_answer: 'vacuum',
      acceptable_answers: JSON.stringify(['vacuum']),
      academic_explanation: 'Đoạn [A]: "...a mental vacuum that must be instantly remedied by scrolling through smartphone feeds..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t1-q21',
      passage_id: p2.id,
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 20–23',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Research demonstrated that repetitive tasks stimulated subjects to devise more [21] solutions to problems.',
      correct_answer: 'inventive',
      acceptable_answers: JSON.stringify(['inventive', 'lateral']),
      academic_explanation: 'Đoạn [B]: "...subjects exposed to tedious tasks generated significantly more inventive, lateral solutions..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q22',
      passage_id: p2.id,
      question_number: 22,
      type: 'summary_completion',
      group_header: 'Questions 20–23',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Boredom functions as an emotional [22] by prompting the mind to wander and connect ideas.',
      correct_answer: 'catalyst',
      acceptable_answers: JSON.stringify(['catalyst']),
      academic_explanation: 'Đoạn [C]: "According to cognitive theorists, boredom acts as an emotional catalyst."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q23',
      passage_id: p2.id,
      question_number: 23,
      type: 'summary_completion',
      group_header: 'Questions 20–23',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Chronic restlessness often occurs when individuals lack the capacity to sustain mental [23] on their own.',
      correct_answer: 'concentration',
      acceptable_answers: JSON.stringify(['concentration', 'attention']),
      academic_explanation: 'Đoạn [D]: "Individuals who struggle to direct their own mental concentration experience chronic dissatisfaction..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q24',
      passage_id: p2.id,
      question_number: 24,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Look at the following researchers and the list of findings. Choose the correct researcher (A, B, or C) for each statement.',
      prompt: 'Tedious, unstimulating activities can directly increase creative cognitive output.',
      options: JSON.stringify(['A. Dr. Sandi Mann', 'B. Dr. John Eastwood', 'C. Professor Thomas Goetz']),
      correct_answer: 'A. Dr. Sandi Mann',
      academic_explanation: 'Đoạn [B] chỉ ra phát hiện của Dr. Sandi Mann rằng các tác vụ tẻ nhạt giúp gia tăng khả năng sáng tạo giải quyết vấn đề.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q25',
      passage_id: p2.id,
      question_number: 25,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Choose the correct researcher (A, B, or C).',
      prompt: 'An inability to manage attention internally can lead to destructive coping mechanisms.',
      options: JSON.stringify(['A. Dr. Sandi Mann', 'B. Dr. John Eastwood', 'C. Professor Thomas Goetz']),
      correct_answer: 'B. Dr. John Eastwood',
      academic_explanation: 'Đoạn [D] trích dẫn phân tích của Dr. John Eastwood về mối liên hệ giữa buồn chán mạn tính và các hành vi tiêu cực.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q26',
      passage_id: p2.id,
      question_number: 26,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Choose the correct researcher (A, B, or C).',
      prompt: 'Boredom is not a uniform condition and can be divided into peaceful and hostile varieties.',
      options: JSON.stringify(['A. Dr. Sandi Mann', 'B. Dr. John Eastwood', 'C. Professor Thomas Goetz']),
      correct_answer: 'C. Professor Thomas Goetz',
      academic_explanation: 'Đoạn [E] mô tả nghiên cứu phân loại các biến thể buồn chán của Giáo sư Thomas Goetz.',
      paragraph_ref: 'E'
    }
  ];

  for (const q of qP2) {
    await db.query(
      `INSERT INTO cambridge_reading_questions
        (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, acceptable_answers, academic_explanation, paragraph_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        type = VALUES(type), group_header = VALUES(group_header), group_instruction = VALUES(group_instruction),
        prompt = VALUES(prompt), options = VALUES(options), correct_answer = VALUES(correct_answer),
        acceptable_answers = VALUES(acceptable_answers), academic_explanation = VALUES(academic_explanation),
        paragraph_ref = VALUES(paragraph_ref)`,
      [q.id, q.passage_id, q.question_number, q.type, q.group_header, q.group_instruction, q.prompt, q.options || null, q.correct_answer, q.acceptable_answers || null, q.academic_explanation, q.paragraph_ref]
    );
  }

  // ==========================================
  // PASSAGE 3: Artificial artists
  // ==========================================
  const p3 = {
    id: 'cambridge-13-test-1-p3',
    title: 'Artificial artists: Can computers create art?',
    subtitle: 'Exploring the boundary between human creative genius and algorithmic computation',
    source: 'Cambridge 13 - Test 1',
    topic: 'Artificial Intelligence & Fine Arts',
    difficulty: 'Passage 3 (Nâng cao)',
    estimated_minutes: 20,
    word_count: 980,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'For centuries, artistic creation was celebrated as the ultimate pinnacle of human uniqueness—an ethereal synthesis of emotional vulnerability, cultural resonance, and raw intuitive genius. However, the relentless encroachment of artificial intelligence into creative domains is destabilizing this humanist orthodoxy.'
      },
      {
        label: 'B',
        content: 'Consider the pioneering work of Harold Cohen, an accomplished British abstract painter who in the 1970s developed AARON, a pioneering computer software designed to generate autonomous visual drawings. While early iterations relied on hardcoded procedural rules, later versions possessed sophisticated models of human anatomy and spatial composition, producing intricate works exhibited in prestigious galleries worldwide.'
      },
      {
        label: 'C',
        content: 'More recently, generative adversarial networks (GANs) have accelerated this algorithmic renaissance. By pitting two neural networks against one another—a generator synthesizing imagery and a discriminator detecting flaws—machines have produced classical symphonies indistinguishable from Bach and portraits that command hundreds of thousands of dollars at auction houses like Christie’s.'
      },
      {
        label: 'D',
        content: 'Skeptics vehemently argue that machine learning models do not truly comprehend the aesthetic nuances they generate. A computer algorithm operates through statistical pattern matching, calculating token probabilities and pixel distributions without subjective emotional experience or authentic life mortality. To them, artificial art remains an empty, hollow pantomime of authentic human soul.'
      },
      {
        label: 'E',
        content: 'Conversely, philosopher Margaret Boden suggests that creativity involves combining familiar concepts in unfamiliar, valuable ways. If an algorithmic composition elicits profound wonder, emotional catharsis, and philosophical contemplation in human observers, does the biological substrate of its creator truly matter? Perhaps machine artistry does not diminish humanity, but rather holds up a mirror to our own cognitive machinery.'
      }
    ])
  };

  await db.query(
    `INSERT INTO cambridge_reading_passages 
      (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
      title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
      topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
      word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
    [p3.id, p3.title, p3.subtitle, p3.source, p3.topic, p3.difficulty, p3.estimated_minutes, p3.word_count, p3.paragraphs]
  );

  // Questions for Passage 3 (Q27 - Q40)
  const qP3 = [
    {
      id: 'c13-t1-q27',
      passage_id: p3.id,
      question_number: 27,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What does the writer emphasize about traditional human art in the opening paragraph?',
      options: JSON.stringify([
        'A. It was largely dependent on algorithmic mathematical rules.',
        'B. It was widely regarded as the supreme manifestation of human emotional individuality.',
        'C. It rarely achieved commercial recognition prior to the modern era.',
        'D. It was inferior to technological forms of artistic expression.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [A] khẳng định: "...artistic creation was celebrated as the ultimate pinnacle of human uniqueness—an ethereal synthesis of emotional vulnerability..." (Bản ngã cảm xúc độc nhất của con người).',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t1-q28',
      passage_id: p3.id,
      question_number: 28,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'Why is the AARON software significant in the history of computational art?',
      options: JSON.stringify([
        'A. It proved that machines can experience subjective human emotions.',
        'B. It was the first computer program to be completely destroyed by its creator.',
        'C. It generated independent artistic compositions that were displayed in prominent international galleries.',
        'D. It replaced human artists in all major advertising agencies.'
      ]),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [B] nêu rõ: "...producing intricate works exhibited in prestigious galleries worldwide."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q29',
      passage_id: p3.id,
      question_number: 29,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'How do generative adversarial networks (GANs) function?',
      options: JSON.stringify([
        'A. By pairing two competing neural networks that continually refine generated imagery.',
        'B. By relying entirely on manual adjustments by human computer programmers.',
        'C. By copying physical paintings with mechanical robotic brushes.',
        'D. By storing millions of photograph files on physical floppy disks.'
      ]),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [C] giải thích: "By pitting two neural networks against one another—a generator synthesizing imagery and a discriminator detecting flaws..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q30',
      passage_id: p3.id,
      question_number: 30,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'According to critics, what is the primary deficiency of algorithmic art?',
      options: JSON.stringify([
        'A. It requires excessive electrical energy to render.',
        'B. It is too expensive for private individuals to purchase.',
        'C. It lacks authentic subjective emotional experience and mortality.',
        'D. It always looks visually imperfect compared to student sketches.'
      ]),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [D] nêu quan điểm của phe phản đối: "calculating token probabilities... without subjective emotional experience or authentic life mortality."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q31',
      passage_id: p3.id,
      question_number: 31,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What perspective does philosopher Margaret Boden offer regarding machine creativity?',
      options: JSON.stringify([
        'A. Computers must possess biological flesh before they can produce true art.',
        'B. If an artwork evokes genuine wonder and contemplation, the origin of its creator is secondary.',
        'C. All algorithmic art should be banned from commercial auctions.',
        'D. Human artists will completely disappear within the next century.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [E] viết: "If an algorithmic composition elicits profound wonder... does the biological substrate of its creator truly matter?"',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q32',
      passage_id: p3.id,
      question_number: 32,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Do the following statements agree with the views of the writer? Write YES, NO, or NOT GIVEN.',
      prompt: 'Harold Cohen believed that computer programs would entirely eliminate the need for human painting tutors.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [B] chỉ nói Cohen tạo ra phần mềm AARON và các tác phẩm được trưng bày, không có thông tin về việc ông tin AI sẽ thay thế giáo viên dạy vẽ.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t1-q33',
      passage_id: p3.id,
      question_number: 33,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Computer-generated musical compositions have successfully fooled human listeners into believing they were composed by classical masters.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'YES',
      academic_explanation: 'Đoạn [C] khẳng định: "...produced classical symphonies indistinguishable from Bach..." (Không thể phân biệt với nhạc Bach thật).',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q34',
      passage_id: p3.id,
      question_number: 34,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Major art auction houses have refused to list works produced through artificial intelligence.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NO',
      academic_explanation: 'Đoạn [C] viết: "...portraits that command hundreds of thousands of dollars at auction houses like Christie\'s." (Các nhà đấu giá như Christie\'s vẫn bán tranh AI hàng trăm ngàn USD, không hề từ chối).',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t1-q35',
      passage_id: p3.id,
      question_number: 35,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Statistical pattern matching in neural networks is identical to biological human intuition.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NO',
      academic_explanation: 'Đoạn [D] lập luận rõ rằng pattern matching trong thuật toán thiếu vắng trải nghiệm cảm xúc chủ quan (subjective emotional experience) của con người.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q36',
      passage_id: p3.id,
      question_number: 36,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Machine-generated artworks frequently lose commercial value after their algorithmic origins are revealed.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Bài đọc không có thông tin về việc tranh AI bị giảm giá trị thương mại sau khi người mua biết nguồn gốc thuật toán.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t1-q37',
      passage_id: p3.id,
      question_number: 37,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Complete the summary using the list of words, A–F, below.',
      prompt: 'Advocates of artificial creativity claim that art relies on reassembling existing ideas in [37] configurations.',
      correct_answer: 'unfamiliar',
      acceptable_answers: JSON.stringify(['unfamiliar', 'novel']),
      academic_explanation: 'Đoạn [E]: "...creativity involves combining familiar concepts in unfamiliar, valuable ways."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q38',
      passage_id: p3.id,
      question_number: 38,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY.',
      prompt: 'If viewers experience emotional [38] when engaging with algorithmic pieces, the biological origin of the artist may be irrelevant.',
      correct_answer: 'catharsis',
      acceptable_answers: JSON.stringify(['catharsis']),
      academic_explanation: 'Đoạn [E]: "If an algorithmic composition elicits profound wonder, emotional catharsis..."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q39',
      passage_id: p3.id,
      question_number: 39,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY.',
      prompt: 'Rather than degrading human culture, artificial intelligence serves as a reflective [39] displaying our inner cognitive workings.',
      correct_answer: 'mirror',
      acceptable_answers: JSON.stringify(['mirror']),
      academic_explanation: 'Đoạn [E]: "...holds up a mirror to our own cognitive machinery."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t1-q40',
      passage_id: p3.id,
      question_number: 40,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY.',
      prompt: 'The emergence of machine art is fundamentally dismantling classical humanist [40] about the nature of imagination.',
      correct_answer: 'orthodoxy',
      acceptable_answers: JSON.stringify(['orthodoxy']),
      academic_explanation: 'Đoạn [A]: "...is destabilizing this humanist orthodoxy."',
      paragraph_ref: 'A'
    }
  ];

  for (const q of qP3) {
    await db.query(
      `INSERT INTO cambridge_reading_questions
        (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, acceptable_answers, academic_explanation, paragraph_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        type = VALUES(type), group_header = VALUES(group_header), group_instruction = VALUES(group_instruction),
        prompt = VALUES(prompt), options = VALUES(options), correct_answer = VALUES(correct_answer),
        acceptable_answers = VALUES(acceptable_answers), academic_explanation = VALUES(academic_explanation),
        paragraph_ref = VALUES(paragraph_ref)`,
      [q.id, q.passage_id, q.question_number, q.type, q.group_header, q.group_instruction, q.prompt, q.options || null, q.correct_answer, q.acceptable_answers || null, q.academic_explanation, q.paragraph_ref]
    );
  }

  console.log('✅ Cambridge 13 - Test 1 đã được nạp thành công (40 câu hỏi, 3 Passages)!');
}

module.exports = seedTest1;
