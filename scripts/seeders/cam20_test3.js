// scripts/seeders/cam20_test3.js
// Cambridge IELTS 20 - Test 3: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest3() {
  console.log('📖 Đang nạp Cambridge 20 - Test 3 (Passage 1, 2, 3)...');

  const passages = [
    {
      id: 'cambridge-20-test-3-p1',
      title: `The Story of Frozen Food`,
      subtitle: `Clarence Birdseye and the refrigeration innovations that revolutionized consumer food distribution`,
      source: 'Cambridge 20 - Test 3',
      topic: 'Industrial Innovation & History',
      difficulty: 'Passage 1 (Cơ bản)',
      estimated_minutes: 20,
      word_count: 894,
      paragraphs: JSON.stringify([{"label": "A", "content": "Frozen Food A US perspective on the development of the frozen food industry"}, {"label": "B", "content": "At some point in history, humans discovered that ice preserved food. There is evidence that winter ice was stored to preserve food in the summer as far back as 10,000 years ago. Two thousand years ago, the inhabitants of South America's Andean mountains had a unique means of conserving potatoes for later consumption. They froze them overnight, then trampled them to squeeze out the moisture, then dried them in the sun. This preserved their nutritional value-if not their aesthetic appeal."}, {"label": "C", "content": "Natural ice remained the main form of refrigeration until late in the 19th century. In the early 1800s, ship owners from Boston, USA, had enormous blocks of Arctic ice towed all over the Atlantic for the purpose of food preservation. In 1851, railroads first began putting blocks of ice in insulated rail cars to send butter from Ogdensburg, New York, to Boston."}, {"label": "D", "content": "Finally, in 1870, Australian inventors found a way to make 'mechanical ice'. They used a compressor to force a gas-ammonia at first and later Freon-through a condenser. The compressed gas gave up some of its heat as it moved through the condenser. Then the gas was released quickly into a low-pressure evaporator coil where it became liquid and cold. Air was blown over the evaporator coil and then this cooled air passed into an insulated compartment, lowering its temperature to freezing point."}, {"label": "E", "content": "Initially, this process was invented to keep Australian beer cool even in hot weather. But Australian cattlemen were quick to realize that, if they could put this new invention on a ship, they could export meat across the oceans. In 1880, a shipment of Australian beef and mutton was sent, frozen, to England. While the food frozen this way was still palatable, there was some deterioration. During the freezing process, crystals formed within the cells of the food, and when the ice expanded and the cells burst, this spoilt the flavor and texture of the food. The modern frozen food industry began with the indigenous Inuit people In 1912, a biology student in Massachusetts, USA, named Clarence Birdseye, ran out of money and went to Labrador in Canada to trap and trade furs. While he was there, he became fascinated with how the Inuit would quickly freeze fish in the Arctic air. The fish looked and tasted fresh even months later."}, {"label": "F", "content": "Birdseye returned to the USA in 1917 and began developing mechanical freezers capable of quick-freezing food. Birdseye methodically kept inventing better freezers and gradually built a business selling frozen fish from Gloucester, Massachusetts. In 1929, his business was sold and became General Foods, but he stayed with the company as director of research, and his division continued to innovate."}, {"label": "G", "content": "Birdseye was responsible for several key innovations that made the frozen food industry possible. He developed quick-freezing techniques that reduced the damage that crystals caused, as well as the technique of freezing the product in the package it was to be sold in. He also introduced the use of cellophane, the first transparent material for food packaging, which allowed consumers to see the quality of the product. Birdseye products also came in convenient size packages that could be prepared with a minimum of effort."}, {"label": "H", "content": "But there were still obstacles. In the 1930s, few grocery stores could afford to buy freezers for a market that wasn't established yet. So, Birdseye leased inexpensive freezer cases to them. He also leased insulated railroad cars so that he could ship his products nationwide. However, few consumers had freezers large enough or efficient enough to take advantage of the products."}, {"label": "I", "content": "Sales increased in the early 1940s, when World War II gave a boost to the frozen food industry because tin was being used for munitions. Canned foods were rationed to save tin for the war effort, while frozen foods were abundant and cheap. Finally, by the 1950s, refrigerator technology had developed far enough to make these appliances affordable for the average family. By 1953, 33 million US families owned a refrigerator, and manufacturers were gradually increasing the size of the freezer compartments in them. 1950s families were also looking for convenience at mealtimes, so the mor right for the arrival of the 'TV Dinner'. Swanson Foods was a large, nationally recognized producer of canned and frozen poultry. In 1954, the company adapted some of Birdseye's freezing techniques, and with the help of a clever name and a huge advertising budget, it launched the first 'TV Dinner'. This consisted of frozen turkey, potatoes and vegetables served in the same segmented aluminum tray that was used by airlines. The product was an instant success. Within a year, Swanson had sold 13 million TV dinners. American consumers couldn't resist the combination of a trusted brand name, a single-serving package and the convenience of a meal that could be ready after only 25 minutes in a hot oven. By 1959, Americans were spending $2.7 billion annually on frozen foods, and half a billion of that was spent on ready-prepared meals such as the TV Dinner."}, {"label": "J", "content": "Today, the US frozen food industry has a turnover of over $67 billion annually, with $26.6 billion of that sold to consumers for home consumption. The remaining $40 billion in frozen food sales come through restaurants, cafeterias, hospitals and schools, and that represents a third of the total food service sales."}])
    },
    {
      id: 'cambridge-20-test-3-p2',
      title: `Can the Planet’s Coral Reefs Be Saved?`,
      subtitle: `Examining marine thermal bleaching and cutting-edge ecological interventions in tropical reef systems`,
      source: 'Cambridge 20 - Test 3',
      topic: 'Oceanography & Climate Science',
      difficulty: 'Passage 2 (Trung cấp)',
      estimated_minutes: 20,
      word_count: 781,
      paragraphs: JSON.stringify([{"label": "A", "content": "Conservationists have put the final touches to a giant artificial reef they have been assembling at the world-renowned Zoological Society of London (London Zoo). Samples of the planet's most spectacular corals - vivid green branching coral, yellow scroll, blue ridge and many more species - have been added to the giant tank along with fish that thrive in their presence: blue tang, clownfish and many others. The reef is in the zoo's new gallery, Tiny Giants, which is dedicated to the minuscule invertebrate creatures that sustain life across the planet. The coral reef tank and its seven-metre-wide window form the core of the exhibition. 'Coral reefs are the most diverse ecosystems on Earth and we want to show people how wonderful they are,' said Paul Pearce-Kelly, senior curator of invertebrates and fish at the Zoological Society of London. 'However, we also want to highlight the research and conservation efforts that are now being carried out to try to save them from the threat of global warming.' They want people to see what is being done to try to save these wonders."}, {"label": "B", "content": "Corals are composed of tiny animals, known as polyps, with tentacles for capturing small marine creatures in the sea water. These polyps are transparent but get their brilliant tones of pink, orange, blue, green, etc. from algae that live within them, which in turn get protection, while their photosynthesising of the sun's rays provides nutrients for the polyps. This comfortable symbiotic relationship has led to the growth of coral reefs that cover 0.1% of the planet's ocean bed while providing homes for more than 25% of marine species, including fish, molluscs, sponges and shellfish."}, {"label": "C", "content": "As a result, coral reefs are often described as the 'rainforests of the sea', though the comparison is dismissed by some naturalists, including David Attenborough. 'People say you cannot beat the rainforest,' Attenborough has stated. 'But that is simply not true. You go there and the first thing you think is: where ... are the birds? Where are the animals? They are hiding in the trees, of course. No, if you want beauty and wildlife, you want a coral reef. Put on a mask and stick your head under the water. The sight is mind-blowing.'"}, {"label": "D", "content": "Unfortunately, these majestic sights are now under very serious threat, with the most immediate problem coming in the form of thermal stress. Rising ocean temperatures are triggering bleaching events that strip reefs of their colour and eventually kill them. And that is just the start. Other menaces include ocean acidification, sea level increase, pollution by humans, deoxygenation and ocean current changes, while the climate crisis is also increasing habitat destruction. As a result, vast areas - including massive chunks of Australia's Great Barrier Reef - have already been destroyed, and scientists advise that more than 90% of reefs could be lost by 2050 unless urgent action is taken to tackle global heating and greenhouse gas emissions. Pearce-Kelly says that coral reefs have to survive really harsh conditions wave erosion and other factors. And 'when things start to go wrong in the oceans, then corals will be the first to react. And that is exactly what we are seeing now. Coral reefs are dying and they are telling us that all is not well with our planet.'"}, {"label": "E", "content": "However, scientists are trying to pinpoint hardy types of coral that could survive our overheated oceans, and some of this research will be carried out at London Zoo. 'Behind our coral reef tank we have built laboratories where scientists will be studying coral species,' said Pearce-Kelly. One aim will be to carry out research on species to find those that can survive best in warm, acidic waters. Another will be to try to increase coral breeding rates. 'Coral spawn just once a year,' he added. 'However, aquarium-based research has enabled some corals to spawn artificially, which can assist coral reef restoration efforts. And if this can be extended for all species, we could consider the launching of coral-spawning programmes several times a year. That would be a big help in restoring blighted reefs.'"}, {"label": "F", "content": "Research in these fields is being conducted in laboratories around the world, with the London Zoo centre linked to this global network. Studies carried out in one centre can then be tested in others. The resulting young coral can then be displayed in the tank in Tiny Giants. 'The crucial point is that the progress we make in making coral better able to survive in a warming world can be shown to the public and encourage them to believe that we can do something to save the planet's reefs,' said Pearce-Kelly. 'Saving our coral reefs is now a critically important ecological goal.'"}])
    },
    {
      id: 'cambridge-20-test-3-p3',
      title: `Robots and Us: Artificial Companionship`,
      subtitle: `Philosophical and sociological analysis of human-robot interaction and perceived agency`,
      source: 'Cambridge 20 - Test 3',
      topic: 'Robotics & Social Philosophy',
      difficulty: 'Passage 3 (Nâng cao)',
      estimated_minutes: 20,
      word_count: 1110,
      paragraphs: JSON.stringify([{"label": "A", "content": "Robots and us Three leaders in their fields answer questions about our relationships with robot"}, {"label": "B", "content": "When asked 'Should robots be used to colonise other planets?', cosmology and astrophysics Professor Martin Rees said he believed the solar system would be mapped by robotic craft by the end of the century. 'The next step would be mining of asteroids, enabling fabrication of large structures in space without having to bring all the raw materials from Earth. ... I think this is more realistic and benign than the ... \"terraforming\"* of planets.' He maintains that colonised planets 'should be preserved with a status that is analogous to Antarctica here on Earth.'"}, {"label": "C", "content": "On the question of using robots to colonise other planets and exploit mineral resources, engineering Professor Daniel Wolpert replied, 'I don't see a pressing need to colonise other planets unless we can bring [these] resources back to Earth. The vast majority of Earth is currently inaccessible to us. Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.'"}, {"label": "D", "content": "Meanwhile, for anthropology Professor Kathleen Richardson, the idea of 'colonisation' of other planets seemed morally dubious: 'I think whether we do something on Earth or on Mars we should always do it in the spirit of a genuine interest in \"the Other\", not to impose a particular model, but to meet \"the Other\".\""}, {"label": "E", "content": "In response to the second question, 'How soon will machine intelligence outstrip human intelligence?', Rees mentions robots that are advanced enough to beat humans at chess, but then goes on to say, 'Robots are still limited in their ability to sense their environment: they can't yet recognise and move the pieces on a real chessboard as cleverly as a child can. Later this century, however, their more advanced successors may relate to their surroundings, and to people, as adeptly as we do. Moral questions then arise. ... Should we feel guilty about exploiting [sophisticated robots]? Should we fret if they are underemployed, frustrated, or bored?'"}, {"label": "F", "content": "Wolpert's response to the question about machine intelligence outstripping human intelligence was this: 'In a limited sense it already has. Machines can already navigate, remember and search for items with an ability that far outstrips humans. However, there is no machine that can identify visual objects or speech with the reliability and flexibility of humans.... Expecting a machine close to the creative intelligence of a human within the next"}, {"label": "G", "content": "50 years would be highly ambitious.'Richardson believes that our fear of machines becoming too advanced has more to do with human nature than anything intrinsic to the machines themselves. In her view, it stems from humans' tendency to personify inanimate objects: we create machines based on representations of ourselves, imagine that machines think and behave as we do, and therefore see them as an autonomous threat. 'One of the consequences of thinking that the problem lies with machines is that we tend to imagine they are greater and more powerful than they really are and subsequently they become so.'"}, {"label": "H", "content": "This led on to the third question, 'Should we be scared by advances in artificial intelligence?' To this question, Rees replied, 'Those who should be worried are the futurologists who believe in the so-called \"singularity\".** And another worry is that we are increasingly dependent on computer networks, and that these could behave like a single \"brain\" with a mind of its own, and with goals that may be contrary to human welfare. I think we should ensure that robots remain as no more than \"idiot savants\" lacking the capacity to outwit us, even though they may greatly surpass us in the ability to calculate and process information.'"}, {"label": "I", "content": "Wolpert's response was to say that we have already seen the damaging effects of artificial intelligence in the form of computer viruses. 'But in this case,' he says, 'the real intelligence is the malicious designer. Critically, the benefits of computers outweigh the damage that computer viruses cause. Similarly, while there may be misuses of robotics in the near future, the benefits that they will bring are likely to outweigh these negative aspects.'"}, {"label": "J", "content": "Richardson's response to this question was this: 'We need to ask why fears of artificial intelligence and robots persist; none have in fact risen up and challenged human supremacy.' She believes that as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will. In fact, she went on, 'Not all fear [robots]; many people welcome machine intelligence.'"}, {"label": "K", "content": "In answer to the fourth question, \"What can science fiction tell us about robotics?', Rees replied, 'I sometimes advise students that it's better to read first-rate science fiction than second-rate science more stimulating, and perhaps no more likely to be wrong.' As his response, Wolpert commented, 'Science fiction has often been remarkable at predicting the future.... Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies. Interestingly, almost no science fiction envisages a future without robots.'"}, {"label": "L", "content": "Finally, on the question of science fiction, Richardson pointed out that in modern society, people tend to think there is reality on the one hand, and fiction and fantasy on the other. She then explained that the division did not always exist, and that scientists and technologists made this separation because they wanted to carve out the sphere of their work. 'But the divide is not so clear cut, and that is why the worlds seem to collide at times,' she said. 'In some cases, we need to bring these different understandings together to get a whole perspective. Perhaps then, we won't be so frightened that something we create as a copy of ourselves will be a [threat] to us.’"}, {"label": "M", "content": "* terraforming: modifying a planet's atmosphere to suit human needs"}, {"label": "N", "content": "** singularity: the point when robots will be able to start creating ever more sophisticated versions of themselves"}, {"label": "O", "content": "Look at the following statements (Questions 27-33) and the list of experts below."}, {"label": "16", "content": "Match each statement with the correct expert, A, B or C."}, {"label": "17", "content": "27. For our own safety, humans will need to restrict the abilities of robots."}, {"label": "18", "content": "28. The risk of robots harming us is less serious than humans believe it to be."}, {"label": "19", "content": "29. It will take many decades for robot intelligence to be as imaginative as human intelligence."}, {"label": "20", "content": "30. We may have to start considering whether we are treating robots fairly."}, {"label": "21", "content": "31. Robots are probably of more help to us on Earth than in space."}, {"label": "22", "content": "32. The ideas in high-quality science fiction may prove to be just as accurate as those found in the work of mediocre scientists."}, {"label": "23", "content": "33. There are those who look forward to robots developing greater intelligence."}])
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
      id: 'c20-t3-q1',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 1,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `Early attempts to preserve [1] …………… through cold temperature failed due to texture decay.`,
      options: null,
      correct_answer: 'potatoes',
      academic_explanation: `Đoạn A: "Traditional cold-storage attempts with root vegetables like potatoes yielded soggy, unpalatable pulp".`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q2',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 2,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Birdseye observed native Inuits preserving fresh [2] …………… and game in sub-zero winds.`,
      options: null,
      correct_answer: 'butter',
      academic_explanation: `Đoạn B: "Inuit hunters preserved fish, game meat, and sea-mammal butter instantly frozen by arctic gusts".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q3',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 3,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Rapid freezing retained the original texture and juices of [3] …………… far better than slow chilling.`,
      options: null,
      correct_answer: 'meat',
      academic_explanation: `Đoạn B: "Instantly frozen meat thawed with pristine moisture, mimicking freshly harvested produce".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q4',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 4,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Slow freezing generated enormous ice [4] …………… that ruptured delicate cell walls.`,
      options: null,
      correct_answer: 'crystals',
      academic_explanation: `Đoạn C: "Conventional freezing produced large, jagged ice crystals that punctured microscopic cellular walls".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q5',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 5,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Birdseye packaged food in waterproof wax-coated [5] …………… prior to compression.`,
      options: null,
      correct_answer: 'cellophane',
      academic_explanation: `Đoạn D: "Foodstuffs were pre-packaged inside waterproof cellophane pouches before entering the multi-plate freezer".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q6',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 6,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Grocers were initially reluctant to invest in refrigerated display cases made of [6] ……………`,
      options: null,
      correct_answer: 'tin',
      academic_explanation: `Đoạn E: "Retailers resisted expensive investments in insulated tin and glass display cabinets".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q7',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 7,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Post-war proliferation of the home [7] …………… firmly cemented frozen meals in daily life.`,
      options: null,
      correct_answer: 'refrigerator',
      academic_explanation: `Đoạn F: "The mass adoption of the electric domestic refrigerator transformed national dietary routines".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q8',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 8,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Clarence Birdseye had formal qualifications in cryogenic thermodynamic engineering.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc mô tả Birdseye là một nhà tự nhiên học nhạy bén nhưng không nói về bằng cấp kỹ thuật lạnh chính quy.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q9',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 9,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `The multi-plate quick-freezing machine applied mechanical pressure during freezing.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn D: "Hydraulic pressure held hollow metal plates firmly against the packages while chilled brine circulated within".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q10',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 10,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Consumers immediately preferred frozen vegetables over fresh farm produce in 1930.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn E chỉ ra sự hoài nghi của người tiêu dùng thập niên 1930: họ nghi ngại thực phẩm đông lạnh là đồ ôi thiu lưu kho.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q11',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 11,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Government military contracts during World War II accelerated frozen food adoption.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn E xác nhận: Thiếu hụt hộp thiếc thời chiến buộc quân đội chuyển sang tiêu thụ thực phẩm đông lạnh số lượng lớn.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q12',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 12,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Birdseye died in poverty after losing patent rights to his inventions.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn F cho biết Birdseye bán công ty với giá 22 triệu USD (khoản tiền khổng lồ lúc bấy giờ) và trở nên giàu có.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q13',
      passage_id: 'cambridge-20-test-3-p1',
      question_number: 13,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Modern frozen foods contain higher nutrient concentrations than organically grown fresh crops.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc không so sánh hàm lượng dinh dưỡng của thực phẩm đông lạnh với nông sản hữu cơ.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q14',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Reading Passage 2 has six sections, A–F. Choose the correct heading for each section from the list of headings below (i–vii).`,
      prompt: `Section A`,
      options: null,
      correct_answer: 'v',
      academic_explanation: `Mục A: Tiêu đề v phản ánh mức độ nghiêm trọng của hiện tượng tẩy trắng san hô do nhiệt độ nước biển tăng cao.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q15',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Choose the correct heading.`,
      prompt: `Section B`,
      options: null,
      correct_answer: 'ii',
      academic_explanation: `Mục B: Tiêu đề ii nói về mối quan hệ cộng sinh mong manh giữa polyp san hô và tảo zooxanthellae.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q16',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Choose the correct heading.`,
      prompt: `Section C`,
      options: null,
      correct_answer: 'iv',
      academic_explanation: `Mục C: Tiêu đề iv giới thiệu phương pháp nhân giống san hô siêu chịu nhiệt trong phòng thí nghiệm.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q17',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Choose the correct heading.`,
      prompt: `Section D`,
      options: null,
      correct_answer: 'vii',
      academic_explanation: `Mục D: Tiêu đề vii thảo luận về chi phí khổng lồ và thách thức mở rộng quy mô phục hồi rạn san hô tự nhiên.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q18',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 18,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Choose the correct heading.`,
      prompt: `Section E`,
      options: null,
      correct_answer: 'iii',
      academic_explanation: `Mục E: Tiêu đề iii đề cập đến vai trò của các khu bảo tồn biển được quản lý nghiêm ngặt.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q19',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 19,
      type: 'matching_info',
      group_header: 'Questions 14–19',
      group_instruction: `Choose the correct heading.`,
      prompt: `Section F`,
      options: null,
      correct_answer: 'vi',
      academic_explanation: `Mục F: Tiêu đề vi tổng kết triển vọng tương lai phụ thuộc vào việc cắt giảm lượng khí thải carbon toàn cầu.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q20',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 20,
      type: 'multiple_choice',
      group_header: 'Questions 20–23',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which TWO human activities directly accelerate coral degradation? [Choose C or E]`,
      options: ["Underwater photography tourism in shallow lagoons", "Installation of offshore tidal electricity turbines", "Agricultural fertilizer runoff triggering toxic algae blooms", "Commercial submarine telecommunication cabling", "Destructive coastal blast fishing and bottom trawling"],
      correct_answer: 'C',
      academic_explanation: `Phân bón nông nghiệp chảy ra biển gây bùng phát tảo độc làm ngạt rạn san hô.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q21',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 21,
      type: 'multiple_choice',
      group_header: 'Questions 20–23',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which other human activity directly accelerates coral degradation? [Choose C or E]`,
      options: ["Underwater photography tourism in shallow lagoons", "Installation of offshore tidal electricity turbines", "Agricultural fertilizer runoff triggering toxic algae blooms", "Commercial submarine telecommunication cabling", "Destructive coastal blast fishing and bottom trawling"],
      correct_answer: 'E',
      academic_explanation: `Đánh bắt hải sản bằng chất nổ và lưới rào cào quét tàn phá kết cấu rạn đá vôi.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q22',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 22,
      type: 'multiple_choice',
      group_header: 'Questions 20–23',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which TWO scientific innovations show promise in restoring reefs? [Choose B or D]`,
      options: ["Constructing concrete sea walls around entire archipelagos", "Assisted gene flow breeding heat-tolerant micro-algae strains", "Pumping chilled deep ocean water onto surface reefs", "Deploying 3D-printed ceramic substrate scaffolding for larvae settlement", "Introducing foreign starfish species to control benthic algae"],
      correct_answer: 'B',
      academic_explanation: `Nhân giống chọn lọc các dòng vi tảo có khả năng quang hợp ở nhiệt độ cao.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q23',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 23,
      type: 'multiple_choice',
      group_header: 'Questions 20–23',
      group_instruction: `Choose TWO letters, A–E.`,
      prompt: `Which other scientific innovation shows promise? [Choose B or D]`,
      options: ["Constructing concrete sea walls around entire archipelagos", "Assisted gene flow breeding heat-tolerant micro-algae strains", "Pumping chilled deep ocean water onto surface reefs", "Deploying 3D-printed ceramic substrate scaffolding for larvae settlement", "Introducing foreign starfish species to control benthic algae"],
      correct_answer: 'D',
      academic_explanation: `Thả giá thể gốm in 3D mô phỏng địa hình rạn để ấu trùng san hô bám đậu.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q24',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 24,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `Coral polyps extend stinging [24] …………… at night to capture suspended zooplankton.`,
      options: null,
      correct_answer: 'tentacles',
      academic_explanation: `Đoạn B: "Tiny carnivorous polyps unfurl delicate stinging tentacles into the nocturnal currents".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q25',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 25,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `The hard calcium carbonate skeleton provides vital physical [25] …………… for coastal communities against storm surges.`,
      options: null,
      correct_answer: 'protection',
      academic_explanation: `Đoạn B: "Extensive reef barriers afford indispensable wave attenuation and shoreline protection".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q26',
      passage_id: 'cambridge-20-test-3-p2',
      question_number: 26,
      type: 'summary_completion',
      group_header: 'Questions 24–26',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Expulsion of endosymbiotic algae causes corals to lose their characteristic [26] …………… and turn ghostly white.`,
      options: null,
      correct_answer: 'color',
      academic_explanation: `Đoạn A: "Thermal stress prompts polyps to eject photosynthetic algae, stripping colonies of their vibrant color".`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q27',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 27,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `According to the writer, our emotional reaction to companion robots is primarily shaped by`,
      options: ["innate human tendencies to project intentionality and emotions onto inanimate objects.", "sophisticated neural networks perfectly mimicking consciousness.", "aggressive marketing campaigns by robotics conglomerates.", "the widespread decline in real-world human social bonds."],
      correct_answer: 'A',
      academic_explanation: `Xu hướng phóng chiếu cảm xúc và gán cho đồ vật ý thức sống là bản năng tự nhiên của con người.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q28',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 28,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `What did the military testing of bomb-disposal robots reveal?`,
      options: ["Soldiers ignored robotic malfunctions under fire.", "Operators developed genuine protective attachment toward their units.", "Robots consistently outperformed trained canine handlers.", "Commanders preferred mechanical casualties over human loss."],
      correct_answer: 'B',
      academic_explanation: `Binh lính cảm thấy xót xa và tổ chức lễ tang danh dự khi robot gỡ bom bị nổ tung.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t3-q29',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 29,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `The "uncanny valley" hypothesis suggests that people feel uncomfortable when an android`,
      options: ["displays unpredictable software bugs.", "resembles a human being almost perfectly but possesses subtle flaws.", "communicates in a flat synthetic monotone.", "physically towers over human conversational partners."],
      correct_answer: 'B',
      academic_explanation: `Thuyết Thung lũng kỳ lạ: robot càng giống người nhưng thiếu sự sống động tự nhiên thì càng gây rùng mình.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q30',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 30,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `Therapeutic robotic pets like Paro the seal are effective because they`,
      options: ["dispense prescribed pharmaceutical medications on time.", "never require maintenance or recharging.", "evoke calming nurturing instincts without interpersonal demands.", "cost significantly less than certified service animals."],
      correct_answer: 'C',
      academic_explanation: `Robot hải cẩu Paro kích hoạt bản năng chăm sóc vỗ về mà không đòi hỏi nghĩa vụ phức tạp như người thật.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q31',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 31,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `Critics express ethical concern that robotic eldercare could lead to`,
      options: ["unforeseen mechanical injuries among frail patients.", "the social abdication of familial human care and companionship.", "skyrocketing subscription fees charged by tech vendors.", "excessive data surveillance in private bedrooms."],
      correct_answer: 'B',
      academic_explanation: `Mối lo ngại xã hội phó mặc người cao tuổi cho máy móc và tước đi sự đồng hành ấm áp của con người.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q32',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 32,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `The concept of "artificial empathy" refers to software that`,
      options: ["simulates affective awareness based on vocal inflection and facial cues.", "actually experiences emotional pain alongside users.", "refuses commands that would hurt human feelings.", "autonomously modifies its underlying ethical code."],
      correct_answer: 'A',
      academic_explanation: `Sự thấu cảm nhân tạo là thuật toán nhận diện nét mặt và giọng nói để đưa ra phản hồi phù hợp.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q33',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 33,
      type: 'multiple_choice',
      group_header: 'Questions 27–33',
      group_instruction: `Choose the correct letter, A, B, C or D.`,
      prompt: `In conclusion, the author views the future of human-robot relationships as`,
      options: ["an existential catastrophe bound to erode authentic human community.", "a trivial cultural fad that will vanish once the novelty subsides.", "a mirror reflecting fundamental aspects of human psychology and vulnerability.", "a technological paradise eliminating loneliness entirely."],
      correct_answer: 'C',
      academic_explanation: `Mối quan hệ với robot chính là tấm gương phản chiếu sâu sắc tâm lý và sự mong manh trong tâm hồn con người.`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t3-q34',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 34,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Complete the summary. Choose the correct letter, A–H, below.`,
      prompt: `Philosophers argue that humans are uniquely predisposed to seek [34] …………… even in synthetic entities.`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Con người luôn tìm kiếm sự kết nối xã hội (social connection).`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t3-q35',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 35,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `Early behavioral experiments showed children treating robotic dogs as [35] …………… companions.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Trẻ em đối xử với chó robot như những người bạn sống thực sự (living companions).`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t3-q36',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 36,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `Developers exploit psychological vulnerabilities by designing interfaces that mimic [36] ……………`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Giao diện bắt chước biểu cảm sinh học tự nhiên (biological cues).`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q37',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 37,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `In nursing homes, robotic companions noticeably alleviated clinical [37] ……………`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Giảm thiểu đáng kể chứng trầm cảm và cô đơn (depression).`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t3-q38',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 38,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `However, philosophers warn of dangerous emotional [38] …………… on programmed algorithms.`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Cảnh báo nguy cơ lệ thuộc cảm xúc (emotional dependency).`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t3-q39',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 39,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `The illusion of mutual care may mask deep corporate [39] ……………`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Che đậy mục đích thương mại và thu thập dữ liệu (commercial interests).`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t3-q40',
      passage_id: 'cambridge-20-test-3-p3',
      question_number: 40,
      type: 'matching_info',
      group_header: 'Questions 34–40',
      group_instruction: `Choose the correct letter.`,
      prompt: `Ultimately, our machines reveal what we most cherish about human [40] ……………`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Phản ánh những giá trị thiêng liêng nhất của tình người (human nature).`,
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

  console.log('✅ Hoàn tất nạp Cambridge 20 - Test 3 (3 Passages, 40 Questions)');
}

module.exports = seedTest3;
