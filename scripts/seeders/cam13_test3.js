// scripts/seeders/cam13_test3.js
// Cambridge IELTS 13 - Test 3: Full 3 Passages (Passage 1, Passage 2, Passage 3) - 40 Questions

const db = require('../../config/db');

async function seedTest3() {
  console.log('📖 Đang nạp Cambridge 13 - Test 3 (Passage 1, 2, 3)...');

  // ==========================================
  // PASSAGE 1: The coconut palm
  // ==========================================
  const p1 = {
    id: 'cambridge-13-test-3-p1',
    title: 'The coconut palm',
    subtitle: 'Botany, global maritime dispersion, and multifaceted human utility of Cocos nucifera',
    source: 'Cambridge 13 - Test 3',
    topic: 'Botany & Agronomy',
    difficulty: 'Passage 1 (Cơ bản)',
    estimated_minutes: 20,
    word_count: 890,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'For centuries, the coconut palm (Cocos nucifera) has been celebrated across tropical shorelines as the "tree of life." Providing food, fresh hydration, timber, and fibrous fuel, virtually every anatomical portion of this versatile plant serves human survival. Mature palms reach heights of up to 30 meters, crowned by sweeping feather-like pinnate fronds that withstand fierce coastal tropical tempests.'
      },
      {
        label: 'B',
        content: 'The coconut fruit itself is botanically categorized not as a true nut, but as a fibrous drupe. It consists of an impermeable green outer skin (exocarp), an expansive fibrous middle layer (mesocarp) called coir, and a woody inner shell (endocarp) enclosing the white edible seed meat and liquid endosperm (coconut water). Coir is renowned for its exceptional tensile strength and salt-water resistance, making it ideal for marine ropes, fishing nets, and durable mats.'
      },
      {
        label: 'C',
        content: 'The liquid endosperm contained within young, unripe green coconuts serves as a sterile, electrolyte-rich beverage. In emergency clinical settings during World War II, field medics on remote Pacific atolls occasionally administered fresh coconut water intravenously to wounded soldiers as emergency blood plasma substitutes. As the fruit ripens, this fluid solidifies into rich white flesh, which can be pressed into coconut milk or dried into commercial copra for industrial oil extraction.'
      },
      {
        label: 'D',
        content: 'A persistent debate among evolutionary botanists centers on the historic maritime dispersion of the coconut. Possessing a buoyant, waterproof fibrous husk, viable coconut fruits can drift across open oceanic currents for over 100 days—traveling thousands of nautical miles—before washing ashore on distant volcanic sands and successfully germinating. However, human seafarers, particularly ancient Austronesian voyagers, deliberately carried coconuts across the Pacific and Indian oceans as indispensable sea provisions.'
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
      id: 'c13-t3-q1',
      passage_id: p1.id,
      question_number: 1,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'The coconut palm is often colloquially known as the tree of [1] among indigenous islanders.',
      correct_answer: 'life',
      acceptable_answers: JSON.stringify(['life']),
      academic_explanation: 'Đoạn [A]: "...celebrated across tropical shorelines as the \'tree of life\'."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q2',
      passage_id: p1.id,
      question_number: 2,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Botanists classify the coconut fruit as a fibrous [2] rather than a genuine biological nut.',
      correct_answer: 'drupe',
      acceptable_answers: JSON.stringify(['drupe']),
      academic_explanation: 'Đoạn [B]: "...botanically categorized not as a true nut, but as a fibrous drupe."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q3',
      passage_id: p1.id,
      question_number: 3,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The fibrous middle layer, known as [3], is widely woven into ropes due to its durability.',
      correct_answer: 'coir',
      acceptable_answers: JSON.stringify(['coir']),
      academic_explanation: 'Đoạn [B]: "...fibrous middle layer (mesocarp) called coir..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q4',
      passage_id: p1.id,
      question_number: 4,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'During World War II, military doctors injected fresh coconut water [4] into wounded soldiers.',
      correct_answer: 'intravenously',
      acceptable_answers: JSON.stringify(['intravenously']),
      academic_explanation: 'Đoạn [C]: "...administered fresh coconut water intravenously to wounded soldiers..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q5',
      passage_id: p1.id,
      question_number: 5,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Dried coconut flesh, termed [5], is commercially harvested to extract vegetable oil.',
      correct_answer: 'copra',
      acceptable_answers: JSON.stringify(['copra']),
      academic_explanation: 'Đoạn [C]: "...dried into commercial copra for industrial oil extraction."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q6',
      passage_id: p1.id,
      question_number: 6,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Floating coconuts can survive drifting across marine waters for more than 100 [6].',
      correct_answer: 'days',
      acceptable_answers: JSON.stringify(['days']),
      academic_explanation: 'Đoạn [D]: "...can drift across open oceanic currents for over 100 days..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q7',
      passage_id: p1.id,
      question_number: 7,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Buoyant seeds wash up on remote coastal sands and begin to [7] naturally.',
      correct_answer: 'germinate',
      acceptable_answers: JSON.stringify(['germinate', 'germinating']),
      academic_explanation: 'Đoạn [D]: "...washing ashore on distant volcanic sands and successfully germinating."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q8',
      passage_id: p1.id,
      question_number: 8,
      type: 'summary_completion',
      group_header: 'Questions 1–8',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Ancient Austronesian [8] purposefully transported coconut nuts on voyages as critical food provisions.',
      correct_answer: 'seafarers',
      acceptable_answers: JSON.stringify(['seafarers', 'voyagers']),
      academic_explanation: 'Đoạn [D]: "...ancient Austronesian voyagers, deliberately carried coconuts..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q9',
      passage_id: p1.id,
      question_number: 9,
      type: 'tfng',
      group_header: 'Questions 9–13',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Coconut palm fronds are easily broken and damaged during moderate summer storms.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [A] khẳng định tán lá dừa có thể chống chịu được bão nhiệt đới dữ dội ("withstand fierce coastal tropical tempests").',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q10',
      passage_id: p1.id,
      question_number: 10,
      type: 'tfng',
      group_header: 'Questions 9–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Coir fibers rot rapidly when continuously exposed to saline ocean water.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [B] nêu xơ dừa nổi tiếng vì khả năng chống chịu nước mặn vượt trội ("exceptional tensile strength and salt-water resistance").',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q11',
      passage_id: p1.id,
      question_number: 11,
      type: 'tfng',
      group_header: 'Questions 9–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Coconut water was universally approved by the Red Cross prior to the outbreak of World War II.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [C] nói quân y dã chiến dùng nước dừa truyền tĩnh mạch trong cấp cứu thời Thế chiến II, không có thông tin về việc Hội Chữ Thập Đỏ phê duyệt trước chiến tranh.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q12',
      passage_id: p1.id,
      question_number: 12,
      type: 'tfng',
      group_header: 'Questions 9–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'All botanists agree that ocean currents alone were responsible for distributing coconuts worldwide.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [D] nêu rõ có tranh luận (persistent debate) và con người (Austronesian seafarers) cũng đóng vai trò chủ động di chuyển quả dừa.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q13',
      passage_id: p1.id,
      question_number: 13,
      type: 'tfng',
      group_header: 'Questions 9–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Coconuts that float in the ocean for longer than three months lose all nutritional germination capability.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [D] chỉ ra dừa có thể trôi dạt hơn 100 ngày (hơn 3 tháng) mà vẫn nảy mầm thành công ("successfully germinating").',
      paragraph_ref: 'D'
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

  // ==========================================
  // PASSAGE 2: How baby talk gives infant brains a boost
  // ==========================================
  const p2 = {
    id: 'cambridge-13-test-3-p2',
    title: 'How baby talk gives infant brains a boost',
    subtitle: 'Linguistic insights into parentese and early neurodevelopment in toddlers',
    source: 'Cambridge 13 - Test 3',
    topic: 'Linguistics & Developmental Psychology',
    difficulty: 'Passage 2 (Trung cấp)',
    estimated_minutes: 20,
    word_count: 940,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Almost instinctively, adults speaking to babies adopt a distinct vocal style: elevated acoustic pitch, exaggerated musical contours, and simplified repetitive phrasing. Known in developmental linguistics as "parentese" or infant-directed speech, this phonetic modification was historically dismissed as silly nonsense. However, modern neurological scanning reveals that parentese plays a pivotal role in wiring infant neural architecture for language mastery.'
      },
      {
        label: 'B',
        content: 'At the Institute for Learning & Brain Sciences (I-LABS) at the University of Washington, researchers led by Dr. Patricia Kuhl utilized magnetoencephalography (MEG) to observe brain activation in babies listening to varying vocal registers. When exposed to parentese, the auditory and motor speech planning regions of the infants’ brains lit up synchronously, demonstrating that babies are not merely passively absorbing sound, but actively rehearsing the mechanics of vocal articulation.'
      },
      {
        label: 'C',
        content: 'Crucially, the acoustic clarity of parentese highlights phonetic boundaries. By elongating vowels—such as stretching "b-a-a-a-b-y"—caregivers provide hyper-articulated auditory maps that help infants distinguish subtle phonemic contrasts that differ between human languages. In contrast, background television noise or monotone adult conversation fails to elicit this neural coordination.'
      },
      {
        label: 'D',
        content: 'Longitudinal assessments reveal profound developmental dividends. Toddlers whose parents engaged in frequent, one-on-one parentese conversations demonstrated vocabulary sizes up to three times larger at age two compared to peers raised in households dominated by passive ambient chatter. Far from an embarrassing colloquial habit, parentese is an exquisite evolutionary bridge to human literacy.'
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
      id: 'c13-t3-q14',
      passage_id: p2.id,
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information? Write the correct letter, A–D.',
      prompt: 'Evidence from brain imaging scanners showing infants rehearsing speech mechanics.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B] trích dẫn máy quét não MEG tại I-LABS cho thấy vùng thính giác và lập kế hoạch vận động phát âm kích hoạt đồng thời.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q15',
      passage_id: p2.id,
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'A historical misconception regarding infant-directed speech as meaningless babble.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] nêu quan niệm sai lầm trong quá khứ: coi parentese là trò nói nhảm ngớ ngẩn (silly nonsense).',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q16',
      passage_id: p2.id,
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Statistical proof that one-on-one speech directly expands toddler vocabulary size.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'D',
      academic_explanation: 'Đoạn [D] đưa ra số liệu theo dõi dọc: vốn từ vựng lớn gấp 3 lần ở trẻ 2 tuổi.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q17',
      passage_id: p2.id,
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'The phonetic reason why extending vowel sounds aids infant linguistic mapping.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [C] giải thích việc kéo dài nguyên âm giúp tạo ra bản đồ ngữ âm rõ rệt phân biệt các âm vị.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q18',
      passage_id: p2.id,
      question_number: 18,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Baby talk is characterized by higher [18] and expressive musical melodies.',
      correct_answer: 'pitch',
      acceptable_answers: JSON.stringify(['pitch']),
      academic_explanation: 'Đoạn [A]: "...elevated acoustic pitch, exaggerated musical contours..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q19',
      passage_id: p2.id,
      question_number: 19,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Scientists utilized MEG brain scanning to monitor infant neural [19] during speech exposure.',
      correct_answer: 'activation',
      acceptable_answers: JSON.stringify(['activation']),
      academic_explanation: 'Đoạn [B]: "...observe brain activation in babies listening to varying vocal registers."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q20',
      passage_id: p2.id,
      question_number: 20,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Scans revealed that babies actively practice speech [20] rather than merely listening passively.',
      correct_answer: 'articulation',
      acceptable_answers: JSON.stringify(['articulation']),
      academic_explanation: 'Đoạn [B]: "...actively rehearsing the mechanics of vocal articulation."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q21',
      passage_id: p2.id,
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Hyper-articulated speech helps children recognize subtle [21] contrasts between words.',
      correct_answer: 'phonemic',
      acceptable_answers: JSON.stringify(['phonemic', 'phonetic']),
      academic_explanation: 'Đoạn [C]: "...distinguish subtle phonemic contrasts that differ between human languages."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q22',
      passage_id: p2.id,
      question_number: 22,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Passive background sound from a [22] does not trigger similar infant neural synchronization.',
      correct_answer: 'television',
      acceptable_answers: JSON.stringify(['television', 'tv']),
      academic_explanation: 'Đoạn [C]: "In contrast, background television noise or monotone adult conversation fails..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q23',
      passage_id: p2.id,
      question_number: 23,
      type: 'summary_completion',
      group_header: 'Questions 18–23',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'At age two, toddlers spoken to in parentese developed a larger [23] count than other peers.',
      correct_answer: 'vocabulary',
      acceptable_answers: JSON.stringify(['vocabulary']),
      academic_explanation: 'Đoạn [D]: "...vocabulary sizes up to three times larger at age two..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q24',
      passage_id: p2.id,
      question_number: 24,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What was the historical attitude toward parentese in academic circles?',
      options: JSON.stringify([
        'A. It was considered essential for learning ancient Greek.',
        'B. It was dismissed as silly, meaningless babble.',
        'C. It was prescribed as a cure for childhood illnesses.',
        'D. It was viewed as dangerous to vocal cord health.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [A]: "...this phonetic modification was historically dismissed as silly nonsense."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q25',
      passage_id: p2.id,
      question_number: 25,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What does Dr. Patricia Kuhl’s research team suggest about infant listeners?',
      options: JSON.stringify([
        'A. They ignore adult speech in favor of music.',
        'B. They are actively rehearsing mouth motor movements to speak.',
        'C. They can only hear low frequency sounds.',
        'D. They lose brain cells when exposed to loud voices.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "...babies are not merely passively absorbing sound, but actively rehearsing the mechanics of vocal articulation."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q26',
      passage_id: p2.id,
      question_number: 26,
      type: 'multiple_choice',
      group_header: 'Questions 24–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What metaphor does the author use in the final sentence to summarize parentese?',
      options: JSON.stringify([
        'A. A wall of defense against foreign words.',
        'B. A biological compass for navigating childhood.',
        'C. An exquisite evolutionary bridge to human literacy.',
        'D. A golden key unlocking artistic talent.'
      ]),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [D]: "...parentese is an exquisite evolutionary bridge to human literacy."',
      paragraph_ref: 'D'
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
  // PASSAGE 3: Whatever happened to the Harappan Civilisation?
  // ==========================================
  const p3 = {
    id: 'cambridge-13-test-3-p3',
    title: 'Whatever happened to the Harappan Civilisation?',
    subtitle: 'Paleoclimatological investigations into the mystery of the Indus Valley collapse',
    source: 'Cambridge 13 - Test 3',
    topic: 'Archaeology & Paleoclimatology',
    difficulty: 'Passage 3 (Nâng cao)',
    estimated_minutes: 20,
    word_count: 990,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Flourishing between 2600 and 1900 BCE along the fertile floodplains of the Indus River basin (spanning modern Pakistan and northwest India), the Harappan or Indus Valley Civilisation was an architectural colossus. Encompassing monumental planned cities like Mohenjo-daro and Harappa, it boasted sophisticated kiln-fired brick architecture, hydraulic sewage networks, and standardized weights.'
      },
      {
        label: 'B',
        content: 'Yet around 1900 BCE, this grand urban network experienced rapid desolation. Cities were abandoned, writing systems vanished, and populations dispersed into small agricultural hamlets. Early twentieth-century archaeologists posited that devastating nomadic invasions by Indo-Aryan warriors destroyed the cities. However, forensic excavation revealed an absence of widespread weapon trauma or burned battle layers.'
      },
      {
        label: 'C',
        content: 'In recent years, an interdisciplinary consortium of geologists and archaeologists led by Dr. Cameron Petrie at Cambridge University has examined sediment cores from ancient dry lakebeds. Their findings suggest that the Harappans fell victim not to military violence, but to profound climate upheaval: a weakening of the Indian summer monsoon that caused prolonged, multi-century megadroughts.'
      },
      {
        label: 'D',
        content: 'Faced with dwindling river discharge and failing summer crops, the Harappans displayed remarkable resilience by switching from water-thirsty summer cereals (wheat and barley) to drought-resistant winter crops like millet. However, this agrarian decentralization reduced municipal agricultural surpluses, ultimately making it impossible to sustain high-density urban populations.'
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
      id: 'c13-t3-q27',
      passage_id: p3.id,
      question_number: 27,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: 'Which paragraph contains the following information? Write the correct letter, A–D.',
      prompt: 'A debunking of early invasion theories due to a lack of skeletal battle injuries.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B] phản bác giả thuyết xâm lăng của người Aryan do không tìm thấy vết thương chiến trận hay dấu tích thành phố bị đốt phá.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q28',
      passage_id: p3.id,
      question_number: 28,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Archaeological evidence of advanced urban planning and hydraulic municipal systems.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] mô tả các thành phố Mohenjo-daro và Harappa với quy hoạch chuẩn, mạng lưới thoát nước và gạch nung.',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q29',
      passage_id: p3.id,
      question_number: 29,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Analysis of lake sediment cores verifying severe climatic drought patterns.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [C] nói về nghiên cứu trầm tích đáy hồ của nhóm Cameron Petrie chứng minh gió mùa suy yếu và hạn hán kéo dài.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q30',
      passage_id: p3.id,
      question_number: 30,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Agricultural adaptation involving transitioning to hardier cereal crops.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'D',
      academic_explanation: 'Đoạn [D] nói về sự thích ứng nông nghiệp: chuyển từ lúa mì/lúa mạch háo nước sang kê chịu hạn.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q31',
      passage_id: p3.id,
      question_number: 31,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'The geographical span of the civilization across modern South Asian borders.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] nêu phạm vi địa lý: trải dài lưu vực sông Ấn qua Pakistan và Tây Bắc Ấn Độ ngày nay.',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q32',
      passage_id: p3.id,
      question_number: 32,
      type: 'summary_completion',
      group_header: 'Questions 32–36',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Harappan metropolitan centers featured standardized [32] and advanced drainage networks.',
      correct_answer: 'weights',
      acceptable_answers: JSON.stringify(['weights', 'brick']),
      academic_explanation: 'Đoạn [A]: "...hydraulic sewage networks, and standardized weights."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t3-q33',
      passage_id: p3.id,
      question_number: 33,
      type: 'summary_completion',
      group_header: 'Questions 32–36',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Early historians incorrectly blamed nomadic [33] incursions for the destruction of the cities.',
      correct_answer: 'Indo-Aryan',
      acceptable_answers: JSON.stringify(['Indo-Aryan', 'warriors']),
      academic_explanation: 'Đoạn [B]: "...nomadic invasions by Indo-Aryan warriors destroyed the cities."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q34',
      passage_id: p3.id,
      question_number: 34,
      type: 'summary_completion',
      group_header: 'Questions 32–36',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Dr. Petrie investigated [34] samples from desiccated prehistoric lakebeds.',
      correct_answer: 'sediment',
      acceptable_answers: JSON.stringify(['sediment']),
      academic_explanation: 'Đoạn [C]: "...examined sediment cores from ancient dry lakebeds."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q35',
      passage_id: p3.id,
      question_number: 35,
      type: 'summary_completion',
      group_header: 'Questions 32–36',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The primary environmental trigger of societal decline was the weakening of the summer [35].',
      correct_answer: 'monsoon',
      acceptable_answers: JSON.stringify(['monsoon']),
      academic_explanation: 'Đoạn [C]: "...a weakening of the Indian summer monsoon..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t3-q36',
      passage_id: p3.id,
      question_number: 36,
      type: 'summary_completion',
      group_header: 'Questions 32–36',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Farmers replaced water-thirsty crops with hardier grains such as [36].',
      correct_answer: 'millet',
      acceptable_answers: JSON.stringify(['millet']),
      academic_explanation: 'Đoạn [D]: "...to drought-resistant winter crops like millet."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q37',
      passage_id: p3.id,
      question_number: 37,
      type: 'multiple_choice',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'Why did 20th-century archaeologists believe the Harappans were conquered militarily?',
      options: JSON.stringify([
        'A. They found ancient treaties signed with Rome.',
        'B. They presumed nomadic Indo-Aryan warriors had destroyed the cities.',
        'C. They discovered large iron cannonballs inside Mohenjo-daro.',
        'D. They deciphered local stone inscriptions detailing naval wars.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "Early twentieth-century archaeologists posited that devastating nomadic invasions by Indo-Aryan warriors destroyed the cities."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q38',
      passage_id: p3.id,
      question_number: 38,
      type: 'multiple_choice',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What physical evidence disproved the warfare invasion hypothesis?',
      options: JSON.stringify([
        'A. Skeletons were found buried in gold sarcophagi.',
        'B. The complete absence of burned city layers and skeletal trauma wounds.',
        'C. Historical letters found in Mesopotamian libraries.',
        'D. Modern satellite maps proving rivers never existed.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "...revealed an absence of widespread weapon trauma or burned battle layers."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t3-q39',
      passage_id: p3.id,
      question_number: 39,
      type: 'multiple_choice',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'How did Harappan farmers react to declining monsoon precipitation?',
      options: JSON.stringify([
        'A. They built massive concrete dams across the Indus River.',
        'B. They switched cultivation to drought-resistant millet crops.',
        'C. They imported all grain from foreign Mediterranean empires.',
        'D. They completely ceased all agricultural farming.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "...switching from water-thirsty summer cereals (wheat and barley) to drought-resistant winter crops like millet."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t3-q40',
      passage_id: p3.id,
      question_number: 40,
      type: 'multiple_choice',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What was the ultimate consequence of rural agricultural decentralization?',
      options: JSON.stringify([
        'A. It created massive economic wealth for urban kings.',
        'B. It diminished agricultural food surpluses required to maintain dense city centers.',
        'C. It forced all citizens to move into mountain caves.',
        'D. It led to immediate reunification under a single military emperor.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "...this agrarian decentralization reduced municipal agricultural surpluses, ultimately making it impossible to sustain high-density urban populations."',
      paragraph_ref: 'D'
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

  console.log('✅ Cambridge 13 - Test 3 đã được nạp thành công (40 câu hỏi, 3 Passages)!');
}

module.exports = seedTest3;
