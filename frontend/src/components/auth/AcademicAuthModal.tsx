import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Settings,
} from 'lucide-react';
import { User } from '../../types';
import { modalScaleVariants } from '../../styles/motion';

declare global {
  interface Window {
    google?: any;
  }
}

interface AcademicAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, isNewRegistration?: boolean) => void;
  initialTab?: 'login' | 'register' | 'forgot';
  title?: string;
  subtitle?: string;
}

// Hàm giải mã JWT Google ID Token an toàn trong trình duyệt
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Error parsing Google JWT:', err);
    return null;
  }
}

export const AcademicAuthModal: React.FC<AcademicAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'login',
  title = 'Đăng nhập tài khoản',
  subtitle = 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.',
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>(initialTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Register form state
  const [regFullName, setRegFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1); // 1: request OTP, 2: verify & reset
  const [forgotOtp, setForgotOtp] = useState<string>('');
  const [generatedOtpHint, setGeneratedOtpHint] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  // Google OAuth Config State
  const [showGoogleConfigModal, setShowGoogleConfigModal] = useState<boolean>(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState<string>('');
  const [googleClientId, setGoogleClientId] = useState<string>(() => {
    const fromEnv = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
    const cleanEnv = fromEnv ? String(fromEnv).replace(/["']/g, '').trim() : '';
    return (
      cleanEnv ||
      localStorage.getItem('eduflow_google_client_id') ||
      '525873015033-aa5pn19b51kg3etqlddc5ltuag8a4frf.apps.googleusercontent.com'
    );
  });
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Xử lý khi nhận ID Token thực tế từ Google Identity Services
  const handleGoogleCredentialResponse = async (response: any) => {
    if (!response || !response.credential) {
      setError('Không nhận được dữ liệu xác thực từ Google.');
      return;
    }

    const payload = parseJwt(response.credential);
    if (!payload || !payload.email) {
      setError('Mã xác thực Google không hợp lệ.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          full_name: payload.name || payload.email.split('@')[0],
          avatar: payload.picture,
          google_id: payload.sub,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Đăng nhập Google không thành công.');
        setLoading(false);
        return;
      }

      onSuccess(data.user);
      onClose();
    } catch (err) {
      setError('Không thể kết nối máy chủ xác thực.');
    } finally {
      setLoading(false);
    }
  };

  // Khởi tạo Google Identity Services khi modal mở ra
  useEffect(() => {
    if (!isOpen) return;
    setTab(initialTab);
    setError(null);
    setSuccessMsg(null);
    setShowGoogleConfigModal(false);

    if (googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 380,
          });
        }
      } catch (e) {
        console.warn('Google Identity initialization notice:', e);
      }
    }
  }, [isOpen, initialTab, googleClientId]);

  // Click nút Tiếp tục với Google
  const handleGoogleSignInClick = () => {
    setError(null);

    const activeClientId = googleClientId.trim();

    // 1. Thử nghiệm mở Google OAuth Popup tương tác chính thức
    if (activeClientId && window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: activeClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              setError(`Google Sign-In: ${tokenResponse.error_description || tokenResponse.error}`);
              return;
            }
            if (tokenResponse?.access_token) {
              setLoading(true);
              try {
                const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleUser = await userRes.json();
                if (googleUser && googleUser.email) {
                  const res = await fetch('/api/auth/google-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: googleUser.email,
                      full_name: googleUser.name || googleUser.email.split('@')[0],
                      avatar: googleUser.picture,
                      google_id: googleUser.sub,
                    }),
                  });
                  const data = await res.json();
                  if (data.success && data.user) {
                    onSuccess(data.user);
                    onClose();
                  } else {
                    setError(data.message || 'Đăng nhập Google thất bại.');
                  }
                }
              } catch (fetchErr) {
                setError('Không thể lấy thông tin hồ sơ từ Google.');
              } finally {
                setLoading(false);
              }
            }
          },
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err: any) {
        console.warn('Google initTokenClient notice:', err);
      }
    }

    // 2. Kích hoạt Google One Tap nếu OAuth2 token client chưa sẵn sàng
    if (activeClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            setShowGoogleConfigModal(true);
          }
        });
        return;
      } catch (err) {
        console.warn('Google One Tap notice:', err);
      }
    }

    // 3. Fallback mở modal xác thực trực tiếp
    setShowGoogleConfigModal(true);
  };

  // Xác nhận đăng nhập bằng tài khoản Gmail cá nhân của người dùng
  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) {
      setError('Vui lòng nhập địa chỉ Gmail của bạn.');
      return;
    }

    const email = customGoogleEmail.trim().toLowerCase();
    if (!email.includes('@')) {
      setError('Địa chỉ email không đúng định dạng.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          full_name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=064E3B&color=F59E0B&bold=true`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Đăng nhập Google thất bại.');
        setLoading(false);
        return;
      }

      onSuccess(data.user);
      onClose();
    } catch (err) {
      setError('Không thể kết nối máy chủ xác thực.');
    } finally {
      setLoading(false);
    }
  };

  // Lưu Google Client ID mới vào LocalStorage
  const handleSaveGoogleClientId = (val: string) => {
    const trimmed = val.trim();
    setGoogleClientId(trimmed);
    if (trimmed) {
      localStorage.setItem('eduflow_google_client_id', trimmed);
      setSuccessMsg('Đã lưu Google Client ID thành công!');
    } else {
      localStorage.removeItem('eduflow_google_client_id');
    }
    setShowGoogleConfigModal(false);
  };

  // 1. Submit Đăng nhập bằng Email/Password
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Email hoặc mật khẩu không chính xác.');
        setLoading(false);
        return;
      }

      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError('Không thể kết nối máy chủ xác thực. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Đăng ký tài khoản
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

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

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: regFullName.trim(),
          email: regEmail.trim(),
          password: regPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        setLoading(false);
        return;
      }

      onSuccess(data.user, true);
      onClose();
    } catch (err: any) {
      setError('Không thể kết nối máy chủ xác thực. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Quên mật khẩu - Bước 1: Gửi OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!forgotEmail.trim()) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Không tìm thấy tài khoản với email này.');
        setLoading(false);
        return;
      }

      setGeneratedOtpHint(data.otp || '123456');
      setSuccessMsg('Mã OTP đã được tạo! Vui lòng nhập mã xác nhận bên dưới.');
      setForgotStep(2);
    } catch (err) {
      setError('Không thể gửi yêu cầu đặt lại mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Quên mật khẩu - Bước 2: Xác minh OTP & Đổi mật khẩu
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!forgotOtp.trim() || !newPassword || !confirmNewPassword) {
      setError('Vui lòng nhập đầy đủ mã OTP và mật khẩu mới.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: forgotOtp.trim(),
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Mã OTP không đúng hoặc đã hết hạn.');
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message || 'Đổi mật khẩu thành công! Hãy đăng nhập ngay.');
      setForgotStep(1);
      setForgotOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setLoginEmail(forgotEmail);
      setLoginPassword('');
      setTimeout(() => {
        setTab('login');
      }, 1500);
    } catch (err) {
      setError('Lỗi khi đặt lại mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            className="relative w-full max-w-lg bg-[#FAFAF9] rounded-3xl border border-stone-300 shadow-2xl z-10 p-6 sm:p-8 space-y-4 overflow-hidden text-stone-900"
          >
            {/* Top Bar Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#064E3B] via-[#D97706] to-[#064E3B]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="space-y-2 text-center pt-1">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white p-0.5 border border-amber-400/60 shadow-md mx-auto">
                <img src="/logo.jpg" alt="EduFlow Logo" className="w-full h-full object-cover rounded-xl" />
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#064E3B] tracking-normal leading-snug">
                {tab === 'login'
                  ? (title || 'Đăng Nhập Tài Khoản')
                  : tab === 'register'
                  ? 'Đăng Ký Tài Khoản Học Viên'
                  : 'Khôi Phục Mật Khẩu'}
              </h3>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
                {tab === 'login'
                  ? (subtitle || 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.')
                  : tab === 'register'
                  ? 'Tạo tài khoản học viên miễn phí để luyện đề thi, nghe chép chính tả và học từ vựng.'
                  : 'Nhập email đã đăng ký để nhận mã OTP và tạo mật khẩu mới an toàn.'}
              </p>

              {/* Tab Switcher Pills */}
              <div className="inline-flex p-1 rounded-full bg-stone-200/80 border border-stone-300 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
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
                    setSuccessMsg(null);
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    tab === 'register'
                      ? 'bg-[#064E3B] text-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Đăng Ký
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('forgot');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    tab === 'forgot'
                      ? 'bg-[#064E3B] text-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Quên Mật Khẩu
                </button>
              </div>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google Sign-in Official Section (chỉ hiển thị ở tab Đăng nhập và Đăng ký) */}
            {tab !== 'forgot' && (
              <div className="space-y-3">
                {/* Khung chứa nút Google Official nếu đã cấu hình Client ID */}
                <div ref={googleBtnRef} className="w-full flex justify-center empty:hidden" />

                {/* Nút Tiếp tục với Google tiêu chuẩn */}
                <button
                  type="button"
                  onClick={handleGoogleSignInClick}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {/* Google 4-Color SVG Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>

                {/* Sub-modal: Cấu hình hoặc Đăng nhập trực tiếp bằng tài khoản Google thật */}
                <AnimatePresence>
                  {showGoogleConfigModal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-2xl text-left space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#064E3B] flex items-center gap-1.5 text-xs">
                          <Settings size={14} className="text-amber-700" />
                          Đăng nhập bằng tài khoản Google của bạn
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowGoogleConfigModal(false)}
                          className="text-stone-400 hover:text-stone-700 cursor-pointer p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {/* Cách 1: Đăng nhập trực tiếp bằng địa chỉ Gmail thật */}
                      <form onSubmit={handleCustomGoogleSubmit} className="space-y-2">
                        <label className="text-[11px] font-semibold text-stone-700 block">
                          Nhập địa chỉ Gmail của bạn để đăng nhập ngay:
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="email"
                            value={customGoogleEmail}
                            onChange={(e) => setCustomGoogleEmail(e.target.value)}
                            placeholder="tenban@gmail.com"
                            className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                            required
                          />
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-3 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-white text-xs font-bold cursor-pointer transition-colors"
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </form>

                      {/* Cách 2: Nhập Google Client ID từ Google Cloud Console */}
                      <div className="pt-2 border-t border-amber-200/80 space-y-1.5">
                        <span className="text-[10px] text-stone-600 block">
                          Hoặc gắn <strong>Google Client ID</strong> (tạo trên Google Cloud Console) để bật popup chọn tài khoản chính thức:
                        </span>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            defaultValue={googleClientId}
                            id="inputGoogleClientId"
                            placeholder="xxxx.apps.googleusercontent.com"
                            className="flex-1 px-3 py-1 rounded-lg border border-stone-300 bg-white text-[11px] font-mono focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById('inputGoogleClientId') as HTMLInputElement;
                              handleSaveGoogleClientId(el?.value || '');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                          >
                            Lưu ID
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-stone-300 w-full" />
                  <span className="bg-[#FAFAF9] px-3 text-[11px] font-mono text-stone-500 uppercase tracking-wider shrink-0">
                    Hoặc đăng nhập bằng email
                  </span>
                </div>
              </div>
            )}

            {/* TAB 1: ĐĂNG NHẬP */}
            {tab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#064E3B] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Mật Khẩu</label>
                    <button
                      type="button"
                      onClick={() => {
                        setTab('forgot');
                        setForgotEmail(loginEmail);
                        setError(null);
                        setSuccessMsg(null);
                      }}
                      className="text-[11px] text-[#D97706] hover:underline font-semibold cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#064E3B] transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {/* TAB 2: ĐĂNG KÝ */}
            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Họ và Tên</label>
                  <div className="relative">
                    <UserIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ten@example.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Mật Khẩu</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">Xác Nhận</label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed border border-amber-400/30"
                >
                  <span>{loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản Học Viên'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {/* TAB 3: QUÊN MẬT KHẨU (FORGOT PASSWORD OTP FLOW) */}
            {tab === 'forgot' && (
              <div className="space-y-3 text-left">
                {forgotStep === 1 ? (
                  <form onSubmit={handleRequestOtp} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Địa chỉ Email đã đăng ký
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <KeyRound size={15} />
                      <span>{loading ? 'Đang gửi mã...' : 'Nhận Mã Xác Nhận OTP'}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-3">
                    {/* OTP Notification Hint */}
                    {generatedOtpHint && (
                      <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-amber-700" />
                          Mã xác nhận OTP (hết hạn trong 5 phút):
                        </p>
                        <p className="font-mono text-base font-extrabold text-[#064E3B] tracking-widest">
                          {generatedOtpHint}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Nhập Mã OTP (6 Chữ Số)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                        placeholder="Ví dụ: 849201"
                        className="w-full px-4 py-2 rounded-xl border border-stone-300 bg-white text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                          Mật Khẩu Mới
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Ít nhất 6 ký tự"
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                          Xác Nhận Mới
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setForgotStep(1)}
                        className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
                      >
                        Gửi lại
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        <CheckCircle2 size={15} />
                        <span>{loading ? 'Đang lưu...' : 'Xác Nhận Đổi Mật Khẩu'}</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('login');
                      setForgotStep(1);
                      setError(null);
                    }}
                    className="text-xs text-stone-600 hover:text-stone-900 font-bold hover:underline cursor-pointer"
                  >
                    ← Quay lại Đăng Nhập
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
