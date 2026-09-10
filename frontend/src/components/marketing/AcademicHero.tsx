import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Award,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface AcademicHeroProps {
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onExploreChapters: () => void;
}

export const AcademicHero: React.FC<AcademicHeroProps> = ({
  onOpenAuth,
  onExploreChapters,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: 20, autoAlpha: 0, duration: 0.6 })
        .from('.hero-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.hero-lead', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-actions', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-footnote', { y: 15, autoAlpha: 0, duration: 0.5 }, '-=0.3');
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 bg-transparent border-b border-stone-200/60"
    >
      {/* Background subtle editorial paper grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        {/* Academic Discipline Badge */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-sans font-bold tracking-normal shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Hệ Thống Luyện Thi Cambridge IELTS &amp; Anki SRS</span>
          </div>
        </div>

        {/* Academic Headline */}
        <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#064E3B] tracking-tight leading-[1.2]">
          Luyện Thi Cambridge IELTS Bằng{' '}
          <span className="text-[#D97706]">
            Thực Chiến
          </span>{' '}
          &amp; Ghi Nhớ Ngắt Quãng
        </h1>

        {/* Editorial Lead */}
        <p className="hero-lead text-base sm:text-lg text-stone-600 leading-relaxed font-sans font-normal max-w-2xl mx-auto">
          EduFlow tích hợp trọn bộ 28 đề thi Cambridge IELTS Academic từ Cambridge 10 đến 20.
          Linh hoạt lựa chọn làm Full Test 60 phút bấm giờ hoặc luyện từng Passage riêng biệt,
          kết hợp nghe chép chính tả Dictation và lưu từ vựng vào bộ thẻ Anki để ôn tập ngắt quãng.
        </p>

        {/* Action CTAs */}
        <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenAuth('register', 'Bắt đầu luyện đề Cambridge')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold tracking-normal shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Bắt Đầu Luyện Đề Miễn Phí</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onExploreChapters}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Khám Phá Tính Năng</span>
          </button>
        </div>

        {/* Footnote & Evidence */}
        <div className="hero-footnote pt-4 flex items-center justify-center gap-3 text-xs text-stone-500">
          <Award className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>
            Trọn bộ 28 đề thi Cambridge IELTS 10 - 20 • 84 Passages • Chấm điểm &amp; Lời giải chi tiết
          </span>
        </div>
      </div>
    </section>
  );
};
