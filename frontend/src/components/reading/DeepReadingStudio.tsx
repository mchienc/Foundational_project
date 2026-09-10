import React, { useState, useEffect, useRef } from 'react';
import { Article, TargetWord, DictationSentence } from '../../types';
import { mockArticles } from '../../data/mockArticles';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Layers,
  Check,
  Headphones,
  RotateCcw,
  Play,
  Pause,
  Lightbulb,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';

interface DeepReadingStudioProps {
  articleId: string;
  initialTab?: 'reading' | 'dictation';
  onBackToLibrary: () => void;
  onNavigateVault: () => void;
  onEarnXp?: (amount: number, reason: string) => void;
}

export const DeepReadingStudio: React.FC<DeepReadingStudioProps> = ({
  articleId,
  initialTab = 'reading',
  onBackToLibrary,
  onNavigateVault,
  onEarnXp,
}) => {
  const { savedWords, saveWord, isWordSaved } = useVocabularyVault();

  const article: Article =
    mockArticles.find((a) => a.id === articleId) || mockArticles[0];

  // Active Tab: 'reading' (Bước 1) | 'dictation' (Bước 2)
  const [activeTab, setActiveTab] = useState<'reading' | 'dictation'>(initialTab);

  // ================= STEP 1: READING STATE =================
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xl'>('normal');
  const [selectedWord, setSelectedWord] = useState<TargetWord | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Comprehension test state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const comprehensionRef = useRef<HTMLDivElement>(null);

  // ================= STEP 2: DICTATION STATE =================
  const dictationList: DictationSentence[] = article.dictationSentences || [];
  const [currentDictIndex, setCurrentDictIndex] = useState(0);
  const [userInputText, setUserInputText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackRate, setAudioPlaybackRate] = useState<0.8 | 1.0>(1.0);
  const [isSentenceChecked, setIsSentenceChecked] = useState(false);
  const [revealedCharsCount, setRevealedCharsCount] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedDictationIds, setCompletedDictationIds] = useState<string[]>([]);
  const [isDictationSessionFinished, setIsDictationSessionFinished] = useState(false);

  const dictationInputRef = useRef<HTMLTextAreaElement>(null);

  const currentDictSentence: DictationSentence | undefined = dictationList[currentDictIndex];

  // Scroll Progress Tracking for Reading Mode
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close Popover on Outside Click
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#word-popover') && !target.closest('.interactive-target-word')) {
        setSelectedWord(null);
        setPopoverPosition(null);
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  // Keyboard Shortcuts for Dictation (Space: Play/Pause)
  useEffect(() => {
    if (activeTab !== 'dictation') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to toggle speech (if not actively typing inside textarea with selection)
      if (e.code === 'Space' && e.ctrlKey) {
        e.preventDefault();
        handlePlayCurrentSentence();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentDictIndex, audioPlaybackRate]);

  // Focus input when moving to a new sentence
  useEffect(() => {
    if (activeTab === 'dictation') {
      setUserInputText('');
      setIsSentenceChecked(false);
      setRevealedCharsCount(0);
      setShowTranslation(false);
      setTimeout(() => {
        dictationInputRef.current?.focus();
        handlePlayCurrentSentence();
      }, 250);
    }
  }, [activeTab, currentDictIndex]);

  // Word Click Handler in Reading View
  const handleWordClick = (targetWord: TargetWord, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    const x = rect.left + scrollX + rect.width / 2;
    const y = rect.bottom + scrollY + 8;

    setSelectedWord(targetWord);
    setPopoverPosition({ x, y });
    soundEffects.playClick();
  };

  // Save Word to Vault
  const handleSaveWord = (tw: TargetWord) => {
    const success = saveWord(tw, article.id, article.title);
    if (success) {
      soundEffects.playSuccess();
      triggerConfetti();
      if (onEarnXp) {
        onEarnXp(10, `Lưu từ vựng: "${tw.word}"`);
      }
    }
  };

  // Pronounce audio
  const handlePronounce = (text: string, rate: number = 0.9) => {
    playSpeech(text, 'en-US', rate);
  };

  // Dictation Speech Playback
  const handlePlayCurrentSentence = () => {
    if (!currentDictSentence) return;
    setIsPlayingAudio(true);
    playSpeech(currentDictSentence.sentence, 'en-US', audioPlaybackRate).finally(() => {
      setIsPlayingAudio(false);
    });
  };

  // Dictation: Check Answer & Word Diff
  const handleCheckDictation = () => {
    if (!currentDictSentence || isSentenceChecked) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[/\\#,+()$~%.":*?<>{}]/g, '')
        .trim();

    const isMatch = normalize(userInputText) === normalize(currentDictSentence.sentence);

    setIsSentenceChecked(true);

    if (isMatch) {
      soundEffects.playSuccess();
      if (!completedDictationIds.includes(currentDictSentence.id)) {
        setCompletedDictationIds((prev) => [...prev, currentDictSentence.id]);
        if (onEarnXp) {
          onEarnXp(20, `Chép chính tả chính xác: "${currentDictSentence.focusWord}"`);
        }
      }
    } else {
      soundEffects.playError();
    }
  };

  // Dictation: Move to Next Sentence
  const handleNextDictationSentence = () => {
    if (currentDictIndex + 1 < dictationList.length) {
      setCurrentDictIndex((prev) => prev + 1);
    } else {
      setIsDictationSessionFinished(true);
      triggerConfetti();
      soundEffects.playSuccess();
    }
  };

  // Dictation: Hint Next Character
  const handleRevealNextChar = () => {
    if (!currentDictSentence) return;
    const cleanSentence = currentDictSentence.sentence;
    const nextCharIndex = revealedCharsCount;
    if (nextCharIndex < cleanSentence.length) {
      setRevealedCharsCount((prev) => prev + 1);
      setUserInputText(cleanSentence.slice(0, nextCharIndex + 1));
    }
  };

  // Reading Comprehension: Submit Quiz
  const handleSubmitQuiz = () => {
    if (isQuizSubmitted) return;

    let correctCount = 0;
    article.comprehensionQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizScore(correctCount);
    setIsQuizSubmitted(true);

    if (correctCount === article.comprehensionQuestions.length) {
      soundEffects.playSuccess();
      triggerConfetti();
      if (onEarnXp) {
        onEarnXp(50, `Đạt điểm tối đa bài đọc hiểu: ${article.title}`);
      }
    } else {
      soundEffects.playClick();
      if (onEarnXp && correctCount > 0) {
        onEarnXp(correctCount * 15, `Hoàn thành kiểm tra đọc hiểu`);
      }
    }
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
  };

  // Render Paragraph with Highlighted Target Words
  const renderInteractiveParagraph = (paragraph: string, pIdx: number) => {
    const targetMap = new Map<string, TargetWord>();
    article.targetWords.forEach((tw) => {
      targetMap.set(tw.word.toLowerCase(), tw);
    });

    const tokens = paragraph.split(/(\b[A-Za-z0-9'-]+\b)/);

    return (
      <p
        key={`p-${pIdx}`}
        className={`text-stone-800 text-justify leading-relaxed font-sans mb-6 ${
          fontSizeLevel === 'normal'
            ? 'text-[1.125rem] leading-[2.15rem]'
            : fontSizeLevel === 'large'
            ? 'text-[1.25rem] leading-[2.4rem]'
            : 'text-[1.375rem] leading-[2.65rem]'
        }`}
      >
        {tokens.map((token, tIdx) => {
          const lowerToken = token.toLowerCase();
          const targetWord = targetMap.get(lowerToken);

          if (targetWord) {
            const isSaved = isWordSaved(targetWord.word);
            return (
              <span
                key={`token-${pIdx}-${tIdx}`}
                onClick={(e) => handleWordClick(targetWord, e)}
                title={`Tra nghĩa: ${targetWord.word}`}
                className={`interactive-target-word inline-block cursor-pointer font-medium px-1 py-0.5 rounded transition-all duration-200 ${
                  isSaved
                    ? 'border-b-2 border-[#064E3B] bg-emerald-50 text-[#064E3B] font-semibold'
                    : 'border-b-2 border-dashed border-amber-500/70 bg-amber-50/70 text-stone-900 hover:bg-amber-100 shadow-2xs'
                }`}
              >
                {token}
                {isSaved && (
                  <BookmarkCheck className="inline-block w-3.5 h-3.5 ml-1 text-emerald-800 -translate-y-0.5" />
                )}
              </span>
            );
          }

          return <span key={`token-${pIdx}-${tIdx}`}>{token}</span>;
        })}
      </p>
    );
  };

  const savedInArticleCount = article.targetWords.filter((tw) => isWordSaved(tw.word)).length;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 selection:bg-amber-200 selection:text-stone-900 relative pb-28">
      {/* ================= STICKY TOPBAR ================= */}
      <header className="sticky top-0 z-30 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200 shadow-2xs transition-all">
        {/* Progress Bar (Visible in Reading Mode) */}
        {activeTab === 'reading' && (
          <div className="w-full bg-stone-200 h-1">
            <div
              className="bg-gradient-to-r from-[#064E3B] via-emerald-600 to-[#D97706] h-1 transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Back to Library Button */}
          <button
            onClick={onBackToLibrary}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#064E3B] font-semibold text-xs sm:text-sm py-1.5 px-2.5 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thư viện</span>
          </button>

          {/* Core 2-Step Tab Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-inner">
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reading'
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>1. Đọc Sâu Nạp Từ</span>
            </button>

            <button
              onClick={() => setActiveTab('dictation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'dictation'
                  ? 'bg-[#D97706] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-amber-200" />
              <span>2. Nghe Chép Chính Tả ({dictationList.length})</span>
            </button>
          </div>

          {/* Quick Actions & Vault Counter */}
          <div className="flex items-center gap-2">
            {activeTab === 'reading' && (
              <div className="hidden sm:flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                <button
                  onClick={() => setFontSizeLevel('normal')}
                  className={`p-1.5 rounded text-xs font-bold ${
                    fontSizeLevel === 'normal'
                      ? 'bg-[#064E3B] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Cỡ chữ chuẩn"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFontSizeLevel('large')}
                  className={`p-1.5 rounded text-xs font-bold ${
                    fontSizeLevel === 'large'
                      ? 'bg-[#064E3B] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Cỡ chữ lớn"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeLevel('xl')}
                  className={`p-1.5 rounded text-xs font-bold ${
                    fontSizeLevel === 'xl'
                      ? 'bg-[#064E3B] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Cỡ chữ cực lớn"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onNavigateVault}
              className="inline-flex items-center gap-1.5 bg-[#064E3B] hover:bg-[#043d2e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Sổ tay ({savedWords.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= STEP 1: DEEP READING STUDIO ================= */}
      {activeTab === 'reading' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 animate-in fade-in duration-200">
          {/* Paper Editorial Container */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-sm mb-12">
            {/* Meta Header */}
            <header className="mb-8 pb-6 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${article.topicColor}`}
                >
                  {article.topic}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${article.levelBadgeColor}`}
                >
                  Cấp độ {article.level}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-stone-500 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTimeMinutes} phút đọc • {article.wordCount} từ
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#064E3B] tracking-normal leading-snug mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-stone-600 mb-6">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-serif font-bold text-[#064E3B] text-sm">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-stone-900 text-sm">{article.author}</div>
                  <div className="text-stone-500 italic text-xs">{article.authorRole}</div>
                </div>
              </div>

              <div className="text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-stone-200 pt-3">
                <span>
                  Nguồn tài liệu: <strong className="text-stone-700">{article.journal}</strong>
                </span>
                <span>Xuất bản: {article.publishedDate}</span>
              </div>

              {/* Abstract */}
              <div className="mt-6 bg-stone-50 border-l-4 border-amber-500 rounded-r-xl p-4 sm:p-5 border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Tóm tắt nội dung chính (Summary)
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic font-sans">
                  "{article.summary}"
                </p>
              </div>

              {/* Instructions banner */}
              <div className="mt-4 bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Bấm vào các từ có gạch chân nét đứt (
                    <span className="border-b-2 border-dashed border-amber-500 bg-amber-100 font-semibold px-1 rounded">
                      academic word
                    </span>
                    ) để tra phiên âm IPA, nghĩa ngữ cảnh và bấm <strong>Lưu vào Sổ tay</strong>.
                  </span>
                </div>
                <div className="shrink-0 font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-1 rounded-md">
                  {savedInArticleCount}/{article.targetWords.length} Đã lưu
                </div>
              </div>
            </header>

            {/* Paragraphs */}
            <article className="prose prose-stone max-w-none">
              {article.contentParagraphs.map((paragraph, idx) =>
                renderInteractiveParagraph(paragraph, idx)
              )}
            </article>
          </div>

          {/* ================= FLOATING CONTEXT POPOVER ================= */}
          {selectedWord && popoverPosition && (
            <div
              id="word-popover"
              style={{
                position: 'absolute',
                top: `${popoverPosition.y}px`,
                left: `${Math.min(
                  Math.max(20, popoverPosition.x - 175),
                  window.innerWidth - 370
                )}px`,
                width: '350px',
                maxWidth: '92vw',
              }}
              className="z-50 bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-serif font-bold text-[#064E3B]">
                      {selectedWord.word}
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full border border-stone-200">
                      {selectedWord.partOfSpeech}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-stone-500 font-medium">
                      {selectedWord.ipa}
                    </span>
                    <button
                      onClick={() => handlePronounce(selectedWord.word)}
                      className="p-1 rounded-full hover:bg-stone-100 text-emerald-800 transition-colors"
                      title="Phát âm chuẩn US"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-stone-400 hover:text-stone-600 text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mb-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-0.5">
                  Định nghĩa theo ngữ cảnh
                </div>
                <div className="text-stone-900 font-medium text-sm leading-snug">
                  {selectedWord.definitionVi}
                </div>
              </div>

              <div className="mb-3 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                  English Context Definition
                </div>
                <div className="text-stone-700 text-xs italic leading-relaxed font-sans">
                  "{selectedWord.definitionEn}"
                </div>
              </div>

              {selectedWord.collocations && selectedWord.collocations.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Cụm từ hay (Collocations)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWord.collocations.map((col, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md font-medium"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                {isWordSaved(selectedWord.word) ? (
                  <div className="w-full py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    <span>Đã lưu trong Sổ tay từ vựng</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSaveWord(selectedWord)}
                    className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <Bookmark className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Lưu vào Sổ tay</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= CALL-TO-ACTION TO STEP 2: DICTATION ================= */}
          <div className="mb-12 bg-gradient-to-br from-[#064E3B] to-[#022C22] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Headphones className="w-3.5 h-3.5" />
                Vòng Lặp Bước 2: Nghe & Chép Chính Tả Ngữ Cảnh
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Khắc Sâu Từ Vựng Qua Tai Nghe & Đôi Tay
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                Đã nạp {savedInArticleCount}/{article.targetWords.length} từ vựng mục tiêu. Hãy chuyển sang Bước 2 để luyện nghe chép 5 câu trích đoạn có chứa các từ này.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('dictation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Vào Chép Chính Tả ({dictationList.length} câu)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ================= SYNTHESIS TABLE ================= */}
          <section className="mb-12 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-serif font-bold text-[#064E3B]">
                    Tổng Hợp Từ Vựng Mục Tiêu Bài Đọc
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Toàn bộ {article.targetWords.length} từ vựng quan trọng cần ghi nhớ.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                Đã lưu: {savedInArticleCount} / {article.targetWords.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase font-bold text-stone-500 bg-stone-50">
                    <th className="py-3 px-4">Từ vựng & Loại từ</th>
                    <th className="py-3 px-4">Phiên âm</th>
                    <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4">Collocations</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {article.targetWords.map((tw) => {
                    const isSaved = isWordSaved(tw.word);
                    return (
                      <tr key={tw.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-serif font-bold text-stone-900 text-base">
                            {tw.word}
                          </div>
                          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                            {tw.partOfSpeech}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-stone-600">
                          <div className="flex items-center gap-1.5">
                            <span>{tw.ipa}</span>
                            <button
                              onClick={() => handlePronounce(tw.word)}
                              className="text-stone-400 hover:text-emerald-700 transition-colors p-1"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-800 text-xs font-medium">
                          {tw.definitionVi}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {tw.collocations.slice(0, 2).map((col, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isSaved ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                              <Check className="w-3 h-3" /> Đã lưu
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSaveWord(tw)}
                              className="inline-flex items-center gap-1 bg-[#064E3B] hover:bg-[#043d2e] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                            >
                              <Bookmark className="w-3 h-3 text-amber-400" />
                              <span>Lưu từ</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= COMPREHENSION QUIZ ================= */}
          <section
            ref={comprehensionRef}
            className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-serif font-bold text-[#064E3B]">
                    Bài Tập Đọc Hiểu (Comprehension)
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  3 câu hỏi trắc nghiệm kiểm tra mức độ hiểu bài của bạn.
                </p>
              </div>

              {isQuizSubmitted && quizScore !== null && (
                <div className="flex items-center gap-3">
                  <div
                    className={`text-sm font-bold px-3.5 py-1.5 rounded-xl border ${
                      quizScore === article.comprehensionQuestions.length
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    Kết quả: {quizScore} / {article.comprehensionQuestions.length} Đúng
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="text-xs text-stone-500 hover:text-stone-800 underline flex items-center gap-1"
                  >
                    Làm lại
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {article.comprehensionQuestions.map((q, qIdx) => {
                const selectedOpt = userAnswers[q.id];
                const isCorrect = isQuizSubmitted && selectedOpt === q.correctAnswer;
                const isWrong = isQuizSubmitted && selectedOpt !== undefined && selectedOpt !== q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isQuizSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : isWrong
                          ? 'border-red-300 bg-red-50/20'
                          : 'border-stone-200 bg-stone-50/50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-6 h-6 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h4 className="font-serif font-semibold text-stone-900 text-base leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="space-y-2 ml-9">
                      {q.options.map((optText, optIdx) => {
                        const isOptionSelected = selectedOpt === optIdx;
                        const isThisTheCorrectAnswer = isQuizSubmitted && optIdx === q.correctAnswer;
                        const isSelectedAndWrong = isQuizSubmitted && isOptionSelected && !isThisTheCorrectAnswer;

                        let buttonStyle = 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800';

                        if (isQuizSubmitted) {
                          if (isThisTheCorrectAnswer) {
                            buttonStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-medium';
                          } else if (isSelectedAndWrong) {
                            buttonStyle = 'bg-red-100 border-red-400 text-red-950 font-medium line-through';
                          } else {
                            buttonStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                          }
                        } else if (isOptionSelected) {
                          buttonStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-semibold shadow-2xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => {
                              soundEffects.playClick();
                              setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                            }}
                            className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-start gap-3 ${buttonStyle}`}
                          >
                            <span className="font-mono text-xs font-bold uppercase w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{optText}</span>
                            {isQuizSubmitted && isThisTheCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="mt-4 ml-9 p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                        <div className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          Giải thích chi tiết:
                        </div>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Đã trả lời: {Object.keys(userAnswers).length} / {article.comprehensionQuestions.length} câu
              </div>

              {!isQuizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length < article.comprehensionQuestions.length}
                  className="px-6 py-2.5 bg-[#064E3B] hover:bg-[#043d2e] disabled:opacity-40 text-white rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Nộp bài & Chấm điểm</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('dictation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Chuyển sang Bước 2: Chép Chính Tả</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        </main>
      )}

      {/* ================= STEP 2: CONTEXTUAL DICTATION STUDIO ================= */}
      {activeTab === 'dictation' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 animate-in fade-in duration-200">
          {dictationList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
              <Headphones className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-stone-800">
                Chưa có dữ liệu chép chính tả cho bài đọc này
              </h3>
              <button
                onClick={() => setActiveTab('reading')}
                className="mt-4 px-5 py-2.5 bg-[#064E3B] text-white text-xs font-semibold rounded-xl"
              >
                Quay lại phòng đọc sâu
              </button>
            </div>
          ) : isDictationSessionFinished ? (
            /* Dictation Session Completion Card */
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-[#064E3B]">
                <FileCheck2 className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#064E3B] mb-2">
                Xuất Sắc! Hoàn Thành Bước 2: Chép Chính Tả
              </h2>
              <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                Bạn đã hoàn thành trọn vẹn cả <strong>{dictationList.length} câu trích đoạn</strong>. Đôi tai và phản xạ gõ phím của bạn đã gắn kết từ vựng với ngữ cảnh câu văn sống động.
              </p>

              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-8 inline-flex items-center gap-6">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#064E3B]">
                    {dictationList.length} / {dictationList.length}
                  </div>
                  <div className="text-[11px] text-stone-500 font-semibold uppercase">Câu đã hoàn thành</div>
                </div>
                <div className="h-8 w-px bg-stone-200" />
                <div>
                  <div className="text-2xl font-serif font-bold text-emerald-600">
                    100%
                  </div>
                  <div className="text-[11px] text-stone-500 font-semibold uppercase">Tỷ lệ chính xác</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onNavigateVault}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] text-white text-sm font-bold shadow-sm transition-all"
                >
                  <Bookmark className="w-4 h-4 text-amber-300" />
                  <span>Bước 3: Mở Sổ Tay Ôn Tập SRS</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentDictIndex(0);
                    setIsDictationSessionFinished(false);
                    setCompletedDictationIds([]);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold transition-all"
                >
                  Luyện lại bài này
                </button>
              </div>
            </div>
          ) : currentDictSentence ? (
            /* Active Dictation Sentence Player */
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm">
              {/* Progress & Focus Word */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                    Câu {currentDictIndex + 1} / {dictationList.length}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {dictationList.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentDictIndex
                            ? 'bg-[#D97706]'
                            : completedDictationIds.includes(dictationList[idx].id)
                            ? 'bg-[#064E3B]'
                            : 'bg-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-medium">Từ mục tiêu:</span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 font-mono">
                    {currentDictSentence.focusWord}
                  </span>
                </div>
              </div>

              {/* Audio Controls Player Card */}
              <div className="bg-stone-50/80 rounded-2xl border border-stone-200 p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Play / Rewind controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayCurrentSentence}
                      disabled={isPlayingAudio}
                      className="w-12 h-12 rounded-2xl bg-[#064E3B] hover:bg-[#043d2e] active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                      title="Phát câu (Ctrl + Space)"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-5 h-5 fill-current animate-pulse" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5 text-amber-300" />
                      )}
                    </button>

                    <button
                      onClick={handlePlayCurrentSentence}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold shadow-2xs transition-colors"
                      title="Nghe lại từ đầu"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nghe lại</span>
                    </button>
                  </div>

                  {/* Audio visualizer wave bar */}
                  <div className="flex-1 max-w-xs flex items-center gap-1 h-8 px-3 bg-white border border-stone-200 rounded-xl">
                    {[35, 60, 40, 80, 50, 90, 45, 75, 55, 85, 30, 70, 50, 65, 40].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          isPlayingAudio ? 'bg-[#0D9488]' : 'bg-stone-200'
                        }`}
                        style={{
                          height: isPlayingAudio ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : '25%',
                        }}
                      />
                    ))}
                  </div>

                  {/* Speed toggle */}
                  <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => setAudioPlaybackRate(0.8)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        audioPlaybackRate === 0.8
                          ? 'bg-[#064E3B] text-white'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      0.8x
                    </button>
                    <button
                      onClick={() => setAudioPlaybackRate(1.0)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        audioPlaybackRate === 1.0
                          ? 'bg-[#064E3B] text-white'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      1.0x
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Nhấn <strong>Ctrl + Space</strong> để phát âm thanh • Nghe và gõ lại từng từ</span>
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="text-amber-800 hover:underline font-semibold"
                  >
                    {showTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Xem bản dịch nghĩa'}
                  </button>
                </div>

                {showTranslation && (
                  <div className="mt-2.5 p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 italic">
                    "{currentDictSentence.translationVi}"
                  </div>
                )}
              </div>

              {/* Typing Input Area */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Khu Vực Gõ Đối Soát Chính Tả:
                  </label>

                  <button
                    onClick={handleRevealNextChar}
                    className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 font-semibold transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Gợi ý ký tự tiếp theo</span>
                  </button>
                </div>

                <textarea
                  ref={dictationInputRef}
                  rows={3}
                  value={userInputText}
                  onChange={(e) => setUserInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!isSentenceChecked) {
                        handleCheckDictation();
                      } else {
                        handleNextDictationSentence();
                      }
                    }
                  }}
                  placeholder="Lắng nghe câu văn và gõ lại chính xác tại đây. Nhấn Enter để kiểm tra..."
                  className={`w-full p-4 rounded-2xl border font-sans text-base leading-relaxed focus:outline-none transition-all ${
                    isSentenceChecked
                      ? completedDictationIds.includes(currentDictSentence.id)
                        ? 'border-emerald-500 bg-emerald-50/40 text-stone-900 font-medium'
                        : 'border-amber-400 bg-amber-50/20 text-stone-900'
                      : 'border-stone-300 focus:border-[#064E3B] focus:ring-2 focus:ring-emerald-800/20 bg-white'
                  }`}
                />
              </div>

              {/* Word-by-Word Diff Evaluation */}
              {isSentenceChecked && (
                <div className="mb-6 p-5 rounded-2xl border border-stone-200 bg-stone-50 animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Đối Soát Chi Tiết Từng Từ:
                  </div>

                  <div className="text-base sm:text-lg font-serif leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
                    {(() => {
                      const expectedWords = currentDictSentence.sentence.split(/\s+/);
                      const userWords = userInputText.trim().split(/\s+/);

                      return expectedWords.map((expWord, idx) => {
                        const cleanExp = expWord.toLowerCase().replace(/[/\\#,+()$~%.":*?<>{}]/g, '');
                        const userWord = userWords[idx] || '';
                        const cleanUser = userWord.toLowerCase().replace(/[/\\#,+()$~%.":*?<>{}]/g, '');
                        const isMatch = cleanUser === cleanExp;

                        if (isMatch) {
                          return (
                            <span
                              key={idx}
                              className="text-[#064E3B] font-bold bg-emerald-100/70 px-1 rounded"
                            >
                              {expWord}
                            </span>
                          );
                        }

                        return (
                          <span
                            key={idx}
                            className="text-[#DC2626] font-semibold bg-red-50 border-b-2 border-red-400 px-1 rounded"
                            title={`Bạn đã gõ: "${userWord || 'chưa gõ'}"`}
                          >
                            {expWord}
                          </span>
                        );
                      });
                    })()}
                  </div>

                  <div className="mt-3 text-xs text-stone-500 flex items-center justify-between border-t border-stone-200 pt-2.5">
                    <span>
                      {completedDictationIds.includes(currentDictSentence.id) ? (
                        <strong className="text-[#064E3B] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hoàn hảo! Chép chính xác
                        </strong>
                      ) : (
                        <span className="text-stone-600">
                          Những từ màu đỏ cần chú ý sửa lại cho chuẩn xác.
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => {
                        setIsSentenceChecked(false);
                        dictationInputRef.current?.focus();
                      }}
                      className="text-amber-800 hover:underline font-semibold"
                    >
                      Thử gõ lại
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="text-xs text-stone-500">
                  Nhấn <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border text-[11px] font-mono">Enter</kbd> để kiểm tra đáp án
                </div>

                {!isSentenceChecked ? (
                  <button
                    onClick={handleCheckDictation}
                    disabled={!userInputText.trim()}
                    className="px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] disabled:opacity-40 text-white font-bold text-sm shadow-sm transition-all"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    onClick={handleNextDictationSentence}
                    className="px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>
                      {currentDictIndex + 1 < dictationList.length
                        ? 'Chuyển sang câu tiếp theo'
                        : 'Xem bảng tổng kết bài học'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </main>
      )}
    </div>
  );
};
