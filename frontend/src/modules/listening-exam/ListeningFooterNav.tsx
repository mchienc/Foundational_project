import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { ListeningSection, ContrastMode } from '../../types';
import { useListeningStore } from '../../store/useListeningStore';

interface ListeningFooterNavProps {
  sections: ListeningSection[];
  currentSection: number;
  activeQuestionNumber?: number | null;
  onSelectSection: (sectionNumber: number) => void;
  onScrollToQuestion: (questionNumber: number, sectionNumber: number) => void;
  contrastMode?: ContrastMode;
}

export const ListeningFooterNav: React.FC<ListeningFooterNavProps> = ({
  sections,
  currentSection,
  activeQuestionNumber,
  onSelectSection,
  onScrollToQuestion,
  contrastMode = 'standard',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const userAnswers = useListeningStore((state) => state.userAnswers) || {};
  const reviewFlags = useListeningStore((state) => state.reviewFlags) || new Set();

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current && e.deltaY !== 0) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const scrollPalette = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -240 : 240,
        behavior: 'smooth',
      });
    }
  };

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const footerBg = isHighContrast
    ? 'bg-black border-t-2 border-yellow-400 text-yellow-300'
    : isInverted
    ? 'bg-[#022C22] border-t border-emerald-700 text-slate-100'
    : 'bg-white border-t border-stone-200 text-stone-900 shadow-lg';

  const totalAnswered = Object.values(userAnswers).filter((v) => v && v.trim().length > 0).length;
  const totalFlagged = reviewFlags.size || 0;

  return (
    <footer
      data-lenis-prevent="true"
      className={`w-full px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 font-sans shrink-0 z-30 transition-colors ${footerBg}`}
    >
      {/* Left: Previous / Next Part Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          disabled={currentSection <= 1}
          onClick={() => onSelectSection(Math.max(1, currentSection - 1))}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isHighContrast
              ? 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'border border-emerald-600 text-emerald-200 hover:bg-emerald-800'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <ChevronLeft size={14} />
          <span>Part trước</span>
        </button>

        <button
          type="button"
          disabled={currentSection >= 4}
          onClick={() => onSelectSection(Math.min(4, currentSection + 1))}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isHighContrast
              ? 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
              : isInverted
              ? 'border border-emerald-600 text-emerald-200 hover:bg-emerald-800'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <span>Part sau</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Center: 40 Questions Grouped by Part 1 - 4 */}
      <div className="flex-1 max-w-5xl flex items-center gap-1 min-w-0">
        <button
          type="button"
          onClick={() => scrollPalette('left')}
          className="p-1.5 rounded-lg shrink-0 text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex-1 overflow-x-auto py-1 overscroll-contain"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center gap-4 min-w-max px-1">
            {sections.map((section) => {
              const isCurrentPart = section.sectionNumber === currentSection;
              return (
                <div
                  key={section.sectionNumber}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all ${
                    isCurrentPart
                      ? isHighContrast
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : isInverted
                        ? 'border-emerald-500 bg-emerald-900/50'
                        : 'border-[#064E3B]/40 bg-emerald-50/50'
                      : 'border-transparent'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectSection(section.sectionNumber)}
                    className={`text-[11px] font-mono font-bold uppercase mr-1 cursor-pointer ${
                      isCurrentPart
                        ? isHighContrast
                          ? 'text-yellow-400'
                          : isInverted
                          ? 'text-amber-300'
                          : 'text-[#064E3B]'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    P{section.sectionNumber}
                  </button>

                  {section.questions.map((q) => {
                    const isAnswered = Boolean(userAnswers[q.id]?.trim());
                    const isFlagged = reviewFlags.has ? reviewFlags.has(q.id) : false;
                    const isActive = activeQuestionNumber === q.number;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => onScrollToQuestion(q.number, section.sectionNumber)}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isActive ? 'ring-2 ring-amber-500 scale-110 z-10' : ''
                        } ${
                          isAnswered
                            ? isHighContrast
                              ? 'bg-yellow-400 text-black'
                              : isInverted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#064E3B] text-white'
                            : isHighContrast
                            ? 'border border-yellow-400/40 text-yellow-400/80'
                            : isInverted
                            ? 'border border-emerald-700 text-emerald-300'
                            : 'bg-stone-100 border border-stone-300 text-stone-600 hover:bg-stone-200'
                        } ${isFlagged ? 'border-2 border-amber-500 ring-1 ring-amber-400' : ''}`}
                        title={`Câu ${q.number} (Part ${section.sectionNumber})`}
                      >
                        {q.number}
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollPalette('right')}
          className="p-1.5 rounded-lg shrink-0 text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Right: Summary Status */}
      <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#064E3B] inline-block" />
          <span className="text-[11px] opacity-80">Đã làm ({totalAnswered}/40)</span>
        </span>
        <span className="flex items-center gap-1">
          <Bookmark size={12} className="text-amber-500" />
          <span className="text-[11px] text-amber-600 font-bold">Review ({totalFlagged})</span>
        </span>
      </div>
    </footer>
  );
};
