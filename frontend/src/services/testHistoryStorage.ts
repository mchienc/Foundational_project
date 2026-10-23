// frontend/src/services/testHistoryStorage.ts
// Service quản lý lịch sử làm bài thi Cambridge IELTS (Reading & Listening) & tính Band/9.0

export interface TestAttempt {
  id: string;
  book: string; // e.g. "Cambridge 18", "Cambridge 19", "Cambridge 20"
  testNumber: 1 | 2 | 3 | 4;
  skill: 'reading' | 'listening';
  bandScore: number; // e.g. 6.5
  correctCount: number; // e.g. 27
  totalQuestions: number; // e.g. 40
  completedAt: string; // "23/10/2026"
}

const STORAGE_KEY = 'eng4u_cambridge_test_history_v1';

// Dữ liệu mẫu ban đầu trực quan (khớp với ảnh người dùng: Test 1 Reading Band 6.5)
const DEFAULT_ATTEMPTS: TestAttempt[] = [
  {
    id: 'cam-18-t1-reading',
    book: 'Cambridge 18',
    testNumber: 1,
    skill: 'reading',
    bandScore: 6.5,
    correctCount: 27,
    totalQuestions: 40,
    completedAt: '22/10/2026',
  },
  {
    id: 'cam-19-t1-listening',
    book: 'Cambridge 19',
    testNumber: 1,
    skill: 'listening',
    bandScore: 7.0,
    correctCount: 30,
    totalQuestions: 40,
    completedAt: '23/10/2026',
  },
  {
    id: 'cam-20-t1-reading',
    book: 'Cambridge 20',
    testNumber: 1,
    skill: 'reading',
    bandScore: 7.5,
    correctCount: 33,
    totalQuestions: 40,
    completedAt: '23/10/2026',
  },
];

export function getTestHistory(): TestAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ATTEMPTS));
      return DEFAULT_ATTEMPTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Lỗi đọc test history từ localStorage:', err);
    return DEFAULT_ATTEMPTS;
  }
}

export function saveTestAttempt(attempt: Omit<TestAttempt, 'id'>): TestAttempt[] {
  try {
    const history = getTestHistory();
    const id = `${attempt.book.toLowerCase().replace(/\s+/g, '-')}-t${attempt.testNumber}-${attempt.skill}`;
    const newAttempt: TestAttempt = { ...attempt, id };

    // Tìm và cập nhật nếu đã làm trước đó, hoặc thêm mới
    const existingIndex = history.findIndex(
      (h) => h.book === attempt.book && h.testNumber === attempt.testNumber && h.skill === attempt.skill
    );

    let updated: TestAttempt[];
    if (existingIndex >= 0) {
      updated = [...history];
      updated[existingIndex] = newAttempt;
    } else {
      updated = [newAttempt, ...history];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cambridge-history-updated'));
    return updated;
  } catch (err) {
    console.error('Lỗi lưu test attempt:', err);
    return getTestHistory();
  }
}

export function getAttemptForTest(
  history: TestAttempt[],
  book: string,
  testNumber: 1 | 2 | 3 | 4,
  skill: 'reading' | 'listening'
): TestAttempt | undefined {
  return history.find(
    (h) => h.book.toLowerCase() === book.toLowerCase() && h.testNumber === testNumber && h.skill === skill
  );
}

export function calculateSummaryStats(history: TestAttempt[]) {
  const readingAttempts = history.filter((h) => h.skill === 'reading');
  const listeningAttempts = history.filter((h) => h.skill === 'listening');

  const readingAvg =
    readingAttempts.length > 0
      ? Math.round((readingAttempts.reduce((acc, h) => acc + h.bandScore, 0) / readingAttempts.length) * 2) / 2
      : 0;

  const listeningAvg =
    listeningAttempts.length > 0
      ? Math.round((listeningAttempts.reduce((acc, h) => acc + h.bandScore, 0) / listeningAttempts.length) * 2) / 2
      : 0;

  let overallBand = 0;
  if (readingAvg > 0 && listeningAvg > 0) {
    overallBand = Math.round(((readingAvg + listeningAvg) / 2) * 2) / 2;
  } else if (readingAvg > 0) {
    overallBand = readingAvg;
  } else if (listeningAvg > 0) {
    overallBand = listeningAvg;
  }

  return {
    readingAvg,
    listeningAvg,
    overallBand,
    readingCompletedCount: readingAttempts.length,
    listeningCompletedCount: listeningAttempts.length,
    totalCompleted: history.length,
  };
}
