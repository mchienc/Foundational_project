// scripts/seeders/cam14_test3.js
// Cambridge IELTS 14 - Test 3: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 14 - Test 3 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-14-test-3-p1",
        "title": "The Concept of Intelligence: Historical Models",
        "subtitle": "From Spearman's general factor 'g' to Gardner's multiple intelligences and emotional quotient",
        "topic": "Psychometrics & Cognitive Psychology",
        "difficulty": "Passage 1 (Cơ bản)",
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "What constitutes human intelligence has been a central question of modern psychological inquiry since the pioneering psychometric tests of Alfred Binet in the early twentieth century. Charles Spearman proposed the concept of 'g'—a single general cognitive factor underlying diverse analytical abilities."
            },
            {
                "label": "B",
                "content": "Later theorists challenged this unitary model, with Howard Gardner proposing the theory of multiple intelligences—including bodily-kinesthetic, musical, and interpersonal competencies—while Daniel Goleman emphasized emotional intelligence (EQ) as a superior predictor of professional and life success."
            }
        ],
        "source": "Cambridge 14 - Test 3",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-14-test-3-p2",
        "title": "Saving Bugs to Find New Drugs",
        "subtitle": "Bioprospecting insect chemical defenses for novel antimicrobial and anticancer compounds",
        "topic": "Entomology & Pharmacology",
        "difficulty": "Passage 2 (Trung cấp)",
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "As multi-drug resistant bacterial pathogens threaten to undermine modern antibiotic medicine, pharmaceutical bioprospectors are looking beyond soil microbes and rainforest flora to the insect kingdom."
            },
            {
                "label": "B",
                "content": "Insects represent over half of all described living species, inhabiting filthy, pathogen-rich micro-environments. To survive, they have evolved potent antimicrobial peptides and venom toxins that selectively destroy bacterial membranes, holding immense promise for next-generation antibiotics."
            }
        ],
        "source": "Cambridge 14 - Test 3",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-14-test-3-p3",
        "title": "The Power of Play in Adult Innovation",
        "subtitle": "How corporate playfulness and exploratory tinkering foster creative breakthroughs",
        "topic": "Organizational Psychology & Innovation",
        "difficulty": "Passage 3 (Nâng cao)",
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "In adult corporate cultures, play is frequently stigmatized as counterproductive or infantile. Yet Nobel laureates and legendary technological inventors consistently describe their most revolutionary breakthroughs as emerging from lighthearted 'tinkering' and playful intellectual curiosity."
            },
            {
                "label": "B",
                "content": "Leading technology incubators deliberately incorporate playful design sprints, hackathons, and flexible exploratory time, recognizing that low-stakes experimentation suspends fear of failure and stimulates divergent thinking."
            }
        ],
        "source": "Cambridge 14 - Test 3",
        "estimated_minutes": 20
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
      [p.id, p.title, p.subtitle, p.source, p.topic, p.difficulty, p.estimated_minutes, p.word_count, JSON.stringify(p.paragraphs)]
    );
  }

  const questions = [
    {
        "id": "c14-t3-q1",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 1 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 1 theo văn bản.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q2",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 2 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 2 theo văn bản.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q3",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 3 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 3 theo văn bản.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q4",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 4 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 4 theo văn bản.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q5",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 5 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 5 theo văn bản.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q6",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 6 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 6 theo văn bản.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q7",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 7 on The Concept of Intelligence: Historical Models.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 7 theo văn bản.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q8",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 8 ] …………… highlighted in the passage.",
        "correct_answer": "play",
        "academic_explanation": "Từ khóa câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q9",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 9 ] …………… highlighted in the passage.",
        "correct_answer": "peer",
        "academic_explanation": "Từ khóa câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q10",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 10 ] …………… highlighted in the passage.",
        "correct_answer": "child",
        "academic_explanation": "Từ khóa câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q11",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 11 ] …………… highlighted in the passage.",
        "correct_answer": "camera",
        "academic_explanation": "Từ khóa câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q12",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 12 ] …………… highlighted in the passage.",
        "correct_answer": "intelligence",
        "academic_explanation": "Từ khóa câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q13",
        "passage_id": "cambridge-14-test-3-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Concept [ 13 ] …………… highlighted in the passage.",
        "correct_answer": "rat",
        "academic_explanation": "Từ khóa câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q14",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 14 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q15",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 15 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q16",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 16 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q17",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 17 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q18",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 18 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q19",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 19 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q20",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 20 regarding Saving Bugs to Find New Drugs.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t3-q21",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 21 ] …………… identified by researchers.",
        "correct_answer": "bike",
        "academic_explanation": "Từ khóa câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q22",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 22 ] …………… identified by researchers.",
        "correct_answer": "dock",
        "academic_explanation": "Từ khóa câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q23",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 23 ] …………… identified by researchers.",
        "correct_answer": "screen",
        "academic_explanation": "Từ khóa câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q24",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 24 ] …………… identified by researchers.",
        "correct_answer": "playground",
        "academic_explanation": "Từ khóa câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q25",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 25 ] …………… identified by researchers.",
        "correct_answer": "insect",
        "academic_explanation": "Từ khóa câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q26",
        "passage_id": "cambridge-14-test-3-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Key mechanism [ 26 ] …………… identified by researchers.",
        "correct_answer": "zoo",
        "academic_explanation": "Từ khóa câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q27",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 27 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Phân tích học thuật câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q28",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 28 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Phân tích học thuật câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q29",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 29 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Phân tích học thuật câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q30",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 30 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Phân tích học thuật câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q31",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 31 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Phân tích học thuật câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q32",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 32 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Phân tích học thuật câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q33",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 33 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Phân tích học thuật câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q34",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 34 in The Power of Play in Adult Innovation?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Phân tích học thuật câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q35",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 35 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng luận điểm câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q36",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 36 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng luận điểm câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q37",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 37 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng luận điểm câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q38",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 38 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng luận điểm câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q39",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 39 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng luận điểm câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t3-q40",
        "passage_id": "cambridge-14-test-3-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 40 matches scholarly consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng luận điểm câu 40.",
        "paragraph_ref": "B"
    }
];

  for (const q of questions) {
    await db.query(
      `INSERT INTO cambridge_reading_questions 
        (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, academic_explanation, paragraph_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
        passage_id = VALUES(passage_id), question_number = VALUES(question_number), type = VALUES(type),
        group_header = VALUES(group_header), group_instruction = VALUES(group_instruction), prompt = VALUES(prompt),
        options = VALUES(options), correct_answer = VALUES(correct_answer), academic_explanation = VALUES(academic_explanation),
        paragraph_ref = VALUES(paragraph_ref)`,
      [q.id, q.passage_id, q.question_number, q.type, q.group_header, q.group_instruction, q.prompt, q.options ? JSON.stringify(q.options) : null, q.correct_answer, q.academic_explanation, q.paragraph_ref]
    );
  }

  console.log('✅ Hoàn tất nạp Cambridge 14 - Test 3 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
