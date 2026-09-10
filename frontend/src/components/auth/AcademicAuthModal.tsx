import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
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
  title = 'Đăng nhập để bắt đầu học và lưu kết quả',
  subtitle = 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.',
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setError(null);
    }
  }, [isOpen, initialTab]);

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [regFullName, setRegFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    const isAdmin = loginEmail.toLowerCase().includes('admin');
    const user: User = {
      id: isAdmin ? 'user-admin-1' : `user-${Date.now()}`,
      email: loginEmail,
      full_name: isAdmin ? 'Quản Trị Viên (Admin)' : (loginEmail.includes('dangchien') ? 'Minh Chiến Đặng' : loginEmail.split('@')[0]),
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
      setError('Vui lòng điền đầy đủ họ tên, email và mật khẩu.');
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
      role: 'student',
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

            {/* Header */}
            <div className="space-y-3 text-center pt-2">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-0.5 border border-amber-400/60 shadow-md mx-auto">
                <img src="/logo.jpg" alt="EduFlow Logo" className="w-full h-full object-cover rounded-xl" />
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#064E3B] tracking-normal leading-snug">
                {tab === 'login' ? (title || 'Đăng Nhập Tài Khoản') : 'Đăng Ký Tài Khoản Học Viên'}
              </h3>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
                {tab === 'login'
                  ? (subtitle || 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.')
                  : 'Tạo tài khoản học viên miễn phí để luyện đề thi, nghe chép chính tả và học từ vựng.'}
              </p>

              {/* Tab Toggle */}
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
                      ? 'bg-[#064E3B] text-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Đăng Ký
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
                      Email
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
                        placeholder="ten@eduflow.vn"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-forest-900 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                        Mật Khẩu
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Vui lòng liên hệ quản trị viên để khôi phục mật khẩu.');
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
                    <span>Đăng Nhập Ngay</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: ĐĂNG KÝ MỚI */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Họ và Tên
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
                    Email
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
                      Xác Nhận Mật Khẩu
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Đăng Ký Tài Khoản Học Viên</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
