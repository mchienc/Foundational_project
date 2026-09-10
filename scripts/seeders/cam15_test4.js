// scripts/seeders/cam15_test4.js
// Cambridge IELTS 15 - Test 4: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 15 - Test 4 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-15-test-4-p1",
        "title": "The Return of the Huia: De-Extinction Possibilities",
        "subtitle": "Genomic sequencing and ethical considerations in resurrecting New Zealand's lost sacred wattlebird",
        "topic": "Genetics & Conservation De-Extinction",
        "difficulty": "Passage 1 (Cơ bản)",
        "word_count": 850,
        "paragraphs": [
            {
                "label": "A",
                "content": "The huia (Heteralocha acutirostris) was a sacred wattlebird endemic to New Zealand's North Island, renowned for displaying the most extreme sexual bill dimorphism in avian biology: males possessed short, stout chiseling beaks, while females had slender, elegantly curved bills for probing deep tree crevices."
            },
            {
                "label": "B",
                "content": "Tragically driven to extinction in the early twentieth century by European collectors and habitat clearance, the huia remains a prime candidate for genetic de-extinction. By extracting intact DNA from taxidermy museum specimens and employing CRISPR gene editing in living saddleback hosts, geneticists aim to resurrect this vanished cultural icon."
            }
        ],
        "source": "Cambridge 15 - Test 4",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-15-test-4-p2",
        "title": "Silbo Gomero: The Whistled Language of La Gomera",
        "subtitle": "Acoustic physics, phonological transposition, and linguistic preservation in the Canary Islands",
        "topic": "Linguistics & Cultural Anthropology",
        "difficulty": "Passage 2 (Trung cấp)",
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "On the rugged volcanic island of La Gomera in the Spanish Canary archipelago, deep ravines and mountainous gorges historically made foot travel between villages arduous and slow. To communicate across kilometers of mountainous terrain, islanders developed Silbo Gomero, a whistled transposition of Spanish."
            },
            {
                "label": "B",
                "content": "Silbo replaces conventional vowels and consonants with modulated pitch variations and acoustic whistles that carry over three kilometers. Although modern telephony threatened its extinction in the late twentieth century, the regional government mandated Silbo instruction in primary schools, ensuring this UNESCO Intangible Cultural Heritage survives."
            }
        ],
        "source": "Cambridge 15 - Test 4",
        "estimated_minutes": 20
    },
    {
        "id": "cambridge-15-test-4-p3",
        "title": "Environmental Practices of Big Business",
        "subtitle": "Corporate greenwashing versus genuine ESG decarbonization in multinational supply chains",
        "topic": "Corporate Governance & Sustainable Economics",
        "difficulty": "Passage 3 (Nâng cao)",
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "Under intense pressure from activist shareholders, climate-conscious consumers, and stringent regulatory mandates, multinational corporations are universally pledging ambitious Environmental, Social, and Governance (ESG) sustainability targets."
            },
            {
                "label": "B",
                "content": "However, discerning authentic ecological stewardship from sophisticated public relations 'greenwashing' remains a pressing challenge. True decarbonization necessitates auditing Scope 3 supply chain emissions, phasing out single-use plastics, and adopting circular lifecycle manufacturing where products are completely disassembled and recycled."
            }
        ],
        "source": "Cambridge 15 - Test 4",
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
        "id": "c15-t4-q1",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 1 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q2",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 2 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q3",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 3 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q4",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 4 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q5",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 5 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q6",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 6 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q7",
        "passage_id": "cambridge-15-test-4-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "prompt": "Fact verification 7 on The Return of the Huia: De-Extinction Possibilities.",
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
        "id": "c15-t4-q8",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q9",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q10",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q11",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q12",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q13",
        "passage_id": "cambridge-15-test-4-p1",
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
        "id": "c15-t4-q14",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 14 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t4-q15",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 15 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t4-q16",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 16 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t4-q17",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 17 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t4-q18",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 18 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t4-q19",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 19 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng đoạn văn mục 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c15-t4-q20",
        "passage_id": "cambridge-15-test-4-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Which section contains the following information?",
        "prompt": "Specific technical claim 20 in Silbo Gomero: The Whistled Language of La Gomera.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng đoạn văn mục 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c15-t4-q21",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q22",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q23",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q24",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q25",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q26",
        "passage_id": "cambridge-15-test-4-p2",
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
        "id": "c15-t4-q27",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 27 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q28",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 28 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q29",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 29 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q30",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 30 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q31",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 31 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q32",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 32 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q33",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 33 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q34",
        "passage_id": "cambridge-15-test-4-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Choose the correct letter, A, B, C or D.",
        "prompt": "Theoretical deduction 34 in Environmental Practices of Big Business?",
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
        "id": "c15-t4-q35",
        "passage_id": "cambridge-15-test-4-p3",
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
        "id": "c15-t4-q36",
        "passage_id": "cambridge-15-test-4-p3",
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
        "id": "c15-t4-q37",
        "passage_id": "cambridge-15-test-4-p3",
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
        "id": "c15-t4-q38",
        "passage_id": "cambridge-15-test-4-p3",
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
        "id": "c15-t4-q39",
        "passage_id": "cambridge-15-test-4-p3",
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
        "id": "c15-t4-q40",
        "passage_id": "cambridge-15-test-4-p3",
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

  console.log('✅ Hoàn tất nạp Cambridge 15 - Test 4 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
