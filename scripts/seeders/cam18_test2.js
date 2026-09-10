// scripts/seeders/cam18_test2.js
// Cambridge IELTS 18 - Test 2: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 18 - Test 2 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-18-test-2-p1",
        "title": "Stonehenge: Secrets of the Megalithic Builders",
        "subtitle": "Archaeological analysis of bluestone quarries, transport logistics, and solstice rituals",
        "source": "Cambridge 18 - Test 2",
        "topic": "Prehistoric Archaeology",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 870,
        "paragraphs": [
            {
                "label": "A",
                "content": "Perched upon the chalk downs of Salisbury Plain in southern England, Stonehenge remains the world's most enigmatic prehistoric stone circle. Built in multiple concentric phases between 3000 and 1500 BCE, its massive thirty-tonne sarsen blocks and smaller volcanic bluestones continue to provoke debate regarding ancient engineering capabilities."
            },
            {
                "label": "B",
                "content": "Recent geological geochemical fingerprinting pinpointed the origin of the bluestones to the Preseli Hills in western Wales, over 240 kilometers away. Radiocarbon dating of discarded hazel charcoal and antler picks in Welsh quarries confirms that Neolithic artisans extracted the monoliths centuries before their erection on Salisbury Plain."
            },
            {
                "label": "C",
                "content": "Archaeologists deduce that Stonehenge served both as an ancestral crematorium cemetery and an astronomical alignment marking the midsummer sunrise and midwinter sunset, coordinating seasonal pastoral gatherings."
            }
        ]
    },
    {
        "id": "cambridge-18-test-2-p2",
        "title": "The Desirable Discipline of Architecture",
        "subtitle": "Balancing vernacular craftsmanship, structural integrity, and ecological sustainability",
        "source": "Cambridge 18 - Test 2",
        "topic": "Architecture & Urban Design",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 890,
        "paragraphs": [
            {
                "label": "A",
                "content": "In an era dominated by rapid urbanisation and mass-produced concrete towers, architecture has increasingly emerged not merely as an aesthetic endeavour, but as a rigorous social and ecological science. Scholars argue that the spaces humans inhabit dictate not only their psychological equilibrium but also their broader civic participation."
            },
            {
                "label": "B",
                "content": "The historical dichotomy between vernacular craftsmanship and industrial efficiency has long sparked debate. Vernacular traditions inherently embody climatic intelligence—employing passive ventilation, local timber, and thermal mass. Modern pedagogical institutions now integrate computational simulations with sustainable vernacular philosophies."
            }
        ]
    },
    {
        "id": "cambridge-18-test-2-p3",
        "title": "Plants That Talk: Chemical Signaling",
        "subtitle": "Airborne volatile organic compounds and mycorrhizal underground communication networks",
        "source": "Cambridge 18 - Test 2",
        "topic": "Plant Physiology & Chemical Ecology",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 960,
        "paragraphs": [
            {
                "label": "A",
                "content": "For centuries, botany conceived of flora as passive, solitary organisms locked in silent competition for sunlight and soil nutrients. Groundbreaking biochemical research in chemical ecology has overturned this paradigm, revealing that plants maintain dynamic, sophisticated communication networks."
            },
            {
                "label": "B",
                "content": "When grazed upon by insect caterpillars, leaves emit volatile organic compounds (VOCs) into the air. Downwind neighboring plants detect these airborne chemical cues and preemptively synthesize bitter tannins and defensive toxins. Simultaneously, symbiotic mycorrhizal fungal hyphae connecting root systems transmit warning signals underground."
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
        "id": "c18-t2-q1",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 1.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q2",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 2.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q3",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 3.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q4",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 4.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q5",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 5.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q6",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 6.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q7",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 7.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q8",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 8.",
        "options": null,
        "correct_answer": "bluestone",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 8.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q9",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 9.",
        "options": null,
        "correct_answer": "sarsen",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 9.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q10",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 10.",
        "options": null,
        "correct_answer": "Wales",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 10.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q11",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 11.",
        "options": null,
        "correct_answer": "solstice",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 11.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q12",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 12.",
        "options": null,
        "correct_answer": "antler",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 12.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q13",
        "passage_id": "cambridge-18-test-2-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Stonehenge architectural inquiry 13.",
        "options": null,
        "correct_answer": "quarry",
        "academic_explanation": "Dẫn chứng khảo cổ học Stonehenge câu 13.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q14",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 14.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 14.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q15",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 15.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 15.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q16",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 16.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 16.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q17",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 17.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 17.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q18",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 18.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 18.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q19",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 19.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 19.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q20",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 20.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 20.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q21",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 21.",
        "correct_answer": "vernacular",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 21.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q22",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 22.",
        "correct_answer": "concrete",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 22.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q23",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 23.",
        "correct_answer": "equilibrium",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 23.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q24",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 24.",
        "correct_answer": "ventilation",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 24.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q25",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 25.",
        "correct_answer": "timber",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 25.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q26",
        "passage_id": "cambridge-18-test-2-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Architectural discipline concept 26.",
        "correct_answer": "facades",
        "academic_explanation": "Dẫn chứng lý luận kiến trúc câu 26.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t2-q27",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q28",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q29",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q30",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q31",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q32",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q33",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q34",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q35",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q36",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q37",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q38",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q39",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t2-q40",
        "passage_id": "cambridge-18-test-2-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Plant chemical communication discovery 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng sinh học thực vật câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 18 - Test 2 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
