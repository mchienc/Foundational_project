import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Mic,
  Headphones,
  FileText,
  Flame,
  Award,
  CheckCircle2,
  Zap,
  Trophy,
  RotateCw,
} from 'lucide-react';
import { UserStats, User, Screen } from '../../types';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome & Motivational Streak Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative bg-gradient-to-r from-brand-navy via-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl shadow-blue-900/20"
      >
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {currentUser ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  <Sparkles size={13} className="text-amber-300" />
                  Học viên Tiếng Anh: {currentUser.full_name}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Sẵn Sàng Nâng Tầm Tiếng Anh Cùng EduFlow Hôm Nay?
                </h1>
                <p className="text-blue-100/90 text-sm leading-relaxed">
                  Bạn đang duy trì chuỗi <strong className="text-amber-300">{stats.streakDays} ngày học liên tục 🔥</strong>. Hãy hoàn thành 1 phiên Flashcard và 1 bài luyện nói để nhận trọn vẹn điểm thưởng tuần!
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  <Sparkles size={13} className="text-amber-300" />
                  Nền Tảng LMS Học Tiếng Anh Chuyên Sâu
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Chinh Phục Tiếng Anh Toàn Diện Với Trải Nghiệm Tương Tác Hiện Đại
                </h1>
                <p className="text-blue-100/90 text-sm leading-relaxed">
                  Đăng nhập để lưu chuỗi Streak, tích lũy XP, thi đua bảng xếp hạng và làm chủ phản xạ tiếng Anh bản xứ!
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {currentUser ? (
              <>
                <button
                  onClick={() => onNavigateScreen && onNavigateScreen('vocab-srs')}
                  className="px-5 py-3 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-blue-50 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <RotateCw size={15} className="text-blue-600" />
                  Học Flashcard Ngay
                </button>
                <button
                  onClick={() => onNavigateScreen && onNavigateScreen('leaderboard')}
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trophy size={15} className="text-amber-300" />
                  Bảng Xếp Hạng
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('login')}
                  className="px-5 py-3 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-blue-50 shadow-md transition-all cursor-pointer"
                >
                  Đăng Nhập Ngay
                </button>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('register')}
                  className="px-5 py-3 rounded-full bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-sm border border-white/30 transition-all cursor-pointer"
                >
                  Đăng Ký Miễn Phí
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* English Metrics Grid (4 items) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: 'Từ Vựng Đã Tích Lũy',
            value: 148,
            unit: 'từ vựng',
            sub: 'Chuẩn Oxford & IELTS',
            icon: <Layers className="text-blue-600" size={20} />,
            bg: 'bg-blue-50',
          },
          {
            label: 'Điểm Phát Âm Chuẩn',
            value: '94%',
            unit: 'điểm AI',
            sub: 'Độ chuẩn xác âm vị',
            icon: <Mic className="text-violet-600" size={20} />,
            bg: 'bg-violet-50',
          },
          {
            label: 'Bài Nghe Đã Luyện',
            value: 32,
            unit: 'bài nghe',
            sub: 'Karaoke & Dictation',
            icon: <Headphones className="text-emerald-600" size={20} />,
            bg: 'bg-emerald-50',
          },
          {
            label: 'Chuỗi Ngày Liên Tục',
            value: stats.streakDays,
            unit: 'ngày',
            sub: 'Giải đấu Bạch Kim',
            icon: <Flame className="text-amber-600 fill-amber-500" size={20} />,
            bg: 'bg-amber-50',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-500 ml-1.5">{stat.unit}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* English Learning Specialized Studios Hub (4 Core Practice Modules) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
              Không Gian Luyện Tập Tương Tác 4 Kỹ Năng
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Lựa chọn phân hệ chuyên biệt để bắt đầu buổi học với phản hồi tức thì
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Flashcard 3D */}
          <div
            onClick={() => onNavigateScreen && onNavigateScreen('vocab-srs')}
            className="group cursor-pointer p-6 bg-gradient-to-br from-indigo-50/90 to-white rounded-3xl border border-indigo-200/80 hover:border-brand-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  Spaced Repetition
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-brand-primary transition-colors">
                  Thẻ Từ Vựng 3D (SRS)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Lật thẻ 3D 180°, phát âm chuẩn UK/US, tra từ điển popup nhanh và 4 mức ghi nhớ ngắt quãng.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Luyện thẻ ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Speaking Studio */}
          <div
            onClick={() => onNavigateScreen && onNavigateScreen('speaking')}
            className="group cursor-pointer p-6 bg-gradient-to-br from-violet-50/90 to-white rounded-3xl border border-violet-200/80 hover:border-violet-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-500/25 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-100/70 px-2 py-0.5 rounded-full">
                  Phoneme AI Speech
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-violet-600 transition-colors">
                  Phát Âm &amp; Ghi Âm Studio
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Hiển thị phiên âm IPA chi tiết, mic ripple rings, chấm điểm âm vị và so sánh đồ thị sóng âm Waveform.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-violet-100 flex items-center justify-between text-xs font-bold text-violet-600">
              <span>Bắt đầu thu âm</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Listening Player */}
          <div
            onClick={() => onNavigateScreen && onNavigateScreen('listening')}
            className="group cursor-pointer p-6 bg-gradient-to-br from-blue-50/90 to-white rounded-3xl border border-blue-200/80 hover:border-brand-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  Karaoke &amp; Dictation
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-brand-primary transition-colors">
                  Luyện Nghe &amp; Chép Chính Tả
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Trình phát audio tua ±5s, lặp A-B loop, karaoke transcript tự cuộn và chế độ điền từ khuyết.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-brand-primary">
              <span>Mở bài nghe</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Sentence Builder */}
          <div
            onClick={() => onNavigateScreen && onNavigateScreen('sentence-builder')}
            className="group cursor-pointer p-6 bg-gradient-to-br from-amber-50/90 to-white rounded-3xl border border-amber-200/80 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Grammar Architecture
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-amber-600 transition-colors">
                  Ghép Câu &amp; Ngữ Pháp
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Kéo thả word pill chips, phản hồi rung lắc khi sai, hiệu ứng pop + confetti khi ghép đúng thứ tự.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Thử thách ghép câu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Weekly League & Leaderboard Preview */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Bảng Xếp Hạng Giải Đấu Tuần (Giải Bạch Kim)
              </h3>
              <p className="text-xs text-slate-500">
                Top 3 học viên dẫn đầu tuần này • Cạnh tranh tích lũy XP
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateScreen && onNavigateScreen('leaderboard')}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Xem Toàn Bộ Bảng Xếp Hạng</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Top 3 Mini Podium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { rank: 1, name: 'Đặng Minh Chiến', role: 'Bạn (Hạng 1)', xp: 2020, streak: 14, color: 'border-amber-400 bg-amber-50/40', badge: 'bg-amber-400 text-slate-900' },
            { rank: 2, name: 'Dr. Sarah Jenkins', role: 'Học viên Oxford', xp: 1850, streak: 12, color: 'border-slate-200 bg-slate-50/50', badge: 'bg-slate-300 text-slate-800' },
            { rank: 3, name: 'David Thorne', role: 'Học viên Cambridge', xp: 1690, streak: 9, color: 'border-slate-200 bg-slate-50/50', badge: 'bg-amber-600 text-white' },
          ].map((item) => (
            <div
              key={item.rank}
              className={`p-3.5 rounded-2xl border ${item.color} flex items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${item.badge}`}>
                  {item.rank}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {item.role}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-black text-amber-600">
                  {item.xp.toLocaleString()} XP
                </div>
                <div className="text-[10px] text-slate-400">
                  🔥 {item.streak} ngày
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily English Missions & Streak Motivation */}
      <div className="p-6 bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-orange-50/40 rounded-3xl border border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Nhiệm Vụ Học Tập Hôm Nay
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Hoàn thành 3 mục tiêu để giữ vững chuỗi Streak &amp; thăng hạng giải đấu
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-700 font-medium">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 10 thẻ Flashcard
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-white/80 border border-slate-200 px-2.5 py-0.5 rounded-full">
                <Mic className="w-3 h-3 text-violet-600" /> 1 bài phát âm AI
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-white/80 border border-slate-200 px-2.5 py-0.5 rounded-full">
                <Headphones className="w-3 h-3 text-blue-600" /> 1 bài Dictation
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateScreen && onNavigateScreen('vocab-srs')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-amber-500/25 active:scale-95 transition-all shrink-0 flex items-center gap-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          Nhận Thêm +85 XP Hôm Nay
        </button>
      </div>
    </div>
  );
};
