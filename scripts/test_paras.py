import pypdf, re, json, sys, os

sys.stdout.reconfigure(encoding='utf-8')
pdf_path = 'c:/doan_coso/online-learning-website/data/CAM 20 Reading - Listening (đẹp).pdf'
reader = pypdf.PdfReader(pdf_path)

def clean_txt(txt):
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    lines = [l for l in lines if not l.startswith('thread: dongan')]
    return '\n'.join(lines)

def extract_paras_from_pages(page_indices, labeled=False):
    full_text = '\n'.join([reader.pages[p].extract_text() or '' for p in page_indices])
    full_text = clean_txt(full_text)
    
    paras = []
    # If labeled like A., B., C.
    if labeled:
        matches = list(re.finditer(r'(?:^|\n)\s*([A-H])\.\s*(.+?)(?=(?:\n\s*[A-H]\.|\Z))', full_text, re.DOTALL))
        if matches:
            for m in matches:
                lbl = m.group(1)
                content = ' '.join(m.group(2).split())
                paras.append({'label': lbl, 'content': content})
            return paras

    # Otherwise natural paragraphs
    raw = re.split(r'\n\s*\n', full_text)
    for p in raw:
        clean = ' '.join(p.split())
        if len(clean) > 50 and not clean.startswith('Questions') and not clean.startswith('Reading Passage'):
            lbl = chr(ord('A') + len(paras)) if len(paras) < 15 else str(len(paras) + 1)
            paras.append({'label': lbl, 'content': clean})
    return paras

print('Testing extraction:')
t1p1_paras = extract_paras_from_pages([6, 7, 8])
print(f'T1P1 paras: {len(t1p1_paras)}')
t1p2_paras = extract_paras_from_pages([11, 12], labeled=True)
print(f'T1P2 paras: {len(t1p2_paras)}')
t1p3_paras = extract_paras_from_pages([16, 17, 18])
print(f'T1P3 paras: {len(t1p3_paras)}')
