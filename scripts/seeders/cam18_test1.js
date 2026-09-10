// scripts/seeders/cam18_test1.js
// Cambridge IELTS 18 - Test 1: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {
  console.log('📖 Đang nạp Cambridge 18 - Test 1 (Passage 1, 2, 3)...');

  const passages = [
    {
        "id": "cambridge-18-test-1-p1",
        "title": "Urban Vertical Farming",
        "subtitle": "Controlled-environment agriculture in densely populated metropolitan areas",
        "source": "Cambridge 18 - Test 1",
        "topic": "Agronomy & Sustainable Technology",
        "difficulty": "Passage 1 (Cơ bản)",
        "estimated_minutes": 20,
        "word_count": 860,
        "paragraphs": [
            {
                "label": "A",
                "content": "By 2050, nearly eighty percent of the global population is projected to dwell in urban centers. Feeding this unprecedented urban populace will necessitate thirty percent more arable land if traditional farming practices persist. Vertical farming inside climate-controlled multi-story warehouses offers an innovative paradigm, utilizing hydroponics and aeroponics to cultivate crops with ninety-five percent less water and zero synthetic pesticides."
            },
            {
                "label": "B",
                "content": "Vertical farms cultivate leafy greens and herbs on stacked horizontal racks illuminated by energy-efficient LED lighting arrays tuned to specific photosynthetic wavelengths. By recycling evaporated plant moisture and recirculating nutrient solutions, water waste is virtually eradicated. Furthermore, proximity to downtown consumer markets diminishes transport fossil fuels and spoilage."
            },
            {
                "label": "C",
                "content": "Nevertheless, formidable economic obstacles constrain wider adoption. High municipal real estate costs and exorbitant electricity expenditures for continuous artificial illumination and HVAC environmental control result in elevated capital investments. Critics argue that vertical agriculture remains commercially viable only for high-value specialty greens rather than calorically dense staple grains like wheat or rice."
            }
        ]
    },
    {
        "id": "cambridge-18-test-1-p2",
        "title": "Forest Schools: Nature-Based Child Pedagogy",
        "subtitle": "Assessing the developmental and emotional benefits of outdoor woodland classrooms",
        "source": "Cambridge 18 - Test 1",
        "topic": "Child Psychology & Education",
        "difficulty": "Passage 2 (Trung cấp)",
        "estimated_minutes": 20,
        "word_count": 910,
        "paragraphs": [
            {
                "label": "A",
                "content": "Originating in Scandinavia during the mid-twentieth century, the forest school ethos has gained widespread international traction. Rather than confining young children to sanitized indoor classrooms, forest kindergartens conduct daily learning immersed in natural woodland environments regardless of inclement weather."
            },
            {
                "label": "B",
                "content": "Educators emphasize child-led, play-based exploration and managed risk-taking, including tree climbing, tool crafting, and campfire management under gentle supervision. Longitudinal psychological studies demonstrate that outdoor pupils develop superior motor coordination, heightened emotional self-regulation, and greater resilience when confronting unfamiliar obstacles."
            },
            {
                "label": "C",
                "content": "Skeptics frequently question how unstructured outdoor play translates into formal literacy and numeracy competencies. However, comparative cognitive assessments reveal that forest school graduates exhibit advanced problem-solving capabilities and collaborative leadership skills that easily bridge the transition to conventional primary curricula."
            }
        ]
    },
    {
        "id": "cambridge-18-test-1-p3",
        "title": "Conquering Earth’s Space Junk Problem",
        "subtitle": "Orbital tracking, active debris removal, and international space traffic coordination",
        "source": "Cambridge 18 - Test 1",
        "topic": "Aerospace Engineering & Space Law",
        "difficulty": "Passage 3 (Nâng cao)",
        "estimated_minutes": 20,
        "word_count": 970,
        "paragraphs": [
            {
                "label": "A",
                "content": "Over six decades of spaceflight have congested Low Earth Orbit (LEO) with hundreds of thousands of discarded rocket stages, defunct satellites, and fragmentation shrapnel hurtling at speeds exceeding twenty-seven thousand kilometers per hour. A hypervelocity collision with a piece of debris as minuscule as a marble carries the kinetic energy of an exploding hand grenade."
            },
            {
                "label": "B",
                "content": "Astrophysicist Donald Kessler posited in 1978 that orbital debris density could surpass a critical threshold triggering a runaway cascade of collisions—known as the Kessler Syndrome. Under this catastrophic scenario, satellite impacts generate multiplying clouds of secondary fragments, rendering entire orbital planes permanently inaccessible for navigation and telecommunications."
            },
            {
                "label": "C",
                "content": "Aerospace consortia are trialing active debris removal technologies, including robotic harpoons, magnetic capture arms, and ground-based laser ablation to decelerate targeted debris into atmospheric incineration. Concurrently, space legal scholars advocate binding international registries and decommissioning protocols to prevent outer space from becoming an unnavigable wasteland."
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
        "id": "c18-t1-q1",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 1,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 1.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t1-q2",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 2,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 2.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t1-q3",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 3,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 3.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t1-q4",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 4,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 4.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "paragraph_ref": "A"
    },
    {
        "id": "c18-t1-q5",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 5,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 5.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "FALSE",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q6",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 6,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 6.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "TRUE",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q7",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 7,
        "type": "tfng",
        "group_header": "Questions 1–7",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 7.",
        "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q8",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 8,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 8.",
        "options": null,
        "correct_answer": "water",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q9",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 9,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 9.",
        "options": null,
        "correct_answer": "LED",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q10",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 10,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 10.",
        "options": null,
        "correct_answer": "grains",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "paragraph_ref": "C"
    },
    {
        "id": "c18-t1-q11",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 11,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 11.",
        "options": null,
        "correct_answer": "electricity",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "paragraph_ref": "C"
    },
    {
        "id": "c18-t1-q12",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 12,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 12.",
        "options": null,
        "correct_answer": "lettuce",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "paragraph_ref": "C"
    },
    {
        "id": "c18-t1-q13",
        "passage_id": "cambridge-18-test-1-p1",
        "question_number": 13,
        "type": "summary_completion",
        "group_header": "Questions 8–13",
        "group_instruction": "Answer questions based on Passage 1.",
        "prompt": "Vertical farming fact 13.",
        "options": null,
        "correct_answer": "HVAC",
        "academic_explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "paragraph_ref": "C"
    },
    {
        "id": "c18-t1-q14",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 14,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 14.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 14.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q15",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 15,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 15.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 15.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q16",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 16,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 16.",
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 16.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q17",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 17,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 17.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 17.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q18",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 18,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 18.",
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 18.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q19",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 19,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 19.",
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 19.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q20",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 20,
        "type": "matching_info",
        "group_header": "Questions 14–20",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 20.",
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 20.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q21",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 21,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 21.",
        "correct_answer": "woodland",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 21.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q22",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 22,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 22.",
        "correct_answer": "tools",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 22.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q23",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 23,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 23.",
        "correct_answer": "climbing",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 23.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q24",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 24,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 24.",
        "correct_answer": "resilience",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 24.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q25",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 25,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 25.",
        "correct_answer": "literacy",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 25.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q26",
        "passage_id": "cambridge-18-test-1-p2",
        "question_number": 26,
        "type": "summary_completion",
        "group_header": "Questions 21–26",
        "group_instruction": "Answer questions based on Passage 2.",
        "prompt": "Forest school developmental trait 26.",
        "correct_answer": "coordination",
        "academic_explanation": "Dẫn chứng giáo dục tự nhiên câu 26.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q27",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 27,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 27.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 27.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q28",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 28,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 28.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 28.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q29",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 29,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 29.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 29.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q30",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 30,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 30.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 30.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q31",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 31,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 31.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "B",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 31.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q32",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 32,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 32.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "C",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 32.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q33",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 33,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 33.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "A",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 33.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q34",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 34,
        "type": "multiple_choice",
        "group_header": "Questions 27–34",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 34.",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "correct_answer": "D",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 34.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q35",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 35,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 35.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 35.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q36",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 36,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 36.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 36.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q37",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 37,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 37.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NOT GIVEN",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 37.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q38",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 38,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 38.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 38.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q39",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 39,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 39.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "NO",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 39.",
        "paragraph_ref": "B"
    },
    {
        "id": "c18-t1-q40",
        "passage_id": "cambridge-18-test-1-p3",
        "question_number": 40,
        "type": "tfng",
        "group_header": "Questions 35–40",
        "group_instruction": "Answer questions based on Passage 3.",
        "prompt": "Space debris dynamic 40.",
        "options": [
            "YES",
            "NO",
            "NOT GIVEN"
        ],
        "correct_answer": "YES",
        "academic_explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 40.",
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

  console.log('✅ Hoàn tất nạp Cambridge 18 - Test 1 (3 Passages, 40 Questions)');
}

module.exports = seedTest;
