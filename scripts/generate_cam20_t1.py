# scripts/generate_all_cam20_files.py
import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/cam20_data.json', 'r', encoding='utf-8') as f:
    cam20 = json.load(f)

# Questions for each test
questions_by_test = {
    1: {
        'p1': [
            {'num': 1, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'There are other parrots that share the kakapo\'s inability to fly.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'FALSE', 'ref': 'B', 'exp': 'Đoạn [B] khẳng định: "It is the world\'s only flightless parrot" (Đây là loài vẹt duy nhất trên thế giới không biết bay).'},
            {'num': 2, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'Adult kakapo produce chicks every year.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'FALSE', 'ref': 'D', 'exp': 'Đoạn [D] nêu rõ: "Kākāpō breed in summer and autumn, but only in years when food is plentiful" (Chúng sinh sản không phải hàng năm mà chỉ vào những năm thức ăn dồi dào).'},
            {'num': 3, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'Adult male kakapo bring food back to nesting females.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'FALSE', 'ref': 'D', 'exp': 'Đoạn [D] chỉ rõ: "Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks" (Con đực không tham gia ấp trứng hay nuôi con).'},
            {'num': 4, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'NOT GIVEN', 'ref': 'E', 'exp': 'Đoạn [E] đề cập cả người định cư Polynesia và chuột Polynesia đều săn bắt kākāpō nhưng không có so sánh bên nào gây nguy hiểm lớn hơn.'},
            {'num': 5, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'TRUE', 'ref': 'I', 'exp': 'Đoạn [I] xác nhận: "predation by feral cats on Rakiura Island led to a rapid decline... The decision was made to evacuate all surviving birds to predator-free offshore islands".'},
            {'num': 6, 'type': 'tfng', 'header': 'Questions 1–6', 'inst': 'Write TRUE, FALSE, or NOT GIVEN.', 'prompt': 'One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.', 'opts': ['TRUE', 'FALSE', 'NOT GIVEN'], 'ans': 'TRUE', 'ref': 'K', 'exp': 'Đoạn [K] nêu: "chicks at risk were removed from nests and hand-reared in specialized facilities to ensure maximum survival".'},
            {'num': 7, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Complete the notes below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer.', 'prompt': 'diet consists of fern fronds, various parts of a tree and [7] ……………', 'ans': 'bulbs', 'ref': 'C', 'exp': 'Đoạn [C]: "diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds".'},
            {'num': 8, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': 'nests are created [8] …………… in where eggs are laid.', 'ans': 'soil', 'ref': 'D', 'exp': 'Đoạn [D]: "The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation".'},
            {'num': 9, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': 'the [9] …………… of the kākāpō were used to make clothes.', 'ans': 'feathers', 'ref': 'E', 'exp': 'Đoạn [E]: "Māori hunters used their soft yellow-green feathers to weave prestigious cloaks".'},
            {'num': 10, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': '[10] …………… were an animal which they introduced that ate the kākāpō\'s food sources.', 'ans': 'deer', 'ref': 'F', 'exp': 'Đoạn [F]: "introduced grazing herbivores such as deer stripped the forest understorey of vegetation essential for kākāpō sustenance".'},
            {'num': 11, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': 'a definite sighting of female kākāpō on Rakiura Island was reported in the year [11] ……………', 'ans': '1980', 'ref': 'H', 'exp': 'Đoạn [H]: "Finally in 1980, researchers confirmed the first sighting of female kākāpō on Rakiura Island".'},
            {'num': 12, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': 'the Recovery Plan included an increase in [12] ……………', 'ans': 'funding', 'ref': 'J', 'exp': 'Đoạn [J]: "The 1996 Recovery Plan secured substantial state funding and private sponsorships".'},
            {'num': 13, 'type': 'summary_completion', 'header': 'Questions 7–13', 'inst': 'Choose ONE WORD AND/OR A NUMBER.', 'prompt': 'a current goal of the Recovery Plan is to maintain the involvement of [13] …………… in kākāpō protection.', 'ans': 'stakeholders', 'ref': 'L', 'exp': 'Đoạn [L]: "ensure stakeholders continue to be fully engaged in the preservation of the species".'}
        ],
        'p2': [
            {'num': 14, 'type': 'matching_info', 'header': 'Questions 14–18', 'inst': 'Reading Passage 2 has seven sections, A–G. Which section contains the following information? You may use any letter more than once.', 'prompt': 'reference to the research problems that arise from there being only a few surviving large elms', 'ans': 'C', 'ref': 'C', 'exp': 'Mục C thảo luận về việc số lượng cây trưởng thành còn sót lại quá ít gây khó khăn cho việc nghiên cứu tính kháng bệnh.'},
            {'num': 15, 'type': 'matching_info', 'header': 'Questions 14–18', 'inst': 'Which section contains the following information?', 'prompt': 'details of a difference of opinion about the value of reintroducing elms to Britain', 'ans': 'G', 'ref': 'G', 'exp': 'Mục G trình bày các luồng quan điểm trái chiều giữa các nhà bảo tồn về việc tái nhập cây du.'},
            {'num': 16, 'type': 'matching_info', 'header': 'Questions 14–18', 'inst': 'Which section contains the following information?', 'prompt': 'reference to how Dutch elm disease was brought into Britain', 'ans': 'B', 'ref': 'B', 'exp': 'Mục B giải thích mầm bệnh du nhập vào Anh thông qua các chuyến hàng nhập khẩu gỗ từ Bắc Mỹ.'},
            {'num': 17, 'type': 'matching_info', 'header': 'Questions 14–18', 'inst': 'Which section contains the following information?', 'prompt': 'a description of the conditions that have enabled a location in Britain to escape Dutch elm disease', 'ans': 'E', 'ref': 'E', 'exp': 'Mục E mô tả vị trí ven biển Brighton với điều kiện gió biển khắc nghiệt ngăn cản bọ cánh cứng mang nấm gây bệnh.'},
            {'num': 18, 'type': 'matching_info', 'header': 'Questions 14–18', 'inst': 'Which section contains the following information?', 'prompt': 'reference to the stage at which young elms become vulnerable to Dutch elm disease', 'ans': 'C', 'ref': 'C', 'exp': 'Mục C nêu rõ cây con khi đạt đường kính thân khoảng 10cm thì bắt đầu thu hút bọ mang nấm.'},
            {'num': 19, 'type': 'matching_info', 'header': 'Questions 19–23', 'inst': 'Match each statement with the correct person, A, B, or C. (A: Peter Bourne, B: Karen Russell, C: Martin Brookes)', 'prompt': 'If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.', 'ans': 'B', 'ref': 'D', 'exp': 'Bà Karen Russell nhấn mạnh triệu chứng lá vàng úa và cành chết khô xuất hiện chỉ trong vài tuần.'},
            {'num': 20, 'type': 'matching_info', 'header': 'Questions 19–23', 'inst': 'Match each statement with the correct person.', 'prompt': 'It may be better to wait and see if the mature elms that have survived continue to flourish.', 'ans': 'A', 'ref': 'E', 'exp': 'Peter Bourne đề xuất theo dõi sự phát triển tự nhiên của các cá thể du cổ thụ còn sống sót.'},
            {'num': 21, 'type': 'matching_info', 'header': 'Questions 19–23', 'inst': 'Match each statement with the correct person.', 'prompt': 'There must be an explanation for the survival of some mature elms.', 'ans': 'B', 'ref': 'D', 'exp': 'Karen Russell khẳng định việc một số cây sống sót không thể chỉ là ngẫu nhiên mà có cơ chế sinh học đằng sau.'},
            {'num': 22, 'type': 'matching_info', 'header': 'Questions 19–23', 'inst': 'Match each statement with the correct person.', 'prompt': 'We need to be aware that insects carrying Dutch elm disease are not very far away.', 'ans': 'C', 'ref': 'F', 'exp': 'Martin Brookes cảnh báo quần thể bọ cánh cứng mang bào tử nấm luôn hiện diện ở vùng đệm.'},
            {'num': 23, 'type': 'matching_info', 'header': 'Questions 19–23', 'inst': 'Match each statement with the correct person.', 'prompt': 'You understand the effect of Dutch elm disease if you saw it happen.', 'ans': 'A', 'ref': 'E', 'exp': 'Peter Bourne hồi tưởng về ký ức tuổi thơ chứng kiến cây du chết hàng loạt trên khắp làng quê nước Anh.'},
            {'num': 24, 'type': 'summary_completion', 'header': 'Questions 24–26', 'inst': 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.', 'prompt': 'For hundreds of years, the only tree that was more popular in Britain than elm was [24] ……………', 'ans': 'oak', 'ref': 'D', 'exp': 'Đoạn D: "For centuries, the elm was second in British affection and utility only to the majestic oak".'},
            {'num': 25, 'type': 'summary_completion', 'header': 'Questions 24–26', 'inst': 'Choose ONE WORD ONLY.', 'prompt': 'In the 18th century, it was grown to provide wood for boxes and [25] ……………', 'ans': 'flooring', 'ref': 'D', 'exp': 'Đoạn D: "timber merchants utilized durable elm wood for shipping containers, coffin boards and interior flooring".'},
            {'num': 26, 'type': 'summary_completion', 'header': 'Questions 24–26', 'inst': 'Choose ONE WORD ONLY.', 'prompt': 'Due to its strength, elm was often used for mining equipment and the Cutty Sark\'s [26] …………… was also constructed from elm.', 'ans': 'keel', 'ref': 'D', 'exp': 'Đoạn D: "its water-resistant properties led to its use in the underwater keel of the 19th-century clipper Cutty Sark".'}
        ],
        'p3': [
            {'num': 27, 'type': 'multiple_choice', 'header': 'Questions 27–30', 'inst': 'Choose the correct letter, A, B, C or D.', 'prompt': 'In the first paragraph, the writer introduces the topic of the text by', 'opts': ['defining some commonly used terms.', 'questioning a widely held assumption.', 'mentioning a challenge faced by everyone.', 'specifying a situation which makes us most anxious.'], 'ans': 'C', 'ref': 'A', 'exp': 'Đoạn 1 nêu: "From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions" (Mọi người đều phải đối mặt với thử thách ra quyết định dưới áp lực).'},
            {'num': 28, 'type': 'multiple_choice', 'header': 'Questions 27–30', 'inst': 'Choose the correct letter, A, B, C or D.', 'prompt': 'What point does the writer make about firefighters in the second paragraph?', 'opts': ['The regular changes of stress levels in their working lives make them ideal study subjects.', 'The strategies they use to handle stress are of particular interest to researchers.', 'Their reactions to stress vary more widely than those of other professionals.', 'They are more prone to making poor decisions under stress than average citizens.'], 'ans': 'A', 'ref': 'B', 'exp': 'Đoạn 2: Sự chuyển đổi luân phiên giữa trạng thái nhàn rỗi ở trạm và tình huống khẩn cấp nguy hiểm khiến lính cứu hỏa trở thành đối tượng hoàn hảo để nghiên cứu.'},
            {'num': 29, 'type': 'multiple_choice', 'header': 'Questions 27–30', 'inst': 'Choose the correct letter, A, B, C or D.', 'prompt': 'What did the laboratory experiment involving cortisol levels demonstrate?', 'opts': ['Elevated cortisol impairs logical deduction.', 'Cortisol increases heart rate without altering cognition.', 'Subjects became indifferent to risks.', 'Stress hormones enhanced sensitivity to warning signs.'], 'ans': 'D', 'ref': 'C', 'exp': 'Đoạn 3 chỉ ra: Khi nồng độ cortisol tăng cao, người tham gia xử lý các thông tin cảnh báo tiêu cực nhanh và chính xác hơn hẳn.'},
            {'num': 30, 'type': 'multiple_choice', 'header': 'Questions 27–30', 'inst': 'Choose the correct letter, A, B, C or D.', 'prompt': 'The writer mentions financial market crashes to illustrate that', 'opts': ['investors are inherently irrational.', 'regulations fail during crises.', 'stress-induced decisions can cascade across societies.', 'economic forecasts are unreliable.'], 'ans': 'C', 'ref': 'D', 'exp': 'Đoạn 4 minh họa rằng tâm lý hoảng loạn và phản ứng trước tin xấu có tính lây lan, dẫn đến bán tháo cổ phiếu trên diện rộng.'},
            {'num': 31, 'type': 'matching_info', 'header': 'Questions 31–35', 'inst': 'Complete each sentence with the correct ending, A–G.', 'prompt': 'At times when they were relaxed, the firefighters usually', 'ans': 'B', 'ref': 'B', 'exp': 'Khi thư giãn, lính cứu hỏa có xu hướng ít bận tâm đến các tin tức xấu (took relatively little notice of bad news).'},
            {'num': 32, 'type': 'matching_info', 'header': 'Questions 31–35', 'inst': 'Complete each sentence with the correct ending.', 'prompt': 'The researchers noted that when the firefighters were stressed, they', 'ans': 'G', 'ref': 'B', 'exp': 'Khi căng thẳng, họ đánh giá nguy cơ xảy ra sự cố tiêu cực là cao hơn nhiều (thought it more likely that they would experience something bad).'},
            {'num': 33, 'type': 'matching_info', 'header': 'Questions 31–35', 'inst': 'Complete each sentence with the correct ending.', 'prompt': 'In earlier studies, members of the public who were not under pressure', 'ans': 'F', 'ref': 'C', 'exp': 'Những người không chịu áp lực thể hiện xu hướng lạc quan thiên vị đồng nhất (behaved in a similar manner, regardless of circumstances).'},
            {'num': 34, 'type': 'matching_info', 'header': 'Questions 31–35', 'inst': 'Complete each sentence with the correct ending.', 'prompt': 'Before testing the students, the researchers deliberately', 'ans': 'E', 'ref': 'C', 'exp': 'Các nhà nghiên cứu đã cố tình đặt sinh viên vào tình huống căng thẳng trước bài kiểm tra (put them in a stressful situation).'},
            {'num': 35, 'type': 'matching_info', 'header': 'Questions 31–35', 'inst': 'Complete each sentence with the correct ending.', 'prompt': 'People are more likely to act upon warnings when they', 'ans': 'D', 'ref': 'D', 'exp': 'Con người dễ tiếp nhận và hành động trước các lời cảnh báo khi đang cảm thấy căng thẳng (were feeling under stress).'},
            {'num': 36, 'type': 'tfng', 'header': 'Questions 36–40', 'inst': 'Do the following statements agree with the claims of the writer in Reading Passage 3? Write YES, NO, or NOT GIVEN.', 'prompt': 'The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.', 'opts': ['YES', 'NO', 'NOT GIVEN'], 'ans': 'YES', 'ref': 'E', 'exp': 'Đoạn 5 xác nhận sự lây lan cảm xúc: nội dung mạng xã hội thường phản ánh đúng tâm trạng các bài đăng chúng ta đọc.'},
            {'num': 37, 'type': 'tfng', 'header': 'Questions 36–40', 'inst': 'Write YES, NO, or NOT GIVEN.', 'prompt': 'Phones have a greater impact on our stress levels than other electronic media devices.', 'opts': ['YES', 'NO', 'NOT GIVEN'], 'ans': 'NOT GIVEN', 'ref': 'E', 'exp': 'Bài đọc bàn về mạng xã hội nói chung chứ không so sánh tác động của điện thoại so với các thiết bị điện tử khác.'},
            {'num': 38, 'type': 'tfng', 'header': 'Questions 36–40', 'inst': 'Write YES, NO, or NOT GIVEN.', 'prompt': 'The more we read about a stressful public event on social media, the less able we are to take effective action.', 'opts': ['YES', 'NO', 'NOT GIVEN'], 'ans': 'NO', 'ref': 'F', 'exp': 'Tác giả chỉ ra nhận thức được thông tin cảnh báo thực tế kích hoạt phản ứng hành động phòng ngừa hiệu quả chứ không làm tê liệt khả năng hành động.'},
            {'num': 39, 'type': 'tfng', 'header': 'Questions 36–40', 'inst': 'Write YES, NO, or NOT GIVEN.', 'prompt': 'Messages that express positive feelings can motivate people to solve difficult problems.', 'opts': ['YES', 'NO', 'NOT GIVEN'], 'ans': 'YES', 'ref': 'F', 'exp': 'Đoạn cuối: "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions".'},
            {'num': 40, 'type': 'tfng', 'header': 'Questions 36–40', 'inst': 'Write YES, NO, or NOT GIVEN.', 'prompt': 'Leaders can make use of psychological research findings to improve communication with citizens.', 'opts': ['YES', 'NO', 'NOT GIVEN'], 'ans': 'YES', 'ref': 'F', 'exp': 'Tác giả kết luận việc thấu hiểu cơ chế tiếp nhận thông tin giúp xây dựng thông điệp hiệu quả và trở thành những nhân tố tạo ra sự thay đổi.'}
        ]
    }
}

print('Writing Cambridge 20 Test 1 seeder...')
def make_seeder_code(test_num, test_data, q_data):
    p1 = test_data['p1']
    p2 = test_data['p2']
    p3 = test_data['p3']
    
    code = f"""// scripts/seeders/cam20_test{test_num}.js
// Cambridge IELTS 20 - Test {test_num}: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest{test_num}() {{
  console.log('📖 Đang nạp Cambridge 20 - Test {test_num} (Passage 1, 2, 3)...');

  const passages = [
    {{
      id: '{p1['id']}',
      title: `{p1['title'].replace("'", "\\'")}`,
      subtitle: `{p1['subtitle'].replace("'", "\\'")}`,
      source: 'Cambridge 20 - Test {test_num}',
      topic: '{p1['topic']}',
      difficulty: '{p1['difficulty']}',
      estimated_minutes: 20,
      word_count: {p1['word_count']},
      paragraphs: JSON.stringify({json.dumps(p1['paras'], ensure_ascii=False)})
    }},
    {{
      id: '{p2['id']}',
      title: `{p2['title'].replace("'", "\\'")}`,
      subtitle: `{p2['subtitle'].replace("'", "\\'")}`,
      source: 'Cambridge 20 - Test {test_num}',
      topic: '{p2['topic']}',
      difficulty: '{p2['difficulty']}',
      estimated_minutes: 20,
      word_count: {p2['word_count']},
      paragraphs: JSON.stringify({json.dumps(p2['paras'], ensure_ascii=False)})
    }},
    {{
      id: '{p3['id']}',
      title: `{p3['title'].replace("'", "\\'")}`,
      subtitle: `{p3['subtitle'].replace("'", "\\'")}`,
      source: 'Cambridge 20 - Test {test_num}',
      topic: '{p3['topic']}',
      difficulty: '{p3['difficulty']}',
      estimated_minutes: 20,
      word_count: {p3['word_count']},
      paragraphs: JSON.stringify({json.dumps(p3['paras'], ensure_ascii=False)})
    }}
  ];

  for (const p of passages) {{
    await db.query(
      `INSERT INTO cambridge_reading_passages 
        (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
        title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
        topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
        word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
      [p.id, p.title, p.subtitle, p.source, p.topic, p.difficulty, p.estimated_minutes, p.word_count, p.paragraphs]
    );
  }}

  const questions = [
"""
    for pid, qlist in [('p1', q_data['p1']), ('p2', q_data['p2']), ('p3', q_data['p3'])]:
        passage_id = test_data[pid]['id']
        for q in qlist:
            opts_str = json.dumps(q.get('opts'), ensure_ascii=False) if q.get('opts') else 'null'
            prompt_clean = q['prompt'].replace("`", "\\`").replace("${", "\\${")
            exp_clean = q['exp'].replace("`", "\\`").replace("${", "\\${")
            code += f"""    {{
      id: 'c20-t{test_num}-q{q['num']}',
      passage_id: '{passage_id}',
      question_number: {q['num']},
      type: '{q['type']}',
      group_header: '{q['header']}',
      group_instruction: `{q['inst']}`,
      prompt: `{prompt_clean}`,
      options: {opts_str},
      correct_answer: '{q['ans']}',
      academic_explanation: `{exp_clean}`,
      paragraph_ref: '{q['ref']}'
    }},
"""
    code += f"""  ];

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

  console.log('✅ Hoàn tất nạp Cambridge 20 - Test {test_num} (3 Passages, 40 Questions)');
}}

module.exports = seedTest{test_num};
"""
    return code

t1_code = make_seeder_code(1, cam20['1'], questions_by_test[1])
with open('scripts/seeders/cam20_test1.js', 'w', encoding='utf-8') as f:
    f.write(t1_code)

print('cam20_test1.js generated successfully!')
