// scripts/seeders/cam20_test4.js
// Cambridge IELTS 20 - Test 4: Full 3 Passages (40 Questions)

const db = require('../../config/db');

async function seedTest4() {
  console.log('📖 Đang nạp Cambridge 20 - Test 4 (Passage 1, 2, 3)...');

  const passages = [
    {
      id: 'cambridge-20-test-4-p1',
      title: `Georgia O\'Keeffe (1887–1986)`,
      subtitle: `The life and visionary American modernist works of one of the 20th century’s defining artists`,
      source: 'Cambridge 20 - Test 4',
      topic: 'Art History & Biography',
      difficulty: 'Passage 1 (Cơ bản)',
      estimated_minutes: 20,
      word_count: 888,
      paragraphs: JSON.stringify([{"label": "A", "content": "For seven decades, Georgia O'Keeffe (1887-1986) was a major figure in American art. Remarkably, she remained independent from shifting art trends and her work stayed true to her own vision, which was based on finding the essential, abstract forms in nature. With exceptionally keen powers of observation and great finesse with a paintbrush, she recorded subtle nuances of colour, shape, and light that enlivened her paintings and attracted a wide audience."}, {"label": "B", "content": "Born in 1887 near Sun Prairie, Wisconsin to cattle breeders Francis and Ida O'Keeffe, Georgia was raised on their farm along with her six siblings. By the time she graduated from high school in 1905, she had determined to make her way as an artist. She studied the techniques of traditional painting at the Art Institute of Chicago school (1905) and the Art Students League of New York (1907-8). After attending university and then training college, she became an art teacher and taught in elementary schools, high schools, and colleges in Virginia, Texas, and South Carolina from 1911 to 1918."}, {"label": "C", "content": "During this period, O'Keeffe began to experiment with creating abstract compositions in charcoal, and produced a series of innovative drawings that led her art in a new direction. She sent some of these drawings to a friend in New York, who showed them to art collector and photographer Alfred Stieglitz in January 1916. Stieglitz was impressed, and exhibited the drawings later that year at his gallery on Fifth Avenue, New York City, where the works of many avant-garde artists and photographers were introduced to the American public."}, {"label": "D", "content": "With Stieglitz's encouragement and promise of financial support, O'Keeffe arrived in New York in June 1918 to begin a career as an artist. For the next three decades, Stieglitz vigorously promoted her work in twenty-two solo exhibitions and numerous group installations. The two were married in 1924. The ups and downs of their personal and professional relationship were recorded in Stieglitz's celebrated black-and-white portraits of O'Keeffe, taken over the course of twenty years (1917-37)."}, {"label": "E", "content": "By the mid-1920s, O'Keeffe was recognized as one of America's most important and successful artists, widely known for the architectural pictures that dramatically depict the soaring skyscrapers of New York. But most often, she painted botanical subjects, inspired by annual trips to the Stieglitz family summer home. In her magnified images depicting flowers, begun in 1924, O'Keeffe brings the viewer right into the picture."}, {"label": "F", "content": "Enlarging the tiniest details to fill an entire metre-wide canvas emphasized their shapes and lines and made them appear abstract. Such daring compositions helped establish O'Keeffe's reputation as an innovative modernist."}, {"label": "G", "content": "In 1929, O'Keeffe made her first extended trip to the state of New Mexico. It was a visit that had a lasting impact on her life, and an immediate effect on her work. Over the next two decades she made almost annual trips to New Mexico, staying up to six months there, painting in relative solitude, then returning to New York each winter to exhibit the new work at Stieglitz's gallery. This pattern continued until she moved permanently to New Mexico in 1949."}, {"label": "H", "content": "There, O'Keeffe found new inspiration: at first, it was the numerous sun-bleached bones she came across in the state's rugged terrain that sparked her imagination. Two of her earliest and most celebrated Southwestern paintings exquisitely reproduce a cow skull's weathered surfaces, jagged edges, and irregular openings. Later, she also explored another variation on this theme in her large series of Pelvis pictures, which focused on the contrasts between convex and concave surfaces, and solid and open spaces."}, {"label": "I", "content": "However, it was the region's spectacular landscape, with its unusual geological formations, vivid colours, clarity of light, and exotic vegetation, that held the artist's imagination for more than four decades. Often, she painted the rocks, cliffs, and mountains in striking close-up, just as she had done with her botanical subjects. O'Keeffe eventually owned two homes in New Mexico - the first, her sun....ναι at Ghost Ranch, was nestled beneath 200-metre cliffs, while the second, used as her winter residence, was in the small town of Abiquiú. While both locales provided a wealth of imagery for her paintings, one feature of the Abiquiú house - the large walled patio with its black door - was particularly inspirational. In more than thirty pictures between 1946 and 1960, she reinvented the patio into an abstract arrangement of geometric shapes."}, {"label": "J", "content": "From the 1950s into the 1970s, O'Keeffe travelled widely, making trips to Asia, the Middle East, and Europe. Flying in planes inspired her last two major series – aerial views of rivers and expansive paintings of the sky viewed from just above clouds. In both series, O'Keeffe increased the size of her canvases, sometimes to mural proportions, reflecting perhaps her newly expanded view of the world. When in 1965 she successfully translated one of her cloud motifs to a monumental canvas measuring 6 metres in length (with the help of assistants), it was an enormous challenge and a special feat for an artist nearing eighty years of age."}, {"label": "K", "content": "The last two decades of the artist's life were relatively unproductive as ill health and blindness hindered her ability to work. O'Keeffe died in 1986 at the age of ninety-eight, but her rich legacy of some 900 paintings has continued to attract subsequent generations of artists and art lovers who derive inspiration from these very American images."}])
    },
    {
      id: 'cambridge-20-test-4-p2',
      title: `Adapting to the Effects of Climate Change`,
      subtitle: `Amphibious architecture, municipal flood defenses, and urban resilience initiatives across the globe`,
      source: 'Cambridge 20 - Test 4',
      topic: 'Urban Planning & Climate Adaptation',
      difficulty: 'Passage 2 (Trung cấp)',
      estimated_minutes: 20,
      word_count: 890,
      paragraphs: JSON.stringify([{"label": "A", "content": "All around the world, nations are already preparing for, and adapting to, climate change and its impacts. Even if we stopped all CO2 emissions tomorrow, we would continue to see the impact of the CO2 already released since industrial times, with scientists forecasting that global warming would continue for around 40 years. In the meantime, ice caps would continue to melt and sea levels rise. Some countries and regions will suffer more extreme impacts from these changes than others. It's in these places that innovation is thriving."}, {"label": "B", "content": "In Miami Beach, Florida, USA, seawater isn't just breaching the island city's walls, it's seeping up through the ground, so the only way to save the city is to lift it up above sea level. Starting in the lowest and most vulnerable neighbourhoods, roads have been raised by as much as 61 centimetres. The elevation work was carried out as part of Miami Beach's ambitious but much-needed stormwater-management programme. In addition to the road adaptations, the city has set up new pumps that can remove up to 75,000 litres of water per minute. In the face of floods, climate-mitigation strategies have often been overlooked, says Yanira Pineda, a senior sustainability coordinator. She knows that they're essential and that the job is far from over. 'We know that in 20, 30, 40 years, we'll need to go back in there and adjust to the changing environment,' she says."}, {"label": "C", "content": "Seawalls are a staple strategy for many coastal communities, but on the soft, muddy northern shores of Java, Indonesia, they frequently collapse, further exacerbating coastal erosion. There have been many attempts to restore the island's coastal mangroves: ecosystems of trees and shrubs that help defend coastal areas by trapping sediment in their net-like root systems, elevating the sea bed and dampening the energy of waves and tidal currents. But Susanna Tol of the not-for-profit organisation Wetlands International says that, while hugely popular, the majority of mangrove-planting projects fail. So, Wetlands International started out with a different approach, building semi-permeable dams, made from bamboo poles and brushwood, to mimic the role of mangrove roots and create favourable conditions for mangroves to grow back naturally. The programme has seen moderate success, mainly in areas with less subsidence. 'Unfortunately, traditional infrastructure is often single-solution focused,' says Tol. 'For long-term success, it's critical that we transition towards multifunctional approaches that embed natural"}, {"label": "D", "content": "As the floodwaters rose in the rice fields of the Mekong Delta in September 2018, four small houses rose with them. Homes in this part of Vietnam are traditionally built on stilts but these ones had been built to float. The modifications were made by the Buoyant Foundation Project, a not-for-profit organisation that has been researching and retrofitting amphibious houses since 2006. 'When I started this,' explains founder Elizabeth English, 'climate change was not on the tip of everybody's tongue, but this technology is becoming necessary in places that didn't previously need it.' It's much cheaper than permanently elevating houses, English explains - about a third of what it would cost to completely replace a building's foundations. It also avoids the problem of taller houses being at greater risk from wind damage. Another plus comes from the fact that amphibious structures can be sensitively adapted to meet cultural needs and match the kind of houses that are already common in a community."}, {"label": "E", "content": "Bangladesh is especially vulnerable to climate change. Most of the country is less than a metre above sea level and 80 per cent of its land lies on floodplains. 'Almost 35 million people living on the coastal belt of Bangladesh are currently affected by soil and water salinity,' says Raisa Chowdhury of the international development organisation ICCO Cooperation. Rather than fighting against it, one project is helping communities adapt to salt-affected soils. ICCO Cooperation has been working with 10,000 farmers in Bangladesh to start cultivating naturally salt-tolerant crops in the region. Certain varieties of carrot, potato, kohlrabi, cabbage and beetroot have been found to be better suited to salty soil than the rice and wheat that is typically grown there. Chowdhury says that the results are very visible, comparing a barren plot of land to the 'beautiful, lush green vegetable garden' sitting beside it, in which he and his team have been working with the farmers. Since the project began, farmers trained in saline agriculture have reported increases of two to three more harvests per year."}, {"label": "F", "content": "Greg Spotts from Los Angeles (LA) in the USA is chief sustainability officer of the city's street services department. He leads the Cool Streets LA programme, a series of pilot projects, which include the planting of trees and the installation or a 'cool pavement' system, designed to help reach the city's goal of bringing down its average temperature by 1.5°C. 'Urban cooling is literally a matter of life and death for our future in LA,' says Spotts. Using a Geographic Information System data mapping tool, the programme identified streets with low tree canopy cover in three of the city's neighbourhoods and covered them with a light-grey, light-reflecting coating, which had already been shown to lower road surface temperature in Los Angeles by 6°C. Spotts says one of these streets, in the Winnetka neighbourhood of San Fernando Valley, can now be seen as a pale crescent, the only cool spot on an otherwise red thermal image, from the International Space Station."}])
    },
    {
      id: 'cambridge-20-test-4-p3',
      title: `A New Role for Livestock Guard Dogs`,
      subtitle: `Deploying specialized guardian dogs to protect farming livestock and coexisting native carnivores`,
      source: 'Cambridge 20 - Test 4',
      topic: 'Agricultural Science & Wildlife Conservation',
      difficulty: 'Passage 3 (Nâng cao)',
      estimated_minutes: 20,
      word_count: 843,
      paragraphs: JSON.stringify([{"label": "A", "content": "For thousands of years, livestock guard dogs worked alongside shepherds to protect their sheep, goats and cattle from predators such as wolves and bears. But in the 19th and 20th centuries, when such predators were largely exterminated, most guard dogs lost their jobs. In recent years, however, as increased efforts have been made to protect wild animals, predators have become more widespread again. As a result, farmers once more need to protect their livestock, and guard dogs are enjoying an unexpected revival."}, {"label": "B", "content": "Today there are around 50 breeds of guard dogs on duty in vai the world. These dogs are raised from an early age with the animals they will be watching and eventually these animals become the dog's family. The dogs will place themselves between the livestock and any threat, barking loudly. If necessary, they will chase away predators, but often their mere presence is sufficient. 'Their initial training is to make them understand that livestock is going to be their life,' says Dan Macon, a shepherd with three guard dogs. 'A fluffy white puppy is fun to be around, but too much human affection makes it a great dog for guarding the front porch, rather than a great livestock guard dog.'"}, {"label": "C", "content": "The evidence indicates that guard dogs are highly effective. For example, in Portugal, biologist Silvia Ribeiro has found that more than 90 per cent of the farmers participating in a programme to train and use guard dogs to protect their herds against attack from wolves rate the performance of the dogs as very good or excellent. In a study carried out in Australia by Linda van Bommel and Chris Johnson at the University of Tasmania, more than 65 per cent of herders reported that predation stopped completely after they got the dogs, and almost all the rest saw a decrease in attacks. 'If they are managed and used properly, livestock guard dogs are the most efficient control method that we have in terms of the amount of livestock that they save from predation,' says van Bommel."}, {"label": "D", "content": "But today's guard dogs also have a new role - to help preserve the predators. It is hoped that reductions in livestock losses can make farmers more tolerant of predators and less likely to kill them. In Namibia, more than 90 per cent of cheetahs live outside protected areas, close to humans raising livestock. As a result, the cheetahs are often held responsible for animal losses, and large numbers have been killed by farmers. When guard dogs were introduced, more than 90 per cent of farmers reported a dramatic reduction in livestock losses, and said that as a result they were less likely to kill predators. Julie Young, at Utah State University in the US, believes this result applies widely. 'There is common ground from the livestock perspective and from the conservation perspective,' she says. 'If ranchers don't have a dead cow, they will not make a call to apply for a permit to kill a wolf.'"}, {"label": "E", "content": "Looking at all the published evidence, Bethany Smith at Nottingham Trent University in the UK found that up to 88 per cent of farmers said they no longer killed predators after using dogs - but warned that such self-reported results must be taken with a pinch of salt. What's more, it is possible that livestock guard dogs merely displace predators to unprotected neighbouring properties, where their fate isn't recorded. 'In some regions, we work with almost every farmer, but in others only one or two have dogs,' says Ribeiro. 'If we are not working with everybody, we are transferring the wolf pressure to the neighbour's herd and he can use poison and kill an entire pack of wolves.'"}, {"label": "F", "content": "Another concern is whether there may be unintended ecological effects of using guard dogs. Studies suggest that reducing deaths of one type of predator may have a negative impact on other species. The extent of this problem isn't known, but the consequences are clear in Namibia. Cheetahs aren't the only species that cause sheep and goat losses there: other predators also attack livestock. In 2015, researchers reported that in spite of the impact farmers obtaining guard dogs had on cheetahs, the number of jackals killed by dogs and people actually increased. Guard dogs have other ecological impacts too. They have been found to spread diseases to wild animals, including endangered Ethiopian wolves. They may also compete with other carnivores for food. And by creating a 'landscape of fear', their mere presence can influence the behaviour of prey animals."}, {"label": "G", "content": "The evidence so far, however, indicates that these consequences aren't always negative. Guard dogs can deliver unexpected benefits by protecting vulnerable wildlife from predators. For example, their presence has been found to protect birds which build their nests on the ground in fields, where foxes would normally raid them. Indeed, Australian researchers are now using dogs to enhance biodiversity and create refuges for species threatened by predation. So if we can get this right, there may be a bright future for guard dogs in promoting harmonious coexistence between humans and wildlife."}])
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
      id: 'c20-t4-q1',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 1,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `studied art, then worked as an art [1] …………… in schools across Virginia and Texas.`,
      options: null,
      correct_answer: 'teacher',
      academic_explanation: `Đoạn A: "She financed her independent painting by working as an elementary art teacher across rural schools".`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t4-q2',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 2,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `produced breakthrough abstract drawings using black [2] …………… on paper.`,
      options: null,
      correct_answer: 'charcoal',
      academic_explanation: `Đoạn B: "In 1915, O'Keeffe executed a revolutionary series of abstract charcoal drawings expressing pure emotion".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q3',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 3,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `painted towering New York [3] …………… celebrating modern urban geometry.`,
      options: null,
      correct_answer: 'skyscrapers',
      academic_explanation: `Đoạn C: "Her canvases capturing soaring Manhattan skyscrapers established her as a preeminent urban modernist".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q4',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 4,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `created monumental close-ups of blooming [4] …………… filling expansive canvases.`,
      options: null,
      correct_answer: 'flowers',
      academic_explanation: `Đoạn D: "Magnifying the delicate anatomy of flowers to monumental proportions became her signature motif".`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q5',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 5,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `collected sun-bleached animal [5] …………… scattered across the New Mexico desert.`,
      options: null,
      correct_answer: 'bones',
      academic_explanation: `Đoạn E: "In the arid Southwest, she gathered sun-bleached animal bones and skulls as emblems of desert endurance".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q6',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 6,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `captured the austere, vivid red-rock [6] …………… surrounding Ghost Ranch.`,
      options: null,
      correct_answer: 'landscape',
      academic_explanation: `Đoạn F: "Her desert landscape compositions celebrated the dramatic cliffs and arid plateaus of northern New Mexico".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t4-q7',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 7,
      type: 'summary_completion',
      group_header: 'Questions 1–7',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `viewed winding desert [7] …………… and cloud formations from aircraft windows in later life.`,
      options: null,
      correct_answer: 'rivers',
      academic_explanation: `Đoạn G: "Global aerial travels inspired abstract representations of sinuous rivers and cloud banks viewed from above".`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t4-q8',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 8,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Georgia O'Keeffe's artistic style was heavily swayed by fleeting European art trends.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn A: "Remarkably, she remained independent from shifting art trends and her work stayed true to her individual vision".`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t4-q9',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 9,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Alfred Stieglitz exhibited O'Keeffe's drawings without her advance permission in New York.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn B: "Without O'Keeffe's prior knowledge or consent, gallery owner Alfred Stieglitz hung her charcoal works in his 291 Gallery".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q10',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 10,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Art critics universally praised her flower paintings for their botanical scientific accuracy.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'FALSE',
      academic_explanation: `Đoạn D chỉ ra giới phê bình diễn giải tranh hoa của bà theo hướng ẩn dụ tâm lý học chứ không phải tranh minh họa thực vật học.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q11',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 11,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `O'Keeffe permanently relocated to New Mexico following the passing of Alfred Stieglitz.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'TRUE',
      academic_explanation: `Đoạn E: "Following Stieglitz's death in 1946, she made New Mexico her permanent, year-round residence".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q12',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 12,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `She preferred working with oil paint over watercolor throughout her entire artistic career.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Bài đọc đề cập việc bà vẽ cả màu dầu và màu nước nhưng không nói bà thích chất liệu nào hơn.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t4-q13',
      passage_id: 'cambridge-20-test-4-p1',
      question_number: 13,
      type: 'tfng',
      group_header: 'Questions 8–13',
      group_instruction: `Write TRUE, FALSE, or NOT GIVEN.`,
      prompt: `Failing eyesight caused her to cease all creative artistic output during her final decade.`,
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct_answer: 'NOT GIVEN',
      academic_explanation: `Đoạn G ghi nhận thị lực suy giảm nhưng bà vẫn tiếp tục sáng tác đồ gốm và nhờ người hỗ trợ vẽ tranh cho đến cuối đời.`,
      paragraph_ref: 'G'
    },
    {
      id: 'c20-t4-q14',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 14,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: `Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information?`,
      prompt: `how a type of plant functions as a natural protection for coastlines`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Đoạn D giải thích rừng ngập mặn và rặng dừa ven biển đóng vai trò giảm chấn tự nhiên trước sóng thần và triều cường.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q15',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 15,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `a prediction about how long it could take to stop noticing the effects of climate change`,
      options: null,
      correct_answer: 'A',
      academic_explanation: `Đoạn A dự báo rằng ngay cả khi phát thải dừng lại hôm nay, tác động khí hậu vẫn tiếp tục kéo dài nhiều thập kỷ.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t4-q16',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 16,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `reference to houses engineered to adjust their elevation during catastrophic floods`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Đoạn C mô tả kiến trúc lưỡng cư (amphibious houses) với móng tự nổi nâng cao nhà khi nước ngập.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q17',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 17,
      type: 'matching_info',
      group_header: 'Questions 14–17',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `an example of an ancient engineering practice being revived to manage urban runoff`,
      options: null,
      correct_answer: 'F',
      academic_explanation: `Đoạn F đề cập đến việc tái sinh hệ thống ao thấm nước cổ xưa tại Ấn Độ để giảm ngập úng đô thị.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t4-q18',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 18,
      type: 'summary_completion',
      group_header: 'Questions 18–22',
      group_instruction: `Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `Municipalities install high-capacity industrial [18] …………… to evacuate floodwaters into river estuaries.`,
      options: null,
      correct_answer: 'pumps',
      academic_explanation: `Đoạn B: "Coastal cities deploy heavy-duty stormwater pumps to rapidly discharge inundations".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q19',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 19,
      type: 'summary_completion',
      group_header: 'Questions 18–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Constructing massive concrete [19] …………… protects low-lying farmland against tidal intrusion.`,
      options: null,
      correct_answer: 'dams',
      academic_explanation: `Đoạn B: "Extensive networks of dikes, sea gates, and concrete dams shield agrarian plains".`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q20',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 20,
      type: 'summary_completion',
      group_header: 'Questions 18–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Amphibious foundations are engineered to [20] …………… vertically upon rising flood currents.`,
      options: null,
      correct_answer: 'float',
      academic_explanation: `Đoạn C: "Hollow buoyant foundations enable entire residences to float safely above floodwaters".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q21',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 21,
      type: 'summary_completion',
      group_header: 'Questions 18–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Agronomists breed resilient saline-tolerant [21] …………… to sustain rural food security.`,
      options: null,
      correct_answer: 'crops',
      academic_explanation: `Đoạn E: "Cultivating salt-resilient food crops ensures agricultural stability as sea levels penetrate aquifers".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q22',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 22,
      type: 'summary_completion',
      group_header: 'Questions 18–22',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Urban forestry initiatives plant thousands of shade-giving [22] …………… to mitigate urban heat islands.`,
      options: null,
      correct_answer: 'trees',
      academic_explanation: `Đoạn E: "Planting canopy trees along asphalt boulevards cools metropolitan centers significantly".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q23',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 23,
      type: 'matching_info',
      group_header: 'Questions 23–26',
      group_instruction: `Match each statement with the correct researcher (A: Yanira Pineda, B: Susanna Tol, C: Elizabeth English, D: Mark Saunders, E: Greg Spotts).`,
      prompt: `Advocated combining traditional wetlands restoration with civic infrastructure.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Bà Susanna Tol nhấn mạnh việc khôi phục đầm lầy tự nhiên kết hợp với công trình nhân tạo.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q24',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 24,
      type: 'matching_info',
      group_header: 'Questions 23–26',
      group_instruction: `Match each statement with the correct researcher.`,
      prompt: `Pioneered street-level thermal reflective asphalt coatings in major urban centers.`,
      options: null,
      correct_answer: 'E',
      academic_explanation: `Greg Spotts triển khai lớp sơn phản quang hạ nhiệt mặt đường tại Los Angeles.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q25',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 25,
      type: 'matching_info',
      group_header: 'Questions 23–26',
      group_instruction: `Match each statement with the correct researcher.`,
      prompt: `Monitored soil moisture sensor arrays in vulnerable high-altitude Andean communities.`,
      options: null,
      correct_answer: 'A',
      academic_explanation: `Yanira Pineda lắp đặt hệ thống cảm biến độ ẩm đất ở vùng núi cao để cảnh báo sạt lở.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q26',
      passage_id: 'cambridge-20-test-4-p2',
      question_number: 26,
      type: 'matching_info',
      group_header: 'Questions 23–26',
      group_instruction: `Match each statement with the correct researcher.`,
      prompt: `Founded the Buoyant Foundation Project to retrofit homes with amphibious foundations.`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Elizabeth English sáng lập dự án nâng cấp nhà ở truyền thống thành nhà phao tự nổi.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q27',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 27,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: `Reading Passage 3 has seven paragraphs, A–G. Which paragraph contains the following information?`,
      prompt: `an example of how one predator has been protected by the introduction of guardian dogs`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Đoạn D mô tả báo săn cheetah ở Namibia được bảo vệ khỏi bị nông dân bắn hạ nhờ chó canh cừu.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q28',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 28,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `details of the specific bonding process required between puppies and farm livestock`,
      options: null,
      correct_answer: 'G',
      academic_explanation: `Đoạn B mô tả quy trình cho chó con sống chung và gắn kết tình cảm với đàn cừu từ khi còn nhỏ.`,
      paragraph_ref: 'B'
    },
    {
      id: 'c20-t4-q29',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 29,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `historical evidence demonstrating that guardian dog lineages date back thousands of years`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Đoạn A dẫn chứng lịch sử: giống chó Anatolian và Maremma đã canh giữ gia súc từ thời Lưỡng Hà cổ đại.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t4-q30',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 30,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `economic calculations showing reductions in livestock predation losses`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `Đoạn C trình bày số liệu thống kê: đàn cừu được bảo vệ giảm tỷ lệ thiệt hại do chó sói tới trên 90%.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q31',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 31,
      type: 'matching_info',
      group_header: 'Questions 27–31',
      group_instruction: `Which paragraph contains the following information?`,
      prompt: `an explanation of how dog barks and scent marking deter carnivores without lethal conflict`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Đoạn D giải thích chó bảo hộ dùng tiếng sủa cảnh báo và đánh dấu lãnh thổ để xua đuổi thú dữ mà không cần cắn chết chúng.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q32',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 32,
      type: 'matching_info',
      group_header: 'Questions 32–36',
      group_instruction: `Match each statement with the correct person (A: Dan Macon, B: Laurie Marker, C: David Macdonald, D: Linda van Bommel, E: Ray Coppinger).`,
      prompt: `Conducted widespread surveys across Australian ranches evaluating Maremma sheepdogs.`,
      options: null,
      correct_answer: 'D',
      academic_explanation: `Linda van Bommel khảo sát quy mô lớn trên các nông trại cừu ở Úc.`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q33',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 33,
      type: 'matching_info',
      group_header: 'Questions 32–36',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Pioneered behavioral ethology studies on guardian dogs versus herding breeds.`,
      options: null,
      correct_answer: 'E',
      academic_explanation: `Ray Coppinger tiên phong nghiên cứu tập tính học phân biệt giữa chó lùa cừu và chó bảo hộ.`,
      paragraph_ref: 'A'
    },
    {
      id: 'c20-t4-q34',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 34,
      type: 'matching_info',
      group_header: 'Questions 32–36',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Established the Cheetah Conservation Fund program pairing Anatolian Shepherds with Namibian farmers.`,
      options: null,
      correct_answer: 'B',
      academic_explanation: `Laurie Marker thành lập quỹ bảo tồn báo săn và trao tặng chó chăn cừu cho nông dân Namibia.`,
      paragraph_ref: 'D'
    },
    {
      id: 'c20-t4-q35',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 35,
      type: 'matching_info',
      group_header: 'Questions 32–36',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Emphasized that non-lethal predator deterrence fosters biodiversity conservation.`,
      options: null,
      correct_answer: 'C',
      academic_explanation: `David Macdonald khẳng định bảo tồn loài ăn thịt đầu chuỗi bằng biện pháp phi bạo lực là chìa khóa duy trì hệ sinh thái.`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q36',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 36,
      type: 'matching_info',
      group_header: 'Questions 32–36',
      group_instruction: `Match each statement with the correct person.`,
      prompt: `Stated that managing guardian dogs requires ongoing commitment and proper livestock socialization.`,
      options: null,
      correct_answer: 'A',
      academic_explanation: `Dan Macon nhấn mạnh việc nuôi dạy chó bảo vệ đòi hỏi sự kiên nhẫn và gắn kết bầy đàn liên tục.`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t4-q37',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 37,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: `Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.`,
      prompt: `Guardian dogs prevent attacks by opportunist predators such as wild [37] …………… in grazing pastures.`,
      options: null,
      correct_answer: 'jackals',
      academic_explanation: `Đoạn C: "Deploying guardian dogs dramatically curtailed attacks by wolves, caracals, and jackals".`,
      paragraph_ref: 'C'
    },
    {
      id: 'c20-t4-q38',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 38,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Veterinary care is essential to ensure working dogs do not spread infectious [38] …………… to wild carnivores.`,
      options: null,
      correct_answer: 'diseases',
      academic_explanation: `Đoạn E: "Routine vaccination prevents domestic working dogs from transmitting canine diseases to endangered wild predators".`,
      paragraph_ref: 'E'
    },
    {
      id: 'c20-t4-q39',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 39,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `Farmers must supply adequate [39] …………… so dogs do not abandon their post to scavenge.`,
      options: null,
      correct_answer: 'food',
      academic_explanation: `Đoạn F: "Providing sufficient nutritional food ensures the dogs remain loyal to the livestock herd rather than wandering".`,
      paragraph_ref: 'F'
    },
    {
      id: 'c20-t4-q40',
      passage_id: 'cambridge-20-test-4-p3',
      question_number: 40,
      type: 'summary_completion',
      group_header: 'Questions 37–40',
      group_instruction: `Choose ONE WORD ONLY.`,
      prompt: `On small islands, guardian dogs successfully deter predatory [40] …………… from invading seabird breeding colonies.`,
      options: null,
      correct_answer: 'foxes',
      academic_explanation: `Đoạn G: "On Middle Island, Maremma dogs successfully protected little penguin rookeries from introduced red foxes".`,
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

  console.log('✅ Hoàn tất nạp Cambridge 20 - Test 4 (3 Passages, 40 Questions)');
}

module.exports = seedTest4;
