import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  XCircle,
  Sparkles,
  Check,
  Flag,
  Award,
  RotateCcw,
  Layers,
  BookmarkCheck,
  BookOpen,
} from 'lucide-react';
import { mockReadingPassages } from '../../data/cambridgeMockData';
import { CambridgeReadingPassage, CambridgeReadingQuestion, ReadingSessionConfig, TargetWord } from '../../types';
import { AudioPlayButton } from '../../components/shared/AudioPlayButton';
import { SelectionPopover } from '../../components/shared/SelectionPopover';
import { useAnki } from '../../context/AnkiContext';
import {
  getReadingPassageById,
  submitReadingExamToDatabase,
} from '../../services/cambridgeApi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ReadingTestRoomProps {
  passageId: string;
  sessionConfig?: ReadingSessionConfig;
  onBackToLibrary: () => void;
  onNavigateAnki?: () => void;
  onEarnXp?: (amount: number, reason: string) => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ReadingTestRoom: React.FC<ReadingTestRoomProps> = ({
  passageId,
  sessionConfig,
  onBackToLibrary,
  onNavigateAnki,
  onEarnXp,
  onNotify,
}) => {
  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();

  const isFullTest = sessionConfig?.mode === 'full' && (sessionConfig.passageIds?.length || 0) > 1;

  const initialPassage =
    mockReadingPassages.find((p) => p.id === passageId) || mockReadingPassages[0];
  const [passage, setPassage] = useState<CambridgeReadingPassage>(initialPassage);
  const [allPassages, setAllPassages] = useState<CambridgeReadingPassage[]>([]);
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);

  // Timer: 60 minutes for Full Test, 20 minutes for single passage
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    isFullTest ? 60 * 60 : (passage.estimatedMinutes || 20) * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    if (isFullTest && sessionConfig?.passageIds) {
      Promise.all(sessionConfig.passageIds.map((id) => getReadingPassageById(id)))
        .then((loaded) => {
          setAllPassages(loaded);
          if (loaded[0]) {
            setPassage(loaded[0]);
          }
          setSecondsRemaining(60 * 60);
        })
        .catch((err) => {
          console.error('Lỗi tải Full Test passages:', err);
        });
    } else {
      getReadingPassageById(passageId).then((data) => {
        if (data) {
          setPassage(data);
          setAllPassages([data]);
          setSecondsRemaining((data.estimatedMinutes || 20) * 60);
        }
      });
    }
  }, [passageId, sessionConfig, isFullTest]);

  const currentPassage = isFullTest ? (allPassages[activePassageIndex] || passage) : passage;

  const activeQuestions = useMemo(() => {
    if (isFullTest && allPassages.length > 0) {
      return allPassages.flatMap((p) => p.questions);
    }
    return passage.questions;
  }, [isFullTest, allPassages, passage]);

  const activeTargetWords = useMemo(() => {
    if (isFullTest && allPassages.length > 0) {
      return allPassages.flatMap((p) => p.targetWords);
    }
    return passage.targetWords;
  }, [isFullTest, allPassages, passage]);

  // Mode: 'exam' (real test mode with final submission) vs 'practice' (instant feedback)
  const [testMode, setTestMode] = useState<'exam' | 'practice'>('exam');

  // Right column active tab
  const [activeTab, setActiveTab] = useState<'questions' | 'vocabulary'>('questions');

  // Font size adjustment for reader
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // User answers for questions: questionId -> answer label (e.g. 'TRUE', 'B', text)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Exam submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<{
    correctCount: number;
    totalCount: number;
    bandScore: number;
    percentage: number;
  } | null>(null);

  // Text selection popover state
  const [popoverState, setPopoverState] = useState<{
    visible: boolean;
    selectedText: string;
    contextSentence: string;
    position: { x: number; y: number };
  }>({
    visible: false,
    selectedText: '',
    contextSentence: '',
    position: { x: 0, y: 0 },
  });

  const passageContainerRef = useRef<HTMLDivElement>(null);
  const readingProgressRef = useRef<HTMLDivElement>(null);

  // Đồng bộ thanh tiến độ đọc vàng hổ phách & hiệu ứng làm nổi bật đoạn văn (Paragraph Reveal)
  useGSAP(
    () => {
      const container = passageContainerRef.current;
      const bar = readingProgressRef.current;
      if (!container || !bar) return;

      // 1. Thanh tiến độ đọc vàng cát (Reading Scroll Progress)
      const updateReadingProgress = () => {
        const isScrollable = container.scrollHeight > container.clientHeight;
        let progress = 0;
        if (isScrollable) {
          progress = container.scrollTop / (container.scrollHeight - container.clientHeight);
        } else {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        }
        gsap.to(bar, {
          scaleX: Math.min(Math.max(progress, 0), 1),
          duration: 0.1,
          ease: 'none',
          force3D: true,
        });
      };

      container.addEventListener('scroll', updateReadingProgress, { passive: true });
      window.addEventListener('scroll', updateReadingProgress, { passive: true });

      // 2. Xuất hiện từng đoạn văn (Paragraph Reveal với ScrollTrigger.batch)
      // Khi cuộn tới đoạn văn nào, đoạn văn đó sáng rõ 100% để tập trung đọc
      const batchTriggers = ScrollTrigger.batch('.reading-paragraph', {
        scroller: container.scrollHeight > container.clientHeight ? container : undefined,
        interval: 0.08,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });
        },
        onLeave: (batch) => {
          gsap.to(batch, {
            opacity: 0.45,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0.45,
            duration: 0.3,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        },
      });

      // Đoạn văn đầu tiên luôn sáng rõ 100% ban đầu
      const firstParagraph = container.querySelector('.reading-paragraph');
      if (firstParagraph) {
        gsap.set(firstParagraph, { opacity: 1 });
      }

      return () => {
        container.removeEventListener('scroll', updateReadingProgress);
        window.removeEventListener('scroll', updateReadingProgress);
        batchTriggers.forEach((t) => t.kill());
      };
    },
    { scope: passageContainerRef, dependencies: [currentPassage.id, activePassageIndex] }
  );

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Text selection handler
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 2 || text.length > 50) {
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Extract surrounding sentence
    const anchorNode = selection.anchorNode;
    let contextSentence = text;
    if (anchorNode && anchorNode.textContent) {
      const fullContent = anchorNode.textContent;
      const sentences = fullContent.split(/(?<=[.?!])\s+/);
      const matchedSentence = sentences.find((s) => s.includes(text));
      if (matchedSentence) {
        contextSentence = matchedSentence.trim();
      }
    }

    setPopoverState({
      visible: true,
      selectedText: text,
      contextSentence,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const findPassageIndexForQuestion = (qNumber: number): number => {
    if (!isFullTest || allPassages.length === 0) return 0;
    for (let idx = 0; idx < allPassages.length; idx++) {
      if (allPassages[idx].questions?.some((q) => q.number === qNumber)) {
        return idx;
      }
    }
    return 0;
  };

  const scrollToQuestion = (questionNumber: number) => {
    setActiveTab('questions');
    if (isFullTest) {
      const targetPassageIdx = findPassageIndexForQuestion(questionNumber);
      if (targetPassageIdx !== activePassageIndex) {
        setActivePassageIndex(targetPassageIdx);
      }
    }
    setTimeout(() => {
      const el = document.getElementById(`question-card-${questionNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-amber-500');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-amber-500');
        }, 1200);
      }
    }, 50);
  };

  const checkIsCorrect = (q: CambridgeReadingQuestion, answer: string): boolean => {
    const cleanAns = (answer || '').trim().toLowerCase();
    if (!cleanAns) return false;

    if (q.type === 'summary_completion') {
      const acceptable = [
        q.correctAnswer.toLowerCase(),
        ...(q.acceptableAnswers?.map((a) => a.toLowerCase()) || []),
      ];
      return acceptable.includes(cleanAns);
    }
    return cleanAns === q.correctAnswer.trim().toLowerCase();
  };

  const handleCheckPracticeQuestion = (q: CambridgeReadingQuestion) => {
    setCheckedQuestions((prev) => ({ ...prev, [q.id]: true }));
    const isCorrect = checkIsCorrect(q, userAnswers[q.id] || '');
    if (isCorrect) {
      onEarnXp?.(10, `Chính xác câu ${q.number}!`);
    }
  };

  const getIeltsBandScore = (correct: number, total: number): number => {
    const ratio = correct / total;
    if (ratio >= 0.92) return 9.0;
    if (ratio >= 0.84) return 8.5;
    if (ratio >= 0.76) return 8.0;
    if (ratio >= 0.68) return 7.5;
    if (ratio >= 0.60) return 7.0;
    if (ratio >= 0.52) return 6.5;
    if (ratio >= 0.44) return 6.0;
    if (ratio >= 0.36) return 5.5;
    if (ratio >= 0.28) return 5.0;
    if (ratio >= 0.20) return 4.5;
    if (ratio >= 0.12) return 4.0;
    return 3.5;
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (checkIsCorrect(q, userAnswers[q.id] || '')) {
        correctCount++;
      }
    });

    const totalCount = activeQuestions.length;
    const bandScore = getIeltsBandScore(correctCount, totalCount);
    const percentage = Math.round((correctCount / totalCount) * 100);

    setExamResult({ correctCount, totalCount, bandScore, percentage });
    setIsSubmitted(true);
    setShowSubmitModal(true);
    setIsTimerRunning(false);

    const examLabel = isFullTest
      ? `${sessionConfig?.testTitle || currentPassage.source} (Full Test 40 câu)`
      : `Cambridge ${currentPassage.source}`;
    onEarnXp?.(0, `Hoàn thành bài thi ${examLabel} (Band ${bandScore})!`);
    onNotify?.(`Hoàn thành bài thi! Đạt ${correctCount}/${totalCount} câu đúng (IELTS Band ${bandScore}).`, 'success');

    // Lưu kết quả thi vào CSDL MySQL
    const totalEstSeconds = isFullTest ? 60 * 60 : ((currentPassage.estimatedMinutes || 20) * 60);
    const timeTaken = totalEstSeconds - secondsRemaining;
    submitReadingExamToDatabase(currentPassage.id, userAnswers, timeTaken).catch((err) =>
      console.warn('Lưu kết quả thi vào MySQL thất bại:', err)
    );
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setShowSubmitModal(false);
    setExamResult(null);
    setSecondsRemaining(isFullTest ? 60 * 60 : ((currentPassage.estimatedMinutes || 20) * 60));
    setIsTimerRunning(true);
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => (userAnswers[k] || '').trim().length > 0
  ).length;

  const handleSaveWordToAnki = (tw: TargetWord) => {
    const success = addCardToPersonalDeck({
      word: tw.word,
      ipa: tw.ipa,
      pos: tw.partOfSpeech,
      definitionEn: tw.definitionEn,
      definitionVi: tw.definitionVi,
      contextSentence: tw.contextSentence,
      source: currentPassage.source,
    });

    if (success) {
      onEarnXp?.(10, `Đã lưu "${tw.word}" vào Anki Flashcard!`);
      onNotify?.(`Đã lưu "${tw.word}" vào Deck Cá Nhân trong Anki!`, 'success');
    } else {
      onNotify?.(`"${tw.word}" đã có sẵn trong Deck Anki của bạn.`, 'info');
    }
  };

  // Font size classes
  const fontClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed sm:leading-8',
    lg: 'text-base sm:text-lg leading-relaxed sm:leading-9',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-amber-400/40">
      {/* Top Test Header Toolbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-300 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back button & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLibrary}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Quay lại danh sách đề thi"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold uppercase">
                  {isFullTest ? `${sessionConfig?.testTitle || currentPassage.source} (Full Test)` : currentPassage.source}
                </span>
                <span className="text-[10px] font-mono text-stone-500 hidden sm:inline-block">
                  {isFullTest ? `Passage ${activePassageIndex + 1}/3` : currentPassage.level}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {activeQuestions.length} CÂU HỎI {isFullTest ? 'CHUẨN THI THẬT' : 'CHUẨN'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#064E3B] truncate max-w-xs sm:max-w-md">
                {currentPassage.title}
              </h2>
            </div>
          </div>

          {/* Right Toolbar: Mode, Timer, Font size */}
          <div className="flex items-center gap-3">
            {/* Mode Switcher */}
            <div className="hidden sm:inline-flex items-center rounded-xl border border-stone-300 bg-stone-100 p-0.5 text-xs font-sans font-bold">
              <button
                onClick={() => setTestMode('exam')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  testMode === 'exam'
                    ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Thi Thử (Exam)
              </button>
              <button
                onClick={() => setTestMode('practice')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  testMode === 'practice'
                    ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Luyện Tập
              </button>
            </div>

            {/* Timer */}
            <button
              onClick={() => setIsTimerRunning((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-xs font-mono font-bold text-stone-800 cursor-pointer transition-colors"
              title={isTimerRunning ? 'Bấm để tạm dừng đếm giờ' : 'Bấm để tiếp tục đếm giờ'}
            >
              <Clock size={14} className={secondsRemaining < 300 ? 'text-red-600 animate-pulse' : 'text-amber-700'} />
              <span>{formatTimer(secondsRemaining)}</span>
              <span className="text-[9px] text-stone-400 font-sans">{isTimerRunning ? 'Chạy' : 'Dừng'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="hidden sm:inline-flex items-center rounded-xl border border-stone-300 bg-white p-0.5 text-xs font-mono">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'sm' ? 'bg-stone-200 font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                title="Cỡ chữ nhỏ"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'base' ? 'bg-stone-200 font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                title="Cỡ chữ vừa"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'lg' ? 'bg-stone-200 font-bold' : 'text-stone-600 hover:bg-stone-100'}`}
                title="Cỡ chữ lớn"
              >
                A+
              </button>
            </div>

            {/* Quick link to Anki */}
            {onNavigateAnki && (
              <button
                onClick={onNavigateAnki}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold font-sans cursor-pointer transition-colors"
                title="Mở không gian Flashcard Anki"
              >
                <BookmarkCheck size={14} className="text-amber-700" />
                <span>Anki SRS</span>
              </button>
            )}
          </div>
        </div>

        {/* Reading Scroll Progress Bar: đường chỉ vàng cát thanh mảnh */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-200/60 overflow-hidden">
          <div
            ref={readingProgressRef}
            className="h-full bg-[#D97706] w-full origin-left scale-x-0 will-change-transform"
          />
        </div>
      </header>

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Passage Reading (55% / 7 Cols) */}
        <section
          ref={passageContainerRef}
          onMouseUp={handleMouseUp}
          className="lg:col-span-7 bg-white rounded-3xl border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6 lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto"
        >
          {/* Full Test Passage Switcher Bar */}
          {isFullTest && allPassages.length > 1 && (
            <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
              {allPassages.map((p, idx) => {
                const isActive = activePassageIndex === idx;
                const pQuestions = p.questions || [];
                const startQ = pQuestions[0]?.number || 1;
                const endQ = pQuestions[pQuestions.length - 1]?.number || pQuestions.length;
                const pAnsCount = pQuestions.filter((q) => Boolean(userAnswers[q.id]?.trim())).length;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePassageIndex(idx)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                      isActive
                        ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Passage {idx + 1}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-200 text-stone-600'
                      }`}>
                        Q{startQ}–Q{endQ}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {pAnsCount}/{pQuestions.length} câu
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Passage Header */}
          <div className="border-b border-stone-200 pb-5 space-y-2">
            <span className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-normal">
              READING PASSAGE {currentPassage.passageNumber} • {currentPassage.topic}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#064E3B] leading-tight">
              {currentPassage.title}
            </h1>
            {currentPassage.subtitle && (
              <p className="text-xs sm:text-sm text-stone-600 font-sans italic">
                {currentPassage.subtitle}
              </p>
            )}
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-stone-500">
              <span>{currentPassage.wordCount} từ</span>
              <span>•</span>
              <span className="text-amber-800 font-semibold">
                Mẹo: Bôi đen từ/cụm từ bất kỳ để tra cứu và lưu nhanh vào Anki
              </span>
            </div>
          </div>

          {/* Paragraphs with Section Letters */}
          {/* Paragraphs with Section Letters (Paragraph Focus Reveal) */}
          <div className={`space-y-6 text-stone-800 font-serif ${fontClasses[fontSize]}`}>
            {currentPassage.paragraphs.map((p, idx) => (
              <div
                key={p.letter}
                className={`reading-paragraph relative flex items-start gap-3 sm:gap-4 transition-opacity duration-300 will-change-transform ${
                  idx === 0 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className="sticky top-2 shrink-0 w-7 h-7 rounded-lg bg-stone-100 text-[#064E3B] border border-stone-300 font-sans font-bold text-xs flex items-center justify-center select-none shadow-2xs">
                  {p.letter}
                </span>
                <p className="flex-1 leading-relaxed text-justify sm:text-left">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN: Tooling Pane (45% / 5 Cols) */}
        <aside className="lg:col-span-5 bg-white rounded-3xl border border-stone-300 shadow-xs flex flex-col lg:max-h-[calc(100vh-130px)] overflow-hidden">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-stone-200 bg-stone-50/80 p-1.5 rounded-t-3xl">
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'questions'
                  ? 'bg-white text-[#064E3B] shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <HelpCircle size={14} className={activeTab === 'questions' ? 'text-amber-600' : ''} />
              <span>Câu Hỏi Làm Bài ({activeQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'vocabulary'
                  ? 'bg-white text-[#064E3B] shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bookmark size={14} className={activeTab === 'vocabulary' ? 'text-amber-600' : ''} />
              <span>Từ Vựng Trọng Tâm ({activeTargetWords.length})</span>
            </button>
          </div>

          {/* QUESTION PALETTE / NAVIGATOR (Computer-Delivered IELTS Header) */}
          {activeTab === 'questions' && (
            <div className="p-3 bg-stone-100/90 border-b border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-stone-700 flex items-center gap-1.5">
                  <Layers size={13} className="text-amber-700" />
                  Bảng Điều Hướng ({activeQuestions.length} Câu):
                </span>
                <span className="font-semibold text-stone-500">
                  Đã làm: <strong className="text-[#064E3B]">{answeredCount}</strong>/{activeQuestions.length}
                </span>
              </div>

              {/* Number Grid 1 to 13/14 or 1 to 40 */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeQuestions.map((q) => {
                  const isAnswered = Boolean((userAnswers[q.id] || '').trim());
                  const isFlagged = Boolean(flaggedQuestions[q.id]);
                  const isCorrect = isSubmitted && checkIsCorrect(q, userAnswers[q.id] || '');

                  let btnStyle = 'bg-white text-stone-700 border-stone-300 hover:border-stone-400';
                  if (isSubmitted) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-red-600 text-white border-red-700';
                  } else if (isAnswered) {
                    btnStyle = 'bg-[#064E3B] text-amber-300 font-bold border-[#022C22] shadow-2xs';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => scrollToQuestion(q.number)}
                      className={`relative w-7 h-7 rounded-lg text-xs font-mono font-bold border flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                      title={`Nhảy tới Câu ${q.number}${isFlagged ? ' (Đã đánh dấu)' : ''}`}
                    >
                      <span>{q.number}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content Body */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* TAB 1: QUESTIONS */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                {/* Exam Mode Result Alert */}
                {isSubmitted && examResult && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                        <Award size={16} className="text-emerald-700" />
                        Kết Quả Bài Thi IELTS Reading
                      </span>
                      <span className="text-base font-serif font-bold text-emerald-950 px-2.5 py-0.5 rounded-full bg-emerald-200/80">
                        Band {examResult.bandScore}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 font-sans">
                      Bạn đã hoàn thành chính xác <strong>{examResult.correctCount}/{examResult.totalCount} câu</strong> ({examResult.percentage}%).
                      Hãy xem đối soát lời giải chi tiết của từng câu bên dưới.
                    </p>
                  </div>
                )}

                {/* Render questions list */}
                {activeQuestions.map((q, idx) => {
                  const prevQ = idx > 0 ? activeQuestions[idx - 1] : null;
                  const isNewGroup = !prevQ || prevQ.groupHeader !== q.groupHeader;
                  const passageIdxOfThisQ = findPassageIndexForQuestion(q.number);
                  const prevPassageIdx = prevQ ? findPassageIndexForQuestion(prevQ.number) : -1;
                  const isNewPassageSection = isFullTest && passageIdxOfThisQ !== prevPassageIdx;
                  const qPassage = isFullTest ? allPassages[passageIdxOfThisQ] : currentPassage;
                  const selectedAnswer = userAnswers[q.id] || '';
                  const isAnswered = Boolean(selectedAnswer.trim());
                  const isFlagged = Boolean(flaggedQuestions[q.id]);
                  const isChecked = Boolean(checkedQuestions[q.id]) || isSubmitted;
                  const isCorrect = checkIsCorrect(q, selectedAnswer);

                  return (
                    <div key={q.id} className="space-y-3">
                      {/* Full Test Passage Section Divider */}
                      {isNewPassageSection && qPassage && (
                        <div className="p-4 rounded-2xl bg-[#064E3B] text-amber-300 flex items-center justify-between shadow-xs mb-3">
                          <div className="flex items-center gap-2.5">
                            <BookOpen size={16} className="text-amber-400 shrink-0" />
                            <div>
                              <span className="text-[10px] font-sans tracking-wide text-amber-300 font-bold block">
                                Bài đọc (Passage {passageIdxOfThisQ + 1}/3)
                              </span>
                              <h4 className="text-xs sm:text-sm font-serif font-bold text-white">
                                {qPassage.title}
                              </h4>
                            </div>
                          </div>
                          {activePassageIndex !== passageIdxOfThisQ && (
                            <button
                              type="button"
                              onClick={() => setActivePassageIndex(passageIdxOfThisQ)}
                              className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-sans font-bold transition-all cursor-pointer shrink-0"
                            >
                              Xem bài đọc ➔
                            </button>
                          )}
                        </div>
                      )}
                      {/* Cambridge IELTS Group Instruction Box */}
                      {isNewGroup && q.groupHeader && (
                        <div className="p-4 rounded-2xl bg-[#064E3B]/10 border border-[#064E3B]/20 text-[#064E3B] space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs uppercase tracking-wide px-2 py-0.5 rounded bg-[#064E3B] text-amber-300">
                              {q.groupHeader}
                            </span>
                          </div>
                          <p className="text-xs font-sans text-stone-800 leading-relaxed font-medium">
                            {q.groupInstruction}
                          </p>
                        </div>
                      )}

                      {/* Question Card */}
                      <div
                        id={`question-card-${q.number}`}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 scroll-mt-24 ${
                          isChecked
                            ? isCorrect
                              ? 'bg-emerald-50/40 border-emerald-300'
                              : 'bg-red-50/40 border-red-300'
                            : isAnswered
                            ? 'bg-stone-50/80 border-stone-300'
                            : 'bg-white border-stone-200'
                        }`}
                      >
                        {/* Header: Question Number & Flag for Review */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#064E3B] text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                              {q.number}
                            </span>
                            <span className="text-[11px] font-mono text-stone-500 uppercase font-semibold">
                              {q.type === 'tfng'
                                ? 'True / False / Not Given'
                                : q.type === 'matching_info'
                                ? 'Matching Information (A–F)'
                                : q.type === 'summary_completion'
                                ? 'Summary Completion'
                                : 'Multiple Choice'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleToggleFlag(q.id)}
                              className={`p-1.5 rounded-lg text-xs font-sans flex items-center gap-1 transition-colors cursor-pointer ${
                                isFlagged
                                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                                  : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                              }`}
                              title={isFlagged ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại (Review)'}
                            >
                              <Flag size={13} className={isFlagged ? 'fill-amber-500 text-amber-600' : ''} />
                              <span className="text-[10px] hidden sm:inline">
                                {isFlagged ? 'Đã đánh dấu' : 'Đánh dấu'}
                              </span>
                            </button>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-bold">
                              {q.referenceParagraph}
                            </span>
                          </div>
                        </div>

                        {/* Question Text */}
                        <p className="text-xs sm:text-sm font-sans font-semibold text-stone-900 leading-relaxed">
                          {q.question}
                        </p>

                        {/* INPUT RENDER BASED ON QUESTION TYPE */}

                        {/* 1. TFNG Options */}
                        {q.type === 'tfng' && (
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            {['TRUE', 'FALSE', 'NOT GIVEN'].map((val) => {
                              const isSelected = selectedAnswer === val;
                              const isCorrectOpt = val === q.correctAnswer;

                              let optStyle =
                                'bg-white border-stone-200 text-stone-800 hover:border-stone-300';
                              if (isChecked) {
                                if (isCorrectOpt) {
                                  optStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                                } else if (isSelected && !isCorrect) {
                                  optStyle = 'bg-red-100 text-red-900 border-red-400 line-through';
                                }
                              } else if (isSelected) {
                                optStyle = 'bg-[#064E3B] text-amber-300 border-[#022C22] font-bold shadow-xs';
                              }

                              return (
                                <button
                                  key={val}
                                  type="button"
                                  disabled={isSubmitted}
                                  onClick={() => handleAnswerChange(q.id, val)}
                                  className={`py-2 px-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer text-center ${optStyle}`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 2. Multiple Choice Options */}
                        {q.type === 'multiple_choice' && (
                          <div className="space-y-2 pt-1">
                            {q.options?.map((opt) => {
                              const isSelected = selectedAnswer === opt.label;
                              const isCorrectOpt = opt.label === q.correctAnswer;

                              let optStyle =
                                'bg-white border-stone-200 text-stone-800 hover:border-stone-300';
                              if (isChecked) {
                                if (isCorrectOpt) {
                                  optStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                                } else if (isSelected && !isCorrect) {
                                  optStyle = 'bg-red-100 text-red-900 border-red-400';
                                }
                              } else if (isSelected) {
                                optStyle = 'bg-[#064E3B] text-white border-[#022C22] shadow-xs';
                              }

                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  disabled={isSubmitted}
                                  onClick={() => handleAnswerChange(q.id, opt.label)}
                                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer flex items-start gap-2.5 ${optStyle}`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                                      isSelected && !isChecked
                                        ? 'bg-amber-400 text-stone-900'
                                        : 'bg-stone-100 text-stone-700'
                                    }`}
                                  >
                                    {opt.label}
                                  </span>
                                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. Matching Information to Paragraphs A-F */}
                        {q.type === 'matching_info' && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block">
                              Chọn đoạn văn chứa thông tin (A–F):
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {(qPassage?.paragraphs || currentPassage.paragraphs).map((p) => {
                                const isSelected = selectedAnswer === p.letter;
                                const isCorrectOpt = p.letter === q.correctAnswer;

                                let optStyle =
                                  'bg-white border-stone-200 text-stone-800 hover:border-stone-300';
                                if (isChecked) {
                                  if (isCorrectOpt) {
                                    optStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                                  } else if (isSelected && !isCorrect) {
                                    optStyle = 'bg-red-100 text-red-900 border-red-400';
                                  }
                                } else if (isSelected) {
                                  optStyle = 'bg-[#064E3B] text-amber-300 border-[#022C22] font-bold shadow-xs';
                                }

                                return (
                                  <button
                                    key={p.letter}
                                    type="button"
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswerChange(q.id, p.letter)}
                                    className={`w-9 h-9 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${optStyle}`}
                                  >
                                    {p.letter}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 4. Summary Completion (Fill in the blanks) */}
                        {q.type === 'summary_completion' && (
                          <div className="pt-1 space-y-2">
                            <div className="relative">
                              <input
                                type="text"
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                disabled={isSubmitted}
                                placeholder="Nhập từ chính xác từ bài đọc (ví dụ: carbon emissions)..."
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                                  isChecked
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-400'
                                      : 'bg-red-50 border-red-400'
                                    : 'bg-white border-stone-300'
                                }`}
                              />
                            </div>

                            {isChecked && (
                              <div className="text-xs font-sans">
                                {isCorrect ? (
                                  <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                                    <CheckCircle2 size={14} /> Chính xác! Đáp án chuẩn: {q.correctAnswer}
                                  </span>
                                ) : (
                                  <span className="text-red-700 font-bold inline-flex items-center gap-1">
                                    <XCircle size={14} /> Đáp án đúng trong bài: <u>{q.correctAnswer}</u>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Practice Mode: Instant Check Button */}
                        {testMode === 'practice' && !isChecked && (
                          <div className="pt-1 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => handleCheckPracticeQuestion(q)}
                              disabled={!isAnswered}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer shadow-2xs ${
                                isAnswered
                                  ? 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white'
                                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              }`}
                            >
                              Kiểm Tra Câu Này
                            </button>
                          </div>
                        )}

                        {/* Academic Explanation Box (Shown when checked or exam submitted) */}
                        {isChecked && (
                          <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 space-y-1 mt-2">
                            <span className="font-bold text-amber-900 block font-mono text-[10px] uppercase">
                              Luận Cứ Từ {q.referenceParagraph}:
                            </span>
                            <p className="leading-relaxed font-sans">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* BOTTOM ACTION BAR: Submit Exam Button */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-stone-600">
                    Tiến độ làm bài:{' '}
                    <strong className="text-[#064E3B]">
                      {answeredCount} / {activeQuestions.length}
                    </strong>{' '}
                    câu
                  </div>

                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleSubmitExam}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white font-sans font-bold text-xs uppercase tracking-wide shadow-md shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      <span>Nộp Bài Thi ({answeredCount}/{activeQuestions.length})</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResetExam}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 border border-stone-300"
                    >
                      <RotateCcw size={15} />
                      <span>Làm Lại Bài Thi Này</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: VOCABULARY */}
            {activeTab === 'vocabulary' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Các từ vựng mới được trích lọc từ đề thi. Nhấn <strong>"Lưu vào Deck Anki"</strong> để đưa vào danh sách ôn tập.
                </p>

                {activeTargetWords.map((tw) => {
                  const isSaved = isWordSavedInAnki(tw.word);
                  return (
                    <div
                      key={tw.id}
                      className="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 space-y-3 hover:border-amber-300 transition-colors shadow-2xs"
                    >
                      {/* Word Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold font-sans text-[#064E3B]">
                              {tw.word}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                              {tw.partOfSpeech}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-stone-500 font-ipa">
                            {tw.ipa}
                          </span>
                        </div>

                        <AudioPlayButton text={tw.word} variant="icon" />
                      </div>

                      {/* Meaning */}
                      <div className="space-y-1">
                        <p className="text-xs font-sans font-bold text-stone-900">
                          {tw.definitionVi}
                        </p>
                        <p className="text-xs font-sans text-stone-600 italic">
                          {tw.definitionEn}
                        </p>
                      </div>

                      {/* Collocations */}
                      {tw.collocations.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-mono font-bold uppercase text-stone-400">
                            Collocations:
                          </span>
                          {tw.collocations.map((col, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-mono"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Context Sentence */}
                      <p className="text-xs font-serif italic text-stone-700 border-l-2 border-amber-500 pl-2.5 bg-white py-1.5 rounded-r">
                        "{tw.contextSentence}"
                      </p>

                      {/* Save to Anki Button */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleSaveWordToAnki(tw)}
                          disabled={isSaved}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                            isSaved
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                              : 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white border border-emerald-800 active:scale-95'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <Check size={14} className="text-emerald-700" />
                              <span>Đã lưu vào Deck Anki</span>
                            </>
                          ) : (
                            <>
                              <Bookmark size={14} className="text-amber-400" />
                              <span>Lưu vào Deck Anki</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Exam Result Celebration Modal */}
      {showSubmitModal && examResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAFAF9] rounded-2xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#064E3B] via-[#022C22] to-[#064E3B] text-white p-6 text-center relative border-b-2 border-amber-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mb-3 shadow-inner">
                <Award size={36} className="text-amber-400" />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
                <Sparkles size={14} />
                <span>Hoàn Thành Bài Thi Thật</span>
                <Sparkles size={14} />
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                {isFullTest ? `${sessionConfig?.testTitle || currentPassage.source} (Full Test)` : currentPassage.title}
              </h2>
              <p className="text-xs text-stone-300 font-sans mt-1">
                {isFullTest ? 'Thi Thử Toàn Diện 3 Passages' : currentPassage.source} • Chuẩn đề thi {examResult.totalCount} câu
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Band Score Card */}
              <div className="text-center bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans">
                  Ước Tính Điểm Đạt Được
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-5xl font-serif font-black text-amber-600">
                    Band {examResult.bandScore.toFixed(1)}
                  </span>
                  <span className="text-stone-600 font-sans text-sm font-semibold">/ 9.0</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  (Dựa trên thang điểm tiêu chuẩn IELTS Reading)
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-xl font-bold font-serif text-emerald-800">
                    {examResult.correctCount}/{examResult.totalCount}
                  </div>
                  <div className="text-[11px] font-sans text-stone-600 mt-0.5">Số câu đúng</div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="text-xl font-bold font-serif text-amber-800">
                    {examResult.percentage}%
                  </div>
                  <div className="text-[11px] font-sans text-stone-600 mt-0.5">Độ chính xác</div>
                </div>
              </div>

              {/* Review Guidance Alert */}
              <div className="p-3.5 bg-stone-100/80 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  Đáp án chi tiết và vị trí trong bài đọc đã được mở!
                </p>
                <p>
                  Bạn có thể bấm vào từng câu hỏi để xem đáp án đúng, đọc giải thích chi tiết và tra từ mới.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="w-full py-3 px-4 bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white rounded-xl font-bold font-sans text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <CheckCircle2 size={18} />
                  <span>Đối Soát Lời Giải Chi Tiết</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmitModal(false);
                      handleResetExam();
                    }}
                    className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Làm Lại Đề Này</span>
                  </button>
                  <button
                    type="button"
                    onClick={onBackToLibrary}
                    className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Thư Viện Đề Thi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Selection Popover */}
      {popoverState.visible && (
        <SelectionPopover
          selectedText={popoverState.selectedText}
          contextSentence={popoverState.contextSentence}
          source={currentPassage.source}
          position={popoverState.position}
          onClose={() => setPopoverState((prev) => ({ ...prev, visible: false }))}
          onNotify={onNotify}
        />
      )}
    </div>
  );
};

