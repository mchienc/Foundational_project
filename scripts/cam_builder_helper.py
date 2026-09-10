# scripts/build_cam19_cam18.py
import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')

def build_test_seeder(book_num, test_num, passages_data):
    code = f"""// scripts/seeders/cam{book_num}_test{test_num}.js
// Cambridge IELTS {book_num} - Test {test_num}: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest() {{
  console.log('📖 Đang nạp Cambridge {book_num} - Test {test_num} (Passage 1, 2, 3)...');

  const passages = {json.dumps(passages_data['passages'], ensure_ascii=False, indent=4)};

  for (const p of passages) {{
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
  }}

  const questions = {json.dumps(passages_data['questions'], ensure_ascii=False, indent=4)};

  for (const q of questions) {{
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
  }}

  console.log('✅ Hoàn tất nạp Cambridge {book_num} - Test {test_num} (3 Passages, 40 Questions)');
}}

module.exports = seedTest;
"""
    return code

print('Helper ready!')
