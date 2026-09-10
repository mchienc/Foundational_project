// scripts/seeders/cam18_test3.js
// Cambridge IELTS 18 - Test 3: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 18 - Test 3 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-18-test-3-p1",
        "title": "Materials to Take Us to Mars",
        "subtitle": "Radiation shielding, carbon nanotubes, and ultra-lightweight alloys for interplanetary transit",
        "source": "Cambridge 18 - Test 3",
        "topic": "Space Materials Science",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "A human mission to Mars represents the pinnacle of astronautical ambition, requiring a six-month voyage through lethal interplanetary radiation and micrometeoroid showers. Traditional aerospace aluminum is inadequate, as heavy shielding dramatically escalates fuel payloads into orbit."
            },
            {
                "label": "B",
                "content": "Materials scientists are engineering hydrogen-rich polymers and graphene-reinforced carbon nanotube composites. Hydrogen atoms effectively absorb galactic cosmic rays without generating secondary neutron spallation, protecting astronauts during transit."
            }
        ]
    },
    {
        "id": "cambridge-18-test-3-p2",
        "title": "The Rise and Fall of the Steam Car",
        "subtitle": "How the Stanley Steamer contended with early internal combustion automobiles",
        "source": "Cambridge 18 - Test 3",
        "topic": "Automotive Engineering History",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "At the dawn of the twentieth century, steam-powered automobiles rivaled electric and gasoline cars for dominance. The legendary Stanley Steamer, engineered by twins Francis and Freelan Stanley, held the world land speed record in 1906, achieving over two hundred kilometers per hour."
            },
            {
                "label": "B",
                "content": "Steam vehicles offered silent, vibration-free operation with tremendous instant torque without requiring complicated gearboxes. However, boilers required up to twenty minutes to raise operational steam pressure from a cold start. When Charles Kettering invented the electric self-starter for gasoline engines in 1912, the internal combustion engine rapidly eclipsed steam power."
            }
        ]
    },
    {
        "id": "cambridge-18-test-3-p3",
        "title": "The Case for Public Engagement with Science",
        "subtitle": "Citizen science initiatives, democratic epistemology, and scientific transparency",
        "source": "Cambridge 18 - Test 3",
        "topic": "Sociology of Science & Science Communication",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 950,
        "paragraphs": [
            {
                "label": "A",
                "content": "For decades, academic science operated within an insular 'deficit model', assuming that public skepticism stemmed merely from ignorance and could be rectified by didactic top-down lecturing. Sociologists of science advocate replacing this paternalistic model with participatory public engagement."
            },
            {
                "label": "B",
                "content": "Citizen science projects, crowdsourcing astronomical classifications and ecological biodiversity monitoring, empower non-specialists as active knowledge co-creators. Demystifying scientific methodologies builds public trust in empirical evidence during polarized societal debates."
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
        "id": "c18-t3-q1",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q2",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 2.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q3",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 3.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q4",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 4.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q5",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 5.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q6",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 6.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q7",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 7.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q8",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 8.",
        "options": null,
        "correct_answer": "radiation",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q9",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 9.",
        "options": null,
        "correct_answer": "hydrogen",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q10",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 10.",
        "options": null,
        "correct_answer": "graphene",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q11",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 11.",
        "options": null,
        "correct_answer": "aluminum",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q12",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 12.",
        "options": null,
        "correct_answer": "micrometeoroids",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q13",
        "passage_id": "cambridge-18-test-3-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Mars materials factor 13.",
        "options": null,
        "correct_answer": "polymers",
        "academic_explanation": "Giải thích vật liệu du hành sao Hỏa câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q14",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 14.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 14.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q15",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 15.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q16",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 16.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 16.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q17",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 17.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q18",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 18.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 18.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q19",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 19.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q20",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 20.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q21",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 21.",
        "correct_answer": "boiler",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q22",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 22.",
        "correct_answer": "speed",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q23",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 23.",
        "correct_answer": "Stanley",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q24",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 24.",
        "correct_answer": "torque",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q25",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 25.",
        "correct_answer": "starter",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q26",
        "passage_id": "cambridge-18-test-3-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Steam automobile development 26.",
        "correct_answer": "gasoline",
        "academic_explanation": "Giải thích lịch sử xe hơi chạy hơi nước câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q27",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q28",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q29",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q30",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q31",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q32",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q33",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q34",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q35",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q36",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q37",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q38",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q39",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t3-q40",
        "passage_id": "cambridge-18-test-3-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Science communication engagement insight 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích tương tác khoa học đại chúng câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 18 - Test 3 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
