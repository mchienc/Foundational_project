import React, { useRef } from 'react';
import { Clock, EyeOff, Eye, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { ListeningSection } from '../../types';
import { useListeningStore } from '../../store/useListeningStore';

interface ListeningFooterNavProps {
  sections: ListeningSection[];
  currentSection: number;
  onScrollToQuestion: (questionNumber: number) => void;
  onSubmit: () => void;
  timeLeft: number; // seconds
  isTimeHidden: boolean;
  onToggleHideTime: () => void;
}

const SECTION_FILLED = [
  'bg-amber-600 text-white border-amber-600',
  'bg-teal-600 text-white border-teal-600',
  'bg-blue-600 text-white border-blue-600',
  'bg-purple-600 text-white border-purple-600',
];

export const ListeningFooterNav: React.FC<ListeningFooterNavProps> = ({
  sections,
  currentSection,
  onScrollToQuestion,
  onSubmit,
  timeLeft,
  isTimeHidden,
  onToggleHideTime,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const userAnswers = useListeningStore((state) => state.userAnswers) || {};
  const reviewFlags = useListeningStore((state) => state.reviewFlags) || new Set();

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getQuestionState = (qId: string, sectionIndex: number) => {
    const isAnswered = !!userAnswers[qId];
    
    if (isAnswered) {
      return SECTION_FILLED[sectionIndex % 4];
    }
    return 'bg-white border-stone-300 text-stone-600 hover:border-stone-400';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#064E3B] text-white shadow-lg border-t border-[#064E3B]/80 font-sans z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-24 flex items-center gap-6">
        {/* Clock Side */}
        <div className="flex flex-col items-center min-w-[120px] bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className={timeLeft < 300 ? 'text-red-400' : 'text-stone-300'} />
            <span className={`font-mono text-xl font-bold ${isTimeHidden ? 'opacity-0' : ''} ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button
            onClick={onToggleHideTime}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white transition-colors"
          >
            {isTimeHidden ? <Eye size={12} /> : <EyeOff size={12} />}
            {isTimeHidden ? 'Show Time' : 'Hide Time'}
          </button>
        </div>

        {/* Scroll Nav */}
        <button onClick={scrollLeft} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex-1 flex overflow-x-auto hide-scrollbar items-center gap-8 py-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section, sIndex) => (
            <div key={section.sectionNumber} className="flex flex-col gap-2 shrink-0">
              <span className={`text-xs uppercase tracking-wider px-1 ${sIndex + 1 === currentSection ? 'text-amber-300 font-bold' : 'text-white/70 font-medium'}`}>
                {section.title}
              </span>
              <div className="flex gap-2">
                {section.questions.map((q) => {
                  const isFlagged = reviewFlags.has ? reviewFlags.has(q.id) : false;
                  return (
                    <button
                      key={q.id}
                      onClick={() => onScrollToQuestion(q.number)}
                      className={`relative w-10 h-10 flex items-center justify-center rounded-lg border-2 font-medium text-sm transition-all ${getQuestionState(q.id, sIndex)}`}
                    >
                      {q.number}
                      {isFlagged && (
                        <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 shadow-sm">
                          <Bookmark size={10} className="text-white" fill="currentColor" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
          <ChevronRight size={24} />
        </button>

        {/* Submit */}
        <div className="pl-4 border-l border-white/20">
          <button
            onClick={onSubmit}
            className="px-6 py-3 bg-[#D97706] hover:bg-[#D97706]/90 text-white font-medium rounded-xl transition-colors whitespace-nowrap active:scale-95"
          >
            Submit Test
          </button>
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
