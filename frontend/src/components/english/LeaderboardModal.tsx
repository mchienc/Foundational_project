import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Zap,
  Crown,
  X,
  Shield,
  Loader2,
} from 'lucide-react';
import { LeaderboardItem } from '../../types';
import { sampleLeaderboard } from '../../data/englishMockData';
import { englishApi } from '../../services/englishApi';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserXp?: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUserXp = 1980,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(sampleLeaderboard);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      englishApi.getLeaderboard()
        .then((data) => {
          if (data && data.length > 0) {
            setLeaderboard(data);
          }
        })
        .catch((err) => console.warn('Could not load leaderboard from MySQL:', err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Split Top 3 and Rest
  const top3 = leaderboard.slice(0, 3);
  const restUsers = leaderboard.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Bảng Xếp Hạng Tuần (League Ranking)
                </h3>
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-amber-500 inline-block" />}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Mùa giải kết thúc sau: <span className="text-brand-primary font-bold">2 ngày 14 giờ</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto pr-1 py-4 space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 pb-2 items-end">
            {/* Rank 2 (Silver) */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-slate-300 ring-4 ring-slate-100 shadow-md">
                  <img
                    src={top3[1]?.avatar}
                    alt={top3[1]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs font-black shadow">
                  2
                </div>
              </div>
              <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[90px]">
                {top3[1]?.name}
              </span>
              <span className="text-[11px] font-extrabold text-amber-600 flex items-center gap-0.5 mt-0.5">
                <Zap className="w-3 h-3 fill-current" /> {top3[1]?.xpThisWeek} XP
              </span>
              <div className="w-full h-16 bg-slate-100 rounded-t-xl mt-2 flex items-center justify-center text-xs font-bold text-slate-400">
                Hạng 2
              </div>
            </div>

            {/* Rank 1 (Gold - Center highest) */}
            <div className="flex flex-col items-center -mt-4">
              <Crown className="w-6 h-6 text-amber-500 fill-amber-400 mb-1 animate-bounce" />
              <div className="relative mb-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-amber-400 ring-4 ring-amber-100 shadow-xl">
                  <img
                    src={top3[0]?.avatar}
                    alt={top3[0]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-black shadow-lg">
                  1
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-900 text-center truncate max-w-[100px]">
                {top3[0]?.name}
              </span>
              <span className="text-xs font-extrabold text-amber-600 flex items-center gap-0.5 mt-0.5">
                <Zap className="w-3.5 h-3.5 fill-current" /> {top3[0]?.xpThisWeek} XP
              </span>
              <div className="w-full h-22 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-xl mt-2 flex items-center justify-center text-xs font-black text-amber-800 shadow-sm">
                Quán Quân
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-700/60 ring-4 ring-amber-50 shadow-md">
                  <img
                    src={top3[2]?.avatar}
                    alt={top3[2]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-700 text-amber-50 flex items-center justify-center text-xs font-black shadow">
                  3
                </div>
              </div>
              <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[90px]">
                {top3[2]?.name}
              </span>
              <span className="text-[11px] font-extrabold text-amber-600 flex items-center gap-0.5 mt-0.5">
                <Zap className="w-3 h-3 fill-current" /> {top3[2]?.xpThisWeek} XP
              </span>
              <div className="w-full h-12 bg-amber-50 rounded-t-xl mt-2 flex items-center justify-center text-xs font-bold text-amber-800">
                Hạng 3
              </div>
            </div>
          </div>

          {/* Ranks 4+ List */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
              Các vị trí thăng hạng tiếp theo
            </div>
            {restUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  user.isCurrentUser
                    ? 'bg-blue-50/80 border-brand-primary ring-2 ring-blue-200 shadow-md'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-center font-bold text-sm ${
                      user.isCurrentUser ? 'text-brand-primary' : 'text-slate-500'
                    }`}
                  >
                    #{user.rank}
                  </span>

                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-primary text-white">
                          BẠN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        {user.streakDays} ngày
                      </span>
                      <span>•</span>
                      <span className="text-slate-400 font-medium">
                        Giải {user.league}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-amber-600 flex items-center justify-end gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    {user.isCurrentUser ? currentUserXp : user.xpThisWeek}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    XP tuần này
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            Top 5 học viên sẽ được thăng hạng lên <strong>Giải Kim Cương</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
};
