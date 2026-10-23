import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Screen, User } from '../../types';
import { Logo } from '../common/Logo';

interface AcademicFooterProps {
  currentUser?: User | null;
  onRequireAuth: (context: string) => void;
  onNavigateScreen?: (screen: Screen) => void;
}

export const AcademicFooter: React.FC<AcademicFooterProps> = ({ currentUser, onRequireAuth, onNavigateScreen }) => {
  const handleNav = (screen: Screen, fallbackContext: string) => {
    if (currentUser && onNavigateScreen) {
      onNavigateScreen(screen);
    } else {
      onRequireAuth(fallbackContext);
    }
  };

  return (
    <footer className="bg-[#022018] text-stone-300 py-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
        {/* Col 1: Brand Identity */}
        <div className="space-y-4">
          <Logo variant="full" theme="dark" showBadge={false} />

          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Luyện thi IELTS thực chiến: 28 Đề thi Cam 10–20, chép chính tả video YouTube và học từ vựng Flashcard Anki.
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-sans">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>28 Đề Cambridge • 84 Bài Đọc • 7 Đề Nghe Full Test</span>
          </div>
        </div>

        {/* Col 2: Core Practice Modules */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Phần Luyện Tập
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li>
              <button
                onClick={() => handleNav('reading', 'Luyện Đọc Reading Cam 10 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Đọc Reading (Cam 10–20)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('listening-exam', 'Luyện Nghe Listening Cam 13 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Nghe Listening (Cam 13–20)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('dictation', 'Chép chính tả video YouTube')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <span>Chép chính tả YouTube</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-mono text-[9px] font-bold">
                  MỚI
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('anki', 'Học từ vựng Flashcard Anki')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Học từ vựng Flashcard Anki
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Cambridge IELTS Collection */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Bộ Đề Cambridge
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li>
              <button
                onClick={() => handleNav('reading', 'Cambridge IELTS 18 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 18–20 (Mới Nhất)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('reading', 'Cambridge IELTS 15 - 17')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 15–17
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('reading', 'Cambridge IELTS 13 - 14')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 13–14
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('reading', 'Cambridge IELTS 10 - 12')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 10–12
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Contact */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Hỗ Trợ Học Viên
          </h4>
          <ul className="space-y-2.5 font-sans text-stone-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Hotline / Zalo: 0976 294 907 (08:00 - 21:00)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>dangchien2005@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Hà Nội, Việt Nam</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-sans gap-3">
        <p>© 2026 EduFlow. Nền tảng luyện thi IELTS &amp; Học từ vựng Flashcard.</p>
        <div className="flex items-center gap-4">
          <span>Học trực tuyến miễn phí</span>
          <span>•</span>
          <span>Đề thi chuẩn Cambridge</span>
          <span>•</span>
          <span>Hỗ trợ 24/7</span>
        </div>
      </div>
    </footer>
  );
};
