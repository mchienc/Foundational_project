import React from 'react';
import { TopPromoBanner } from './TopPromoBanner';
import { PublicNavbar } from './PublicNavbar';
import { MarketingHeroDOL } from './MarketingHeroDOL';
import { ProgramSelector } from './ProgramSelector';
import { FeaturePreviews } from './FeaturePreviews';
import { User, Screen } from '../../types';
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  GraduationCap,
  Star,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

interface PublicLandingPageProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register', contextTitle?: string) => void;
  onRequireAuth: (featureName: string) => void;
  onNavigateScreen: (screen: Screen) => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  currentUser,
  onOpenAuth,
  onRequireAuth,
  onNavigateScreen,
}) => {
  const testimonials = [
    {
      name: 'Đặng Minh Chiến',
      role: 'Sinh viên ĐH Bách Khoa • IELTS 7.5',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content:
        'Tính năng Flashcard 3D và phòng thu âm AI của EduFlow đã giúp mình sửa triệt để các âm đuôi và trọng âm. Sau 3 tháng kiên trì rèn luyện, điểm Speaking của mình từ 6.0 lên thẳng 7.5.',
      score: '7.5 Speaking',
      tag: 'IELTS Academic',
    },
    {
      name: 'Nguyễn Phương Thảo',
      role: 'Du học sinh Úc • IELTS 8.5',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      content:
        'Bộ đề thi thử Cambridge và phòng luyện đọc giúp mình làm quen với áp lực phòng thi. Hệ thống chấm Writing AI phân tích rất sát sao ngữ pháp và từ vựng.',
      score: '8.5 Overall',
      tag: 'Du Học Sinh',
    },
    {
      name: 'Lê Quốc Bảo',
      role: 'Thủ khoa khối D1 THPT Chuyên • 9.8đ Tiếng Anh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      content:
        'Phần Ghép câu ngữ pháp trực quan và bài tập Dictation chép chính tả giúp em phản xạ đề thi trắc nghiệm không còn bị bẫy ngữ pháp. Rất khuyến khích các bạn chuẩn bị thi vào 10 và thi tốt nghiệp.',
      score: '9.8đ Tốt Nghiệp',
      tag: 'Tiếng Anh Học Đường',
    },
  ];

  const handleExplorePrograms = () => {
    const el = document.getElementById('programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-primary selection:text-white">
      {/* 1. Top Promotion / Admissions Banner */}
      <TopPromoBanner onOpenAuth={() => onOpenAuth('register', 'Ưu đãi tuyển sinh 40%')} />

      {/* 2. Public Brand Navbar */}
      <PublicNavbar
        currentUser={currentUser}
        onOpenAuth={onOpenAuth}
        onNavigateScreen={onNavigateScreen}
      />

      <main className="flex-1">
        {/* 3. Hero Section DOL Inspired */}
        <MarketingHeroDOL
          onOpenAuth={onOpenAuth}
          onExplorePrograms={handleExplorePrograms}
        />

        {/* 4. Methodology Section: Linearthinking & Spaced Repetition (DOL English Approach) */}
        <section id="methodology" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          {/* Background subtle glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-blue-400" />
                Hệ Phương Pháp Độc Quyền
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Phương Pháp{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  Linearthinking & EdTech AI
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Khác biệt hoàn toàn với phương pháp học truyền thống. EduFlow kết hợp tư duy logic toán học
                cùng thuật toán Spaced Repetition giúp rút ngắn 1/2 thời gian tiếp thu.
              </p>
            </div>

            {/* Comparison Grid: Old vs New Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Traditional method */}
              <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <XCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Cách Học Cũ Thụ Động</h3>
                    <p className="text-xs text-slate-400">Dễ nản lòng, tốn thời gian nhưng kém phản xạ</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Học thuộc lòng từ vựng rời rạc, không nhớ được ngữ cảnh và quên ngay sau 3 ngày.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Tư duy dịch từng từ (Word-by-word) từ tiếng Việt sang tiếng Anh khiến phản xạ nói ngập ngừng.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Luyện nghe thụ động mở loa nghe lướt qua, không nhận diện được nuốt âm và nối âm thực tế.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Viết bài theo cảm tính, phụ thuộc vào thầy cô chấm sửa thủ công mất 3-7 ngày mới có kết quả.</span>
                  </li>
                </ul>
              </div>

              {/* EduFlow Linearthinking & AI method */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-500/40 shadow-xl shadow-blue-500/10 space-y-6 relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      Linearthinking &amp; AI EduFlow
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase font-black">
                        Chuẩn Mới
                      </span>
                    </h3>
                    <p className="text-xs text-blue-200/80">Tư duy logic cấu trúc, phản xạ tức thời</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-blue-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Spaced Repetition &amp; Flashcard 3D:</strong> Thuật toán lặp lại ngắt quãng giúp ghi nhớ từ vựng bền vững lâu dài.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Grammar Architecture:</strong> Kéo thả token lắp ghép câu trực quan, loại bỏ dịch word-by-word.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>AI Phoneme Waveform:</strong> So sánh biểu đồ sóng âm thời gian thực, bóc tách từng âm vị IPA.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Academic Writing Evaluator:</strong> Chấm 4 tiêu chí IELTS Band Descriptors và gợi ý nâng cấp câu trong 3 giây.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Programs Section */}
        <ProgramSelector onOpenAuth={onOpenAuth} />

        {/* 6. Feature Previews Section with Locked Badges */}
        <FeaturePreviews onRequireAuth={onRequireAuth} />

        {/* 7. Student Testimonials & Social Proof */}
        <section id="reviews" className="py-20 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Được Tin Chọn Bởi Hơn 4,000+ Học Viên
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Cảm Nhận Thực Tế Từ{' '}
                <span className="bg-gradient-to-r from-brand-navy to-brand-primary bg-clip-text text-transparent">
                  Cộng Đồng Học Viên
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Những chia sẻ chân thực từ học sinh, sinh viên và người đi làm đã bứt phá điểm số cùng EduFlow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary text-[10px] font-black uppercase tracking-wide border border-blue-100">
                        {t.score}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-primary/20 shadow-xs"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{t.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Call To Action Ribbon */}
        <section className="py-16 bg-gradient-to-r from-brand-navy via-brand-primary to-blue-600 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider text-blue-100">
              Bắt Đầu Ngay Hôm Nay
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Sẵn Sàng Làm Chủ Tiếng Anh Cùng EduFlow?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto font-normal">
              Đăng ký tài khoản miễn phí chỉ trong 30 giây để trải nghiệm trọn bộ không gian học tập tương tác Cambridge, Anki và AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-brand-navy hover:bg-slate-100 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-black/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Tạo Tài Khoản Miễn Phí</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-900/50 hover:bg-blue-900/80 border border-white/30 text-white text-xs sm:text-sm font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
              >
                Đã Có Tài Khoản? Đăng Nhập
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Marketing Footer */}
      <footer id="about" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                <GraduationCap size={20} />
              </div>
              <span className="text-lg font-black text-white tracking-tight">EduFlow</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ sinh thái học Tiếng Anh tương tác thông minh ứng dụng phương pháp Linearthinking
              và công nghệ Trí tuệ nhân tạo (EdTech AI).
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Chứng nhận kiểm định chất lượng đào tạo</span>
            </div>
          </div>

          {/* Col 2: Training Programs */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Chương Trình Đào Tạo</h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-white transition-colors">IELTS Sinh Viên &amp; Người Đi Làm</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Tiếng Anh Học Đường Lớp 6 - 12</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Luyện Thi Vào 10 Chuyên &amp; THPT QG</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Giao Tiếp Phản Xạ Cấp Tốc</a></li>
            </ul>
          </div>

          {/* Col 3: 5 AI Studios */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">5 Phân Hệ AI</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onRequireAuth('Thẻ Từ Vựng 3D')} className="hover:text-white transition-colors text-left cursor-pointer">Thẻ Từ Vựng 3D Leitner SRS</button></li>
              <li><button onClick={() => onRequireAuth('Phòng Thu Âm AI')} className="hover:text-white transition-colors text-left cursor-pointer">Phòng Thu Phát Âm Sóng Waveform</button></li>
              <li><button onClick={() => onRequireAuth('Luyện Nghe Dictation')} className="hover:text-white transition-colors text-left cursor-pointer">Luyện Nghe Dictation &amp; A-B Loop</button></li>
              <li><button onClick={() => onRequireAuth('Ghép Câu Ngữ Pháp')} className="hover:text-white transition-colors text-left cursor-pointer">Ghép Câu Ngữ Pháp Kiến Tạo</button></li>
              <li><button onClick={() => onRequireAuth('Chấm Viết Luận AI')} className="hover:text-white transition-colors text-left cursor-pointer">Chấm Viết Luận Academic IELTS</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Liên Hệ &amp; Hỗ Trợ</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Hotline: 1900 8989 (08:00 - 21:00)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>support@eduflow.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Cơ sở chính: Tầng 6, EduFlow Tech Hub, Hà Nội</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 EduFlow EdTech AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-slate-400">Điều khoản sử dụng</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-400">Chính sách bảo mật</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-400">Cam kết đầu ra</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
