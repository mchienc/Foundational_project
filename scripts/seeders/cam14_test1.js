// scripts/seeders/cam14_test1.js
// Cambridge IELTS 14 - Test 1: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 14 - Test 1 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-14-test-1-p1",
        "title": "The Importance of Children's Play",
        "subtitle": "Cognitive development, social negotiation, and emotional self-regulation through play",
        "topic": "Developmental Psychology & Education",
        "difficulty": "Passage 1 (Cơ bản)",
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "Play is a ubiquitous hallmark of juvenile mammals, reaching its pinnacle of imaginative sophistication in human children. Evolutionary developmental psychologists emphasize that unstructured play is not an idle frivolity, but a critical biological mechanism for acquiring social competencies and emotional resilience."
            },
            {
                "label": "B",
                "content": "Through imaginative pretend scenarios and peer games, children learn to navigate interpersonal conflict, negotiate boundaries, and regulate fear and aggression in safe, low-stakes environments. The modern contraction of outdoor recess and rise in adult-structured schedules has sparked alarm regarding childhood mental health."
            }
        ],
        "source": "Cambridge 14 - Test 1",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-14-test-1-p2",
        "title": "The Global Growth of Bike-Sharing Schemes",
        "subtitle": "From Amsterdam’s white bikes to dockless GPS mobile app networks",
        "topic": "Urban Transport & Smart Cities",
        "difficulty": "Passage 2 (Trung cấp)",
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "The conceptual origin of urban bike-sharing dates back to 1965 in Amsterdam with the Provo movement's 'Witte Fietsen' (White Bikes)—ordinary bicycles painted white and left unlocked throughout the city for communal use. Within days, however, most were stolen or thrown into canals, exposing the perils of unmonitored commons."
            },
            {
                "label": "B",
                "content": "Second-generation coin-deposit systems and third-generation docked electronic stations paved the way for modern fourth-generation dockless smartphone fleets. Integrating GPS geofencing, QR-code unlocking, and solar-powered cellular locking hubs, municipal bike-sharing has become a cornerstone of sustainable multimodal urban transit."
            }
        ],
        "source": "Cambridge 14 - Test 1",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-14-test-1-p3",
        "title": "Motivational Factors in the Hospitality Industry",
        "subtitle": "Employee turnover, psychological contracts, and intrinsic retention strategies",
        "topic": "Organizational Behavior & Human Resources",
        "difficulty": "Passage 3 (Nâng cao)",
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "The global hospitality sector is chronically plagued by exorbitant staff turnover rates, frequently exceeding sixty percent annually. Traditional management doctrines attributed this turnover solely to entry-level compensation and arduous shift schedules."
            },
            {
                "label": "B",
                "content": "Organizational behavior researchers reveal that turnover is heavily dictated by violations of the unwritten 'psychological contract' between staff and leadership. Providing supportive managerial mentoring, transparent career advancement pathways, and meaningful job empowerment significantly outperforms monetary bonuses in sustaining long-term employee loyalty."
            }
        ],
        "source": "Cambridge 14 - Test 1",
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
        "id": "c14-t1-q1",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 1 on The Importance of Children's Play.",
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
        "id": "c14-t1-q2",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 2 on The Importance of Children's Play.",
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
        "id": "c14-t1-q3",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 3 on The Importance of Children's Play.",
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
        "id": "c14-t1-q4",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 4 on The Importance of Children's Play.",
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
        "id": "c14-t1-q5",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 5 on The Importance of Children's Play.",
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
        "id": "c14-t1-q6",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 6 on The Importance of Children's Play.",
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
        "id": "c14-t1-q7",
        "passage_id": "cambridge-14-test-1-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual statement 7 on The Importance of Children's Play.",
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
        "id": "c14-t1-q8",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q9",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q10",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q11",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q12",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q13",
        "passage_id": "cambridge-14-test-1-p1",
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
        "id": "c14-t1-q14",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 14 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t1-q15",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 15 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t1-q16",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 16 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t1-q17",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 17 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t1-q18",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 18 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t1-q19",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 19 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c14-t1-q20",
        "passage_id": "cambridge-14-test-1-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Technical item 20 regarding The Global Growth of Bike-Sharing Schemes.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c14-t1-q21",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q22",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q23",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q24",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q25",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q26",
        "passage_id": "cambridge-14-test-1-p2",
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
        "id": "c14-t1-q27",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 27 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q28",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 28 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q29",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 29 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q30",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 30 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q31",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 31 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q32",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 32 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q33",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 33 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q34",
        "passage_id": "cambridge-14-test-1-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 34 in Motivational Factors in the Hospitality Industry?",
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
        "id": "c14-t1-q35",
        "passage_id": "cambridge-14-test-1-p3",
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
        "id": "c14-t1-q36",
        "passage_id": "cambridge-14-test-1-p3",
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
        "id": "c14-t1-q37",
        "passage_id": "cambridge-14-test-1-p3",
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
        "id": "c14-t1-q38",
        "passage_id": "cambridge-14-test-1-p3",
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
        "id": "c14-t1-q39",
        "passage_id": "cambridge-14-test-1-p3",
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
        "id": "c14-t1-q40",
        "passage_id": "cambridge-14-test-1-p3",
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

  console.log('✅ Hoàn tất nạp Cambridge 14 - Test 1 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
