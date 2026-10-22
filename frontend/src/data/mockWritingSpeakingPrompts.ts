// frontend/src/data/mockWritingSpeakingPrompts.ts
// Bộ đề thi IELTS Writing & Speaking chuẩn Cambridge thực chiến

export interface WritingPrompt {
  id: string;
  type: 'task1' | 'task2';
  chartType?: 'bar' | 'line' | 'pie' | 'table' | 'map' | 'process';
  category?: string;
  questionType?: string;
  title: string;
  prompt: string;
  recommendedTimeMinutes: number;
  minWords: number;
  chartDetails?: {
    labels?: string[];
    series?: { name: string; values: number[]; color?: string }[];
    unit?: string;
    notes?: string;
    steps?: { step: number; title: string; desc: string }[];
    mapComparison?: { before: string[]; after: string[] };
    tableHeaders?: string[];
    tableRows?: (string | number)[][];
  };
}

export interface SpeakingPrompt {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  cueCardPoints?: string[];
  followUpQuestions?: string[];
  hintVocabulary?: { word: string; meaning: string }[];
}

// ==================== WRITING PROMPTS ==================== //

export const mockWritingPrompts: WritingPrompt[] = [
  // --- TASK 1 ---
  {
    id: 'w-task1-bar',
    type: 'task1',
    chartType: 'bar',
    title: 'Mức tiêu thụ năng lượng tái tạo (Renewable Energy Consumption)',
    prompt:
      'The bar chart below shows the percentage of renewable energy consumed in four European countries in 2010 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      labels: ['Germany', 'United Kingdom', 'France', 'Spain'],
      unit: '% of total energy',
      notes: 'Source: European Environmental Agency',
      series: [
        { name: '2010', values: [18, 11, 24, 21], color: '#94A3B8' },
        { name: '2020', values: [42, 38, 35, 44], color: '#064E3B' },
      ],
    },
  },
  {
    id: 'w-task1-line',
    type: 'task1',
    chartType: 'line',
    title: 'Số lượng khách du lịch quốc tế (International Tourist Arrivals)',
    prompt:
      'The line graph shows the number of international tourists (in millions) visiting three global cities between 2015 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      labels: ['2015', '2017', '2019', '2021', '2023'],
      unit: 'Triệu lượt khách (Millions)',
      series: [
        { name: 'Paris', values: [16, 17.5, 19, 9, 18.2], color: '#064E3B' },
        { name: 'Tokyo', values: [10, 12.8, 15, 4.5, 14.6], color: '#D97706' },
        { name: 'New York', values: [12, 13.1, 14, 6.2, 13.5], color: '#2563EB' },
      ],
    },
  },
  {
    id: 'w-task1-pie',
    type: 'task1',
    chartType: 'pie',
    title: 'Cơ cấu chi tiêu hộ gia đình (Household Expenditure)',
    prompt:
      'The pie charts compare the average proportion of household spending across five essential categories in Japan and the UK in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      labels: ['Housing & Utilities', 'Food & Beverages', 'Transport', 'Healthcare & Education', 'Leisure'],
      series: [
        { name: 'Japan', values: [32, 24, 12, 18, 14], color: '#064E3B' },
        { name: 'United Kingdom', values: [38, 16, 15, 11, 20], color: '#D97706' },
      ],
    },
  },
  {
    id: 'w-task1-table',
    type: 'task1',
    chartType: 'table',
    title: 'Tỷ lệ việc làm theo ngành nghề tại Úc (Employment in Australia)',
    prompt:
      'The table illustrates employment rates (in percentages) across four major economic sectors in Australia between 2018 and 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      tableHeaders: ['Khu Vực Ngành', '2018 (%)', '2020 (%)', '2022 (%)', 'Thay Đổi'],
      tableRows: [
        ['Công nghệ & Kỹ thuật số (IT & Digital)', 14.5, 18.2, 22.8, '+8.3% (Tăng mạnh)'],
        ['Y tế & Chăm sóc xã hội (Healthcare)', 15.1, 16.8, 18.4, '+3.3% (Tăng ổn định)'],
        ['Bán lẻ & Khách sạn (Retail & Hospitality)', 24.0, 19.5, 21.0, '-3.0% (Giảm nhẹ)'],
        ['Sản xuất truyền thống (Manufacturing)', 12.4, 10.1, 8.6, '-3.8% (Giảm dần)'],
      ],
    },
  },
  {
    id: 'w-task1-map',
    type: 'task1',
    chartType: 'map',
    title: 'Quy hoạch phát triển thị trấn ven biển (Coastal Town Development)',
    prompt:
      'The two maps show the development of a small coastal fishing village named Seaborne from 2000 to the present day.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      mapComparison: {
        before: [
          'Năm 2000: Bến cảng cá nhỏ ở phía Nam.',
          'Khu rừng cây rậm rạp phía Đông Bắc.',
          'Đường đất đơn sơ nối làng chài với chợ hải sản địa phương.',
        ],
        after: [
          'Hiện tại: Bến cảng mở rộng thành bến du thuyền cao cấp (Marina).',
          'Rừng cây chuyển đổi thành sân Golf và khu resort nghỉ dưỡng 5 sao.',
          'Đường cao tốc 4 làn xe hiện đại kèm trung tâm thương mại ven biển.',
        ],
      },
    },
  },
  {
    id: 'w-task1-process',
    type: 'task1',
    chartType: 'process',
    title: 'Quy trình sản xuất giấy tái chế (Recycled Paper Production)',
    prompt:
      'The diagram illustrates the sequential stages involved in the commercial production of recycled paper.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    recommendedTimeMinutes: 20,
    minWords: 150,
    chartDetails: {
      steps: [
        { step: 1, title: 'Thu gom & Phân loại', desc: 'Giấy đã qua sử dụng được thu gom từ hộ gia đình và phân loại chất lượng.' },
        { step: 2, title: 'Nghiền & Khử mực', desc: 'Giấy được trộn với nước ấm hóa chất để tạo bột giấy và tách bỏ mực in.' },
        { step: 3, title: 'Làm sạch & Tẩy trắng', desc: 'Lọc tạp chất kim loại, dùng hydrogen peroxide khử trùng và làm sáng màu.' },
        { step: 4, title: 'Ép con lăn & Sấy khô', desc: 'Bột giấy đưa qua các trục ép nhiệt áp suất cao để loại bỏ độ ẩm.' },
        { step: 5, title: 'Cuộn thành phẩm', desc: 'Giấy thành phẩm được cuộn thành các cuộn lớn và phân phối đến xưởng in.' },
      ],
    },
  },

  // --- TASK 2 ---
  {
    id: 'w-task2-tech-agree',
    type: 'task2',
    category: 'Technology',
    questionType: 'Agree/Disagree',
    title: 'Trí tuệ nhân tạo & Tương lai việc làm (AI in the Workplace)',
    prompt:
      'Artificial intelligence and automated systems are rapidly replacing human labor in various industries. Some people believe that this trend will lead to mass unemployment and social crises, while others argue it creates superior job opportunities.\n\nTo what extent do you agree or disagree with the view that AI poses more threats than benefits to the workforce?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    recommendedTimeMinutes: 40,
    minWords: 250,
  },
  {
    id: 'w-task2-edu-both',
    type: 'task2',
    category: 'Education',
    questionType: 'Discuss Both Views',
    title: 'Học đại học so với học nghề thực tế (University vs Vocational Training)',
    prompt:
      'Some people believe that studying at university is the best route to career success. Others believe that getting straight into vocational training and entering the workforce early is more advantageous.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    recommendedTimeMinutes: 40,
    minWords: 250,
  },
  {
    id: 'w-task2-env-solution',
    type: 'task2',
    category: 'Environment',
    questionType: 'Problem & Solution',
    title: 'Rác thải nhựa đại dương (Ocean Plastic Pollution)',
    prompt:
      'Plastic waste in the oceans has reached unprecedented levels, causing severe damage to marine ecosystems and human food chains.\n\nWhat are the primary causes of this environmental crisis, and what effective solutions can governments and individuals implement to combat it?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    recommendedTimeMinutes: 40,
    minWords: 250,
  },
  {
    id: 'w-task2-society-two-part',
    type: 'task2',
    category: 'Society',
    questionType: 'Two-Part Question',
    title: 'Đô thị hóa & Lối sống thành phố (Urbanization & Mental Health)',
    prompt:
      'In many countries, an increasing number of young people are migrating from rural areas to major metropolitan cities. Why is this migration happening? Does this lifestyle have a positive or negative impact on individuals’ mental health and well-being?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    recommendedTimeMinutes: 40,
    minWords: 250,
  },
  {
    id: 'w-task2-work-agree',
    type: 'task2',
    category: 'Work-Life',
    questionType: 'Agree/Disagree',
    title: 'Làm việc từ xa & Cân bằng cuộc sống (Remote Working & Productivity)',
    prompt:
      'Working from home has become widespread following recent global changes. Some individuals assert that remote working dramatically improves work-life balance, while employers fear a notable decline in productivity and collaborative spirit.\n\nTo what extent do you agree or disagree?\n\nWrite at least 250 words.',
    recommendedTimeMinutes: 40,
    minWords: 250,
  },
];

// ==================== SPEAKING PROMPTS ==================== //

export const mockSpeakingPrompts: SpeakingPrompt[] = [
  // --- PART 1 ---
  {
    id: 's-p1-hometown',
    part: 1,
    topic: 'Hometown & Living Area',
    question: 'Where is your hometown, and what do you like most about living there?',
    followUpQuestions: [
      'Has your hometown changed much over the last ten years?',
      'Do you plan to continue living there in the future?',
    ],
    hintVocabulary: [
      { word: 'bustling metropolis', meaning: 'đô thị phồn hoa náo nhiệt' },
      { word: 'tranquil atmosphere', meaning: 'bầu không khí thanh bình' },
      { word: 'close-knit community', meaning: 'cộng đồng dân cư gắn kết' },
    ],
  },
  {
    id: 's-p1-daily-routine',
    part: 1,
    topic: 'Daily Routine & Productivity',
    question: 'What is your favorite part of the day, and how do you usually structure your morning?',
    followUpQuestions: [
      'Do you prefer having a strictly planned schedule or going with the flow?',
      'How has your daily routine changed compared to when you were younger?',
    ],
    hintVocabulary: [
      { word: 'early bird', meaning: 'người thích dậy sớm' },
      { word: 'unwind in the evening', meaning: 'thư giãn vào buổi tối' },
      { word: 'stay focused', meaning: 'duy trì sự tập trung' },
    ],
  },
  {
    id: 's-p1-tech',
    part: 1,
    topic: 'Technology & Social Media',
    question: 'How often do you use digital apps or social media to connect with friends?',
    followUpQuestions: [
      'Do you think technology makes our communication easier or more superficial?',
      'What is one app that you cannot imagine living without?',
    ],
    hintVocabulary: [
      { word: 'stay in touch with', meaning: 'giữ liên lạc với' },
      { word: 'scroll mindlessly', meaning: 'lướt mạng xã hội vô thức' },
      { word: 'indispensable tool', meaning: 'công cụ không thể thiếu' },
    ],
  },
  {
    id: 's-p1-leisure',
    part: 1,
    topic: 'Hobbies & Leisure Activities',
    question: 'What do you usually do to relax after a stressful week of study or work?',
    followUpQuestions: [
      'Did you have the same hobbies when you were a child?',
      'Is there any new hobby you would like to take up in the coming year?',
    ],
    hintVocabulary: [
      { word: 'recharge my batteries', meaning: 'nạp lại năng lượng' },
      { word: 'take up a new hobby', meaning: 'bắt đầu một sở thích mới' },
      { word: 'alleviate stress', meaning: 'giảm bớt căng thẳng' },
    ],
  },

  // --- PART 2 (CUE CARD) ---
  {
    id: 's-p2-memorable-journey',
    part: 2,
    topic: 'A Memorable Journey (Chuyến Đi Đáng Nhớ)',
    question: 'Describe a memorable journey you took that made a deep impression on you.',
    cueCardPoints: [
      'Where you went and who accompanied you',
      'What mode of transport you used',
      'What unexpected or exciting events happened along the way',
      'And explain why this particular journey remains so unforgettable to you',
    ],
    hintVocabulary: [
      { word: 'breathtaking scenery', meaning: 'cảnh sắc đẹp ngỡ ngàng' },
      { word: 'off the beaten track', meaning: 'nơi hoang sơ, ít người lui tới' },
      { word: 'broaden my horizons', meaning: 'mở rộng tầm nhìn và hiểu biết' },
      { word: 'cherished memories', meaning: 'những kỷ niệm quý giá' },
    ],
  },
  {
    id: 's-p2-important-decision',
    part: 2,
    topic: 'An Important Decision (Quyết Định Quan Trọng)',
    question: 'Describe an important decision you made that influenced your life direction.',
    cueCardPoints: [
      'What the decision was and when you made it',
      'What alternatives or choices you were weighing up',
      'Whether you sought advice from family or mentors',
      'And explain why you feel satisfied or challenged by this choice today',
    ],
    hintVocabulary: [
      { word: 'at a crossroads', meaning: 'ở ngã rẽ cuộc đời' },
      { word: 'weigh the pros and cons', meaning: 'cân nhắc kỹ lợi hại' },
      { word: 'take a leap of faith', meaning: 'dũng cảm dấn thân đón nhận thử thách' },
      { word: 'stepping stone', meaning: 'bước đệm vững chắc cho tương lai' },
    ],
  },
  {
    id: 's-p2-influential-book',
    part: 2,
    topic: 'An Influential Book or Movie',
    question: 'Describe a book or a movie that left a strong impression on your thinking.',
    cueCardPoints: [
      'What the title is and what the main storyline revolves around',
      'When and why you decided to read or watch it',
      'What character or message resonated most with you',
      'And explain why it profoundly shaped your perspective on life',
    ],
    hintVocabulary: [
      { word: 'thought-provoking', meaning: 'gợi nhiều suy ngẫm sâu sắc' },
      { word: 'resonate with me', meaning: 'chạm đến cảm xúc cá nhân' },
      { word: 'page-turner', meaning: 'cuốn sách hấp dẫn đến từng trang' },
      { word: 'paradigm shift', meaning: 'sự thay đổi căn bản trong nhận thức' },
    ],
  },
  {
    id: 's-p2-eco-project',
    part: 2,
    topic: 'An Environmental Effort',
    question: 'Describe an environmental activity or practice that you participate in to protect nature.',
    cueCardPoints: [
      'What the activity is and how you first learned about it',
      'How frequently you practice this green habit',
      'What challenges or conveniences you have experienced',
      'And explain why small actions like this matter for global environmental health',
    ],
    hintVocabulary: [
      { word: 'eco-conscious lifestyle', meaning: 'lối sống có ý thức bảo vệ môi trường' },
      { word: 'reduce carbon footprint', meaning: 'giảm thiểu lượng khí thải carbon' },
      { word: 'single-use plastics', meaning: 'nhựa sử dụng một lần' },
      { word: 'ripple effect', meaning: 'hiệu ứng lan tỏa tích cực' },
    ],
  },

  // --- PART 3 ---
  {
    id: 's-p3-tourism-impact',
    part: 3,
    topic: 'Sustainable Tourism & Local Culture',
    question: 'Do you believe excessive tourism can harm the traditional culture of local communities?',
    followUpQuestions: [
      'Should governments limit the number of international visitors to fragile heritage sites?',
      'How can travelers minimize their negative cultural footprint when visiting foreign countries?',
    ],
    hintVocabulary: [
      { word: 'commercialization', meaning: 'thương mại hóa quá mức' },
      { word: 'cultural preservation', meaning: 'bảo tồn di sản văn hóa' },
      { word: 'responsible travel', meaning: 'du lịch có trách nhiệm' },
    ],
  },
  {
    id: 's-p3-decision-making',
    part: 3,
    topic: 'Youth Autonomy & Societal Expectations',
    question: 'Why do many young adults nowadays struggle with making independent career decisions?',
    followUpQuestions: [
      'To what extent should parents influence their children’s professional pathways?',
      'How does peer pressure affect career choices in developing economies?',
    ],
    hintVocabulary: [
      { word: 'parental expectations', meaning: 'kỳ vọng của cha mẹ' },
      { word: 'peer pressure', meaning: 'áp lực đồng trang lứa' },
      { word: 'financial autonomy', meaning: 'sự tự chủ về tài chính' },
    ],
  },
];
