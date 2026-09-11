import { WritingTask1Prompt, SpeakingMockTest } from '../types';

export const mockWritingTask1Prompts: WritingTask1Prompt[] = [
  {
    id: 'cam18-t1-task1',
    source: 'Cambridge 18 Test 1 Task 1',
    chartType: 'line',
    chartImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    taskText: 'The graph below shows the percentage of people in three age groups who used the internet daily in a European country between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    timeLimit: 1200,
    minWords: 150,
    sentenceExamples: [
      {
        original: 'The graph shows internet use going up for young people.',
        band65: 'The graph illustrates an increase in daily internet usage among young people between 2005 and 2020.',
        band75: 'The line graph demonstrates a dramatic surge in daily internet usage among the 16–24 age group, rising from approximately 40% in 2005 to nearly 95% by 2020.',
        band85: 'As illustrated by the line graph, daily internet usage among the 16–24 demographic underwent a near-exponential proliferation over the fifteen-year period, soaring from a modest 40 percent in 2005 to an overwhelming 95 percent by 2020 — a trajectory that far outpaced that of older cohorts.',
      },
      {
        original: 'Older people used the internet less.',
        band65: 'The percentage of older people using the internet daily was lower compared to younger age groups throughout the period.',
        band75: 'In stark contrast, the 65+ age group recorded significantly lower daily internet usage, plateauing at around 30% by 2020, despite a gradual upward trend.',
        band85: 'Conversely, the over-65 cohort exhibited a comparatively modest and protracted growth trajectory, with daily usage rates barely surpassing the 30 percent threshold by 2020 — a marked disparity that underscores the persistent digital divide across generational lines.',
      },
    ],
  },
  {
    id: 'cam19-t2-task1',
    source: 'Cambridge 19 Test 2 Task 1',
    chartType: 'bar',
    chartImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    taskText: 'The chart below shows the amount of money spent on research and development by four different industries in a particular country in 2005 and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    timeLimit: 1200,
    minWords: 150,
    sentenceExamples: [
      {
        original: 'The pharmaceutical industry spent more money.',
        band65: 'The pharmaceutical industry spent a greater amount on research and development compared to other sectors.',
        band75: 'The pharmaceutical industry recorded the highest expenditure on research and development in both years, witnessing a substantial increase from $4.2 billion in 2005 to $7.8 billion in 2015.',
        band85: 'Among the four industries surveyed, pharmaceutical research and development commanded the largest financial investment in both periods, with expenditure nearly doubling from $4.2 billion in 2005 to $7.8 billion in 2015 — a trajectory reflective of escalating global demand for medical innovation.',
      },
    ],
  },
];

export const mockSpeakingTests: SpeakingMockTest[] = [
  {
    id: 'cam18-speaking-t1',
    source: 'Cambridge 18 Test 1',
    topic: 'Environment & Technology',
    part1Questions: [
      {
        id: 'sp1-q1',
        part: 1,
        type: 'interview',
        question: 'Do you live in a house or an apartment?',
        maxAnswerSeconds: 30,
      },
      {
        id: 'sp1-q2',
        part: 1,
        type: 'interview',
        question: 'What do you like most about where you live?',
        maxAnswerSeconds: 30,
      },
      {
        id: 'sp1-q3',
        part: 1,
        type: 'interview',
        question: 'How important is it to you to live in a clean and tidy environment?',
        maxAnswerSeconds: 30,
      },
    ],
    part2CueCard: {
      id: 'sp2-cue',
      part: 2,
      type: 'cue_card',
      question: 'Describe an environmental problem in your area.',
      cueCardBullets: [
        'What the problem is',
        'When you first noticed it',
        'What effects it has on people',
        'And explain what you think could be done to solve it',
      ],
      prepTimeSeconds: 60,
      maxAnswerSeconds: 120,
    },
    part3Questions: [
      {
        id: 'sp3-q1',
        part: 3,
        type: 'discussion',
        question: 'Why do you think some people are reluctant to change their habits to help the environment?',
        maxAnswerSeconds: 45,
      },
      {
        id: 'sp3-q2',
        part: 3,
        type: 'discussion',
        question: 'To what extent should governments be responsible for protecting the environment?',
        maxAnswerSeconds: 45,
      },
      {
        id: 'sp3-q3',
        part: 3,
        type: 'discussion',
        question: 'How has technology both helped and harmed the natural environment in recent decades?',
        maxAnswerSeconds: 45,
      },
    ],
  },
];
