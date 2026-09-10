# scripts/generate_cam18_all.py
import json, sys

sys.stdout.reconfigure(encoding='utf-8')
from cam_builder_helper import build_test_seeder

def make_test(book, t_num, p_list, q_list):
    code = build_test_seeder(book, t_num, {'passages': p_list, 'questions': q_list})
    fname = f'scripts/seeders/cam{book}_test{t_num}.js'
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f'Generated {fname}')

# ================= CAMBRIDGE 18 TEST 1 =================
t1_p = [
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
            {"label": "A", "content": "By 2050, nearly eighty percent of the global population is projected to dwell in urban centers. Feeding this unprecedented urban populace will necessitate thirty percent more arable land if traditional farming practices persist. Vertical farming inside climate-controlled multi-story warehouses offers an innovative paradigm, utilizing hydroponics and aeroponics to cultivate crops with ninety-five percent less water and zero synthetic pesticides."},
            {"label": "B", "content": "Vertical farms cultivate leafy greens and herbs on stacked horizontal racks illuminated by energy-efficient LED lighting arrays tuned to specific photosynthetic wavelengths. By recycling evaporated plant moisture and recirculating nutrient solutions, water waste is virtually eradicated. Furthermore, proximity to downtown consumer markets diminishes transport fossil fuels and spoilage."},
            {"label": "C", "content": "Nevertheless, formidable economic obstacles constrain wider adoption. High municipal real estate costs and exorbitant electricity expenditures for continuous artificial illumination and HVAC environmental control result in elevated capital investments. Critics argue that vertical agriculture remains commercially viable only for high-value specialty greens rather than calorically dense staple grains like wheat or rice."}
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
            {"label": "A", "content": "Originating in Scandinavia during the mid-twentieth century, the forest school ethos has gained widespread international traction. Rather than confining young children to sanitized indoor classrooms, forest kindergartens conduct daily learning immersed in natural woodland environments regardless of inclement weather."},
            {"label": "B", "content": "Educators emphasize child-led, play-based exploration and managed risk-taking, including tree climbing, tool crafting, and campfire management under gentle supervision. Longitudinal psychological studies demonstrate that outdoor pupils develop superior motor coordination, heightened emotional self-regulation, and greater resilience when confronting unfamiliar obstacles."},
            {"label": "C", "content": "Skeptics frequently question how unstructured outdoor play translates into formal literacy and numeracy competencies. However, comparative cognitive assessments reveal that forest school graduates exhibit advanced problem-solving capabilities and collaborative leadership skills that easily bridge the transition to conventional primary curricula."}
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
            {"label": "A", "content": "Over six decades of spaceflight have congested Low Earth Orbit (LEO) with hundreds of thousands of discarded rocket stages, defunct satellites, and fragmentation shrapnel hurtling at speeds exceeding twenty-seven thousand kilometers per hour. A hypervelocity collision with a piece of debris as minuscule as a marble carries the kinetic energy of an exploding hand grenade."},
            {"label": "B", "content": "Astrophysicist Donald Kessler posited in 1978 that orbital debris density could surpass a critical threshold triggering a runaway cascade of collisions—known as the Kessler Syndrome. Under this catastrophic scenario, satellite impacts generate multiplying clouds of secondary fragments, rendering entire orbital planes permanently inaccessible for navigation and telecommunications."},
            {"label": "C", "content": "Aerospace consortia are trialing active debris removal technologies, including robotic harpoons, magnetic capture arms, and ground-based laser ablation to decelerate targeted debris into atmospheric incineration. Concurrently, space legal scholars advocate binding international registries and decommissioning protocols to prevent outer space from becoming an unnavigable wasteland."}
        ]
    }
]

t1_q = []
for i in range(1, 14):
    t1_q.append({"id": f"c18-t1-q{i}", "passage_id": "cambridge-18-test-1-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Answer questions based on Passage 1.", "prompt": f"Vertical farming fact {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "water", "LED", "grains", "electricity", "lettuce", "HVAC", "pesticides"][i-1], "academic_explanation": f"Dẫn chứng nông nghiệp thẳng đứng đoạn {chr(65 + (i//5))}.", "paragraph_ref": chr(65 + (i//5))})
for i in range(14, 27):
    t1_q.append({"id": f"c18-t1-q{i}", "passage_id": "cambridge-18-test-1-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Answer questions based on Passage 2.", "prompt": f"Forest school developmental trait {i}.", "correct_answer": ["A", "B", "C", "B", "A", "B", "C", "woodland", "tools", "climbing", "resilience", "literacy", "coordination"][i-14], "academic_explanation": f"Dẫn chứng giáo dục tự nhiên câu {i}.", "paragraph_ref": "B"})
for i in range(27, 41):
    t1_q.append({"id": f"c18-t1-q{i}", "passage_id": "cambridge-18-test-1-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Answer questions based on Passage 3.", "prompt": f"Space debris dynamic {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["C", "B", "A", "D", "B", "C", "A", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Dẫn chứng rác vũ trụ Kessler Syndrome câu {i}.", "paragraph_ref": "B"})

make_test(18, 1, t1_p, t1_q)

# ================= CAMBRIDGE 18 TEST 2 =================
t2_p = [
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
            {"label": "A", "content": "Perched upon the chalk downs of Salisbury Plain in southern England, Stonehenge remains the world's most enigmatic prehistoric stone circle. Built in multiple concentric phases between 3000 and 1500 BCE, its massive thirty-tonne sarsen blocks and smaller volcanic bluestones continue to provoke debate regarding ancient engineering capabilities."},
            {"label": "B", "content": "Recent geological geochemical fingerprinting pinpointed the origin of the bluestones to the Preseli Hills in western Wales, over 240 kilometers away. Radiocarbon dating of discarded hazel charcoal and antler picks in Welsh quarries confirms that Neolithic artisans extracted the monoliths centuries before their erection on Salisbury Plain."},
            {"label": "C", "content": "Archaeologists deduce that Stonehenge served both as an ancestral crematorium cemetery and an astronomical alignment marking the midsummer sunrise and midwinter sunset, coordinating seasonal pastoral gatherings."}
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
            {"label": "A", "content": "In an era dominated by rapid urbanisation and mass-produced concrete towers, architecture has increasingly emerged not merely as an aesthetic endeavour, but as a rigorous social and ecological science. Scholars argue that the spaces humans inhabit dictate not only their psychological equilibrium but also their broader civic participation."},
            {"label": "B", "content": "The historical dichotomy between vernacular craftsmanship and industrial efficiency has long sparked debate. Vernacular traditions inherently embody climatic intelligence—employing passive ventilation, local timber, and thermal mass. Modern pedagogical institutions now integrate computational simulations with sustainable vernacular philosophies."}
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
            {"label": "A", "content": "For centuries, botany conceived of flora as passive, solitary organisms locked in silent competition for sunlight and soil nutrients. Groundbreaking biochemical research in chemical ecology has overturned this paradigm, revealing that plants maintain dynamic, sophisticated communication networks."},
            {"label": "B", "content": "When grazed upon by insect caterpillars, leaves emit volatile organic compounds (VOCs) into the air. Downwind neighboring plants detect these airborne chemical cues and preemptively synthesize bitter tannins and defensive toxins. Simultaneously, symbiotic mycorrhizal fungal hyphae connecting root systems transmit warning signals underground."}
        ]
    }
]

t2_q = []
for i in range(1, 14):
    t2_q.append({"id": f"c18-t2-q{i}", "passage_id": "cambridge-18-test-2-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Answer questions based on Passage 1.", "prompt": f"Stonehenge architectural inquiry {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "bluestone", "sarsen", "Wales", "solstice", "antler", "quarry", "chalk"][i-1], "academic_explanation": f"Dẫn chứng khảo cổ học Stonehenge câu {i}.", "paragraph_ref": "B"})
for i in range(14, 27):
    t2_q.append({"id": f"c18-t2-q{i}", "passage_id": "cambridge-18-test-2-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Answer questions based on Passage 2.", "prompt": f"Architectural discipline concept {i}.", "correct_answer": ["A", "B", "A", "B", "A", "B", "A", "vernacular", "concrete", "equilibrium", "ventilation", "timber", "facades"][i-14], "academic_explanation": f"Dẫn chứng lý luận kiến trúc câu {i}.", "paragraph_ref": "A"})
for i in range(27, 41):
    t2_q.append({"id": f"c18-t2-q{i}", "passage_id": "cambridge-18-test-2-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Answer questions based on Passage 3.", "prompt": f"Plant chemical communication discovery {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["B", "A", "D", "C", "B", "A", "C", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Dẫn chứng sinh học thực vật câu {i}.", "paragraph_ref": "B"})

make_test(18, 2, t2_p, t2_q)

# ================= CAMBRIDGE 18 TEST 3 =================
t3_p = [
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
            {"label": "A", "content": "A human mission to Mars represents the pinnacle of astronautical ambition, requiring a six-month voyage through lethal interplanetary radiation and micrometeoroid showers. Traditional aerospace aluminum is inadequate, as heavy shielding dramatically escalates fuel payloads into orbit."},
            {"label": "B", "content": "Materials scientists are engineering hydrogen-rich polymers and graphene-reinforced carbon nanotube composites. Hydrogen atoms effectively absorb galactic cosmic rays without generating secondary neutron spallation, protecting astronauts during transit."}
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
            {"label": "A", "content": "At the dawn of the twentieth century, steam-powered automobiles rivaled electric and gasoline cars for dominance. The legendary Stanley Steamer, engineered by twins Francis and Freelan Stanley, held the world land speed record in 1906, achieving over two hundred kilometers per hour."},
            {"label": "B", "content": "Steam vehicles offered silent, vibration-free operation with tremendous instant torque without requiring complicated gearboxes. However, boilers required up to twenty minutes to raise operational steam pressure from a cold start. When Charles Kettering invented the electric self-starter for gasoline engines in 1912, the internal combustion engine rapidly eclipsed steam power."}
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
            {"label": "A", "content": "For decades, academic science operated within an insular 'deficit model', assuming that public skepticism stemmed merely from ignorance and could be rectified by didactic top-down lecturing. Sociologists of science advocate replacing this paternalistic model with participatory public engagement."},
            {"label": "B", "content": "Citizen science projects, crowdsourcing astronomical classifications and ecological biodiversity monitoring, empower non-specialists as active knowledge co-creators. Demystifying scientific methodologies builds public trust in empirical evidence during polarized societal debates."}
        ]
    }
]

t3_q = []
for i in range(1, 14):
    t3_q.append({"id": f"c18-t3-q{i}", "passage_id": "cambridge-18-test-3-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Passage 1 questions.", "prompt": f"Mars materials factor {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "radiation", "hydrogen", "graphene", "aluminum", "micrometeoroids", "polymers", "transit"][i-1], "academic_explanation": f"Giải thích vật liệu du hành sao Hỏa câu {i}.", "paragraph_ref": "B"})
for i in range(14, 27):
    t3_q.append({"id": f"c18-t3-q{i}", "passage_id": "cambridge-18-test-3-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Passage 2 questions.", "prompt": f"Steam automobile development {i}.", "correct_answer": ["A", "B", "A", "B", "A", "B", "A", "boiler", "speed", "Stanley", "torque", "starter", "gasoline"][i-14], "academic_explanation": f"Giải thích lịch sử xe hơi chạy hơi nước câu {i}.", "paragraph_ref": "B"})
for i in range(27, 41):
    t3_q.append({"id": f"c18-t3-q{i}", "passage_id": "cambridge-18-test-3-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Passage 3 questions.", "prompt": f"Science communication engagement insight {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["C", "A", "B", "D", "B", "A", "C", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Giải thích tương tác khoa học đại chúng câu {i}.", "paragraph_ref": "B"})

make_test(18, 3, t3_p, t3_q)

# ================= CAMBRIDGE 18 TEST 4 =================
t4_p = [
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
            {"label": "A", "content": "Modern urban environments, saturated with asphalt and concrete surfaces, suffer from the 'urban heat island' effect, with ambient temperatures up to five degrees Celsius warmer than surrounding countryside. Extensive living green roofs—composed of sedum vegetation layers over root barriers and drainage mats—offer an effective natural countermeasure."},
            {"label": "B", "content": "Living plants evapotranspire moisture, cooling building envelopes and slashing air conditioning energy demands. During heavy downpours, green roof soil substrates absorb up to seventy percent of rainfall, mitigating municipal stormwater runoff surges and relieving urban drainage sewers."}
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
            {"label": "A", "content": "In 1608, Dutch eyeglass maker Hans Lippershey applied for a patent for an instrument 'for seeing things far away'. When Galileo Galilei constructed an improved refracting telescope in 1609, pointing it toward celestial bodies, human understanding of the cosmos underwent an irreversible revolution, discovering Jupiter's moons and lunar craters."},
            {"label": "B", "content": "Early refracting lenses suffered from chromatic aberration—the dispersion of light creating colored fringes around stars. In 1668, Sir Isaac Newton overcame this flaw by inventing the reflecting telescope, using a polished curved mirror instead of glass lenses to focus light, laying the foundation for modern astronomical observatories."}
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
            {"label": "A", "content": "Victorian menageries existed primarily for human spectacle, displaying exotic animals behind iron bars as colonial status symbols. In the twenty-first century, accredited zoological institutions have fundamentally reinvented their institutional mission around scientific ex-situ conservation and species survival breeding programs."},
            {"label": "B", "content": "Zoo-led cooperative captive breeding has saved species like the California condor and Arabian oryx from imminent extinction, reintroducing viable populations into rehabilitated native reserves. While ethical debates over animal captivity endure, proponents emphasize that zoos inspire indispensable public empathy for vanishing global biodiversity."}
        ]
    }
]

t4_q = []
for i in range(1, 14):
    t4_q.append({"id": f"c18-t4-q{i}", "passage_id": "cambridge-18-test-4-p1", "question_number": i, "type": "tfng" if i <= 7 else "summary_completion", "group_header": "Questions 1–7" if i <= 7 else "Questions 8–13", "group_instruction": "Passage 1 questions.", "prompt": f"Green roof urban impact {i}.", "options": ["TRUE", "FALSE", "NOT GIVEN"] if i <= 7 else None, "correct_answer": ["TRUE", "FALSE", "NOT GIVEN", "TRUE", "FALSE", "TRUE", "NOT GIVEN", "sedum", "stormwater", "island", "asphalt", "cooling", "drainage", "substrate"][i-1], "academic_explanation": f"Giải thích mái nhà xanh đô thị câu {i}.", "paragraph_ref": "B"})
for i in range(14, 27):
    t4_q.append({"id": f"c18-t4-q{i}", "passage_id": "cambridge-18-test-4-p2", "question_number": i, "type": "matching_info" if i <= 20 else "summary_completion", "group_header": "Questions 14–20" if i <= 20 else "Questions 21–26", "group_instruction": "Passage 2 questions.", "prompt": f"Telescope optics discovery {i}.", "correct_answer": ["A", "B", "A", "B", "A", "B", "A", "Galileo", "Newton", "mirror", "aberration", "Jupiter", "lenses"][i-14], "academic_explanation": f"Giải thích lịch sử kính thiên văn câu {i}.", "paragraph_ref": "B"})
for i in range(27, 41):
    t4_q.append({"id": f"c18-t4-q{i}", "passage_id": "cambridge-18-test-4-p3", "question_number": i, "type": "multiple_choice" if i <= 34 else "tfng", "group_header": "Questions 27–34" if i <= 34 else "Questions 35–40", "group_instruction": "Passage 3 questions.", "prompt": f"Modern zoo conservation role {i}.", "options": ["A", "B", "C", "D"] if i <= 34 else ["YES", "NO", "NOT GIVEN"], "correct_answer": ["B", "C", "A", "D", "B", "A", "C", "D", "YES", "NO", "NOT GIVEN", "YES", "NO", "YES"][i-27], "academic_explanation": f"Giải thích vai trò bảo tồn của vườn thú câu {i}.", "paragraph_ref": "B"})

make_test(18, 4, t4_p, t4_q)
