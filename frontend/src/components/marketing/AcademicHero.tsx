import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Award,
  Youtube,
  Headphones,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Screen } from '../../types';

gsap.registerPlugin(useGSAP);

interface AcademicHeroProps {
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onExploreChapters: () => void;
  onNavigateScreen?: (screen: Screen) => void;
}

export const AcademicHero: React.FC<AcademicHeroProps> = ({
  onOpenAuth,
  onExploreChapters,
  onNavigateScreen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: 20, autoAlpha: 0, duration: 0.6 })
        .from('.hero-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.hero-lead', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-actions', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-pills', { y: 15, autoAlpha: 0, duration: 0.5 }, '-=0.3')
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
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Hệ Thống Học Thuật Cambridge IELTS • YouTube Dictation &amp; Anki SRS 2026</span>
          </div>
        </div>

        {/* Academic Headline */}
        <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#064E3B] tracking-tight leading-[1.2]">
          Luyện Thi Cambridge IELTS &amp;{' '}
          <span className="text-[#D97706] font-sans">
            Xưởng Chép Chính Tả
          </span>{' '}
          YouTube
        </h1>

        {/* Editorial Lead */}
        <p className="hero-lead text-base sm:text-lg text-stone-600 leading-relaxed font-sans font-normal max-w-2xl mx-auto">
          EduFlow kết hợp trọn vẹn 28 đề thi Cambridge IELTS Academic (Đọc Cam 10–20 &amp; Nghe Cam 13–20),
          phân hệ luyện nghe chép chính tả video YouTube độc lập (<code className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-sm font-semibold">/dictation</code>)
          đồng bộ thời gian thực, và kho thẻ nhớ 3D Anki Spaced Repetition tích hợp Gemini AI 9.0.
        </p>

        {/* Action CTAs */}
        <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => onOpenAuth('register', 'Bắt đầu luyện đề Cambridge')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold tracking-normal shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Luyện Đề Thi Thử Miễn Phí</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => onNavigateScreen?.('dictation')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-white text-sm font-bold tracking-normal shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Youtube className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>Vào Xưởng YouTube Dictation</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-mono text-[10px] font-bold">
              MỚI
            </span>
          </button>

          <button
            onClick={onExploreChapters}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Khám Phá Tính Năng</span>
          </button>
        </div>

        {/* Highlight Feature Pills */}
        <div className="hero-pills pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#064E3B]" />
            Đọc Cam 10-20 (Full Test 60p)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-[#064E3B]" />
            Nghe Cam 13-20 (Full 4 Sections)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
            <Youtube className="w-3.5 h-3.5 text-rose-600" />
            Chép Chính Tả Video YouTube
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#D97706]" />
            Thẻ 3D Anki &amp; Gemini AI 9.0
          </span>
        </div>

        {/* Footnote & Evidence */}
        <div className="hero-footnote pt-2 flex items-center justify-center gap-2 text-xs text-stone-500">
          <Award className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>
            Chuẩn format kỳ thi IELTS trên máy tính • Tra từ vựng Popover 1-Click • Xuất file Anki .apkg
          </span>
        </div>
      </div>
    </section>
  );
};
