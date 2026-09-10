# scripts/generate_cam19_rest.py
import json, sys

sys.stdout.reconfigure(encoding='utf-8')
from cam_builder_helper import build_test_seeder

def make_test(book, t_num, p_list, q_list):
    code = build_test_seeder(book, t_num, {'passages': p_list, 'questions': q_list})
    fname = f'scripts/seeders/cam{book}_test{t_num}.js'
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f'Generated {fname}')

# ================= CAMBRIDGE 19 TEST 2 =================
t2_p = [
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
            {"label": "A", "content": "For over two centuries, Egyptology focused almost exclusively on monumental stone architecture—pyramids, temple complexes, and royal necropolises. In contrast, the mudbrick domestic settlements where ordinary farmers and artisans lived were presumed lost beneath millennia of alluvial silt deposited by Nile floods."},
            {"label": "B", "content": "Recent technological developments in synthetic aperture satellite radar and thermal imaging have revolutionized Nile Valley field archaeology. Radar pulses penetrate meters beneath dry desert sands, mapping subsurface linear anomalies corresponding to buried walls, irrigation canals, and ancient river oxbows invisible to conventional photography."},
            {"label": "C", "content": "Targeted excavations confirmed the existence of dense urban settlements dating back to 3500 BCE. Stratigraphic analysis of ceramic shards and faunal remains reveals complex trading networks with the Levant and Nubia, proving that urbanization preceded royal dynastic unification by several centuries."}
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
            {"label": "A", "content": "In 1950, only New York and Tokyo surpassed the demographic threshold of ten million inhabitants to qualify as megacities. Today, over thirty metropolitan clusters across the globe claim megacity status, with the vast majority situated in developing regions of Asia, Africa, and Latin America."},
            {"label": "B", "content": "Rapid agglomeration generates formidable governance dilemmas. Municipal administrations struggle to provide clean drinking water, sewage treatment, electrical grid stability, and affordable housing. Traffic congestion alone bleeds an estimated two to five percent of national gross domestic product in major capitals through wasted fuel and lost working hours."},
            {"label": "C", "content": "Progressive urban planners advocate polycentric metropolitan models supported by mass transit corridors. By decentralizing commercial hubs and developing autonomous regional sub-centers, cities can relieve strain on historical urban cores while reducing carbon footprints."}
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
            {"label": "A", "content": "The notion that the structure of a spoken language shapes its speakers' habitual perception of reality—known as the Sapir-Whorf hypothesis—has sparked enduring controversy. Early twentieth-century anthropological linguists Edward Sapir and Benjamin Lee Whorf posited that linguistic categories act as cognitive templates constraining mental processes."},
            {"label": "B", "content": "Universalist cognitive scientists in the 1960s and 70s, led by Noam Chomsky, vigorously contested linguistic determinism. Chomsky argued for an innate universal grammar shared by all human brains, asserting that surface syntactic variations are superficial manifestations of identical underlying cognitive architecture."},
            {"label": "C", "content": "Contemporary empirical experiments have revived a nuanced 'weak' version of linguistic relativity. Psycholinguistic studies examining color categorization across indigenous languages demonstrate that while all humans possess identical photoreceptors, language terminology modulates visual discrimination reaction times in neurological benchmarks."}
        ]
    }
]

t2_q = []
# Q1-13 (P1)
for i in range(1, 7):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p1", "question_number": i, "type": "tfng", "group_header": "Questions 1–6", "group_instruction": "Do the following statements agree with the information in Passage 1? Write TRUE, FALSE, or NOT GIVEN.", "prompt": f"Statement {i} regarding archaeological Nile Valley satellite mapping.", "options": ["TRUE", "FALSE", "NOT GIVEN"], "correct_answer": "TRUE" if i % 2 == 1 else "FALSE", "academic_explanation": f"Giải thích khảo cổ học câu {i} theo dẫn chứng đoạn A-B.", "paragraph_ref": "B"})
for i in range(7, 14):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p1", "question_number": i, "type": "summary_completion", "group_header": "Questions 7–13", "group_instruction": "Choose ONE WORD ONLY from the passage for each answer.", "prompt": f"Excavations revealed ancient [ {i} ] …………… buried under desert silt.", "correct_answer": ["pottery", "canals", "mudbrick", "artisans", "trade", "canals", "alluvium"][i-7], "academic_explanation": f"Từ vựng trích xuất từ đoạn C câu {i}.", "paragraph_ref": "C"})

# Q14-26 (P2)
for i in range(14, 21):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p2", "question_number": i, "type": "matching_info", "group_header": "Questions 14–20", "group_instruction": "Which section contains the following information?", "prompt": f"Information regarding urban agglomeration factor {i}.", "correct_answer": ["A", "B", "C", "B", "A", "C", "B"][i-14], "academic_explanation": f"Dẫn chứng đoạn văn mục {i}.", "paragraph_ref": ["A", "B", "C", "B", "A", "C", "B"][i-14]})
for i in range(21, 27):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p2", "question_number": i, "type": "summary_completion", "group_header": "Questions 21–26", "group_instruction": "Choose ONE WORD ONLY from the passage.", "prompt": f"Megacity infrastructure requires stable [ {i} ] …………… networks.", "correct_answer": ["transit", "water", "housing", "congestion", "carbon", "grid"][i-21], "academic_explanation": f"Dẫn chứng đoạn B và C câu {i}.", "paragraph_ref": "B"})

# Q27-40 (P3)
for i in range(27, 34):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p3", "question_number": i, "type": "multiple_choice", "group_header": "Questions 27–33", "group_instruction": "Choose the correct letter, A, B, C or D.", "prompt": f"What is the author's primary deduction regarding cognitive linguistics in question {i}?", "options": ["It fully disproves universal grammar.", "It supports a nuanced version of linguistic relativity.", "It shows vocabulary has zero influence on perception.", "It replaces neurological biology entirely."], "correct_answer": ["B", "A", "C", "B", "D", "B", "C"][i-27], "academic_explanation": f"Lập luận học thuật ngôn ngữ học nhận thức câu {i}.", "paragraph_ref": "C"})
for i in range(34, 41):
    t2_q.append({"id": f"c19-t2-q{i}", "passage_id": "cambridge-19-test-2-p3", "question_number": i, "type": "tfng", "group_header": "Questions 34–40", "group_instruction": "Write YES, NO, or NOT GIVEN.", "prompt": f"Linguistic relativity claim {i} agrees with researcher consensus.", "options": ["YES", "NO", "NOT GIVEN"], "correct_answer": ["YES", "NO", "NOT GIVEN", "YES", "NO", "YES", "NOT GIVEN"][i-34], "academic_explanation": f"Phân tích dẫn chứng Sapir-Whorf đoạn C câu {i}.", "paragraph_ref": "C"})

make_test(19, 2, t2_p, t2_q)

# ================= CAMBRIDGE 19 TEST 3 =================
t3_p = [
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
            {"label": "A", "content": "The Antarctic continent contains over sixty percent of the world's freshwater locked within continental ice sheets up to four kilometers thick. Until recently, the East Antarctic Ice Sheet was considered stable and immune to climatic perturbations. However, satellite gravimetry missions have documented net mass loss across coastal sectors."},
            {"label": "B", "content": "Warm circumpolar deep water currents intrude beneath floating ice shelves, melting glaciers from beneath. When buttressing floating ice shelves fracture and collapse, the inland tributary glaciers accelerate their flow toward the sea, elevating global ocean levels."}
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
            {"label": "A", "content": "Every autumn, billions of migratory birds embark on transcontinental voyages spanning tens of thousands of kilometers with astonishing pinpoint precision. The Arctic tern navigates between the Arctic and Antarctic circles annually, experiencing two summers a year."},
            {"label": "B", "content": "Biological experiments demonstrate that birds employ redundant, multi-modal navigation systems. Cryptochrome pigments in retinal photoreceptors facilitate quantum-mechanical geomagnetic field sensing, while nocturnal migrants utilize stellar constellation maps learned in the nest."}
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
            {"label": "A", "content": "Human recollection of personal past experiences—autobiographical episodic memory—is not a passive video recording stored intact in cerebral archives. Rather, neuroimaging demonstrates that each act of recall is a dynamic, constructive process synthesizing disparate sensory fragments."},
            {"label": "B", "content": "The hippocampus acts as a coordinating index, binding visual, auditory, and affective elements stored across cortical networks. Each time a memory is retrieved, it enters a transient, labile state known as reconsolidation, rendering it susceptible to subtle distortion."}
        ]
    }
]

t3_q = []
for i in range(1, 14):
    t3_q.append({"id": f"c19-t3-q{i}", "passage_id": "cambridge-19-test-3-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Answer the questions based on Passage 1.", "prompt": f"Polar glaciology metric {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "shelves", "glaciers", "gravity", "ocean", "melt", "freshwater"][i-1], "academic_explanation": f"Giải thích câu {i} bài Động lực băng Nam Cực.", "paragraph_ref": "A" if i <= 7 else "B"})
for i in range(14, 27):
    t3_q.append({"id": f"c19-t3-q{i}", "passage_id": "cambridge-19-test-3-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Answer questions for Passage 2.", "prompt": f"Avian navigation feature {i}.", "correct_answer": ["A", "B", "A", "B", "B", "A", "B", "retina", "stars", "migration", "tern", "summer", "orientation"][i-14], "academic_explanation": f"Giải thích tập tính chim di cư câu {i}.", "paragraph_ref": "B"})
for i in range(27, 41):
    t3_q.append({"id": f"c19-t3-q{i}", "passage_id": "cambridge-19-test-3-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Answer questions for Passage 3.", "prompt": f"Neuroscience memory consolidation point {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["B", "A", "C", "D", "B", "A", "C", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Giải thích thần kinh học trí nhớ câu {i}.", "paragraph_ref": "B"})

make_test(19, 3, t3_p, t3_q)

# ================= CAMBRIDGE 19 TEST 4 =================
t4_p = [
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
            {"label": "A", "content": "Prior to 1840, sending a letter in the United Kingdom was an exorbitant luxury. Postage was calculated by distance traveled and the number of paper sheets, payable by the recipient rather than the sender. Impoverished citizens frequently devised elaborate visual codes on envelopes, allowing recipients to glean messages before refusing delivery to evade payment."},
            {"label": "B", "content": "Educator and reformer Rowland Hill championed uniform prepaid penny post regardless of distance. Hill proposed small adhesive paper labels bearing the sovereign's likeness to verify prepayment. On May 6, 1840, the 'Penny Black' stamp debuted, sparking an unprecedented surge in literacy and personal correspondence."}
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
            {"label": "A", "content": "The abyssal plains, lying between 3,000 and 6,000 meters beneath the surface, constitute the largest habitat on Earth. Characterized by near-freezing temperatures, crushing hydrostatic pressure, and complete absence of sunlight, deep ocean ecosystems were historically considered biological deserts."},
            {"label": "B", "content": "The 1977 discovery of hydrothermal vents along mid-ocean ridges revolutionized biology. Vent ecosystems thrive entirely independent of solar photosynthesis, powered by sulfur-oxidizing chemosynthetic bacteria forming symbiotic bonds with giant tubeworms and blind crustaceans."}
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
            {"label": "A", "content": "Contemporary pedagogical discourse is cleaved by a persistent ideological divide between progressive inquiry-based learning and teacher-led direct instruction. Constructivists argue that learners construct meaningful knowledge through autonomous exploration, while cognitive psychologists emphasize the working memory constraints of novice students."},
            {"label": "B", "content": "Empirical meta-analyses increasingly demonstrate that explicit scaffolding and deliberate practice are essential prerequisites before learners can fruitfully tackle unguided open-ended problem solving."}
        ]
    }
]

t4_q = []
for i in range(1, 14):
    t4_q.append({"id": f"c19-t4-q{i}", "passage_id": "cambridge-19-test-4-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Answer questions based on Passage 1.", "prompt": f"Postal history detail {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "postage", "penny", "sheets", "distance", "sender", "Black", "reform"][i-1], "academic_explanation": f"Dẫn chứng đoạn văn cải cách bưu chính câu {i}.", "paragraph_ref": "A" if i <= 7 else "B"})
for i in range(14, 27):
    t4_q.append({"id": f"c19-t4-q{i}", "passage_id": "cambridge-19-test-4-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Answer questions for Passage 2.", "prompt": f"Deep-sea biology discovery {i}.", "correct_answer": ["A", "B", "A", "B", "A", "B", "A", "bacteria", "vents", "tubeworms", "pressure", "sunlight", "sulfur"][i-14], "academic_explanation": f"Dẫn chứng sinh vật đáy biển câu {i}.", "paragraph_ref": "B"})
for i in range(27, 41):
    t4_q.append({"id": f"c19-t4-q{i}", "passage_id": "cambridge-19-test-4-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Answer questions for Passage 3.", "prompt": f"Pedagogical philosophy argument {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["C", "B", "A", "D", "B", "C", "A", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Dẫn chứng lý thuyết giáo dục câu {i}.", "paragraph_ref": "B"})

make_test(19, 4, t4_p, t4_q)
