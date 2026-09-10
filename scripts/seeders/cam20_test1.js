// scripts/seeders/cam20_test1.js
// Cambridge IELTS 20 - Test 1: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest1() {
  console.log('📖 Đang nạp Cambridge 20 - Test 1 (Passage 1, 2, 3)...');

  const passages = [
    {
      id: 'cambridge-20-test-1-p1',
      title: `The kākāpō`,
      subtitle: `The nocturnal, flightless parrot of New Zealand that is critically endangered`,
      source: 'Cambridge 20 - Test 1',
      topic: 'Zoology & Conservation',
      difficulty: 'Passage 1 (Cơ bản)',
      estimated_minutes: 20,
      word_count: 873,
      paragraphs: JSON.stringify([{"label": "A", "content": "The kākāpō The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand's unique treasures."}, {"label": "B", "content": "The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face. Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail. It is the world's only flightless parrot, and is also possibly one of the world's longest-living birds, with a reported lifespan of up to 100 years."}, {"label": "C", "content": "Kākāpō are solitary birds and tend to occupy the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground. They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds."}, {"label": "D", "content": "Kākāpő breed in summer and autumn, but only in years when food is plentiful. Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks. The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation. The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators."}, {"label": "E", "content": "Before humans arrived, käkāpō were common throughout New Zealand's forests. However, this all changed with the arrival of the first Polynesian settlers about 700 years ago. For the early settlers, the flightless kākāpō was easy prey. They ate its meat and used its feathers to make soft cloaks. With them came the Polynesian dog and rat, which also preyed on käkäpö. By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island. The fall in käkäpö numbers was accelerated by European colonisation. A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food. Other"}, {"label": "F", "content": "predators such as cats, stoats and two more species of rat were also introduced. The käkäpo were in serious trouble."}, {"label": "G", "content": "In 1894, the New Zealand government launched its first attempt to save the kākāpō. Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator- free Resolution Island in Fiordland. Unfortunately, the island didn't remain predator free - stoats arrived within six years, eventually destroying the kākāpō population. By the mid-1900s, the kākāpō was practically a lost species. Only a few clung to life in the most isolated parts of New Zealand."}, {"label": "H", "content": "From 1949 to 1973, the newly formed New Zealand Wildlife Service made over 60 expeditions to find kākāpō, focusing mainly on Fiordland. Six were caught, but there were no females amongst them and all but one died within a few months of captivity. In 1974, a new initiative was launched, and by 1977, 18 more kākāpō were found in Fiordland. However, there were still no females. In 1977, a large population of males was spotted in Rakiura - a large island free from stoats, ferrets and weasels. There were about 200 individuals, and in 1980 it was confirmed females were also present. These birds have been the foundation of all subsequent work in managing the species."}, {"label": "I", "content": "Unfortunately, predation by feral cats on Rakiura Island led to a rapid decline in kākāpō numbers. As a result, during 1980-97, the surviving population was evacuated to three island sanctuaries: Codfish Island, Maud Island and Little Barrier Island. However, breeding success was hard to achieve. Rats were found to be a major predator of kakapo chicks and an insufficient number of chicks survived to offset adult mortality. By 1995, although at least 12 chicks had been produced on the islands, only three had survived. The kākāpō population had dropped to 51 birds. The critical situation prompted an urgent review of kākāpō management in New Zealand."}, {"label": "J", "content": "In 1996, a new Recovery Plan was launched, together with a specialist advisory group called the Kākāpō Scientific and Technical Advisory Committee and a higher amount of funding. Renewed steps were taken to control predators on the three islands. Cats were eradicated from Little Barrier Island in 1980, and possums were eradicated from Codfish Island by 1986. However, the population did not start to increase until rats were removed from all three islands, and the birds were more intensively managed. This involved moving the birds between islands, supplementary feeding of adults and rescuing and hand-raising any failing chicks."}, {"label": "K", "content": "After the first five years of the Recovery Plan, the population was on target. By 2000, five new females had been produced, and the total population had grown to 62 birds. For the first time, there was cautious optimism for the future of käkäpö and by June 2020, a total of 210 birds was recorded."}, {"label": "L", "content": "Today, kākāpō management continues to be guided by the kākāpō Recovery Plan. Its key goals are: minimise the loss of genetic diversity in the käkäpő population, restore or maintain sufficient habitat to accommodate the expected increase in the käkäpö population, and ensure stakeholders continue to be fully engaged in the preservation of the species."}])
    },
    {
      id: 'cambridge-20-test-1-p2',
      title: `Bring elms to Britain`,
      subtitle: `Mark Rowe investigates attempts to reintroduce Dutch elm disease-resilient elms to Britain`,
      source: 'Cambridge 20 - Test 1',
      topic: 'Ecology & Botany',
      difficulty: 'Passage 2 (Trung cấp)',
      estimated_minutes: 20,
      word_count: 907,
      paragraphs: JSON.stringify([{"label": "A", "content": "Around 25 million elms, accounting for 90% of all elm trees in the UK, died during the    1960s and '70s of Dutch elm disease. In the aftermath, the elm, once so dominant in the British landscape, was largely forgotten. However, there's now hope the elm may be reintroduced to the countryside of central and southern England. Any reintroduction will start from a very low base. 'The impact of the disease is difficult to picture if you hadn't seen what was there before,' says Matt Elliot of the Woodland Trust. 'You look at old photographs from the 1960s and it's only then that you realise the impact [elms had] ... They were significant, large trees... then they were gone.'"}, {"label": "B", "content": "The disease is caused by a fungus that blocks the elms' vascular (water, nutrient and food transport) system, causing branches to wilt and die. A first epidemic, which occurred in the 1920s, gradually died down, but in the '70s a second epidemic was triggered by shipments of elm from Canada. The wood came in the form of logs destined for boat building and its intact bark was perfect for the elm bark beetles that spread the deadly fungus. This time, the beetles carried a much more virulent strain that destroyed the vast majority of British elms."}, {"label": "C", "content": "Today, elms still exist in the southern English countryside but mostly only in low hedgerows between fields. 'We have millions of small elms in hedgerows but they get targeted by the beetle as soon as they reach a certain size,' says Karen Russell, co-author of the report 'Where we are with elm'. Once the trunk of the elm reaches 10-15 centimetres or so in diameter, it becomes a perfect size for beetles to lay eggs and for the fungus to take hold. Yet mature specimens have been identified, in counties such as Cambridgeshire, that are hundreds of years old, and have mysteriously escaped the epidemic. The key, Russell says, is to identify and study those trees that have survived and work out why they stood tall when millions of others succumbed. Nevertheless, opportunities are limited as the number of these mature survivors is relatively small. 'What are the reasons for their survival?' asks Russell. 'Avoidance, tolerance, resistance? We don't know where the balance lies between the three. I don't see how it can be entirely down to luck.'"}, {"label": "D", "content": "For centuries, elm ran a close second to oak as the hardwood tree of choice in Britain and was in many instances the most prominent tree in the landscape. Not only was elm common in European forests, it became a key component of birch, ash and hazel woodlands. The use of elm is thought to go back to the Bronze Age, when it was widely used for tools. Elm was also the preferred material for shields and early swords. In the 18th century, it was planted more widely and its wood was used for items such as storage crates and flooring. It was also suitable for items that experienced high levels of impact and was used to build the keel of the 19th-century sailing ship Cutty Sark as well as mining equipment."}, {"label": "E", "content": "Given how ingrained elm is in British culture, it's unsurprising the tree has many advocates. Amongst them is Peter Bourne of the National Elm Collection in Brighton. 'I saw Dutch elm disease unfold as a small boy,' he says. 'The elm seemed to be part of rural England, but I remember watching trees just lose their leaves and that really stayed with me.' Today, the city of Brighton's elms total about 17,000. Local factors appear to have contributed to their survival. Strong winds from the sea make it difficult for the determined elm bark beetle to attack this coastal city's elm population. However, the situation is precarious. 'The beetles can just march in if we're not careful, as the threat is right on our doorstep,' says Bourne."}, {"label": "F", "content": "Any prospect of the elm returning relies heavily on trees being either resistant to, or tolerant of, the disease. This means a widespread reintroduction would involve existing or new hybrid strains derived from resistant, generally non-native elm species. A new generation of seedlings have been bred and tested to see if they can withstand the fungus by cutting a small slit on the bark and injecting a tiny amount of the pathogen. 'The effects are very quick,' says Russell. 'You return in four to six weeks and trees that are resistant show no symptoms, whereas those that are susceptible show leaf loss and may even have died completely.'"}, {"label": "G", "content": "All of this raises questions of social acceptance, acknowledges Russell. 'If we're putting elm back into the landscape, a small element of it is not native are we bothered about that?' For her, the environmental case for reintroducing elm is strong. 'They will host wildlife, which is a good thing.' Others are more wary. 'On the face of it, it seems like a good idea,' says Elliot. The problem, he suggests, is that, 'You're replacing a native species with a horticultural analogue*. You're effectively cloning.' There's also the risk of introducing new diseases. Rather than plant new elms, the Woodland Trust emphasises providing space to those elms that have survived independently. 'Sometimes the best thing you can do is just give nature time to recover over time, you might get resistance,' says Elliot. * horticultural analogue: a cultivated plant species that is genetically similar to an existing species"}])
    },
    {
      id: 'cambridge-20-test-1-p3',
      title: `How stress affects our judgement`,
      subtitle: `Investigating whether we become better or worse at processing information under stressful conditions`,
      source: 'Cambridge 20 - Test 1',
      topic: 'Neuroscience & Psychology',
      difficulty: 'Passage 3 (Nâng cao)',
      estimated_minutes: 20,
      word_count: 945,
      paragraphs: JSON.stringify([{"label": "A", "content": "Some of the most important decisions of our lives occur while we're feeling stressed and anxious. From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions. But do we become better or worse at processing and using information under such circumstances?"}, {"label": "B", "content": "My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations. Firefighters' workdays vary quite a bit. Some are pretty relaxed; they'll spend their time washing the truck, cleaning equipment, cooking meals and reading. Other days can be hectic, with numerous life-threatening incidents to attend to; they'll enter burning homes to rescue trapped residents, and assist with medical emergencies. These ups and downs presented the perfect setting for an experiment on how people's ability to use information changes when they feel under pressure."}, {"label": "C", "content": "We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters - but only as long as it conveyed bad news."}, {"label": "D", "content": "This is how we arrived at these results. We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud. We then gave them either good news (that their likelihood of experiencing these events was lower than they'd thought) or bad news (that it was higher) and asked them to provide new estimates."}, {"label": "E", "content": "People are normally quite optimistic - they will ignore bad news and embrace the good. This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged. Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they'd thought), and altered their beliefs in response. In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought). Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online. Sure"}, {"label": "F", "content": "enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence."}, {"label": "G", "content": "When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong. Brain imaging reveals that this 'switch' is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear."}, {"label": "H", "content": "Such neural engineering could have helped prehistoric humans to survive. When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards. In a safe environment, however, it would have been wasteful to be on high alert constantly. So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful. In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them."}, {"label": "I", "content": "It is also important to realise that stress travels rapidly from one person to the next. If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves. We don't even need to be in the same room with someone for their emotions to influence our behaviour. Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves. If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts."}, {"label": "J", "content": "In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media. Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post. Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities."}, {"label": "K", "content": "The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified. After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of. But that has the effect of exaggerating existing danger. And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which"}, {"label": "L", "content": "increases stress further. As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do."}, {"label": "M", "content": "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions. Being aware of the information can help us frame our messages more effectively and become conscientious agents of change."}])
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
      id: 'c20-t1-q1',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 1,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `There are other parrots that share the kakapo's inability to fly.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn [B] khẳng định: "It is the world's only flightless parrot" (Đây là loài vẹt duy nhất trên thế giới không biết bay).`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t1-q2',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 2,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Adult kakapo produce chicks every year.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn [D] nêu rõ: "Kākāpō breed in summer and autumn, but only in years when food is plentiful" (Chúng sinh sản không phải hàng năm mà chỉ vào những năm thức ăn dồi dào).`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q3',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 3,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Adult male kakapo bring food back to nesting females.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn [D] chỉ rõ: "Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks" (Con đực không tham gia ấp trứng hay nuôi con).`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q4',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 4,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Đoạn [E] đề cập cả người định cư Polynesia và chuột Polynesia đều săn bắt kākāpō nhưng không có so sánh bên nào gây nguy hiểm lớn hơn.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q5',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 5,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn [I] xác nhận: "predation by feral cats on Rakiura Island led to a rapid decline... The decision was made to evacuate all surviving birds to predator-free offshore islands".`,
      paragraph_ref: 'I'
    },
    {
      id: 'c20-t1-q6',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 6,
      type: 'tfng',
      group_header: 'Questions 1–6',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn [K] nêu: "chicks at risk were removed from nests and hand-reared in specialized facilities to ensure maximum survival".`,
      paragraph_ref: 'K'
    },
    {
      id: 'c20-t1-q7',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 7,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Complete the notes below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer.`,
      prompt: `diet consists of fern fronds, various parts of a tree and [7] ……………`,
      options: null,
      correct_answer: 'bulbs',
      academic_explanation: `Đoạn [C]: "diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q8',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 8,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `nests are created [8] …………… in where eggs are laid.`,
      options: null,
      correct_answer: 'soil',
      academic_explanation: `Đoạn [D]: "The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q9',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 9,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `the [9] …………… of the kākāpō were used to make clothes.`,
      options: null,
      correct_answer: 'feathers',
      academic_explanation: `Đoạn [E]: "Māori hunters used their soft yellow-green feathers to weave prestigious cloaks".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q10',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 10,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `[10] …………… were an animal which they introduced that ate the kākāpō's food sources.`,
      options: null,
      correct_answer: 'deer',
      academic_explanation: `Đoạn [F]: "introduced grazing herbivores such as deer stripped the forest understorey of vegetation essential for kākāpō sustenance".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t1-q11',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 11,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `a definite sighting of female kākāpō on Rakiura Island was reported in the year [11] ……………`,
      options: null,
      correct_answer: '1980',
      academic_explanation: `Đoạn [H]: "Finally in 1980, researchers confirmed the first sighting of female kākāpō on Rakiura Island".`,
      paragraph_ref: 'H'
    },
    {
      id: 'c20-t1-q12',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 12,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `the Recovery Plan included an increase in [12] ……………`,
      options: null,
      correct_answer: 'funding',
      academic_explanation: `Đoạn [J]: "The 1996 Recovery Plan secured substantial state funding and private sponsorships".`,
      paragraph_ref: 'J'
    },
    {
      id: 'c20-t1-q13',
      passage_id: 'cambridge-20-test-1-p1',
      question_number: 13,
      type: 'summary_completion',
      group_header: 'Questions 7–13',
      group_instruction: `Choose ONE WORD AND/OR A NUMBER.`,
      prompt: `a current goal of the Recovery Plan is to maintain the involvement of [13] …………… in kākāpō protection.`,
      options: null,
      correct_answer: 'stakeholders',
      academic_explanation: `Đoạn [L]: "ensure stakeholders continue to be fully engaged in the preservation of the species".`,
      paragraph_ref: 'L'
    },
    {
      id: 'c20-t1-q14',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–18',
      group_instruction: `Reading Passage 2 has seven sections, A–G. Which section contains the following information? You may use any letter more than once.`,
      prompt: `reference to the research problems that arise from there being only a few surviving large elms`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Mục C thảo luận về việc số lượng cây trưởng thành còn sót lại quá ít gây khó khăn cho việc nghiên cứu tính kháng bệnh.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q15',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–18',
      group_instruction: `Which section contains the following information?`,
      prompt: `details of a difference of opinion about the value of reintroducing elms to Britain`,
      options: null,
      correct_answer: 'G',
      academic_explanation: `Mục G trình bày các luồng quan điểm trái chiều giữa các nhà bảo tồn về việc tái nhập cây du.`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t1-q16',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–18',
      group_instruction: `Which section contains the following information?`,
      prompt: `reference to how Dutch elm disease was brought into Britain`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Mục B giải thích mầm bệnh du nhập vào Anh thông qua các chuyến hàng nhập khẩu gỗ từ Bắc Mỹ.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t1-q17',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–18',
      group_instruction: `Which section contains the following information?`,
      prompt: `a description of the conditions that have enabled a location in Britain to escape Dutch elm disease`,
      options: null,
      correct_answer: 'E',
      academic_explanation: `Mục E mô tả vị trí ven biển Brighton với điều kiện gió biển khắc nghiệt ngăn cản bọ cánh cứng mang nấm gây bệnh.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q18',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 18,
      type: 'matching_info',
      group_header: 'Questions 14–18',
      group_instruction: `Which section contains the following information?`,
      prompt: `reference to the stage at which young elms become vulnerable to Dutch elm disease`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Mục C nêu rõ cây con khi đạt đường kính thân khoảng 10cm thì bắt đầu thu hút bọ mang nấm.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q19',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 19,
      type: 'matching_info',
      group_header: 'Questions 19–23',
      group_instruction: `Match each statement with the correct person, A, B, or C. (A: Peter Bourne, B: Karen Russell, C: Martin Brookes)`,
      prompt: `If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Bà Karen Russell nhấn mạnh triệu chứng lá vàng úa và cành chết khô xuất hiện chỉ trong vài tuần.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q20',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 20,
      type: 'matching_info',
      group_header: 'Questions 19–23',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `It may be better to wait and see if the mature elms that have survived continue to flourish.`,
      options: null,
      correct_answer: 'A',
      academic_explanation: `Peter Bourne đề xuất theo dõi sự phát triển tự nhiên của các cá thể du cổ thụ còn sống sót.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q21',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 21,
      type: 'matching_info',
      group_header: 'Questions 19–23',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `There must be an explanation for the survival of some mature elms.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Karen Russell khẳng định việc một số cây sống sót không thể chỉ là ngẫu nhiên mà có cơ chế sinh học đằng sau.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q22',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 22,
      type: 'matching_info',
      group_header: 'Questions 19–23',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `We need to be aware that insects carrying Dutch elm disease are not very far away.`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Martin Brookes cảnh báo quần thể bọ cánh cứng mang bào tử nấm luôn hiện diện ở vùng đệm.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t1-q23',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 23,
      type: 'matching_info',
      group_header: 'Questions 19–23',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `You understand the effect of Dutch elm disease if you saw it happen.`,
      options: null,
      correct_answer: 'A',
      academic_explanation: `Peter Bourne hồi tưởng về ký ức tuổi thơ chứng kiến cây du chết hàng loạt trên khắp làng quê nước Anh.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q24',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 24,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `For hundreds of years, the only tree that was more popular in Britain than elm was [24] ……………`,
      options: null,
      correct_answer: 'oak',
      academic_explanation: `Đoạn D: "For centuries, the elm was second in British affection and utility only to the majestic oak".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q25',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 25,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `In the 18th century, it was grown to provide wood for boxes and [25] ……………`,
      options: null,
      correct_answer: 'flooring',
      academic_explanation: `Đoạn D: "timber merchants utilized durable elm wood for shipping containers, coffin boards and interior flooring".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q26',
      passage_id: 'cambridge-20-test-1-p2',
      question_number: 26,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Due to its strength, elm was often used for mining equipment and the Cutty Sark's [26] …………… was also constructed from elm.`,
      options: null,
      correct_answer: 'keel',
      academic_explanation: `Đoạn D: "its water-resistant properties led to its use in the underwater keel of the 19th-century clipper Cutty Sark".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q27',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 27,
      type: 'multiple_choice',
      group_header: 'Questions 27–30',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `In the first paragraph, the writer introduces the topic of the text by`,
      options: ["defining some commonly used terms.", "questioning a widely held assumption.", "mentioning a challenge faced by everyone.", "specifying a situation which makes us most anxious."],
      correct_answer: 'C',
      academic_explanation: `Đoạn 1 nêu: "From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions" (Mọi người đều phải đối mặt với thử thách ra quyết định dưới áp lực).`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t1-q28',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 28,
      type: 'multiple_choice',
      group_header: 'Questions 27–30',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `What point does the writer make about firefighters in the second paragraph?`,
      options: ["The regular changes of stress levels in their working lives make them ideal study subjects.", "The strategies they use to handle stress are of particular interest to researchers.", "Their reactions to stress vary more widely than those of other professionals.", "They are more prone to making poor decisions under stress than average citizens."],
      correct_answer: 'A',
      academic_explanation: `Đoạn 2: Sự chuyển đổi luân phiên giữa trạng thái nhàn rỗi ở trạm và tình huống khẩn cấp nguy hiểm khiến lính cứu hỏa trở thành đối tượng hoàn hảo để nghiên cứu.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t1-q29',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 29,
      type: 'multiple_choice',
      group_header: 'Questions 27–30',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `What did the laboratory experiment involving cortisol levels demonstrate?`,
      options: ["Elevated cortisol impairs logical deduction.", "Cortisol increases heart rate without altering cognition.", "Subjects became indifferent to risks.", "Stress hormones enhanced sensitivity to warning signs."],
      correct_answer: 'D',
      academic_explanation: `Đoạn 3 chỉ ra: Khi nồng độ cortisol tăng cao, người tham gia xử lý các thông tin cảnh báo tiêu cực nhanh và chính xác hơn hẳn.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q30',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 30,
      type: 'multiple_choice',
      group_header: 'Questions 27–30',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `The writer mentions financial market crashes to illustrate that`,
      options: ["investors are inherently irrational.", "regulations fail during crises.", "stress-induced decisions can cascade across societies.", "economic forecasts are unreliable."],
      correct_answer: 'C',
      academic_explanation: `Đoạn 4 minh họa rằng tâm lý hoảng loạn và phản ứng trước tin xấu có tính lây lan, dẫn đến bán tháo cổ phiếu trên diện rộng.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q31',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 31,
      type: 'matching_info',
      group_header: 'Questions 31–35',
      group_instruction: `Complete each sentence with the correct ending, A–G.`,
      prompt: `At times when they were relaxed, the firefighters usually`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Khi thư giãn, lính cứu hỏa có xu hướng ít bận tâm đến các tin tức xấu (took relatively little notice of bad news).`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t1-q32',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 32,
      type: 'matching_info',
      group_header: 'Questions 31–35',
      group_instruction: `Complete each sentence with the correct ending.`,
      prompt: `The researchers noted that when the firefighters were stressed, they`,
      options: null,
      correct_answer: 'G',
      academic_explanation: `Khi căng thẳng, họ đánh giá nguy cơ xảy ra sự cố tiêu cực là cao hơn nhiều (thought it more likely that they would experience something bad).`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t1-q33',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 33,
      type: 'matching_info',
      group_header: 'Questions 31–35',
      group_instruction: `Complete each sentence with the correct ending.`,
      prompt: `In earlier studies, members of the public who were not under pressure`,
      options: null,
      correct_answer: 'F',
      academic_explanation: `Những người không chịu áp lực thể hiện xu hướng lạc quan thiên vị đồng nhất (behaved in a similar manner, regardless of circumstances).`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q34',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 34,
      type: 'matching_info',
      group_header: 'Questions 31–35',
      group_instruction: `Complete each sentence with the correct ending.`,
      prompt: `Before testing the students, the researchers deliberately`,
      options: null,
      correct_answer: 'E',
      academic_explanation: `Các nhà nghiên cứu đã cố tình đặt sinh viên vào tình huống căng thẳng trước bài kiểm tra (put them in a stressful situation).`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t1-q35',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 35,
      type: 'matching_info',
      group_header: 'Questions 31–35',
      group_instruction: `Complete each sentence with the correct ending.`,
      prompt: `People are more likely to act upon warnings when they`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Con người dễ tiếp nhận và hành động trước các lời cảnh báo khi đang cảm thấy căng thẳng (were feeling under stress).`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t1-q36',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 36,
      type: 'tfng',
      group_header: 'Questions 36–40',
      group_instruction: `Do the following statements agree with the claims of the writer in Reading Passage 3? Write YES, NO, or NOT GIVEN.`,
      prompt: `The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'YES',
      academic_explanation: `Đoạn 5 xác nhận sự lây lan cảm xúc: nội dung mạng xã hội thường phản ánh đúng tâm trạng các bài đăng chúng ta đọc.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q37',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 37,
      type: 'tfng',
      group_header: 'Questions 36–40',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Phones have a greater impact on our stress levels than other electronic media devices.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc bàn về mạng xã hội nói chung chứ không so sánh tác động của điện thoại so với các thiết bị điện tử khác.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t1-q38',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 38,
      type: 'tfng',
      group_header: 'Questions 36–40',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `The more we read about a stressful public event on social media, the less able we are to take effective action.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'NO',
      academic_explanation: `Tác giả chỉ ra nhận thức được thông tin cảnh báo thực tế kích hoạt phản ứng hành động phòng ngừa hiệu quả chứ không làm tê liệt khả năng hành động.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t1-q39',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 39,
      type: 'tfng',
      group_header: 'Questions 36–40',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Messages that express positive feelings can motivate people to solve difficult problems.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'YES',
      academic_explanation: `Đoạn cuối: "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t1-q40',
      passage_id: 'cambridge-20-test-1-p3',
      question_number: 40,
      type: 'tfng',
      group_header: 'Questions 36–40',
      group_instruction: `Write YES, NO, or NOT GIVEN.`,
      prompt: `Leaders can make use of psychological research findings to improve communication with citizens.`,
      options: ["YES", "NO", "NOT GIVEN"],
      correct_answer: 'YES',
      academic_explanation: `Tác giả kết luận việc thấu hiểu cơ chế tiếp nhận thông tin giúp xây dựng thông điệp hiệu quả và trở thành những nhân tố tạo ra sự thay đổi.`,
      paragraph_ref: 'F'
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

  console.log('✅ Hoàn tất nạp Cambridge 20 - Test 1 (3 Passages, 40 Questions)');
}

module.exports = seedTest1;
