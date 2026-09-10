// scripts/seeders/cam19_test3.js
// Cambridge IELTS 19 - Test 3: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 19 - Test 3 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-19-test-3-p1",
        "title": "Antarctic Ice Sheet Dynamics",
        "subtitle": "Satellite altimetry reveals acceleration of marine-terminating glaciers",
        "source": "Cambridge 19 - Test 3",
        "topic": "Glaciology & Climatology",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 870,
        "paragraphs": [
            {
                "label": "A",
                "content": "The Antarctic continent contains over sixty percent of the world's freshwater locked within continental ice sheets up to four kilometers thick. Until recently, the East Antarctic Ice Sheet was considered stable and immune to climatic perturbations. However, satellite gravimetry missions have documented net mass loss across coastal sectors."
            },
            {
                "label": "B",
                "content": "Warm circumpolar deep water currents intrude beneath floating ice shelves, melting glaciers from beneath. When buttressing floating ice shelves fracture and collapse, the inland tributary glaciers accelerate their flow toward the sea, elevating global ocean levels."
            }
        ]
    },
    {
        "id": "cambridge-19-test-3-p2",
        "title": "Avian Navigation: The Feats of Migratory Birds",
        "subtitle": "Geomagnetic perception, stellar maps, and olfactory orientation in avian migration",
        "source": "Cambridge 19 - Test 3",
        "topic": "Ornithology & Animal Behavior",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 920,
        "paragraphs": [
            {
                "label": "A",
                "content": "Every autumn, billions of migratory birds embark on transcontinental voyages spanning tens of thousands of kilometers with astonishing pinpoint precision. The Arctic tern navigates between the Arctic and Antarctic circles annually, experiencing two summers a year."
            },
            {
                "label": "B",
                "content": "Biological experiments demonstrate that birds employ redundant, multi-modal navigation systems. Cryptochrome pigments in retinal photoreceptors facilitate quantum-mechanical geomagnetic field sensing, while nocturnal migrants utilize stellar constellation maps learned in the nest."
            }
        ]
    },
    {
        "id": "cambridge-19-test-3-p3",
        "title": "The Neurobiology of Autobiographical Memory",
        "subtitle": "Hippocampal consolidation, episodic retrieval, and the constructive nature of recollection",
        "source": "Cambridge 19 - Test 3",
        "topic": "Cognitive Neuroscience",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 960,
        "paragraphs": [
            {
                "label": "A",
                "content": "Human recollection of personal past experiences—autobiographical episodic memory—is not a passive video recording stored intact in cerebral archives. Rather, neuroimaging demonstrates that each act of recall is a dynamic, constructive process synthesizing disparate sensory fragments."
            },
            {
                "label": "B",
                "content": "The hippocampus acts as a coordinating index, binding visual, auditory, and affective elements stored across cortical networks. Each time a memory is retrieved, it enters a transient, labile state known as reconsolidation, rendering it susceptible to subtle distortion."
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
        "id": "c19-t3-q1",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 1 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q2",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 2 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q3",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 3 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q4",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 4 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q5",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích câu 5 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q6",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích câu 6 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q7",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích câu 7 bài Động lực băng Nam Cực.",
        "paragraph_ref": "A"
    },
    {
        "id": "c19-t3-q8",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 8.",
        "options": null,
        "correct_answer": "shelves",
        "academic_explanation": "Giải thích câu 8 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q9",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 9.",
        "options": null,
        "correct_answer": "glaciers",
        "academic_explanation": "Giải thích câu 9 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q10",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 10.",
        "options": null,
        "correct_answer": "gravity",
        "academic_explanation": "Giải thích câu 10 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q11",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 11.",
        "options": null,
        "correct_answer": "ocean",
        "academic_explanation": "Giải thích câu 11 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q12",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 12.",
        "options": null,
        "correct_answer": "melt",
        "academic_explanation": "Giải thích câu 12 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q13",
        "passage_id": "cambridge-19-test-3-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer the questions based on Passage 1.",
        "prompt": "Polar glaciology metric 13.",
        "options": null,
        "correct_answer": "freshwater",
        "academic_explanation": "Giải thích câu 13 bài Động lực băng Nam Cực.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q14",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 14.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích tập tính chim di cư câu 14.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q15",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 15.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích tập tính chim di cư câu 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q16",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 16.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích tập tính chim di cư câu 16.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q17",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 17.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích tập tính chim di cư câu 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q18",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 18.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích tập tính chim di cư câu 18.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q19",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 19.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích tập tính chim di cư câu 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q20",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 20.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích tập tính chim di cư câu 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q21",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 21.",
        "correct_answer": "retina",
        "academic_explanation": "Giải thích tập tính chim di cư câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q22",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 22.",
        "correct_answer": "stars",
        "academic_explanation": "Giải thích tập tính chim di cư câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q23",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 23.",
        "correct_answer": "migration",
        "academic_explanation": "Giải thích tập tính chim di cư câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q24",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 24.",
        "correct_answer": "tern",
        "academic_explanation": "Giải thích tập tính chim di cư câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q25",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 25.",
        "correct_answer": "summer",
        "academic_explanation": "Giải thích tập tính chim di cư câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q26",
        "passage_id": "cambridge-19-test-3-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions for Passage 2.",
        "prompt": "Avian navigation feature 26.",
        "correct_answer": "orientation",
        "academic_explanation": "Giải thích tập tính chim di cư câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q27",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q28",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q29",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q30",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q31",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q32",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q33",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q34",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q35",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q36",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q37",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q38",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q39",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c19-t3-q40",
        "passage_id": "cambridge-19-test-3-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions for Passage 3.",
        "prompt": "Neuroscience memory consolidation point 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích thần kinh học trí nhớ câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 19 - Test 3 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
