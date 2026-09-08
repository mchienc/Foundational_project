import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  GraduationCap,
  Flame,
  ChevronRight,
} from 'lucide-react';

interface ProgramSelectorProps {
  onOpenAuth: (tab: 'login' | 'register', programTitle?: string) => void;
}

export const ProgramSelector: React.FC<ProgramSelectorProps> = ({ onOpenAuth }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ielts' | 'school' | 'comm'>('all');

  const programs = [
    {
      id: 'ielts',
      category: 'ielts',
      badge: 'Lộ Trình Phổ Biến Nhất',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      isPopular: true,
      title: 'IELTS Sinh Viên & Người Đi Làm',
      target: 'Mục tiêu: 6.5 - 8.0+ IELTS Academic',
      headline: 'Đột phá tư duy Linearthinking, cá nhân hóa sửa lỗi phát âm và luận văn bằng AI',
      duration: '3 - 6 tháng (Theo năng lực test đầu vào)',
      level: 'Sinh viên năm 1-4, người đi làm cần chứng chỉ quốc tế',
      features: [
        'Khắc phục triệt để thói quen dịch word-by-word tiếng Việt',
        'Phòng thu AI chấm phát âm chuẩn âm vị IPA từng âm tiết',
        'Chấm viết luận Task 1 & Task 2 chuẩn IELTS Band Descriptors',
        'Kho 1,200+ từ vựng học thuật Spaced Repetition chuẩn Oxford',
        'Cam kết chuẩn đầu ra 6.5 - 7.5+ bằng hợp đồng đào tạo',
      ],
      ctaText: 'Đăng Ký Lộ Trình 6.5 - 8.0+',
      accentColor: 'from-blue-600 to-indigo-700',
      tag: 'IELTS Chuyên Sâu',
    },
    {
      id: 'school',
      category: 'school',
      badge: 'Bứt Phá Điểm Số',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      isPopular: false,
      title: 'Tiếng Anh Học Đường THCS & THPT',
      target: 'Mục tiêu: 9.0+ Thi Vào 10 Chuyên & Tốt Nghiệp THPT',
      headline: 'Xây dựng móng ngữ pháp kiến tạo, giải mã đề thi thử của các trường chuyên top đầu',
      duration: 'Toàn diện theo năm học / Cấp tốc trước thi',
      level: 'Học sinh THCS & THPT lớp 6 đến lớp 12',
      features: [
        'Cây ngữ pháp kiến tạo kéo thả trực quan qua Sentence Builder',
        'Bám sát chuẩn chương trình SGK mới Global Success & Chuyên',
        'Luyện nghe A-B loop và chép chính tả Dictation không bỏ sót từ',
        'Ngân hàng đề thi thử bấm giờ, phân tích câu sai tự động',
        'Hỗ trợ hỏi đáp 1-1 với đội ngũ trợ giảng đạt IELTS 8.0+',
      ],
      ctaText: 'Khám Phá Lộ Trình Học Đường',
      accentColor: 'from-emerald-600 to-teal-700',
      tag: 'Học Đường 9.0+',
    },
    {
      id: 'comm',
      category: 'comm',
      badge: 'Cấp Tốc Thực Chiến',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      isPopular: false,
      title: 'Luyện Thi & Phản Xạ Giao Tiếp Cấp Tốc',
      target: 'Mục tiêu: Bứt Phá Phản Xạ Tự Nhiên Trong 60 Ngày',
      headline: 'Chuẩn hóa ngữ điệu, làm chủ nhịp điệu Stress & Intonation để tự tin phỏng vấn quốc tế',
      duration: '8 - 12 tuần (Cường độ cao)',
      level: 'Người mất gốc, chuẩn bị đi du học hoặc phỏng vấn việc làm',
      features: [
        'Sửa âm giọng, nối âm, nuốt âm qua biểu đồ sóng âm Waveform',
        'Mô phỏng 50+ kịch bản đối thoại môi trường công sở & du lịch',
        'Luyện nghe đa giọng điệu: Anh - Mỹ - Úc với tốc độ biến thiên',
        'Thẻ từ vựng flashcard kích hoạt phản xạ câu tức thì',
        'Thực hành ghi âm mỗi ngày, nhận báo cáo tiến độ chi tiết',
      ],
      ctaText: 'Đăng Ký Khóa Phản Xạ Cấp Tốc',
      accentColor: 'from-purple-600 to-pink-600',
      tag: 'Giao Tiếp Cấp Tốc',
    },
  ];

  const filteredPrograms =
    activeCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <section id="programs" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      {/* Background Decor Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-primary text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-brand-primary" />
            Lộ Trình Đào Tạo Chuẩn Quốc Tế
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Chọn Lộ Trình Đột Phá Phù Hợp Với{' '}
            <span className="bg-gradient-to-r from-brand-navy via-brand-primary to-blue-600 bg-clip-text text-transparent">
              Mục Tiêu Của Bạn
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Hệ sinh thái EdTech AI của EduFlow thiết kế riêng biệt cho từng đối tượng học viên,
            tập trung vào thực hành tương tác trực tiếp và cam kết chuẩn đầu ra.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'Tất Cả Lộ Trình' },
              { id: 'ielts', label: '🎯 IELTS Sinh Viên & Người Đi Làm' },
              { id: 'school', label: '🏫 Học Đường THCS & THPT' },
              { id: 'comm', label: '⚡ Giao Tiếp & Phản Xạ Cấp Tốc' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-brand-navy text-white shadow-md shadow-blue-900/20 scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className={`relative flex flex-col rounded-3xl bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                prog.isPopular
                  ? 'border-brand-primary/40 ring-2 ring-blue-500/20 shadow-lg'
                  : 'border-slate-200/90 shadow-xs'
              }`}
            >
              {/* Popularity Ribbon */}
              {prog.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  Được Chọn Nhiều Nhất
                </div>
              )}

              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                {/* Header Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border ${prog.badgeColor}`}
                    >
                      {prog.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {prog.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {prog.title}
                  </h3>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs font-bold">
                    <Target className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{prog.target}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                    {prog.headline}
                  </p>
                </div>

                {/* Duration & Target Audience Pills */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">Thời lượng:</span>
                    <span>{prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">Đối tượng:</span>
                    <span className="truncate">{prog.level}</span>
                  </div>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Quyền lợi không gian học tập:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {prog.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onOpenAuth('register', prog.title)}
                    className={`w-full py-3.5 px-5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98 ${
                      prog.isPopular
                        ? 'bg-gradient-to-r from-brand-navy to-brand-primary hover:from-blue-900 hover:to-indigo-700 text-white shadow-blue-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                    }`}
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Tư vấn miễn phí & Kiểm tra trình độ 15 phút
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Cam Kết Đào Tạo Bằng Văn Bản
            </div>
            <h4 className="text-lg sm:text-xl font-black">
              Chưa Rõ Năng Lực Hiện Tại Của Bản Thân?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Đăng ký tài khoản để làm bài kiểm tra phân loại 4 kỹ năng miễn phí do hệ thống AI chấm điểm và nhận phân tích lộ trình riêng trong 24 giờ.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('register', 'Kiểm tra trình độ miễn phí')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Test Năng Lực Miễn Phí</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
