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
  | 'library'
  | 'reader'
  | 'vault'
  | 'dashboard'
  | 'profile'
  | 'admin'
  | 'leaderboard'
  | 'vocab-srs'
  | 'speaking'
  | 'sentence-builder'
  | 'writing';

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

export interface WritingPromptIdea {
  perspective: string;
  points: string[];
}

export interface WritingPrompt {
  id: number;
  title: string;
  taskType: 'task_1' | 'task_2' | 'academic_essay';
  category: string;
  promptText: string;
  chartImageUrl?: string | null;
  targetBand: string;
  minWords: number;
  suggestedIdeas: WritingPromptIdea[];
  sampleBand8Essay?: string;
}

export interface CollocationSuggestion {
  matched: string;
  suggestion: string;
  reason: string;
}

export interface WritingEvaluationDetails {
  wordCount: number;
  paragraphCount: number;
  sentenceCount: number;
  awlWordsUsed: string[];
  awlRatio: number;
  cohesiveDevicesFound: string[];
  collocationSuggestions: CollocationSuggestion[];
  strengths: string[];
  improvements: string[];
}

export interface WritingEvaluationResult {
  submissionId: number;
  bandOverall: number;
  bandTR: number;
  bandCC: number;
  bandLR: number;
  bandGRA: number;
  cefrLevel: string;
  xpGained: number;
  evaluationDetails: WritingEvaluationDetails;
  sampleBand8Essay?: string;
}

export interface WritingSubmissionHistory {
  id: number;
  promptId: number;
  promptTitle: string;
  taskType: string;
  wordCount: number;
  timeSpentSeconds: number;
  bandOverall: number;
  bandTR: number;
  bandCC: number;
  bandLR: number;
  bandGRA: number;
  cefrLevel: string;
  createdAt: string;
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

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
}

export interface DictationSentence {
  id: string;
  sentence: string;
  translationVi: string;
  focusWord: string;
  audioUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  topic: 'Khoa Học' | 'Xã Hội' | 'Kinh Tế';
  topicColor: string;
  level: 'B1' | 'B2' | 'C1' | 'C2';
  levelBadgeColor: string;
  author: string;
  authorRole: string;
  journal: string;
  publishedDate: string;
  readTimeMinutes: number;
  wordCount: number;
  thumbnail: string;
  summary: string;
  contentParagraphs: string[];
  targetWords: TargetWord[];
  dictationSentences: DictationSentence[];
  comprehensionQuestions: ReadingQuestion[];
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

// Backward compatibility alias
export type SavedWordItem = VocabItem;

// ================= Cambridge IELTS & Anki Platform Types ================= //

export type AnkiRating = 'again' | 'hard' | 'good' | 'easy';

export interface AnkiCard {
  id: string;
  deckId: string;
  word: string;
  ipa: string;
  pos: string; // noun, verb, adj, adv, idiom, phrase
  definitionEn: string;
  definitionVi: string;
  clozeSentence: string; // Sentence with "[ ... ]" masking the target word
  fullSentence: string;
  source: string; // e.g. "Cambridge 18 Test 2"
  repetitions: number;
  interval: number; // in days
  easeFactor: number; // default 2.5
  nextReviewDate: string; // ISO date string
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
  label: string; // "A", "B", "C", "D" or "TRUE", "FALSE", "NOT GIVEN"
  text: string;
}

export interface CambridgeReadingQuestion {
  id: string;
  number: number;
  type: 'tfng' | 'multiple_choice' | 'summary_completion' | 'matching_info';
  groupHeader?: string; // e.g. "Questions 1–6"
  groupInstruction?: string; // e.g. "Do the following statements agree with the information given in Reading Passage 2? In boxes 1–6, choose TRUE, FALSE, or NOT GIVEN."
  question: string;
  options?: CambridgeQuestionOption[];
  correctAnswer: string;
  acceptableAnswers?: string[]; // for summary completion / fill-in-blank
  explanation: string;
  referenceParagraph: string; // e.g. "Đoạn B"
}

export interface CambridgeReadingPassage {
  id: string;
  source: string; // e.g. "Cambridge 18 Test 2" or "Recent Actual Tests Vol 5"
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
  phoneticNotes: string; // e.g. "Linking sound: /t/ in 'part of' -> /pɑːrt əv/"
  audioStartSeconds?: number;
  audioEndSeconds?: number;
}

export interface CambridgeListeningTest {
  id: string;
  title: string;
  source: string; // e.g. "Cambridge IELTS 18 Test 4"
  part: 1 | 2 | 3 | 4;
  partLabel: string; // e.g. "Part 4: Độc thoại học thuật"
  topic: string;
  speaker: string;
  wpm: number; // Words Per Minute
  accent: 'British' | 'American' | 'Australian';
  phoneticFocus: string; // e.g. "Nối âm /r/, âm đuôi /t, d/, từ vựng C1"
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
  source: string; // e.g., "Cambridge 18 - Test 1"
  passage: 1 | 2 | 3;
  questionNumber: number;
  questionType: MistakeQuestionType;
  questionText: string;
  options?: { id: string; label: string; text: string }[];
  userAnswer: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  evidenceSnippet: string; // Trích đoạn đoạn văn chứa bằng chứng
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
