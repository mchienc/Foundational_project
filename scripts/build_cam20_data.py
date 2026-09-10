# scripts/build_cam20_all.py
import pypdf, json, re, sys, os

sys.stdout.reconfigure(encoding='utf-8')
pdf_path = 'c:/doan_coso/online-learning-website/data/CAM 20 Reading - Listening (đẹp).pdf'
reader = pypdf.PdfReader(pdf_path)

def get_paras(pages, labeled=False):
    full_text = '\n'.join([reader.pages[p].extract_text() or '' for p in pages])
    lines = [l.strip() for l in full_text.split('\n') if l.strip() and not l.startswith('thread: dongan')]
    
    if labeled:
        paras = []
        cur_label = None
        cur_text = []
        for line in lines:
            m = re.match(r'^([A-H])\.\s*(.*)', line)
            if m:
                if cur_label:
                    paras.append({'label': cur_label, 'content': ' '.join(cur_text)})
                cur_label = m.group(1)
                cur_text = [m.group(2)]
            elif cur_label:
                cur_text.append(line)
        if cur_label and cur_text:
            paras.append({'label': cur_label, 'content': ' '.join(cur_text)})
        if len(paras) >= 4:
            return paras
            
    # Natural paragraphs
    raw = []
    curr = []
    for line in full_text.split('\n'):
        ls = line.strip()
        if not ls or ls.startswith('thread: dongan'):
            if curr:
                raw.append(' '.join(curr))
                curr = []
        else:
            curr.append(ls)
    if curr:
        raw.append(' '.join(curr))
    
    filtered = [p for p in raw if len(p) > 50 and not p.startswith('Questions') and not p.startswith('Reading Passage')]
    paras = []
    for idx, p in enumerate(filtered):
        lbl = chr(ord('A') + idx) if idx < 15 else str(idx + 1)
        paras.append({'label': lbl, 'content': p})
    return paras

# Build data for all 4 tests
cam20_data = {
    1: {
        'source': 'Cambridge 20 - Test 1',
        'p1': {
            'id': 'cambridge-20-test-1-p1',
            'title': 'The kākāpō',
            'subtitle': 'The nocturnal, flightless parrot of New Zealand that is critically endangered',
            'topic': 'Zoology & Conservation',
            'difficulty': 'Passage 1 (Cơ bản)',
            'word_count': 873,
            'paras': get_paras([6, 7, 8])
        },
        'p2': {
            'id': 'cambridge-20-test-1-p2',
            'title': 'Bring elms to Britain',
            'subtitle': 'Mark Rowe investigates attempts to reintroduce Dutch elm disease-resilient elms to Britain',
            'topic': 'Ecology & Botany',
            'difficulty': 'Passage 2 (Trung cấp)',
            'word_count': 907,
            'paras': get_paras([11, 12], labeled=True)
        },
        'p3': {
            'id': 'cambridge-20-test-1-p3',
            'title': 'How stress affects our judgement',
            'subtitle': 'Investigating whether we become better or worse at processing information under stressful conditions',
            'topic': 'Neuroscience & Psychology',
            'difficulty': 'Passage 3 (Nâng cao)',
            'word_count': 945,
            'paras': get_paras([16, 17, 18])
        }
    },
    2: {
        'source': 'Cambridge 20 - Test 2',
        'p1': {
            'id': 'cambridge-20-test-2-p1',
            'title': 'Florida Manatees: Gentle Giants of the Coastal Shallows',
            'subtitle': 'Biology, foraging habits, and conservation threats facing sirens in North America',
            'topic': 'Marine Biology & Ecology',
            'difficulty': 'Passage 1 (Cơ bản)',
            'word_count': 831,
            'paras': get_paras([28, 29])
        },
        'p2': {
            'id': 'cambridge-20-test-2-p2',
            'title': 'Procrastination: Why We Delay Tasks',
            'subtitle': 'A psychologist explains why we put off important tasks and empirical techniques to break the cycle',
            'topic': 'Behavioral Psychology',
            'difficulty': 'Passage 2 (Trung cấp)',
            'word_count': 827,
            'paras': get_paras([32, 33], labeled=True)
        },
        'p3': {
            'id': 'cambridge-20-test-2-p3',
            'title': 'Invasion of the Robot Umpires',
            'subtitle': 'Automated strike zone detection and artificial intelligence in professional sports refereeing',
            'topic': 'Sports Science & Artificial Intelligence',
            'difficulty': 'Passage 3 (Nâng cao)',
            'word_count': 957,
            'paras': get_paras([37, 38, 39])
        }
    },
    3: {
        'source': 'Cambridge 20 - Test 3',
        'p1': {
            'id': 'cambridge-20-test-3-p1',
            'title': 'The Story of Frozen Food',
            'subtitle': 'Clarence Birdseye and the refrigeration innovations that revolutionized consumer food distribution',
            'topic': 'Industrial Innovation & History',
            'difficulty': 'Passage 1 (Cơ bản)',
            'word_count': 894,
            'paras': get_paras([49, 50])
        },
        'p2': {
            'id': 'cambridge-20-test-3-p2',
            'title': 'Can the Planet’s Coral Reefs Be Saved?',
            'subtitle': 'Examining marine thermal bleaching and cutting-edge ecological interventions in tropical reef systems',
            'topic': 'Oceanography & Climate Science',
            'difficulty': 'Passage 2 (Trung cấp)',
            'word_count': 781,
            'paras': get_paras([53, 54, 55], labeled=True)
        },
        'p3': {
            'id': 'cambridge-20-test-3-p3',
            'title': 'Robots and Us: Artificial Companionship',
            'subtitle': 'Philosophical and sociological analysis of human-robot interaction and perceived agency',
            'topic': 'Robotics & Social Philosophy',
            'difficulty': 'Passage 3 (Nâng cao)',
            'word_count': 1110,
            'paras': get_paras([57, 58, 59])
        }
    },
    4: {
        'source': 'Cambridge 20 - Test 4',
        'p1': {
            'id': 'cambridge-20-test-4-p1',
            'title': 'Georgia O\'Keeffe (1887–1986)',
            'subtitle': 'The life and visionary American modernist works of one of the 20th century’s defining artists',
            'topic': 'Art History & Biography',
            'difficulty': 'Passage 1 (Cơ bản)',
            'word_count': 888,
            'paras': get_paras([67, 68, 69])
        },
        'p2': {
            'id': 'cambridge-20-test-4-p2',
            'title': 'Adapting to the Effects of Climate Change',
            'subtitle': 'Amphibious architecture, municipal flood defenses, and urban resilience initiatives across the globe',
            'topic': 'Urban Planning & Climate Adaptation',
            'difficulty': 'Passage 2 (Trung cấp)',
            'word_count': 890,
            'paras': get_paras([72, 73], labeled=True)
        },
        'p3': {
            'id': 'cambridge-20-test-4-p3',
            'title': 'A New Role for Livestock Guard Dogs',
            'subtitle': 'Deploying specialized guardian dogs to protect farming livestock and coexisting native carnivores',
            'topic': 'Agricultural Science & Wildlife Conservation',
            'difficulty': 'Passage 3 (Nâng cao)',
            'word_count': 843,
            'paras': get_paras([76, 77], labeled=True)
        }
    }
}

os.makedirs('scripts/seeders', exist_ok=True)
with open('scripts/cam20_data.json', 'w', encoding='utf-8') as f:
    json.dump(cam20_data, f, ensure_ascii=False, indent=2)

print('cam20_data.json successfully generated!')
