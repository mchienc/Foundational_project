import React, { useState } from 'react';
import { ArrowRight, X, BookOpen } from 'lucide-react';

interface AcademicRibbonProps {
  currentUser?: import('../../types').User | null;
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onNavigateScreen?: (screen: import('../../types').Screen) => void;
}

export const AcademicRibbon: React.FC<AcademicRibbonProps> = ({ currentUser, onOpenAuth, onNavigateScreen }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Thông báo mới" className="relative z-50 bg-[#022018] text-stone-200 border-b border-emerald-900/60 px-4 py-2 text-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Center bulletin */}
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-sans uppercase font-bold tracking-wider">
            <BookOpen className="w-3 h-3 text-amber-300" />
            Mới Cập Nhật
          </span>

          <span className="font-sans text-stone-200 hidden sm:inline">
            "Luyện đề Cambridge IELTS 10–20 • Chép chính tả YouTube • Học từ vựng Flashcard Anki"
          </span>

          <span className="text-stone-400 hidden md:inline">•</span>

          <button
            onClick={() => {
              if (currentUser && onNavigateScreen) {
                onNavigateScreen('dictation');
              } else {
                onOpenAuth('login', 'Đăng nhập để chép chính tả YouTube');
              }
            }}
            className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold underline underline-offset-4 decoration-amber-500/50 hover:decoration-amber-400 transition-colors cursor-pointer"
          >
            <span>Trải nghiệm chép chính tả YouTube miễn phí</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-stone-100 p-1 rounded-md hover:bg-forest-900 transition-colors shrink-0 cursor-pointer"
          title="Thu gọn thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
