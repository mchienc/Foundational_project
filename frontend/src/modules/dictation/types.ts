// frontend/src/modules/dictation/types.ts
// Hệ thống kiểu dữ liệu độc lập cho Luyện Nghe Chép Chính Tả Video YouTube (/dictation)

export type DictationCefrLevel = 'B1' | 'B2' | 'C1';

export type DictationTopic = 'Khoa học' | 'Xã hội' | 'Công nghệ' | 'Kinh tế';

export interface DictationSentence {
  id: number;
  start: number; // thời điểm bắt đầu (giây)
  end: number;   // thời điểm kết thúc (giây)
  text: string;  // câu nguyên văn chuẩn
  translationVi?: string; // nghĩa tiếng Việt tham khảo sau khi hoàn thành
}

export interface DictationLesson {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  level: DictationCefrLevel;
  topic: DictationTopic;
  duration: string;
  description?: string;
  sentences: DictationSentence[];
  isCustom?: boolean;
}

export type WordDiffStatus = 'correct' | 'typo' | 'wrong' | 'missing';

export interface WordDiffItem {
  word: string;         // Từ hiển thị (của người dùng hoặc từ mục tiêu)
  targetWord?: string;  // Từ chuẩn trong đáp án
  status: WordDiffStatus;
  distance?: number;    // Khoảng cách Levenshtein
}

export interface DiffCheckResult {
  items: WordDiffItem[];
  extraWrongWords: string[];
  accuracy: number;     // 0 - 100
  correctCount: number;
  typoCount: number;
  totalWords: number;
  isPassed: boolean;    // true nếu accuracy >= 90
}
