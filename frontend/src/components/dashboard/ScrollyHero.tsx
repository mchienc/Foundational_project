import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, RotateCw, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { User, Screen } from '../../types';

gsap.registerPlugin(useGSAP);

interface ScrollyHeroProps {
  currentUser: User | null;
  streakDays?: number;
  onNavigateScreen?: (screen: Screen) => void;
  onOpenAuth?: (tab: 'login' | 'register') => void;
}

export const ScrollyHero: React.FC<ScrollyHeroProps> = ({
  currentUser,
  streakDays: _streakDays,
  onNavigateScreen,
  onOpenAuth: _onOpenAuth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Áp dụng useGSAP với scope containerRef để quản lý và cleanup đúng chuẩn
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      // Animation fade-in và trồi nhẹ các thành phần Hero
      tl.fromTo(
        '.hero-badge',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-title',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-desc',
          { y: 25, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-actions',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-tagline',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          '-=0.3'
        );

      // Hiệu ứng ánh sáng hào quang chuyển động chậm
      gsap.to('.hero-orb-1', {
        x: 40,
        y: -30,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-orb-2', {
        x: -50,
        y: 35,
        scale: 1.2,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden bg-[#064E3B] text-white p-8 sm:p-12 shadow-xl border border-amber-600/30"
    >
      {/* Background Subtle Glowing Ambient Orbs */}
      <div className="hero-orb-1 absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none will-change-transform" />
      <div className="hero-orb-2 absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none will-change-transform" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Academic Discipline & Researcher Badge */}
        <div className="hero-badge flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#022C22] border border-amber-500/40 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest shadow-xs">
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>KÝ DANH HỌC VIÊN: {(currentUser?.full_name || 'MINH CHIẾN ĐẶNG').toUpperCase()}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-semibold text-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            <span>EduFlow Ready</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.2] text-white">
          Tiếp Tục Luyện Thi Cambridge Cùng EduFlow
        </h1>

        {/* Description */}
        <p className="hero-desc text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
          Luyện thi Cambridge chuyên sâu, mở rộng vốn từ vựng với phương pháp lặp lại ngắt quãng Anki và phòng luyện nghe - đọc thông minh.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
          {/* Primary CTA Button: Solid Warm Gold */}
          <button
            onClick={() => onNavigateScreen && onNavigateScreen('vocab-srs')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer overflow-hidden"
          >
            <RotateCw className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500" />
            <span>Vào Phiên Học Flashcard</span>
            <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA Button: Reading Room */}
          <button
            onClick={() => onNavigateScreen && onNavigateScreen('reading')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-md active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Phòng Luyện Đọc Cambridge</span>
          </button>

          {/* Third CTA Button: Writing Studio */}
          <button
            onClick={() => onNavigateScreen && onNavigateScreen('writing')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#022C22] hover:bg-emerald-950 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Chấm Viết AI (IELTS)</span>
          </button>
        </div>

        {/* Footnote Assurance */}
        <div className="hero-tagline pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-300 font-medium border-t border-emerald-800/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Chuẩn Khung Châu Âu CEFR A1 - C2
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" /> Nghiên cứu ứng dụng Cambridge &amp; Oxford
          </span>
        </div>
      </div>
    </div>
  );
};
