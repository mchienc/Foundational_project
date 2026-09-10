import { create } from 'zustand';
import { MistakeRecord, MistakeQuestionType } from '../types';

interface MistakeState {
  mistakes: MistakeRecord[];
  activeFilterType: MistakeQuestionType | 'ALL';
  activeFilterStatus: 'ALL' | 'NEEDS_PRACTICE' | 'RESOLVED';
  searchQuery: string;

  // Actions
  addMistakes: (records: MistakeRecord[]) => void;
  resolveMistake: (id: string, isCorrect: boolean) => void;
  deleteMistake: (id: string) => void;
  clearAll: () => void;
  setFilterType: (type: MistakeQuestionType | 'ALL') => void;
  setFilterStatus: (status: 'ALL' | 'NEEDS_PRACTICE' | 'RESOLVED') => void;
  setSearchQuery: (query: string) => void;
  getQuestionTypeAnalytics: () => {
    type: MistakeQuestionType;
    label: string;
    total: number;
    resolved: number;
    needsPractice: number;
    accuracy: number;
  }[];
}

const STORAGE_KEY = 'eduflow_mistake_vault_v1';

// Seed sample mistake records so users can explore analytics immediately
const INITIAL_DEMO_MISTAKES: MistakeRecord[] = [
  {
    id: 'mst-demo-1',
    testId: 'cambridge-18-test-2',
    source: 'Cambridge 18 - Test 2',
    passage: 2,
    questionNumber: 15,
    questionType: 'TFNG',
    questionText: 'Modernist architects in the twentieth century prioritized vernacular traditions over industrial standardization.',
    options: [
      { id: 't', label: 'TRUE', text: 'TRUE' },
      { id: 'f', label: 'FALSE', text: 'FALSE' },
      { id: 'ng', label: 'NOT GIVEN', text: 'NOT GIVEN' },
    ],
    userAnswer: 'TRUE',
    correctAnswer: 'FALSE',
    evidenceSnippet: 'In contrast, twentieth-century modernist paradigms frequently prioritised standardised materials, leading to monotonous urban landscapes that consume exorbitant amounts of energy.',
    explanation: 'Bài đọc nêu rõ các kiến trúc sư chủ nghĩa hiện đại ưu tiên vật liệu tiêu chuẩn hóa công nghiệp, trái ngược với kiến trúc bản địa (vernacular). Do đó thông tin câu hỏi đối lập trực tiếp (FALSE).',
    status: 'NEEDS_PRACTICE',
    attemptsCount: 1,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
  },
  {
    id: 'mst-demo-2',
    testId: 'cambridge-18-test-2',
    source: 'Cambridge 18 - Test 2',
    passage: 2,
    questionNumber: 18,
    questionType: 'SUMMARY_COMPLETION',
    questionText: 'Neuro-architectural experiments demonstrate that environments with abundant natural light reduce ______ during corporate work hours.',
    acceptableAnswers: ['cognitive fatigue', 'fatigue', 'stress levels'],
    userAnswer: 'workplace productivity',
    correctAnswer: 'cognitive fatigue',
    evidenceSnippet: 'Neuro-architectural studies demonstrate that exposure to natural light and ergonomic spaces substantially diminishes cognitive fatigue and elevates workplace productivity.',
    explanation: 'Từ cần điền là "cognitive fatigue" đi với động từ "diminishes" (đồng nghĩa với "reduce"). Người học nhầm sang đối tượng được nâng cao ("elevates workplace productivity").',
    status: 'NEEDS_PRACTICE',
    attemptsCount: 2,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 3).toISOString(),
  },
  {
    id: 'mst-demo-3',
    testId: 'cambridge-18-test-2',
    source: 'Cambridge 18 - Test 2',
    passage: 2,
    questionNumber: 22,
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'According to paragraph E, what is the main financial argument for sustainable architecture?',
    options: [
      { id: 'a', label: 'A', text: 'Government grants subsidize all upfront building expenditures.' },
      { id: 'b', label: 'B', text: 'Energy savings amortize initial cost premiums within 8 to 12 years.' },
      { id: 'c', label: 'C', text: 'Low-income municipalities generate immediate commercial revenue.' },
      { id: 'd', label: 'D', text: 'Philanthropic foundations guarantee building operations.' },
    ],
    userAnswer: 'A',
    correctAnswer: 'B',
    evidenceSnippet: 'Longitudinal analyses consistently reveal that energy-neutral buildings amortise their initial premiums within eight to twelve years through reduced operational overheads.',
    explanation: 'Lập luận tài chính thực tế là các tòa nhà trung hòa năng lượng sẽ khấu hao chi phí ban đầu trong 8-12 năm thông qua việc cắt giảm chi phí vận hành (B).',
    status: 'RESOLVED',
    attemptsCount: 2,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 4).toISOString(),
    lastPracticedAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
  },
  {
    id: 'mst-demo-4',
    testId: 'cambridge-19-test-1',
    source: 'Cambridge 19 - Test 1',
    passage: 1,
    questionNumber: 7,
    questionType: 'MATCHING_HEADINGS',
    questionText: 'Which heading best corresponds to Paragraph C describing the restructuring of academic curricula?',
    options: [
      { id: 'i', label: 'i', text: 'Financial incentives for low-cost construction' },
      { id: 'ii', label: 'ii', text: 'Integrating empirical calculation into architectural training' },
      { id: 'iii', label: 'iii', text: 'The psychological detriments of dark corridors' },
      { id: 'iv', label: 'iv', text: 'Historical craftsmanship in prehistoric settlements' },
    ],
    userAnswer: 'iv',
    correctAnswer: 'ii',
    evidenceSnippet: 'Modern pedagogical institutions have begun restructuring their curricula to integrate computational simulations with sustainable vernacular philosophies.',
    explanation: 'Đoạn C nói về việc các cơ sở giáo dục hiện đại tái cấu trúc chương trình học để tích hợp mô phỏng tính toán, tương ứng với "Integrating empirical calculation into architectural training".',
    status: 'NEEDS_PRACTICE',
    attemptsCount: 1,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 1).toISOString(),
  },
  {
    id: 'mst-demo-5',
    testId: 'cambridge-20-test-1',
    source: 'Cambridge 20 - Test 1',
    passage: 3,
    questionNumber: 31,
    questionType: 'MATCHING_INFO',
    questionText: 'Which paragraph contains a reference to the timeline required to recoup additional capital expenditures?',
    options: [
      { id: 'A', label: 'Paragraph A', text: 'Paragraph A' },
      { id: 'B', label: 'Paragraph B', text: 'Paragraph B' },
      { id: 'C', label: 'Paragraph C', text: 'Paragraph C' },
      { id: 'E', label: 'Paragraph E', text: 'Paragraph E' },
    ],
    userAnswer: 'C',
    correctAnswer: 'E',
    evidenceSnippet: 'Energy-neutral buildings amortise their initial premiums within eight to twelve years through reduced operational overheads.',
    explanation: 'Thời gian hoàn vốn (8 to 12 years) được thảo luận cụ thể tại Đoạn E.',
    status: 'NEEDS_PRACTICE',
    attemptsCount: 1,
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
];

const loadFromStorage = (): MistakeRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DEMO_MISTAKES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_MISTAKES;
  } catch (_e) {
    return INITIAL_DEMO_MISTAKES;
  }
};

const saveToStorage = (records: MistakeRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save mistakes to storage:', e);
  }
};

export const useMistakeStore = create<MistakeState>((set, get) => ({
  mistakes: loadFromStorage(),
  activeFilterType: 'ALL',
  activeFilterStatus: 'ALL',
  searchQuery: '',

  addMistakes: (newRecords) => {
    set((state) => {
      // Deduplicate by testId + questionNumber
      const existingMap = new Map(state.mistakes.map((m) => [`${m.testId}_${m.questionNumber}`, m]));
      newRecords.forEach((record) => {
        const key = `${record.testId}_${record.questionNumber}`;
        if (existingMap.has(key)) {
          const current = existingMap.get(key)!;
          existingMap.set(key, {
            ...current,
            userAnswer: record.userAnswer,
            status: 'NEEDS_PRACTICE',
            attemptsCount: current.attemptsCount + 1,
            lastPracticedAt: new Date().toISOString(),
          });
        } else {
          existingMap.set(key, record);
        }
      });

      const updated = Array.from(existingMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      saveToStorage(updated);
      return { mistakes: updated };
    });
  },

  resolveMistake: (id, isCorrect) => {
    set((state) => {
      const updated = state.mistakes.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: isCorrect ? ('RESOLVED' as const) : ('NEEDS_PRACTICE' as const),
            attemptsCount: m.attemptsCount + 1,
            lastPracticedAt: new Date().toISOString(),
          };
        }
        return m;
      });
      saveToStorage(updated);
      return { mistakes: updated };
    });
  },

  deleteMistake: (id) => {
    set((state) => {
      const updated = state.mistakes.filter((m) => m.id !== id);
      saveToStorage(updated);
      return { mistakes: updated };
    });
  },

  clearAll: () => {
    saveToStorage([]);
    set({ mistakes: [] });
  },

  setFilterType: (type) => set({ activeFilterType: type }),
  setFilterStatus: (status) => set({ activeFilterStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getQuestionTypeAnalytics: () => {
    const { mistakes } = get();
    const types: { type: MistakeQuestionType; label: string }[] = [
      { type: 'TFNG', label: 'True / False / NG' },
      { type: 'MATCHING_HEADINGS', label: 'Matching Headings' },
      { type: 'SUMMARY_COMPLETION', label: 'Summary Completion' },
      { type: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
      { type: 'MATCHING_INFO', label: 'Matching Information' },
    ];

    return types.map(({ type, label }) => {
      const ofType = mistakes.filter((m) => m.questionType === type);
      const total = ofType.length;
      const resolved = ofType.filter((m) => m.status === 'RESOLVED').length;
      const needsPractice = total - resolved;
      const accuracy = total > 0 ? Math.round((resolved / total) * 100) : 100;

      return {
        type,
        label,
        total,
        resolved,
        needsPractice,
        accuracy,
      };
    });
  },
}));
