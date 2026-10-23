import React, { useState } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { User, Screen } from '../../types';

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

  const navLinks: { label: string; href?: string; screen?: Screen; badge?: string }[] = [
    { label: 'Luyện Reading', screen: 'reading' },
    { label: 'Luyện Listening', screen: 'listening-exam' },
    { label: 'Luyện Viết', screen: 'writing', badge: 'PRO' },
    { label: 'Luyện Nói', screen: 'speaking', badge: 'PRO' },
    { label: 'Chép chính tả', screen: 'dictation', badge: 'MỚI' },
    { label: 'Flashcard', screen: 'anki' },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navLinks[0]) => {
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
        <div
          onClick={() => onNavigateScreen('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none text-left"
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
                Cambridge &amp; Flashcard
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-emerald-200/80 font-sans tracking-normal leading-tight whitespace-nowrap mt-0.5 hidden sm:block">
              Luyện thi Cambridge IELTS &amp; Học từ vựng Flashcard
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-100 font-sans tracking-wide">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={(e) => handleNavClick(e, link)}
              className="hover:text-amber-300 transition-colors py-1 cursor-pointer flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-mono text-[9px] font-extrabold uppercase">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {currentUser ? (
            <button
              onClick={() => onNavigateScreen('reading')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-stone-100 border border-amber-400/40 text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-400/50">
                <img
                  src={
                    currentUser.avatar ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                  }
                  alt={currentUser.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Xin chào, {currentUser.full_name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-bold text-stone-200 hover:text-amber-300 px-3 py-2 transition-colors cursor-pointer"
              >
                Đăng Nhập
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-white" />
                <span>Bắt Đầu Học Ngay</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-forest-900 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-300 bg-[#FAFAF9] px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={(e) => handleNavClick(e, link)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-stone-800 hover:bg-stone-200/60 text-left"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-mono text-[9px] font-extrabold uppercase">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateScreen('reading');
                }}
                className="w-full py-2.5 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Xin chào, {currentUser.full_name}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-800 text-center"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2.5 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold text-center"
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
