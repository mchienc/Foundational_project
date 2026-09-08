import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Zap,
  Flame,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { User } from '../../types';
import { modalScaleVariants } from '../../styles/motion';

interface AcademicAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, isNewRegistration?: boolean) => void;
  initialTab?: 'login' | 'register';
  title?: string;
  subtitle?: string;
}

export const AcademicAuthModal: React.FC<AcademicAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'login',
  title = 'Đăng nhập để khởi tạo hồ sơ học thuật và bảo lưu tiến độ 14 ngày',
  subtitle = 'Nhận ngay 2250 XP học bổng nghiên cứu và mở khóa trọn bộ 5 phân hệ tương tác',
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setError(null);
    }
  }, [isOpen, initialTab]);

  const [loginEmail, setLoginEmail] = useState<string>('dangchien2005@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('123456');

  const [regFullName, setRegFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [regRole, setRegRole] = useState<'student' | 'admin'>('student');

  const [error, setError] = useState<string | null>(null);

  const handleQuickLogin = (role: 'student' | 'admin') => {
    if (role === 'student') {
      const studentUser: User = {
        id: 'user-student-3',
        email: 'dangchien2005@gmail.com',
        full_name: 'Minh Chiến Đặng',
        role: 'student',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      };
      onSuccess(studentUser);
      onClose();
    } else {
      const adminUser: User = {
        id: 'user-admin-1',
        email: 'admin@example.com',
        full_name: 'GS. Viện Trưởng Khảo Thí (Admin)',
        role: 'admin',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      };
      onSuccess(adminUser);
      onClose();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Vui lòng cung cấp thư điện tử và mật khẩu bảo mật.');
      return;
    }

    const isAdmin = loginEmail.includes('admin');
    const user: User = {
      id: `user-${Date.now()}`,
      email: loginEmail,
      full_name: isAdmin ? 'GS. Viện Trưởng Khảo Thí' : 'Minh Chiến Đặng',
      role: isAdmin ? 'admin' : 'student',
      avatar: isAdmin
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    };

    onSuccess(user);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regFullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Vui lòng điền đầy đủ các trường thông tin học thuật.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Xác nhận mật khẩu không khớp với bản gốc.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Mật khẩu bảo mật phải tối thiểu 6 ký tự.');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: regEmail,
      full_name: regFullName,
      role: regRole,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    };

    onSuccess(newUser, true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-[#FAFAF9] rounded-3xl border border-stone-300 shadow-2xl z-10 p-6 sm:p-8 space-y-5 overflow-hidden text-stone-900"
          >
            {/* Academic Gold & Forest Double Accent Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-forest-900 via-gold-600 to-forest-950" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X size={18} />
            </button>

            {/* Header & Scholarly Crest */}
            <div className="space-y-3 text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#064E3B] border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto shadow-md">
                <BookOpen size={22} className="text-amber-300" />
              </div>

              {/* Scholarship Grant Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-bold tracking-normal">
                <Zap className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                <span>+2250 XP Học Bổng</span>
                <span className="text-amber-400">•</span>
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Bảo Lưu Chuỗi 14 Ngày</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#064E3B] tracking-normal leading-snug">
                {title}
              </h3>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
                {subtitle}
              </p>

              {/* Academic Tab Toggle */}
              <div className="inline-flex p-1 rounded-full bg-stone-200/80 border border-stone-300">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setError(null);
                  }}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === 'login'
                      ? 'bg-[#064E3B] text-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Đăng Nhập Hồ Sơ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setError(null);
                  }}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === 'register'
                      ? 'bg-[#064E3B] text-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Khởi Tạo Hồ Sơ Mới
                </button>
              </div>
            </div>

            {/* Error message alert */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Tab 1: ĐĂNG NHẬP */}
            {tab === 'login' && (
              <div className="space-y-4">
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                      Hòm Thư Nghiên Cứu (Email)
                    </label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                      />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="ten.nghiencuu@eduflow.vn"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-forest-900 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                        Mật Khẩu Xác Thực
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Vui lòng sử dụng cơ chế Đăng nhập 1 chạm bên dưới để truy cập tức thì.');
                        }}
                        className="text-[11px] text-gold-700 hover:underline"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                      />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-forest-900 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Vào Bàn Học Nghiên Cứu</span>
                    <ArrowRight size={14} />
                  </button>
                </form>

                {/* 1-Click Fast Academic Credentials */}
                <div className="pt-3 border-t border-stone-200 space-y-2 text-center">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                    — Hoặc Đăng Nhập 1 Chạm Theo Danh Nghĩa —
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('student')}
                      className="p-2.5 rounded-xl bg-white hover:bg-gold-50/60 text-forest-950 border border-stone-300 hover:border-gold-400 transition-all flex items-center gap-2.5 cursor-pointer shadow-xs text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-forest-900 text-gold-300 flex items-center justify-center text-xs shrink-0 font-sans font-bold">
                        ĐC
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate font-bold text-xs">Minh Chiến Đặng</div>
                        <div className="text-[10px] text-gold-700 font-medium">
                          2250 XP • Chuỗi 14 ngày
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin('admin')}
                      className="p-2.5 rounded-xl bg-white hover:bg-forest-50/60 text-forest-950 border border-stone-300 hover:border-forest-700 transition-all flex items-center gap-2.5 cursor-pointer shadow-xs text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gold-700 text-white flex items-center justify-center text-xs shrink-0 font-sans font-bold">
                        VT
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate font-bold text-xs">Viện Trưởng Khảo Thí</div>
                        <div className="text-[10px] text-forest-700 font-medium">
                          Toàn quyền học thuật
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: ĐĂNG KÝ HỒ SƠ MỚI */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Danh Xưng Học Thuật (Họ và Tên)
                  </label>
                  <div className="relative">
                    <UserIcon
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Ví dụ: Đặng Minh Chiến"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-forest-900 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Hòm Thư Liên Lạc
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ten@example.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-forest-900 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                      Xác Nhận
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Trùng khớp mật khẩu"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Mục Tiêu Nghiên Cứu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`p-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        regRole === 'student'
                          ? 'bg-forest-950 text-gold-300 border-gold-500/50 shadow-xs'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Học Viên Luyện Đề
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('admin')}
                      className={`p-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        regRole === 'admin'
                          ? 'bg-gold-700 text-white border-gold-800 shadow-xs'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Hội Đồng Khảo Thí
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Sparkles size={14} className="text-amber-200" />
                  <span>Hoàn Tất Khởi Tạo &amp; Nhận 2250 XP</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
