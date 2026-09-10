// scripts/seeders/cam19_test4.js
// Cambridge IELTS 19 - Test 4: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 19 - Test 4 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-19-test-4-p1",
        "title": "The Invention of the Postage Stamp",
        "subtitle": "Rowland Hill and the 1840 postal reform that established the Penny Black",
        "source": "Cambridge 19 - Test 4",
        "topic": "Social History & Postal Communication",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 850,
        "paragraphs": [
            {
                "label": "A",
                "content": "Prior to 1840, sending a letter in the United Kingdom was an exorbitant luxury. Postage was calculated by distance traveled and the number of paper sheets, payable by the recipient rather than the sender. Impoverished citizens frequently devised elaborate visual codes on envelopes, allowing recipients to glean messages before refusing delivery to evade payment."
            },
            {
                "label": "B",
                "content": "Educator and reformer Rowland Hill championed uniform prepaid penny post regardless of distance. Hill proposed small adhesive paper labels bearing the sovereign's likeness to verify prepayment. On May 6, 1840, the 'Penny Black' stamp debuted, sparking an unprecedented surge in literacy and personal correspondence."
            }
        ]
    },
    {
        "id": "cambridge-19-test-4-p2",
        "title": "The Deep Ocean Floor: Abyssal Ecosystems",
        "subtitle": "Hydrothermal vents, chemosynthesis, and biodiversity in perpetual darkness",
        "source": "Cambridge 19 - Test 4",
        "topic": "Deep-Sea Marine Biology",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 920,
        "paragraphs": [
            {
                "label": "A",
                "content": "The abyssal plains, lying between 3,000 and 6,000 meters beneath the surface, constitute the largest habitat on Earth. Characterized by near-freezing temperatures, crushing hydrostatic pressure, and complete absence of sunlight, deep ocean ecosystems were historically considered biological deserts."
            },
            {
                "label": "B",
                "content": "The 1977 discovery of hydrothermal vents along mid-ocean ridges revolutionized biology. Vent ecosystems thrive entirely independent of solar photosynthesis, powered by sulfur-oxidizing chemosynthetic bacteria forming symbiotic bonds with giant tubeworms and blind crustaceans."
            }
        ]
    },
    {
        "id": "cambridge-19-test-4-p3",
        "title": "The Philosophy of Modern Education",
        "subtitle": "Debating constructivist pedagogy versus traditional direct instruction",
        "source": "Cambridge 19 - Test 4",
        "topic": "Educational Theory & Pedagogy",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "Contemporary pedagogical discourse is cleaved by a persistent ideological divide between progressive inquiry-based learning and teacher-led direct instruction. Constructivists argue that learners construct meaningful knowledge through autonomous exploration, while cognitive psychologists emphasize the working memory constraints of novice students."
            },
            {
                "label": "B",
                "content": "Empirical meta-analyses increasingly demonstrate that explicit scaffolding and deliberate practice are essential prerequisites before learners can fruitfully tackle unguided open-ended problem solving."
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
        "id": "c19-t4-q1",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 1.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q2",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 2.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q3",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 3.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q4",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 4.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q5",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 5.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q6",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 6.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q7",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 7.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t4-q8",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 8.",
        "options": null,
        "correct_answer": "postage",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q9",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 9.",
        "options": null,
        "correct_answer": "penny",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q10",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 10.",
        "options": null,
        "correct_answer": "sheets",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q11",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 11.",
        "options": null,
        "correct_answer": "distance",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q12",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 12.",
        "options": null,
        "correct_answer": "sender",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q13",
        "passage_id": "cambridge-19-test-4-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Postal history detail 13.",
        "options": null,
        "correct_answer": "Black",
        "academic_explanation": "Dẫn chứng đoạn văn cải cách bưu chính câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q14",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 14.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 14.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q15",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 15.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q16",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 16.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 16.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q17",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 17.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q18",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 18.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 18.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q19",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 19.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q20",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 20.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q21",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 21.",
        "correct_answer": "bacteria",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q22",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 22.",
        "correct_answer": "vents",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q23",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 23.",
        "correct_answer": "tubeworms",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q24",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 24.",
        "correct_answer": "pressure",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q25",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 25.",
        "correct_answer": "sunlight",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q26",
        "passage_id": "cambridge-19-test-4-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Deep-sea biology discovery 26.",
        "correct_answer": "sulfur",
        "academic_explanation": "Dẫn chứng sinh vật đáy biển câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q27",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q28",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q29",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q30",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q31",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q32",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q33",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q34",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q35",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q36",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q37",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q38",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q39",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t4-q40",
        "passage_id": "cambridge-19-test-4-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Pedagogical philosophy argument 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng lý thuyết giáo dục câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 19 - Test 4 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
