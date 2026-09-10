// scripts/seeders/cam18_test4.js
// Cambridge IELTS 18 - Test 4: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 18 - Test 4 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-18-test-4-p1",
        "title": "Green Roofs in Urban Architecture",
        "subtitle": "Mitigating urban heat island effect and enhancing stormwater retention",
        "source": "Cambridge 18 - Test 4",
        "topic": "Urban Ecology & Architecture",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "Modern urban environments, saturated with asphalt and concrete surfaces, suffer from the 'urban heat island' effect, with ambient temperatures up to five degrees Celsius warmer than surrounding countryside. Extensive living green roofs—composed of sedum vegetation layers over root barriers and drainage mats—offer an effective natural countermeasure."
            },
            {
                "label": "B",
                "content": "Living plants evapotranspire moisture, cooling building envelopes and slashing air conditioning energy demands. During heavy downpours, green roof soil substrates absorb up to seventy percent of rainfall, mitigating municipal stormwater runoff surges and relieving urban drainage sewers."
            }
        ]
    },
    {
        "id": "cambridge-18-test-4-p2",
        "title": "The Historical Development of the Telescope",
        "subtitle": "From Dutch spectacle makers to Newtonian reflectors and orbiting observatories",
        "source": "Cambridge 18 - Test 4",
        "topic": "History of Astronomy & Optics",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 920,
        "paragraphs": [
            {
                "label": "A",
                "content": "In 1608, Dutch eyeglass maker Hans Lippershey applied for a patent for an instrument 'for seeing things far away'. When Galileo Galilei constructed an improved refracting telescope in 1609, pointing it toward celestial bodies, human understanding of the cosmos underwent an irreversible revolution, discovering Jupiter's moons and lunar craters."
            },
            {
                "label": "B",
                "content": "Early refracting lenses suffered from chromatic aberration—the dispersion of light creating colored fringes around stars. In 1668, Sir Isaac Newton overcame this flaw by inventing the reflecting telescope, using a polished curved mirror instead of glass lenses to focus light, laying the foundation for modern astronomical observatories."
            }
        ]
    },
    {
        "id": "cambridge-18-test-4-p3",
        "title": "The Modern Purpose of Zoological Institutions",
        "subtitle": "Reconciling historical entertainment menageries with scientific ex-situ species conservation",
        "source": "Cambridge 18 - Test 4",
        "topic": "Wildlife Conservation & Bioethics",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 960,
        "paragraphs": [
            {
                "label": "A",
                "content": "Victorian menageries existed primarily for human spectacle, displaying exotic animals behind iron bars as colonial status symbols. In the twenty-first century, accredited zoological institutions have fundamentally reinvented their institutional mission around scientific ex-situ conservation and species survival breeding programs."
            },
            {
                "label": "B",
                "content": "Zoo-led cooperative captive breeding has saved species like the California condor and Arabian oryx from imminent extinction, reintroducing viable populations into rehabilitated native reserves. While ethical debates over animal captivity endure, proponents emphasize that zoos inspire indispensable public empathy for vanishing global biodiversity."
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
        "id": "c18-t4-q1",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q2",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 2.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q3",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 3.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q4",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 4.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q5",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 5.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q6",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 6.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q7",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 7.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q8",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 8.",
        "options": null,
        "correct_answer": "sedum",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q9",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 9.",
        "options": null,
        "correct_answer": "stormwater",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q10",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 10.",
        "options": null,
        "correct_answer": "island",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q11",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 11.",
        "options": null,
        "correct_answer": "asphalt",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q12",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 12.",
        "options": null,
        "correct_answer": "cooling",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q13",
        "passage_id": "cambridge-18-test-4-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Passage 1 questions.",
        "prompt": "Green roof urban impact 13.",
        "options": null,
        "correct_answer": "drainage",
        "academic_explanation": "Giải thích mái nhà xanh đô thị câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q14",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 14.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 14.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q15",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 15.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q16",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 16.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 16.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q17",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 17.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q18",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 18.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 18.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q19",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 19.",
        "correct_answer": "B",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q20",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 20.",
        "correct_answer": "A",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q21",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 21.",
        "correct_answer": "Galileo",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q22",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 22.",
        "correct_answer": "Newton",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q23",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 23.",
        "correct_answer": "mirror",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q24",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 24.",
        "correct_answer": "aberration",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q25",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 25.",
        "correct_answer": "Jupiter",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q26",
        "passage_id": "cambridge-18-test-4-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Passage 2 questions.",
        "prompt": "Telescope optics discovery 26.",
        "correct_answer": "lenses",
        "academic_explanation": "Giải thích lịch sử kính thiên văn câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q27",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q28",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q29",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q30",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q31",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q32",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q33",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q34",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q35",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q36",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q37",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q38",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q39",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t4-q40",
        "passage_id": "cambridge-18-test-4-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Passage 3 questions.",
        "prompt": "Modern zoo conservation role 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Giải thích vai trò bảo tồn của vườn thú câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 18 - Test 4 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
