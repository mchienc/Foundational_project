import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  GraduationCap,
  Flame,
} from 'lucide-react';

interface AcademicProgramsProps {
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ielts' | 'school' | 'comm'>('all');

  const programs = [
    {
      id: 'ielts',
      category: 'ielts',
      badge: 'Chuyên Khảo Phổ Biến Nhất',
      isPopular: true,
      title: 'IELTS Academic Sinh Viên & Chuyên Gia',
      target: 'Mục tiêu: 6.5 - 8.0+ IELTS Học Thuật',
      headline:
        'Hệ thống hóa tư duy phản biện, tối ưu hóa điểm số 4 kỹ năng qua phương pháp bóc tách ngôn ngữ và ngân hàng đề thi chuẩn Cambridge.',
      duration: '3 - 6 tháng (Theo khảo sát đầu vào)',
      level: 'Sinh viên đại học, nghiên cứu sinh, người đi làm thăng tiến',
      features: [
        'Loại bỏ triệt để thói quen dịch thô word-by-word tiếng Việt',
        'Phòng thu âm AI bóc tách từng âm vị IPA và trọng âm câu',
        'Chấm viết luận Task 1 & Task 2 chuẩn 4 trục IELTS Band Descriptors',
        'Kho 1,200+ từ vựng học thuật Spaced Repetition chuẩn Oxford C1',
        'Cam kết chuẩn đầu ra 6.5 - 7.5+ bằng thỏa ước đào tạo',
      ],
      ctaText: 'Đăng Ký Lộ Trình 6.5 - 8.0+',
    },
    {
      id: 'school',
      category: 'school',
      badge: 'Bứt Phá Điểm Số Học Đường',
      isPopular: false,
      title: 'Tiếng Anh Học Đường THCS & THPT',
      target: 'Mục tiêu: 9.0+ Thi Vào 10 Chuyên & THPT Quốc Gia',
      headline:
        'Xây dựng móng ngữ pháp kiến tạo, giải mã đề thi thử của các trường chuyên top đầu và bám sát SGK mới Global Success.',
      duration: 'Toàn diện theo năm học / Cấp tốc ôn thi',
      level: 'Học sinh lớp 6 đến lớp 12 chuẩn bị thi chuyên & tốt nghiệp',
      features: [
        'Cây ngữ pháp kiến tạo kéo thả trực quan qua Sentence Builder',
        'Luyện nghe A-B loop và chép chính tả Dictation không bỏ sót từ',
        'Kho đề thi thử bấm giờ có phân tích lỗi sai chi tiết tự động',
        'Rèn luyện tư duy đọc hiểu nhanh các đoạn văn học thuật dài',
        'Hỗ trợ giải đáp 1-1 với đội ngũ trợ giảng đạt IELTS 8.0+',
      ],
      ctaText: 'Khám Phá Lộ Trình Học Đường',
    },
    {
      id: 'comm',
      category: 'comm',
      badge: 'Thực Chiến Âm Vị',
      isPopular: false,
      title: 'Khảo Thí & Phản Xạ Âm Vị Cấp Tốc',
      target: 'Mục tiêu: Phản Xạ Tự Nhiên & Chuẩn Âm Vị Trong 60 Ngày',
      headline:
        'Làm chủ ngữ điệu Intonation và nhịp điệu Stress trong câu. Tự tin thuyết trình hội thảo, phỏng vấn xin việc và hội nhập quốc tế.',
      duration: '8 - 12 tuần (Cường độ cao)',
      level: 'Người mất gốc ngữ âm, chuẩn bị du học hoặc phỏng vấn visa',
      features: [
        'Sửa khẩu hình, nối âm, nuốt âm qua biểu đồ sóng âm Waveform',
        'Mô phỏng 50+ kịch bản đối thoại môi trường công sở & học thuật',
        'Luyện nghe đa giọng điệu: Anh - Mỹ - Úc với tốc độ biến thiên',
        'Thẻ từ vựng flashcard kích hoạt phản xạ câu tức thì',
        'Thực hành ghi âm mỗi ngày, nhận báo cáo tiến độ chi tiết',
      ],
      ctaText: 'Đăng Ký Khóa Phản Xạ Cấp Tốc',
    },
  ];

  const filtered =
    activeTab === 'all' ? programs : programs.filter((p) => p.category === activeTab);

  return (
    <section id="programs" className="py-20 bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Chương Trình Đào Tạo Trọng Tâm</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-normal leading-tight">
            Chọn Lộ Trình Nghiên Cứu Phù Hợp
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Hệ sinh thái EdTech AI của EduFlow thiết kế riêng biệt cho từng đối tượng học viên,
            tập trung vào thực hành tương tác trực tiếp và cam kết chuẩn đầu ra.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {[
              { id: 'all', label: 'Tất Cả Lộ Trình' },
              { id: 'ielts', label: '🎯 IELTS Học Thuật 6.5 - 8.0+' },
              { id: 'school', label: '🏫 Học Đường THCS & THPT' },
              { id: 'comm', label: '⚡ Phản Xạ Âm Vị Cấp Tốc' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#064E3B] text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'bg-white text-stone-600 border border-stone-300 hover:border-stone-400 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className={`relative flex flex-col justify-between rounded-3xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-7 sm:p-8 space-y-6 ${
                prog.isPopular
                  ? 'border-gold-500/60 ring-2 ring-gold-400/20 shadow-lg'
                  : 'border-stone-300 shadow-xs'
              }`}
            >
              {/* Popularity Ribbon */}
              {prog.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#064E3B] border border-amber-400 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Được Chọn Nhiều Nhất
                </div>
              )}

              <div className="space-y-4">
                {/* Badge & Target */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300">
                    {prog.badge}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#064E3B] tracking-normal leading-snug">
                    {prog.title}
                  </h3>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 text-xs font-bold">
                    <Target className="w-4 h-4 text-forest-700 shrink-0" />
                    <span>{prog.target}</span>
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1">
                    {prog.headline}
                  </p>
                </div>

                {/* Duration & Level */}
                <div className="space-y-2 py-3 border-y border-stone-200 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-bold text-stone-700">Thời lượng:</span>
                    <span>{prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-bold text-stone-700">Đối tượng:</span>
                    <span className="truncate">{prog.level}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-stone-500 text-[10px]">
                    Đặc quyền phân hệ học thuật:
                  </span>
                  <ul className="space-y-2 text-stone-700">
                    {prog.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => onOpenAuth('register', prog.title)}
                  className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98 ${
                    prog.isPopular
                      ? 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/25'
                      : 'bg-[#064E3B] hover:bg-[#022C22] text-white shadow-emerald-950/20'
                  }`}
                >
                  <span>{prog.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] font-mono text-center text-stone-400 mt-2">
                  Kiểm tra trình độ học thuật 15 phút miễn phí
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
