export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoUrl: string;
  completed: boolean;
  orderIndex: number;
  description?: string;
  preview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  headline: string;
  description: string;
  category: 'Lập trình' | 'Thiết kế' | 'Cơ sở dữ liệu' | 'DevOps' | 'Ngoại ngữ';
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    coursesCount: number;
    rating: number;
  };
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | 'Mọi cấp độ';
  updatedAt: string;
  image: string;
  modules: Module[];
  price: number;
  originalPrice: number;
  learningOutcomes: string[];
  features: string[];
  isEnrolled?: boolean;
  progress?: number;
}

export interface UserStats {
  streakDays: number;
  hoursLearned: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  certificatesEarned: number;
  averageScore: number;
}

export interface QnAComment {
  id: string;
  author: string;
  role: 'student' | 'instructor';
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface LessonNote {
  id: string;
  lessonId: string;
  timestamp: string;
  content: string;
  createdAt: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  score: number; // out of 10
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  userAnswers: Record<string, string>; // questionId -> optionId
  takenAt: string;
}

export type Screen =
  | 'dashboard'
  | 'course-details'
  | 'course-player'
  | 'my-courses'
  | 'quiz'
  | 'profile'
  | 'admin'
  | 'vocab-srs'
  | 'speaking'
  | 'listening'
  | 'sentence-builder'
  | 'leaderboard';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ================= English Learning Specialized Types ================= //

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface Flashcard {
  id: string;
  word: string;
  partOfSpeech: string;
  ipaUk: string;
  ipaUs: string;
  image: string;
  meaningEn: string;
  meaningVi: string;
  examples: { en: string; vi: string }[];
  collocations: string[];
  srsStage: 'new' | 'learning' | 'review' | 'mastered';
  streak: number;
}

export interface PhonemeBreakdown {
  phoneme: string;
  score: number; // 0 - 100
}

export interface WordPronunciation {
  word: string;
  ipa: string;
  score: number; // 0 - 100
  phonemes?: PhonemeBreakdown[];
}

export interface SpeakingLesson {
  id: string;
  title: string;
  category: string;
  targetSentence: string;
  ipaFull: string;
  translationVi: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  words: WordPronunciation[];
  tipsVi: string;
  audioDurationSeconds: number;
}

export interface DictationBlank {
  wordIndex: number;
  correctWord: string;
  hint?: string;
}

export interface TranscriptSegment {
  id: string;
  startMs: number;
  endMs: number;
  speaker: string;
  textEn: string;
  textVi: string;
  dictationBlanks?: DictationBlank[];
}

export interface ListeningLesson {
  id: string;
  title: string;
  topic: string;
  speakerName: string;
  speakerRole: string;
  level: string;
  audioDurationMs: number;
  segments: TranscriptSegment[];
}

export interface SentenceBuilderWord {
  id: string;
  text: string;
}

export interface SentenceBuilderItem {
  id: string;
  targetSentenceVi: string;
  targetSentenceEn: string;
  correctWords: string[];
  shuffledWords: SentenceBuilderWord[];
  explanationVi: string;
  grammarTopic: string;
  points: number;
}

export interface LeaderboardItem {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  streakDays: number;
  xpThisWeek: number;
  league: 'Kim Cương' | 'Bạch Kim' | 'Vàng' | 'Bạc';
  isCurrentUser?: boolean;
}

export interface QuickWordLookup {
  word: string;
  pos: string;
  ipa: string;
  meaningVi: string;
  meaningEn: string;
}

