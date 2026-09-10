// scripts/seeders/cam13_test2.js
// Cambridge IELTS 13 - Test 2: Full 3 Passages (Passage 1, Passage 2, Passage 3) - 40 Questions

const db = require('../../config/db');

async function seedTest2() {
  console.log('📖 Đang nạp Cambridge 13 - Test 2 (Passage 1, 2, 3)...');

  // ==========================================
  // PASSAGE 1: Bringing cinnamon to Europe
  // ==========================================
  const p1 = {
    id: 'cambridge-13-test-2-p1',
    title: 'Bringing cinnamon to Europe',
    subtitle: 'The lucrative history of the ancient spice trade and colonial monopolies',
    source: 'Cambridge 13 - Test 2',
    topic: 'World History & Commerce',
    difficulty: 'Passage 1 (Cơ bản)',
    estimated_minutes: 20,
    word_count: 880,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Cinnamon is an aromatic spice harvested from the inner bark of trees belonging to the Cinnamomum genus. Today it is a ubiquitous pantry staple, but in classical antiquity and the Middle Ages, cinnamon was an exorbitant luxury commodity. In biblical times, it was employed as sacred anointing oil, while ancient Egyptians incorporated it into elaborate embalming concoctions for the afterlife.'
      },
      {
        label: 'B',
        content: 'Throughout the medieval period, European culinary elites craved cinnamon not merely as a culinary flavoring, but as a prestigious signifier of aristocratic wealth. Additionally, physicians prescribed it as a potent therapeutic agent to treat indigestion, respiratory ailments, and even symptoms of the deadly bubonic plague. Because supply was sparse, prices soared to staggering heights.'
      },
      {
        label: 'C',
        content: 'For centuries, the true botanical origin of cinnamon was shrouded in deliberate mystique. Arab traders, who transported the spice via grueling overland camel caravans from India and Alexandria, fabricated fantastical tales to protect their commercial monopoly. They spun fables of colossal raptor birds constructing nests out of cinnamon sticks on sheer mountain cliffs, which brave traders could only retrieve through perilous trickery.'
      },
      {
        label: 'D',
        content: 'By the sixteenth century, Portuguese explorer Lourenço de Almeida sailed to the teardrop-shaped island of Ceylon (modern-day Sri Lanka). Realizing they had reached the epicenter of authentic wild cinnamon, the Portuguese forcefully subdued local rulers and erected fortifications at Colombo. They enforced a brutal commercial monopoly, enslaving indigenous laborers to harvest quotas of peeled bark under threat of severe corporal punishment.'
      },
      {
        label: 'E',
        content: 'In 1658, the Dutch East India Company ousted the Portuguese and seized sovereign control of the trade. Seeking to maximize efficiency, the Dutch initiated systematic commercial cultivation, replacing chaotic foraging with neatly organized plantations. However, by the early nineteenth century, cinnamon trees were successfully transplanted across the Caribbean, Brazil, and Indonesia, shattering the exclusive monopoly and permanently democratizing spice access across the globe.'
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
      id: 'c13-t2-q1',
      passage_id: p1.id,
      question_number: 1,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Complete the notes below. Write ONE WORD ONLY from the passage for each answer.',
      prompt: 'In biblical times, cinnamon was blended with other ingredients to produce holy [1] oil.',
      correct_answer: 'anointing',
      acceptable_answers: JSON.stringify(['anointing']),
      academic_explanation: 'Đoạn [A]: "In biblical times, it was employed as sacred anointing oil..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q2',
      passage_id: p1.id,
      question_number: 2,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'Ancient Egyptian priests included cinnamon within sacred [2] mixtures to preserve bodies.',
      correct_answer: 'embalming',
      acceptable_answers: JSON.stringify(['embalming']),
      academic_explanation: 'Đoạn [A]: "...ancient Egyptians incorporated it into elaborate embalming concoctions for the afterlife."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q3',
      passage_id: p1.id,
      question_number: 3,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'In medieval Europe, the spice was used as a public display of aristocratic [3] among nobility.',
      correct_answer: 'wealth',
      acceptable_answers: JSON.stringify(['wealth']),
      academic_explanation: 'Đoạn [B]: "...as a prestigious signifier of aristocratic wealth."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q4',
      passage_id: p1.id,
      question_number: 4,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'Doctors recommended cinnamon as a medical cure for stomach problems and symptoms of the [4] plague.',
      correct_answer: 'bubonic',
      acceptable_answers: JSON.stringify(['bubonic']),
      academic_explanation: 'Đoạn [B]: "...and even symptoms of the deadly bubonic plague."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q5',
      passage_id: p1.id,
      question_number: 5,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'To safeguard their trade dominance, Arab merchants spread fictitious myths to protect their commercial [5].',
      correct_answer: 'monopoly',
      acceptable_answers: JSON.stringify(['monopoly']),
      academic_explanation: 'Đoạn [C]: "...fabricated fantastical tales to protect their commercial monopoly."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q6',
      passage_id: p1.id,
      question_number: 6,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'Folkloric stories claimed that predatory [6] built nests out of spice bark on dangerous cliffs.',
      correct_answer: 'birds',
      acceptable_answers: JSON.stringify(['birds', 'raptor']),
      academic_explanation: 'Đoạn [C]: "They spun fables of colossal raptor birds constructing nests out of cinnamon sticks..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q7',
      passage_id: p1.id,
      question_number: 7,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'Portuguese sailors arrived in Ceylon and built a military base at [7] to control production.',
      correct_answer: 'Colombo',
      acceptable_answers: JSON.stringify(['Colombo', 'colombo']),
      academic_explanation: 'Đoạn [D]: "...subdued local rulers and erected fortifications at Colombo."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q8',
      passage_id: p1.id,
      question_number: 8,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'The Dutch East India Company transitioned from collecting wild bark to establishing organized [8].',
      correct_answer: 'plantations',
      acceptable_answers: JSON.stringify(['plantations']),
      academic_explanation: 'Đoạn [E]: "...replacing chaotic foraging with neatly organized plantations."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t2-q9',
      passage_id: p1.id,
      question_number: 9,
      type: 'summary_completion',
      group_header: 'Questions 1–9',
      group_instruction: 'Write ONE WORD ONLY from the passage.',
      prompt: 'Cinnamon cultivation spread across the Caribbean and [9], ending exclusive colonial control.',
      correct_answer: 'Brazil',
      acceptable_answers: JSON.stringify(['Brazil', 'brazil', 'Indonesia']),
      academic_explanation: 'Đoạn [E]: "...transplanted across the Caribbean, Brazil, and Indonesia..."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t2-q10',
      passage_id: p1.id,
      question_number: 10,
      type: 'tfng',
      group_header: 'Questions 10–13',
      group_instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'In the Middle Ages, only members of the royal family were legally permitted to purchase cinnamon.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [B] chỉ nói quế là biểu tượng xa hoa của giới thượng lưu quý tộc (aristocratic wealth), không có luật nào quy định chỉ hoàng gia mới được phép mua.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q11',
      passage_id: p1.id,
      question_number: 11,
      type: 'tfng',
      group_header: 'Questions 10–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'Arab traders traveled entirely by sea across the Atlantic Ocean to transport spices to Europe.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [C] nêu rõ thương nhân Ả Rập vận chuyển quế bằng đoàn lạc đà đường bộ (overland camel caravans) từ Ấn Độ và Alexandria chứ không phải đi bằng đường biển vượt Đại Tây Dương.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q12',
      passage_id: p1.id,
      question_number: 12,
      type: 'tfng',
      group_header: 'Questions 10–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The Portuguese treated local workers in Ceylon humanely during the spice harvesting process.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'FALSE',
      academic_explanation: 'Đoạn [D] viết: "They enforced a brutal commercial monopoly, enslaving indigenous laborers to harvest quotas of peeled bark under threat of severe corporal punishment."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q13',
      passage_id: p1.id,
      question_number: 13,
      type: 'tfng',
      group_header: 'Questions 10–13',
      group_instruction: 'Write TRUE, FALSE, or NOT GIVEN.',
      prompt: 'The Dutch government earned greater tax revenues from cinnamon than from any other agricultural commodity.',
      options: JSON.stringify(['TRUE', 'FALSE', 'NOT GIVEN']),
      correct_answer: 'NOT GIVEN',
      academic_explanation: 'Đoạn [E] chỉ đề cập người Hà Lan tối ưu hóa sản lượng bằng đồn điền, hoàn toàn KHÔNG có số liệu so sánh thuế thu nhập của quế với các nông sản khác.',
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
  // PASSAGE 2: Oxytocin: The love hormone
  // ==========================================
  const p2 = {
    id: 'cambridge-13-test-2-p2',
    title: 'Oxytocin: The love hormone',
    subtitle: 'Examining the complex social neurobiology of empathy, trust, and ingroup bias',
    source: 'Cambridge 13 - Test 2',
    topic: 'Neurobiology & Psychology',
    difficulty: 'Passage 2 (Trung cấp)',
    estimated_minutes: 20,
    word_count: 950,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'Oxytocin is a small peptide hormone and neurotransmitter manufactured in the hypothalamus and released into the bloodstream via the posterior pituitary gland. In popular culture and tabloid journalism, it is frequently hailed as the "cuddle chemical" or the "moral molecule," celebrated for fostering romantic attachment, maternal bonding, and unreserved social benevolence.'
      },
      {
        label: 'B',
        content: 'In seminal early clinical trials, Swiss neuroscientist Markus Heinrichs discovered that intranasal administration of oxytocin prompted human subjects to exhibit elevated financial trust during economic bargaining games. Investors who received a puff of oxytocin transferred significantly larger sums of money to anonymous partners compared to placebo cohorts.'
      },
      {
        label: 'C',
        content: 'Subsequent inquiries, however, revealed that oxytocin does not merely promote universal altruism. Dr. Simone Shamay-Tsoory at the University of Haifa conducted experiments demonstrating that when placed in competitive social environments, individuals given oxytocin experienced elevated levels of envy (schadenfreude) when rivals failed, and heightened gloating when winning.'
      },
      {
        label: 'D',
        content: 'Furthermore, social psychologist Carsten De Dreu observed that oxytocin sharpens the cognitive demarcation between "us" and "them." In social dilemma tasks, oxytocin increased sacrificial loyalty toward members of an individual’s own ingroup, but concurrently magnified defensive aggression and xenophobic skepticism toward outgroup outsiders.'
      },
      {
        label: 'E',
        content: 'These contradictory findings have prompted neuroscientists to formulate the "social salience hypothesis." Rather than functioning as a simplistic empathy switch, oxytocin amplifies the brain’s perception of environmental social cues. Depending on a person’s psychological predispositions, cultural upbringing, and immediate context, oxytocin can promote either deep compassion or intense territorial defense.'
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
      id: 'c13-t2-q14',
      passage_id: p2.id,
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information? Write the correct letter, A–E.',
      prompt: 'A reference to economic investment games demonstrating increased willingness to trust strangers.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B] mô tả thử nghiệm kinh tế của Markus Heinrichs: người dùng oxytocin chuyển số tiền lớn hơn nhiều cho đối tác vô danh.',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q15',
      passage_id: p2.id,
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'An explanation of oxytocin triggering feelings of envy and malicious satisfaction.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [C] nói về nghiên cứu của Simone Shamay-Tsoory: oxytocin làm gia tăng cảm giác đố kỵ và hả hê (schadenfreude).',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q16',
      passage_id: p2.id,
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'The biological origin and colloquial media nicknames associated with oxytocin.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [A] nêu nguồn gốc (hypothalamus / tuyến yên) và các biệt danh báo chí: "cuddle chemical", "moral molecule".',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q17',
      passage_id: p2.id,
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: 'Which paragraph contains the following information?',
      prompt: 'A comprehensive theory explaining oxytocin as a magnifier of environmental social cues.',
      options: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
      correct_answer: 'E',
      academic_explanation: 'Đoạn [E] giải thích giả thuyết "social salience hypothesis": oxytocin khuếch đại sự chú ý đối với các tín hiệu xã hội xung quanh.',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t2-q18',
      passage_id: p2.id,
      question_number: 18,
      type: 'multiple_choice',
      group_header: 'Questions 18–20',
      group_instruction: 'Look at the following researchers and the statements below. Match each researcher (A, B, or C) to their finding.',
      prompt: 'Oxytocin stimulates loyalty toward members of one\'s own community while intensifying bias against outsiders.',
      options: JSON.stringify(['A. Markus Heinrichs', 'B. Dr. Simone Shamay-Tsoory', 'C. Carsten De Dreu']),
      correct_answer: 'C. Carsten De Dreu',
      academic_explanation: 'Đoạn [D] mô tả nghiên cứu của Carsten De Dreu về ranh giới ingroup vs outgroup.',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q19',
      passage_id: p2.id,
      question_number: 19,
      type: 'multiple_choice',
      group_header: 'Questions 18–20',
      group_instruction: 'Choose the correct researcher (A, B, or C).',
      prompt: 'Administering oxytocin through the nose leads to greater monetary sharing with anonymous partners.',
      options: JSON.stringify(['A. Markus Heinrichs', 'B. Dr. Simone Shamay-Tsoory', 'C. Carsten De Dreu']),
      correct_answer: 'A. Markus Heinrichs',
      academic_explanation: 'Đoạn [B] trích dẫn phát hiện của Markus Heinrichs qua đường xịt mũi (intranasal administration).',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q20',
      passage_id: p2.id,
      question_number: 20,
      type: 'multiple_choice',
      group_header: 'Questions 18–20',
      group_instruction: 'Choose the correct researcher (A, B, or C).',
      prompt: 'In competitive situations, oxytocin amplifies negative emotions when competitors underperform.',
      options: JSON.stringify(['A. Markus Heinrichs', 'B. Dr. Simone Shamay-Tsoory', 'C. Carsten De Dreu']),
      correct_answer: 'B. Dr. Simone Shamay-Tsoory',
      academic_explanation: 'Đoạn [C] nói về thử nghiệm của Dr. Simone Shamay-Tsoory trong bối cảnh thi đấu cạnh tranh.',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q21',
      passage_id: p2.id,
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Oxytocin is manufactured in the hypothalamus before being dispersed through the [21] gland.',
      correct_answer: 'pituitary',
      acceptable_answers: JSON.stringify(['pituitary']),
      academic_explanation: 'Đoạn [A]: "...via the posterior pituitary gland."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q22',
      passage_id: p2.id,
      question_number: 22,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Popular media often calls oxytocin the cuddle [22] due to its role in maternal attachment.',
      correct_answer: 'chemical',
      acceptable_answers: JSON.stringify(['chemical']),
      academic_explanation: 'Đoạn [A]: "...hailed as the \'cuddle chemical\'..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q23',
      passage_id: p2.id,
      question_number: 23,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Early research proved subjects transferred larger funds to an [23] participant during negotiations.',
      correct_answer: 'anonymous',
      acceptable_answers: JSON.stringify(['anonymous']),
      academic_explanation: 'Đoạn [B]: "...transferred significantly larger sums of money to anonymous partners..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q24',
      passage_id: p2.id,
      question_number: 24,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'However, later findings confirmed it does not simply cultivate universal [24] across mankind.',
      correct_answer: 'altruism',
      acceptable_answers: JSON.stringify(['altruism', 'benevolence']),
      academic_explanation: 'Đoạn [C]: "...does not merely promote universal altruism."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q25',
      passage_id: p2.id,
      question_number: 25,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The chemical sharpens loyalty to an ingroup while increasing hostility toward [25] populations.',
      correct_answer: 'outgroup',
      acceptable_answers: JSON.stringify(['outgroup']),
      academic_explanation: 'Đoạn [D]: "...magnified defensive aggression and xenophobic skepticism toward outgroup outsiders."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q26',
      passage_id: p2.id,
      question_number: 26,
      type: 'summary_completion',
      group_header: 'Questions 21–26',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'The social salience model posits that the hormone sharpens how people process external social [26].',
      correct_answer: 'cues',
      acceptable_answers: JSON.stringify(['cues']),
      academic_explanation: 'Đoạn [E]: "...amplifies the brain\'s perception of environmental social cues."',
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
  // PASSAGE 3: Making the most of trends
  // ==========================================
  const p3 = {
    id: 'cambridge-13-test-2-p3',
    title: 'Making the most of trends',
    subtitle: 'Strategic frameworks for corporate executives facing seismic shifts in consumer behavior',
    source: 'Cambridge 13 - Test 2',
    topic: 'Business Strategy & Marketing',
    difficulty: 'Passage 3 (Nâng cao)',
    estimated_minutes: 20,
    word_count: 980,
    paragraphs: JSON.stringify([
      {
        label: 'A',
        content: 'When powerful socioeconomic trends emerge, corporate managers often struggle to respond effectively. Many default to superficial cosmetic adjustments—slapping a green label on an existing product or launching an ephemeral social media campaign. To build durable competitive advantage, business theorists argue that companies must adopt systematic strategic frameworks to leverage trends.'
      },
      {
        label: 'B',
        content: 'The first strategic posture is "Infuse and Augment." Here, an enterprise retains the foundational value proposition of its core product while weaving in elements of a trend to rejuvenate customer interest. A prime example is athletic footwear manufacturer Nike, which recognized the burgeoning digital connectivity trend and launched Nike+, integrating microchips into running shoes that synced biometric telemetry with Apple iPods.'
      },
      {
        label: 'C',
        content: 'A second, more radical approach is "Combine and Transcend." Rather than simply adding a feature, a firm combines aspects of the trend with its existing offerings to engineer a completely unprecedented product category. Consider luxury watchmaker Swatch: by fusing functional quartz timekeeping with disposable high-fashion aesthetics, it created a trend-defying accessory that altered consumer perceptions of wristwatches forever.'
      },
      {
        label: 'D',
        content: 'Finally, the "Counteract and Reaffirm" strategy involves identifying negative consumer anxieties sparked by a trend and deliberately building a brand proposition that opposes it. For example, in an era obsessed with video game screens and indoor digital isolation, toymaker Hasbro revitalized classic tactile board games, marketing face-to-face social connection as an antidote to screen fatigue.'
      },
      {
        label: 'E',
        content: 'Ultimately, successful trend adoption requires deep empathy for changing human needs rather than blind mimicry of popular buzzwords. By thoughtfully selecting between infusing, combining, or counteracting, business leaders can transform turbulent market shifts into enduring engines of commercial growth.'
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
      id: 'c13-t2-q27',
      passage_id: p3.id,
      question_number: 27,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'In the opening paragraph, what criticism does the author make about typical managerial responses to trends?',
      options: JSON.stringify([
        'A. They invest too heavily in long-term academic research.',
        'B. They tend to rely on superficial cosmetic adjustments rather than substantive redesigns.',
        'C. They completely ignore digital communication channels.',
        'D. They lower product prices to an unsustainable level.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [A] phê phán: "Many default to superficial cosmetic adjustments—slapping a green label on an existing product..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q28',
      passage_id: p3.id,
      question_number: 28,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'How did Nike successfully implement the "Infuse and Augment" strategy?',
      options: JSON.stringify([
        'A. By manufacturing sports apparel out of recycled plastic bottles.',
        'B. By integrating sensor microchips into shoes that synchronized with Apple devices.',
        'C. By opening physical health food restaurants inside major stadiums.',
        'D. By giving away running shoes free of charge to marathon participants.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [B]: "...launched Nike+, integrating microchips into running shoes that synced biometric telemetry with Apple iPods."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q29',
      passage_id: p3.id,
      question_number: 29,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What distinguished Swatch’s "Combine and Transcend" strategy in the wristwatch market?',
      options: JSON.stringify([
        'A. It created luxury mechanical gold watches for older collectors.',
        'B. It merged accurate quartz functionality with trendy, affordable fashion aesthetics.',
        'C. It ceased all international distribution to focus on Swiss domestic buyers.',
        'D. It partnered exclusively with military airlines.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [C]: "...by fusing functional quartz timekeeping with disposable high-fashion aesthetics..."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q30',
      passage_id: p3.id,
      question_number: 30,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'Why did Hasbro adopt a "Counteract and Reaffirm" strategy with physical board games?',
      options: JSON.stringify([
        'A. To offer families a tactile, face-to-face alternative to pervasive screen fatigue.',
        'B. Because plastic components became too cheap to produce.',
        'C. To encourage young children to pursue software coding careers.',
        'D. In response to strict international copyright lawsuits.'
      ]),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [D]: "...marketing face-to-face social connection as an antidote to screen fatigue."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q31',
      passage_id: p3.id,
      question_number: 31,
      type: 'multiple_choice',
      group_header: 'Questions 27–31',
      group_instruction: 'Choose the correct letter, A, B, C or D.',
      prompt: 'What overarching advice does the author conclude with in the final paragraph?',
      options: JSON.stringify([
        'A. Companies should automatically copy every viral social media trend.',
        'B. Successful innovation requires understanding shifting human needs rather than blindly copying buzzwords.',
        'C. Business leaders should never change their product features once released.',
        'D. Traditional manufacturing will become obsolete within the next five years.'
      ]),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [E]: "...requires deep empathy for changing human needs rather than blind mimicry of popular buzzwords."',
      paragraph_ref: 'E'
    },
    {
      id: 'c13-t2-q32',
      passage_id: p3.id,
      question_number: 32,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      prompt: 'Firms that fail to innovate often limit their responses to [32] adjustments like green packaging.',
      correct_answer: 'cosmetic',
      acceptable_answers: JSON.stringify(['cosmetic', 'superficial']),
      academic_explanation: 'Đoạn [A]: "Many default to superficial cosmetic adjustments..."',
      paragraph_ref: 'A'
    },
    {
      id: 'c13-t2-q33',
      passage_id: p3.id,
      question_number: 33,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Under the infuse strategy, an enterprise maintains the [33] value of its existing product line.',
      correct_answer: 'core',
      acceptable_answers: JSON.stringify(['core', 'foundational']),
      academic_explanation: 'Đoạn [B]: "...retains the foundational value proposition of its core product..."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q34',
      passage_id: p3.id,
      question_number: 34,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Sensors in running shoes recorded runners\' biometric [34] for playback on audio devices.',
      correct_answer: 'telemetry',
      acceptable_answers: JSON.stringify(['telemetry']),
      academic_explanation: 'Đoạn [B]: "...synced biometric telemetry with Apple iPods."',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q35',
      passage_id: p3.id,
      question_number: 35,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Combining a trend with existing assets can create an entirely new market [35] for buyers.',
      correct_answer: 'category',
      acceptable_answers: JSON.stringify(['category']),
      academic_explanation: 'Đoạn [C]: "...engineer a completely unprecedented product category."',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q36',
      passage_id: p3.id,
      question_number: 36,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Counteracting involves recognizing consumer [36] caused by technological changes.',
      correct_answer: 'anxieties',
      acceptable_answers: JSON.stringify(['anxieties', 'fatigue']),
      academic_explanation: 'Đoạn [D]: "...identifying negative consumer anxieties sparked by a trend..."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q37',
      passage_id: p3.id,
      question_number: 37,
      type: 'summary_completion',
      group_header: 'Questions 32–37',
      group_instruction: 'Choose ONE WORD ONLY from the passage.',
      prompt: 'Board games were presented as an [37] to counter screen-induced fatigue in households.',
      correct_answer: 'antidote',
      acceptable_answers: JSON.stringify(['antidote']),
      academic_explanation: 'Đoạn [D]: "...marketed face-to-face social connection as an antidote to screen fatigue."',
      paragraph_ref: 'D'
    },
    {
      id: 'c13-t2-q38',
      passage_id: p3.id,
      question_number: 38,
      type: 'matching_info',
      group_header: 'Questions 38–40',
      group_instruction: 'Match each corporate example (38–40) with the strategic posture (A, B, or C).',
      prompt: 'Nike integrating microchips into running footwear to connect with digital music players.',
      options: JSON.stringify(['A. Infuse and Augment', 'B. Combine and Transcend', 'C. Counteract and Reaffirm']),
      correct_answer: 'A',
      academic_explanation: 'Đoạn [B] giới thiệu Nike là ví dụ hàng đầu của chiến lược "Infuse and Augment".',
      paragraph_ref: 'B'
    },
    {
      id: 'c13-t2-q39',
      passage_id: p3.id,
      question_number: 39,
      type: 'matching_info',
      group_header: 'Questions 38–40',
      group_instruction: 'Match each corporate example with the strategic posture.',
      prompt: 'Swatch inventing fashionable, affordable plastic quartz wristwatches.',
      options: JSON.stringify(['A. Infuse and Augment', 'B. Combine and Transcend', 'C. Counteract and Reaffirm']),
      correct_answer: 'B',
      academic_explanation: 'Đoạn [C] phân tích Swatch là minh chứng cho "Combine and Transcend".',
      paragraph_ref: 'C'
    },
    {
      id: 'c13-t2-q40',
      passage_id: p3.id,
      question_number: 40,
      type: 'matching_info',
      group_header: 'Questions 38–40',
      group_instruction: 'Match each corporate example with the strategic posture.',
      prompt: 'Hasbro promoting face-to-face tactile board games to oppose digital screen isolation.',
      options: JSON.stringify(['A. Infuse and Augment', 'B. Combine and Transcend', 'C. Counteract and Reaffirm']),
      correct_answer: 'C',
      academic_explanation: 'Đoạn [D] chỉ rõ Hasbro áp dụng chiến lược "Counteract and Reaffirm".',
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

  console.log('✅ Cambridge 13 - Test 2 đã được nạp thành công (40 câu hỏi, 3 Passages)!');
}

module.exports = seedTest2;
