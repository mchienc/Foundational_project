import pypdf, re, sys
sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader('c:/doan_coso/online-learning-website/data/CAM 20 Reading - Listening (đẹp).pdf')

def extract_paragraphs(text):
    raw_paras = re.split(r'\n\s*\n', text)
    paras = []
    for p in raw_paras:
        p_clean = ' '.join(p.strip().split())
        if len(p_clean) < 40 or 'thread: dongan.signs' in p_clean:
            continue
        m = re.match(r'^([A-H])\.\s*(.*)', p_clean)
        if m:
            label = m.group(1)
            content = m.group(2)
        else:
            label = chr(ord('A') + len(paras)) if len(paras) < 15 else str(len(paras)+1)
            content = p_clean
        paras.append({"label": label, "content": content})
    return paras

t = '\n'.join([reader.pages[p].extract_text() for p in range(6, 9)])
paras = extract_paragraphs(t)
print("Extracted", len(paras), "paragraphs for T1P1")
for p in paras[:3]:
    print(f"[{p['label']}] {p['content'][:120]}...")
