import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

interface AcademicFooterProps {
  onRequireAuth: (context: string) => void;
}

export const AcademicFooter: React.FC<AcademicFooterProps> = ({ onRequireAuth }) => {
  return (
    <footer className="bg-[#022018] text-stone-300 py-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
        {/* Col 1: Brand Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white p-1 border border-amber-400/40 shadow-xs flex items-center justify-center shrink-0">
              <img src="/logo.jpg" alt="EduFlow Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-lg font-sans font-bold text-white tracking-normal block leading-none">
                EduFlow
              </span>
              <span className="text-[10px] font-sans text-amber-300 tracking-wide mt-1 block">
                Cambridge IELTS &amp; Anki SRS
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Hệ thống tự luyện thi Cambridge IELTS và ghi nhớ từ vựng ngắt quãng Anki 3D.
            Tích hợp trọn bộ 28 đề thi Cambridge 10 - 20, luyện nghe chép chính tả Dictation và bộ thẻ từ vựng thông minh.
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-sans">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Trọn bộ 28 đề thi Cambridge IELTS 10 - 20</span>
          </div>
        </div>

        {/* Col 2: 3 Core Pillars */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Tính Năng Nổi Bật
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li>
              <button
                onClick={() => onRequireAuth('Luyện Đọc Cambridge IELTS 10 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Đọc Cambridge (Cam 10 - 20)
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Luyện Nghe Dictation Từng Câu')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Luyện Nghe Dictation (Chép Chính Tả)
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Thẻ 3D Anki Flashcard')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Thẻ 3D Anki Flashcard (SRS)
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
                onClick={() => onRequireAuth('Cambridge IELTS 18 - 20')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 18 - 20 (Mới Nhất)
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Cambridge IELTS 15 - 17')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 15 - 17
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Cambridge IELTS 13 - 14')}
                className="hover:text-amber-300 transition-colors text-left cursor-pointer"
              >
                Cambridge IELTS 13 - 14
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
              <span>Hotline Hỗ Trợ: 1900 8989 (08:00 - 21:00)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>hotro@eduflow.vn</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Hà Nội, Việt Nam</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Citation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-sans gap-3">
        <p>© 2026 EduFlow. Nền Tảng Luyện Thi Cambridge IELTS &amp; Học Từ Vựng Anki SRS.</p>
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
