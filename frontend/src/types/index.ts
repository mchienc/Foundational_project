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

export type Screen =
  | 'landing'
  | 'reading'
  | 'reading-test'
  | 'computer-exam'
  | 'mistake-vault'
  | 'listening'
  | 'listening-test'
  | 'listening-exam'
  | 'listening-review'
  | 'anki'
  | 'profile'
  | 'admin'
  | 'speaking'
  | 'writing';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ================= Academic Reading & Vocabulary Vault Types ================= //

export interface TargetWord {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';
  ipa: string;
  definitionVi: string;
  definitionEn: string;
  collocations: string[];
  contextSentence: string;
  explanation: string;
}

export interface VocabItem {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  contextMeaning: string;
  contextSentence: string;
  sourceArticleTitle: string;
  srsLevel: number; // 1 -> 5
  nextReviewDate: string; // ISO string
  collocations?: string[];
  definitionEn?: string;
  articleId?: string;
  savedAt?: string;
  reviewCount?: number;
}

// ================= Cambridge IELTS & Anki Platform Types ================= //

export type AnkiRating = 'again' | 'hard' | 'good' | 'easy';

export interface AnkiCard {
  id: string;
  deckId: string;
  word: string;
  ipa: string;
  pos: string;
  definitionEn: string;
  definitionVi: string;
  clozeSentence: string;
  fullSentence: string;
  source: string;
  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
  lastReviewedDate?: string;
  createdDate: string;
}

export interface AnkiDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  isPersonal?: boolean;
  totalCards: number;
  dueTodayCount: number;
  learningCount: number;
  masteredCount: number;
  iconName?: string;
}

export interface CambridgeQuestionOption {
  id: string;
  label: string;
  text: string;
}

export interface CambridgeReadingQuestion {
  id: string;
  number: number;
  type: 'tfng' | 'multiple_choice' | 'summary_completion' | 'matching_info';
  groupHeader?: string;
  groupInstruction?: string;
  question: string;
  options?: CambridgeQuestionOption[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  referenceParagraph: string;
}

export interface CambridgeReadingPassage {
  id: string;
  source: string;
  sourceType: 'cambridge' | 'actual_test';
  passageNumber: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  topic: string;
  level: 'Passage 1 (Cơ bản)' | 'Passage 2 (Trung cấp)' | 'Passage 3 (Nâng cao)';
  estimatedMinutes: number;
  wordCount: number;
  paragraphs: { letter: string; text: string }[];
  targetWords: TargetWord[];
  questions: CambridgeReadingQuestion[];
}

export interface ListeningSlice {
  id: string;
  sentenceIndex: number;
  text: string;
  vietnameseMeaning: string;
  hint: string;
  keyVocab: string[];
  phoneticNotes: string;
  audioStartSeconds?: number;
  audioEndSeconds?: number;
}

export interface CambridgeListeningTest {
  id: string;
  title: string;
  source: string;
  part: 1 | 2 | 3 | 4;
  partLabel: string;
  topic: string;
  speaker: string;
  wpm: number;
  accent: 'British' | 'American' | 'Australian';
  phoneticFocus: string;
  totalSentences: number;
  sentences: ListeningSlice[];
}

export interface ReadingSessionConfig {
  mode: 'single' | 'full';
  passageId: string;
  passageIds?: string[];
  testTitle: string;
  passageNumber?: 1 | 2 | 3;
}

// ================= IELTS on Computer & Mistake Vault Types ================= //

export type ContrastMode = 'standard' | 'high-contrast' | 'inverted';

export type MistakeQuestionType =
  | 'TFNG'
  | 'MATCHING_HEADINGS'
  | 'SUMMARY_COMPLETION'
  | 'MULTIPLE_CHOICE'
  | 'MATCHING_INFO';

export interface MistakeRecord {
  id: string;
  testId: string;
  source: string;
  passage: 1 | 2 | 3;
  questionNumber: number;
  questionType: MistakeQuestionType;
  questionText: string;
  options?: { id: string; label: string; text: string }[];
  userAnswer: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  evidenceSnippet: string;
  explanation: string;
  status: 'NEEDS_PRACTICE' | 'RESOLVED';
  attemptsCount: number;
  createdAt: string;
  lastPracticedAt?: string;
}

export interface ExamHighlight {
  id: string;
  passageIndex: number;
  text: string;
  color?: string;
  timestamp: number;
}

export interface ExamNote {
  id: string;
  passageIndex: number;
  text: string;
  note: string;
  top: number;
  left: number;
  timestamp: number;
}

// ================= IELTS Listening Full Test Types ================= //

export type ListeningQuestionType =
  | 'form_completion'
  | 'multiple_choice'
  | 'matching'
  | 'map_labeling'
  | 'note_completion'
  | 'table_completion'
  | 'sentence_completion';

export interface ListeningQuestionOption {
  id: string;
  label: string;
  text: string;
}

export interface ListeningQuestion {
  id: string;
  number: number;
  sectionNumber: 1 | 2 | 3 | 4;
  type: ListeningQuestionType;
  groupHeader?: string;
  groupInstruction?: string;
  prompt: string;
  options?: ListeningQuestionOption[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation?: string;
}

export interface ListeningSection {
  id?: string;
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  instructions: string;
  audioFile: string;
  questions: ListeningQuestion[];
}

export interface TranscriptLine {
  id: string;
  start: number;
  end: number;
  speaker?: string;
  text: string;
  answerForQuestion?: number;
  explanation?: string;
}

export interface ListeningFullTest {
  id: string;
  source: string;
  book: string;
  testNumber: 1 | 2 | 3 | 4;
  totalSections: 4;
  estimatedMinutes: number;
  sections: ListeningSection[];
  transcript: TranscriptLine[];
}

export interface ListeningExamResult {
  testId: string;
  userAnswers: Record<string, string>;
  correctCount: number;
  totalCount: number;
  bandScore: number;
  sectionScores: { section: number; correct: number; total: number }[];
  completedAt: string;
}

// ================= Writing Task 1 Types ================= //

export type ChartType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map' | 'mixed';

export interface WritingTask1Prompt {
  id: string;
  source: string;
  chartType: ChartType;
  chartImageUrl: string;
  taskText: string;
  timeLimit: number;
  minWords: number;
  sentenceExamples: {
    original: string;
    band65: string;
    band75: string;
    band85: string;
  }[];
}

// ================= Speaking Mock Test Types ================= //

export type SpeakingState =
  | 'IDLE'
  | 'EXAMINER_SPEAKING'
  | 'CANDIDATE_PREPARING'
  | 'CANDIDATE_SPEAKING'
  | 'EVALUATING';

export interface SpeakingQuestion {
  id: string;
  part: 1 | 2 | 3;
  type: 'interview' | 'cue_card' | 'discussion';
  question: string;
  cueCardBullets?: string[];
  prepTimeSeconds?: number;
  maxAnswerSeconds: number;
}

export interface SpeakingMockTest {
  id: string;
  source: string;
  topic: string;
  part1Questions: SpeakingQuestion[];
  part2CueCard: SpeakingQuestion;
  part3Questions: SpeakingQuestion[];
}

export interface SpeakingAnswerRecord {
  questionId: string;
  transcript: string;
  wordCount: number;
  durationSeconds: number;
  wpm: number;
  fillerWords: { word: string; count: number }[];
}
