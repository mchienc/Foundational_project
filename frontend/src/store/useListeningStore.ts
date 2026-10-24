import { create } from 'zustand';
import { ListeningFullTest, ListeningExamResult, ListeningSection, ListeningQuestion } from '../types';

interface ListeningStore {
  userAnswers: Record<string, string>;
  reviewFlags: Set<string>;
  examResult: ListeningExamResult | null;
  currentSection: number;
  isExamFinished: boolean;
  
  setAnswer: (questionId: string, value: string) => void;
  toggleReviewFlag: (questionId: string) => void;
  setCurrentSection: (section: number) => void;
  submitExam: (test: ListeningFullTest) => void;
  resetExam: () => void;
}

// Canonical IELTS Listening 40-question band scale (L-04)
export const calculateListeningBandScore = (score: number): number => {
  const c = Math.max(0, Math.min(40, Math.round(Number(score) || 0)));
  if (c >= 39) return 9.0;
  if (c >= 37) return 8.5;
  if (c >= 35) return 8.0;
  if (c >= 32) return 7.5;
  if (c >= 30) return 7.0;
  if (c >= 26) return 6.5;
  if (c >= 23) return 6.0;
  if (c >= 18) return 5.5;
  if (c >= 16) return 5.0;
  if (c >= 13) return 4.5;
  if (c >= 11) return 4.0;
  if (c >= 8) return 3.5;
  if (c >= 6) return 3.0;
  if (c >= 4) return 2.5;
  if (c >= 1) return 2.0;
  return 0.0;
};

export const normalizeListeningAnswer = (ans: string | undefined): string => {
  return String(ans || '').trim().toLowerCase().replace(/\s+/g, ' ');
};

// L-01: Không chấm đúng câu bỏ trống
export function matchesListeningAnswer(userAnswer: string | undefined, correct: string, alternatives: string[] = []): boolean {
  const given = normalizeListeningAnswer(userAnswer);
  if (!given) return false;
  const valid = [correct, ...alternatives].map(normalizeListeningAnswer).filter(Boolean);
  return valid.includes(given);
}

export const useListeningStore = create<ListeningStore>((set, get) => ({
  userAnswers: {},
  reviewFlags: new Set(),
  examResult: null,
  currentSection: 1,
  isExamFinished: false,

  setAnswer: (questionId, value) => set((state) => ({
    userAnswers: { ...state.userAnswers, [questionId]: value }
  })),
  
  toggleReviewFlag: (questionId) => set((state) => {
    const newFlags = new Set(state.reviewFlags);
    if (newFlags.has(questionId)) {
      newFlags.delete(questionId);
    } else {
      newFlags.add(questionId);
    }
    return { reviewFlags: newFlags };
  }),

  setCurrentSection: (section) => set({ currentSection: section }),

  submitExam: (test) => {
    const { userAnswers } = get();
    let correctCount = 0;
    let totalQuestions = 0;

    const sectionScores = test.sections.map((section: ListeningSection) => {
      const sectionQuestions = section.questions;
      const correct = sectionQuestions.filter((q: ListeningQuestion) => {
        return matchesListeningAnswer(userAnswers[q.id], q.correctAnswer, q.acceptableAnswers);
      }).length;
      correctCount += correct;
      totalQuestions += sectionQuestions.length;
      return { section: section.sectionNumber, correct, total: sectionQuestions.length };
    });

    set({
      isExamFinished: true,
      examResult: {
        testId: test.id,
        userAnswers,
        correctCount,
        totalCount: totalQuestions,
        bandScore: calculateListeningBandScore(correctCount),
        sectionScores,
        completedAt: new Date().toISOString()
      }
    });
  },

  resetExam: () => set({
    userAnswers: {},
    reviewFlags: new Set(),
    examResult: null,
    currentSection: 1,
    isExamFinished: false,
  })
}));
