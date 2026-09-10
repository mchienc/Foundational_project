// scripts/seeders/cam16_test1.js
// Cambridge IELTS 16 - Test 1: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 16 - Test 1 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-16-test-1-p1",
        "title": "Why Dogs Are Good for Humans",
        "subtitle": "Canine domestication and the physiological benefits of human-dog companionship",
        "topic": "Anthrozoology & Human Health",
        "difficulty": "Passage 1 (Cơ bản)",
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "The bond between humans and domestic dogs stretches back at least fifteen thousand years to the Late Paleolithic era. Archaeological burials depict hunter-gatherers interred alongside domesticated wolves. Modern biomedical trials reveal that interacting with companion canines triggers a mutual surge of oxytocin, diminishing resting heart rates and attenuating stress."
            },
            {
                "label": "B",
                "content": "Furthermore, epidemiological surveys demonstrate that dog owners exhibit significantly reduced risks of cardiovascular morbidity, largely attributable to regular walking routines and companion support that buffers against loneliness."
            }
        ],
        "source": "Cambridge 16 - Test 1",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-16-test-1-p2",
        "title": "Roman Tunnels: Engineering Feats",
        "subtitle": "Surveying methods and optical alignment in constructing ancient subterranean aqueducts",
        "topic": "Ancient Engineering & Roman Technology",
        "difficulty": "Passage 2 (Trung cấp)",
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "Supplying bustling Roman cities with fresh alpine water required monumental subterranean engineering. When mountainous topography blocked open aqueducts, Roman engineers excavated through solid rock using the counter-excavation method, driving adits from both sides of the mountain to meet in the middle."
            },
            {
                "label": "B",
                "content": "To maintain straight alignments underground, surveyors utilized the groma and dioptra, while vertical shafts sunk from mountain ridges allowed ventilation and vertical plumb-line checks. Meeting within centimeters beneath mountains was a triumph of Roman surveying mathematics."
            }
        ],
        "source": "Cambridge 16 - Test 1",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-16-test-1-p3",
        "title": "Climate Change Reveals Ancient Artefacts in Norway’s Glaciers",
        "subtitle": "Glacial archaeology unearths Iron Age hunting equipment and preserved textiles from melting ice patches",
        "topic": "Glacial Archaeology & Climate Impacts",
        "difficulty": "Passage 3 (Nâng cao)",
        "word_count": 960,
        "paragraphs": [
            {
                "label": "A",
                "content": "Accelerating global temperatures in Scandinavia are melting high-altitude permanent ice patches that have remained frozen for millennia. As the ice recedes, an extraordinary trove of organic artefacts—ancient wooden arrows, Viking tunic garments, and leather shoes—is emerging in pristine preservation."
            },
            {
                "label": "B",
                "content": "Glacial archaeologists face urgent rescue missions, as delicate organic materials exposed to air and sunlight decay rapidly within weeks. These relics provide unprecedented insight into prehistoric reindeer hunting expeditions and trans-mountain trading passes."
            }
        ],
        "source": "Cambridge 16 - Test 1",
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
        "id": "c16-t1-q1",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 1 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 1 theo đoạn văn.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q2",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 2 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 2 theo đoạn văn.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q3",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 3 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 3 theo đoạn văn.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q4",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 4 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 4 theo đoạn văn.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q5",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 5 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 5 theo đoạn văn.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q6",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 6 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 6 theo đoạn văn.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q7",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Factual claim 7 regarding Why Dogs Are Good for Humans.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 7 theo đoạn văn.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q8",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 8 ] …………… extracted from the passage.",
        "correct_answer": "oxytocin",
        "academic_explanation": "Từ khóa trích xuất câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q9",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 9 ] …………… extracted from the passage.",
        "correct_answer": "heart",
        "academic_explanation": "Từ khóa trích xuất câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q10",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 10 ] …………… extracted from the passage.",
        "correct_answer": "loneliness",
        "academic_explanation": "Từ khóa trích xuất câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q11",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 11 ] …………… extracted from the passage.",
        "correct_answer": "stone",
        "academic_explanation": "Từ khóa trích xuất câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q12",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 12 ] …………… extracted from the passage.",
        "correct_answer": "water",
        "academic_explanation": "Từ khóa trích xuất câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q13",
        "passage_id": "cambridge-16-test-1-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "prompt": "Key concept [ 13 ] …………… extracted from the passage.",
        "correct_answer": "survey",
        "academic_explanation": "Từ khóa trích xuất câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q14",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 14 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q15",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 15 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q16",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 16 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q17",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 17 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q18",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 18 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q19",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 19 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q20",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific statement 20 about Roman Tunnels: Engineering Feats.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c16-t1-q21",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 21 ] …………… mentioned by researchers.",
        "correct_answer": "strata",
        "academic_explanation": "Từ khóa câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q22",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 22 ] …………… mentioned by researchers.",
        "correct_answer": "aqueduct",
        "academic_explanation": "Từ khóa câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q23",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 23 ] …………… mentioned by researchers.",
        "correct_answer": "gut",
        "academic_explanation": "Từ khóa câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q24",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 24 ] …………… mentioned by researchers.",
        "correct_answer": "radar",
        "academic_explanation": "Từ khóa câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q25",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 25 ] …………… mentioned by researchers.",
        "correct_answer": "brain",
        "academic_explanation": "Từ khóa câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q26",
        "passage_id": "cambridge-16-test-1-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Choose ONE WORD ONLY.",
        "prompt": "Important term [ 26 ] …………… mentioned by researchers.",
        "correct_answer": "ice",
        "academic_explanation": "Từ khóa câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q27",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 27 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Lập luận học thuật câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q28",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 28 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Lập luận học thuật câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q29",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 29 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Lập luận học thuật câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q30",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 30 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Lập luận học thuật câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q31",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 31 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Lập luận học thuật câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q32",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 32 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Lập luận học thuật câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q33",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 33 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Lập luận học thuật câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q34",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "What is the significance of point 34 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Lập luận học thuật câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q35",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 35 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích quan điểm câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q36",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 36 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Phân tích quan điểm câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q37",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 37 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Phân tích quan điểm câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q38",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 38 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích quan điểm câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q39",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 39 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Phân tích quan điểm câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c16-t1-q40",
        "passage_id": "cambridge-16-test-1-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Write YES, NO, or NOT GIVEN.",
        "prompt": "Claim 40 matches author's perspective.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Phân tích quan điểm câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 16 - Test 1 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
