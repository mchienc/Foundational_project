import React, { useState, useEffect, useRef } from 'react';
import {
  User as UserIcon,
  Lock,
  Award,
  Save,
  HelpCircle,
  Phone,
  Mail,
  Target,
  ClipboardList,
  Camera,
  Upload,
  Trash2,
  Crown,
  Sparkles,
} from 'lucide-react';
import { User, UserStats, Course, Screen } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CambridgeTestHistoryTable } from './CambridgeTestHistoryTable';
import { useProStore } from '../../modules/pro/useProStore';

export type ProfileTab = 'history' | 'info' | 'password' | 'support';

interface ProfileProps {
  user: User;
  stats: UserStats;
  courses?: Course[];
  initialTab?: ProfileTab;
  onUpdateUser: (updated: Partial<User>) => void;
  onViewCertificate?: (courseTitle: string) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onNavigateScreen?: (screen: Screen) => void;
  onStartReadingTest?: (book: string, testNumber: 1 | 2 | 3 | 4, mode?: 'full' | 'single') => void;
  onStartListeningTest?: (book: string, testNumber: 1 | 2 | 3 | 4, mode?: 'exam' | 'practice') => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  stats: _stats,
  initialTab = 'history',
  onNavigateScreen,
  onStartReadingTest,
  onStartListeningTest,
  onUpdateUser,
  onViewCertificate: _onViewCertificate,
  onNotify,
}) => {
  const [tab, setTab] = useState<ProfileTab>(initialTab);

  const isProStore = useProStore((state) => state.isPro);
  const planName = useProStore((state) => state.planName);
  const expiryDisplayText = useProStore((state) => state.expiryDisplayText);
  const isProUser = Boolean(user.isPro) || isProStore;
  const proPackageTitle = user.proPackage || planName || 'eng4u PRO';

  // Sync tab if initialTab prop changes from Navbar
  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab]);

  // Tab 1: Info states
  const [fullName, setFullName] = useState<string>(user.full_name || '');
  const [email, setEmail] = useState<string>(user.email || '');
  const [phone, setPhone] = useState<string>(user.phone || '');

  // Cập nhật lại form khi user prop thay đổi
  useEffect(() => {
    setFullName(user.full_name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
  }, [user]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Nén ảnh đại diện tự động để tối ưu dung lượng và sắc nét khung tròn
  const compressAvatar = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const size = 256;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          // Cắt vuông tâm ảnh (Center square crop)
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;

          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          resolve(compressed);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onNotify('Vui lòng chọn tệp định dạng hình ảnh (PNG, JPG, WebP).', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onNotify('Dung lượng ảnh tối đa là 5MB.', 'error');
      return;
    }

    try {
      const compressed = await compressAvatar(file);
      onUpdateUser({ avatar: compressed });
      onNotify('Đã cập nhật ảnh đại diện thành công!', 'success');
    } catch (err) {
      console.error('Lỗi tải ảnh đại diện:', err);
      onNotify('Không thể xử lý ảnh đại diện. Vui lòng thử lại với ảnh khác.', 'error');
    } finally {
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveAvatar = () => {
    onUpdateUser({ avatar: '' });
    onNotify('Đã gỡ ảnh đại diện, chuyển về biểu tượng ký tự mặc định.', 'info');
  };

  // Password states
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isGoogleAccount = user.email.toLowerCase().endsWith('@gmail.com');

  // Handle Save Info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      onNotify('Vui lòng không để trống họ tên và email.', 'error');
      return;
    }
    onUpdateUser({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    onNotify('Đã cập nhật thông tin cá nhân thành công!', 'success');
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGoogleAccount && !currentPassword) {
      onNotify('Vui lòng nhập mật khẩu hiện tại.', 'error');
      return;
    }
    if (!newPassword || !confirmPassword) {
      onNotify('Vui lòng nhập đầy đủ mật khẩu mới.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      onNotify('Mật khẩu xác nhận không khớp.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onNotify('Mật khẩu mới phải có ít nhất 6 ký tự.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          current_password: currentPassword,
          new_password: newPassword,
          is_google_account: isGoogleAccount,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        onNotify(data.message || 'Không thể đổi mật khẩu.', 'error');
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onNotify(data.message || 'Cập nhật mật khẩu thành công!', 'success');
    } catch (err) {
      onNotify('Lỗi kết nối máy chủ.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <span className="text-xs font-mono text-amber-800 uppercase tracking-wider block font-semibold">
          Tài khoản học viên
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#064E3B] tracking-tight">
          Hồ Sơ Học Viên &amp; Lịch Sử Thi
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
          Quản lý thông tin tài khoản cá nhân, lịch sử làm bài thi Cambridge IELTS và bảo mật mật khẩu.
        </p>
      </div>

      {/* Top Banner: Student Profile Card (Clean & Focused) */}
      <Card className="p-6 sm:p-7 bg-white border border-stone-200 shadow-xs rounded-2xl flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
          {/* Avatar with Upload Capability */}
          <div className="relative shrink-0 group">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleAvatarUpload}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`w-20 h-20 rounded-full overflow-hidden bg-gradient-to-tr from-[#064E3B] to-emerald-700 text-amber-300 flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-950/20 cursor-pointer relative transition-transform hover:scale-105 ${
                isProUser
                  ? 'border-2 border-amber-400 ring-4 ring-amber-400/50'
                  : 'border-2 border-amber-400/50'
              }`}
              title="Nhấn để đổi ảnh đại diện"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.full_name.charAt(0).toUpperCase()}</span>
              )}

              {/* Hover overlay with Camera */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                <Camera size={18} />
                <span className="text-[9px] font-sans font-semibold mt-0.5">Đổi ảnh</span>
              </div>
            </div>

            {/* Quick action button at bottom-right */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#064E3B] hover:bg-emerald-700 border-2 border-white text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Tải ảnh đại diện lên"
            >
              <Camera size={13} />
            </button>

            {/* Floating crown on top-left of avatar for PRO */}
            {isProUser && (
              <div
                title="Tài khoản PRO VIP"
                className="absolute -top-2 -left-1 px-1.5 py-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-950 text-[10px] font-black shadow-md border border-white flex items-center gap-0.5 select-none"
              >
                <span>👑</span>
                <span>VIP</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-stone-900 font-sans">{user.full_name}</h2>
              {isProUser && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-sans font-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-stone-950 shadow-xs border border-amber-300">
                  <Crown size={13} className="fill-stone-950 text-stone-950" />
                  <span>PRO VIP</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border border-amber-300 bg-amber-50 text-amber-900">
                <span
                  className={`w-2 h-2 rounded-full ${
                    user.role === 'admin' ? 'bg-purple-600' : 'bg-emerald-600'
                  }`}
                />
                {user.role === 'admin' ? 'Quản trị viên' : 'Học viên chính thức'}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono flex items-center justify-center sm:justify-start gap-2">
              <span>{user.email}</span>
              {user.phone && (
                <>
                  <span className="text-stone-300">•</span>
                  <span>{user.phone}</span>
                </>
              )}
            </p>
            <p className="text-xs text-stone-400 font-sans pt-0.5">
              Hệ thống theo dõi tiến độ luyện đề Cambridge IELTS Academic chuẩn quốc tế.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {isProUser && (
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-[11px] font-mono text-amber-800 uppercase tracking-wide font-bold flex items-center gap-1">
                <Sparkles size={12} className="text-amber-600" />
                Gói dịch vụ
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-950 shadow-2xs">
                <Crown size={14} className="text-amber-600 fill-amber-400" />
                <span>{proPackageTitle}</span>
                {expiryDisplayText && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-950 font-sans font-bold">
                    {expiryDisplayText}
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="flex flex-col items-center sm:items-end gap-1">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wide">Mục tiêu cá nhân</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border border-emerald-300 bg-emerald-50 text-[#064E3B]">
              <Target size={14} className="text-[#064E3B]" />
              Band {user.targetBand || '7.0+'}
            </span>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'history'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <ClipboardList size={14} />
            Lịch Sử Làm Bài Cambridge
          </button>
          <button
            onClick={() => setTab('info')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'info'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <UserIcon size={14} />
            Hồ Sơ Cá Nhân
          </button>

          <button
            onClick={() => setTab('password')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'password'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Lock size={14} />
            Bảo Mật &amp; Mật Khẩu
          </button>

          <button
            onClick={() => setTab('support')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'support'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <HelpCircle size={14} />
            Trung Tâm Hỗ Trợ
          </button>
        </div>

        {/* Tab 0: Cambridge Test History */}
        {tab === 'history' && (
          <CambridgeTestHistoryTable
            currentUser={user}
            onNavigateScreen={onNavigateScreen}
            onStartReadingTest={onStartReadingTest}
            onStartListeningTest={onStartListeningTest}
          />
        )}

        {/* Tab 1: Info */}
        {tab === 'info' && (
          <Card className="p-6 sm:p-8 max-w-2xl space-y-6 bg-white border border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Thông tin tài khoản</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Cập nhật họ tên, địa chỉ email và số điện thoại liên hệ để nhận hỗ trợ học tập khi cần.
              </p>
            </div>

            {/* Avatar Management Row */}
            <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-[#064E3B] to-emerald-700 text-amber-300 flex items-center justify-center text-xl font-bold border-2 border-amber-400/50 shadow-xs shrink-0 cursor-pointer relative group transition-transform hover:scale-105"
                title="Đổi ảnh đại diện"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.full_name.charAt(0).toUpperCase()}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                  <Camera size={16} />
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="text-xs font-bold text-stone-800">Ảnh đại diện tài khoản</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Upload size={13} className="text-[#064E3B]" />
                    <span>Tải ảnh mới</span>
                  </button>
                  {user.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-xs font-semibold text-rose-600 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Trash2 size={13} />
                      <span>Gỡ ảnh</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 font-sans">
                  Hỗ trợ PNG, JPG, WebP. Hệ thống tự động cắt khung vuông tròn sắc nét.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Họ và tên</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Địa chỉ Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0976294907"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50 font-mono"
                />
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" icon={<Save size={15} />}>
                  Lưu Thông Tin
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 2: Password */}
        {tab === 'password' && (
          <Card className="p-6 sm:p-8 max-w-xl space-y-5 bg-white border border-stone-200">
            {isGoogleAccount ? (
              <div className="space-y-4">
                {/* Google Linked Account Banner */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-stone-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="font-bold text-xs text-[#064E3B]">
                      Tài khoản liên kết Google ({user.email})
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Tài khoản của bạn được bảo mật trực tiếp bởi Google. Bạn có thể đăng nhập một chạm bất cứ lúc nào qua nút <strong>Tiếp tục với Google</strong> mà không cần mật khẩu.
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Thiết lập mật khẩu bổ sung (Tùy chọn)</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      Nếu bạn muốn có thêm tùy chọn đăng nhập bằng Email &amp; Mật khẩu thông thường, hãy đặt mật khẩu mới bên dưới (không cần mật khẩu cũ):
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Mật khẩu mới</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu mới"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
                        required
                      />
                    </div>

                    <Button variant="primary" size="md" type="submit" icon={<Lock size={15} />}>
                      Lưu Mật Khẩu Bổ Sung
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-stone-900 mb-3 font-sans">Thiết lập mật khẩu mới</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Mật khẩu mới</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Ít nhất 6 ký tự"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/50"
                      required
                    />
                  </div>

                  <Button variant="primary" size="md" type="submit" icon={<Lock size={15} />}>
                    Cập Nhật Mật Khẩu
                  </Button>
                </form>
              </div>
            )}
          </Card>
        )}

        {/* Tab 5: Support */}
        {tab === 'support' && (
          <Card className="p-6 sm:p-8 max-w-2xl space-y-6 bg-white border border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Trung tâm hỗ trợ học viên eng4u</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Đội ngũ trợ giảng và bộ phận kỹ thuật luôn sẵn sàng hỗ trợ bạn trong suốt quá trình luyện thi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hotline Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase font-mono tracking-wider">
                  <Phone size={14} className="text-amber-700" />
                  Hotline &amp; Zalo Trực Tuyến
                </div>
                <div className="text-xl font-bold font-mono text-[#064E3B]">
                  0976 294 907
                </div>
                <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                  Hỗ trợ nhanh mọi thắc mắc về đề thi, kỹ thuật và lộ trình ôn luyện.
                </p>
              </div>

              {/* Email Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase font-mono tracking-wider">
                  <Mail size={14} className="text-[#064E3B]" />
                  Email Hỗ Trợ Học Vụ
                </div>
                <div className="text-base font-bold font-mono text-[#064E3B] truncate">
                  dangchien2005@gmail.com
                </div>
                <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                  Tiếp nhận phản hồi và giải đáp học thuật chi tiết trong vòng 24 giờ.
                </p>
              </div>
            </div>

            {/* AI Tutor Chatbot Banner */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-900">Trợ lý học tập AI Tutor (Bong bóng nổi)</h4>
                <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                  Bạn có thể bấm vào biểu tượng bong bóng chat ở góc dưới bên phải màn hình bất cứ lúc nào để hỏi bài, nâng cấp câu từ Band 6.0 lên 8.0, hoặc luyện thi Speaking tương tác.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
