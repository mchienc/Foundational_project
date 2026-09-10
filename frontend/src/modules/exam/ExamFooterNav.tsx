import { useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';

interface ExamFooterNavProps {
  onSelectQuestion: (questionNumber: number) => void;
  activeQuestionNumber?: number | null;
}

export const ExamFooterNav = ({
  onSelectQuestion,
  activeQuestionNumber,
}: ExamFooterNavProps) => {
  const {
    passages,
    activePassageIndex,
    setActivePassage,
    answers,
    flaggedQuestions,
    contrastMode,
  } = useExamStore();

  const paletteScrollRef = useRef<HTMLDivElement>(null);

  const scrollPalette = (direction: 'left' | 'right') => {
    if (paletteScrollRef.current) {
      paletteScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  // Compute all questions across all 3 passages
  const allQuestions = useMemo(() => {
    const list: { number: number; passageIndex: number }[] = [];
    let runningNum = 1;
    passages.forEach((p, pIdx) => {
      (p.questions || []).forEach((q) => {
        const num = q.number >= runningNum ? q.number : runningNum;
        runningNum = num + 1;
        list.push({ number: num, passageIndex: pIdx });
      });
    });

    // If empty passages, fill dummy 1..40
    if (list.length === 0) {
      for (let i = 1; i <= 40; i++) {
        const pIdx = i <= 13 ? 0 : i <= 26 ? 1 : 2;
        list.push({ number: i, passageIndex: pIdx });
      }
    }
    return list;
  }, [passages]);

  // Handle Alt+P (Prev Passage) & Alt+N (Next Passage) shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setActivePassage(Math.max(0, activePassageIndex - 1));
      } else if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        setActivePassage(Math.min(passages.length - 1, activePassageIndex + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePassageIndex, passages.length, setActivePassage]);

  const handleQuestionClick = (qNum: number, pIdx: number) => {
    if (activePassageIndex !== pIdx) {
      setActivePassage(pIdx);
    }
    onSelectQuestion(qNum);

    // Smooth scroll to element in questions panel
    setTimeout(() => {
      const el = document.getElementById(`question-${qNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const footerBg = isHighContrast
    ? 'bg-black border-t-2 border-yellow-400 text-yellow-300'
    : isInverted
    ? 'bg-[#022C22] border-t border-emerald-700 text-slate-100'
    : 'bg-white border-t border-stone-200 text-stone-900 shadow-lg';

  const answeredCount = Object.values(answers).filter((v) => v && v.trim().length > 0).length;

  return (
    <footer
      data-lenis-prevent="true"
      className={`w-full px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 font-sans shrink-0 ${footerBg}`}
    >
      {/* Left: Previous / Next Passage Buttons with Shortcuts */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          disabled={activePassageIndex <= 0}
          onClick={() => setActivePassage(Math.max(0, activePassageIndex - 1))}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isHighContrast
              ? 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'border border-emerald-600 text-emerald-200 hover:bg-emerald-800'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title="Phím tắt: Alt + P"
        >
          <ChevronLeft size={14} />
          <span>Passage trước</span>
          <kbd className="text-[10px] font-mono opacity-60 ml-1 hidden sm:inline">Alt+P</kbd>
        </button>

        <button
          type="button"
          disabled={activePassageIndex >= passages.length - 1}
          onClick={() => setActivePassage(Math.min(passages.length - 1, activePassageIndex + 1))}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isHighContrast
              ? 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'border border-emerald-600 text-emerald-200 hover:bg-emerald-800'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title="Phím tắt: Alt + N"
        >
          <span>Passage sau</span>
          <ChevronRight size={14} />
          <kbd className="text-[10px] font-mono opacity-60 ml-1 hidden sm:inline">Alt+N</kbd>
        </button>
      </div>

      {/* Center: 40 Question Palette with Left/Right Scroll Controls */}
      <div className="flex-1 max-w-4xl flex items-center gap-1 min-w-0">
        <button
          type="button"
          onClick={() => scrollPalette('left')}
          className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
            isHighContrast
              ? 'text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'text-emerald-300 hover:bg-emerald-800'
              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title="Cuộn danh sách câu hỏi sang trái"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={paletteScrollRef}
          data-lenis-prevent="true"
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="flex-1 overflow-x-auto py-1 overscroll-contain"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 justify-start min-w-max px-1">
            {allQuestions.map(({ number, passageIndex }) => {
              const isAnswered = Boolean(answers[number]?.trim());
              const isFlagged = flaggedQuestions.includes(number);
              const isActive = activeQuestionNumber === number;

              return (
                <button
                  key={number}
                  type="button"
                  onClick={() => handleQuestionClick(number, passageIndex)}
                  className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? isHighContrast
                        ? 'ring-2 ring-yellow-400 scale-110'
                        : isInverted
                        ? 'ring-2 ring-emerald-400 scale-110'
                        : 'ring-2 ring-amber-500 scale-110'
                      : ''
                  } ${
                    isAnswered
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black shadow-xs'
                        : isInverted
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-stone-800 text-white shadow-xs'
                      : isHighContrast
                      ? 'border border-yellow-400/40 text-yellow-400/80 hover:bg-yellow-400/10'
                      : isInverted
                      ? 'border border-emerald-700 text-emerald-300 hover:bg-emerald-900'
                      : 'bg-stone-100 border border-stone-300 text-stone-600 hover:bg-stone-200'
                  } ${
                    isFlagged
                      ? 'border-2 border-amber-500 ring-1 ring-amber-400 shadow-xs'
                      : ''
                  }`}
                  title={`Câu ${number} (Passage ${passageIndex + 1}) - ${
                    isAnswered ? 'Đã làm' : 'Chưa làm'
                  }${isFlagged ? ' - Đã đánh dấu Review' : ''}`}
                >
                  <span>{number}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollPalette('right')}
          className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
            isHighContrast
              ? 'text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'text-emerald-300 hover:bg-emerald-800'
              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title="Cuộn danh sách câu hỏi sang phải"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Right: Legend & Progress */}
      <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-stone-800 inline-block" />
            <span className="text-[11px] opacity-75">Đã làm ({answeredCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-stone-200 border border-stone-400 inline-block" />
            <span className="text-[11px] opacity-75">Chưa làm</span>
          </span>
          <span className="flex items-center gap-1">
            <Bookmark size={12} className="text-amber-500" />
            <span className="text-[11px] text-amber-600 font-bold">
              Review ({flaggedQuestions.length})
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};
