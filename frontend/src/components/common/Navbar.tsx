import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectScreen('dashboard')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg select-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-navy to-brand-primary text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                EduFlow
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-brand-primary font-bold uppercase tracking-wider">
                  English
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono block -mt-1 hidden sm:block">
                Interactive EdTech LMS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectScreen(link.id)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none ${
                    isActive
                      ? 'text-brand-primary'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/70"
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
          {/* Animated XP Counter */}
          {currentUser && (
            <motion.div
              key={xp}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-900 shadow-xs cursor-pointer hover:bg-amber-100 transition-colors"
              onClick={onOpenLeaderboard}
              title="Điểm kinh nghiệm tuần - Bấm để xem Bảng xếp hạng"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black tracking-tight">{xp}</span>
              <span className="text-[10px] font-bold text-amber-600">XP</span>
            </motion.div>
          )}

          {/* Flame Streak Badge - Only shown when user is logged in */}
          {currentUser && <StreakBadge days={stats.streakDays} size="sm" />}

          {/* Leaderboard Trophy Button */}
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              title="Bảng xếp hạng tuần"
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Trophy size={15} />
            </button>
          )}


          {/* User Auth Dropdown */}
          {currentUser ? (
            <div className="relative pl-1 border-l border-slate-200">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.full_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[90px] truncate">
                  {currentUser.full_name}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 divide-y divide-slate-100 text-xs"
                  >
                    <div className="px-4 py-2.5">
                      <p className="font-bold text-slate-900 truncate">{currentUser.full_name}</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700">
                        {currentUser.role === 'admin' ? 'Quản trị viên (Admin)' : 'Học viên Tiếng Anh'}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onSelectScreen('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <UserIcon size={14} />
                        Hồ Sơ &amp; Thành Tích
                      </button>
                      <button
                        onClick={() => {
                          onSelectScreen('vocab-srs');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
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
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
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
            className="xl:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectScreen(link.id);
                  setShowMobileNav(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentScreen === link.id
                    ? 'bg-blue-50 text-brand-primary'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
