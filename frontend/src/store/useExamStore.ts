import { create } from 'zustand';
import {
  CambridgeReadingPassage,
  CambridgeReadingQuestion,
  ContrastMode,
  ExamHighlight,
  ExamNote,
  MistakeRecord,
  MistakeQuestionType,
} from '../types';
import { useMistakeStore } from './useMistakeStore';

export interface ExamResultData {
  testId: string;
  testTitle: string;
  candidateNumber: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  bandScore: number;
  timeSpentSeconds: number;
  date: string;
  passageBreakdowns: {
    passageNumber: number;
    title: string;
    correct: number;
    total: number;
  }[];
}

interface ExamState {
  testId: string;
  testTitle: string;
  candidateNumber: string;
  passages: CambridgeReadingPassage[];
  activePassageIndex: number; // 0, 1, 2
  answers: Record<number, string>; // questionNumber -> answer text
  flaggedQuestions: number[]; // question numbers marked for review
  timeRemainingSeconds: number; // starts at 3600
  isTimeHidden: boolean;
  contrastMode: ContrastMode;
  highlights: ExamHighlight[];
  notes: ExamNote[];
  isSubmitted: boolean;
  examResult: ExamResultData | null;

  // Actions
  initExam: (testTitle: string, passages: CambridgeReadingPassage[], customTestId?: string) => void;
  setAnswer: (questionNumber: number, answer: string) => void;
  toggleFlag: (questionNumber: number) => void;
  setActivePassage: (index: number) => void;
  toggleTimeHidden: () => void;
  setContrastMode: (mode: ContrastMode) => void;
  addHighlight: (passageIndex: number, text: string) => void;
  removeHighlight: (id: string) => void;
  addNote: (passageIndex: number, text: string, note: string, top: number, left: number) => void;
  removeNote: (id: string) => void;
  tickTimer: () => void;
  submitExam: () => ExamResultData;
  resetExam: () => void;
}

// Band conversion scale for IELTS Academic Reading (40 questions)
export const calculateIELTSBandScore = (correctCount: number): number => {
  if (correctCount >= 39) return 9.0;
  if (correctCount >= 37) return 8.5;
  if (correctCount >= 35) return 8.0;
  if (correctCount >= 33) return 7.5;
  if (correctCount >= 30) return 7.0;
  if (correctCount >= 27) return 6.5;
  if (correctCount >= 23) return 6.0;
  if (correctCount >= 19) return 5.5;
  if (correctCount >= 15) return 5.0;
  if (correctCount >= 13) return 4.5;
  if (correctCount >= 10) return 4.0;
  if (correctCount >= 8) return 3.5;
  if (correctCount >= 6) return 3.0;
  if (correctCount >= 4) return 2.5;
  return 2.0;
};

// Map question type string from data to unified MistakeQuestionType
const mapQuestionType = (type?: string): MistakeQuestionType => {
  if (!type) return 'MULTIPLE_CHOICE';
  const lower = type.toLowerCase();
  if (lower.includes('tfng') || lower.includes('true') || lower.includes('not given')) return 'TFNG';
  if (lower.includes('heading')) return 'MATCHING_HEADINGS';
  if (lower.includes('summary') || lower.includes('completion') || lower.includes('fill'))
    return 'SUMMARY_COMPLETION';
  if (lower.includes('matching') || lower.includes('info')) return 'MATCHING_INFO';
  return 'MULTIPLE_CHOICE';
};

const normalizeAnswer = (str: string): string => {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
};

const isAnswerCorrect = (
  userAns: string | undefined,
  question: CambridgeReadingQuestion
): boolean => {
  if (!userAns) return false;
  const userNorm = normalizeAnswer(userAns);
  if (!userNorm) return false;

  const correctNorm = normalizeAnswer(question.correctAnswer || '');
  if (userNorm === correctNorm) return true;

  if (question.acceptableAnswers && Array.isArray(question.acceptableAnswers)) {
    return question.acceptableAnswers.some((ans) => normalizeAnswer(ans) === userNorm);
  }

  return false;
};

export const useExamStore = create<ExamState>((set, get) => ({
  testId: '',
  testTitle: '',
  candidateNumber: 'VN-2026-084291',
  passages: [],
  activePassageIndex: 0,
  answers: {},
  flaggedQuestions: [],
  timeRemainingSeconds: 3600,
  isTimeHidden: false,
  contrastMode: 'standard',
  highlights: [],
  notes: [],
  isSubmitted: false,
  examResult: null,

  initExam: (testTitle, passages, customTestId) => {
    // Generate candidate number e.g. VN-2026-89412
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const candidateNumber = `VN-2026-${randomId}`;
    const testId = customTestId || testTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    set({
      testId,
      testTitle,
      candidateNumber,
      passages,
      activePassageIndex: 0,
      answers: {},
      flaggedQuestions: [],
      timeRemainingSeconds: 3600,
      isTimeHidden: false,
      contrastMode: 'standard',
      highlights: [],
      notes: [],
      isSubmitted: false,
      examResult: null,
    });
  },

  setAnswer: (questionNumber, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionNumber]: answer,
      },
    }));
  },

  toggleFlag: (questionNumber) => {
    set((state) => {
      const isFlagged = state.flaggedQuestions.includes(questionNumber);
      return {
        flaggedQuestions: isFlagged
          ? state.flaggedQuestions.filter((q) => q !== questionNumber)
          : [...state.flaggedQuestions, questionNumber],
      };
    });
  },

  setActivePassage: (index) => {
    set({ activePassageIndex: index });
  },

  toggleTimeHidden: () => {
    set((state) => ({ isTimeHidden: !state.isTimeHidden }));
  },

  setContrastMode: (mode) => {
    set({ contrastMode: mode });
  },

  addHighlight: (passageIndex, text) => {
    if (!text || text.trim().length === 0) return;
    const newHighlight: ExamHighlight = {
      id: `hl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      passageIndex,
      text: text.trim(),
      color: '#fef08a', // Yellow highlight
      timestamp: Date.now(),
    };
    set((state) => ({ highlights: [...state.highlights, newHighlight] }));
  },

  removeHighlight: (id) => {
    set((state) => ({ highlights: state.highlights.filter((h) => h.id !== id) }));
  },

  addNote: (passageIndex, text, note, top, left) => {
    if (!note || note.trim().length === 0) return;
    const newNote: ExamNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      passageIndex,
      text: text.trim(),
      note: note.trim(),
      top,
      left,
      timestamp: Date.now(),
    };
    set((state) => ({ notes: [...state.notes, newNote] }));
  },

  removeNote: (id) => {
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
  },

  tickTimer: () => {
    set((state) => {
      if (state.isSubmitted) return state;
      if (state.timeRemainingSeconds <= 1) {
        // Auto submit when timer reaches 0
        setTimeout(() => {
          get().submitExam();
        }, 0);
        return { timeRemainingSeconds: 0 };
      }
      return { timeRemainingSeconds: state.timeRemainingSeconds - 1 };
    });
  },

  submitExam: () => {
    const { passages, answers, testId, testTitle, candidateNumber, timeRemainingSeconds } = get();

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const mistakesToPush: MistakeRecord[] = [];

    const passageBreakdowns = passages.map((passage, idx) => {
      const questions = passage.questions || [];
      let passageCorrect = 0;

      questions.forEach((q) => {
        const userAns = answers[q.number];
        const correct = isAnswerCorrect(userAns, q);

        if (correct) {
          correctCount++;
          passageCorrect++;
        } else {
          if (!userAns || userAns.trim() === '') {
            unansweredCount++;
          } else {
            incorrectCount++;
          }

          // Extract evidence snippet from paragraph if available
          let evidence = '';
          if (q.referenceParagraph && passage.paragraphs) {
            const matchedP = passage.paragraphs.find(
              (p) =>
                p.letter.toLowerCase() ===
                q.referenceParagraph.replace(/[^a-zA-Z]/g, '').toLowerCase()
            );
            if (matchedP) {
              evidence = matchedP.text.slice(0, 220) + '...';
            }
          }
          if (!evidence && passage.paragraphs && passage.paragraphs[0]) {
            evidence = passage.paragraphs[0].text.slice(0, 220) + '...';
          }

          const record: MistakeRecord = {
            id: `mst-${testId}-q${q.number}-${Date.now()}`,
            testId,
            source: passage.source || testTitle,
            passage: (idx + 1) as 1 | 2 | 3,
            questionNumber: q.number,
            questionType: mapQuestionType(q.type),
            questionText: q.question,
            options: q.options,
            userAnswer: userAns || '(Chưa trả lời)',
            correctAnswer: q.correctAnswer,
            acceptableAnswers: q.acceptableAnswers,
            evidenceSnippet: evidence,
            explanation: q.explanation || 'Xem lại đối chiếu từ khóa và đoạn văn chứa manh mối.',
            status: 'NEEDS_PRACTICE',
            attemptsCount: 1,
            createdAt: new Date().toISOString(),
          };

          mistakesToPush.push(record);
        }
      });

      return {
        passageNumber: passage.passageNumber || idx + 1,
        title: passage.title,
        correct: passageCorrect,
        total: questions.length,
      };
    });

    const totalQuestions = passages.reduce((acc, p) => acc + (p.questions?.length || 0), 0);
    const bandScore = calculateIELTSBandScore(correctCount);
    const timeSpentSeconds = 3600 - timeRemainingSeconds;

    const examResult: ExamResultData = {
      testId,
      testTitle,
      candidateNumber,
      totalQuestions: totalQuestions || 40,
      correctCount,
      incorrectCount,
      unansweredCount,
      bandScore,
      timeSpentSeconds,
      date: new Date().toISOString(),
      passageBreakdowns,
    };

    // Push mistakes to MistakeStore automatically
    if (mistakesToPush.length > 0) {
      useMistakeStore.getState().addMistakes(mistakesToPush);
    }

    set({
      isSubmitted: true,
      examResult,
    });

    return examResult;
  },

  resetExam: () => {
    set({
      answers: {},
      flaggedQuestions: [],
      timeRemainingSeconds: 3600,
      isTimeHidden: false,
      highlights: [],
      notes: [],
      isSubmitted: false,
      examResult: null,
    });
  },
}));
