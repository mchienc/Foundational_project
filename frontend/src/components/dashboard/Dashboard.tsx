import React from 'react';
import {
  Award,
  CheckCircle2,
  Mic,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { UserStats, User, Screen } from '../../types';
import { useSmoothScroll } from '../../context/SmoothScrollProvider';
import { ScrollyHero } from './ScrollyHero';
import { ScrollyMetrics } from './ScrollyMetrics';
import { ScrollyFeatures } from './ScrollyFeatures';

interface DashboardProps {
  stats: UserStats;
  currentUser: User | null;
  onOpenAuth?: (tab: 'login' | 'register') => void;
  onNavigateScreen?: (screen: Screen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  currentUser,
  onOpenAuth,
  onNavigateScreen,
}) => {
  const { resize } = useSmoothScroll();

  React.useEffect(() => {
    resize();
  }, [resize]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* SECTION 1: Scrollytelling Hero Banner */}
      <ScrollyHero
        currentUser={currentUser}
        streakDays={stats.streakDays}
        onNavigateScreen={onNavigateScreen}
        onOpenAuth={onOpenAuth}
      />

      {/* SECTION 2: GSAP ScrollTrigger Count-up Metrics */}
      <ScrollyMetrics streakDays={stats.streakDays} />

      {/* SECTION 3: Pinned Showcase Scrollytelling (5 Không Gian Luyện Tập) */}
      <ScrollyFeatures onNavigateScreen={onNavigateScreen} />

      {/* SECTION 4: Daily English Missions & Motivation */}
      <div className="relative overflow-hidden p-6 sm:p-8 bg-[#064E3B] rounded-3xl border border-amber-600/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              Mục Tiêu Học Tập Hôm Nay
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-100 mt-0.5 tracking-tight">
              Hoàn thành 3 mục tiêu để nắm vững kiến thức hôm nay
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 10 thẻ Flashcard 3D
              </span>
              <span className="flex items-center gap-1.5 text-stone-200 bg-white/10 border border-white/10 px-3 py-1 rounded-full font-medium">
                <Mic className="w-3.5 h-3.5 text-amber-300" /> 1 bài phát âm AI
              </span>
              <span className="flex items-center gap-1.5 text-stone-200 bg-white/10 border border-white/10 px-3 py-1 rounded-full font-medium">
                <Headphones className="w-3.5 h-3.5 text-amber-300" /> 1 bài Dictation
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateScreen && onNavigateScreen('vocab-srs')}
          className="relative z-10 px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl text-xs font-bold shadow-lg shadow-amber-900/30 active:scale-95 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Bắt Đầu Học Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
