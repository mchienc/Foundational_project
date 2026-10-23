import React, { useState } from 'react';
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
} from 'lucide-react';
import { User, Screen } from '../../types';
import { Logo } from '../common/Logo';

interface AcademicNavbarProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onNavigateScreen: (screen: Screen) => void;
}

export const AcademicNavbar: React.FC<AcademicNavbarProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
            <button
              onClick={() => onNavigateScreen('reading')}
              className="flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full hover:bg-emerald-900/60 border border-emerald-800/60 hover:border-emerald-700/80 transition-colors cursor-pointer select-none bg-emerald-950/40"
              title="Không gian học tập"
            >
              <div className="w-8 h-8 rounded-full bg-[#022C22] ring-2 ring-amber-500/40 text-amber-300 flex items-center justify-center font-sans font-bold text-xs shadow-xs overflow-hidden shrink-0">
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
              <span className="text-xs font-bold text-stone-100 hidden md:inline max-w-[120px] truncate">
                {currentUser.full_name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-800/80 text-amber-200 border border-emerald-700">
                {currentUser.role === 'admin' ? 'Admin' : 'Học Viên'}
              </span>
              <ChevronDown size={14} className="text-stone-300" />
            </button>
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateScreen('reading');
                }}
                className="w-full py-2.5 px-3 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-stone-100 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#022C22] ring-2 ring-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
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
                  <span>{currentUser.full_name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-800/80 text-amber-200 border border-emerald-700">
                  {currentUser.role === 'admin' ? 'Admin' : 'Học Viên'}
                </span>
              </button>
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
