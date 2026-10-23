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
          <Logo variant="full" theme="dark" showBadge={false} wrapSlogan={true} />

          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Luyện thi IELTS thực chiến: 28 Đề thi Cam 10–20, 4 kỹ năng toàn diện, chép chính tả video YouTube và học từ vựng Flashcard Anki.
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-sans">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>28 Đề Cambridge • 4 Kỹ Năng • Chép Chính Tả Video</span>
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
                onClick={() => handleNav('listening', 'Luyện Nghe Listening Cam 13 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Nghe Listening (Cam 13–20)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('writing', 'Luyện Viết IELTS Writing Task 1')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Viết Writing Task 1
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('speaking', 'Luyện Nói IELTS Speaking Mock Room')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Nói Speaking Mock Test
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('dictation', 'Chép chính tả video YouTube')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <span>Chép chính tả YouTube</span>
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
                onClick={() => handleNav('reading', 'Cambridge IELTS 10 - 14')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 10–14
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('dictation', 'Video Ted & BBC')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Chép Chính Tả Video Chọn Lọc
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform & Methodology */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Phương Pháp Học
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li className="leading-relaxed">
              <strong className="text-stone-300">Luyện thi thực chiến:</strong> Thi trực tiếp trên máy tính với đồng hồ bấm giờ chuẩn kỳ thi IELTS thật.
            </li>
            <li className="leading-relaxed">
              <strong className="text-stone-300">Tra từ &amp; Lưu nhanh:</strong> Bấm vào bất kỳ từ mới nào trong bài đọc để xem nghĩa và lưu vào Flashcard.
            </li>
            <li className="leading-relaxed">
              <strong className="text-stone-300">Lặp lại ngắt quãng:</strong> Ôn tập theo thuật toán khoa học giúp từ vựng ghi sâu vào trí nhớ dài hạn.
            </li>
          </ul>

          <div className="pt-2 text-stone-400 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Hà Nội, Việt Nam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href="mailto:dangchien2005@gmail.com" className="hover:text-amber-300 transition-colors">
                dangchien2005@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Hỗ trợ học viên: 0912 345 678</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
        <p className="font-sans">
          © {new Date().getFullYear()} eng4u. Nền tảng luyện thi Cambridge IELTS &amp; Học từ vựng Flashcard.
        </p>
        <p className="text-[11px] font-sans text-stone-400">
          Thiết kế theo chuẩn học thuật Cambridge • Tối ưu hóa trải nghiệm học viên
        </p>
      </div>
    </footer>
  );
};
