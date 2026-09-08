import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Zap,
  LogIn,
  UserPlus,
  LogOut,
  User as UserIcon,
  Shield,
  Layers,
  ChevronDown,
  Mic,
  Headphones,
  FileText,
  Trophy,
  Menu,
  X,
  PenTool,
  Globe,
} from 'lucide-react';
import { Screen, UserStats, User } from '../../types';
import { StreakBadge } from './StreakBadge';
import { Button } from './Button';

interface NavbarProps {
  currentScreen: Screen;
  onSelectScreen: (screen: Screen) => void;
  stats: UserStats;
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onLogout: () => void;
  xp?: number;
  onOpenLeaderboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  stats,
  currentUser,
  onOpenAuth,
  onLogout,
  xp = 1980,
  onOpenLeaderboard,
}) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  // Dynamic Navigation Links for English LMS
  const navLinks: { id: Screen; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    {
      id: 'dashboard',
      label: 'Lộ Trình',
      icon: <LayoutDashboard size={14} />,
    },
    {
      id: 'vocab-srs',
      label: 'Flashcard 3D',
      icon: <Layers size={14} />,
    },
    {
      id: 'speaking',
      label: 'Phát Âm AI',
      icon: <Mic size={14} />,
    },
    {
      id: 'listening',
      label: 'Luyện Nghe',
      icon: <Headphones size={14} />,
    },
    {
      id: 'sentence-builder',
      label: 'Ghép Câu',
      icon: <FileText size={14} />,
    },
    {
      id: 'writing',
      label: 'Chấm Viết AI',
      icon: <PenTool size={14} />,
    },
    ...(currentUser?.role === 'admin'
      ? [
          {
            id: 'admin' as Screen,
            label: 'Quản Trị',
            icon: <Shield size={14} className="text-purple-600" />,
            adminOnly: true,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] border-b border-emerald-800/80 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectScreen('dashboard')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg select-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#022C22] border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <PenTool size={20} className="text-amber-400" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-sans font-bold tracking-tight text-white flex items-center gap-1.5">
                EduFlow
                <span className="font-sans text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-extrabold uppercase tracking-wider">
                  Academic
                </span>
              </span>
              <span className="text-[10px] text-stone-300 font-mono block -mt-1 hidden sm:block">
                Bàn Học Nghiên Cứu
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#022C22]/80 p-1 rounded-full border border-emerald-900/60">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectScreen(link.id)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                    isActive
                      ? 'text-amber-300 font-bold'
                      : 'text-stone-200 hover:text-amber-300 hover:bg-emerald-900/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#064E3B] rounded-full shadow-inner border border-amber-500/40"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.icon}
                    {link.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Gamification & Actions Area */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Animated XP Counter - Deep Forest & Amber Gold */}
          {currentUser && (
            <motion.div
              key={xp}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#022C22] border border-amber-500/40 rounded-full text-amber-300 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
              onClick={onOpenLeaderboard}
              title="Điểm kinh nghiệm tuần - Bấm để xem Bảng xếp hạng"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black tracking-tight">{xp}</span>
              <span className="text-[10px] font-bold text-amber-400/80">XP</span>
            </motion.div>
          )}

          {/* Flame Streak Badge - Only shown when user is logged in */}
          {currentUser && (
            <StreakBadge
              days={stats.streakDays}
              size="sm"
              className="!bg-amber-500/20 !text-amber-300 !border-amber-500/40"
            />
          )}

          {/* Leaderboard Trophy Button */}
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              title="Bảng xếp hạng tuần"
              className="p-2 rounded-full border border-amber-500/30 bg-[#022C22] text-amber-400 hover:text-amber-300 hover:bg-emerald-950 transition-colors cursor-pointer"
            >
              <Trophy size={15} />
            </button>
          )}

          {/* User Auth Dropdown */}
          {currentUser ? (
            <div className="relative pl-1 border-l border-emerald-800/80">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-emerald-900/60 border border-transparent hover:border-emerald-700/60 transition-colors cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#022C22] ring-2 ring-amber-500/40 text-amber-300 flex items-center justify-center font-sans font-bold text-xs shadow-xs">
                  {currentUser.full_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-stone-100 hidden md:inline max-w-[110px] truncate">
                  {currentUser.full_name}
                </span>
                <ChevronDown size={14} className="text-stone-300" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 bg-[#FAFAF9] rounded-2xl border border-stone-300 shadow-xl py-2 z-50 divide-y divide-stone-200 text-xs text-stone-800"
                  >
                    <div className="px-4 py-2.5">
                      <p className="font-bold text-forest-950 truncate font-sans">{currentUser.full_name}</p>
                      <p className="text-[11px] text-stone-500 font-mono truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300">
                        {currentUser.role === 'admin' ? 'Hội Đồng Khảo Thí' : 'Học Viên Nghiên Cứu'}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onSelectScreen('landing');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <Globe size={14} />
                        Trang Giới Thiệu (Landing)
                      </button>
                      <button
                        onClick={() => {
                          onSelectScreen('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <UserIcon size={14} />
                        Hồ Sơ &amp; Thành Tích
                      </button>
                      <button
                        onClick={() => {
                          onSelectScreen('vocab-srs');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <Layers size={14} />
                        Ôn Tập Flashcard SRS
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            onSelectScreen('admin');
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-2 flex items-center gap-2.5 text-purple-700 hover:bg-purple-50 font-semibold transition-colors cursor-pointer"
                        >
                          <Shield size={14} />
                          Quản Trị Hệ Thống
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 font-medium transition-colors cursor-pointer"
                      >
                        <LogOut size={14} />
                        Đăng Xuất
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Button
                variant="outline"
                size="sm"
                icon={<LogIn size={13} />}
                onClick={() => onOpenAuth('login')}
              >
                Đăng Nhập
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<UserPlus size={13} />}
                onClick={() => onOpenAuth('register')}
                className="hidden sm:inline-flex"
              >
                Đăng Ký
              </Button>
            </div>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setShowMobileNav((prev) => !prev)}
            className="xl:hidden p-2 rounded-xl text-stone-200 hover:text-amber-300 hover:bg-[#022C22] transition-colors cursor-pointer"
          >
            {showMobileNav ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-emerald-800/80 bg-[#022C22] px-4 py-3 space-y-1 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectScreen(link.id);
                  setShowMobileNav(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  currentScreen === link.id
                    ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-stone-300 hover:bg-forest-900/60 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onSelectScreen('landing');
                setShowMobileNav(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-forest-900/60 border-t border-emerald-900/80 pt-2 cursor-pointer transition-colors"
            >
              <Globe size={14} />
              Trang Giới Thiệu (Landing)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
