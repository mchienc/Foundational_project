import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface TopPromoBannerProps {
  onOpenAuth?: (tab: 'login' | 'register') => void;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ onOpenAuth }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-blue-700 via-indigo-600 to-rose-600 text-white text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 font-medium truncate">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-200">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            Mùa Tuyển Sinh 2026
          </span>
          <span className="truncate">
            Tặng trọn bộ <strong>1,000 Thẻ Flashcard 3D</strong> &amp; <strong>5 lượt chấm IELTS Writing AI</strong> khi tạo tài khoản hôm nay!
          </span>
          {onOpenAuth && (
            <button
              onClick={() => onOpenAuth('register')}
              className="inline-flex items-center gap-1 font-bold underline decoration-amber-300 text-amber-200 hover:text-white transition-colors ml-1 cursor-pointer shrink-0"
            >
              Nhận ngay <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title="Đóng thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
