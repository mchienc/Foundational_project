// frontend/src/services/testHistoryStorage.ts
// Service quản lý lịch sử làm bài thi Cambridge IELTS (Reading & Listening) & tính Band/9.0
// TÁCH BIỆT DỮ LIỆU ĐỘC LẬP CHO TỪNG TÀI KHOẢN NGƯỜI DÙNG & QUẢN TRỊ VIÊN

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

const STORAGE_PREFIX = 'eduflow_cambridge_history_';

// Dọn dẹp key dùng chung cũ nếu còn tồn tại
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('eng4u_cambridge_test_history_v1');
  } catch {}
}

/**
 * Lấy ID của người dùng hiện tại đang đăng nhập
 */
export function getCurrentUserId(): string {
  if (typeof window === 'undefined') return 'guest';
  try {
    const raw = localStorage.getItem('eduflow_current_user');
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.id) return String(u.id);
      if (u?.email) return u.email.toLowerCase();
    }
  } catch {}
  return 'guest';
}

/**
 * Tạo key lưu trữ riêng biệt theo ID người dùng
 */
export function getStorageKey(userId?: string): string {
  const uid = userId || getCurrentUserId();
  return `${STORAGE_PREFIX}${uid}`;
}

/**
 * Lấy danh sách lịch sử làm bài riêng của người dùng
 * (Nếu người dùng mới chưa làm bài nào thì trả về mảng rỗng [])
 */
export function getTestHistory(userId?: string): TestAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Lỗi đọc test history từ localStorage:', err);
    return [];
  }
}

/**
 * Lưu kết quả bài thi vào kho dữ liệu riêng của người dùng
 */
export function saveTestAttempt(
  attempt: Omit<TestAttempt, 'id'>,
  userId?: string
): TestAttempt[] {
  const uid = userId || getCurrentUserId();
  try {
    const history = getTestHistory(uid);
    const id = `${attempt.book.toLowerCase().replace(/\s+/g, '-')}-t${attempt.testNumber}-${attempt.skill}`;
    const newAttempt: TestAttempt = { ...attempt, id };

    // Tìm và cập nhật nếu đã làm trước đó, hoặc thêm mới
    const existingIndex = history.findIndex(
      (h) => h.book.toLowerCase() === attempt.book.toLowerCase() && h.testNumber === attempt.testNumber && h.skill === attempt.skill
    );

    let updated: TestAttempt[];
    if (existingIndex >= 0) {
      updated = [...history];
      updated[existingIndex] = newAttempt;
    } else {
      updated = [newAttempt, ...history];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(getStorageKey(uid), JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent('cambridge-history-updated', { detail: { userId: uid } })
      );
    }

    // Tự động lưu lên MySQL database theo user_id nếu không phải khách vãng lai
    if (uid !== 'guest' && typeof fetch !== 'undefined') {
      fetch('/api/cambridge/user-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, ...attempt }),
      }).catch((err) => {
        console.warn('Không thể đồng bộ lịch sử bài thi lên MySQL:', err);
      });
    }

    return updated;
  } catch (err) {
    console.error('Lỗi lưu test attempt:', err);
    return getTestHistory(uid);
  }
}

/**
 * Đồng bộ lịch sử làm bài từ MySQL database về máy client cho người dùng cụ thể
 */
export async function fetchUserTestHistoryFromServer(userId?: string): Promise<TestAttempt[]> {
  const uid = userId || getCurrentUserId();
  if (uid === 'guest' || typeof fetch === 'undefined') {
    return getTestHistory(uid);
  }

  try {
    const res = await fetch(`/api/cambridge/user-history?userId=${encodeURIComponent(uid)}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const serverAttempts: TestAttempt[] = data.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem(getStorageKey(uid), JSON.stringify(serverAttempts));
        window.dispatchEvent(
          new CustomEvent('cambridge-history-updated', { detail: { userId: uid } })
        );
      }
      return serverAttempts;
    }
  } catch (err) {
    console.warn('Không thể lấy lịch sử thi từ server:', err);
  }

  return getTestHistory(uid);
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
