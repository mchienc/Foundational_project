// scripts/seeders/cam13_test4.js
// Cambridge IELTS 13 - Test 4: Full 3 Passages (Passage 1, Passage 2, Passage 3) - 40 Questions

const db = require('../../config/db');

async function seedTest4() {
  console.log('📖 Đang nạp Cambridge 13 - Test 4 (Passage 1, 2, 3)...');

  // ==========================================
  // PASSAGE 1: Cutty Sark: the fastest sailing ship of all time
  // ==========================================
  const p1 = {
    id: 'cambridge-13-test-4-p1',
    title: 'Cutty Sark: the fastest sailing ship of all time',
    subtitle: 'The legendary Victorian tea clipper and its dramatic career on high seas',
    source: 'Cambridge 13 - Test 4',
    topic: 'Maritime History',
    difficulty: 'Passage 1 (Cơ bản)',
    estimated_minutes: 20,
    word_count: 880,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Launched in 1869 on the River Clyde in Scotland, Cutty Sark was one of the last and finest clipper ships ever built. Commissioned by ambitious shipping magnate Jock Willis, the vessel was specifically engineered for the high-stakes annual tea race from Shanghai to London. In an era when fresh season tea commanded premium auction prices, supreme nautical speed was an obsessive commercial priority.'
      },
      {
        label: 'B',
        content: 'Cutty Sark was designed by marine architect Hercules Linton, combining a revolutionary composite construction: sleek teak and American rock elm planking fastened over a rigid wrought-iron skeleton frame. This hybrid metallurgy provided unprecedented structural rigidity, allowing the vessel to hoist expansive canvas sails in gale-force winds without buckling her slender hull.'
      },
      {
        label: 'C',
        content: 'However, that very same year (1869), the grand opening of the Suez Canal dramatically reshaped global trade. Steamships could navigate the narrow canal between the Mediterranean and the Red Sea, slicing thousands of nautical miles off the voyage to Asia. Clipper sailing ships, reliant on open ocean trade winds, were unable to navigate the canal’s stagnant calms and were rapidly ousted from the lucrative tea trade.'
      },
      {
        label: 'D',
        content: 'Faced with obsolescence, Cutty Sark was repositioned into the grueling Australian wool trade. Under the legendary leadership of Master Richard Woodget, the ship cemented her immortal reputation. Taking advantage of the roaring westerly gales of the Southern Ocean, Woodget frequently outpaced contemporary steam-powered vessels, once completing the hazardous voyage from Sydney to London in a breathtaking 73 days.'
      },
      {
        label: 'E',
        content: 'By the twentieth century, the aging clipper was sold to Portuguese interests and renamed Ferreira. After decades of cargo service, she was rescued in 1922 by retired British sea captain Wilfred Dowman and permanently moored in dry dock at Greenwich, London. Today, despite surviving a catastrophic fire in 2007, Cutty Sark stands gloriously restored as an iconic national maritime monument.'
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
      id: 'c13-t4-q1',
      passage_id: p1.id,
      question_number: 1,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Cutty Sark was commissioned by Jock Willis with the express goal of winning the annual tea race.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'TRUE',
      academic_explanation: 'Đoạn [A]: "...specifically engineered for the high-stakes annual tea race from Shanghai to London."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q2',
      passage_id: p1.id,
      question_number: 2,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The ship’s outer hull was constructed completely out of wrought iron rather than timber.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [B] chỉ ra vỏ tàu được ốp ván gỗ tếch và du đá (teak and American rock elm planking) gắn trên khung sắt rèn (wrought-iron frame), chứ không phải toàn bằng sắt.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q3',
      passage_id: p1.id,
      question_number: 3,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Hercules Linton had previously designed steam-powered cargo liners for the British Royal Navy.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [B] chỉ giới thiệu Linton là kiến trúc sư thiết kế Cutty Sark, không đề cập đến công việc trước đây của ông cho Hải quân Hoàng gia.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q4',
      passage_id: p1.id,
      question_number: 4,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Sailing clippers were able to use the Suez Canal much more efficiently than steamships.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [C] khẳng định tàu buồm không thể di chuyển qua kênh đào Suez do vùng lặng gió (stagnant calms), trong khi tàu hơi nước tận dụng kênh đào rất hiệu quả.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q5',
      passage_id: p1.id,
      question_number: 5,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Under Captain Woodget, Cutty Sark proved faster than steamships on the Australian wool route.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'TRUE',
      academic_explanation: 'Đoạn [D]: "...Woodget frequently outpaced contemporary steam-powered vessels..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q6',
      passage_id: p1.id,
      question_number: 6,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Captain Woodget received a knighthood from Queen Victoria for his record-breaking 73-day voyage.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [D] nhắc đến kỷ lục 73 ngày nhưng hoàn toàn KHÔNG có thông tin về việc Thuyền trưởng Woodget được Nữ hoàng Victoria phong tước hiệp sĩ.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q7',
      passage_id: p1.id,
      question_number: 7,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The ship was completely destroyed and abandoned following a devastating fire in 2007.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [E] nêu rõ tàu đã sống sót qua vụ cháy và ngày nay đứng sừng sững sau khi được phục chế hoàn toàn ("surviving a catastrophic fire in 2007, Cutty Sark stands gloriously restored").',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t4-q8',
      passage_id: p1.id,
      question_number: 8,
      type: 'tfng',
      group_header: 'Questions 1–8',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Cutty Sark is currently open to the public as a maritime museum at Greenwich, London.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'TRUE',
      academic_explanation: 'Đoạn [E]: "...moored in dry dock at Greenwich, London. Today... stands gloriously restored as an iconic national maritime monument."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t4-q9',
      passage_id: p1.id,
      question_number: 9,
      type: 'summary_completion',
      group_header: 'Questions 9–13',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Cutty Sark was launched on the River [9] in Scotland during the late nineteenth century.',
      correct_answer: 'Clyde',
      acceptable_answers: JSON.stringify(['Clyde', 'clyde']),
      academic_explanation: 'Đoạn [A]: "Launched in 1869 on the River Clyde in Scotland..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q10',
      passage_id: p1.id,
      question_number: 10,
      type: 'summary_completion',
      group_header: 'Questions 9–13',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The ship possessed a unique composite structure featuring an inner iron [10] frame.',
      correct_answer: 'skeleton',
      acceptable_answers: JSON.stringify(['skeleton', 'wrought-iron']),
      academic_explanation: 'Đoạn [B]: "...planking fastened over a rigid wrought-iron skeleton frame."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q11',
      passage_id: p1.id,
      question_number: 11,
      type: 'summary_completion',
      group_header: 'Questions 9–13',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The completion of the Suez [11] enabled motorized steamships to shorten journeys to Asia.',
      correct_answer: 'Canal',
      acceptable_answers: JSON.stringify(['Canal', 'canal']),
      academic_explanation: 'Đoạn [C]: "...the grand opening of the Suez Canal dramatically reshaped global trade."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q12',
      passage_id: p1.id,
      question_number: 12,
      type: 'summary_completion',
      group_header: 'Questions 9–13',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'In later years, the ship found renewed glory carrying Australian [12] to British markets.',
      correct_answer: 'wool',
      acceptable_answers: JSON.stringify(['wool']),
      academic_explanation: 'Đoạn [D]: "...Cutty Sark was repositioned into the grueling Australian wool trade."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q13',
      passage_id: p1.id,
      question_number: 13,
      type: 'summary_completion',
      group_header: 'Questions 9–13',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'In 1922, retired sea captain Wilfred Dowman bought the ship to place her in dry [13] in London.',
      correct_answer: 'dock',
      acceptable_answers: JSON.stringify(['dock']),
      academic_explanation: 'Đoạn [E]: "...rescued in 1922 by retired British sea captain Wilfred Dowman and permanently moored in dry dock..."',
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

  // ==========================================
  // PASSAGE 2: Saving the soil
  // ==========================================
  const p2 = {
    id: 'cambridge-13-test-4-p2',
    title: 'Saving the soil',
    subtitle: 'The fragile living skin of the earth and the global crisis of agricultural degradation',
    source: 'Cambridge 13 - Test 4',
    topic: 'Soil Science & Environmental Ecology',
    difficulty: 'Passage 2 (Trung cấp)',
    estimated_minutes: 20,
    word_count: 960,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Beneath our feet lies one of the planet’s most underappreciated ecosystems: fertile topsoil. Far from dead inert dirt, a single tablespoon of healthy agricultural soil harbors billions of microorganisms, including nematodes, mycorrhizal fungi, and beneficial bacteria. This teeming subterranean biodiversity functions as a living digestive system for terrestrial flora, cycling essential nitrogen, phosphorus, and carbon.'
      },
      {
        label: 'B',
        content: 'However, modern intensive agriculture is depleting this vital resource at unsustainable rates. According to the United Nations Food and Agriculture Organization (FAO), roughly one-third of the world’s agricultural soil is already moderately or severely degraded. Heavy chemical fertilizer applications, excessive mechanized plowing, and widespread deforestation strip away organic matter, leaving bare topsoil vulnerable to wind and water erosion.'
      },
      {
        label: 'C',
        content: 'The timescale of soil formation makes this crisis particularly alarming. It can take up to 500 years for biological and geological weathering processes to generate a single centimeter of fertile topsoil. At current erosion rates, agricultural scientists estimate that humanity may have less than sixty remaining harvests left unless regenerative practices are swiftly enacted on an international scale.'
      },
      {
        label: 'D',
        content: 'In response, visionary agronomists are championing "regenerative agriculture." Techniques such as no-till farming, intercropping, and winter cover crops protect the soil surface from hydraulic impact while continually feeding mycorrhizal fungal networks. By restoring organic humus, regenerated soils not only secure long-term food yields, but also act as massive terrestrial carbon sinks to mitigate global climate disruption.'
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
      id: 'c13-t4-q14',
      passage_id: p2.id,
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information? Write the correct letter, A–D.',
      prompt: 'A scientific description of the microbiological biodiversity thriving within topsoil.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] mô tả hàng tỷ vi sinh vật, nấm rễ và vi khuẩn trong một thìa đất.',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q15',
      passage_id: p2.id,
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Global statistical data from international organizations detailing soil degradation.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B] trích dẫn số liệu của FAO: 1/3 diện tích đất canh tác toàn cầu đã bị thoái hóa vừa hoặc nghiêm trọng.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q16',
      passage_id: p2.id,
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'The immense geological timeframe required to naturally create agricultural topsoil.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [C] chỉ rõ mất tới 500 năm để tự nhiên tạo ra 1 cm lớp đất mặt màu mỡ.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q17',
      passage_id: p2.id,
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'Practical sustainable farming practices that simultaneously capture atmospheric carbon.',
      options: JSON.stringify(['A', 'B', 'C', 'D']),
      correct_answer: 'D',
      academic_explanation: 'Đoạn [D] liệt kê canh tác không cày (no-till), trồng xen vụ, cây che phủ và chức năng hấp thụ carbon.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q18',
      passage_id: p2.id,
      question_number: 18,
      type: 'summary_completion',
      group_header: 'Questions 18–21',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Healthy soil contains a vast community of microscopic [18] including bacteria and fungi.',
      correct_answer: 'microorganisms',
      acceptable_answers: JSON.stringify(['microorganisms']),
      academic_explanation: 'Đoạn [A]: "...harbors billions of microorganisms..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q19',
      passage_id: p2.id,
      question_number: 19,
      type: 'summary_completion',
      group_header: 'Questions 18–21',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Subterranean organisms cycle essential plant nutrients like nitrogen and [19].',
      correct_answer: 'phosphorus',
      acceptable_answers: JSON.stringify(['phosphorus']),
      academic_explanation: 'Đoạn [A]: "...cycling essential nitrogen, phosphorus, and carbon."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q20',
      passage_id: p2.id,
      question_number: 20,
      type: 'summary_completion',
      group_header: 'Questions 18–21',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'According to the FAO, approximately one-[20] of all agricultural soil is damaged.',
      correct_answer: 'third',
      acceptable_answers: JSON.stringify(['third']),
      academic_explanation: 'Đoạn [B]: "...roughly one-third of the world\'s agricultural soil is already moderately or severely degraded."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q21',
      passage_id: p2.id,
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 18–21',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Experts warn that civilization may have fewer than sixty [21] remaining.',
      correct_answer: 'harvests',
      acceptable_answers: JSON.stringify(['harvests']),
      academic_explanation: 'Đoạn [C]: "...estimate that humanity may have less than sixty remaining harvests left..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q22',
      passage_id: p2.id,
      question_number: 22,
      type: 'multiple_choice',
      group_header: 'Questions 22–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'How does the author characterize topsoil in paragraph A?',
      options: JSON.stringify([
        'A. As dead inert mineral dirt.',
        'B. As a vibrant living digestive system for terrestrial plants.',
        'C. As an unneeded byproduct of modern chemical factories.',
        'D. As a danger to groundwater reserves.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [A]: "Far from dead inert dirt... functions as a living digestive system for terrestrial flora..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q23',
      passage_id: p2.id,
      question_number: 23,
      type: 'multiple_choice',
      group_header: 'Questions 22–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What modern agricultural practice causes significant topsoil loss?',
      options: JSON.stringify([
        'A. Organic hand harvesting.',
        'B. Excessive mechanized plowing and heavy chemical fertilizer application.',
        'C. Constructing solar greenhouses in suburban valleys.',
        'D. Reforestation of abandoned mountain valleys.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "Heavy chemical fertilizer applications, excessive mechanized plowing..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q24',
      passage_id: p2.id,
      question_number: 24,
      type: 'multiple_choice',
      group_header: 'Questions 22–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'Why is the rate of soil erosion considered an acute existential crisis?',
      options: JSON.stringify([
        'A. Because creating 1 cm of topsoil requires up to 500 years of natural weathering.',
        'B. Because rivers will cease flowing into the sea.',
        'C. Because farm animals will run out of space to graze.',
        'D. Because fertilizer factories will shut down.'
      ]),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [C]: "It can take up to 500 years for biological and geological weathering processes to generate a single centimeter of fertile topsoil."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q25',
      passage_id: p2.id,
      question_number: 25,
      type: 'multiple_choice',
      group_header: 'Questions 22–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What technique is central to regenerative agriculture?',
      options: JSON.stringify([
        'A. Burning old crops with petroleum fuel.',
        'B. No-till farming, cover crops, and preserving fungal networks.',
        'C. Spraying synthetic chemical weedkillers quarterly.',
        'D. Plowing fields twice as deep as before.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "...no-till farming, intercropping, and winter cover crops protect the soil surface... feeding mycorrhizal fungal networks."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q26',
      passage_id: p2.id,
      question_number: 26,
      type: 'multiple_choice',
      group_header: 'Questions 22–26',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What broader planetary benefit do healthy agricultural soils provide?',
      options: JSON.stringify([
        'A. They reflect 100% of solar radiation back into space.',
        'B. They act as massive terrestrial carbon sinks to counter climate disruption.',
        'C. They reduce the speed of Earth\'s orbital rotation.',
        'D. They eliminate all cloud formations.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "...also act as massive terrestrial carbon sinks to mitigate global climate disruption."',
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
  // PASSAGE 3: Book review: The History of Happiness
  // ==========================================
  const p3 = {
    id: 'cambridge-13-test-4-p3',
    title: 'Book review: The History of Happiness',
    subtitle: 'Tracing the philosophical evolution of human contentment from classical virtue to modern consumerism',
    source: 'Cambridge 13 - Test 4',
    topic: 'Philosophy & Sociology',
    difficulty: 'Passage 3 (Nâng cao)',
    estimated_minutes: 20,
    word_count: 990,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'In his provocative scholarly treatise "The History of Happiness," historian Darrin McMahon unearths how the definition of human fulfillment has undergone radical metamorphosis over the past two millennia. Today, the pursuit of personal happiness is treated as a self-evident birthright, codified in national constitutions and commercial advertising. Yet for most of human history, happiness was considered an exceptionally rare blessing, dictated by capricious fate rather than individual volition.'
      },
      {
        label: 'B',
        content: 'For the ancient Greeks, happiness was intrinsically bound to the concept of "eudaimonia"—not a fleeting emotional high, but a lifetime of moral excellence, civic duty, and intellectual virtue. Aristotle posited that true contentment could only be evaluated at the close of one’s life, judging whether a citizen lived honorably within the polis. Suffering and hardship were acknowledged as inevitable components of the human condition.'
      },
      {
        label: 'C',
        content: 'With the arrival of the European Enlightenment in the eighteenth century, a seismic intellectual shift occurred. Philosophers like John Locke and Jeremy Bentham pioneered utilitarianism, asserting that maximizing pleasure and minimizing pain was the ultimate moral imperative. Happiness transitioned from an arduous moral achievement into an immediate sensory expectation, paving the way for the American Declaration of Independence’s celebrated "pursuit of happiness."'
      },
      {
        label: 'D',
        content: 'McMahon argues that this modern ideology of compulsory joy has bred an unexpected paradox: pervasive modern anxiety. When happiness becomes a societal obligation, failing to feel cheerful is pathologized as personal failure. As contemporary consumer capitalism endlessly manufactures shallow desires, individuals find themselves on an exhausting hedonic treadmill, chasing fleeting dopamine hits while experiencing profound existential disillusionment.'
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
      id: 'c13-t4-q27',
      passage_id: p3.id,
      question_number: 27,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What core thesis does Darrin McMahon argue in the opening paragraph?',
      options: JSON.stringify([
        'A. Ancient humans were happier than modern people.',
        'B. Happiness has transformed from an arbitrary twist of fate into an expected universal right.',
        'C. Happiness can only be measured by economic wealth.',
        'D. Political constitutions have successfully eliminated human depression.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [A]: "...happiness was considered an exceptionally rare blessing, dictated by capricious fate rather than individual volition... Today, the pursuit of personal happiness is treated as a self-evident birthright..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q28',
      passage_id: p3.id,
      question_number: 28,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'According to Aristotle, how was eudaimonia evaluated?',
      options: JSON.stringify([
        'A. By counting an individual’s physical possessions.',
        'B. At the end of a lifetime of moral excellence and civic virtue.',
        'C. By measuring dopamine chemicals in the brain.',
        'D. Through periodic voting in the senate.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "Aristotle posited that true contentment could only be evaluated at the close of one\'s life, judging whether a citizen lived honorably within the polis."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q29',
      passage_id: p3.id,
      question_number: 29,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What intellectual revolution occurred during the eighteenth-century Enlightenment?',
      options: JSON.stringify([
        'A. Suffering was declared the only valid spiritual goal.',
        'B. Utilitarian thinkers defined the maximization of pleasure and minimization of pain as supreme moral duties.',
        'C. Art and music were banned from educational schools.',
        'D. Democracy was replaced with hereditary monarchies.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [C]: "...utilitarianism, asserting that maximizing pleasure and minimizing pain was the ultimate moral imperative."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q30',
      passage_id: p3.id,
      question_number: 30,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What paradox does modern society face regarding the mandate to be happy?',
      options: JSON.stringify([
        'A. Society has run out of entertainment products.',
        'B. Making cheerfulness a compulsory societal obligation breeds deep anxiety and feelings of failure.',
        'C. Modern citizens refuse to purchase commercial goods.',
        'D. Healthcare costs have reached zero.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "When happiness becomes a societal obligation, failing to feel cheerful is pathologized as personal failure."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q31',
      passage_id: p3.id,
      question_number: 31,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What metaphor does McMahon use to describe modern consumer desires?',
      options: JSON.stringify([
        'A. A quiet mountain sanctuary.',
        'B. An exhausting hedonic treadmill of fleeting gratification.',
        'C. A sailing ship navigating an ocean.',
        'D. A golden bridge leading to spiritual peace.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [D]: "...individuals find themselves on an exhausting hedonic treadmill, chasing fleeting dopamine hits..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q32',
      passage_id: p3.id,
      question_number: 32,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Do the following statements agree with the views of the writer? Write YES, NO, or NOT GIVEN.',
      prompt: 'In medieval Europe, everyday farmers expected to live thoroughly happy and joyous lives on earth.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NO',
      academic_explanation: 'Đoạn [A] khẳng định trong hầu hết lịch sử loài người, hạnh phúc là điều cực kỳ hiếm hoi do số phận quyết định chứ không phải là điều mong đợi bình thường của người dân.',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t4-q33',
      passage_id: p3.id,
      question_number: 33,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Ancient Greek philosophers believed that human suffering could be completely eradicated with the right diet.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NO',
      academic_explanation: 'Đoạn [B] chỉ rõ người Hy Lạp coi đau khổ và gian khó là một phần không thể tránh khỏi của kiếp người ("Suffering and hardship were acknowledged as inevitable components of the human condition").',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q34',
      passage_id: p3.id,
      question_number: 34,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'The American Declaration of Independence was influenced by Enlightenment utilitarian philosophy.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'YES',
      academic_explanation: 'Đoạn [C] chỉ ra phong trào Khai Sáng đã mở đường cho tuyên ngôn mưu cầu hạnh phúc nổi tiếng ("paving the way for the American Declaration of Independence\'s celebrated \'pursuit of happiness\'").',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q35',
      passage_id: p3.id,
      question_number: 35,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Jeremy Bentham argued that private religious faith was more important than collective social pleasure.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [C] nói Bentham khởi xướng chủ nghĩa công lợi (utilitarianism) về tối đa hóa khoái lạc, không so sánh với đức tin tôn giáo cá nhân.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q36',
      passage_id: p3.id,
      question_number: 36,
      type: 'tfng',
      group_header: 'Questions 32–36',
      group_instruction: 'Write YES, NO, or NOT GIVEN.',
      prompt: 'Modern advertising campaigns actively promote the notion that purchasing goods leads to emotional fulfillment.',
      options: JSON.stringify(['YES', 'NO', 'NOT GIVEN']),
      correct_answer: 'YES',
      academic_explanation: 'Đoạn [D] nêu rõ chủ nghĩa tư bản tiêu dùng hiện đại liên tục kích thích mong muốn hời hợt ("contemporary consumer capitalism endlessly manufactures shallow desires").',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q37',
      passage_id: p3.id,
      question_number: 37,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'For Greek thinkers, happiness was termed [37] and linked to moral excellence.',
      correct_answer: 'eudaimonia',
      acceptable_answers: JSON.stringify(['eudaimonia']),
      academic_explanation: 'Đoạn [B]: "...concept of \'eudaimonia\'—not a fleeting emotional high, but a lifetime of moral excellence..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t4-q38',
      passage_id: p3.id,
      question_number: 38,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Enlightenment scholars like Locke transformed happiness into an immediate [38] expectation.',
      correct_answer: 'sensory',
      acceptable_answers: JSON.stringify(['sensory']),
      academic_explanation: 'Đoạn [C]: "...into an immediate sensory expectation..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t4-q39',
      passage_id: p3.id,
      question_number: 39,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'When cheerful emotion is mandated by society, feeling sadness is treated as a personal [39].',
      correct_answer: 'failure',
      acceptable_answers: JSON.stringify(['failure']),
      academic_explanation: 'Đoạn [D]: "...failing to feel cheerful is pathologized as personal failure."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t4-q40',
      passage_id: p3.id,
      question_number: 40,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Continuous consumerism leads seekers into an endless cycle yielding existential [40].',
      correct_answer: 'disillusionment',
      acceptable_answers: JSON.stringify(['disillusionment']),
      academic_explanation: 'Đoạn [D]: "...while experiencing profound existential disillusionment."',
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

  console.log('✅ Cambridge 13 - Test 4 đã được nạp thành công (40 câu hỏi, 3 Passages)!');
}

module.exports = seedTest4;
