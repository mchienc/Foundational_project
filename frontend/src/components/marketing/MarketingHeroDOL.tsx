import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Sparkles,
  ArrowRight,
  Users,
  Award,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface MarketingHeroDOLProps {
  onOpenAuth: (tab: 'login' | 'register') => void;
  onExplorePrograms: () => void;
}

export const MarketingHeroDOL: React.FC<MarketingHeroDOLProps> = ({
  onOpenAuth,
  onExplorePrograms,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Avatar cộng đồng học viên xếp thành cụm và vòm cong
  const communityAvatars = [
    {
      name: 'Khánh Vy',
      score: 'IELTS 8.0',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      className: 'avatar-item-1 top-4 left-4 sm:top-10 sm:left-12',
    },
    {
      name: 'Minh Hoàng',
      score: 'IELTS 7.5',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      className: 'avatar-item-2 top-8 right-6 sm:top-12 sm:right-16',
    },
    {
      name: 'Phương Thảo',
      score: 'IELTS 8.5',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      className: 'avatar-item-3 bottom-12 left-6 sm:bottom-16 sm:left-20',
    },
    {
      name: 'Quốc Bảo',
      score: 'THPT 9.8đ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      className: 'avatar-item-4 bottom-8 right-8 sm:bottom-14 sm:right-24',
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Trồi nhẹ tiêu đề và nội dung chính
      tl.fromTo('.hero-pills', { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
        .fromTo('.hero-headline', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
        .fromTo('.hero-sub', { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-cta-group', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-proof-bar', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.3');

      // Floating lơ lửng nhẹ nhàng các avatar học viên vòm xung quanh
      communityAvatars.forEach((_, idx) => {
        gsap.to(`.avatar-item-${idx + 1}`, {
          y: idx % 2 === 0 ? -12 : 12,
          x: idx % 2 === 0 ? 8 : -8,
          duration: 3 + idx * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Subtle Radial Glow & Grids */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-rose-300/10 to-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Community Avatars (Responsive: Hidden on very small screens, displayed elegantly on tablet/desktop) */}
      {communityAvatars.map((item, idx) => (
        <div
          key={idx}
          className={`absolute hidden md:flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-md z-20 pointer-events-none will-change-transform ${item.className}`}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500 shadow-xs">
            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">{item.name}</div>
            <span className="inline-block text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
              {item.score}
            </span>
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Category Pills (DOL Style) */}
        <div className="hero-pills flex flex-wrap items-center justify-center gap-2">
          {['IELTS Academic', 'Giao Tiếp Bản Xứ', 'THCS & THPT', 'Từ Vựng 3D SRS'].map((pill, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-xs transition-all ${
                idx === 0
                  ? 'bg-rose-600 text-white shadow-rose-600/25 ring-2 ring-rose-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Dual-tone Headline (DOL Style) */}
        <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
          Nền Tảng Luyện Tiếng Anh Tương Tác Cùng{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent underline decoration-rose-500/40 underline-offset-8">
            Trợ Lý AI EduFlow
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-sub text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tích hợp thuật toán lặp lại ngắt quãng (SRS), chấm phát âm âm vị chuẩn quốc tế và giám khảo bài luận Cambridge IELTS 4 tiêu chí. Học thông minh hơn, tiến bộ vượt trội.
        </p>

        {/* CTA Buttons Group */}
        <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenAuth('register')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-rose-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Đăng Ký Trải Nghiệm Miễn Phí</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExplorePrograms}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Khám Phá Lộ Trình Đào Tạo</span>
          </button>
        </div>

        {/* Social Proof Metric Bar (Bộ 3 chỉ số tín nhiệm theo yêu cầu) */}
        <div className="hero-proof-bar pt-10 border-t border-slate-200/80 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {/* Metric 1 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-brand-primary font-black text-lg">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>Linearthinking &amp; SRS</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Phương pháp độc quyền chuẩn khoa học</p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-xl font-mono">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>4,000+</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Học viên đạt mục tiêu cam kết</p>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-xl font-mono">
                <Award className="w-5 h-5 text-violet-600" />
                <span>20,000+</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Lượt tương tác học tập mỗi tuần</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
