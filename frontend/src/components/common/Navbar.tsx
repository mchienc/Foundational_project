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
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
  Globe,
  PenLine,
  Mic,
} from 'lucide-react';
import { Screen, UserStats, User } from '../../types';
import { Button } from './Button';

interface NavbarProps {
  currentScreen: Screen;
  onSelectScreen: (screen: Screen) => void;
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

  // Core Routes for Cambridge IELTS & Anki Platform
  const navLinks: { id: Screen; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    {
      id: 'reading',
      label: 'Luyện Đọc Cambridge',
      icon: <BookOpen size={15} />,
    },
    {
      id: 'mistake-vault',
      label: 'Sổ Tay Câu Sai',
      icon: <BookmarkCheck size={15} className="text-amber-300" />,
    },
    {
      id: 'listening',
      label: 'Luyện Nghe IELTS',
      icon: <Headphones size={15} />,
    },
    {
      id: 'writing',
      label: 'Writing Task 1',
      icon: <PenLine size={15} />,
    },
    {
      id: 'speaking',
      label: 'Speaking Mock',
      icon: <Mic size={15} />,
    },
    {
      id: 'anki',
      label: 'Anki Flashcard (SRS)',
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
          <button
            onClick={() => onSelectScreen(currentUser ? 'reading' : 'landing')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg select-none text-left"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white p-1 border border-amber-400/40 shadow-sm group-hover:border-amber-400 group-hover:shadow-amber-400/20 group-hover:scale-105 transition-all duration-200 shrink-0 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="EduFlow Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-sans font-bold tracking-tight text-white leading-tight">
                  EduFlow
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#032B20]/90 text-amber-300 border border-amber-400/30 whitespace-nowrap leading-none tracking-wide shadow-xs">
                  Cambridge &amp; Anki
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/80 font-sans tracking-normal leading-tight whitespace-nowrap mt-0.5 hidden sm:block">
                Luyện thi Cambridge IELTS &amp; Học từ vựng Anki
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs - Perfectly Centered */}
        <nav className="hidden md:flex items-center justify-center gap-1 bg-[#022C22]/80 p-1 rounded-full border border-emerald-900/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive =
              currentScreen === link.id ||
              (link.id === 'reading' && (currentScreen === 'reading-test' || currentScreen === 'library' || currentScreen === 'reader')) ||
              (link.id === 'listening' && (currentScreen === 'listening-test' || currentScreen === 'listening-exam' || currentScreen === 'listening-review')) ||
              (link.id === 'anki' && currentScreen === 'vault');

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
                  {link.label}
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
                        {currentUser.role === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}
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
                          onSelectScreen('vault');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-forest-950 transition-colors cursor-pointer"
                      >
                        <Bookmark size={14} />
                        Sổ Tay Từ Vựng (SRS)
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
