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
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'dictation' | 'expert'>('all');

  const programs = [
    {
      id: 'reading',
      category: 'reading',
      badge: 'Luyện Đọc Thực Chiến',
      isPopular: true,
      title: 'Luyện Đọc Cambridge IELTS (Cam 10 - 20)',
      target: 'Mục tiêu: Bứt phá điểm số 7.0 - 8.5+ IELTS Reading',
      headline:
        'Làm chủ kỹ năng đọc hiểu qua 28 đề thi thật Cambridge 10 - 20, tùy chọn làm Full Test 60 phút bấm giờ hoặc làm riêng từng bài đọc Passage.',
      duration: 'Tự do theo tốc độ cá nhân',
      level: 'Người luyện thi IELTS, học sinh, sinh viên và người đi làm',
      features: [
        'Trọn bộ đề thi thật từ Cambridge 10 đến 20 (28 đề Full Tests & 84 Passages)',
        'Tùy chọn: Làm Full Test 60 phút có chấm điểm hoặc làm riêng từng Passage',
        'Tra từ điển trực tiếp ngay trên bài đọc: IPA, giải nghĩa tiếng Việt, ví dụ',
        'Lưu từ vựng 1-click vào bộ thẻ Anki để ôn lại dễ dàng',
        'Xem đáp án chi tiết và chỉ rõ vị trí câu trả lời trong đoạn văn',
      ],
      ctaText: 'Bắt Đầu Luyện Đọc Ngay',
    },
    {
      id: 'dictation',
      category: 'dictation',
      badge: 'Luyện Tai & Chính Tả',
      isPopular: false,
      title: 'Luyện Nghe Chép Chính Tả (Dictation)',
      target: 'Mục tiêu: Nghe rõ từng từ, sửa triệt để lỗi chính tả',
      headline:
        'Chấm dứt lối nghe thụ động qua phương pháp nghe chép từng câu ngắn, hệ thống tự động so khớp và chỉ rõ từ sai tức thì.',
      duration: '15 - 30 phút mỗi ngày',
      level: 'Người nghe chậm, hay bỏ sót âm đuôi hoặc hay sai lỗi chính tả',
      features: [
        'Nghe từng câu ngắn với tốc độ tùy chỉnh 0.8x đến 1.2x',
        'Đối soát từng từ: từ đúng màu xanh, từ sai màu đỏ giúp bạn sửa lỗi ngay',
        'Phím tắt tiện lợi, nút gợi ý ký tự tiếp theo và xem bản dịch tiếng Việt',
        'Chấm điểm và phản hồi trực quan cho mỗi câu chép chính xác',
        'Cải thiện rõ rệt khả năng bắt âm vị và độ nhạy tai khi làm bài nghe',
      ],
      ctaText: 'Bắt Đầu Luyện Nghe Dictation',
    },
    {
      id: 'expert',
      category: 'expert',
      badge: 'Ghi Nhớ Bền Vững',
      isPopular: false,
      title: 'Bộ Thẻ 3D Anki Flashcard (SRS)',
      target: 'Mục tiêu: Nhớ lâu 1000+ từ vựng cốt lõi không bao giờ quên',
      headline:
        'Ứng dụng thuật toán lặp lại ngắt quãng SM-2 với thẻ lật 3D sống động, tự động đồng bộ từ mới đã lưu từ bài Đọc và bài Nghe.',
      duration: '5 - 10 phút ôn tập mỗi ngày',
      level: 'Mọi học viên muốn xây dựng vốn từ vựng phong phú',
      features: [
        'Thẻ học lật 3D tương tác đa chiều, mô phỏng thẻ giấy chân thực',
        'Thuật toán SM-2 tự động tính toán ngày ôn lại tối ưu',
        '4 nút đánh giá quen thuộc: Again, Hard, Good, Easy',
        'Tự động đồng bộ toàn bộ từ vựng đã lưu từ bài Đọc và bài Nghe',
        'Luyện phản xạ điền từ vào câu ngữ cảnh giúp dùng từ tự nhiên',
      ],
      ctaText: 'Bắt Đầu Học Thẻ Anki',
    },
  ];

  const filtered =
    activeTab === 'all' ? programs : programs.filter((p) => p.category === activeTab);

  return (
    <section id="programs" className="py-20 bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-sans font-bold tracking-normal shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>3 Tính Năng Chính</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-normal leading-tight">
            Lộ Trình Luyện Tập Toàn Diện
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Kết hợp trọn vẹn Luyện đọc đề thật Cambridge, Luyện nghe chép chính tả và Ghi nhớ ngắt quãng bằng thẻ Anki.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {[
              { id: 'all', label: 'Tất Cả Lộ Trình' },
              { id: 'reading', label: '📖 Đọc Sâu & Vocabulary Vault' },
              { id: 'dictation', label: '🎧 Nghe Chép Chính Tả' },
              { id: 'expert', label: '🏛️ Chuyên Gia C1-C2' },
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
