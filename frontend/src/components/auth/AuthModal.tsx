import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Zap,
  Flame,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { User } from '../../types';
import { modalScaleVariants } from '../../styles/motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, isNewRegistration?: boolean) => void;
  initialTab?: 'login' | 'register';
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'login',
  title = 'Đăng nhập EduFlow để lưu lộ trình và nhận 2250 XP',
  subtitle = 'Trải nghiệm không gian học tập tương tác với 5 phân hệ AI chuyên sâu',
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  // Synchronize tab when modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setError(null);
    }
  }, [isOpen, initialTab]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('dangchien2005@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('123456');

  // Register form state
  const [regFullName, setRegFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [regRole, setRegRole] = useState<'student' | 'admin'>('student');

  // Error message
  const [error, setError] = useState<string | null>(null);

  // Quick Preset Logins
  const handleQuickLogin = (role: 'student' | 'admin') => {
    if (role === 'student') {
      const studentUser: User = {
        id: 'user-student-3',
        email: 'dangchien2005@gmail.com',
        full_name: 'Minh Chiến Đặng',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      };
      onSuccess(studentUser);
      onClose();
    } else {
      const adminUser: User = {
        id: 'user-admin-1',
        email: 'admin@example.com',
        full_name: 'Quản Trị Viên (Admin)',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      };
      onSuccess(adminUser);
      onClose();
    }
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Role detection
    const isAdmin = loginEmail.includes('admin');
    const user: User = {
      id: `user-${Date.now()}`,
      email: loginEmail,
      full_name: isAdmin ? 'Quản Trị Viên' : 'Minh Chiến Đặng',
      role: isAdmin ? 'admin' : 'student',
      avatar: isAdmin
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    };

    onSuccess(user);
    onClose();
  };

  // Submit Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regFullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: regEmail,
      full_name: regFullName,
      role: regRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    };

    onSuccess(newUser, true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl z-10 p-6 sm:p-8 space-y-5 overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-navy via-brand-primary to-blue-500" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header & Value Proposition */}
            <div className="space-y-3 text-center pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shadow-xs">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>+2250 XP Khởi Đầu</span>
                <span className="text-slate-300">•</span>
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>Chuỗi Streak 14 Ngày</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {title}
              </h3>

              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {subtitle}
              </p>

              {/* Tabs Switcher */}
              <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setError(null);
                  }}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === 'login'
                      ? 'bg-white text-brand-primary shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setError(null);
                  }}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === 'register'
                      ? 'bg-white text-brand-primary shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đăng Ký Tài Khoản
                </button>
              </div>
            </div>

            {/* Error message alert */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Tab: ĐĂNG NHẬP */}
            {tab === 'login' && (
              <div className="space-y-4">
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-700">Email đăng nhập</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Vui lòng chọn nút Đăng nhập nhanh bên dưới để vào tài khoản ngay.');
                        }}
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-navy to-brand-primary text-white text-xs font-black uppercase tracking-wider shadow-md hover:from-blue-900 hover:to-indigo-700 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Vào Bàn Học Ngay</span>
                    <ArrowRight size={14} />
                  </button>
                </form>

                {/* 1-Click Fast Logins */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    ⚡ Hoặc đăng nhập nhanh 1 chạm:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('student')}
                      className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs text-left"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 font-black">
                        HV
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate font-black">Minh Chiến Đặng</div>
                        <div className="text-[10px] text-blue-600 font-normal">2250 XP • 14 ngày Streak</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin('admin')}
                      className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs text-left"
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] shrink-0 font-black">
                        AD
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate font-black">Quản Trị Viên</div>
                        <div className="text-[10px] text-purple-600 font-normal">Toàn quyền hệ thống</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: ĐĂNG KÝ */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Họ và tên của bạn</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Ví dụ: Đặng Minh Chiến"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email liên hệ</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Xác nhận</label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-semibold text-slate-700">Mục đích học tập</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`p-2 rounded-xl border text-xs font-bold text-center transition-colors cursor-pointer ${
                        regRole === 'student'
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Học Viên Tiếng Anh
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('admin')}
                      className={`p-2 rounded-xl border text-xs font-bold text-center transition-colors cursor-pointer ${
                        regRole === 'admin'
                          ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Quản Trị Viên
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-navy to-brand-primary text-white text-xs font-black uppercase tracking-wider shadow-md hover:from-blue-900 hover:to-indigo-700 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Sparkles size={14} />
                  <span>Hoàn Tất &amp; Nhận 2250 XP</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
