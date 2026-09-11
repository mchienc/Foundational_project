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

const calculateBandScore = (score: number): number => {
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 32) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 26) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 18) return 5.5;
  if (score >= 16) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 11) return 4.0;
  return 0.0;
};

const normalizeAnswer = (ans: string) => ans.trim().toLowerCase();

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
        const userAns = normalizeAnswer(userAnswers[q.id] || '');
        const correctAns = normalizeAnswer(q.correctAnswer);
        const acceptable = (q.acceptableAnswers || []).map(normalizeAnswer);
        return userAns === correctAns || acceptable.includes(userAns);
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
        bandScore: calculateBandScore(correctCount),
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
