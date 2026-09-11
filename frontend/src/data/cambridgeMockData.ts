import {
  CambridgeReadingPassage,
  CambridgeListeningTest,
  AnkiDeck,
  AnkiCard,
} from '../types';

// ================= CAMBRIDGE & ACTUAL TESTS READING PASSAGES ================= //

export const mockReadingPassages: CambridgeReadingPassage[] = [
  {
    id: 'cambridge-18-test-2-p2',
    source: 'Cambridge 18 Test 2',
    sourceType: 'cambridge',
    passageNumber: 2,
    title: 'The Desirable Discipline of Architecture',
    subtitle: 'Khảo cứu sự dung hòa giữa nghệ thuật bản địa và quy chuẩn kết cấu đương đại',
    topic: 'Kiến Trúc & Đô Thị',
    level: 'Passage 2 (Trung cấp)',
    estimatedMinutes: 20,
    wordCount: 890,
    paragraphs: [
      {
        letter: 'A',
        text: 'In an era dominated by rapid urbanisation and mass-produced concrete towers, architecture has increasingly emerged not merely as an aesthetic endeavour, but as a rigorous social and ecological science. Scholars argue that the spaces humans inhabit dictate not only their psychological equilibrium but also their broader civic participation. Contemporary practitioners are therefore confronted with a profound imperative: to balance visual elegance with structural integrity and environmental sustainability.',
      },
      {
        letter: 'B',
        text: 'The historical dichotomy between vernacular craftsmanship and industrial efficiency has long sparked debate among urban planners. Vernacular traditions, refined over centuries of geographical adaptation, inherently embody climatic intelligence—employing passive ventilation, local timber, and thermal mass. In contrast, twentieth-century modernist paradigms frequently prioritised standardised materials, leading to monotonous urban landscapes that consume exorbitant amounts of energy for heating and artificial cooling.',
      },
      {
        letter: 'C',
        text: 'Modern pedagogical institutions have begun restructuring their curricula to integrate computational simulations with sustainable vernacular philosophies. Students no longer simply sketch monumental facades; they calculate thermal mass, ventilation dynamics, and lifecycle carbon emissions. This interdisciplinary approach equips aspiring architects with the empirical tools necessary to design structures that are visually striking yet ecologically benign.',
      },
      {
        letter: 'D',
        text: 'Furthermore, the psychological impact of built environments on human cognition is gaining empirical validation. Neuro-architectural studies demonstrate that exposure to natural light and ergonomic spaces substantially diminishes cognitive fatigue and elevates workplace productivity. Conversely, windowless environments and fragmented layouts correlate with elevated cortisol levels and diminished focus among corporate occupants.',
      },
      {
        letter: 'E',
        text: 'Critics argue that enforcing stringent sustainable standards may escalate initial capital expenditures, potentially alienating low-income municipalities. However, longitudinal analyses consistently reveal that energy-neutral buildings amortise their initial premiums within eight to twelve years through reduced operational overheads. The transition toward climate-resilient architecture is thus not a philanthropic luxury, but a fiscally prudent investment.',
      },
      {
        letter: 'F',
        text: 'Ultimately, architecture in the twenty-first century demands a holistic synthesis of historical wisdom and technological innovation. It is an enduring testament to humanity\'s collective aspirations—an art form whose enduring relevance lies in its capacity to shelter, inspire, and sustain civilisations across generations.',
      },
    ],
    targetWords: [
      {
        id: 'tw-aesthetic',
        word: 'aesthetic',
        partOfSpeech: 'adjective',
        ipa: '/esˈθet.ɪk/',
        definitionVi: 'Thuộc về thẩm mỹ, tính nghệ thuật thị giác',
        definitionEn: 'Concerned with beauty or the appreciation of beauty.',
        collocations: ['aesthetic endeavour', 'aesthetic appeal', 'aesthetic judgment'],
        contextSentence: 'Architecture has emerged not merely as an aesthetic endeavour, but as an ecological science.',
        explanation: 'Thường dùng trong IELTS Reading/Writing Band 7.5+ khi bình luận về nghệ thuật kiến trúc so với tính công năng thực tiễn.',
      },
      {
        id: 'tw-vernacular',
        word: 'vernacular',
        partOfSpeech: 'adjective',
        ipa: '/vɚˈnæk.jə.lɚ/',
        definitionVi: 'Thuộc về kiến trúc bản địa, truyền thống dân gian',
        definitionEn: 'Architecture concerned with domestic and functional rather than monumental buildings, native to a region.',
        collocations: ['vernacular craftsmanship', 'vernacular traditions', 'vernacular architecture'],
        contextSentence: 'The historical dichotomy between vernacular craftsmanship and industrial efficiency has long sparked debate.',
        explanation: 'Thuật ngữ học thuật chỉ phong cách xây dựng hoặc vật liệu thích nghi tự nhiên của một địa phương cụ thể.',
      },
      {
        id: 'tw-integrity',
        word: 'structural integrity',
        partOfSpeech: 'phrase',
        ipa: '/ˈstrʌk.tʃɚ.əl ɪnˈteɡ.rə.t̬i/',
        definitionVi: 'Độ toàn vẹn và vững chãi của kết cấu công trình',
        definitionEn: 'The ability of a structure to withstand its intended loading without failure or collapse.',
        collocations: ['maintain structural integrity', 'compromise structural integrity', 'ensure structural integrity'],
        contextSentence: 'To balance visual elegance with structural integrity and environmental sustainability.',
        explanation: 'Cụm Collocation chuẩn trong các bài đọc Kỹ thuật xây dựng & Vật lý kiến trúc của Cambridge IELTS.',
      },
      {
        id: 'tw-pedagogical',
        word: 'pedagogical',
        partOfSpeech: 'adjective',
        ipa: '/ˌped.əˈɡɑː.dʒɪ.kəl/',
        definitionVi: 'Thuộc về giáo dục, giảng dạy và sư phạm học',
        definitionEn: 'Relating to the methods and theory of teaching.',
        collocations: ['pedagogical institutions', 'pedagogical approach', 'pedagogical methods'],
        contextSentence: 'Modern pedagogical institutions have begun restructuring their curricula.',
        explanation: 'Từ vựng C2 nâng cấp cho "educational", rất phổ biến trong các chủ đề Giáo dục và Đại học.',
      },
      {
        id: 'tw-monumental',
        word: 'monumental',
        partOfSpeech: 'adjective',
        ipa: '/ˌmɑːn.jəˈmen.t̬əl/',
        definitionVi: 'Đồ sộ, hoành tráng, có tầm vóc lịch sử to lớn',
        definitionEn: 'Great in importance, extent, or size; monumental buildings are imposing and permanent.',
        collocations: ['monumental facades', 'monumental architecture', 'monumental achievement'],
        contextSentence: 'Students no longer simply sketch monumental facades without environmental calculation.',
        explanation: 'Miêu tả quy mô to lớn nhưng thường được đặt trong thế đối lập với tính thân thiện môi trường.',
      },
      {
        id: 'tw-ergonomic',
        word: 'ergonomic',
        partOfSpeech: 'adjective',
        ipa: '/ˌɝː.ɡəˈnɑː.mɪk/',
        definitionVi: 'Tiện dụng, tối ưu hóa công thái học theo thể trạng con người',
        definitionEn: 'Designed to minimize physical effort and discomfort, thereby maximizing efficiency.',
        collocations: ['ergonomic spaces', 'ergonomic design', 'ergonomic workstation'],
        contextSentence: 'Studies demonstrate that exposure to natural light and ergonomic spaces substantially diminishes cognitive fatigue.',
        explanation: 'Thuật ngữ quen thuộc trong thiết kế nội thất và khoa học hành vi văn phòng.',
      },
    ],
    questions: [
      // --- GROUP 1: QUESTIONS 1-6 (TRUE / FALSE / NOT GIVEN) ---
      {
        id: 'q-cam18-1',
        number: 1,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
        question: 'Vernacular building traditions originally developed without consideration of local climate conditions.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn B chỉ rõ: "Vernacular traditions, refined over centuries of geographical adaptation, inherently embody climatic intelligence" (mang sẵn sự thông thái về khí hậu do thích nghi địa lý qua nhiều thế kỷ).',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-cam18-2',
        number: 2,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Twentieth-century modernist architecture placed greater priority on standardized materials than on regional climate.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn B khẳng định: "twentieth-century modernist paradigms frequently prioritised standardised materials, leading to monotonous urban landscapes that consume exorbitant amounts of energy".',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-cam18-3',
        number: 3,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Modern architectural education prioritises exterior appearance over ecological performance.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn C nêu: "Students no longer simply sketch monumental facades; they calculate thermal mass, ventilation dynamics, and lifecycle carbon emissions".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam18-4',
        number: 4,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Low-income municipalities receive government subsidies to offset the initial costs of sustainable buildings.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'NOT GIVEN',
        explanation: 'Đoạn E có nhắc đến nỗi lo chi phí ban đầu cao ("potentially alienating low-income municipalities"), nhưng hoàn toàn không có thông tin về việc chính phủ trợ cấp kinh phí (government subsidies).',
        referenceParagraph: 'Đoạn E',
      },
      {
        id: 'q-cam18-5',
        number: 5,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Neuro-architectural research demonstrates that exposure to natural lighting helps alleviate mental exhaustion.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn D nêu: "Neuro-architectural studies demonstrate that exposure to natural light and ergonomic spaces substantially diminishes cognitive fatigue". "Diminishes cognitive fatigue" đồng nghĩa với "alleviate mental exhaustion".',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-cam18-6',
        number: 6,
        type: 'tfng',
        groupHeader: 'Questions 1–6',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Architectural companies face legal penalties if their newly built properties exceed carbon emission quotas.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'NOT GIVEN',
        explanation: 'Bài đọc chỉ thảo luận về chi phí đầu tư và tính toán phát thải trong đào tạo, không có bất kỳ thông tin nào về hình phạt pháp lý (legal penalties).',
        referenceParagraph: 'Đoạn E',
      },

      // --- GROUP 2: QUESTIONS 7-9 (MATCHING INFORMATION TO PARAGRAPHS A-F) ---
      {
        id: 'q-cam18-7',
        number: 7,
        type: 'matching_info',
        groupHeader: 'Questions 7–9',
        groupInstruction: 'Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        question: 'A description of how modern academic courses incorporate digital simulations into technical design training.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'C',
        explanation: 'Đoạn C giải thích: "Modern pedagogical institutions have begun restructuring their curricula to integrate computational simulations with sustainable vernacular philosophies".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam18-8',
        number: 8,
        type: 'matching_info',
        groupHeader: 'Questions 7–9',
        groupInstruction: 'Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        question: 'An explanation of the physiological consequences of working in windowless and partitioned rooms.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'D',
        explanation: 'Đoạn D phân tích: "windowless environments and fragmented layouts correlate with elevated cortisol levels and diminished focus among corporate occupants".',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-cam18-9',
        number: 9,
        type: 'matching_info',
        groupHeader: 'Questions 7–9',
        groupInstruction: 'Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F.',
        question: 'The specific timeframe required for environmentally neutral buildings to recover their upfront financial investment.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'E',
        explanation: 'Đoạn E chỉ rõ: "longitudinal analyses consistently reveal that energy-neutral buildings amortise their initial premiums within eight to twelve years".',
        referenceParagraph: 'Đoạn E',
      },

      // --- GROUP 3: QUESTIONS 10-13 (SUMMARY COMPLETION / FILL IN BLANKS) ---
      {
        id: 'q-cam18-10',
        number: 10,
        type: 'summary_completion',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 10–13.',
        question: 'Historically, vernacular techniques were perfected through centuries of ______________ to local weather conditions.',
        correctAnswer: 'geographical adaptation',
        acceptableAnswers: ['geographical adaptation'],
        explanation: 'Đoạn B khẳng định: "Vernacular traditions, refined over centuries of geographical adaptation, inherently embody climatic intelligence". Từ cần điền: "geographical adaptation".',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-cam18-11',
        number: 11,
        type: 'summary_completion',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 10–13.',
        question: 'Rather than solely sketching facades, architectural students now calculate dynamic ventilation and lifecycle ______________.',
        correctAnswer: 'carbon emissions',
        acceptableAnswers: ['carbon emissions', 'carbon emission'],
        explanation: 'Đoạn C nêu: "they calculate thermal mass, ventilation dynamics, and lifecycle carbon emissions". Từ cần điền: "carbon emissions".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam18-12',
        number: 12,
        type: 'summary_completion',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 10–13.',
        question: 'Worker productivity is bolstered when indoor offices feature natural illumination and ______________.',
        correctAnswer: 'ergonomic spaces',
        acceptableAnswers: ['ergonomic spaces', 'ergonomic space'],
        explanation: 'Đoạn D chỉ ra: "exposure to natural light and ergonomic spaces substantially diminishes cognitive fatigue and elevates workplace productivity". Từ cần điền: "ergonomic spaces".',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-cam18-13',
        number: 13,
        type: 'summary_completion',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 10–13.',
        question: 'Longitudinal financial reviews show that climate-resilient construction is ultimately a ______________ rather than a luxury.',
        correctAnswer: 'prudent investment',
        acceptableAnswers: ['prudent investment', 'fiscally prudent investment'],
        explanation: 'Đoạn E kết luận: "The transition toward climate-resilient architecture is thus not a philanthropic luxury, but a fiscally prudent investment". Từ cần điền: "prudent investment" (hoặc "fiscally prudent investment").',
        referenceParagraph: 'Đoạn E',
      },
    ],
  },
  {
    id: 'actual-tests-vol-5-p1',
    source: 'Recent Actual Tests Vol 5',
    sourceType: 'actual_test',
    passageNumber: 1,
    title: 'Urban Vertical Farming in High-Density Megacities',
    subtitle: 'Giải pháp nông nghiệp công nghệ cao khắc phục khủng hoảng chuỗi cung ứng thực phẩm',
    topic: 'Môi Trường Sinh Thái',
    level: 'Passage 1 (Cơ bản)',
    estimatedMinutes: 18,
    wordCount: 780,
    paragraphs: [
      {
        letter: 'A',
        text: 'By the year 2050, nearly 70 percent of the world\'s population is projected to reside in metropolitan regions. This unprecedented demographic shift poses severe logistical hurdles for conventional agriculture, which already utilizes 80 percent of cultivated arable land globally. Transporting fresh agricultural commodities across vast intercontinental distribution corridors incurs substantial fuel costs and generates colossal greenhouse gas emissions.',
      },
      {
        letter: 'B',
        text: 'Vertical farming has emerged as a disruptive technological antidote to these geographic constraints. By stacking nutrient-rich cultivation trays inside climate-controlled urban warehouses, cultivators can yield crops continuously throughout all four seasons. Modern setups employ closed-loop hydroponic and aeroponic systems that recycle up to 95 percent of irrigation water compared to conventional soil farming.',
      },
      {
        letter: 'C',
        text: 'A pivotal technical advantage of vertical agriculture is the complete elimination of synthetic pesticides and chemical fertilizers. Protected from erratic meteorological shifts and insect infestations, urban crops thrive in sterile, bio-secure chambers. Furthermore, utilizing localized LED spectrums tailored to photosynthesis accelerates maturation cycles by up to 40 percent.',
      },
      {
        letter: 'D',
        text: 'Nonetheless, scalability remains hindered by high electricity expenditures. Powering extensive LED arrays and continuous air-circulation units requires substantial energy, often offsetting carbon savings if sourced from fossil-fuel grids. Engineers are currently pioneering integration with rooftop solar photovoltaic cells and micro-wind turbines to establish autonomous energy ecosystems.',
      },
      {
        letter: 'E',
        text: 'In conclusion, while vertical farming will not entirely supersede traditional broadacre farming for staple grains, its contribution to urban food resilience, hyper-local nutrition, and land preservation makes it an indispensable cornerstone of sustainable twenty-first-century city development.',
      },
    ],
    targetWords: [
      {
        id: 'tw-arable',
        word: 'arable',
        partOfSpeech: 'adjective',
        ipa: '/ˈer.ə.bəl/',
        definitionVi: 'Có thể canh tác được, đất màu mỡ trồng trọt',
        definitionEn: 'Suitable for growing crops.',
        collocations: ['arable land', 'arable farming', 'preserve arable soil'],
        contextSentence: 'Conventional agriculture utilizes 80 percent of cultivated arable land globally.',
        explanation: 'Từ vựng cốt lõi trong chủ đề Nông nghiệp và Tài nguyên thiên nhiên.',
      },
      {
        id: 'tw-hydroponic',
        word: 'hydroponic',
        partOfSpeech: 'adjective',
        ipa: '/ˌhaɪ.drəˈpɑː.nɪk/',
        definitionVi: 'Phương pháp thủy canh (trồng cây trong dung dịch dinh dưỡng)',
        definitionEn: 'Growing plants in nutrient-rich solutions instead of soil.',
        collocations: ['hydroponic systems', 'hydroponic cultivation', 'hydroponic greenhouse'],
        contextSentence: 'Modern setups employ closed-loop hydroponic and aeroponic systems.',
        explanation: 'Công nghệ then chốt của nông nghiệp đô thị công nghệ cao.',
      },
      {
        id: 'tw-scalability',
        word: 'scalability',
        partOfSpeech: 'noun',
        ipa: '/ˌskeɪ.ləˈbɪl.ə.t̬i/',
        definitionVi: 'Khả năng mở rộng quy mô sản xuất',
        definitionEn: 'The capacity to be changed in size or scale, especially to handle growing demand.',
        collocations: ['scalability challenges', 'ensure scalability', 'commercial scalability'],
        contextSentence: 'Nonetheless, scalability remains hindered by high electricity expenditures.',
        explanation: 'Thuật ngữ xuất hiện nhiều trong cả kinh tế học lẫn kỹ thuật.',
      },
      {
        id: 'tw-synthetic',
        word: 'synthetic',
        partOfSpeech: 'adjective',
        ipa: '/sɪnˈθet̬.ɪk/',
        definitionVi: 'Tổng hợp nhân tạo, hóa học',
        definitionEn: 'Made by chemical synthesis, especially not of natural origin.',
        collocations: ['synthetic pesticides', 'synthetic fertilizers', 'synthetic materials'],
        contextSentence: 'A pivotal technical advantage is the complete elimination of synthetic pesticides.',
        explanation: 'Trái nghĩa với "organic" hoặc "natural".',
      },
    ],
    questions: [
      // --- GROUP 1: QUESTIONS 1-5 (TRUE / FALSE / NOT GIVEN) ---
      {
        id: 'q-vol5-1',
        number: 1,
        type: 'tfng',
        groupHeader: 'Questions 1–5',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–5 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'By 2050, more than half of the world\'s population is projected to reside in metropolitan areas.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn A nêu: "By the year 2050, nearly 70 percent of the world\'s population is projected to reside in metropolitan regions". 70% vượt quá một nửa (more than half).',
        referenceParagraph: 'Đoạn A',
      },
      {
        id: 'q-vol5-2',
        number: 2,
        type: 'tfng',
        groupHeader: 'Questions 1–5',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–5 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Vertical farming setups consume more fresh water than traditional agriculture due to automated pumps.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn B khẳng định hệ thống tái chế tới 95% lượng nước ("recycle up to 95 percent of irrigation water compared to conventional soil farming"), tức là tiết kiệm nước vượt trội.',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-vol5-3',
        number: 3,
        type: 'tfng',
        groupHeader: 'Questions 1–5',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–5 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Crops grown in vertical facilities are susceptible to standard weather hazards and insect pests.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn C chỉ ra: "Protected from erratic meteorological shifts and insect infestations, urban crops thrive in sterile, bio-secure chambers".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-vol5-4',
        number: 4,
        type: 'tfng',
        groupHeader: 'Questions 1–5',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–5 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'The electricity used by commercial vertical farms is currently sourced exclusively from green renewable sources.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn D lưu ý năng lượng "often offsetting carbon savings if sourced from fossil-fuel grids", và các kỹ sư mới đang tiên phong thử nghiệm điện mặt trời và turbine gió.',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-vol5-5',
        number: 5,
        type: 'tfng',
        groupHeader: 'Questions 1–5',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–5 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Supermarket consumers prefer conventionally farmed vegetables over vertically produced alternatives.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'NOT GIVEN',
        explanation: 'Bài đọc không cung cấp bất kỳ dữ liệu nào về thị hiếu hay sự ưa chuộng của người tiêu dùng tại siêu thị.',
        referenceParagraph: 'Đoạn E',
      },

      // --- GROUP 2: QUESTIONS 6-9 (SUMMARY COMPLETION) ---
      {
        id: 'q-vol5-6',
        number: 6,
        type: 'summary_completion',
        groupHeader: 'Questions 6–9',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 6–9.',
        question: 'Metropolitan expansion is increasingly straining conventional agriculture, which already utilizes the majority of worldwide ______________.',
        correctAnswer: 'arable land',
        acceptableAnswers: ['arable land', 'cultivated arable land'],
        explanation: 'Đoạn A nêu: "conventional agriculture, which already utilizes 80 percent of cultivated arable land globally". Từ cần điền: "arable land".',
        referenceParagraph: 'Đoạn A',
      },
      {
        id: 'q-vol5-7',
        number: 7,
        type: 'summary_completion',
        groupHeader: 'Questions 6–9',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 6–9.',
        question: 'Cultivators manage continuous multi-season harvests by stacking trays within climate-controlled ______________.',
        correctAnswer: 'urban warehouses',
        acceptableAnswers: ['urban warehouses', 'warehouses'],
        explanation: 'Đoạn B khẳng định: "By stacking nutrient-rich cultivation trays inside climate-controlled urban warehouses...". Từ cần điền: "urban warehouses" (hoặc "warehouses").',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-vol5-8',
        number: 8,
        type: 'summary_completion',
        groupHeader: 'Questions 6–9',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 6–9.',
        question: 'Photosynthetic crop cycles can be accelerated up to forty percent using custom ______________.',
        correctAnswer: 'LED spectrums',
        acceptableAnswers: ['LED spectrums', 'localized LED spectrums'],
        explanation: 'Đoạn C chỉ ra: "utilizing localized LED spectrums tailored to photosynthesis accelerates maturation cycles by up to 40 percent". Từ cần điền: "LED spectrums".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-vol5-9',
        number: 9,
        type: 'summary_completion',
        groupHeader: 'Questions 6–9',
        groupInstruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 6–9.',
        question: 'The commercial scaling of vertical farming is currently restrained by enormous ______________.',
        correctAnswer: 'electricity expenditures',
        acceptableAnswers: ['electricity expenditures', 'electricity expenditure'],
        explanation: 'Đoạn D nhấn mạnh: "scalability remains hindered by high electricity expenditures". Từ cần điền: "electricity expenditures".',
        referenceParagraph: 'Đoạn D',
      },

      // --- GROUP 3: QUESTIONS 10-13 (MULTIPLE CHOICE) ---
      {
        id: 'q-vol5-10',
        number: 10,
        type: 'multiple_choice',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Choose the correct letter, A, B, C or D. Write your answers in boxes 10–13 on your answer sheet.',
        question: 'According to Paragraph B, what distinguishes closed-loop hydroponics from soil-based farming?',
        options: [
          { id: 'opt-a', label: 'A', text: 'It requires specialized heavy machinery imported from abroad.' },
          { id: 'opt-b', label: 'B', text: 'It recovers and recirculates up to 95 percent of irrigation water.' },
          { id: 'opt-c', label: 'C', text: 'It cannot operate during cold winter months.' },
          { id: 'opt-d', label: 'D', text: 'It produces higher volumes of agricultural runoff.' },
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn B nêu rõ hệ thống: "recycle up to 95 percent of irrigation water compared to conventional soil farming".',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-vol5-11',
        number: 11,
        type: 'multiple_choice',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Choose the correct letter, A, B, C or D.',
        question: 'What ecological benefit of vertical cultivation is highlighted in Paragraph C?',
        options: [
          { id: 'opt-a', label: 'A', text: 'The complete exclusion of synthetic chemicals and insecticides.' },
          { id: 'opt-b', label: 'B', text: 'The creation of new natural habitats for migratory bees.' },
          { id: 'opt-c', label: 'C', text: 'The absorption of city smog through open ventilation ducts.' },
          { id: 'opt-d', label: 'D', text: 'The rapid decomposition of plastic growing containers.' },
        ],
        correctAnswer: 'A',
        explanation: 'Đoạn C: "A pivotal technical advantage of vertical agriculture is the complete elimination of synthetic pesticides and chemical fertilizers".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-vol5-12',
        number: 12,
        type: 'multiple_choice',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Choose the correct letter, A, B, C or D.',
        question: 'How are engineers attempting to make vertical farms self-sufficient in Paragraph D?',
        options: [
          { id: 'opt-a', label: 'A', text: 'By converting leftover plant waste into coal pellets.' },
          { id: 'opt-b', label: 'B', text: 'By tapping into thermal heat vents situated deep underground.' },
          { id: 'opt-c', label: 'C', text: 'By relying exclusively on passive solar heat through glass roofs.' },
          { id: 'opt-d', label: 'D', text: 'By combining rooftop solar panels with miniature wind generators.' },
        ],
        correctAnswer: 'D',
        explanation: 'Đoạn D: "Engineers are currently pioneering integration with rooftop solar photovoltaic cells and micro-wind turbines".',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-vol5-13',
        number: 13,
        type: 'multiple_choice',
        groupHeader: 'Questions 10–13',
        groupInstruction: 'Choose the correct letter, A, B, C or D.',
        question: 'What realistic role does the author outline for vertical agriculture in the concluding paragraph?',
        options: [
          { id: 'opt-a', label: 'A', text: 'It will soon displace all outdoor wheat and rice farming globally.' },
          { id: 'opt-b', label: 'B', text: 'It will remain an experimental hobby restricted to university laboratories.' },
          { id: 'opt-c', label: 'C', text: 'It acts as an essential pillar for local urban resilience alongside traditional farming.' },
          { id: 'opt-d', label: 'D', text: 'It is expected to decline as fossil-fuel prices fluctuate.' },
        ],
        correctAnswer: 'C',
        explanation: 'Đoạn E khẳng định: "while vertical farming will not entirely supersede traditional broadacre farming for staple grains, its contribution to urban food resilience... makes it an indispensable cornerstone".',
        referenceParagraph: 'Đoạn E',
      },
    ],
  },

  // --- PASSAGE 3: CAMBRIDGE 19 TEST 1 (14 QUESTIONS) ---
  {
    id: 'cambridge-19-test-1-p1',
    source: 'Cambridge 19 Test 1',
    sourceType: 'cambridge',
    passageNumber: 1,
    title: 'The Secret Life of Urban Rewilding',
    subtitle: 'Nghiên cứu quá trình tái thiết sinh thái tự nhiên giữa lòng các siêu đô thị hiện đại',
    topic: 'Môi Trường Sinh Thái',
    level: 'Passage 1 (Cơ bản)',
    estimatedMinutes: 20,
    wordCount: 820,
    paragraphs: [
      {
        letter: 'A',
        text: 'Urban rewilding represents a radical paradigm shift in municipal landscape management. Rather than curating manicured lawns and ornamental floral borders that demand relentless irrigation and weedkillers, progressive city planners are consciously relinquishing control. By allowing native vegetation to reclaim derelict railway sidings, canal verges, and vacant lots, municipalities are witnessing an astonishing resurgence of indigenous biodiversity.',
      },
      {
        letter: 'B',
        text: 'The ecological benefits of this hands-off approach are both immediate and multifaceted. Spontaneous floral succession fosters intricate micro-ecosystems that provide vital refuges for endangered pollinators like solitary bees and hoverflies. Furthermore, the root systems of unmanaged perennial grasses possess superior water-retention capabilities, mitigating flash flooding risks during torrential monsoon downpours far more effectively than concrete drainage channels.',
      },
      {
        letter: 'C',
        text: 'Despite these tangible environmental windfalls, urban rewilding initiatives frequently collide with entrenched cultural perceptions of civic tidiness. Many suburban residents equate overgrown weeds and unkempt brush with municipal neglect, expressing anxieties over lowered real estate valuations and rodent infestations. In response, landscape architects have developed the concept of "cues to care"—incorporating clean-mown perimeters, rustic wooden fences, and interpretive botanical placards to signal deliberate stewardship.',
      },
      {
        letter: 'D',
        text: 'The psychological dividends for human inhabitants are equally profound. Environmental psychologists have established that unstructured wild greenery exerts a significantly greater restorative effect on human attentional faculties than sterile municipal parks. Residents living adjacent to rewilded corridors report marked reductions in chronic stress biomarkers and a heightened sense of community cohesion.',
      },
      {
        letter: 'E',
        text: 'However, urban rewilding is not merely about abandonment; it requires scientific baseline monitoring. In Singapore and Berlin, conservation biologists utilise automated acoustic bio-loggers to record bird and bat echolocations, tracking ecological recolonisation with minute precision. This empirical data enables ecologists to prevent invasive botanical species from choking out vulnerable endemic flora.',
      },
      {
        letter: 'F',
        text: 'Looking forward, integrating wild corridors across concrete landscapes offers humanity a viable blueprint for climate coexistence. By acknowledging nature as an active collaborator rather than a subordinate element to be suppressed, twenty-first-century cities can evolve into vibrant, biodiverse sanctuaries.',
      },
    ],
    targetWords: [
      {
        id: 'tw-relinquish',
        word: 'relinquish',
        partOfSpeech: 'verb',
        ipa: '/rɪˈlɪŋ.kwɪʃ/',
        definitionVi: 'Từ bỏ, buông tay kiểm soát, nhượng lại quyền',
        definitionEn: 'Voluntarily cease to keep or claim; give up.',
        collocations: ['relinquish control', 'relinquish responsibility', 'relinquish authority'],
        contextSentence: 'Progressive city planners are consciously relinquishing control over manicured landscapes.',
        explanation: 'Động từ C2 thường gặp trong IELTS Reading khi nói về chính sách hoặc quyền lực.',
      },
      {
        id: 'tw-biodiversity',
        word: 'biodiversity',
        partOfSpeech: 'noun',
        ipa: '/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/',
        definitionVi: 'Đa dạng sinh học, tính phong phú loài sinh thái',
        definitionEn: 'The variety of plant and animal life in the world or in a particular habitat.',
        collocations: ['indigenous biodiversity', 'preserve biodiversity', 'loss of biodiversity'],
        contextSentence: 'Municipalities are witnessing an astonishing resurgence of indigenous biodiversity.',
        explanation: 'Từ vựng cốt lõi trong mọi bài thi IELTS liên quan đến sinh thái học.',
      },
      {
        id: 'tw-entrenched',
        word: 'entrenched',
        partOfSpeech: 'adjective',
        ipa: '/ɪnˈtrentʃt/',
        definitionVi: 'Ăn sâu bám rễ, thâm căn cố đế khó lay chuyển',
        definitionEn: 'Habit or belief firmly established and difficult or unlikely to change.',
        collocations: ['entrenched perceptions', 'entrenched beliefs', 'deeply entrenched'],
        contextSentence: 'Urban rewilding initiatives frequently collide with entrenched cultural perceptions of civic tidiness.',
        explanation: 'Tính từ học thuật C1-C2 miêu tả quan niệm hay định kiến khó đổi thay.',
      },
      {
        id: 'tw-stewardship',
        word: 'stewardship',
        partOfSpeech: 'noun',
        ipa: '/ˈstuː.ɚd.ʃɪp/',
        definitionVi: 'Sự quản lý bảo tồn có trách nhiệm, vai trò người trông coi',
        definitionEn: 'The job of supervising or taking care of something, such as an organization or natural environment.',
        collocations: ['environmental stewardship', 'deliberate stewardship', 'responsible stewardship'],
        contextSentence: 'Clean-mown borders and placards signal deliberate stewardship to local residents.',
        explanation: 'Thuật ngữ phổ biến trong các nghị trình phát triển bền vững và quản trị tài nguyên.',
      },
    ],
    questions: [
      // --- GROUP 1: QUESTIONS 1-7 (TRUE / FALSE / NOT GIVEN) ---
      {
        id: 'q-cam19-1',
        number: 1,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Traditional municipal landscaping typically relies heavily on weedkillers and artificial watering.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn A nêu: "manicured lawns and ornamental floral borders that demand relentless irrigation and weedkillers".',
        referenceParagraph: 'Đoạn A',
      },
      {
        id: 'q-cam19-2',
        number: 2,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Concrete storm drains absorb torrential rainwater more efficiently than wild perennial roots.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn B khẳng định rễ cỏ dại: "possess superior water-retention capabilities, mitigating flash flooding risks... far more effectively than concrete drainage channels".',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-cam19-3',
        number: 3,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Some urban citizens express concern that unkempt foliage could attract unwanted pests like rodents.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn C nhắc đến: "expressing anxieties over lowered real estate valuations and rodent infestations".',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam19-4',
        number: 4,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Local city councils in Berlin offer financial tax rebates to households that rewild their gardens.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'NOT GIVEN',
        explanation: 'Đoạn E có nhắc đến các nhà sinh học ở Berlin dùng thiết bị ghi âm sinh học tự động, nhưng không có thông tin về việc giảm thuế (tax rebates).',
        referenceParagraph: 'Đoạn E',
      },
      {
        id: 'q-cam19-5',
        number: 5,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Unstructured natural spaces provide greater restorative psychological benefits than formal city parks.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'TRUE',
        explanation: 'Đoạn D chỉ ra: "unstructured wild greenery exerts a significantly greater restorative effect on human attentional faculties than sterile municipal parks".',
        referenceParagraph: 'Đoạn D',
      },
      {
        id: 'q-cam19-6',
        number: 6,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Bio-loggers in Singapore are operated manually by citizen volunteers during night hours.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn E ghi rõ thiết bị là "automated acoustic bio-loggers" (tự động hóa), không phải do tình nguyện viên vận hành thủ công.',
        referenceParagraph: 'Đoạn E',
      },
      {
        id: 'q-cam19-7',
        number: 7,
        type: 'tfng',
        groupHeader: 'Questions 1–7',
        groupInstruction: 'Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7 on your answer sheet, choose TRUE, FALSE, or NOT GIVEN.',
        question: 'Urban rewilding completely eliminates the possibility of non-native plant species colonising city spaces.',
        options: [
          { id: 'opt-t', label: 'TRUE', text: 'Thông tin hoàn toàn trùng khớp với bài đọc' },
          { id: 'opt-f', label: 'FALSE', text: 'Thông tin đối lập trực tiếp với bài đọc' },
          { id: 'opt-ng', label: 'NOT GIVEN', text: 'Thông tin không được đề cập trong bài đọc' },
        ],
        correctAnswer: 'FALSE',
        explanation: 'Đoạn E cảnh báo nguy cơ các loài ngoại lai xâm hại có thể bóp nghẹt thực vật bản địa nếu không theo dõi dữ liệu ("prevent invasive botanical species from choking out vulnerable endemic flora").',
        referenceParagraph: 'Đoạn E',
      },

      // --- GROUP 2: QUESTIONS 8-11 (MATCHING INFORMATION TO PARAGRAPHS A-F) ---
      {
        id: 'q-cam19-8',
        number: 8,
        type: 'matching_info',
        groupHeader: 'Questions 8–11',
        groupInstruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F in boxes 8–11.',
        question: 'A reference to specific design strategies used to demonstrate that wild corridors are purposefully maintained.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'C',
        explanation: 'Đoạn C giải thích khái niệm "cues to care" với hàng rào mộc mạc và biển chú thích thực vật để báo hiệu sự quản lý có chủ đích.',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam19-9',
        number: 9,
        type: 'matching_info',
        groupHeader: 'Questions 8–11',
        groupInstruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information?',
        question: 'An outline of the hydrological benefits of unmanaged perennial grasses during severe rainfall.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn B mô tả khả năng trữ nước của bộ rễ giúp giảm thiểu nguy cơ lũ quét khi mưa lớn ("mitigating flash flooding risks during torrential monsoon downpours").',
        referenceParagraph: 'Đoạn B',
      },
      {
        id: 'q-cam19-10',
        number: 10,
        type: 'matching_info',
        groupHeader: 'Questions 8–11',
        groupInstruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information?',
        question: 'The empirical methods employed by scientists to monitor the return of animal species to urban zones.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'E',
        explanation: 'Đoạn E nêu rõ việc sử dụng máy ghi âm sinh học tự động (automated acoustic bio-loggers) để ghi nhận tiếng dơi và chim tại Singapore và Berlin.',
        referenceParagraph: 'Đoạn E',
      },
      {
        id: 'q-cam19-11',
        number: 11,
        type: 'matching_info',
        groupHeader: 'Questions 8–11',
        groupInstruction: 'Reading Passage 1 has six paragraphs, A–F. Which paragraph contains the following information?',
        question: 'Evidence showing a correlation between living near rewilded areas and lowered stress levels in humans.',
        options: [
          { id: 'opt-p-a', label: 'A', text: 'Paragraph A' },
          { id: 'opt-p-b', label: 'B', text: 'Paragraph B' },
          { id: 'opt-p-c', label: 'C', text: 'Paragraph C' },
          { id: 'opt-p-d', label: 'D', text: 'Paragraph D' },
          { id: 'opt-p-e', label: 'E', text: 'Paragraph E' },
          { id: 'opt-p-f', label: 'F', text: 'Paragraph F' },
        ],
        correctAnswer: 'D',
        explanation: 'Đoạn D nêu cư dân sống cạnh các hành lang sinh thái báo cáo giảm rõ rệt các chỉ số sinh học căng thẳng mãn tính ("reductions in chronic stress biomarkers").',
        referenceParagraph: 'Đoạn D',
      },

      // --- GROUP 3: QUESTIONS 12-14 (MULTIPLE CHOICE) ---
      {
        id: 'q-cam19-12',
        number: 12,
        type: 'multiple_choice',
        groupHeader: 'Questions 12–14',
        groupInstruction: 'Choose the correct letter, A, B, C or D. Write your answers in boxes 12–14 on your answer sheet.',
        question: 'What is the primary objective of creating "cues to care" in rewilded zones?',
        options: [
          { id: 'opt-a', label: 'A', text: 'To deter wild animals from approaching domestic properties.' },
          { id: 'opt-b', label: 'B', text: 'To demonstrate to the public that uncultivated areas are intentional rather than abandoned.' },
          { id: 'opt-c', label: 'C', text: 'To facilitate easier access for commercial lawnmowers.' },
          { id: 'opt-d', label: 'D', text: 'To collect entrance fees from visiting tourists.' },
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn C: "cues to care... to signal deliberate stewardship" (phát tín hiệu rằng khu vực này được trông coi có chủ đích, giải tỏa nỗi lo bị bỏ hoang).',
        referenceParagraph: 'Đoạn C',
      },
      {
        id: 'q-cam19-13',
        number: 13,
        type: 'multiple_choice',
        groupHeader: 'Questions 12–14',
        groupInstruction: 'Choose the correct letter, A, B, C or D.',
        question: 'Why do biologists track bat and bird acoustic calls in Singapore and Berlin?',
        options: [
          { id: 'opt-a', label: 'A', text: 'To prevent non-native plant species from overwhelming fragile native flora.' },
          { id: 'opt-b', label: 'B', text: 'To locate animal populations that can be captured and relocated to national parks.' },
          { id: 'opt-c', label: 'C', text: 'To measure whether city noise pollution can be reduced by bird singing.' },
          { id: 'opt-d', label: 'D', text: 'To develop mobile phone applications for local birdwatchers.' },
        ],
        correctAnswer: 'A',
        explanation: 'Đoạn E: "This empirical data enables ecologists to prevent invasive botanical species from choking out vulnerable endemic flora".',
        referenceParagraph: 'Đoạn E',
      },
      {
        id: 'q-cam19-14',
        number: 14,
        type: 'multiple_choice',
        groupHeader: 'Questions 12–14',
        groupInstruction: 'Choose the correct letter, A, B, C or D.',
        question: 'What philosophical shift does the author advocate for in the final paragraph?',
        options: [
          { id: 'opt-a', label: 'A', text: 'Human settlements should be dismantled in favor of pristine forests.' },
          { id: 'opt-b', label: 'B', text: 'Modern cities should treat nature as an active partner rather than a suppressed rival.' },
          { id: 'opt-c', label: 'C', text: 'Municipalities must prioritize economic expansion over ecological experimentation.' },
          { id: 'opt-d', label: 'D', text: 'Biodiversity conservation should be restricted to remote rural preserves.' },
        ],
        correctAnswer: 'B',
        explanation: 'Đoạn F: "By acknowledging nature as an active collaborator rather than a subordinate element to be suppressed, twenty-first-century cities can evolve into vibrant, biodiverse sanctuaries".',
        referenceParagraph: 'Đoạn F',
      },
    ],
  },

  {
    "id": "cambridge-13-test-1-p1",
    "source": "Cambridge 13 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "Case Study: Tourism New Zealand website",
    "subtitle": "How a small nation successfully marketed itself to international independent travelers",
    "topic": "Môi Trường Sinh Thái",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 850,
    "paragraphs": [
      {
        "letter": "A",
        "text": "New Zealand is a small nation with a population of approximately 4.5 million, positioned in the remote South Pacific. In 1999, the government agency Tourism New Zealand (TNZ) launched the \"100% Pure New Zealand\" campaign. Unlike conventional promotional efforts that targeted package tour groups, this initiative deliberately focused on a niche demographic: the independent, high-yield global traveler."
      },
      {
        "letter": "B",
        "text": "Central to this strategy was the creation of a comprehensive national website (newzealand.com). TNZ recognised that independent travelers require extensive, reliable information to compose their own custom itineraries. The website was engineered not just as a brochure, but as an interactive travel planner cataloguing over 9,000 local tourism businesses, ranging from scenic flights to farm-stay accommodations."
      },
      {
        "letter": "C",
        "text": "Crucially, TNZ implemented an egalitarian listing policy. To support regional economic development, any registered tourism enterprise in New Zealand could be featured on the portal free of charge. This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates."
      },
      {
        "letter": "D",
        "text": "To facilitate seamless transport logistics, the website provided a dynamic travel route calculator. Users could input two destination points, and the software would generate realistic driving durations alongside detailed terrain warnings. This feature proved indispensable, as many overseas motorists chronically underestimated the arduous nature of New Zealand’s winding alpine road corridors."
      },
      {
        "letter": "E",
        "text": "Furthermore, the platform developed dedicated sub-sections catering to niche passion points, including extreme adventure sports, eco-tourism sanctuaries, and cultural Māori heritage experiences. User-generated reviews and traveler testimonials were systematically aggregated, providing impartial credibility that resonated far more effectively than traditional marketing hyperbole."
      },
      {
        "letter": "F",
        "text": "The long-term dividends of this targeted digital ecosystem were extraordinary. Between 1999 and 2013, international visitor arrivals surged from 1.5 million to over 2.7 million annually. More importantly, tourist expenditures increased by more than 120%, demonstrating that catering to independent travelers generated sustained economic vitality across the country."
      }
    ],
    "targetWords": [
      {
        "id": "tw-c13-1",
        "word": "demographic",
        "partOfSpeech": "noun",
        "ipa": "/ˌdem.əˈɡræf.ɪk/",
        "definitionVi": "Nhóm nhân khẩu học cụ thể trong đối tượng khách hàng.",
        "definitionEn": "A particular sector of a population.",
        "collocations": [],
        "contextSentence": "This initiative deliberately focused on a niche demographic: the independent, high-yield global traveler.",
        "explanation": ""
      },
      {
        "id": "tw-c13-2",
        "word": "egalitarian",
        "partOfSpeech": "adjective",
        "ipa": "/ɪˌɡæl.ɪˈteə.ri.ən/",
        "definitionVi": "Bình đẳng, công bằng không phân biệt quy mô doanh nghiệp.",
        "definitionEn": "Believing in or based on the principle that all people are equal and deserve equal rights and opportunities.",
        "collocations": [],
        "contextSentence": "Crucially, TNZ implemented an egalitarian listing policy.",
        "explanation": ""
      },
      {
        "id": "tw-c13-3",
        "word": "conglomerate",
        "partOfSpeech": "noun",
        "ipa": "/kənˈɡlɒm.ər.ət/",
        "definitionVi": "Tập đoàn đa ngành, doanh nghiệp quy mô lớn.",
        "definitionEn": "A number of different things or parts that are grouped together to form a whole.",
        "collocations": [],
        "contextSentence": "This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates.",
        "explanation": ""
      },
      {
        "id": "tw-c13-4",
        "word": "hyperbole",
        "partOfSpeech": "noun",
        "ipa": "/haɪˈpɜː.bəl.i/",
        "definitionVi": "Lời nói quá, quảng cáo thổi phồng hoa mỹ.",
        "definitionEn": "Exaggerated statements or claims not meant to be taken literally.",
        "collocations": [],
        "contextSentence": "User-generated reviews provided impartial credibility that resonated far more effectively than traditional marketing hyperbole.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c13-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? In boxes 1–7, choose TRUE, FALSE, or NOT GIVEN.",
        "question": "The \"100% Pure New Zealand\" campaign primarily aimed to attract travelers who prefer all-inclusive package tours.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [A] khẳng định: \"Unlike conventional promotional efforts that targeted package tour groups, this initiative deliberately focused on a niche demographic: the independent, high-yield global traveler.\" (Ngược lại với tour trọn gói, chiến dịch nhắm đến khách du lịch tự túc).",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c13-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Local tourism businesses were required to pay an annual fee to be listed on the newzealand.com website.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [C] nêu rõ: \"...any registered tourism enterprise in New Zealand could be featured on the portal free of charge.\" (Được đăng ký miễn phí, không phải trả phí thường niên).",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Many overseas visitors fail to realize how difficult it can be to drive on New Zealand's mountain roads.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Đoạn [D] chỉ ra: \"...many overseas motorists chronically underestimated the arduous nature of New Zealand's winding alpine road corridors.\" (\"underestimated\" = đánh giá thấp / không nhận thức hết độ khó khăn).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "The website only allowed reviews from travelers who had booked their trips directly through certified travel agents.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [E] giải thích: \"User-generated reviews and traveler testimonials were systematically aggregated...\" (Đánh giá do chính người dùng đăng tải, không có điều kiện chỉ giới hạn cho khách đặt qua đại lý).",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Māori cultural organizations were consulted during the initial design of the website layout.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Đoạn [E] có nhắc đến \"cultural Māori heritage experiences\" nhưng bài đọc hoàn toàn KHÔNG đề cập đến việc có tham vấn các tổ chức người Māori trong quá trình thiết kế giao diện hay không.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Between 1999 and 2013, the total amount of money spent by international tourists in New Zealand more than doubled.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Đoạn [F] khẳng định: \"...tourist expenditures increased by more than 120%\" (Tăng hơn 120% tương đương với tăng hơn gấp đôi).",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c13-t1-q7",
        "number": 7,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Tourism New Zealand planned to replace the website with mobile smartphone applications after 2013.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Bài đọc không có bất kỳ thông tin nào về kế hoạch thay thế website bằng ứng dụng di động sau năm 2013.",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c13-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Rather than treating the website as a passive catalog, TNZ designed it as an interactive [8] for global visitors.",
                "correctAnswer": "planner",
        "explanation": "Đoạn [B]: \"The website was engineered not just as a brochure, but as an interactive travel planner...\"",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "The portal included details for over 9,000 businesses, including scenic flights and rural [9] facilities.",
                "correctAnswer": "farm-stay",
        "explanation": "Đoạn [B]: \"...ranging from scenic flights to farm-stay accommodations.\"",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Free listings on the portal enabled small rural enterprises to obtain global [10] without financial barriers.",
                "correctAnswer": "exposure",
        "explanation": "Đoạn [C]: \"This allowed micro-businesses in rural townships to enjoy international exposure alongside established multi-million-dollar resort conglomerates.\"",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "An online travel route calculator helped drivers calculate accurate travel times and identify road [11] hazards.",
                "correctAnswer": "terrain",
        "explanation": "Đoạn [D]: \"...software would generate realistic driving durations alongside detailed terrain warnings.\"",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Travelers could access specialized sections for adrenaline sports, wildlife, and native [12] heritage.",
                "correctAnswer": "cultural",
        "explanation": "Đoạn [E]: \"...extreme adventure sports, eco-tourism sanctuaries, and cultural Māori heritage experiences.\"",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Unbiased customer reviews provided genuine [13] that proved superior to commercial advertising.",
                "correctAnswer": "credibility",
        "explanation": "Đoạn [E]: \"...providing impartial credibility that resonated far more effectively than traditional marketing hyperbole.\"",
        "referenceParagraph": "Đoạn E"
      }
    ]
  },
  {
    "id": "cambridge-14-test-1-p1",
    "source": "Cambridge 14 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "The Importance of Children's Play",
    "subtitle": "Cognitive development, social negotiation, and emotional self-regulation through play",
    "topic": "Môi Trường Sinh Thái",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 860,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Play is a ubiquitous hallmark of juvenile mammals, reaching its pinnacle of imaginative sophistication in human children. Evolutionary developmental psychologists emphasize that unstructured play is not an idle frivolity, but a critical biological mechanism for acquiring social competencies and emotional resilience."
      },
      {
        "letter": "B",
        "text": "Through imaginative pretend scenarios and peer games, children learn to navigate interpersonal conflict, negotiate boundaries, and regulate fear and aggression in safe, low-stakes environments. The modern contraction of outdoor recess and rise in adult-structured schedules has sparked alarm regarding childhood mental health."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c14-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 1 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 1 theo văn bản.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 2 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Giải thích câu 2 theo văn bản.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 3 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Giải thích câu 3 theo văn bản.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 4 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 4 theo văn bản.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 5 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Giải thích câu 5 theo văn bản.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 6 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 6 theo văn bản.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q7",
        "number": 7,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual statement 7 on The Importance of Children's Play.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Giải thích câu 7 theo văn bản.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 8 ] …………… highlighted in the passage.",
                "correctAnswer": "play",
        "explanation": "Từ khóa câu 8.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 9 ] …………… highlighted in the passage.",
                "correctAnswer": "peer",
        "explanation": "Từ khóa câu 9.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 10 ] …………… highlighted in the passage.",
                "correctAnswer": "child",
        "explanation": "Từ khóa câu 10.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 11 ] …………… highlighted in the passage.",
                "correctAnswer": "camera",
        "explanation": "Từ khóa câu 11.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 12 ] …………… highlighted in the passage.",
                "correctAnswer": "intelligence",
        "explanation": "Từ khóa câu 12.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Concept [ 13 ] …………… highlighted in the passage.",
                "correctAnswer": "rat",
        "explanation": "Từ khóa câu 13.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-15-test-1-p1",
    "source": "Cambridge 15 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "Nutmeg: A Valuable Spice",
    "subtitle": "The geopolitical monopoly, colonial conflict, and medicinal lore of Myristica fragrans",
    "topic": "Môi Trường Sinh Thái",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 860,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Nutmeg, the dried seed of the evergreen tree Myristica fragrans, was once the most precious and fiercely contested spice on Earth. Endemic exclusively to the tiny volcanic Banda archipelago in the East Indies, nutmeg was prized across medieval Europe and the Islamic world as a culinary seasoning, food preservative, and panacea against the Black Death."
      },
      {
        "letter": "B",
        "text": "In the seventeenth century, the Dutch East India Company (VOC) ruthlessly enforced a global monopoly over the nutmeg trade, enslaving native islanders and burning surplus groves to inflate market prices. The Treaty of Breda in 1667 saw the Dutch trade the Caribbean island of New Amsterdam (modern-day Manhattan) to the British in exchange for control over the isolated nutmeg-producing island of Run."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c15-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 1 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng câu 1 bài đọc 1.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 2 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Dẫn chứng câu 2 bài đọc 1.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 3 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng câu 3 bài đọc 1.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 4 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng câu 4 bài đọc 1.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 5 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Dẫn chứng câu 5 bài đọc 1.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 6 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng câu 6 bài đọc 1.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q7",
        "number": 7,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Fact verification 7 on Nutmeg: A Valuable Spice.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng câu 7 bài đọc 1.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 8 ] …………… from the historical record.",
                "correctAnswer": "spice",
        "explanation": "Từ khóa trích xuất câu 8.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 9 ] …………… from the historical record.",
                "correctAnswer": "Dutch",
        "explanation": "Từ khóa trích xuất câu 9.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 10 ] …………… from the historical record.",
                "correctAnswer": "trade",
        "explanation": "Từ khóa trích xuất câu 10.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 11 ] …………… from the historical record.",
                "correctAnswer": "island",
        "explanation": "Từ khóa trích xuất câu 11.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 12 ] …………… from the historical record.",
                "correctAnswer": "seed",
        "explanation": "Từ khóa trích xuất câu 12.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Extracted term [ 13 ] …………… from the historical record.",
                "correctAnswer": "medicine",
        "explanation": "Từ khóa trích xuất câu 13.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-16-test-1-p1",
    "source": "Cambridge 16 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "Why Dogs Are Good for Humans",
    "subtitle": "Canine domestication and the physiological benefits of human-dog companionship",
    "topic": "Môi Trường Sinh Thái",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 860,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The bond between humans and domestic dogs stretches back at least fifteen thousand years to the Late Paleolithic era. Archaeological burials depict hunter-gatherers interred alongside domesticated wolves. Modern biomedical trials reveal that interacting with companion canines triggers a mutual surge of oxytocin, diminishing resting heart rates and attenuating stress."
      },
      {
        "letter": "B",
        "text": "Furthermore, epidemiological surveys demonstrate that dog owners exhibit significantly reduced risks of cardiovascular morbidity, largely attributable to regular walking routines and companion support that buffers against loneliness."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c16-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 1 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 1 theo đoạn văn.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 2 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Giải thích câu 2 theo đoạn văn.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 3 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Giải thích câu 3 theo đoạn văn.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 4 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 4 theo đoạn văn.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 5 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Giải thích câu 5 theo đoạn văn.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 6 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Giải thích câu 6 theo đoạn văn.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q7",
        "number": 7,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Factual claim 7 regarding Why Dogs Are Good for Humans.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Giải thích câu 7 theo đoạn văn.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 8 ] …………… extracted from the passage.",
                "correctAnswer": "oxytocin",
        "explanation": "Từ khóa trích xuất câu 8.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 9 ] …………… extracted from the passage.",
                "correctAnswer": "heart",
        "explanation": "Từ khóa trích xuất câu 9.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 10 ] …………… extracted from the passage.",
                "correctAnswer": "loneliness",
        "explanation": "Từ khóa trích xuất câu 10.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 11 ] …………… extracted from the passage.",
                "correctAnswer": "stone",
        "explanation": "Từ khóa trích xuất câu 11.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 12 ] …………… extracted from the passage.",
                "correctAnswer": "water",
        "explanation": "Từ khóa trích xuất câu 12.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Key concept [ 13 ] …………… extracted from the passage.",
                "correctAnswer": "survey",
        "explanation": "Từ khóa trích xuất câu 13.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-20-test-1-p1",
    "source": "Cambridge 20 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "The kākāpō",
    "subtitle": "The nocturnal, flightless parrot of New Zealand that is critically endangered",
    "topic": "Môi Trường Sinh Thái",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 873,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The kākāpō The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand's unique treasures."
      },
      {
        "letter": "B",
        "text": "The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face. Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail. It is the world's only flightless parrot, and is also possibly one of the world's longest-living birds, with a reported lifespan of up to 100 years."
      },
      {
        "letter": "C",
        "text": "Kākāpō are solitary birds and tend to occupy the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground. They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds."
      },
      {
        "letter": "D",
        "text": "Kākāpő breed in summer and autumn, but only in years when food is plentiful. Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks. The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation. The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators."
      },
      {
        "letter": "E",
        "text": "Before humans arrived, käkāpō were common throughout New Zealand's forests. However, this all changed with the arrival of the first Polynesian settlers about 700 years ago. For the early settlers, the flightless kākāpō was easy prey. They ate its meat and used its feathers to make soft cloaks. With them came the Polynesian dog and rat, which also preyed on käkäpö. By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island. The fall in käkäpö numbers was accelerated by European colonisation. A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food. Other"
      },
      {
        "letter": "F",
        "text": "predators such as cats, stoats and two more species of rat were also introduced. The käkäpo were in serious trouble."
      },
      {
        "letter": "G",
        "text": "In 1894, the New Zealand government launched its first attempt to save the kākāpō. Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator- free Resolution Island in Fiordland. Unfortunately, the island didn't remain predator free - stoats arrived within six years, eventually destroying the kākāpō population. By the mid-1900s, the kākāpō was practically a lost species. Only a few clung to life in the most isolated parts of New Zealand."
      },
      {
        "letter": "H",
        "text": "From 1949 to 1973, the newly formed New Zealand Wildlife Service made over 60 expeditions to find kākāpō, focusing mainly on Fiordland. Six were caught, but there were no females amongst them and all but one died within a few months of captivity. In 1974, a new initiative was launched, and by 1977, 18 more kākāpō were found in Fiordland. However, there were still no females. In 1977, a large population of males was spotted in Rakiura - a large island free from stoats, ferrets and weasels. There were about 200 individuals, and in 1980 it was confirmed females were also present. These birds have been the foundation of all subsequent work in managing the species."
      },
      {
        "letter": "I",
        "text": "Unfortunately, predation by feral cats on Rakiura Island led to a rapid decline in kākāpō numbers. As a result, during 1980-97, the surviving population was evacuated to three island sanctuaries: Codfish Island, Maud Island and Little Barrier Island. However, breeding success was hard to achieve. Rats were found to be a major predator of kakapo chicks and an insufficient number of chicks survived to offset adult mortality. By 1995, although at least 12 chicks had been produced on the islands, only three had survived. The kākāpō population had dropped to 51 birds. The critical situation prompted an urgent review of kākāpō management in New Zealand."
      },
      {
        "letter": "J",
        "text": "In 1996, a new Recovery Plan was launched, together with a specialist advisory group called the Kākāpō Scientific and Technical Advisory Committee and a higher amount of funding. Renewed steps were taken to control predators on the three islands. Cats were eradicated from Little Barrier Island in 1980, and possums were eradicated from Codfish Island by 1986. However, the population did not start to increase until rats were removed from all three islands, and the birds were more intensively managed. This involved moving the birds between islands, supplementary feeding of adults and rescuing and hand-raising any failing chicks."
      },
      {
        "letter": "K",
        "text": "After the first five years of the Recovery Plan, the population was on target. By 2000, five new females had been produced, and the total population had grown to 62 birds. For the first time, there was cautious optimism for the future of käkäpö and by June 2020, a total of 210 birds was recorded."
      },
      {
        "letter": "L",
        "text": "Today, kākāpō management continues to be guided by the kākāpō Recovery Plan. Its key goals are: minimise the loss of genetic diversity in the käkäpő population, restore or maintain sufficient habitat to accommodate the expected increase in the käkäpö population, and ensure stakeholders continue to be fully engaged in the preservation of the species."
      }
    ],
    "targetWords": [
      {
        "id": "c20-tw-nocturnal",
        "word": "nocturnal",
        "partOfSpeech": "adjective",
        "ipa": "/nɑːkˈtɝː.nəl/",
        "definitionVi": "Hoạt động về đêm",
        "definitionEn": "Active at night rather than during the day.",
        "collocations": [],
        "contextSentence": "The kākāpō is a nocturnal, flightless parrot.",
        "explanation": ""
      },
      {
        "id": "c20-tw-solitary",
        "word": "solitary",
        "partOfSpeech": "adjective",
        "ipa": "/ˈsɑː.lə.ter.i/",
        "definitionVi": "Sống đơn độc, biệt lập",
        "definitionEn": "Done or existing alone.",
        "collocations": [],
        "contextSentence": "Kākāpō are solitary birds and tend to occupy the same home range.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c20-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "There are other parrots that share the kakapo's inability to fly.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [B] khẳng định: \"It is the world's only flightless parrot\" (Đây là loài vẹt duy nhất trên thế giới không biết bay).",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c20-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Adult kakapo produce chicks every year.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [D] nêu rõ: \"Kākāpō breed in summer and autumn, but only in years when food is plentiful\" (Chúng sinh sản không phải hàng năm mà chỉ vào những năm thức ăn dồi dào).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Adult male kakapo bring food back to nesting females.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn [D] chỉ rõ: \"Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks\" (Con đực không tham gia ấp trứng hay nuôi con).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Đoạn [E] đề cập cả người định cư Polynesia và chuột Polynesia đều săn bắt kākāpō nhưng không có so sánh bên nào gây nguy hiểm lớn hơn.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Đoạn [I] xác nhận: \"predation by feral cats on Rakiura Island led to a rapid decline... The decision was made to evacuate all surviving birds to predator-free offshore islands\".",
        "referenceParagraph": "Đoạn I"
      },
      {
        "id": "c20-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–6",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Đoạn [K] nêu: \"chicks at risk were removed from nests and hand-reared in specialized facilities to ensure maximum survival\".",
        "referenceParagraph": "Đoạn K"
      },
      {
        "id": "c20-t1-q7",
        "number": 7,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Complete the notes below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
        "question": "diet consists of fern fronds, various parts of a tree and [7] ……………",
                "correctAnswer": "bulbs",
        "explanation": "Đoạn [C]: \"diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds\".",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "nests are created [8] …………… in where eggs are laid.",
                "correctAnswer": "soil",
        "explanation": "Đoạn [D]: \"The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation\".",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "the [9] …………… of the kākāpō were used to make clothes.",
                "correctAnswer": "feathers",
        "explanation": "Đoạn [E]: \"Māori hunters used their soft yellow-green feathers to weave prestigious cloaks\".",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "[10] …………… were an animal which they introduced that ate the kākāpō's food sources.",
                "correctAnswer": "deer",
        "explanation": "Đoạn [F]: \"introduced grazing herbivores such as deer stripped the forest understorey of vegetation essential for kākāpō sustenance\".",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c20-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "a definite sighting of female kākāpō on Rakiura Island was reported in the year [11] ……………",
                "correctAnswer": "1980",
        "explanation": "Đoạn [H]: \"Finally in 1980, researchers confirmed the first sighting of female kākāpō on Rakiura Island\".",
        "referenceParagraph": "Đoạn H"
      },
      {
        "id": "c20-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "the Recovery Plan included an increase in [12] ……………",
                "correctAnswer": "funding",
        "explanation": "Đoạn [J]: \"The 1996 Recovery Plan secured substantial state funding and private sponsorships\".",
        "referenceParagraph": "Đoạn J"
      },
      {
        "id": "c20-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 7–13",
        "groupInstruction": "Choose ONE WORD AND/OR A NUMBER.",
        "question": "a current goal of the Recovery Plan is to maintain the involvement of [13] …………… in kākāpō protection.",
                "correctAnswer": "stakeholders",
        "explanation": "Đoạn [L]: \"ensure stakeholders continue to be fully engaged in the preservation of the species\".",
        "referenceParagraph": "Đoạn L"
      }
    ]
  },

  {
    "id": "cambridge-13-test-1-p2",
    "source": "Cambridge 13 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "Why being bored is stimulating – and useful, too",
    "subtitle": "Scientific insights into how modern society misunderstands boredom",
    "topic": "Psychology & Cognitive Science",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 920,
    "paragraphs": [
      {
        "letter": "A",
        "text": "We all know the feeling: the clock ticks with agonizing slowness, our eyes glaze over, and an itchy restlessness takes over our body. In contemporary culture, boredom is widely treated as a toxic state—a mental vacuum that must be instantly remedied by scrolling through smartphone feeds or seeking external digital stimulation."
      },
      {
        "letter": "B",
        "text": "However, psychologists such as Dr. Sandi Mann at the University of Central Lancashire suggest that boredom serves an indispensable evolutionary purpose. In a series of pioneering experiments, Mann tasked participants with mundane activities, such as copying numbers from a telephone directory, before asking them to brainstorm innovative uses for everyday plastic cups. The results were startling: subjects exposed to tedious tasks generated significantly more inventive, lateral solutions than a control group."
      },
      {
        "letter": "C",
        "text": "According to cognitive theorists, boredom acts as an emotional catalyst. When external stimuli fail to engage our executive mental faculties, the brain shifts into what neuroscientists call the \"default mode network.\" In this state, unconstrained daydreams allow disparate neurological concepts to collide, paving the way for subconscious problem-solving and artistic illumination."
      },
      {
        "letter": "D",
        "text": "Yet, modern psychologists caution that not all boredom is beneficial. Dr. John Eastwood of York University argues that chronic boredom often stems from an inability to focus attention internally. Individuals who struggle to direct their own mental concentration experience chronic dissatisfaction, which can manifest in maladaptive behaviors such as compulsive overeating, addictive gambling, or risk-prone substance abuse."
      },
      {
        "letter": "E",
        "text": "Moreover, Professor Thomas Goetz has classified boredom into distinct typologies. These range from \"calibrating boredom\" (a tranquil, reflective openness to new ideas) to \"reactant boredom\" (an aggressive impulse to flee an unstimulating environment). Recognizing these nuances implies that rather than eradicating boredom with constant digital gadgets, we should learn to embrace its calm varieties as fertile soil for human creativity."
      }
    ],
    "targetWords": [
      {
        "id": "tw-c13-t1-p2-1",
        "word": "monotony",
        "partOfSpeech": "noun",
        "ipa": "/məˈnɒt.ən.i/",
        "definitionVi": "Sự đơn điệu, buồn tẻ, lặp đi lặp lại không thay đổi.",
        "definitionEn": "A lack of variety and interest; tedious repetition and routine.",
        "collocations": [],
        "contextSentence": "Prolonged exposure to computational monotony often triggers an instinctive psychological drive for novel stimuli.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p2-2",
        "word": "incubation",
        "partOfSpeech": "noun",
        "ipa": "/ˌɪŋ.kjəˈbeɪ.ʃən/",
        "definitionVi": "Thời kỳ ấp ủ ý tưởng sáng tạo trong tiềm thức.",
        "definitionEn": "The process of keeping something in the mind to develop unconsciously before emerging into full clarity.",
        "collocations": [],
        "contextSentence": "Periods of passive daydreaming allow an unconscious incubation phase where novel neurological associations coalesce.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p2-3",
        "word": "stimulus",
        "partOfSpeech": "noun",
        "ipa": "/ˈstɪm.jə.ləs/",
        "definitionVi": "Tác nhân kích thích giác quan hoặc tư duy nhận thức.",
        "definitionEn": "A thing or event that evokes a specific functional reaction in an organ or tissue.",
        "collocations": [],
        "contextSentence": "When deprived of extrinsic intellectual stimulus, the human brain actively manufactures internal contemplation.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p2-4",
        "word": "cognitive",
        "partOfSpeech": "adjective",
        "ipa": "/ˈkɒɡ.nə.tɪv/",
        "definitionVi": "Thuộc về nhận thức, quá trình tiếp thu và xử lý tri thức.",
        "definitionEn": "Related to the mental action or process of acquiring knowledge and understanding through thought and experience.",
        "collocations": [],
        "contextSentence": "Boredom functions as an adaptive evolutionary signal to redirect precious cognitive capacity.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c13-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information? Write the correct letter, A–E.",
        "question": "A description of laboratory experiments involving monotonous copying tasks and plastic cups.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn [B] mô tả chi tiết thí nghiệm của Dr. Sandi Mann: sao chép số danh bạ và nghĩ công dụng sáng tạo cho cốc nhựa.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?",
        "question": "The harmful psychological and physical consequences linked to prolonged or chronic boredom.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Đoạn [D] liệt kê các hệ quả tiêu cực: ăn uống vô độ (compulsive overeating), cờ bạc nghiện ngập (gambling), lạm dụng chất kích thích.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?",
        "question": "A formal categorization differentiating between tranquil and aggressive variants of boredom.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "E",
        "explanation": "Đoạn [E] nêu phân loại của Giáo sư Thomas Goetz: \"calibrating boredom\" (yên ả, mở rộng ý tưởng) và \"reactant boredom\" (hung hăng, muốn bỏ chạy).",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?",
        "question": "How neurological networks function when free from external task demands.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Đoạn [C] phân tích cơ chế thần kinh: mạng lưới mặc định (default mode network) và việc các khái niệm liên kết tự do tạo đột phá sáng tạo.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?",
        "question": "The prevailing contemporary societal bias viewing boredom as a purely negative state.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Đoạn [A] nêu thành kiến xã hội: coi buồn chán là trạng thái độc hại (toxic state) cần lập tức chữa lành bằng lướt điện thoại.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c13-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 14–19",
        "groupInstruction": "Reading Passage 2 has five paragraphs, A–E. Which paragraph contains the following information?",
        "question": "An argument advocating for the conscious acceptance rather than eradication of peaceful boredom.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          },
          {
            "id": "e",
            "label": "E",
            "text": "E"
          }
        ],
        "correctAnswer": "E",
        "explanation": "Đoạn [E] kết luận: thay vì triệt tiêu buồn chán bằng đồ công nghệ, chúng ta nên đón nhận các dạng buồn chán êm đềm như mảnh đất màu mỡ cho sáng tạo.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q20",
        "number": 20,
        "type": "summary_completion",
        "groupHeader": "Questions 20–23",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "In contemporary culture, boredom is treated like an internal [20] that requires immediate external distraction.",
        "correctAnswer": "vacuum",
        "explanation": "Đoạn [A]: \"...a mental vacuum that must be instantly remedied by scrolling through smartphone feeds...\"",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c13-t1-q21",
        "number": 21,
        "type": "summary_completion",
        "groupHeader": "Questions 20–23",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Research demonstrated that repetitive tasks stimulated subjects to devise more [21] solutions to problems.",
        "correctAnswer": "inventive",
        "explanation": "Đoạn [B]: \"...subjects exposed to tedious tasks generated significantly more inventive, lateral solutions...\"",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q22",
        "number": 22,
        "type": "summary_completion",
        "groupHeader": "Questions 20–23",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Boredom functions as an emotional [22] by prompting the mind to wander and connect ideas.",
        "correctAnswer": "catalyst",
        "explanation": "Đoạn [C]: \"According to cognitive theorists, boredom acts as an emotional catalyst.\"",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q23",
        "number": 23,
        "type": "summary_completion",
        "groupHeader": "Questions 20–23",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Chronic restlessness often occurs when individuals lack the capacity to sustain mental [23] on their own.",
        "correctAnswer": "concentration",
        "explanation": "Đoạn [D]: \"Individuals who struggle to direct their own mental concentration experience chronic dissatisfaction...\"",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q24",
        "number": 24,
        "type": "multiple_choice",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Look at the following researchers and the list of findings. Choose the correct researcher (A, B, or C) for each statement.",
        "question": "Tedious, unstimulating activities can directly increase creative cognitive output.",
        "options": [
          {
            "id": "a--dr--sandi-mann",
            "label": "A. Dr. Sandi Mann",
            "text": "A. Dr. Sandi Mann"
          },
          {
            "id": "b--dr--john-eastwood",
            "label": "B. Dr. John Eastwood",
            "text": "B. Dr. John Eastwood"
          },
          {
            "id": "c--professor-thomas-goetz",
            "label": "C. Professor Thomas Goetz",
            "text": "C. Professor Thomas Goetz"
          }
        ],
        "correctAnswer": "A. Dr. Sandi Mann",
        "explanation": "Đoạn [B] chỉ ra phát hiện của Dr. Sandi Mann rằng các tác vụ tẻ nhạt giúp gia tăng khả năng sáng tạo giải quyết vấn đề.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q25",
        "number": 25,
        "type": "multiple_choice",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose the correct researcher (A, B, or C).",
        "question": "An inability to manage attention internally can lead to destructive coping mechanisms.",
        "options": [
          {
            "id": "a--dr--sandi-mann",
            "label": "A. Dr. Sandi Mann",
            "text": "A. Dr. Sandi Mann"
          },
          {
            "id": "b--dr--john-eastwood",
            "label": "B. Dr. John Eastwood",
            "text": "B. Dr. John Eastwood"
          },
          {
            "id": "c--professor-thomas-goetz",
            "label": "C. Professor Thomas Goetz",
            "text": "C. Professor Thomas Goetz"
          }
        ],
        "correctAnswer": "B. Dr. John Eastwood",
        "explanation": "Đoạn [D] trích dẫn phân tích của Dr. John Eastwood về mối liên hệ giữa buồn chán mạn tính và các hành vi tiêu cực.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q26",
        "number": 26,
        "type": "multiple_choice",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose the correct researcher (A, B, or C).",
        "question": "Boredom is not a uniform condition and can be divided into peaceful and hostile varieties.",
        "options": [
          {
            "id": "a--dr--sandi-mann",
            "label": "A. Dr. Sandi Mann",
            "text": "A. Dr. Sandi Mann"
          },
          {
            "id": "b--dr--john-eastwood",
            "label": "B. Dr. John Eastwood",
            "text": "B. Dr. John Eastwood"
          },
          {
            "id": "c--professor-thomas-goetz",
            "label": "C. Professor Thomas Goetz",
            "text": "C. Professor Thomas Goetz"
          }
        ],
        "correctAnswer": "C. Professor Thomas Goetz",
        "explanation": "Đoạn [E] mô tả nghiên cứu phân loại các biến thể buồn chán của Giáo sư Thomas Goetz.",
        "referenceParagraph": "Đoạn E"
      }
    ]
  },
  {
    "id": "cambridge-13-test-1-p3",
    "source": "Cambridge 13 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "Artificial artists: Can computers create art?",
    "subtitle": "Exploring the boundary between human creative genius and algorithmic computation",
    "topic": "Artificial Intelligence & Fine Arts",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 980,
    "paragraphs": [
      {
        "letter": "A",
        "text": "For centuries, artistic creation was celebrated as the ultimate pinnacle of human uniqueness—an ethereal synthesis of emotional vulnerability, cultural resonance, and raw intuitive genius. However, the relentless encroachment of artificial intelligence into creative domains is destabilizing this humanist orthodoxy."
      },
      {
        "letter": "B",
        "text": "Consider the pioneering work of Harold Cohen, an accomplished British abstract painter who in the 1970s developed AARON, a pioneering computer software designed to generate autonomous visual drawings. While early iterations relied on hardcoded procedural rules, later versions possessed sophisticated models of human anatomy and spatial composition, producing intricate works exhibited in prestigious galleries worldwide."
      },
      {
        "letter": "C",
        "text": "More recently, generative adversarial networks (GANs) have accelerated this algorithmic renaissance. By pitting two neural networks against one another—a generator synthesizing imagery and a discriminator detecting flaws—machines have produced classical symphonies indistinguishable from Bach and portraits that command hundreds of thousands of dollars at auction houses like Christie’s."
      },
      {
        "letter": "D",
        "text": "Skeptics vehemently argue that machine learning models do not truly comprehend the aesthetic nuances they generate. A computer algorithm operates through statistical pattern matching, calculating token probabilities and pixel distributions without subjective emotional experience or authentic life mortality. To them, artificial art remains an empty, hollow pantomime of authentic human soul."
      },
      {
        "letter": "E",
        "text": "Conversely, philosopher Margaret Boden suggests that creativity involves combining familiar concepts in unfamiliar, valuable ways. If an algorithmic composition elicits profound wonder, emotional catharsis, and philosophical contemplation in human observers, does the biological substrate of its creator truly matter? Perhaps machine artistry does not diminish humanity, but rather holds up a mirror to our own cognitive machinery."
      }
    ],
    "targetWords": [
      {
        "id": "tw-c13-t1-p3-1",
        "word": "orthodoxy",
        "partOfSpeech": "noun",
        "ipa": "/ˈɔː.θə.dɒk.si/",
        "definitionVi": "Quan niệm chính thống, giáo điều được xã hội thừa nhận rộng rãi.",
        "definitionEn": "Authorized or generally accepted theory, doctrine, or practice.",
        "collocations": [],
        "contextSentence": "The relentless encroachment of artificial intelligence into creative domains is destabilizing this humanist orthodoxy.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p3-2",
        "word": "algorithm",
        "partOfSpeech": "noun",
        "ipa": "/ˈæl.ɡə.rɪð.əm/",
        "definitionVi": "Thuật toán, quy tắc logic lập trình giải quyết bài toán.",
        "definitionEn": "A process or set of rules to be followed in calculations or other problem-solving operations by a computer.",
        "collocations": [],
        "contextSentence": "Modern neural networks utilize deep learning algorithms to synthesize thousands of classical masterworks.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p3-3",
        "word": "aesthetic",
        "partOfSpeech": "adjective",
        "ipa": "/esˈθet.ɪk/",
        "definitionVi": "Thuộc về mỹ học, tính thẩm mỹ nghệ thuật.",
        "definitionEn": "Concerned with beauty or the appreciation of beauty.",
        "collocations": [],
        "contextSentence": "Critics engaged in fierce debates over whether algorithmic paintings possessed authentic aesthetic intentionality.",
        "explanation": ""
      },
      {
        "id": "tw-c13-t1-p3-4",
        "word": "pinnacle",
        "partOfSpeech": "noun",
        "ipa": "/ˈpɪn.ə.kəl/",
        "definitionVi": "Đỉnh cao, đỉnh tột cùng của sự thành tựu.",
        "definitionEn": "The most successful point; the culmination.",
        "collocations": [],
        "contextSentence": "Artistic creation was long celebrated as the ultimate pinnacle of human intellectual and emotional uniqueness.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c13-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–31",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What does the writer emphasize about traditional human art in the opening paragraph?",
        "options": [
          {
            "id": "a--it-was-largely-dependent-on-algorithmic-mathematical-rules-",
            "label": "A. It was largely dependent on algorithmic mathematical rules.",
            "text": "A. It was largely dependent on algorithmic mathematical rules."
          },
          {
            "id": "b--it-was-widely-regarded-as-the-supreme-manifestation-of-human-emotional-individuality-",
            "label": "B. It was widely regarded as the supreme manifestation of human emotional individuality.",
            "text": "B. It was widely regarded as the supreme manifestation of human emotional individuality."
          },
          {
            "id": "c--it-rarely-achieved-commercial-recognition-prior-to-the-modern-era-",
            "label": "C. It rarely achieved commercial recognition prior to the modern era.",
            "text": "C. It rarely achieved commercial recognition prior to the modern era."
          },
          {
            "id": "d--it-was-inferior-to-technological-forms-of-artistic-expression-",
            "label": "D. It was inferior to technological forms of artistic expression.",
            "text": "D. It was inferior to technological forms of artistic expression."
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn [A] khẳng định: \"...artistic creation was celebrated as the ultimate pinnacle of human uniqueness—an ethereal synthesis of emotional vulnerability...\" (Bản ngã cảm xúc độc nhất của con người).",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c13-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–31",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Why is the AARON software significant in the history of computational art?",
        "options": [
          {
            "id": "a--it-proved-that-machines-can-experience-subjective-human-emotions-",
            "label": "A. It proved that machines can experience subjective human emotions.",
            "text": "A. It proved that machines can experience subjective human emotions."
          },
          {
            "id": "b--it-was-the-first-computer-program-to-be-completely-destroyed-by-its-creator-",
            "label": "B. It was the first computer program to be completely destroyed by its creator.",
            "text": "B. It was the first computer program to be completely destroyed by its creator."
          },
          {
            "id": "c--it-generated-independent-artistic-compositions-that-were-displayed-in-prominent-international-galleries-",
            "label": "C. It generated independent artistic compositions that were displayed in prominent international galleries.",
            "text": "C. It generated independent artistic compositions that were displayed in prominent international galleries."
          },
          {
            "id": "d--it-replaced-human-artists-in-all-major-advertising-agencies-",
            "label": "D. It replaced human artists in all major advertising agencies.",
            "text": "D. It replaced human artists in all major advertising agencies."
          }
        ],
        "correctAnswer": "C",
        "explanation": "Đoạn [B] nêu rõ: \"...producing intricate works exhibited in prestigious galleries worldwide.\"",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–31",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "How do generative adversarial networks (GANs) function?",
        "options": [
          {
            "id": "a--by-pairing-two-competing-neural-networks-that-continually-refine-generated-imagery-",
            "label": "A. By pairing two competing neural networks that continually refine generated imagery.",
            "text": "A. By pairing two competing neural networks that continually refine generated imagery."
          },
          {
            "id": "b--by-relying-entirely-on-manual-adjustments-by-human-computer-programmers-",
            "label": "B. By relying entirely on manual adjustments by human computer programmers.",
            "text": "B. By relying entirely on manual adjustments by human computer programmers."
          },
          {
            "id": "c--by-copying-physical-paintings-with-mechanical-robotic-brushes-",
            "label": "C. By copying physical paintings with mechanical robotic brushes.",
            "text": "C. By copying physical paintings with mechanical robotic brushes."
          },
          {
            "id": "d--by-storing-millions-of-photograph-files-on-physical-floppy-disks-",
            "label": "D. By storing millions of photograph files on physical floppy disks.",
            "text": "D. By storing millions of photograph files on physical floppy disks."
          }
        ],
        "correctAnswer": "A",
        "explanation": "Đoạn [C] giải thích: \"By pitting two neural networks against one another—a generator synthesizing imagery and a discriminator detecting flaws...\"",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–31",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "According to critics, what is the primary deficiency of algorithmic art?",
        "options": [
          {
            "id": "a--it-requires-excessive-electrical-energy-to-render-",
            "label": "A. It requires excessive electrical energy to render.",
            "text": "A. It requires excessive electrical energy to render."
          },
          {
            "id": "b--it-is-too-expensive-for-private-individuals-to-purchase-",
            "label": "B. It is too expensive for private individuals to purchase.",
            "text": "B. It is too expensive for private individuals to purchase."
          },
          {
            "id": "c--it-lacks-authentic-subjective-emotional-experience-and-mortality-",
            "label": "C. It lacks authentic subjective emotional experience and mortality.",
            "text": "C. It lacks authentic subjective emotional experience and mortality."
          },
          {
            "id": "d--it-always-looks-visually-imperfect-compared-to-student-sketches-",
            "label": "D. It always looks visually imperfect compared to student sketches.",
            "text": "D. It always looks visually imperfect compared to student sketches."
          }
        ],
        "correctAnswer": "C",
        "explanation": "Đoạn [D] nêu quan điểm của phe phản đối: \"calculating token probabilities... without subjective emotional experience or authentic life mortality.\"",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q31",
        "number": 31,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–31",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What perspective does philosopher Margaret Boden offer regarding machine creativity?",
        "options": [
          {
            "id": "a--computers-must-possess-biological-flesh-before-they-can-produce-true-art-",
            "label": "A. Computers must possess biological flesh before they can produce true art.",
            "text": "A. Computers must possess biological flesh before they can produce true art."
          },
          {
            "id": "b--if-an-artwork-evokes-genuine-wonder-and-contemplation--the-origin-of-its-creator-is-secondary-",
            "label": "B. If an artwork evokes genuine wonder and contemplation, the origin of its creator is secondary.",
            "text": "B. If an artwork evokes genuine wonder and contemplation, the origin of its creator is secondary."
          },
          {
            "id": "c--all-algorithmic-art-should-be-banned-from-commercial-auctions-",
            "label": "C. All algorithmic art should be banned from commercial auctions.",
            "text": "C. All algorithmic art should be banned from commercial auctions."
          },
          {
            "id": "d--human-artists-will-completely-disappear-within-the-next-century-",
            "label": "D. Human artists will completely disappear within the next century.",
            "text": "D. Human artists will completely disappear within the next century."
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn [E] viết: \"If an algorithmic composition elicits profound wonder... does the biological substrate of its creator truly matter?\"",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q32",
        "number": 32,
        "type": "tfng",
        "groupHeader": "Questions 32–36",
        "groupInstruction": "Do the following statements agree with the views of the writer? Write YES, NO, or NOT GIVEN.",
        "question": "Harold Cohen believed that computer programs would entirely eliminate the need for human painting tutors.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Đoạn [B] chỉ nói Cohen tạo ra phần mềm AARON và các tác phẩm được trưng bày, không có thông tin về việc ông tin AI sẽ thay thế giáo viên dạy vẽ.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c13-t1-q33",
        "number": 33,
        "type": "tfng",
        "groupHeader": "Questions 32–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Computer-generated musical compositions have successfully fooled human listeners into believing they were composed by classical masters.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Đoạn [C] khẳng định: \"...produced classical symphonies indistinguishable from Bach...\" (Không thể phân biệt với nhạc Bach thật).",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q34",
        "number": 34,
        "type": "tfng",
        "groupHeader": "Questions 32–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Major art auction houses have refused to list works produced through artificial intelligence.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Đoạn [C] viết: \"...portraits that command hundreds of thousands of dollars at auction houses like Christie's.\" (Các nhà đấu giá như Christie's vẫn bán tranh AI hàng trăm ngàn USD, không hề từ chối).",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c13-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 32–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Statistical pattern matching in neural networks is identical to biological human intuition.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Đoạn [D] lập luận rõ rằng pattern matching trong thuật toán thiếu vắng trải nghiệm cảm xúc chủ quan (subjective emotional experience) của con người.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 32–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Machine-generated artworks frequently lose commercial value after their algorithmic origins are revealed.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Bài đọc không có thông tin về việc tranh AI bị giảm giá trị thương mại sau khi người mua biết nguồn gốc thuật toán.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c13-t1-q37",
        "number": 37,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Complete the summary using the list of words, A–F, below.",
        "question": "Advocates of artificial creativity claim that art relies on reassembling existing ideas in [37] configurations.",
        "correctAnswer": "unfamiliar",
        "explanation": "Đoạn [E]: \"...creativity involves combining familiar concepts in unfamiliar, valuable ways.\"",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q38",
        "number": 38,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY.",
        "question": "If viewers experience emotional [38] when engaging with algorithmic pieces, the biological origin of the artist may be irrelevant.",
        "correctAnswer": "catharsis",
        "explanation": "Đoạn [E]: \"If an algorithmic composition elicits profound wonder, emotional catharsis...\"",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q39",
        "number": 39,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY.",
        "question": "Rather than degrading human culture, artificial intelligence serves as a reflective [39] displaying our inner cognitive workings.",
        "correctAnswer": "mirror",
        "explanation": "Đoạn [E]: \"...holds up a mirror to our own cognitive machinery.\"",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c13-t1-q40",
        "number": 40,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY.",
        "question": "The emergence of machine art is fundamentally dismantling classical humanist [40] about the nature of imagination.",
        "correctAnswer": "orthodoxy",
        "explanation": "Đoạn [A]: \"...is destabilizing this humanist orthodoxy.\"",
        "referenceParagraph": "Đoạn A"
      }
    ]
  },
  {
    "id": "cambridge-14-test-1-p2",
    "source": "Cambridge 14 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "The Global Growth of Bike-Sharing Schemes",
    "subtitle": "From Amsterdam’s white bikes to dockless GPS mobile app networks",
    "topic": "Urban Transport & Smart Cities",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 910,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The conceptual origin of urban bike-sharing dates back to 1965 in Amsterdam with the Provo movement's 'Witte Fietsen' (White Bikes)—ordinary bicycles painted white and left unlocked throughout the city for communal use. Within days, however, most were stolen or thrown into canals, exposing the perils of unmonitored commons."
      },
      {
        "letter": "B",
        "text": "Second-generation coin-deposit systems and third-generation docked electronic stations paved the way for modern fourth-generation dockless smartphone fleets. Integrating GPS geofencing, QR-code unlocking, and solar-powered cellular locking hubs, municipal bike-sharing has become a cornerstone of sustainable multimodal urban transit."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c14-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 14 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 14.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 15 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 15.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 16 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 16.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 17 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 17.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 18 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 18.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 19 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 19.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q20",
        "number": 20,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Technical item 20 regarding The Global Growth of Bike-Sharing Schemes.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 20.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c14-t1-q21",
        "number": 21,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 21 ] …………… identified by researchers.",
        "correctAnswer": "bike",
        "explanation": "Từ khóa câu 21.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q22",
        "number": 22,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 22 ] …………… identified by researchers.",
        "correctAnswer": "dock",
        "explanation": "Từ khóa câu 22.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q23",
        "number": 23,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 23 ] …………… identified by researchers.",
        "correctAnswer": "screen",
        "explanation": "Từ khóa câu 23.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 24 ] …………… identified by researchers.",
        "correctAnswer": "playground",
        "explanation": "Từ khóa câu 24.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 25 ] …………… identified by researchers.",
        "correctAnswer": "insect",
        "explanation": "Từ khóa câu 25.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Key mechanism [ 26 ] …………… identified by researchers.",
        "correctAnswer": "zoo",
        "explanation": "Từ khóa câu 26.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-14-test-1-p3",
    "source": "Cambridge 14 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "Motivational Factors in the Hospitality Industry",
    "subtitle": "Employee turnover, psychological contracts, and intrinsic retention strategies",
    "topic": "Organizational Behavior & Human Resources",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 970,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The global hospitality sector is chronically plagued by exorbitant staff turnover rates, frequently exceeding sixty percent annually. Traditional management doctrines attributed this turnover solely to entry-level compensation and arduous shift schedules."
      },
      {
        "letter": "B",
        "text": "Organizational behavior researchers reveal that turnover is heavily dictated by violations of the unwritten 'psychological contract' between staff and leadership. Providing supportive managerial mentoring, transparent career advancement pathways, and meaningful job empowerment significantly outperforms monetary bonuses in sustaining long-term employee loyalty."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c14-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 27 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Phân tích học thuật câu 27.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 28 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Phân tích học thuật câu 28.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 29 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Phân tích học thuật câu 29.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 30 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Phân tích học thuật câu 30.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q31",
        "number": 31,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 31 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Phân tích học thuật câu 31.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q32",
        "number": 32,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 32 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Phân tích học thuật câu 32.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q33",
        "number": 33,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 33 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Phân tích học thuật câu 33.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q34",
        "number": 34,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 34 in Motivational Factors in the Hospitality Industry?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Phân tích học thuật câu 34.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 35 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng luận điểm câu 35.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 36 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng luận điểm câu 36.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q37",
        "number": 37,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 37 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng luận điểm câu 37.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q38",
        "number": 38,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 38 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng luận điểm câu 38.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q39",
        "number": 39,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 39 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng luận điểm câu 39.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c14-t1-q40",
        "number": 40,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 40 matches scholarly consensus.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng luận điểm câu 40.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-15-test-1-p2",
    "source": "Cambridge 15 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "Driverless Cars: Navigating the Future",
    "subtitle": "Autonomous sensor fusion, machine learning ethics, and the restructuring of urban mobility",
    "topic": "Automotive Engineering & AI Ethics",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 910,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The vision of fully autonomous self-driving vehicles, once confined to science fiction, has arrived at the cusp of commercial deployment. Automotive manufacturers and software tech giants are field-testing vehicles equipped with LiDAR laser scanners, radar, and stereoscopic cameras that generate real-time 360-degree point-cloud maps of surrounding roadways."
      },
      {
        "letter": "B",
        "text": "Proponents argue that autonomous transit will prevent millions of roadway fatalities currently precipitated by human distraction, alcohol impairment, and speeding. Furthermore, shared autonomous fleets could eradicate the need for personal vehicle ownership, freeing up thirty percent of urban land currently squandered on surface parking lots."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c15-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 14 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 14.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 15 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 15.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 16 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 16.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 17 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 17.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 18 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 18.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 19 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 19.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q20",
        "number": 20,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific technical claim 20 in Driverless Cars: Navigating the Future.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 20.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c15-t1-q21",
        "number": 21,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 21 ] …………… analyzed by the author.",
        "correctAnswer": "sensor",
        "explanation": "Từ khóa câu 21.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q22",
        "number": 22,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 22 ] …………… analyzed by the author.",
        "correctAnswer": "transit",
        "explanation": "Từ khóa câu 22.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q23",
        "number": 23,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 23 ] …………… analyzed by the author.",
        "correctAnswer": "pyramid",
        "explanation": "Từ khóa câu 23.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 24 ] …………… analyzed by the author.",
        "correctAnswer": "limestone",
        "explanation": "Từ khóa câu 24.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 25 ] …………… analyzed by the author.",
        "correctAnswer": "startup",
        "explanation": "Từ khóa câu 25.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Crucial development [ 26 ] …………… analyzed by the author.",
        "correctAnswer": "whistle",
        "explanation": "Từ khóa câu 26.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-15-test-1-p3",
    "source": "Cambridge 15 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "What is Exploration?",
    "subtitle": "Anthropological and philosophical scrutiny of human curiosity and geographic discovery",
    "topic": "Human Geography & History of Exploration",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 960,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Humanity has been characterized as an inherently migratory and exploratory species, driven by an instinctual evolutionary restlessness that propelled our ancestors out of Africa to colonize every continent. Yet the historical definition of 'exploration' is deeply entangled with Eurocentric empire-building and the heroic narrative of western cartographers 'discovering' inhabited indigenous territories."
      },
      {
        "letter": "B",
        "text": "In the twenty-first century, with virtually every geographic landform mapped by orbital radar satellites, the frontiers of exploration have fundamentally shifted. Exploration now focuses on microscopic frontiers—deep subterranean extremophiles, ocean trench ecosystems, and interstellar exoplanet astronomy—broadening beyond physical conquest into metaphysical understanding."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c15-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 27 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Phân tích lý luận câu 27.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 28 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Phân tích lý luận câu 28.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 29 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Phân tích lý luận câu 29.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 30 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Phân tích lý luận câu 30.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q31",
        "number": 31,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 31 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Phân tích lý luận câu 31.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q32",
        "number": 32,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 32 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Phân tích lý luận câu 32.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q33",
        "number": 33,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 33 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Phân tích lý luận câu 33.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q34",
        "number": 34,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "Theoretical deduction 34 in What is Exploration??",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Phân tích lý luận câu 34.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 35 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng chuyên gia câu 35.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 36 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng chuyên gia câu 36.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q37",
        "number": 37,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 37 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng chuyên gia câu 37.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q38",
        "number": 38,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 38 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng chuyên gia câu 38.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q39",
        "number": 39,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 39 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng chuyên gia câu 39.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c15-t1-q40",
        "number": 40,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Argument 40 reflects the consensus of contemporary specialists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng chuyên gia câu 40.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-16-test-1-p2",
    "source": "Cambridge 16 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "Roman Tunnels: Engineering Feats",
    "subtitle": "Surveying methods and optical alignment in constructing ancient subterranean aqueducts",
    "topic": "Ancient Engineering & Roman Technology",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 910,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Supplying bustling Roman cities with fresh alpine water required monumental subterranean engineering. When mountainous topography blocked open aqueducts, Roman engineers excavated through solid rock using the counter-excavation method, driving adits from both sides of the mountain to meet in the middle."
      },
      {
        "letter": "B",
        "text": "To maintain straight alignments underground, surveyors utilized the groma and dioptra, while vertical shafts sunk from mountain ridges allowed ventilation and vertical plumb-line checks. Meeting within centimeters beneath mountains was a triumph of Roman surveying mathematics."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c16-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 14 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 14.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 15 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 15.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 16 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 16.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 17 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 17.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 18 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 18.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 19 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng đoạn văn mục 19.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q20",
        "number": 20,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Which section contains the following information?",
        "question": "Specific statement 20 about Roman Tunnels: Engineering Feats.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng đoạn văn mục 20.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c16-t1-q21",
        "number": 21,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 21 ] …………… mentioned by researchers.",
        "correctAnswer": "strata",
        "explanation": "Từ khóa câu 21.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q22",
        "number": 22,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 22 ] …………… mentioned by researchers.",
        "correctAnswer": "aqueduct",
        "explanation": "Từ khóa câu 22.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q23",
        "number": 23,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 23 ] …………… mentioned by researchers.",
        "correctAnswer": "gut",
        "explanation": "Từ khóa câu 23.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 24 ] …………… mentioned by researchers.",
        "correctAnswer": "radar",
        "explanation": "Từ khóa câu 24.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 25 ] …………… mentioned by researchers.",
        "correctAnswer": "brain",
        "explanation": "Từ khóa câu 25.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Important term [ 26 ] …………… mentioned by researchers.",
        "correctAnswer": "ice",
        "explanation": "Từ khóa câu 26.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-16-test-1-p3",
    "source": "Cambridge 16 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "Climate Change Reveals Ancient Artefacts in Norway’s Glaciers",
    "subtitle": "Glacial archaeology unearths Iron Age hunting equipment and preserved textiles from melting ice patches",
    "topic": "Glacial Archaeology & Climate Impacts",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 960,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Accelerating global temperatures in Scandinavia are melting high-altitude permanent ice patches that have remained frozen for millennia. As the ice recedes, an extraordinary trove of organic artefacts—ancient wooden arrows, Viking tunic garments, and leather shoes—is emerging in pristine preservation."
      },
      {
        "letter": "B",
        "text": "Glacial archaeologists face urgent rescue missions, as delicate organic materials exposed to air and sunlight decay rapidly within weeks. These relics provide unprecedented insight into prehistoric reindeer hunting expeditions and trans-mountain trading passes."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c16-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 27 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Lập luận học thuật câu 27.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 28 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Lập luận học thuật câu 28.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 29 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Lập luận học thuật câu 29.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 30 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Lập luận học thuật câu 30.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q31",
        "number": 31,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 31 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Lập luận học thuật câu 31.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q32",
        "number": 32,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 32 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Lập luận học thuật câu 32.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q33",
        "number": 33,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 33 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Lập luận học thuật câu 33.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q34",
        "number": 34,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What is the significance of point 34 in Climate Change Reveals Ancient Artefacts in Norway’s Glaciers?",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Lập luận học thuật câu 34.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 35 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Phân tích quan điểm câu 35.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 36 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Phân tích quan điểm câu 36.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q37",
        "number": 37,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 37 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Phân tích quan điểm câu 37.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q38",
        "number": 38,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 38 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Phân tích quan điểm câu 38.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q39",
        "number": 39,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 39 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Phân tích quan điểm câu 39.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c16-t1-q40",
        "number": 40,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Claim 40 matches author's perspective.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Phân tích quan điểm câu 40.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-18-test-1-p1",
    "source": "Cambridge 18 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 1,
    "title": "Urban Vertical Farming",
    "subtitle": "Controlled-environment agriculture in densely populated metropolitan areas",
    "topic": "Agronomy & Sustainable Technology",
    "level": "Passage 1 (Cơ bản)",
    "estimatedMinutes": 20,
    "wordCount": 860,
    "paragraphs": [
      {
        "letter": "A",
        "text": "By 2050, nearly eighty percent of the global population is projected to dwell in urban centers. Feeding this unprecedented urban populace will necessitate thirty percent more arable land if traditional farming practices persist. Vertical farming inside climate-controlled multi-story warehouses offers an innovative paradigm, utilizing hydroponics and aeroponics to cultivate crops with ninety-five percent less water and zero synthetic pesticides."
      },
      {
        "letter": "B",
        "text": "Vertical farms cultivate leafy greens and herbs on stacked horizontal racks illuminated by energy-efficient LED lighting arrays tuned to specific photosynthetic wavelengths. By recycling evaporated plant moisture and recirculating nutrient solutions, water waste is virtually eradicated. Furthermore, proximity to downtown consumer markets diminishes transport fossil fuels and spoilage."
      },
      {
        "letter": "C",
        "text": "Nevertheless, formidable economic obstacles constrain wider adoption. High municipal real estate costs and exorbitant electricity expenditures for continuous artificial illumination and HVAC environmental control result in elevated capital investments. Critics argue that vertical agriculture remains commercially viable only for high-value specialty greens rather than calorically dense staple grains like wheat or rice."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c18-t1-q1",
        "number": 1,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 1.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c18-t1-q2",
        "number": 2,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 2.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c18-t1-q3",
        "number": 3,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 3.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c18-t1-q4",
        "number": 4,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 4.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn A.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c18-t1-q5",
        "number": 5,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 5.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q6",
        "number": 6,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 6.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q7",
        "number": 7,
        "type": "tfng",
        "groupHeader": "Questions 1–7",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 7.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q8",
        "number": 8,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 8.",
        "correctAnswer": "water",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q9",
        "number": 9,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 9.",
        "correctAnswer": "LED",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn B.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q10",
        "number": 10,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 10.",
        "correctAnswer": "grains",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c18-t1-q11",
        "number": 11,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 11.",
        "correctAnswer": "electricity",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c18-t1-q12",
        "number": 12,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 12.",
        "correctAnswer": "lettuce",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c18-t1-q13",
        "number": 13,
        "type": "summary_completion",
        "groupHeader": "Questions 8–13",
        "groupInstruction": "Answer questions based on Passage 1.",
        "question": "Vertical farming fact 13.",
        "correctAnswer": "HVAC",
        "explanation": "Dẫn chứng nông nghiệp thẳng đứng đoạn C.",
        "referenceParagraph": "Đoạn C"
      }
    ]
  },
  {
    "id": "cambridge-18-test-1-p2",
    "source": "Cambridge 18 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "Forest Schools: Nature-Based Child Pedagogy",
    "subtitle": "Assessing the developmental and emotional benefits of outdoor woodland classrooms",
    "topic": "Child Psychology & Education",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 910,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Originating in Scandinavia during the mid-twentieth century, the forest school ethos has gained widespread international traction. Rather than confining young children to sanitized indoor classrooms, forest kindergartens conduct daily learning immersed in natural woodland environments regardless of inclement weather."
      },
      {
        "letter": "B",
        "text": "Educators emphasize child-led, play-based exploration and managed risk-taking, including tree climbing, tool crafting, and campfire management under gentle supervision. Longitudinal psychological studies demonstrate that outdoor pupils develop superior motor coordination, heightened emotional self-regulation, and greater resilience when confronting unfamiliar obstacles."
      },
      {
        "letter": "C",
        "text": "Skeptics frequently question how unstructured outdoor play translates into formal literacy and numeracy competencies. However, comparative cognitive assessments reveal that forest school graduates exhibit advanced problem-solving capabilities and collaborative leadership skills that easily bridge the transition to conventional primary curricula."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c18-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 14.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 14.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 15.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 15.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 16.",
        "correctAnswer": "C",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 16.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 17.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 17.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 18.",
        "correctAnswer": "A",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 18.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 19.",
        "correctAnswer": "B",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 19.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q20",
        "number": 20,
        "type": "matching_info",
        "groupHeader": "Questions 14–20",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 20.",
        "correctAnswer": "C",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 20.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q21",
        "number": 21,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 21.",
        "correctAnswer": "woodland",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 21.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q22",
        "number": 22,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 22.",
        "correctAnswer": "tools",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 22.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q23",
        "number": 23,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 23.",
        "correctAnswer": "climbing",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 23.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 24.",
        "correctAnswer": "resilience",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 24.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 25.",
        "correctAnswer": "literacy",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 25.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 21–26",
        "groupInstruction": "Answer questions based on Passage 2.",
        "question": "Forest school developmental trait 26.",
        "correctAnswer": "coordination",
        "explanation": "Dẫn chứng giáo dục tự nhiên câu 26.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-18-test-1-p3",
    "source": "Cambridge 18 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "Conquering Earth’s Space Junk Problem",
    "subtitle": "Orbital tracking, active debris removal, and international space traffic coordination",
    "topic": "Aerospace Engineering & Space Law",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 970,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Over six decades of spaceflight have congested Low Earth Orbit (LEO) with hundreds of thousands of discarded rocket stages, defunct satellites, and fragmentation shrapnel hurtling at speeds exceeding twenty-seven thousand kilometers per hour. A hypervelocity collision with a piece of debris as minuscule as a marble carries the kinetic energy of an exploding hand grenade."
      },
      {
        "letter": "B",
        "text": "Astrophysicist Donald Kessler posited in 1978 that orbital debris density could surpass a critical threshold triggering a runaway cascade of collisions—known as the Kessler Syndrome. Under this catastrophic scenario, satellite impacts generate multiplying clouds of secondary fragments, rendering entire orbital planes permanently inaccessible for navigation and telecommunications."
      },
      {
        "letter": "C",
        "text": "Aerospace consortia are trialing active debris removal technologies, including robotic harpoons, magnetic capture arms, and ground-based laser ablation to decelerate targeted debris into atmospheric incineration. Concurrently, space legal scholars advocate binding international registries and decommissioning protocols to prevent outer space from becoming an unnavigable wasteland."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c18-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 27.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 27.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 28.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 28.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 29.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 29.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 30.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 30.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q31",
        "number": 31,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 31.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 31.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q32",
        "number": 32,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 32.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "C",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 32.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q33",
        "number": 33,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 33.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "A",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 33.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q34",
        "number": 34,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–34",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 34.",
        "options": [
          {
            "id": "a",
            "label": "A",
            "text": "A"
          },
          {
            "id": "b",
            "label": "B",
            "text": "B"
          },
          {
            "id": "c",
            "label": "C",
            "text": "C"
          },
          {
            "id": "d",
            "label": "D",
            "text": "D"
          }
        ],
        "correctAnswer": "D",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 34.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 35.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 35.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 36.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 36.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q37",
        "number": 37,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 37.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 37.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q38",
        "number": 38,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 38.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 38.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q39",
        "number": 39,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 39.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 39.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c18-t1-q40",
        "number": 40,
        "type": "tfng",
        "groupHeader": "Questions 35–40",
        "groupInstruction": "Answer questions based on Passage 3.",
        "question": "Space debris dynamic 40.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Dẫn chứng rác vũ trụ Kessler Syndrome câu 40.",
        "referenceParagraph": "Đoạn B"
      }
    ]
  },
  {
    "id": "cambridge-19-test-1-p2",
    "source": "Cambridge 19 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "The History of the Modern Bicycle",
    "subtitle": "From the wooden draisine to the pneumatic safety bicycle: a transport revolution",
    "topic": "History of Technology & Transport",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 920,
    "paragraphs": [
      {
        "letter": "A",
        "text": "The ancestor of the modern bicycle was conceived in 1817 by German inventor Baron Karl von Drais. Known as the Laufmaschine or 'running machine', this steerable, two-wheeled wooden contraption had neither pedals nor gears. Riders propelled themselves by rhythmically striding along the ground, balancing atop the horizontal crossbar. Although popular as an aristocratic novelty in European parks, it offered limited practical utility on rutted cobblestone roads."
      },
      {
        "letter": "B",
        "text": "In the 1860s, French coachbuilders Pierre Michaux and Pierre Lallement attached rotary cranks and pedals directly to the front wheel axle, creating the 'velocipede'. Affectionately dubbed the 'boneshaker', its rigid wrought-iron frame and iron-banded wooden wheels transmitted brutal vibrations to the rider. Despite its discomfort, the velocipede sparked the world's first widespread cycling craze across Paris, London, and New York."
      },
      {
        "letter": "C",
        "text": "To achieve greater speeds without gearing, designers in the 1870s dramatically enlarged the front driven wheel, culminating in the iconic 'penny-farthing'. With front wheels up to 1.5 meters in diameter, a single pedal rotation propelled the machine forward a substantial distance. However, positioning the rider's center of gravity high above the front axle made the high-wheeler treacherous; hitting a modest pebble could catapult the cyclist headfirst over the handlebars."
      },
      {
        "letter": "D",
        "text": "The critical synthesis of speed and stability was achieved in 1885 with John Kemp Starley's 'Rover Safety Bicycle'. Starley adopted equal-sized wheels, an indirect chain drive to the rear wheel, and a diamond-pattern tubular steel frame. When Scottish veterinary surgeon John Boyd Dunlop introduced pneumatic inflatable rubber tires in 1888, cycling was instantly transformed from a hazardous pursuit into a comfortable, democratic mode of personal transit."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c19-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Reading Passage 2 has four sections, A–D. Which section contains the following information?",
        "question": "The reason why the penny-farthing was prone to throwing riders forward.",
        "correctAnswer": "C",
        "explanation": "Mục C giải thích trọng tâm người lái nằm quá cao phía trên trục bánh trước khiến xe dễ bị lộn nhào khi vấp sỏi.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c19-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "A description of the very first steerable two-wheeled vehicle without pedals.",
        "correctAnswer": "A",
        "explanation": "Mục A mô tả xe chạy Laufmaschine của Nam tước Karl von Drais không có bàn đạp hay bánh răng.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c19-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "An innovation that significantly improved riding comfort by absorbing vibrations.",
        "correctAnswer": "D",
        "explanation": "Mục D nêu phát minh lốp cao su bơm hơi của bác sĩ thú y John Boyd Dunlop giúp hấp thụ rung chấn.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "Why early velocipedes earned the unflattering nickname 'boneshakers'.",
        "correctAnswer": "B",
        "explanation": "Mục B giải thích khung sắt và bánh viền sắt truyền rung động dữ dội lên cơ thể người lái.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c19-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "The machine that popularized the diamond-pattern tubular frame and chain drive.",
        "correctAnswer": "D",
        "explanation": "Mục D giới thiệu xe đạp an toàn Rover của Starley với xích truyền động và khung hình thoi.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q19",
        "number": 19,
        "type": "tfng",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Do the following statements agree with the information given in Reading Passage 2? Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Baron von Drais intended his invention to be used primarily by agricultural workers.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn A chỉ ra xe là món đồ tiêu khiển của giới quý tộc (aristocratic novelty in European parks).",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c19-t1-q20",
        "number": 20,
        "type": "tfng",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "The penny-farthing had identical diameter measurements for both wheels.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn C giải thích penny-farthing có bánh trước khổng lồ (tới 1.5 mét) trong khi bánh sau rất nhỏ.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c19-t1-q21",
        "number": 21,
        "type": "tfng",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Starley's Rover Safety Bicycle achieved massive commercial success internationally.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "TRUE",
        "explanation": "Đoạn D xác nhận xe Rover biến xe đạp thành phương tiện giao thông cá nhân phổ biến và tiện nghi.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q22",
        "number": 22,
        "type": "tfng",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "John Boyd Dunlop was originally a professional mechanical engineer.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "FALSE",
        "explanation": "Đoạn D ghi rõ Dunlop là bác sĩ thú y người Scotland (Scottish veterinary surgeon).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q23",
        "number": 23,
        "type": "tfng",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Write TRUE, FALSE, or NOT GIVEN.",
        "question": "Pneumatic tires were initially rejected by cycle racing competitors.",
        "options": [
          {
            "id": "true",
            "label": "TRUE",
            "text": "TRUE"
          },
          {
            "id": "false",
            "label": "FALSE",
            "text": "FALSE"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Bài đọc không đề cập thái độ của các tay đua xe đạp thời điểm đó đối với lốp bơm hơi.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose ONE WORD ONLY from the passage for each answer.",
        "question": "The Rover safety bicycle featured a rear wheel driven by a metal [24] ……………",
        "correctAnswer": "chain",
        "explanation": "Đoạn D: indirect chain drive to the rear wheel.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Frame tubes were constructed from lightweight [25] ……………",
        "correctAnswer": "steel",
        "explanation": "Đoạn D: diamond-pattern tubular steel frame.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Tires contained pressurized air inside flexible [26] …………… casings.",
        "correctAnswer": "rubber",
        "explanation": "Đoạn D: pneumatic inflatable rubber tires.",
        "referenceParagraph": "Đoạn D"
      }
    ]
  },
  {
    "id": "cambridge-19-test-1-p3",
    "source": "Cambridge 19 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "The Green Movement in the United Kingdom",
    "subtitle": "Fifty years of environmental advocacy, parliamentary legislation, and grassroots mobilization",
    "topic": "Environmental History & Public Policy",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 965,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Britain's environmental consciousness has deep historical antecedents rooted in the ecological devastation of the Industrial Revolution. The Great Smog of London in December 1952, which claimed over 4,000 lives due to sulfurous coal emissions, compelled parliament to pass the landmark Clean Air Act of 1956. This early statutory intervention demonstrated that public health mandates could curb industrial atmospheric contamination without causing economic collapse."
      },
      {
        "letter": "B",
        "text": "By the late 1960s and early 1970s, isolated anti-pollution campaigns coalesced into a coherent ideological movement. The publication of seminal texts like Rachel Carson's Silent Spring and the Club of Rome's Limits to Growth fostered widespread apprehension regarding ecological limits. In 1972, the United Kingdom witnessed the founding of the PEOPLE Party, Europe's earliest political party dedicated explicitly to green principles, later evolving into the Green Party of England and Wales."
      },
      {
        "letter": "C",
        "text": "During the 1980s and 1990s, the green movement expanded its influence from niche activist circles into mainstream civic and corporate spheres. Non-governmental organizations such as Greenpeace UK and Friends of the Earth mastered sophisticated media campaigns and grassroots direct action. Simultaneously, acid rain in Scandinavia and the Chernobyl nuclear disaster highlighted that ecological crises transcend national frontiers, necessitating multilateral treaty frameworks."
      },
      {
        "letter": "D",
        "text": "In recent decades, legislative milestones have reflected this shifting consensus, culminating in the legally binding Climate Change Act of 2008 and subsequent net-zero carbon pledges. Today, the debate in Britain is no longer whether environmental stewardship is necessary, but how rapidly the economy can transition away from fossil fuels while maintaining social equity and industrial resilience."
      }
    ],
    "targetWords": [],
    "questions": [
      {
        "id": "c19-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What prompted the UK government to introduce the Clean Air Act in 1956?",
        "options": [
          {
            "id": "the-discovery-of-acid-precipitation-in-scotland",
            "label": "The discovery of acid precipitation in Scotland",
            "text": "The discovery of acid precipitation in Scotland"
          },
          {
            "id": "catastrophic-fatalities-caused-by-the-1952-great-smog",
            "label": "Catastrophic fatalities caused by the 1952 Great Smog",
            "text": "Catastrophic fatalities caused by the 1952 Great Smog"
          },
          {
            "id": "economic-boycotts-from-european-trading-partners",
            "label": "Economic boycotts from European trading partners",
            "text": "Economic boycotts from European trading partners"
          },
          {
            "id": "public-protests-against-nuclear-power-installations",
            "label": "Public protests against nuclear power installations",
            "text": "Public protests against nuclear power installations"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn A: Khói mù lịch sử tháng 12/1952 khiến hơn 4.000 người thiệt mạng đã thúc đẩy Quốc hội thông qua Đạo luật Không khí Sạch.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c19-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "The founding of the PEOPLE Party in 1972 was notable because it",
        "options": [
          {
            "id": "was-immediately-endorsed-by-the-ruling-government-",
            "label": "was immediately endorsed by the ruling government.",
            "text": "was immediately endorsed by the ruling government."
          },
          {
            "id": "represented-europe-s-earliest-green-political-party-",
            "label": "represented Europe's earliest green political party.",
            "text": "represented Europe's earliest green political party."
          },
          {
            "id": "advocated-for-the-total-abolition-of-automotive-manufacturing-",
            "label": "advocated for the total abolition of automotive manufacturing.",
            "text": "advocated for the total abolition of automotive manufacturing."
          },
          {
            "id": "was-financed-exclusively-by-petroleum-companies-",
            "label": "was financed exclusively by petroleum companies.",
            "text": "was financed exclusively by petroleum companies."
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn B khẳng định đảng PEOPLE là đảng chính trị đầu tiên tại châu Âu được thành lập vì các mục tiêu môi trường.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c19-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "International environmental crises in the 1980s proved that",
        "options": [
          {
            "id": "atmospheric-degradation-respects-sovereign-national-boundaries-",
            "label": "atmospheric degradation respects sovereign national boundaries.",
            "text": "atmospheric degradation respects sovereign national boundaries."
          },
          {
            "id": "pollution-challenges-require-cross-border-international-treaties-",
            "label": "pollution challenges require cross-border international treaties.",
            "text": "pollution challenges require cross-border international treaties."
          },
          {
            "id": "grassroots-organizations-are-powerless-against-multinational-firms-",
            "label": "grassroots organizations are powerless against multinational firms.",
            "text": "grassroots organizations are powerless against multinational firms."
          },
          {
            "id": "nuclear-energy-produces-zero-environmental-risks-",
            "label": "nuclear energy produces zero environmental risks.",
            "text": "nuclear energy produces zero environmental risks."
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn C nhấn mạnh thảm họa Chernobyl và mưa axit chứng minh khủng hoảng sinh thái vượt khỏi biên giới quốc gia, đòi hỏi hiệp ước đa phương.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c19-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What describes the contemporary focus of UK ecological politics?",
        "options": [
          {
            "id": "debating-whether-global-warming-is-scientifically-valid",
            "label": "Debating whether global warming is scientifically valid",
            "text": "Debating whether global warming is scientifically valid"
          },
          {
            "id": "implementing-rapid-economic-decarbonization-while-maintaining-social-fairness",
            "label": "Implementing rapid economic decarbonization while maintaining social fairness",
            "text": "Implementing rapid economic decarbonization while maintaining social fairness"
          },
          {
            "id": "reverting-entirely-to-pre-industrial-agrarian-lifestyles",
            "label": "Reverting entirely to pre-industrial agrarian lifestyles",
            "text": "Reverting entirely to pre-industrial agrarian lifestyles"
          },
          {
            "id": "relying-strictly-on-voluntary-corporate-self-regulation",
            "label": "Relying strictly on voluntary corporate self-regulation",
            "text": "Relying strictly on voluntary corporate self-regulation"
          }
        ],
        "correctAnswer": "B",
        "explanation": "Đoạn D tổng kết tranh luận hiện nay là tốc độ chuyển đổi giảm phát thải carbon kết hợp đảm bảo công bằng xã hội.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q31",
        "number": 31,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Do the following statements agree with the claims of the writer in Reading Passage 3? Write YES, NO, or NOT GIVEN.",
        "question": "The 1956 Clean Air Act caused widespread manufacturing plant bankruptcies.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Đoạn A khẳng định đạo luật bảo vệ sức khỏe không hề gây sụp đổ kinh tế (without causing economic collapse).",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c19-t1-q32",
        "number": 32,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Rachel Carson's book Silent Spring influenced British environmental activists.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Đoạn B xác nhận các tác phẩm kinh điển như Silent Spring đã nuôi dưỡng nhận thức sâu sắc về giới hạn sinh thái.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c19-t1-q33",
        "number": 33,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "The UK Green Party has won the majority of parliamentary elections since 1990.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Đảng Xanh chưa từng chiếm đa số ghế trong Quốc hội Anh.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c19-t1-q34",
        "number": 34,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Greenpeace UK utilized television media campaigns to sway public sentiment.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Đoạn C ghi nhận Greenpeace UK đã thuần thục việc sử dụng truyền thông để gây ảnh hưởng.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c19-t1-q35",
        "number": 35,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "The Climate Change Act of 2008 was purely symbolic with no legally binding targets.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Đoạn D khẳng định đạo luật năm 2008 có tính ràng buộc pháp lý (legally binding Climate Change Act).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 31–36",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Solar panel subsidies have been universally accepted across all UK municipalities.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Không có thông tin về sự đồng thuận trợ cấp pin mặt trời giữa các địa phương.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q37",
        "number": 37,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "Industrial pollution in London led to the landmark Clean [37] …………… Act of 1956.",
        "correctAnswer": "Air",
        "explanation": "Đoạn A: Clean Air Act of 1956.",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c19-t1-q38",
        "number": 38,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Acid rain in Scandinavia highlighted problems that crossed national [38] ……………",
        "correctAnswer": "frontiers",
        "explanation": "Đoạn C: crises transcend national frontiers.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c19-t1-q39",
        "number": 39,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Modern treaties compel nations to reach net-zero [40] …………… emissions.",
        "correctAnswer": "carbon",
        "explanation": "Đoạn D: net-zero carbon pledges.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c19-t1-q40",
        "number": 40,
        "type": "summary_completion",
        "groupHeader": "Questions 37–40",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Decarbonization policies must preserve industrial [40] ……………",
        "correctAnswer": "resilience",
        "explanation": "Đoạn D: maintaining social equity and industrial resilience.",
        "referenceParagraph": "Đoạn D"
      }
    ]
  },
  {
    "id": "cambridge-20-test-1-p2",
    "source": "Cambridge 20 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 2,
    "title": "Bring elms to Britain",
    "subtitle": "Mark Rowe investigates attempts to reintroduce Dutch elm disease-resilient elms to Britain",
    "topic": "Ecology & Botany",
    "level": "Passage 2 (Trung cấp)",
    "estimatedMinutes": 20,
    "wordCount": 907,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Around 25 million elms, accounting for 90% of all elm trees in the UK, died during the    1960s and '70s of Dutch elm disease. In the aftermath, the elm, once so dominant in the British landscape, was largely forgotten. However, there's now hope the elm may be reintroduced to the countryside of central and southern England. Any reintroduction will start from a very low base. 'The impact of the disease is difficult to picture if you hadn't seen what was there before,' says Matt Elliot of the Woodland Trust. 'You look at old photographs from the 1960s and it's only then that you realise the impact [elms had] ... They were significant, large trees... then they were gone.'"
      },
      {
        "letter": "B",
        "text": "The disease is caused by a fungus that blocks the elms' vascular (water, nutrient and food transport) system, causing branches to wilt and die. A first epidemic, which occurred in the 1920s, gradually died down, but in the '70s a second epidemic was triggered by shipments of elm from Canada. The wood came in the form of logs destined for boat building and its intact bark was perfect for the elm bark beetles that spread the deadly fungus. This time, the beetles carried a much more virulent strain that destroyed the vast majority of British elms."
      },
      {
        "letter": "C",
        "text": "Today, elms still exist in the southern English countryside but mostly only in low hedgerows between fields. 'We have millions of small elms in hedgerows but they get targeted by the beetle as soon as they reach a certain size,' says Karen Russell, co-author of the report 'Where we are with elm'. Once the trunk of the elm reaches 10-15 centimetres or so in diameter, it becomes a perfect size for beetles to lay eggs and for the fungus to take hold. Yet mature specimens have been identified, in counties such as Cambridgeshire, that are hundreds of years old, and have mysteriously escaped the epidemic. The key, Russell says, is to identify and study those trees that have survived and work out why they stood tall when millions of others succumbed. Nevertheless, opportunities are limited as the number of these mature survivors is relatively small. 'What are the reasons for their survival?' asks Russell. 'Avoidance, tolerance, resistance? We don't know where the balance lies between the three. I don't see how it can be entirely down to luck.'"
      },
      {
        "letter": "D",
        "text": "For centuries, elm ran a close second to oak as the hardwood tree of choice in Britain and was in many instances the most prominent tree in the landscape. Not only was elm common in European forests, it became a key component of birch, ash and hazel woodlands. The use of elm is thought to go back to the Bronze Age, when it was widely used for tools. Elm was also the preferred material for shields and early swords. In the 18th century, it was planted more widely and its wood was used for items such as storage crates and flooring. It was also suitable for items that experienced high levels of impact and was used to build the keel of the 19th-century sailing ship Cutty Sark as well as mining equipment."
      },
      {
        "letter": "E",
        "text": "Given how ingrained elm is in British culture, it's unsurprising the tree has many advocates. Amongst them is Peter Bourne of the National Elm Collection in Brighton. 'I saw Dutch elm disease unfold as a small boy,' he says. 'The elm seemed to be part of rural England, but I remember watching trees just lose their leaves and that really stayed with me.' Today, the city of Brighton's elms total about 17,000. Local factors appear to have contributed to their survival. Strong winds from the sea make it difficult for the determined elm bark beetle to attack this coastal city's elm population. However, the situation is precarious. 'The beetles can just march in if we're not careful, as the threat is right on our doorstep,' says Bourne."
      },
      {
        "letter": "F",
        "text": "Any prospect of the elm returning relies heavily on trees being either resistant to, or tolerant of, the disease. This means a widespread reintroduction would involve existing or new hybrid strains derived from resistant, generally non-native elm species. A new generation of seedlings have been bred and tested to see if they can withstand the fungus by cutting a small slit on the bark and injecting a tiny amount of the pathogen. 'The effects are very quick,' says Russell. 'You return in four to six weeks and trees that are resistant show no symptoms, whereas those that are susceptible show leaf loss and may even have died completely.'"
      },
      {
        "letter": "G",
        "text": "All of this raises questions of social acceptance, acknowledges Russell. 'If we're putting elm back into the landscape, a small element of it is not native are we bothered about that?' For her, the environmental case for reintroducing elm is strong. 'They will host wildlife, which is a good thing.' Others are more wary. 'On the face of it, it seems like a good idea,' says Elliot. The problem, he suggests, is that, 'You're replacing a native species with a horticultural analogue*. You're effectively cloning.' There's also the risk of introducing new diseases. Rather than plant new elms, the Woodland Trust emphasises providing space to those elms that have survived independently. 'Sometimes the best thing you can do is just give nature time to recover over time, you might get resistance,' says Elliot. * horticultural analogue: a cultivated plant species that is genetically similar to an existing species"
      }
    ],
    "targetWords": [
      {
        "id": "c20-tw-resilience",
        "word": "resilience",
        "partOfSpeech": "noun",
        "ipa": "/rɪˈzɪl.jəns/",
        "definitionVi": "Khả năng phục hồi, tính kiên cường",
        "definitionEn": "The capacity to recover quickly from difficulties.",
        "collocations": [],
        "contextSentence": "Cultivating disease-resilient elms is vital for British woodlands.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c20-t1-q14",
        "number": 14,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Reading Passage 2 has seven sections, A–G. Which section contains the following information? You may use any letter more than once.",
        "question": "reference to the research problems that arise from there being only a few surviving large elms",
        "correctAnswer": "C",
        "explanation": "Mục C thảo luận về việc số lượng cây trưởng thành còn sót lại quá ít gây khó khăn cho việc nghiên cứu tính kháng bệnh.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q15",
        "number": 15,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "details of a difference of opinion about the value of reintroducing elms to Britain",
        "correctAnswer": "G",
        "explanation": "Mục G trình bày các luồng quan điểm trái chiều giữa các nhà bảo tồn về việc tái nhập cây du.",
        "referenceParagraph": "Đoạn G"
      },
      {
        "id": "c20-t1-q16",
        "number": 16,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "reference to how Dutch elm disease was brought into Britain",
        "correctAnswer": "B",
        "explanation": "Mục B giải thích mầm bệnh du nhập vào Anh thông qua các chuyến hàng nhập khẩu gỗ từ Bắc Mỹ.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c20-t1-q17",
        "number": 17,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "a description of the conditions that have enabled a location in Britain to escape Dutch elm disease",
        "correctAnswer": "E",
        "explanation": "Mục E mô tả vị trí ven biển Brighton với điều kiện gió biển khắc nghiệt ngăn cản bọ cánh cứng mang nấm gây bệnh.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q18",
        "number": 18,
        "type": "matching_info",
        "groupHeader": "Questions 14–18",
        "groupInstruction": "Which section contains the following information?",
        "question": "reference to the stage at which young elms become vulnerable to Dutch elm disease",
        "correctAnswer": "C",
        "explanation": "Mục C nêu rõ cây con khi đạt đường kính thân khoảng 10cm thì bắt đầu thu hút bọ mang nấm.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q19",
        "number": 19,
        "type": "matching_info",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Match each statement with the correct person, A, B, or C. (A: Peter Bourne, B: Karen Russell, C: Martin Brookes)",
        "question": "If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.",
        "correctAnswer": "B",
        "explanation": "Bà Karen Russell nhấn mạnh triệu chứng lá vàng úa và cành chết khô xuất hiện chỉ trong vài tuần.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q20",
        "number": 20,
        "type": "matching_info",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Match each statement with the correct person.",
        "question": "It may be better to wait and see if the mature elms that have survived continue to flourish.",
        "correctAnswer": "A",
        "explanation": "Peter Bourne đề xuất theo dõi sự phát triển tự nhiên của các cá thể du cổ thụ còn sống sót.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q21",
        "number": 21,
        "type": "matching_info",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Match each statement with the correct person.",
        "question": "There must be an explanation for the survival of some mature elms.",
        "correctAnswer": "B",
        "explanation": "Karen Russell khẳng định việc một số cây sống sót không thể chỉ là ngẫu nhiên mà có cơ chế sinh học đằng sau.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q22",
        "number": 22,
        "type": "matching_info",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Match each statement with the correct person.",
        "question": "We need to be aware that insects carrying Dutch elm disease are not very far away.",
        "correctAnswer": "C",
        "explanation": "Martin Brookes cảnh báo quần thể bọ cánh cứng mang bào tử nấm luôn hiện diện ở vùng đệm.",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c20-t1-q23",
        "number": 23,
        "type": "matching_info",
        "groupHeader": "Questions 19–23",
        "groupInstruction": "Match each statement with the correct person.",
        "question": "You understand the effect of Dutch elm disease if you saw it happen.",
        "correctAnswer": "A",
        "explanation": "Peter Bourne hồi tưởng về ký ức tuổi thơ chứng kiến cây du chết hàng loạt trên khắp làng quê nước Anh.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q24",
        "number": 24,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
        "question": "For hundreds of years, the only tree that was more popular in Britain than elm was [24] ……………",
        "correctAnswer": "oak",
        "explanation": "Đoạn D: \"For centuries, the elm was second in British affection and utility only to the majestic oak\".",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q25",
        "number": 25,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "In the 18th century, it was grown to provide wood for boxes and [25] ……………",
        "correctAnswer": "flooring",
        "explanation": "Đoạn D: \"timber merchants utilized durable elm wood for shipping containers, coffin boards and interior flooring\".",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q26",
        "number": 26,
        "type": "summary_completion",
        "groupHeader": "Questions 24–26",
        "groupInstruction": "Choose ONE WORD ONLY.",
        "question": "Due to its strength, elm was often used for mining equipment and the Cutty Sark's [26] …………… was also constructed from elm.",
        "correctAnswer": "keel",
        "explanation": "Đoạn D: \"its water-resistant properties led to its use in the underwater keel of the 19th-century clipper Cutty Sark\".",
        "referenceParagraph": "Đoạn D"
      }
    ]
  },
  {
    "id": "cambridge-20-test-1-p3",
    "source": "Cambridge 20 - Test 1",
    "sourceType": "cambridge",
    "passageNumber": 3,
    "title": "How stress affects our judgement",
    "subtitle": "Investigating whether we become better or worse at processing information under stressful conditions",
    "topic": "Neuroscience & Psychology",
    "level": "Passage 3 (Nâng cao)",
    "estimatedMinutes": 20,
    "wordCount": 945,
    "paragraphs": [
      {
        "letter": "A",
        "text": "Some of the most important decisions of our lives occur while we're feeling stressed and anxious. From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions. But do we become better or worse at processing and using information under such circumstances?"
      },
      {
        "letter": "B",
        "text": "My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations. Firefighters' workdays vary quite a bit. Some are pretty relaxed; they'll spend their time washing the truck, cleaning equipment, cooking meals and reading. Other days can be hectic, with numerous life-threatening incidents to attend to; they'll enter burning homes to rescue trapped residents, and assist with medical emergencies. These ups and downs presented the perfect setting for an experiment on how people's ability to use information changes when they feel under pressure."
      },
      {
        "letter": "C",
        "text": "We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters - but only as long as it conveyed bad news."
      },
      {
        "letter": "D",
        "text": "This is how we arrived at these results. We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud. We then gave them either good news (that their likelihood of experiencing these events was lower than they'd thought) or bad news (that it was higher) and asked them to provide new estimates."
      },
      {
        "letter": "E",
        "text": "People are normally quite optimistic - they will ignore bad news and embrace the good. This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged. Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they'd thought), and altered their beliefs in response. In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought). Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online. Sure"
      },
      {
        "letter": "F",
        "text": "enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence."
      },
      {
        "letter": "G",
        "text": "When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong. Brain imaging reveals that this 'switch' is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear."
      },
      {
        "letter": "H",
        "text": "Such neural engineering could have helped prehistoric humans to survive. When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards. In a safe environment, however, it would have been wasteful to be on high alert constantly. So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful. In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them."
      },
      {
        "letter": "I",
        "text": "It is also important to realise that stress travels rapidly from one person to the next. If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves. We don't even need to be in the same room with someone for their emotions to influence our behaviour. Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves. If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts."
      },
      {
        "letter": "J",
        "text": "In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media. Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post. Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities."
      },
      {
        "letter": "K",
        "text": "The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified. After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of. But that has the effect of exaggerating existing danger. And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which"
      },
      {
        "letter": "L",
        "text": "increases stress further. As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do."
      },
      {
        "letter": "M",
        "text": "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions. Being aware of the information can help us frame our messages more effectively and become conscientious agents of change."
      }
    ],
    "targetWords": [
      {
        "id": "c20-tw-cortisol",
        "word": "cortisol",
        "partOfSpeech": "noun",
        "ipa": "/ˈkɔːr.tə.zɑːl/",
        "definitionVi": "Hormone căng thẳng cortisol",
        "definitionEn": "A steroid hormone produced in response to stress.",
        "collocations": [],
        "contextSentence": "When stress strikes, cortisol spikes in the bloodstream.",
        "explanation": ""
      }
    ],
    "questions": [
      {
        "id": "c20-t1-q27",
        "number": 27,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "In the first paragraph, the writer introduces the topic of the text by",
        "options": [
          {
            "id": "defining-some-commonly-used-terms-",
            "label": "defining some commonly used terms.",
            "text": "defining some commonly used terms."
          },
          {
            "id": "questioning-a-widely-held-assumption-",
            "label": "questioning a widely held assumption.",
            "text": "questioning a widely held assumption."
          },
          {
            "id": "mentioning-a-challenge-faced-by-everyone-",
            "label": "mentioning a challenge faced by everyone.",
            "text": "mentioning a challenge faced by everyone."
          },
          {
            "id": "specifying-a-situation-which-makes-us-most-anxious-",
            "label": "specifying a situation which makes us most anxious.",
            "text": "specifying a situation which makes us most anxious."
          }
        ],
        "correctAnswer": "C",
        "explanation": "Đoạn 1 nêu: \"From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions\" (Mọi người đều phải đối mặt với thử thách ra quyết định dưới áp lực).",
        "referenceParagraph": "Đoạn A"
      },
      {
        "id": "c20-t1-q28",
        "number": 28,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What point does the writer make about firefighters in the second paragraph?",
        "options": [
          {
            "id": "the-regular-changes-of-stress-levels-in-their-working-lives-make-them-ideal-study-subjects-",
            "label": "The regular changes of stress levels in their working lives make them ideal study subjects.",
            "text": "The regular changes of stress levels in their working lives make them ideal study subjects."
          },
          {
            "id": "the-strategies-they-use-to-handle-stress-are-of-particular-interest-to-researchers-",
            "label": "The strategies they use to handle stress are of particular interest to researchers.",
            "text": "The strategies they use to handle stress are of particular interest to researchers."
          },
          {
            "id": "their-reactions-to-stress-vary-more-widely-than-those-of-other-professionals-",
            "label": "Their reactions to stress vary more widely than those of other professionals.",
            "text": "Their reactions to stress vary more widely than those of other professionals."
          },
          {
            "id": "they-are-more-prone-to-making-poor-decisions-under-stress-than-average-citizens-",
            "label": "They are more prone to making poor decisions under stress than average citizens.",
            "text": "They are more prone to making poor decisions under stress than average citizens."
          }
        ],
        "correctAnswer": "A",
        "explanation": "Đoạn 2: Sự chuyển đổi luân phiên giữa trạng thái nhàn rỗi ở trạm và tình huống khẩn cấp nguy hiểm khiến lính cứu hỏa trở thành đối tượng hoàn hảo để nghiên cứu.",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c20-t1-q29",
        "number": 29,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "What did the laboratory experiment involving cortisol levels demonstrate?",
        "options": [
          {
            "id": "elevated-cortisol-impairs-logical-deduction-",
            "label": "Elevated cortisol impairs logical deduction.",
            "text": "Elevated cortisol impairs logical deduction."
          },
          {
            "id": "cortisol-increases-heart-rate-without-altering-cognition-",
            "label": "Cortisol increases heart rate without altering cognition.",
            "text": "Cortisol increases heart rate without altering cognition."
          },
          {
            "id": "subjects-became-indifferent-to-risks-",
            "label": "Subjects became indifferent to risks.",
            "text": "Subjects became indifferent to risks."
          },
          {
            "id": "stress-hormones-enhanced-sensitivity-to-warning-signs-",
            "label": "Stress hormones enhanced sensitivity to warning signs.",
            "text": "Stress hormones enhanced sensitivity to warning signs."
          }
        ],
        "correctAnswer": "D",
        "explanation": "Đoạn 3 chỉ ra: Khi nồng độ cortisol tăng cao, người tham gia xử lý các thông tin cảnh báo tiêu cực nhanh và chính xác hơn hẳn.",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q30",
        "number": 30,
        "type": "multiple_choice",
        "groupHeader": "Questions 27–30",
        "groupInstruction": "Choose the correct letter, A, B, C or D.",
        "question": "The writer mentions financial market crashes to illustrate that",
        "options": [
          {
            "id": "investors-are-inherently-irrational-",
            "label": "investors are inherently irrational.",
            "text": "investors are inherently irrational."
          },
          {
            "id": "regulations-fail-during-crises-",
            "label": "regulations fail during crises.",
            "text": "regulations fail during crises."
          },
          {
            "id": "stress-induced-decisions-can-cascade-across-societies-",
            "label": "stress-induced decisions can cascade across societies.",
            "text": "stress-induced decisions can cascade across societies."
          },
          {
            "id": "economic-forecasts-are-unreliable-",
            "label": "economic forecasts are unreliable.",
            "text": "economic forecasts are unreliable."
          }
        ],
        "correctAnswer": "C",
        "explanation": "Đoạn 4 minh họa rằng tâm lý hoảng loạn và phản ứng trước tin xấu có tính lây lan, dẫn đến bán tháo cổ phiếu trên diện rộng.",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q31",
        "number": 31,
        "type": "matching_info",
        "groupHeader": "Questions 31–35",
        "groupInstruction": "Complete each sentence with the correct ending, A–G.",
        "question": "At times when they were relaxed, the firefighters usually",
        "correctAnswer": "B",
        "explanation": "Khi thư giãn, lính cứu hỏa có xu hướng ít bận tâm đến các tin tức xấu (took relatively little notice of bad news).",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c20-t1-q32",
        "number": 32,
        "type": "matching_info",
        "groupHeader": "Questions 31–35",
        "groupInstruction": "Complete each sentence with the correct ending.",
        "question": "The researchers noted that when the firefighters were stressed, they",
        "correctAnswer": "G",
        "explanation": "Khi căng thẳng, họ đánh giá nguy cơ xảy ra sự cố tiêu cực là cao hơn nhiều (thought it more likely that they would experience something bad).",
        "referenceParagraph": "Đoạn B"
      },
      {
        "id": "c20-t1-q33",
        "number": 33,
        "type": "matching_info",
        "groupHeader": "Questions 31–35",
        "groupInstruction": "Complete each sentence with the correct ending.",
        "question": "In earlier studies, members of the public who were not under pressure",
        "correctAnswer": "F",
        "explanation": "Những người không chịu áp lực thể hiện xu hướng lạc quan thiên vị đồng nhất (behaved in a similar manner, regardless of circumstances).",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q34",
        "number": 34,
        "type": "matching_info",
        "groupHeader": "Questions 31–35",
        "groupInstruction": "Complete each sentence with the correct ending.",
        "question": "Before testing the students, the researchers deliberately",
        "correctAnswer": "E",
        "explanation": "Các nhà nghiên cứu đã cố tình đặt sinh viên vào tình huống căng thẳng trước bài kiểm tra (put them in a stressful situation).",
        "referenceParagraph": "Đoạn C"
      },
      {
        "id": "c20-t1-q35",
        "number": 35,
        "type": "matching_info",
        "groupHeader": "Questions 31–35",
        "groupInstruction": "Complete each sentence with the correct ending.",
        "question": "People are more likely to act upon warnings when they",
        "correctAnswer": "D",
        "explanation": "Con người dễ tiếp nhận và hành động trước các lời cảnh báo khi đang cảm thấy căng thẳng (were feeling under stress).",
        "referenceParagraph": "Đoạn D"
      },
      {
        "id": "c20-t1-q36",
        "number": 36,
        "type": "tfng",
        "groupHeader": "Questions 36–40",
        "groupInstruction": "Do the following statements agree with the claims of the writer in Reading Passage 3? Write YES, NO, or NOT GIVEN.",
        "question": "The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Đoạn 5 xác nhận sự lây lan cảm xúc: nội dung mạng xã hội thường phản ánh đúng tâm trạng các bài đăng chúng ta đọc.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q37",
        "number": 37,
        "type": "tfng",
        "groupHeader": "Questions 36–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Phones have a greater impact on our stress levels than other electronic media devices.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NOT GIVEN",
        "explanation": "Bài đọc bàn về mạng xã hội nói chung chứ không so sánh tác động của điện thoại so với các thiết bị điện tử khác.",
        "referenceParagraph": "Đoạn E"
      },
      {
        "id": "c20-t1-q38",
        "number": 38,
        "type": "tfng",
        "groupHeader": "Questions 36–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "The more we read about a stressful public event on social media, the less able we are to take effective action.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "NO",
        "explanation": "Tác giả chỉ ra nhận thức được thông tin cảnh báo thực tế kích hoạt phản ứng hành động phòng ngừa hiệu quả chứ không làm tê liệt khả năng hành động.",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c20-t1-q39",
        "number": 39,
        "type": "tfng",
        "groupHeader": "Questions 36–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Messages that express positive feelings can motivate people to solve difficult problems.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Đoạn cuối: \"The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions\".",
        "referenceParagraph": "Đoạn F"
      },
      {
        "id": "c20-t1-q40",
        "number": 40,
        "type": "tfng",
        "groupHeader": "Questions 36–40",
        "groupInstruction": "Write YES, NO, or NOT GIVEN.",
        "question": "Leaders can make use of psychological research findings to improve communication with citizens.",
        "options": [
          {
            "id": "yes",
            "label": "YES",
            "text": "YES"
          },
          {
            "id": "no",
            "label": "NO",
            "text": "NO"
          },
          {
            "id": "not-given",
            "label": "NOT GIVEN",
            "text": "NOT GIVEN"
          }
        ],
        "correctAnswer": "YES",
        "explanation": "Tác giả kết luận việc thấu hiểu cơ chế tiếp nhận thông tin giúp xây dựng thông điệp hiệu quả và trở thành những nhân tố tạo ra sự thay đổi.",
        "referenceParagraph": "Đoạn F"
      }
    ]
  },
];

// ================= CAMBRIDGE LISTENING TESTS & AUDIO SLICES ================= //

export const mockListeningTests: CambridgeListeningTest[] = [
  {
    id: 'cambridge-18-listening-p4',
    title: 'The Impact of Artificial Intelligence on Future Urban Mobility',
    source: 'Cambridge IELTS 18 Test 4',
    part: 4,
    partLabel: 'Part 4: Độc thoại học thuật (Academic Monologue)',
    topic: 'Trí Tuệ Nhân Tạo & Giao Thông Thông Minh',
    speaker: 'Dr. Alistair Finch (Senior Transport Researcher)',
    wpm: 150,
    accent: 'British',
    phoneticFocus: 'Nối âm phụ âm sang nguyên âm (/r/ linking), nuốt âm /t, d/ cuối, nhịp điệu trọng âm câu',
    totalSentences: 5,
    sentences: [
      {
        id: 's-cam18-1',
        sentenceIndex: 1,
        text: 'Autonomous transit networks rely heavily on predictive algorithms to eliminate urban gridlock.',
        vietnameseMeaning: 'Các mạng lưới giao thông tự hành phụ thuộc rất nhiều vào các thuật toán dự đoán để xóa bỏ tình trạng tắc nghẽn giao thông đô thị.',
        hint: 'Bắt đầu bằng tính từ chỉ sự tự hành (A...) và kết thúc bằng thuật ngữ kẹt xe (g...).',
        keyVocab: ['Autonomous /ɔːˈtɑː.nə.məs/', 'Predictive algorithms', 'Urban gridlock /ˈɡrɪd.lɑːk/'],
        phoneticNotes: 'Chú ý nối âm: "rely_heavily_on" và âm đuôi /k/ dứt khoát trong "gridlock".',
      },
      {
        id: 's-cam18-2',
        sentenceIndex: 2,
        text: 'Commuters will experience significant reductions in journey times during peak morning hours.',
        vietnameseMeaning: 'Người đi làm hàng ngày sẽ trải qua sự sụt giảm đáng kể về thời gian di chuyển trong các khung giờ cao điểm buổi sáng.',
        hint: 'Chủ ngữ chỉ người đi làm hàng ngày (C...) và cụm danh từ giảm thời gian (reductions in journey times).',
        keyVocab: ['Commuters /kəˈmjuː.t̬ɚz/', 'Significant reductions', 'Peak hours'],
        phoneticNotes: 'Nối âm: "reductions_in" (/z/ sang /ɪ/). Trọng âm rơi vào âm tiết thứ hai của "co-MMU-ters".',
      },
      {
        id: 's-cam18-3',
        sentenceIndex: 3,
        text: 'Sensors embedded throughout the infrastructure collect telemetry data with unprecedented precision.',
        vietnameseMeaning: 'Các cảm biến gắn xuyên suốt cơ sở hạ tầng thu thập dữ liệu đo xa với độ chuẩn xác chưa từng có.',
        hint: 'Phân từ quá khứ (embedded) và tính từ chỉ sự chưa từng có tiền lệ (unprecedented).',
        keyVocab: ['Embedded /ɪmˈbed.ɪd/', 'Telemetry /təˈlem.ə.tri/', 'Unprecedented /ʌnˈpres.ə.den.t̬ɪd/'],
        phoneticNotes: 'Âm /ed/ trong "embedded" phát âm là /ɪd/. Trọng âm của "un-PRE-ce-den-ted".',
      },
      {
        id: 's-cam18-4',
        sentenceIndex: 4,
        text: 'However the widespread deployment of these autonomous fleets requires rigorous cybersecurity protocols.',
        vietnameseMeaning: 'Tuy nhiên việc triển khai diện rộng các đội xe tự hành này đòi hỏi các giao thức an ninh mạng nghiêm ngặt.',
        hint: 'Từ chỉ sự triển khai (deployment) và tính từ nghiêm ngặt (rigorous).',
        keyVocab: ['Widespread deployment', 'Autonomous fleets', 'Rigorous protocols'],
        phoneticNotes: 'Âm /s/ trong "fleets_requires" và âm nuốt trong "cybersecurity".',
      },
      {
        id: 's-cam18-5',
        sentenceIndex: 5,
        text: 'City councils must establish robust legislative frameworks before granting full operational autonomy.',
        vietnameseMeaning: 'Các hội đồng thành phố phải thiết lập các khuôn khổ pháp lý vững chắc trước khi cấp quyền tự hành vận hành toàn phần.',
        hint: 'Động từ thiết lập (establish) và tính từ thuộc về luật pháp (legislative).',
        keyVocab: ['Legislative frameworks', 'Operational autonomy', 'Robust /roʊˈbʌst/'],
        phoneticNotes: 'Nối âm: "must_establish" (/t/ sang /ɪ/). Trọng âm: "LE-gis-la-tive".',
      },
    ],
  },
  {
    id: 'cambridge-17-listening-p3',
    title: 'Coastal Ecosystem Restoration and Mangrove Conservation',
    source: 'Cambridge IELTS 17 Test 3',
    part: 3,
    partLabel: 'Part 3: Thảo luận học thuật (Academic Discussion)',
    topic: 'Sinh Thái Biển & Rừng Ngập Mặn',
    speaker: 'Dr. Rebecca Barnes & Research Associate Mark',
    wpm: 138,
    accent: 'British',
    phoneticFocus: 'Ngữ điệu phản biện học thuật, âm nuốt (elision), từ vựng môi trường C1',
    totalSentences: 4,
    sentences: [
      {
        id: 's-cam17-1',
        sentenceIndex: 1,
        text: 'Mangrove forests serve as critical natural buffers protecting shorelines from severe coastal erosion.',
        vietnameseMeaning: 'Rừng ngập mặn đóng vai trò là những vùng đệm tự nhiên quan trọng bảo vệ bờ biển khỏi sự xói mòn nghiêm trọng.',
        hint: 'Cụm từ vùng đệm tự nhiên (natural buffers) và sự xói mòn bờ biển (coastal erosion).',
        keyVocab: ['Mangrove forests', 'Natural buffers', 'Coastal erosion /ɪˈroʊ.ʒən/'],
        phoneticNotes: 'Nối âm: "serve_as" (/v/ sang /æ/). Chú ý âm /ʒ/ trong "erosion".',
      },
      {
        id: 's-cam17-2',
        sentenceIndex: 2,
        text: 'Their intricate root systems trap sediment and sequester massive quantities of atmospheric carbon.',
        vietnameseMeaning: 'Hệ thống rễ chằng chịt của chúng giữ lại trầm tích và cô lập một lượng khổng lồ carbon trong khí quyển.',
        hint: 'Tính từ chỉ sự chằng chịt (intricate) và động từ cô lập lưu trữ carbon (sequester).',
        keyVocab: ['Intricate roots', 'Sediment /ˈsed.ə.mənt/', 'Sequester carbon /sɪˈkwes.tɚ/'],
        phoneticNotes: 'Trọng âm: "IN-tri-cate", "se-QUES-ter".',
      },
      {
        id: 's-cam17-3',
        sentenceIndex: 3,
        text: 'Local fishing communities directly benefit from the thriving marine habitats nurtured within these wetlands.',
        vietnameseMeaning: 'Các cộng đồng ngư dân địa phương hưởng lợi trực tiếp từ các môi trường sống sinh vật biển thịnh vượng được nuôi dưỡng bên trong các vùng đất ngập nước này.',
        hint: 'Phân từ quá khứ chỉ sự nuôi dưỡng (nurtured) và từ chỉ vùng đất ngập nước (wetlands).',
        keyVocab: ['Thriving habitats', 'Nurtured /ˈnɝː.tʃɚd/', 'Wetlands'],
        phoneticNotes: 'Nối âm: "benefit_from". Âm đuôi /d/ trong "nurtured".',
      },
      {
        id: 's-cam17-4',
        sentenceIndex: 4,
        text: 'Rehabilitation projects require long-term community involvement rather than top-down governmental decrees.',
        vietnameseMeaning: 'Các dự án phục hồi đòi hỏi sự tham gia lâu dài của cộng đồng thay vì các sắc lệnh mang tính áp đặt từ trên xuống của chính phủ.',
        hint: 'Từ chỉ sự phục hồi (Rehabilitation) và sắc lệnh (decrees).',
        keyVocab: ['Rehabilitation /ˌriː.həˌbɪl.əˈteɪ.ʃən/', 'Community involvement', 'Governmental decrees'],
        phoneticNotes: 'Trọng âm chính rơi vào "ta" trong "re-ha-bi-li-TA-tion".',
      },
    ],
  },
];

// ================= ANKI PRE-BUILT DECKS & STARTER FLASHCARDS ================= //

export const mockAnkiDecks: AnkiDeck[] = [
  {
    id: 'deck-personal',
    title: 'Deck Cá Nhân (Từ Vựng Đã Lưu)',
    description: 'Tập hợp từ vựng học thuật bạn đã lưu từ các bài đọc Cambridge Reading và bài nghe Dictation Studio.',
    category: 'Cá nhân hóa',
    isPersonal: true,
    totalCards: 5,
    dueTodayCount: 3,
    learningCount: 2,
    masteredCount: 0,
    iconName: 'Bookmark',
  },
  {
    id: 'deck-cambridge-500',
    title: 'Cambridge Core 500 Collocations',
    description: '500 cụm từ cố định đắt giá xuất hiện với tần suất cao nhất trong các đề thi Cambridge IELTS 10-19.',
    category: 'Cambridge IELTS',
    isPersonal: false,
    totalCards: 6,
    dueTodayCount: 4,
    learningCount: 2,
    masteredCount: 0,
    iconName: 'BookOpen',
  },
  {
    id: 'deck-awl-band-7',
    title: 'Academic Word List (AWL) Band 7.5+',
    description: 'Danh mục từ vựng học thuật chuẩn hóa của Averil Coxhead với ngữ cảnh câu chuẩn ấn phẩm Oxford & Nature.',
    category: 'Academic Vocabulary',
    isPersonal: false,
    totalCards: 5,
    dueTodayCount: 3,
    learningCount: 1,
    masteredCount: 1,
    iconName: 'Layers',
  },
];

export const mockAnkiCards: AnkiCard[] = [
  // 5 Thẻ thuộc Deck Cá Nhân
  {
    id: 'card-1',
    deckId: 'deck-personal',
    word: 'vernacular',
    ipa: '/vɚˈnæk.jə.lɚ/',
    pos: 'adjective',
    definitionEn: 'Architecture concerned with domestic and functional rather than monumental buildings, native to a region.',
    definitionVi: 'Thuộc về kiến trúc bản địa, truyền thống dân gian của một vùng miền',
    clozeSentence: 'The historical dichotomy between [ ________ ] craftsmanship and industrial efficiency has long sparked debate.',
    fullSentence: 'The historical dichotomy between vernacular craftsmanship and industrial efficiency has long sparked debate.',
    source: 'Cambridge 18 Test 2 Reading',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 3600000).toISOString(), // Due today
    status: 'learning',
    createdDate: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'card-2',
    deckId: 'deck-personal',
    word: 'aesthetic',
    ipa: '/esˈθet.ɪk/',
    pos: 'adjective',
    definitionEn: 'Concerned with beauty or the appreciation of beauty.',
    definitionVi: 'Mang tính thẩm mỹ, nghệ thuật thị giác',
    clozeSentence: 'Architecture has emerged not merely as an [ ________ ] endeavour, but as an ecological science.',
    fullSentence: 'Architecture has emerged not merely as an aesthetic endeavour, but as an ecological science.',
    source: 'Cambridge 18 Test 2 Reading',
    repetitions: 2,
    interval: 3,
    easeFactor: 2.6,
    nextReviewDate: new Date(Date.now() - 7200000).toISOString(), // Due today
    status: 'review',
    createdDate: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'card-3',
    deckId: 'deck-personal',
    word: 'autonomous',
    ipa: '/ɔːˈtɑː.nə.məs/',
    pos: 'adjective',
    definitionEn: 'Having the freedom or power to act independently; self-governing or self-driving.',
    definitionVi: 'Tự hành, tự chủ, hoạt động độc lập không cần người can thiệp',
    clozeSentence: '[ ________ ] transit networks rely heavily on predictive algorithms to eliminate urban gridlock.',
    fullSentence: 'Autonomous transit networks rely heavily on predictive algorithms to eliminate urban gridlock.',
    source: 'Cambridge 18 Test 4 Listening',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 1800000).toISOString(), // Due today
    status: 'new',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-4',
    deckId: 'deck-personal',
    word: 'pedagogical',
    ipa: '/ˌped.əˈɡɑː.dʒɪ.kəl/',
    pos: 'adjective',
    definitionEn: 'Relating to teaching or education methods.',
    definitionVi: 'Thuộc về phương pháp giảng dạy, sư phạm học thuật',
    clozeSentence: 'Modern [ ________ ] institutions have begun restructuring their curricula to integrate computational simulations.',
    fullSentence: 'Modern pedagogical institutions have begun restructuring their curricula to integrate computational simulations.',
    source: 'Cambridge 18 Test 2 Reading',
    repetitions: 1,
    interval: 2,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() + 86400000).toISOString(), // Due tomorrow
    status: 'learning',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-5',
    deckId: 'deck-personal',
    word: 'ergonomic',
    ipa: '/ˌɝː.ɡəˈnɑː.mɪk/',
    pos: 'adjective',
    definitionEn: 'Designed to optimize human well-being and overall system performance.',
    definitionVi: 'Tiện dụng, tối ưu hóa công thái học theo thể trạng con người',
    clozeSentence: 'Studies demonstrate that natural light and [ ________ ] spaces substantially diminish cognitive fatigue.',
    fullSentence: 'Studies demonstrate that natural light and ergonomic spaces substantially diminish cognitive fatigue.',
    source: 'Cambridge 18 Test 2 Reading',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() + 43200000).toISOString(),
    status: 'learning',
    createdDate: new Date().toISOString(),
  },

  // 6 Thẻ thuộc Deck Cambridge Core 500 Collocations
  {
    id: 'card-6',
    deckId: 'deck-cambridge-500',
    word: 'structural integrity',
    ipa: '/ˈstrʌk.tʃɚ.əl ɪnˈteɡ.rə.t̬i/',
    pos: 'phrase',
    definitionEn: 'The ability of a structure to withstand its intended loading without failure.',
    definitionVi: 'Độ vững chãi và toàn vẹn của kết cấu công trình',
    clozeSentence: 'Architects must rigorously balance visual elegance with [ ________ ] and environmental sustainability.',
    fullSentence: 'Architects must rigorously balance visual elegance with structural integrity and environmental sustainability.',
    source: 'Cambridge IELTS 18',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 3600000).toISOString(),
    status: 'new',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-7',
    deckId: 'deck-cambridge-500',
    word: 'unprecedented precision',
    ipa: '/ʌnˈpres.ə.den.t̬ɪd prəˈsɪʒ.ən/',
    pos: 'phrase',
    definitionEn: 'Exactness and accuracy never having happened or existed before.',
    definitionVi: 'Độ chuẩn xác chưa từng có tiền lệ',
    clozeSentence: 'Sensors collect telemetry data with [ ________ ] across all transit junctions.',
    fullSentence: 'Sensors collect telemetry data with unprecedented precision across all transit junctions.',
    source: 'Cambridge IELTS 18',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 1000).toISOString(),
    status: 'learning',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-8',
    deckId: 'deck-cambridge-500',
    word: 'coastal erosion',
    ipa: '/ˈkoʊ.stəl ɪˈroʊ.ʒən/',
    pos: 'phrase',
    definitionEn: 'The gradual wearing away of land and the removal of beach or dune sediments by wave action.',
    definitionVi: 'Sự xói mòn bờ biển do sóng và thủy triều',
    clozeSentence: 'Mangrove forests serve as natural buffers protecting shorelines from severe [ ________ ].',
    fullSentence: 'Mangrove forests serve as natural buffers protecting shorelines from severe coastal erosion.',
    source: 'Cambridge IELTS 17',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 5000).toISOString(),
    status: 'new',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-9',
    deckId: 'deck-cambridge-500',
    word: 'sequester carbon',
    ipa: '/sɪˈkwes.tɚ ˈkɑːr.bən/',
    pos: 'phrase',
    definitionEn: 'To capture and securely store atmospheric carbon dioxide to mitigate global warming.',
    definitionVi: 'Hấp thụ và cô lập khí carbon trong khí quyển',
    clozeSentence: 'Wetland soils can [ ________ ] at rates up to ten times faster than mature terrestrial forests.',
    fullSentence: 'Wetland soils can sequester carbon at rates up to ten times faster than mature terrestrial forests.',
    source: 'Cambridge IELTS 17',
    repetitions: 2,
    interval: 3,
    easeFactor: 2.6,
    nextReviewDate: new Date(Date.now() - 60000).toISOString(),
    status: 'review',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-10',
    deckId: 'deck-cambridge-500',
    word: 'rigorous protocols',
    ipa: '/ˈrɪɡ.ɚ.əs ˈproʊ.t̬ə.kɑːlz/',
    pos: 'phrase',
    definitionEn: 'Extremely thorough and accurate systems of rules and procedures.',
    definitionVi: 'Các quy trình và giao thức kiểm soát nghiêm ngặt',
    clozeSentence: 'The deployment of autonomous fleets mandates compliance with [ ________ ] established by safety boards.',
    fullSentence: 'The deployment of autonomous fleets mandates compliance with rigorous protocols established by safety boards.',
    source: 'Cambridge IELTS 18',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.4,
    nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'learning',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-11',
    deckId: 'deck-cambridge-500',
    word: 'legislative frameworks',
    ipa: '/ˈledʒ.ə.slə.t̬ɪv ˈfreɪm.wɝːks/',
    pos: 'phrase',
    definitionEn: 'Broad systems of rules, regulations, and statutes that govern a specific jurisdiction.',
    definitionVi: 'Khuôn khổ pháp lý, cơ chế luật định',
    clozeSentence: 'Municipalities must introduce robust [ ________ ] before approving widespread commercial flight corridors.',
    fullSentence: 'Municipalities must introduce robust legislative frameworks before approving widespread commercial flight corridors.',
    source: 'Cambridge IELTS 18',
    repetitions: 1,
    interval: 2,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() + 172800000).toISOString(),
    status: 'learning',
    createdDate: new Date().toISOString(),
  },

  // 5 Thẻ thuộc Deck AWL Band 7.5+
  {
    id: 'card-12',
    deckId: 'deck-awl-band-7',
    word: 'diminish',
    ipa: '/dɪˈmɪn.ɪʃ/',
    pos: 'verb',
    definitionEn: 'To make or become less; reduce.',
    definitionVi: 'Làm giảm bớt, suy giảm đáng kể',
    clozeSentence: 'Access to natural daylight can substantially [ ________ ] cognitive fatigue among researchers.',
    fullSentence: 'Access to natural daylight can substantially diminish cognitive fatigue among researchers.',
    source: 'Academic Word List (Sublist 2)',
    repetitions: 3,
    interval: 7,
    easeFactor: 2.7,
    nextReviewDate: new Date(Date.now() - 3600000).toISOString(),
    status: 'review',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-13',
    deckId: 'deck-awl-band-7',
    word: 'inherently',
    ipa: '/ɪnˈhɪr.ənt.li/',
    pos: 'adverb',
    definitionEn: 'In a permanent, essential, or characteristic way.',
    definitionVi: 'Vốn dĩ, mang tính bản chất nội tại không thể tách rời',
    clozeSentence: 'Vernacular designs are [ ________ ] attuned to local microclimatic variations.',
    fullSentence: 'Vernacular designs are inherently attuned to local microclimatic variations.',
    source: 'Academic Word List (Sublist 9)',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() - 2000).toISOString(),
    status: 'new',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-14',
    deckId: 'deck-awl-band-7',
    word: 'paradigm',
    ipa: '/ˈper.ə.daɪm/',
    pos: 'noun',
    definitionEn: 'A typical example or pattern of something; a model or distinct theoretical framework.',
    definitionVi: 'Hệ hình, mô thức tư duy hoặc mô hình học thuật chuẩn',
    clozeSentence: 'The shift toward renewable energy represents a fundamental [ ________ ] shift in environmental economics.',
    fullSentence: 'The shift toward renewable energy represents a fundamental paradigm shift in environmental economics.',
    source: 'Academic Word List (Sublist 7)',
    repetitions: 4,
    interval: 14,
    easeFactor: 2.8,
    nextReviewDate: new Date(Date.now() - 1000).toISOString(),
    status: 'mastered',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-15',
    deckId: 'deck-awl-band-7',
    word: 'amortise',
    ipa: '/əˈmɔːr.taɪz/',
    pos: 'verb',
    definitionEn: 'Gradually write off the initial cost of an asset over a period of time.',
    definitionVi: 'Khấu hao chi phí ban đầu theo thời gian',
    clozeSentence: 'High-efficiency thermal insulation helps [ ________ ] capital construction expenses within ten years.',
    fullSentence: 'High-efficiency thermal insulation helps amortise capital construction expenses within ten years.',
    source: 'Academic Finance Lexicon',
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'learning',
    createdDate: new Date().toISOString(),
  },
  {
    id: 'card-16',
    deckId: 'deck-awl-band-7',
    word: 'resilience',
    ipa: '/rɪˈzɪl.jəns/',
    pos: 'noun',
    definitionEn: 'The capacity to recover quickly from difficulties; toughness or adaptability.',
    definitionVi: 'Khả năng phục hồi, sức chống chịu bền bỉ trước biến cố',
    clozeSentence: 'Urban ecological [ ________ ] relies on biodiverse green corridors distributed throughout city centers.',
    fullSentence: 'Urban ecological resilience relies on biodiverse green corridors distributed throughout city centers.',
    source: 'Academic Word List (Sublist 4)',
    repetitions: 2,
    interval: 4,
    easeFactor: 2.6,
    nextReviewDate: new Date(Date.now() + 172800000).toISOString(),
    status: 'review',
    createdDate: new Date().toISOString(),
  },
];
