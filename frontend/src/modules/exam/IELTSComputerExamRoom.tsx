import { useState, useEffect, useRef } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { GripVertical, Loader2, BookOpen } from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';
import { CambridgeReadingPassage } from '../../types';
import { getReadingPassageById } from '../../services/cambridgeApi';
import { useSmoothScroll } from '../../context/SmoothScrollProvider';
import { ExamTopbar } from './ExamTopbar';
import { ExamReadingPanel } from './ExamReadingPanel';
import { ExamQuestionsPanel } from './ExamQuestionsPanel';
import { ExamFooterNav } from './ExamFooterNav';
import { ExamResultModal } from './ExamResultModal';

interface IELTSComputerExamRoomProps {
  passages: CambridgeReadingPassage[];
  testTitle: string;
  customTestId?: string;
  onExit: () => void;
  onNavigateMistakeVault: () => void;
}

export const IELTSComputerExamRoom = ({
  passages,
  testTitle,
  customTestId,
  onExit,
  onNavigateMistakeVault,
}: IELTSComputerExamRoomProps) => {
  const {
    initExam,
    tickTimer,
    submitExam,
    isSubmitted,
    examResult,
    contrastMode,
  } = useExamStore();

  const { stop: stopLenis, start: startLenis } = useSmoothScroll();

  // Temporarily pause Lenis on global window so internal panels scroll natively without interference
  useEffect(() => {
    stopLenis();
    return () => {
      startLenis();
    };
  }, [stopLenis, startLenis]);

  const [isLoadingPassages, setIsLoadingPassages] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize store on mount or test change with full passage details from MySQL
  useEffect(() => {
    let isMounted = true;
    const needsFetch = passages.some(
      (p) => !p.paragraphs || p.paragraphs.length === 0 || !p.questions || p.questions.length === 0 || !p.questions[0]?.question
    );

    if (needsFetch) {
      setIsLoadingPassages(true);
      Promise.all(passages.map((p) => getReadingPassageById(p.id)))
        .then((fullPassages) => {
          if (!isMounted) return;
          // Normalize question numbering across passages if needed
          let runningNum = 1;
          const normalized = fullPassages.map((p) => {
            const questions = (p.questions || []).map((q) => {
              const num = q.number >= runningNum ? q.number : runningNum;
              runningNum = num + 1;
              return { ...q, number: num };
            });
            return { ...p, questions };
          });
          initExam(testTitle, normalized, customTestId);
          setIsLoadingPassages(false);
        })
        .catch((err) => {
          console.error('Lỗi khi tải chi tiết bài thi từ CSDL:', err);
          if (!isMounted) return;
          initExam(testTitle, passages, customTestId);
          setIsLoadingPassages(false);
        });
    } else {
      initExam(testTitle, passages, customTestId);
      setIsLoadingPassages(false);
    }

    return () => {
      isMounted = false;
    };
  }, [testTitle, passages, customTestId, initExam]);

  // Run 1-second interval timer
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickTimer]);

  // When exam is submitted, display the modal
  useEffect(() => {
    if (isSubmitted && examResult) {
      setShowResultModal(true);
    }
  }, [isSubmitted, examResult]);

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFinish = () => {
    submitExam();
    setShowResultModal(true);
  };

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const containerTheme = isHighContrast
    ? 'bg-black text-yellow-300'
    : isInverted
    ? 'bg-[#022C22] text-slate-100'
    : 'bg-[#FAFAF9] text-stone-900';

  const handleBarClass = isHighContrast
    ? 'bg-stone-800 hover:bg-yellow-400 text-yellow-400 hover:text-black transition-colors'
    : isInverted
    ? 'bg-[#03372b] hover:bg-emerald-600 text-emerald-300 transition-colors'
    : 'bg-stone-200 hover:bg-[#064E3B] text-stone-400 hover:text-white transition-colors';

  if (isLoadingPassages) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center font-sans ${containerTheme}`}>
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-2xl max-w-md w-full text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#064E3B] text-amber-300 flex items-center justify-center shadow-lg">
            <BookOpen size={30} className="animate-pulse text-amber-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-[#064E3B]">
              Đang Chuẩn Bị Phòng Thi
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Đang nạp toàn bộ bài đọc, câu hỏi và lời giải chi tiết cho bộ đề <strong>{testTitle}</strong> từ CSDL Cambridge IELTS...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-500 pt-2 border-t border-stone-100">
            <Loader2 size={15} className="animate-spin text-amber-600" />
            <span>Đang đối soát dữ liệu 3 Passages (40 câu)...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      className={`fixed inset-0 z-50 flex flex-col w-screen h-screen overflow-hidden ${containerTheme}`}
    >
      {/* 1. Topbar with Timer, Contrast Mode, Exit, Finish */}
      <ExamTopbar
        onExit={onExit}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onFinishConfirm={handleFinish}
      />

      {/* 2. Split Screen: Reading Panel (Left) & Questions Panel (Right) */}
      <main data-lenis-prevent="true" className="flex-1 w-full min-h-0 overflow-hidden relative">
        <Group orientation="horizontal" id="ielts-computer-split-ratio" className="h-full w-full flex min-h-0">
          {/* Left Panel: Reading Passage */}
          <Panel defaultSize="50%" minSize="25%" className="h-full min-h-0 overflow-hidden flex flex-col">
            <ExamReadingPanel />
          </Panel>

          {/* Resize Handle */}
          <Separator className={`w-2 sm:w-2.5 flex items-center justify-center cursor-col-resize select-none ${handleBarClass}`}>
            <GripVertical size={12} className="opacity-70" />
          </Separator>

          {/* Right Panel: Questions */}
          <Panel defaultSize="50%" minSize="25%" className="h-full min-h-0 overflow-hidden flex flex-col">
            <ExamQuestionsPanel focusedQuestionNumber={activeQuestionNumber} />
          </Panel>
        </Group>
      </main>

      {/* 3. Footer Navigation: 40 Questions Palette & Shortcuts */}
      <ExamFooterNav
        onSelectQuestion={(qNum) => setActiveQuestionNumber(qNum)}
        activeQuestionNumber={activeQuestionNumber}
      />

      {/* 4. Result Modal */}
      {showResultModal && examResult && (
        <ExamResultModal
          result={examResult}
          onNavigateMistakeVault={() => {
            setShowResultModal(false);
            if (document.fullscreenElement) {
              document.exitFullscreen?.().catch(() => {});
            }
            onNavigateMistakeVault();
          }}
          onReviewTest={() => setShowResultModal(false)}
          onBackToLibrary={() => {
            setShowResultModal(false);
            if (document.fullscreenElement) {
              document.exitFullscreen?.().catch(() => {});
            }
            onExit();
          }}
        />
      )}
    </div>
  );
};
