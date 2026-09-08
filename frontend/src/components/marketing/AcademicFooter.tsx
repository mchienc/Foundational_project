import { PenTool, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

interface AcademicFooterProps {
  onRequireAuth: (context: string) => void;
}

export const AcademicFooter: React.FC<AcademicFooterProps> = ({ onRequireAuth }) => {
  return (
    <footer id="tuition" className="bg-[#022018] text-stone-300 py-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
        {/* Col 1: Institute Brand Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold shadow-xs">
              <PenTool size={18} />
            </div>
            <div>
              <span className="text-lg font-sans font-bold text-white tracking-normal block leading-none">
                EduFlow Institute
              </span>
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                Viện Công Nghệ Ngôn Ngữ
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Hệ sinh thái học Tiếng Anh tương tác thông minh ứng dụng phương pháp bóc tách âm vị học,
            thuật toán lặp lại ngắt quãng Spaced Repetition và công nghệ EdTech AI chuẩn mực.
          </p>

          <div className="flex items-center gap-2 text-xs text-gold-300/90 font-mono">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Kiểm định phương pháp luận 2026</span>
          </div>
        </div>

        {/* Col 2: 5 Chapters */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            5 Phân Hệ Phương Pháp
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li>
              <button
                onClick={() => onRequireAuth('Chương I: Thẻ Từ Vựng 3D & Spaced Repetition')}
                className="hover:text-gold-300 transition-colors text-left cursor-pointer"
              >
                Chương I: Thẻ Từ Vựng 3D &amp; SRS
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Chương II: Âm Vị & Sóng Âm Waveform AI')}
                className="hover:text-gold-300 transition-colors text-left cursor-pointer"
              >
                Chương II: Âm Vị &amp; Sóng Âm Waveform
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Chương III: Khảo Thí Nghe & Dictation')}
                className="hover:text-gold-300 transition-colors text-left cursor-pointer"
              >
                Chương III: Khảo Thí Nghe &amp; Dictation
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Chương IV: Kiến Trúc Cú Pháp Ngữ Pháp')}
                className="hover:text-gold-300 transition-colors text-left cursor-pointer"
              >
                Chương IV: Kiến Trúc Cú Pháp Trực Quan
              </button>
            </li>
            <li>
              <button
                onClick={() => onRequireAuth('Chương V: Đánh Giá & Hiệu Chỉnh Luận Văn AI')}
                className="hover:text-gold-300 transition-colors text-left cursor-pointer"
              >
                Chương V: Đánh Giá Luận Văn IELTS AI
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Academic Pathways */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Lộ Trình Đào Tạo
          </h4>
          <ul className="space-y-2 font-sans text-stone-400">
            <li>
              <a href="#programs" className="hover:text-gold-300 transition-colors">
                IELTS Academic Sinh Viên &amp; Chuyên Gia
              </a>
            </li>
            <li>
              <a href="#programs" className="hover:text-gold-300 transition-colors">
                Tiếng Anh Học Đường THCS &amp; THPT
              </a>
            </li>
            <li>
              <a href="#programs" className="hover:text-gold-300 transition-colors">
                Luyện Thi Vào 10 Chuyên &amp; THPT QG
              </a>
            </li>
            <li>
              <a href="#programs" className="hover:text-gold-300 transition-colors">
                Khảo Thí &amp; Phản Xạ Âm Vị Cấp Tốc
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Secretariat & Contact */}
        <div className="space-y-3 text-xs">
          <h4 className="font-sans font-bold text-white uppercase tracking-normal text-sm border-b border-forest-800 pb-1.5">
            Ban Thư Ký Học Thuật
          </h4>
          <ul className="space-y-2.5 font-sans text-stone-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Hotline Tư Vấn: 1900 8989 (08:00 - 21:00)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>viennghiencuu@eduflow.vn</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
              <span>Tòa Nhà Viện Hàn Lâm EduFlow, Khu Đô Thị Tri Thức, Hà Nội</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Citation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-mono gap-3">
        <p>© 2026 EduFlow Institute of Language Science. Bảo lưu mọi quyền học thuật.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-gold-300">Quy chuẩn dữ liệu sinh trắc âm</a>
          <span>•</span>
          <a href="#terms" className="hover:text-gold-300">Thỏa ước đầu ra Cambridge</a>
          <span>•</span>
          <a href="#ethics" className="hover:text-gold-300">Đạo đức AI trong giáo dục</a>
        </div>
      </div>
    </footer>
  );
};
