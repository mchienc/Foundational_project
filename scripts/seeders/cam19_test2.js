// scripts/seeders/cam19_test2.js
// Cambridge IELTS 19 - Test 2: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 19 - Test 2 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-19-test-2-p1",
        "title": "Archaeological Discoveries in the Nile Valley",
        "subtitle": "Satellite radar stratigraphy uncovers buried settlements of ancient predynastic Egypt",
        "source": "Cambridge 19 - Test 2",
        "topic": "Archaeology & Ancient Civilizations",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "For over two centuries, Egyptology focused almost exclusively on monumental stone architecture—pyramids, temple complexes, and royal necropolises. In contrast, the mudbrick domestic settlements where ordinary farmers and artisans lived were presumed lost beneath millennia of alluvial silt deposited by Nile floods."
            },
            {
                "label": "B",
                "content": "Recent technological developments in synthetic aperture satellite radar and thermal imaging have revolutionized Nile Valley field archaeology. Radar pulses penetrate meters beneath dry desert sands, mapping subsurface linear anomalies corresponding to buried walls, irrigation canals, and ancient river oxbows invisible to conventional photography."
            },
            {
                "label": "C",
                "content": "Targeted excavations confirmed the existence of dense urban settlements dating back to 3500 BCE. Stratigraphic analysis of ceramic shards and faunal remains reveals complex trading networks with the Levant and Nubia, proving that urbanization preceded royal dynastic unification by several centuries."
            }
        ]
    },
    {
        "id": "cambridge-19-test-2-p2",
        "title": "The Rise of the Modern Megacity",
        "subtitle": "Navigating infrastructure bottlenecks, environmental resilience, and demographic concentration",
        "source": "Cambridge 19 - Test 2",
        "topic": "Urban Geography & Demographics",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "In 1950, only New York and Tokyo surpassed the demographic threshold of ten million inhabitants to qualify as megacities. Today, over thirty metropolitan clusters across the globe claim megacity status, with the vast majority situated in developing regions of Asia, Africa, and Latin America."
            },
            {
                "label": "B",
                "content": "Rapid agglomeration generates formidable governance dilemmas. Municipal administrations struggle to provide clean drinking water, sewage treatment, electrical grid stability, and affordable housing. Traffic congestion alone bleeds an estimated two to five percent of national gross domestic product in major capitals through wasted fuel and lost working hours."
            },
            {
                "label": "C",
                "content": "Progressive urban planners advocate polycentric metropolitan models supported by mass transit corridors. By decentralizing commercial hubs and developing autonomous regional sub-centers, cities can relieve strain on historical urban cores while reducing carbon footprints."
            }
        ]
    },
    {
        "id": "cambridge-19-test-2-p3",
        "title": "Language and Thought: The Linguistic Relativity Debate",
        "subtitle": "Empirical scrutiny of the Sapir-Whorf hypothesis in modern cognitive linguistics",
        "source": "Cambridge 19 - Test 2",
        "topic": "Cognitive Linguistics & Philosophy of Mind",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 980,
        "paragraphs": [
            {
                "label": "A",
                "content": "The notion that the structure of a spoken language shapes its speakers' habitual perception of reality—known as the Sapir-Whorf hypothesis—has sparked enduring controversy. Early twentieth-century anthropological linguists Edward Sapir and Benjamin Lee Whorf posited that linguistic categories act as cognitive templates constraining mental processes."
            },
            {
                "label": "B",
                "content": "Universalist cognitive scientists in the 1960s and 70s, led by Noam Chomsky, vigorously contested linguistic determinism. Chomsky argued for an innate universal grammar shared by all human brains, asserting that surface syntactic variations are superficial manifestations of identical underlying cognitive architecture."
            },
            {
                "label": "C",
                "content": "Contemporary empirical experiments have revived a nuanced 'weak' version of linguistic relativity. Psycholinguistic studies examining color categorization across indigenous languages demonstrate that while all humans possess identical photoreceptors, language terminology modulates visual discrimination reaction times in neurological benchmarks."
            }
        ]
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
        "id": "c19-t2-q1",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 1 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích khảo cổ học câu 1 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q2",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 2 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích khảo cổ học câu 2 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q3",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 3 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích khảo cổ học câu 3 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q4",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 4 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích khảo cổ học câu 4 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q5",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 5 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích khảo cổ học câu 5 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q6",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–6",
        "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Statement 6 regarding archaeological Nile Valley satellite mapping.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích khảo cổ học câu 6 theo dẫn chứng đoạn A-B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q7",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 7,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 7 ] …………… buried under desert silt.",
        "correct_answer": "pottery",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 7.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q8",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 8 ] …………… buried under desert silt.",
        "correct_answer": "canals",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 8.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q9",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 9 ] …………… buried under desert silt.",
        "correct_answer": "mudbrick",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 9.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q10",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 10 ] …………… buried under desert silt.",
        "correct_answer": "artisans",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 10.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q11",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 11 ] …………… buried under desert silt.",
        "correct_answer": "trade",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 11.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q12",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 12 ] …………… buried under desert silt.",
        "correct_answer": "canals",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 12.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q13",
        "passage_id": "cambridge-19-test-2-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 7–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Excavations revealed ancient [ 13 ] …………… buried under desert silt.",
        "correct_answer": "alluvium",
        "academic_explanation": "Từ vựng trích xuất từ đoạn C câu 13.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q14",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 14.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t2-q15",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 15.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q16",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 16.",
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q17",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 17.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q18",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 18.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t2-q19",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 19.",
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q20",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Information regarding urban agglomeration factor 20.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q21",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 21 ] …………… networks.",
        "correct_answer": "transit",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q22",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 22 ] …………… networks.",
        "correct_answer": "water",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q23",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 23 ] …………… networks.",
        "correct_answer": "housing",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q24",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 24 ] …………… networks.",
        "correct_answer": "congestion",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q25",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 25 ] …………… networks.",
        "correct_answer": "carbon",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q26",
        "passage_id": "cambridge-19-test-2-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY from the passage.",
        "prompt": "Megacity infrastructure requires stable [ 26 ] …………… networks.",
        "correct_answer": "grid",
        "academic_explanation": "Dẫn chứng đoạn B và C câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t2-q27",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 27?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "B",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 27.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q28",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 28?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "A",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 28.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q29",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 29?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "C",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 29.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q30",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 30?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "B",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 30.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q31",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 31?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "D",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 31.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q32",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 32?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "B",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 32.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q33",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–33",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the author's primary deduction regarding cognitive linguistics in question 33?",
        "options": [
            "It fully disproves universal grammar.",
            "It supports a nuanced version of linguistic relativity.",
            "It shows vocabulary has zero influence on perception.",
            "It replaces neurological biology entirely."
        ],
        "correct_answer": "C",
        "academic_explanation": "Lập luận học thuật ngôn ngữ học nhận thức câu 33.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q34",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 34,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 34 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 34.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q35",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 35 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 35.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q36",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 36 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 36.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q37",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 37 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 37.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q38",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 38 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 38.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q39",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 39 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 39.",
        "paragraph_ref": "C"
    },
    {
        "id": "c19-t2-q40",
        "passage_id": "cambridge-19-test-2-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 34–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Linguistic relativity claim 40 agrees with researcher consensus.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Phân tích dẫn chứng Sapir-Whorf đoạn C câu 40.",
        "paragraph_ref": "C"
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

  console.log('✅ Hoàn tất nạp Cambridge 19 - Test 2 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
