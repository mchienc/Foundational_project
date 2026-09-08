import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  LogIn,
  Menu,
  X,
} from 'lucide-react';
import { User, Screen } from '../../types';

interface PublicNavbarProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onNavigateScreen: (screen: Screen) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Về EduFlow', href: '#about' },
    { label: 'Phương Pháp AI', href: '#methodology' },
    { label: 'Lộ Trình Đào Tạo', href: '#programs' },
    { label: '5 Tính Năng AI', href: '#features' },
    { label: 'Đánh Giá Học Viên', href: '#reviews' },
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
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigateScreen('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-navy via-brand-primary to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-slate-900 tracking-tight text-lg leading-tight">
                EduFlow
                <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-200">
                  AI EdTech
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Hệ Sinh Thái Học Tiếng Anh Tương Tác
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-600">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="hover:text-brand-primary transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {currentUser ? (
            <button
              onClick={() => onNavigateScreen('dashboard')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-primary text-white text-xs font-black shadow-md shadow-blue-500/25 hover:from-blue-900 hover:to-indigo-700 active:scale-95 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                  alt={currentUser.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Vào Bàn Học ({currentUser.full_name})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <>
              {/* Ghost Button Login */}
              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-primary hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng Nhập</span>
              </button>

              {/* Primary Solid Button Sign Up */}
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-extrabold shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Trải Nghiệm Miễn Phí</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {currentUser ? (
            <button
              onClick={() => onNavigateScreen('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold"
            >
              Vào Bàn Học
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
            >
              Đăng Nhập
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-brand-primary border-b border-slate-100"
            >
              {link.label}
            </a>
          ))}
          {!currentUser && (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="w-full py-2.5 rounded-xl bg-brand-primary text-white font-bold text-xs text-center"
              >
                Trải Nghiệm Miễn Phí
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
