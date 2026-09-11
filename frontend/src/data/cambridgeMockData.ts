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
