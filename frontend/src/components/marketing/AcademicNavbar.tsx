import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Compass,
  ChevronDown,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Youtube,
  Layers,
  User as UserIcon,
  ClipboardList,
  Lock,
  Shield,
  LogOut,
  Crown,
} from 'lucide-react';
import { User, Screen } from '../../types';
import { Logo } from '../common/Logo';
import { useProStore } from '../../modules/pro/useProStore';

interface AcademicNavbarProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onNavigateScreen: (screen: Screen, tab?: any) => void;
  onLogout?: () => void;
}

export const AcademicNavbar: React.FC<AcademicNavbarProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateScreen,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const isProStore = useProStore((state) => state.isPro);
  const planName = useProStore((state) => state.planName);
  const isProUser = Boolean(currentUser?.isPro) || isProStore;
  const proPackageTitle = currentUser?.proPackage || planName || 'eng4u PRO';

  const navLinks: {
    label: string;
    href?: string;
    screen?: Screen;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      label: 'Luyện Reading',
      screen: 'reading',
      icon: <BookOpen size={15} />,
    },
    {
      label: 'Luyện Listening',
      screen: 'listening',
      icon: <Headphones size={15} />,
    },
    {
      label: 'Luyện Viết',
      screen: 'writing',
      badge: 'PRO',
      icon: <PenTool size={15} />,
    },
    {
      label: 'Luyện Nói',
      screen: 'speaking',
      badge: 'PRO',
      icon: <Mic size={15} />,
    },
    {
      label: 'Chép chính tả',
      screen: 'dictation',
      icon: <Youtube size={15} />,
    },
    {
      label: 'Flashcard',
      screen: 'anki',
      icon: <Layers size={15} />,
    },
  ];

  const handleNavClick = (e: React.MouseEvent, item: (typeof navLinks)[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item.screen) {
      if (!currentUser) {
        onOpenAuth('login', `Đăng nhập để: ${item.label}`);
        return;
      }
      onNavigateScreen(item.screen);
    } else if (item.href) {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] border-b border-emerald-800/80 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - 100% Unified with Inside Navbar */}
        <div className="flex items-center shrink-0">
          <Logo
            variant="full"
            theme="dark"
            onClick={() => onNavigateScreen('landing')}
          />
        </div>

        {/* Center Desktop Navigation Tabs - Perfectly Centered Dark Capsule */}
        <nav className="hidden md:flex items-center justify-center gap-1 bg-[#022C22]/80 p-1 rounded-full border border-emerald-900/60 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={(e) => handleNavClick(e, link)}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-stone-200 hover:text-amber-300 hover:bg-emerald-900/50 transition-colors cursor-pointer select-none"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-900 border border-amber-300 shadow-2xs leading-none">
                    {link.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* Right CTA Actions Area */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full transition-all cursor-pointer select-none ${
                  isProUser
                    ? 'border-2 border-amber-400 bg-gradient-to-r from-emerald-950 via-[#063e30] to-amber-950/70 hover:to-amber-900/80 shadow-md shadow-amber-500/25 ring-1 ring-amber-300/40'
                    : 'hover:bg-emerald-900/60 border border-emerald-800/60 hover:border-emerald-700/80 bg-emerald-950/40'
                }`}
                title={isProUser ? 'Thành viên eng4u PRO VIP' : 'Tài khoản học viên'}
              >
                <div className="relative shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full bg-[#022C22] flex items-center justify-center font-sans font-bold text-xs shadow-xs overflow-hidden ${
                      isProUser
                        ? 'ring-2 ring-amber-400 text-amber-300'
                        : 'ring-2 ring-amber-500/40 text-amber-300'
                    }`}
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{currentUser.full_name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  {isProUser && (
                    <span
                      title="Tài khoản PRO"
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-950 flex items-center justify-center text-[9px] shadow-xs ring-1 ring-emerald-950 font-black select-none"
                    >
                      👑
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-stone-100 hidden md:inline max-w-[120px] truncate">
                  {currentUser.full_name}
                </span>
                {currentUser.role === 'admin' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-amber-400 text-stone-950 uppercase shadow-xs flex items-center gap-1">
                    <span>Admin</span>
                    {isProUser && <span className="text-[9px]">👑</span>}
                  </span>
                ) : isProUser ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-stone-950 uppercase shadow-xs border border-amber-300">
                    <Crown size={11} className="fill-stone-950 text-stone-950" />
                    <span>PRO</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-800/80 text-amber-200 border border-emerald-700">
                    Học Viên
                  </span>
                )}
                <ChevronDown size={14} className={`${isProUser ? 'text-amber-300' : 'text-stone-300'} transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Backdrop để đóng dropdown khi click ra ngoài */}
              {showUserMenu && (
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowUserMenu(false)}
                />
              )}

              {/* User Dropdown Menu */}
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
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-[#064E3B] to-emerald-700 text-amber-300 flex items-center justify-center font-sans font-bold text-sm shrink-0 border ${
                              isProUser ? 'border-amber-400 ring-2 ring-amber-400/60' : 'border-amber-400/50'
                            } shadow-2xs`}
                          >
                            {currentUser.avatar ? (
                              <img
                                src={currentUser.avatar}
                                alt={currentUser.full_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{currentUser.full_name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          {isProUser && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-stone-950 flex items-center justify-center text-[9px] shadow-xs ring-1 ring-white">
                              👑
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <p className="font-bold text-stone-900 truncate font-sans text-sm">{currentUser.full_name}</p>
                            {isProUser ? (
                              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 border border-amber-400">
                                <Crown size={10} className="fill-stone-950" />
                                <span>PRO</span>
                              </span>
                            ) : (
                              <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                {currentUser.role === 'admin' ? 'Quản Trị' : 'Học Viên'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">{currentUser.email}</p>
                        </div>
                      </div>

                      {/* Target Band Pill or Pro VIP Banner */}
                      {isProUser ? (
                        <div className="mt-2.5 p-2 rounded-xl bg-gradient-to-r from-amber-100/90 via-yellow-100/80 to-amber-100/90 border border-amber-300 flex items-center justify-between gap-2 shadow-2xs">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Crown size={13} className="text-amber-700 fill-amber-500 shrink-0" />
                            <span className="text-[11px] font-bold text-amber-950 truncate">{proPackageTitle}</span>
                          </div>
                          <span className="shrink-0 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-white">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#064E3B] border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Mục tiêu: Band {currentUser.targetBand || '7.5+'} IELTS</span>
                        </div>
                      )}
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigateScreen('profile', 'info');
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors cursor-pointer text-left"
                      >
                        <UserIcon size={14} className="text-[#064E3B]" />
                        <span>Hồ sơ cá nhân &amp; Avatar</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigateScreen('profile', 'history');
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors cursor-pointer text-left"
                      >
                        <ClipboardList size={14} className="text-[#064E3B]" />
                        <span>Lịch sử làm bài Cambridge</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigateScreen('profile', 'password');
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors cursor-pointer text-left"
                      >
                        <Lock size={14} className="text-emerald-700" />
                        <span>Bảo mật &amp; Mật khẩu</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigateScreen('reading');
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-stone-700 hover:bg-stone-100 hover:text-stone-950 transition-colors cursor-pointer text-left"
                      >
                        <BookOpen size={14} className="text-[#064E3B]" />
                        <span>Vào không gian học tập</span>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onNavigateScreen('admin');
                          }}
                          className="w-full px-4 py-2 flex items-center gap-2.5 text-purple-700 hover:bg-purple-50 font-semibold transition-colors cursor-pointer text-left"
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
                          setShowUserMenu(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 font-medium transition-colors cursor-pointer text-left"
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
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-semibold text-stone-200 hover:text-amber-300 px-3 py-1.5 transition-colors cursor-pointer"
              >
                Đăng Nhập
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-white" />
                <span>Bắt Đầu Học Ngay</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-900/60 bg-[#022018] px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={(e) => handleNavClick(e, link)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-200 hover:bg-emerald-900/50 hover:text-amber-300 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-stone-900 border border-amber-300 shadow-2xs leading-none">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-900/60 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-2xl text-stone-100 ${
                    isProUser
                      ? 'bg-gradient-to-r from-emerald-950 via-[#063e30] to-amber-950/70 border-2 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-emerald-950/60 border border-emerald-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full bg-[#022C22] flex items-center justify-center font-bold text-xs overflow-hidden ${
                          isProUser ? 'ring-2 ring-amber-400 text-amber-300' : 'ring-2 ring-amber-500/40 text-amber-300'
                        }`}
                      >
                        {currentUser.avatar ? (
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{currentUser.full_name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      {isProUser && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-950 flex items-center justify-center text-[9px] shadow-xs font-black ring-1 ring-emerald-950">
                          👑
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-white truncate">{currentUser.full_name}</p>
                        {isProUser && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950">
                            👑 PRO
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-emerald-300 font-mono truncate">{currentUser.email}</p>
                    </div>
                    {isProUser ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 shadow-xs border border-amber-300">
                        PRO VIP
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-stone-950">
                        {currentUser.role === 'admin' ? 'Admin' : 'Học Viên'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateScreen('profile', 'info');
                    }}
                    className="py-2 px-3 rounded-xl bg-emerald-900/40 border border-emerald-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-800/50 cursor-pointer"
                  >
                    <UserIcon size={13} className="text-amber-300" />
                    <span>Hồ sơ cá nhân</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateScreen('profile', 'history');
                    }}
                    className="py-2 px-3 rounded-xl bg-emerald-900/40 border border-emerald-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-800/50 cursor-pointer"
                  >
                    <ClipboardList size={13} className="text-amber-300" />
                    <span>Lịch sử thi</span>
                  </button>
                </div>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateScreen('admin');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-purple-900/40 border border-purple-700/60 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Shield size={13} />
                    <span>Quản Trị Hệ Thống</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-rose-900/50 cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2.5 rounded-xl border border-emerald-800/60 text-xs font-bold text-stone-200 text-center hover:bg-emerald-900/40"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold text-center"
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
