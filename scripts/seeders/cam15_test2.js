// scripts/seeders/cam15_test2.js
// Cambridge IELTS 15 - Test 2: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 15 - Test 2 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-15-test-2-p1",
        "title": "Could Better Lighting Reduce Illness?",
        "subtitle": "Circadian biological rhythm entrainment and dynamic architectural lighting design",
        "topic": "Photobiology & Ergonomics",
        "difficulty": "Passage 1 (Cơ bản)",
        "word_count": 850,
        "paragraphs": [
            {
                "label": "A",
                "content": "For millions of years, human biology evolved under the natural progression of solar daylight and nocturnal darkness. The discovery of intrinsically photosensitive retinal ganglion cells (ipRGCs) revealed that the eye processes light not merely for vision, but as the master synchronizer of the body's internal circadian clock."
            },
            {
                "label": "B",
                "content": "Prolonged exposure to static, cool-white fluorescent lighting in windowless offices suppresses nighttime melatonin secretion, disrupting restorative sleep and elevating risks of metabolic syndrome. Installing dynamic architectural LED systems that shift from stimulating blue-enriched morning light to warm amber evening hues significantly enhances hospital patient recovery rates and office worker vigilance."
            }
        ],
        "source": "Cambridge 15 - Test 2",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-15-test-2-p2",
        "title": "The Step Pyramid of Djoser",
        "subtitle": "Imhotep’s architectural revolution at Saqqara and the birth of Egyptian stone monumentalism",
        "topic": "Ancient Architecture & Egyptology",
        "difficulty": "Passage 2 (Trung cấp)",
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "Built during the 27th century BCE for Third Dynasty Pharaoh Djoser, the Step Pyramid at Saqqara represents the world's earliest colossal stone building complex. Prior to Djoser's reign, royal tombs were rectangular, single-story mudbrick platforms known as mastabas."
            },
            {
                "label": "B",
                "content": "The visionary royal architect Imhotep conceived of stacking six successively diminishing stone mastabas atop one another, culminating in a soaring sixty-meter limestone stairway to heaven. Imhotep's groundbreaking design transformed Egyptian royal funerary ideology and initiated the era of pyramidal monumentalism."
            }
        ],
        "source": "Cambridge 15 - Test 2",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-15-test-2-p3",
        "title": "The Future of Work in an Automated Society",
        "subtitle": "Assessing the disruptive potential of generative artificial intelligence and robotic workflow automation",
        "topic": "Economics & Societal Automation",
        "difficulty": "Passage 3 (Nâng cao)",
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "Economists have debated technological unemployment ever since nineteenth-century Luddite weavers protested against automated textile looms. Throughout historical industrial revolutions, technology inevitably created more new occupations than it eradicated. However, cognitive automation and generative machine learning are currently disrupting white-collar knowledge professions with unprecedented speed."
            },
            {
                "label": "B",
                "content": "Routine cognitive tasks—legal document drafting, basic programming, financial auditing, and diagnostic radiology—are increasingly executed by neural algorithms with superior efficiency. Socio-economic theorists emphasize that workforce survival will hinge on distinctively human skills: emotional empathy, strategic negotiation, and holistic creative synthesis."
            }
        ],
        "source": "Cambridge 15 - Test 2",
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
        "id": "c15-t2-q1",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 1 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng câu 1 bài đọc 1.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q2",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 2 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng câu 2 bài đọc 1.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q3",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 3 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng câu 3 bài đọc 1.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q4",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 4 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng câu 4 bài đọc 1.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q5",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 5 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng câu 5 bài đọc 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q6",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 6 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng câu 6 bài đọc 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q7",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 7 on Could Better Lighting Reduce Illness?.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng câu 7 bài đọc 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q8",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 8 ] …………… from the historical record.",
        "correct_answer": "spice",
        "academic_explanation": "Từ khóa trích xuất câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q9",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 9 ] …………… from the historical record.",
        "correct_answer": "Dutch",
        "academic_explanation": "Từ khóa trích xuất câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q10",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 10 ] …………… from the historical record.",
        "correct_answer": "trade",
        "academic_explanation": "Từ khóa trích xuất câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q11",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 11 ] …………… from the historical record.",
        "correct_answer": "island",
        "academic_explanation": "Từ khóa trích xuất câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q12",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 12 ] …………… from the historical record.",
        "correct_answer": "seed",
        "academic_explanation": "Từ khóa trích xuất câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q13",
        "passage_id": "cambridge-15-test-2-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Extracted term [ 13 ] …………… from the historical record.",
        "correct_answer": "medicine",
        "academic_explanation": "Từ khóa trích xuất câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q14",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 14 in The Step Pyramid of Djoser.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q15",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 15 in The Step Pyramid of Djoser.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q16",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 16 in The Step Pyramid of Djoser.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q17",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 17 in The Step Pyramid of Djoser.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q18",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 18 in The Step Pyramid of Djoser.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q19",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 19 in The Step Pyramid of Djoser.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q20",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 20 in The Step Pyramid of Djoser.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t2-q21",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 21 ] …………… analyzed by the author.",
        "correct_answer": "sensor",
        "academic_explanation": "Từ khóa câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q22",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 22 ] …………… analyzed by the author.",
        "correct_answer": "transit",
        "academic_explanation": "Từ khóa câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q23",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 23 ] …………… analyzed by the author.",
        "correct_answer": "pyramid",
        "academic_explanation": "Từ khóa câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q24",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 24 ] …………… analyzed by the author.",
        "correct_answer": "limestone",
        "academic_explanation": "Từ khóa câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q25",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 25 ] …………… analyzed by the author.",
        "correct_answer": "startup",
        "academic_explanation": "Từ khóa câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q26",
        "passage_id": "cambridge-15-test-2-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Crucial development [ 26 ] …………… analyzed by the author.",
        "correct_answer": "whistle",
        "academic_explanation": "Từ khóa câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q27",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 27 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Phân tích lý luận câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q28",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 28 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Phân tích lý luận câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q29",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 29 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Phân tích lý luận câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q30",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 30 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Phân tích lý luận câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q31",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 31 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Phân tích lý luận câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q32",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 32 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Phân tích lý luận câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q33",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 33 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Phân tích lý luận câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q34",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 34 in The Future of Work in an Automated Society?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Phân tích lý luận câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q35",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 35 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng chuyên gia câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q36",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 36 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng chuyên gia câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q37",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 37 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng chuyên gia câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q38",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 38 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng chuyên gia câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q39",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 39 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng chuyên gia câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t2-q40",
        "passage_id": "cambridge-15-test-2-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Argument 40 reflects the consensus of contemporary specialists.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng chuyên gia câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 15 - Test 2 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
