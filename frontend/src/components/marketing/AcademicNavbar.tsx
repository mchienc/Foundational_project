import React, { useState } from 'react';
import {
  PenTool,
  ArrowRight,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { User, Screen } from '../../types';

interface AcademicNavbarProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onNavigateScreen: (screen: Screen) => void;
}

export const AcademicNavbar: React.FC<AcademicNavbarProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Luận Điểm AI', href: '#methodology' },
    { label: '5 Phân Hệ Học Thuật', href: '#chapters' },
    { label: 'Khảo Thí & Lộ Trình', href: '#programs' },
    { label: 'Biểu Phí & Khảo Sát', href: '#tuition' },
    { label: 'Minh Chứng Nghiên Cứu', href: '#evidence' },
  ];

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#032B20] border-b border-emerald-900/90 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Academic Brand Mark */}
        <div
          onClick={() => onNavigateScreen('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-900 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <PenTool size={20} className="text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-sans font-bold text-white text-xl leading-tight">
              EduFlow
              <span className="font-sans text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 tracking-wider">
                Institute
              </span>
            </div>
            <span className="text-[10px] text-stone-300 font-mono tracking-wider block">
              Viện Công Nghệ Ngôn Ngữ Học
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-stone-100 font-sans tracking-wide">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="hover:text-amber-300 transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {currentUser ? (
            <button
              onClick={() => onNavigateScreen('dashboard')}
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
              <span>Bàn Học Cá Nhân ({currentUser.full_name})</span>
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
                <span>Bắt Đầu Nghiên Cứu</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-200 hover:bg-forest-900 transition-colors"
            title="Menu điều hướng"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-300 bg-[#FAFAF9] px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block px-3 py-2 rounded-lg text-xs font-bold text-stone-800 hover:bg-stone-200/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateScreen('dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Vào Bàn Học ({currentUser.full_name})</span>
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
                  Gia Nhập
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
