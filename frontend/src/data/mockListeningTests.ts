import { ListeningFullTest, ListeningQuestion, ListeningQuestionType } from '../types';

// Helper to generate boilerplate questions to save space while ensuring 40 questions exist
const generateQuestions = (start: number, end: number, section: 1 | 2 | 3 | 4, type: ListeningQuestionType): ListeningQuestion[] => {
  return Array.from({ length: end - start + 1 }).map((_, i) => ({
    id: `q${start + i}`,
    number: start + i,
    sectionNumber: section,
    type,
    prompt: `Question ${start + i} prompt`,
    correctAnswer: 'answer',
    acceptableAnswers: ['answer'],
  }));
};

export const mockListeningFullTests: ListeningFullTest[] = [
  {
    id: 'c13-t1',
    source: 'Cambridge IELTS 13 Test 1',
    book: 'Cambridge 13',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c13-t1-s1',
        sectionNumber: 1,
        title: 'Tourist Information',
        context: 'A phone call to a tourist information centre',
        instructions: 'Write ONE WORD AND/OR A NUMBER for each answer.',
        audioFile: 'IELTS13-Tests1-4CD1Track_01.mp3',
        questions: [
          ...generateQuestions(1, 10, 1, 'form_completion')
        ]
      },
      {
        id: 'c13-t1-s2',
        sectionNumber: 2,
        title: 'Working at a summer camp',
        context: 'A talk by a manager of a summer camp',
        instructions: 'Choose the correct letter, A, B or C.',
        audioFile: 'IELTS13-Tests1-4CD1Track_02.mp3',
        questions: [
          ...generateQuestions(11, 20, 2, 'multiple_choice')
        ]
      },
      {
        id: 'c13-t1-s3',
        sectionNumber: 3,
        title: 'University discussion',
        context: 'Two students discussing their presentation',
        instructions: 'Choose the correct letter.',
        audioFile: 'IELTS13-Tests1-4CD1Track_03.mp3',
        questions: [
          ...generateQuestions(21, 30, 3, 'multiple_choice')
        ]
      },
      {
        id: 'c13-t1-s4',
        sectionNumber: 4,
        title: 'History of weather forecasting',
        context: 'A university lecture',
        instructions: 'Complete the notes below.',
        audioFile: 'IELTS13-Tests1-4CD1Track_04.mp3',
        questions: [
          ...generateQuestions(31, 40, 4, 'note_completion')
        ]
      }
    ],
    transcript: [
      {
        id: 't1',
        start: 0,
        end: 5,
        speaker: 'A',
        text: 'Hello, Tourist Information.',
        answerForQuestion: 1,
        explanation: 'Here is the answer to question 1.'
      }
    ]
  },
  {
    id: 'c14-t4',
    source: 'Cambridge IELTS 14 Test 4',
    book: 'Cambridge 14',
    testNumber: 4,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c14-t4-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: 'C14T4S1.mp3',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c14-t4-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: 'C14T4S2.mp3',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c14-t4-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: 'C14T4S3.mp3',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c14-t4-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: 'C14T4S4.mp3',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: []
  },
  {
    id: 'c15-t1',
    source: 'Cambridge IELTS 15 Test 1',
    book: 'Cambridge 15',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c15-t1-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: 'ielts15_test1_audio1.m4a',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c15-t1-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: 'ielts15_test1_audio2.m4a',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c15-t1-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: 'ielts15_test1_audio3.m4a',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c15-t1-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: 'ielts15_test1_audio4.m4a',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: []
  },
  {
    id: 'c16-t1',
    source: 'Cambridge IELTS 16 Test 1',
    book: 'Cambridge 16',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c16-t1-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: '16-Test 1 Part 1.mp3',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c16-t1-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: '16-Test 1 Part 2.mp3',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c16-t1-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: '16-Test 1 Part 3.mp3',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c16-t1-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: '16-Test 1 Part 4.mp3',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: []
  },
  {
    id: 'c18-t1',
    source: 'Cambridge IELTS 18 Test 1',
    book: 'Cambridge 18',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c18-t1-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: '剑18 section1-part1.mp3',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c18-t1-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: '剑18 section2-part1.mp3',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c18-t1-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: '剑18 section3 part1.mp3',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c18-t1-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: '剑18 section4 part1.mp3',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: [
      {
        id: 't1',
        start: 0,
        end: 5,
        speaker: 'A',
        text: 'This is the transcript for Cambridge 18.'
      }
    ]
  },
  {
    id: 'c19-t1',
    source: 'Cambridge IELTS 19 Test 1',
    book: 'Cambridge 19',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c19-t1-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: '19-Test1 Part1.mp3',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c19-t1-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: '19-Test1 Part2.mp3',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c19-t1-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: '19-Test1 Part3.mp3',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c19-t1-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: '19-Test1 Part4.mp3',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: []
  },
  {
    id: 'c20-t1',
    source: 'Cambridge IELTS 20 Test 1',
    book: 'Cambridge 20',
    testNumber: 1,
    totalSections: 4,
    estimatedMinutes: 30,
    sections: [
      {
        id: 'c20-t1-s1',
        sectionNumber: 1,
        title: 'Section 1',
        context: 'Context 1',
        instructions: 'Instructions 1',
        audioFile: '20-T1S1.m4a',
        questions: generateQuestions(1, 10, 1, 'form_completion')
      },
      {
        id: 'c20-t1-s2',
        sectionNumber: 2,
        title: 'Section 2',
        context: 'Context 2',
        instructions: 'Instructions 2',
        audioFile: '20-T1S2.m4a',
        questions: generateQuestions(11, 20, 2, 'multiple_choice')
      },
      {
        id: 'c20-t1-s3',
        sectionNumber: 3,
        title: 'Section 3',
        context: 'Context 3',
        instructions: 'Instructions 3',
        audioFile: '20-T1S3.m4a',
        questions: generateQuestions(21, 30, 3, 'matching')
      },
      {
        id: 'c20-t1-s4',
        sectionNumber: 4,
        title: 'Section 4',
        context: 'Context 4',
        instructions: 'Instructions 4',
        audioFile: '20-T1S4.m4a',
        questions: generateQuestions(31, 40, 4, 'note_completion')
      }
    ],
    transcript: []
  }
];
