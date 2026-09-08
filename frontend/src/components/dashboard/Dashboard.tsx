import React from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  Mic,
  Headphones,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { UserStats, User, Screen } from '../../types';
import { useLenisSmoothScroll } from '../../utils/useLenisSmoothScroll';
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
  // Kích hoạt cuộn mượt Lenis Smooth Scroll đồng bộ với GSAP ScrollTrigger
  useLenisSmoothScroll(true);

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

      {/* SECTION 4: Weekly League & Leaderboard Preview */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center font-bold shadow-xs">
              <Trophy size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#064E3B] tracking-tight">
                Bảng Xếp Hạng Giải Đấu Tuần (Giải Bạch Kim)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Top 3 nghiên cứu viên dẫn đầu tuần này • Cạnh tranh tích lũy điểm XP
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateScreen && onNavigateScreen('leaderboard')}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-[#064E3B] hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Xem Toàn Bộ Bảng Xếp Hạng</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Top 3 Mini Podium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              rank: 1,
              name: 'Đặng Minh Chiến',
              role: 'Bạn (Hạng 1)',
              xp: 2140,
              streak: 14,
              color: 'border-amber-400/80 bg-amber-50/60 shadow-xs',
              badge: 'bg-[#D97706] text-white',
            },
            {
              rank: 2,
              name: 'Dr. Sarah Jenkins',
              role: 'Nghiên cứu sinh Oxford',
              xp: 1980,
              streak: 12,
              color: 'border-stone-200 bg-stone-50/70',
              badge: 'bg-stone-300 text-stone-800',
            },
            {
              rank: 3,
              name: 'David Thorne',
              role: 'Học giả Cambridge',
              xp: 1820,
              streak: 9,
              color: 'border-stone-200 bg-stone-50/70',
              badge: 'bg-amber-800 text-white',
            },
          ].map((item) => (
            <div
              key={item.rank}
              className={`p-4 rounded-2xl border ${item.color} flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 shadow-xs ${item.badge}`}
                >
                  {item.rank}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#064E3B] truncate max-w-[130px]">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">{item.role}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-black text-amber-700 font-mono">
                  {item.xp.toLocaleString()} XP
                </div>
                <div className="text-[10px] text-stone-400 font-medium">🔥 {item.streak} ngày</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Daily English Missions & Motivation */}
      <div className="relative overflow-hidden p-6 sm:p-8 bg-[#064E3B] rounded-3xl border border-amber-600/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              Nhiệm Vụ Học Thuật Hôm Nay
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-100 mt-0.5 tracking-tight">
              Hoàn thành 3 mục tiêu để giữ vững chuỗi Nghiên cứu &amp; thăng hạng giải đấu
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
          <Zap className="w-4 h-4 fill-current" />
          Nhận Thêm +85 XP Hôm Nay
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
