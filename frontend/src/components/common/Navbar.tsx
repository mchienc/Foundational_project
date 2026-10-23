import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn,
  UserPlus,
  LogOut,
  User as UserIcon,
  Shield,
  ChevronDown,
  BookOpen,
  Headphones,
  Layers,
  Settings,
  Award,
  HelpCircle,
  Menu,
  X,
  Youtube,
  PenTool,
  Mic,
  Sparkles,
} from 'lucide-react';
import { Screen, UserStats, User } from '../../types';
import { Button } from './Button';
import { Logo } from './Logo';

interface NavbarProps {
  currentScreen: Screen;
  onSelectScreen: (screen: Screen, tab?: 'info' | 'settings' | 'password' | 'certs' | 'support') => void;
  stats: UserStats;
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  stats: _stats,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  // Core Routes for Cambridge IELTS & Flashcard Platform
  const navLinks: { id: Screen; label: string; icon: React.ReactNode; badge?: string; adminOnly?: boolean }[] = [
    {
      id: 'reading',
      label: 'Luyện Reading',
      icon: <BookOpen size={15} />,
    },
    {
      id: 'listening',
      label: 'Luyện Listening',
      icon: <Headphones size={15} />,
    },
    {
      id: 'writing',
      label: 'Luyện Viết',
      icon: <PenTool size={15} />,
      badge: 'PRO',
    },
    {
      id: 'speaking',
      label: 'Luyện Nói',
      icon: <Mic size={15} />,
      badge: 'PRO',
    },
    {
      id: 'dictation',
      label: 'Chép chính tả',
      icon: <Youtube size={15} />,
    },
    {
      id: 'anki',
      label: 'Flashcard',
      icon: <Layers size={15} />,
    },
    ...(currentUser?.role === 'admin'
      ? [
          {
            id: 'admin' as Screen,
            label: 'Quản Trị',
            icon: <Shield size={15} className="text-amber-400" />,
            adminOnly: true,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] border-b border-emerald-800/80 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Left Aligned */}
        <div className="flex items-center shrink-0">
          <Logo
            variant="full"
            theme="dark"
            onClick={() => onSelectScreen('landing')}
          />
        </div>

        {/* Desktop Navigation Tabs - Perfectly Centered */}
        <nav className="hidden md:flex items-center justify-center gap-1 bg-[#022C22]/80 p-1 rounded-full border border-emerald-900/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive =
              currentScreen === link.id ||
              (link.id === 'reading' && currentScreen === 'reading-test') ||
              (link.id === 'listening' && (currentScreen === 'listening-test' || currentScreen === 'listening-exam' || currentScreen === 'listening-review'));

            return (
              <button
                key={link.id}
                onClick={() => onSelectScreen(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
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
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-900 border border-amber-300 shadow-2xs leading-none">
                      <Sparkles size={8} />
                      {link.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions Area - Right Aligned */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* User Auth Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full hover:bg-emerald-900/60 border border-emerald-800/60 hover:border-emerald-700/80 transition-colors cursor-pointer select-none bg-emerald-950/40"
              >
                <div className="w-8 h-8 rounded-full bg-[#022C22] ring-2 ring-amber-500/40 text-amber-300 flex items-center justify-center font-sans font-bold text-xs shadow-xs">
                  {currentUser.full_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-stone-100 hidden md:inline max-w-[110px] truncate">
                  {currentUser.full_name}
                </span>
                {currentUser.role === 'admin' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-amber-400 text-stone-950 uppercase shadow-xs">
                    Admin
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-800/80 text-amber-200 border border-emerald-700">
                    Học Viên
                  </span>
                )}
                <ChevronDown size={14} className="text-stone-300" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-64 bg-[#FAFAF9] rounded-2xl border border-stone-300 shadow-xl py-2 z-50 divide-y divide-stone-200 text-xs text-stone-800"
                  >
                    {/* User Profile Header */}
                    <div className="px-4 py-3 bg-stone-100/70 rounded-t-2xl">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-forest-950 truncate font-sans text-sm">{currentUser.full_name}</p>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          {currentUser.role === 'admin' ? 'Quản Trị' : 'Học Viên'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">{currentUser.email}</p>
                      
                      {/* Target Band Pill */}
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#064E3B] border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Mục tiêu: Band {currentUser.targetBand || '7.0+'} IELTS</span>
                      </div>
                    </div>

                    {/* Account & Learning Management */}
                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          onSelectScreen('profile', 'info');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <UserIcon size={14} className="text-[#064E3B]" />
                        <span>Hồ sơ cá nhân</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectScreen('profile', 'settings');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <Settings size={14} className="text-amber-600" />
                        <span>Cài đặt học tập &amp; Mục tiêu</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectScreen('profile', 'certs');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <Award size={14} className="text-emerald-700" />
                        <span>Chứng nhận &amp; Thành tích</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectScreen('profile', 'support');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <HelpCircle size={14} className="text-blue-600" />
                        <span>Trung tâm hỗ trợ</span>
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
                          <span>Quản Trị Hệ Thống</span>
                        </button>
                      )}
                    </div>

                    {/* Sign out */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 font-medium transition-colors cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Đăng Xuất</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenAuth('login')}
                className="text-stone-100 hover:text-amber-300 hover:bg-emerald-900/60"
              >
                <LogIn size={14} />
                <span>Đăng Nhập</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenAuth('register')}
                className="bg-[#D97706] hover:bg-[#B45309] text-white border-none shadow-sm"
              >
                <UserPlus size={14} />
                <span>Bắt Đầu Học Ngay</span>
              </Button>
            </div>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setShowMobileNav((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-stone-200 hover:text-amber-300 hover:bg-[#022C22] transition-colors cursor-pointer"
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
            className="lg:hidden border-t border-emerald-800/80 bg-[#022C22] px-4 py-3 space-y-1 shadow-xl"
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
                <span className="flex items-center gap-2 flex-1">
                  {link.icon}
                  <span>{link.label}</span>
                </span>
                {link.badge && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-900 shrink-0">
                    <Sparkles size={8} />
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            {currentUser ? (
              <button
                onClick={() => {
                  onSelectScreen('profile', 'info');
                  setShowMobileNav(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-forest-900/60 border-t border-emerald-900/80 pt-2 cursor-pointer transition-colors"
              >
                <UserIcon size={14} />
                Hồ sơ &amp; Cài đặt học tập
              </button>
            ) : (
              <button
                onClick={() => {
                  onSelectScreen('landing');
                  setShowMobileNav(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-forest-900/60 border-t border-emerald-900/80 pt-2 cursor-pointer transition-colors"
              >
                <BookOpen size={14} />
                Giới thiệu EduFlow
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
