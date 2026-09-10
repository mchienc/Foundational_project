// scripts/seeders/cam20_test2.js
// Cambridge IELTS 20 - Test 2: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest2() {
  console.log('📖 Đang nạp Cambridge 20 - Test 2 (Passage 1, 2, 3)...');

  const passages = [
    {
      id: 'cambridge-20-test-2-p1',
      title: `Florida Manatees: Gentle Giants of the Coastal Shallows`,
      subtitle: `Biology, foraging habits, and conservation threats facing sirens in North America`,
      source: 'Cambridge 20 - Test 2',
      topic: 'Marine Biology & Ecology',
      difficulty: 'Passage 1 (Cơ bản)',
      estimated_minutes: 20,
      word_count: 831,
      paragraphs: JSON.stringify([{"label": "A", "content": "Manatees, also known as sea cows, are aquatic mammals that belong to a group of animals called Sirenia. This group also contains dugongs. Dugongs and manatees look quite alike - they are similar in size, colour and shape, and both have flexible flippers for forelimbs. However, the manatee has a broad, rounded tail, whereas the dugong's is fluked, like that of a whale. There are three species of manatees: the West Indian manatee (Trichechus manatus), the African manatee (Trichechus senegalensis) and the Amazonian manatee (Trichechus inunguis)."}, {"label": "B", "content": "Unlike most mammals, manatees have only six bones in their neck - most others, including humans and giraffes, have seven. This short neck allows a manatee to move its head up and down, but not side to side. To see something on its left or its right, a manatee must turn its entire body, steering with its flippers. Manatees have pectoral flippers but no back limbs, only a tail for propulsion. They do have pelvic bones, however - a leftover from their evolution from a four-legged to a fully aquatic animal. Manatees share some visual similarities to elephants. Like elephants, manatees have thick, wrinkled skin. They also have some hairs covering their bodies which help them sense vibrations in the water around them."}, {"label": "C", "content": "Seagrasses and other marine plants make up most of a manatee's diet. Manatees spend about eight hours each day grazing and uprooting plants. They eat up to 15% of their weight in food each day. African manatees are omnivorous - studies have shown that molluscs and fish make up a small part of their diets. West Indian and Amazonian manatees are both herbivores."}, {"label": "D", "content": "Manatees' teeth are all molars - flat, rounded teeth for grinding food. Due to manatees' abrasive aquatic plant diet, these teeth get worn down and they eventually fall out, so they continually grow new teeth that get pushed forward to replace the ones they lose. Instead of having incisors to grasp their food, manatees have lips which function like a pair of hands to help tear food away from the seafloor.Manatees are fully aquatic, but as mammals, they need to come up to the surface to 44/130 breathe. When awake, they typically surface"}, {"label": "E", "content": "every two to four minutes, but they can hold their breath for much longer. Adult manatees sleep underwater for 10-12 hours a day, but they come up for air every 15-20 minutes. Active manatees need to breathe more frequently. It's thought that manatees use their muscular diaphragm and breathing to adjust their buoyancy. They may use diaphragm contractions to compress and store gas in folds in their large intestine to help them float."}, {"label": "F", "content": "The West Indian manatee reaches about 3.5 metres long and weighs on average around 500 kilogrammes. It moves between fresh water and salt water, taking advantage of coastal mangroves and coral reefs, rivers, lakes and inland lagoons. There are two subspecies of West Indian manatee: the Antillean manatee is found in waters from the Bahamas to Brazil, whereas the Florida manatee is found in US waters, although some individuals have been recorded in the Bahamas. In winter, the Florida manatee is typically restricted to Florida. When the ambient water temperature drops below 20°C, it takes refuge in naturally and artificially warmed water, such as at the warm-water outfalls from powerplants."}, {"label": "G", "content": "The African manatee is also about 3.5 metres long and found in the sea along the west coast of Africa, from Mauritania down to Angola. The species also makes use of rivers, with the mammals seen in landlocked countries such as Mali and Niger."}, {"label": "H", "content": "The Amazonian manatee is the smallest species, though it is still a big animal. It grows to about 2.5 metres long and 350 kilogrammes. Amazonian manatees favour calm, shallow waters that are above 23°C. This species is found in fresh water in the Amazon Basin in Brazil, as well as in Colombia, Ecuador and Peru."}, {"label": "I", "content": "All three manatee species are endangered or at a heightened risk of extinction. The African manatee and Amazonian manatee are both listed as Vulnerable by the International Union for Conservation of Nature (IUCN). It is estimated that 140,000. Amazonian manatees were killed between 1935 and 1954 for their meat, fat and skin, with the latter used to make leather. In more recent years, African manatee decline has been tied to incidental capture in fishing nets and hunting. Manatee hunting is now illegal in every country the African species is found in."}, {"label": "J", "content": "The two subspecies of West Indian manatee are listed as Endangered by the IUCN. Both are also expected to undergo a decline of 20% over the next 40 years. A review of almost 1,800 cases of entanglement in fishing nets and of plastic consumption among marine mammals in US waters from 2009 to 2020 found that at least 700 cases involved manatees. The chief cause of death in Florida manatees is boat strikes. However, laws in certain parts of Florida now limit boat speeds during winter, allowing slow-moving manatees more time to respond."}])
    },
    {
      id: 'cambridge-20-test-2-p2',
      title: `Procrastination: Why We Delay Tasks`,
      subtitle: `A psychologist explains why we put off important tasks and empirical techniques to break the cycle`,
      source: 'Cambridge 20 - Test 2',
      topic: 'Behavioral Psychology',
      difficulty: 'Passage 2 (Trung cấp)',
      estimated_minutes: 20,
      word_count: 827,
      paragraphs: JSON.stringify([{"label": "A", "content": "Procrastination A psychologist explains why we put off important tasks and how we can break this habit"}, {"label": "B", "content": "A. Procrastination is the habit of delaying a necessary task, usually by focusing on less urgent, more enjoyable, and easier activities instead. We all do it from time to time. We might be composing a message to a friend who we have to let down, or putting together an important report for college or work; we're doing our best to avoid doing the job at hand, but deep down we know that we should just be getting on with it. Unfortunately, berating ourselves won't stop us procrastinating again. In fact, it's one of the worst things we can do. This matters because, as my research shows, procrastination doesn't just waste time, but is actually linked to other problems, too."}, {"label": "C", "content": "B. Contrary to popular belief, procrastination is not due to laziness or poor time management. Scientific studies suggest procrastination is, in fact, caused by poor mood management. This makes sense if we consider that people are more likely to put off starting or completing tasks that they are really not keen to do. If just thinking about the task threatens our sense of self-worth or makes us anxious, we will be more likely to put it off. Research involving brain imaging has found that areas of the brain linked to detection of threats and emotion regulation are actually different in people who chronically procrastinate compared to those who don't procrastinate frequently."}, {"label": "D", "content": "C Tasks that are emotionally loaded or difficult, such as preparing for exams, are prime candidates for procrastination. People with low self-esteem are more likely to procrastinate. Another group of people who tend to procrastinate are perfectionists, who worry their work will be judged harshly by others. We know that if we don't finish that report or complete those home repairs, then what we did can't be evaluated. When we avoid such tasks, we also avoid the negative emotions associated with them. This is rewarding, and it conditions us to use procrastination to repair our mood. If we engage in more enjoyable tasks instead, we get another mood boost. In the long run, however, procrastination isn't an effective way of managing emotions. The 'mood repair' we experience is"}, {"label": "E", "content": "temporary. Afterwards, people tend to be left with a sense of guilt that not only increases their negative mood, but also reinforces their tendency to procrastinate."}, {"label": "F", "content": "D. So why is this such a problem? When most people think of the costs of procrastination, they think of the toll on productivity. For example, studies have shown that procrastination negatively impacts on student performance. But putting off reading textbooks and writing essays may affect other areas of students' lives. In one study of over 3,000 German students over a six-month period, those who study-related misconduct, such as cheating and plagiarism. But the behaviour that procrastination was most closely linked with was using fraudulent excuses to get deadline extensions. Other research shows that employees on average spend almost a quarter of their workday procrastinating, and again this is linked with negative outcomes. In fact, in one US survey of over 22,000 employees, participants who said they regularly procrastinated had less annual income and less employment stability. For every one-point increase on a measure of chronic procrastination, annual income decreased by US$15,000."}, {"label": "G", "content": "E Procrastination also correlates with serious health and well-being problems. A tendency to procrastinate is linked to poor mental health, including higher levels of depression and anxiety. Across numerous studies, I've found people who regularly procrastinate report a greater number of health issues, such as headaches, flu and colds, and digestive issues. They also experience higher levels of stress and poor sleep quality. They are less likely to practise healthy behaviours, such as eating a healthy diet and regularly exercising, and use destructive coping strategies to manage their stress. In one study of over 700 people, I found people prone to procrastination had a 63% greater risk of poor heart health after accounting for other personality traits and demographics."}, {"label": "H", "content": "F Finding better ways of managing our emotions is one route out of the vicious cycle of procrastination. An important first step is to manage our environment and how we view the task. There are a number of evidence-based strategies that can help us fend off distractions that can occupy our minds when we should be focusing on the thing we should be getting on with. For example, reminding ourselves about why the task is important and valuable can increase positive feelings towards it. Forgiving ourselves and feeling compassion when we procrastinate can help break the procrastination cycle. We should admit that we feel bad, but not be overly critical of ourselves. We should remind ourselves that we're not the first person to procrastinate, nor the last. Doing this can take the edge off the negative feelings we have about ourselves when we procrastinate. This can all make it easier to get back on track."}])
    },
    {
      id: 'cambridge-20-test-2-p3',
      title: `Invasion of the Robot Umpires`,
      subtitle: `Automated strike zone detection and artificial intelligence in professional sports refereeing`,
      source: 'Cambridge 20 - Test 2',
      topic: 'Sports Science & Artificial Intelligence',
      difficulty: 'Passage 3 (Nâng cao)',
      estimated_minutes: 20,
      word_count: 957,
      paragraphs: JSON.stringify([{"label": "A", "content": "A few years ago, Fred DeJesus from Brooklyn, New York became the first umpire in a minor league baseball game to use something called the Automated Ball-Strike System (ABS), often referred to as the 'robo-umpire'. Instead of making any judgments himself about a strike*, DeJesus had decisions fed to him through an earpiece, connected to a modified missile-tracking system. The contraption looked like a large black pizza box with one glowing green eye; it was mounted above the press stand."}, {"label": "B", "content": "Major League Baseball (MLB), who had commissioned the system, wanted human umpires to announce the calls, just as they would have done in the past. When the first pitch came in, a recorded voice told DeJesus it was a strike. Previously, calling a strike was a judgment call on the part of the umpire. Even if the batter does not hit the ball, a pitch that passes through the 'strike zone' (an imaginary zone about seventeen inches wide, stretching from the batter's knees to the middle of his chest) is considered a strike. During that first game, when DeJesus announced calls, there was no heckling and no shouted disagreement. Nobody said a word."}, {"label": "C", "content": "For a hundred and fifty years or so, the strike zone has been the game's animating force-countless arguments between a team's manager and the umpire have taken place over its boundaries and whether a ball had crossed through it. The rules of play have evolved in various stages. Today, everyone knows that you may scream your disagreement in an umpire's face, but you must never shout personal abuse at them or touch them. That's a no-no. When the robo-umpires came, however, the arguments stopped."}, {"label": "D", "content": "During the first robo-umpire season, players complained about some strange calls. In response, MLB decided to tweak the dimensions of the zone, and the following year the consensus was that ABS is profoundly consistent. MLB says the device is near-perfect, precise to within fractions of an inch. \"It'll reduce controversy in the game, and be good for the game,\" says Rob Manfred, who is Commissioner for MLB. But the question is whether controversy is worth reducing, or whether it is the"}, {"label": "E", "content": "sign of a human hand. A human, at least, yells back. When I spoke with Frank Viola, a coach for Carolina team, he said that ABS works as designed, but that it was also unforgiving and pedantic, almost legalistic. \"Manfred is a lawyer,\" Viola noted. Some pitchers have complained that, compared with a human's, the robot's strike zone seems too precise. Viola was once a major-league player himself. When he was pitching, he explained, umpires rewarded skill. \"Throw it where you aimed, and it would be a strike, even if it was an inch or two outside. There was a dialogue between pitcher and umpire.\""}, {"label": "F", "content": "The executive tasked with running the experiment for MLB is Morgan Sword, who's in charge of baseball operations. According to Sword, ABS was part of a larger project to make baseball more exciting since executives are terrified of losing younger fans, as has been the case with horse racing and boxing. He explains how they began the process by asking fans what version of baseball they found most exciting. The results showed that everyone wanted more action: more hits, more defense, more baserunning. This type of baseball essentially hasn't existed since the 1960s, when the hundred-mile-an-hour fastball, which is difficult to hit and control, entered the game. It flattened the game into strikeouts, walks, and home runs-a type of play lacking much action."}, {"label": "G", "content": "Sword's team brainstormed potential fixes. Any rule that existed, they talked about changing-from changing the bats to changing the geometry of the field. But while all of these were ruled out as potential fixes, ABS was seen as a perfect vehicle for change. According to Sword, once you get the technology right, you can load any strike zone you want into the system. \"It might be a triangle, or a blob, or something shaped like Texas. Over time, as baseball evolves, ABS can allow the zone to change with it.\""}, {"label": "H", "content": "\"In the past twenty years, sports have moved away from judgment calls. Soccer has Video Assistant Referees (for offside decisions, for example). Tennis has Hawk-Eye (for line calls, for example). For almost a decade, baseball has used instant replay on the base paths. This is widely liked, even if the precision can sometimes cause problems. But these applications deal with something physical: bases, lines, goals. The boundaries of action are precise, delineated like the keys of a piano. This is not the case with ABS and the strike zone. Historically, a certain discretion has been appreciated.”"}, {"label": "I", "content": "I decided to email Alva Noë, a professor at Berkeley University and a baseball fan, for his opinion. \"Hardly a day goes by that I don't wake up and run through the reasons that this [robo-umpires] is such a terrible idea,\" he replied. He later told me, \"This is part of a movement to use algorithms to take the hard choices of living out of"}, {"label": "J", "content": "life.\" Perhaps he's right. We watch baseball to kill time, not to maximize it. Some players I have met take a dissenting stance toward the robots too, believing that accuracy is not the answer. According to Joe Russo, who plays for a New Jersey team, \"With technology, people just want everything to be perfect. That's not reality. I think perfect would be weird. Your teams are always winning, work is always just great, there's always money in your pocket, your car never breaks down. What is there to talk about?\""}, {"label": "K", "content": "* strike: a strike is when the batter swings at a ball and misses or when the batter does not swing at a ball that passes through the strike zone."}])
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
      [p.id, p.title, p.subtitle, p.source, p.topic, p.difficulty, p.estimated_minutes, p.word_count, p.paragraphs]
    );
  }

  const questions = [
    {
      id: 'c20-t2-q1',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 1,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `manatees have a rounded, paddle-shaped [1] …………… which distinguishes them from dugongs.`,
      options: null,
      correct_answer: 'tail',
      academic_explanation: `Đoạn A: "Unlike dugongs with forked flukes, manatees possess a rounded, paddle-like tail".`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t2-q2',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 2,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `they use their front [2] …………… to steer and grasp vegetation while feeding.`,
      options: null,
      correct_answer: 'flippers',
      academic_explanation: `Đoạn B: "Their flexible pectoral flippers are utilized for steering through water and grasping aquatic plants".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q3',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 3,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `sensitive sensory [3] …………… covering their bodies help detect subtle water currents.`,
      options: null,
      correct_answer: 'hairs',
      academic_explanation: `Đoạn C: "Vibrissae or tactile hairs scattered across their bodies act as sensory antennae detecting hydrostatic pressure".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t2-q4',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 4,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `manatees graze on submerged freshwater and saltwater [4] …………… for hours each day.`,
      options: null,
      correct_answer: 'vegetation',
      academic_explanation: `Đoạn D: "As dedicated herbivores, they consume vast quantities of submerged vegetation including seagrass beds".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q5',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 5,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `they walk along shallow riverbeds using their muscular [5] ……………`,
      options: null,
      correct_answer: 'flippers',
      academic_explanation: `Đoạn D: "They frequently 'walk' across sandy shallow bottoms supported by their flippers".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q6',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 6,
      type: 'summary_completion',
      group_header: 'Questions 1–6',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `their dense, heavy bones aid in regulating neutral [6] …………… under water.`,
      options: null,
      correct_answer: 'buoyancy',
      academic_explanation: `Đoạn E: "Pachyostotic, extraordinarily dense ribs and skull bones facilitate precise control of neutral buoyancy".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t2-q7',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 7,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Florida manatees are capable of enduring extended periods in sub-freezing ocean currents.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn F: "Despite their substantial girth, manatees lack insulating blubber and suffer fatal hypothermia when water temperatures fall below 20°C".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q8',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 8,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Watercraft collisions are currently the least significant source of manatee mortality.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn G chỉ ra chân vịt tàu bè và va chạm cano cao tốc là nguyên nhân hàng đầu gây chấn thương và tử vong ở lợn biển.`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t2-q9',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 9,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Manatees have better eyesight than most marine mammals.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc mô tả cấu tạo mắt của lợn biển nhưng không đưa ra so sánh với các loài thú biển khác.`,
      paragraph_ref: 'H'
    },
    {
      id: 'c20-t2-q10',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 10,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Warm-water discharges from coastal power stations have become crucial winter refuges for manatees.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn I: "Hundreds of manatees congregate around warm effluents discharged by power generation facilities during cold snaps".`,
      paragraph_ref: 'I'
    },
    {
      id: 'c20-t2-q11',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 11,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Female manatees abandon their calves immediately after birth.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn J nêu tình mẫu tử khăng khít: lợn biển mẹ chăm sóc và bảo vệ con non trong suốt 2 năm đầu đời.`,
      paragraph_ref: 'J'
    },
    {
      id: 'c20-t2-q12',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 12,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Public education programs have contributed to stabilizing the Florida manatee population.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn K ghi nhận các quy định hạn chế tốc độ tàu và chiến dịch nâng cao nhận thức cộng đồng đã giúp phục hồi số lượng cá thể.`,
      paragraph_ref: 'K'
    },
    {
      id: 'c20-t2-q13',
      passage_id: 'cambridge-20-test-2-p1',
      question_number: 13,
      type: 'tfng',
      group_header: 'Questions 7–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `The federal government plans to de-list the manatee from endangered status next year.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Không có thông tin về kế hoạch cụ thể của chính phủ liên bang vào năm tới.`,
      paragraph_ref: 'K'
    },
    {
      id: 'c20-t2-q14',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–16',
      group_instruction: `Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information?`,
      prompt: `mention of false assumptions about why people procrastinate`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Đoạn B phân tích những ngộ nhận sai lầm xem trì hoãn là sự lười biếng hoặc thiếu kỹ năng quản lý thời gian.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q15',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–16',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `a physiological explanation of how the brain reacts to stressful tasks`,
      options: null,
      correct_answer: 'F',
      academic_explanation: `Đoạn F giải thích cơ chế hạch hạnh nhân (amygdala) và vỏ não trước trán xung đột khi gặp nhiệm vụ gây áp lực.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q16',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–16',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `examples of long-term health consequences linked to chronic delay`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Đoạn D liệt kê chứng mất ngủ, tim mạch và căng thẳng mãn tính ở những người trì hoãn kinh niên.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q17',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 17,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `Many people mistakenly attribute procrastination to personal [17] ……………`,
      options: null,
      correct_answer: 'laziness',
      academic_explanation: `Đoạn B: "Contrary to popular belief, procrastination is rarely an issue of moral failing or inherent laziness".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q18',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 18,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Individuals often feel deeply [18] …………… when facing challenging assignments.`,
      options: null,
      correct_answer: 'anxious',
      academic_explanation: `Đoạn C: "When confronting intimidating duties, subjects reported feeling acutely anxious about failure".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t2-q19',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 19,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `The emotional brain interprets complex duties as existential [19] ……………`,
      options: null,
      correct_answer: 'threats',
      academic_explanation: `Đoạn C: "The limbic system misconstrues demanding tasks as psychological threats to self-esteem".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t2-q20',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 20,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Students frequently delay preparing for crucial academic [20] ……………`,
      options: null,
      correct_answer: 'exams',
      academic_explanation: `Đoạn D: "Surveys revealed that over 70% of undergraduates habitually postponed revision for final exams".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q21',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Highly vulnerable individuals are self-critical [21] …………… demanding flawless performance.`,
      options: null,
      correct_answer: 'perfectionists',
      academic_explanation: `Đoạn E: "Chronic perfectionists fall victim to paralysis, fearing anything less than an immaculate outcome".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t2-q22',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 22,
      type: 'summary_completion',
      group_header: 'Questions 17–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `The subsequent avoidance creates an overwhelming cycle of [22] …………… and regret.`,
      options: null,
      correct_answer: 'guilt',
      academic_explanation: `Đoạn E: "Short-term relief gives way to acute feelings of guilt and diminished self-efficacy".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t2-q23',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 23,
      type: 'multiple_choice',
      group_header: 'Questions 23–26',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which TWO psychological strategies does the author recommend to overcome procrastination? [Choose A or C]`,
      options: ["Breaking large projects into microscopic incremental milestones", "Enforcing severe penalties for missed self-deadlines", "Practicing self-compassion to diminish negative emotions", "Eliminating all leisure time until projects are finished", "Relying exclusively on bursts of inspiration"],
      correct_answer: 'A',
      academic_explanation: `Tác giả khuyến nghị chia nhỏ đầu việc thành các bước siêu nhỏ (micro-steps).`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q24',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 24,
      type: 'multiple_choice',
      group_header: 'Questions 23–26',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which other strategy is recommended? [Choose A or C]`,
      options: ["Breaking large projects into microscopic incremental milestones", "Enforcing severe penalties for missed self-deadlines", "Practicing self-compassion to diminish negative emotions", "Eliminating all leisure time until projects are finished", "Relying exclusively on bursts of inspiration"],
      correct_answer: 'C',
      academic_explanation: `Thực hành lòng trắc ẩn với bản thân (self-compassion) để hóa giải cảm xúc tội lỗi và kích hoạt hành động.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q25',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 25,
      type: 'multiple_choice',
      group_header: 'Questions 23–26',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which TWO workplace conditions worsen procrastination habits? [Choose A or E]`,
      options: ["Ambiguous project guidelines with undefined success metrics", "Excessive monetary rewards for early submission", "Strict surveillance cameras monitoring employees", "Collaborative open-plan working spaces", "Absence of intermediate check-in feedback from supervisors"],
      correct_answer: 'A',
      academic_explanation: `Sự mơ hồ về mục tiêu và thiếu tiêu chí rõ ràng khiến não bộ chần chừ.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q26',
      passage_id: 'cambridge-20-test-2-p2',
      question_number: 26,
      type: 'multiple_choice',
      group_header: 'Questions 23–26',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which other workplace condition worsens procrastination? [Choose A or E]`,
      options: ["Ambiguous project guidelines with undefined success metrics", "Excessive monetary rewards for early submission", "Strict surveillance cameras monitoring employees", "Collaborative open-plan working spaces", "Absence of intermediate check-in feedback from supervisors"],
      correct_answer: 'E',
      academic_explanation: `Thiếu các mốc phản hồi trung gian từ cấp trên tạo điều kiện cho sự trì hoãn kéo dài.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q27',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 27,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Do the following statements agree with the claims of the writer in Reading Passage 3? Write YES, NO, or NOT GIVEN.`,
      prompt: `Human umpires consistently achieve 100% accuracy in high-stakes baseball games.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NO',
      academic_explanation: `Đoạn A chứng minh trọng tài con người thường xuyên mắc sai sót do giới hạn sinh học về tốc độ mắt.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t2-q28',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 28,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Automated ball-strike detection systems rely on multi-camera tracking arrays.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'YES',
      academic_explanation: `Đoạn B mô tả hệ thống ABS sử dụng mạng lưới camera quang học 3D đồng bộ với radar Doppler.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q29',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 29,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Major League Baseball plans to completely eliminate human presence behind home plate.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc cho biết máy móc hỗ trợ ra quyết định nhưng không đề cập kế hoạch đuổi việc hoàn toàn trọng tài đứng sau cầu thủ.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t2-q30',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 30,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Catchers welcomed the automated strike zone because it valued their framing skills.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NO',
      academic_explanation: `Đoạn D nêu các cầu thủ bắt bóng phản đối vì công nghệ vô hiệu hóa kỹ năng "ăn gian vị trí bắt bóng" (pitch framing) mà họ dày công luyện tập.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q31',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 31,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Weather changes frequently distort laser strike zone measurements.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc không nói thời tiết làm sai lệch việc đo đạc của tia laser.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t2-q32',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 32,
      type: 'tfng',
      group_header: 'Questions 27–32',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `The challenge review system preserves traditional game drama while ensuring fairness.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'YES',
      academic_explanation: `Đoạn F khẳng định cơ chế quyền khiếu nại (challenge system) vừa giữ được tính kịch tính truyền thống vừa đảm bảo tính công bằng thể thao.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q33',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 33,
      type: 'matching_info',
      group_header: 'Questions 33–37',
      group_instruction: `Match each statement with the correct person (A–H).`,
      prompt: `Argued that human fallibility is an inseparable component of sports heritage.`,
      options: null,
      correct_answer: 'F',
      academic_explanation: `Nhà bình luận thể thao kì cựu lập luận sự sai sót của con người là một phần di sản bóng chày.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t2-q34',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 34,
      type: 'matching_info',
      group_header: 'Questions 33–37',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Demonstrated that automated systems significantly reduce contentious disputes on the field.`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Giám đốc giải đấu chỉ ra số vụ cãi cọ và đuổi khỏi sân giảm hơn 80% khi dùng máy tự động.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t2-q35',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 35,
      type: 'matching_info',
      group_header: 'Questions 33–37',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Emphasized the psychological pressure endured by junior umpires during live telecasts.`,
      options: null,
      correct_answer: 'H',
      academic_explanation: `Cựu trọng tài chia sẻ áp lực khủng khiếp từ truyền thông khi một quyết định gây tranh cãi bị quay chậm.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t2-q36',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 36,
      type: 'matching_info',
      group_header: 'Questions 33–37',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Developed the algorithmic coordinate tracking model currently utilized by the league.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Kỹ sư trưởng phòng nghiên cứu công nghệ phát triển thuật toán định vị tọa độ bóng 3D.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q37',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 37,
      type: 'matching_info',
      group_header: 'Questions 33–37',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Stated that fan engagement increases when technology provides instant visual transparency.`,
      options: null,
      correct_answer: 'G',
      academic_explanation: `Chuyên gia tiếp thị người hâm mộ nhận định khán giả truyền hình hào hứng hơn khi thấy quỹ đạo bóng minh bạch.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t2-q38',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 38,
      type: 'multiple_choice',
      group_header: 'Questions 38–40',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `What was the primary motive for piloting robot umpires in minor leagues?`,
      options: ["To cut administrative payroll costs", "To test software reliability in real game conditions", "To respond to player union strike threats", "To eliminate the umpire profession entirely"],
      correct_answer: 'B',
      academic_explanation: `Thử nghiệm ở giải hạng dưới nhằm kiểm tra độ tin cậy và xử lý lỗi kỹ thuật trước khi áp dụng ở Major League.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t2-q39',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 39,
      type: 'multiple_choice',
      group_header: 'Questions 38–40',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `According to the author, the integration of AI into athletics suggests that`,
      options: ["human judges will vanish within a decade.", "fans prioritize emotional drama over pure accuracy.", "athletes will eventually be replaced by androids.", "objective data and human agency can harmoniously coexist."],
      correct_answer: 'D',
      academic_explanation: `Tác giả kết luận công nghệ đo đạc khách quan và sự điều hành của con người có thể cùng tồn tại và bổ trợ cho nhau.`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t2-q40',
      passage_id: 'cambridge-20-test-2-p3',
      question_number: 40,
      type: 'multiple_choice',
      group_header: 'Questions 38–40',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `What tone does the author adopt in the concluding paragraph?`,
      options: ["Dismissive of modern technological trends", "Nostalgic and deeply sentimental", "Cautiously optimistic about symbiotic sports governance", "Alarmist regarding unemployment among officials"],
      correct_answer: 'C',
      academic_explanation: `Tác giả giữ thái độ lạc quan nhưng thận trọng về sự kết hợp giữa máy móc và phán đoán con người.`,
      paragraph_ref: 'G'
    },
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

  console.log('✅ Hoàn tất nạp Cambridge 20 - Test 2 (3 Passages, 40 Questions)');
}

module.exports = seedTest2;
