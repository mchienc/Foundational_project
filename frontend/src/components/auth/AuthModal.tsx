import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, X, Mail, Lock, User as UserIcon, Shield } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../common/Button';
import { modalScaleVariants } from '../../styles/motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, isNewRegistration?: boolean) => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'login',
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl z-10 p-6 sm:p-8 space-y-6 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header / Tabs */}
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
                {tab === 'login' ? <LogIn size={22} /> : <UserPlus size={22} />}
              </div>

              <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setError(null);
                  }}
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    tab === 'login' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    tab === 'register' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
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
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Vui lòng liên hệ Admin để khôi phục mật khẩu hoặc dùng Preset đăng nhập nhanh bên dưới.'); }} className="text-[11px] text-blue-600 hover:underline">
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

                  <Button variant="primary" size="md" type="submit" className="w-full mt-2 font-bold">
                    Đăng Nhập Hệ Thống
                  </Button>
                </form>

                {/* Quick Presets for Convenience */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Hoặc đăng nhập nhanh 1 chạm:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('student')}
                      className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-medium border border-blue-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <UserIcon size={14} className="text-blue-600" />
                      Học Viên Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('admin')}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-medium border border-purple-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Shield size={14} className="text-purple-600" />
                      Admin Demo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: ĐĂNG KÝ */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Họ và tên</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email</label>
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
                      placeholder="Ít nhất 6 ký tự"
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
                  <label className="text-xs font-semibold text-slate-700">Vai trò của bạn</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-colors cursor-pointer ${
                        regRole === 'student'
                          ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Học Viên
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('admin')}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-colors cursor-pointer ${
                        regRole === 'admin'
                          ? 'bg-purple-50 border-purple-400 text-purple-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Quản Trị Viên (Admin)
                    </button>
                  </div>
                </div>

                <Button variant="primary" size="md" type="submit" className="w-full mt-3 font-bold">
                  Hoàn Tất Đăng Ký
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
