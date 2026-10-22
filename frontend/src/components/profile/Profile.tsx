import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Lock,
  Award,
  Save,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  Volume2,
  Target,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { User, UserStats, Course } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export type ProfileTab = 'info' | 'settings' | 'password' | 'certs' | 'support';

interface ProfileProps {
  user: User;
  stats: UserStats;
  courses?: Course[];
  initialTab?: ProfileTab;
  onUpdateUser: (updated: Partial<User>) => void;
  onViewCertificate: (courseTitle: string) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  stats,
  initialTab = 'info',
  onUpdateUser,
  onViewCertificate,
  onNotify,
}) => {
  const [tab, setTab] = useState<ProfileTab>(initialTab);

  // Sync tab if initialTab prop changes from Navbar
  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab]);

  // Tab 1: Info states
  const [fullName, setFullName] = useState<string>(user.full_name || '');
  const [email, setEmail] = useState<string>(user.email || '');
  const [phone, setPhone] = useState<string>(user.phone || '0976294907');

  // Tab 2: Settings states
  const [targetBand, setTargetBand] = useState<string>(user.targetBand || '7.0+');
  const [preferredAccent, setPreferredAccent] = useState<'uk' | 'us'>(user.preferredAccent || 'uk');
  const [audioSpeed, setAudioSpeed] = useState<number>(user.audioSpeed || 1.0);
  const [dailyReminder, setDailyReminder] = useState<boolean>(
    user.dailyReminder !== undefined ? user.dailyReminder : true
  );

  // Tab 3: Password states
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

  // Handle Save Learning Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      targetBand,
      preferredAccent,
      audioSpeed,
      dailyReminder,
    });
    onNotify(`Đã lưu cài đặt học tập (Mục tiêu Band ${targetBand}) thành công!`, 'success');
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
          Hồ Sơ &amp; Cài Đặt Học Tập
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
          Quản lý thông tin tài khoản, mục tiêu Band điểm và tùy chỉnh âm thanh luyện thi Cambridge IELTS.
        </p>
      </div>

      {/* Top Banner: User Avatar & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <Card className="p-6 flex flex-col items-center text-center space-y-3 bg-white border border-stone-200 shadow-xs">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#064E3B] to-emerald-700 text-amber-300 flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-950/20 border-2 border-amber-400/40">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-bold text-stone-900 font-sans truncate">{user.full_name}</h2>
            <p className="text-xs text-stone-500 font-mono truncate">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-amber-300 bg-amber-50 text-amber-900">
              <span
                className={`w-2 h-2 rounded-full ${
                  user.role === 'admin' ? 'bg-purple-600' : 'bg-emerald-600'
                }`}
              />
              {user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-300 bg-emerald-50 text-[#064E3B]">
              <Target size={12} className="text-[#064E3B]" />
              Band {user.targetBand || '7.0+'}
            </span>
          </div>
        </Card>

        {/* 4 Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 space-y-1 bg-white border border-stone-200">
            <div className="text-2xl font-bold font-mono text-stone-900">
              {stats.coursesEnrolled || 12}
            </div>
            <div className="text-xs text-stone-500">Đề Reading đã làm</div>
          </Card>
          <Card className="p-4 space-y-1 bg-white border border-stone-200">
            <div className="text-2xl font-bold font-mono text-emerald-700">
              {stats.coursesCompleted || 8}
            </div>
            <div className="text-xs text-stone-500">Bài Listening xong</div>
          </Card>
          <Card className="p-4 space-y-1 bg-white border border-stone-200">
            <div className="text-2xl font-bold font-mono text-amber-600">
              186
            </div>
            <div className="text-xs text-stone-500">Từ vựng Flashcard</div>
          </Card>
          <Card className="p-4 space-y-1 bg-white border border-stone-200">
            <div className="text-2xl font-bold font-mono text-purple-700">
              {stats.certificatesEarned || 2}
            </div>
            <div className="text-xs text-stone-500">Chứng nhận đạt</div>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
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
            onClick={() => setTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'settings'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Settings size={14} />
            Cài Đặt Học Tập &amp; Mục Tiêu
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
            onClick={() => setTab('certs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'certs'
                ? 'bg-[#064E3B] text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            <Award size={14} />
            Chứng Nhận Hoàn Thành
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

        {/* Tab 1: Info */}
        {tab === 'info' && (
          <Card className="p-6 sm:p-8 max-w-2xl space-y-6 bg-white border border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Thông tin tài khoản</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Cập nhật họ tên, địa chỉ email và số điện thoại liên hệ để nhận hỗ trợ học tập khi cần.
              </p>
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

        {/* Tab 2: Settings (Học tập & Mục tiêu) */}
        {tab === 'settings' && (
          <Card className="p-6 sm:p-8 max-w-2xl space-y-6 bg-white border border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Cài đặt học tập &amp; Mục tiêu Band điểm</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Thiết lập mục tiêu IELTS và tùy biến âm thanh bài nghe để tối ưu hiệu quả ôn thi.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Mục tiêu Band điểm */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Target size={14} className="text-[#064E3B]" />
                  Mục tiêu Band IELTS mong muốn
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['6.0', '6.5', '7.0', '7.5', '8.0', '8.5+'].map((band) => (
                    <button
                      type="button"
                      key={band}
                      onClick={() => setTargetBand(band)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        targetBand === band
                          ? 'bg-[#064E3B] text-amber-300 border-amber-500/50 shadow-xs ring-1 ring-amber-400/40'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 font-sans">
                  Hệ thống sẽ gợi ý các đề thi Cambridge và bài chép chính tả phù hợp với trình độ mục tiêu của bạn.
                </p>
              </div>

              {/* Giọng phát âm ưu tiên */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Volume2 size={14} className="text-[#064E3B]" />
                  Ưu tiên giọng đọc phát âm (Listening &amp; Flashcard)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredAccent('uk')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      preferredAccent === 'uk'
                        ? 'bg-emerald-50/70 border-emerald-600/50 text-[#064E3B] ring-1 ring-emerald-500'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-lg">🇬🇧</span>
                    <div>
                      <div className="text-xs font-bold">Anh - Anh (British English - UK)</div>
                      <div className="text-[11px] text-stone-500 mt-0.5 font-sans">
                        Chuẩn khảo thí Đại học Cambridge, phổ biến nhất trong đề thi IELTS.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredAccent('us')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      preferredAccent === 'us'
                        ? 'bg-emerald-50/70 border-emerald-600/50 text-[#064E3B] ring-1 ring-emerald-500'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-lg">🇺🇸</span>
                    <div>
                      <div className="text-xs font-bold">Anh - Mỹ (American English - US)</div>
                      <div className="text-[11px] text-stone-500 mt-0.5 font-sans">
                        Phát âm tiếng Anh Bắc Mỹ, thực tế và dễ tiếp cận.
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tốc độ audio mặc định */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#064E3B]" />
                  Tốc độ phát audio mặc định
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 0.9, label: '0.9x', desc: 'Chậm & Rõ âm' },
                    { value: 1.0, label: '1.0x', desc: 'Chuẩn phòng thi' },
                    { value: 1.1, label: '1.1x', desc: 'Thử thách phản xạ' },
                  ].map((spd) => (
                    <button
                      type="button"
                      key={spd.value}
                      onClick={() => setAudioSpeed(spd.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        audioSpeed === spd.value
                          ? 'bg-[#064E3B] text-amber-300 border-amber-500/50 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold">{spd.label}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{spd.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nhắc nhở Flashcard hàng ngày */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex items-start gap-3">
                    <Bell size={18} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-800">Nhắc nhở ôn tập Flashcard Anki mỗi ngày</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Duy trì chuỗi ghi nhớ ngắt quãng SRS (20 từ vựng mỗi ngày để đạt hiệu quả cao nhất).
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dailyReminder}
                    onChange={(e) => setDailyReminder(e.target.checked)}
                    className="w-4 h-4 rounded text-[#064E3B] focus:ring-[#064E3B] cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" icon={<Save size={15} />}>
                  Lưu Cài Đặt Học Tập
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 3: Password */}
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

        {/* Tab 4: Certificates */}
        {tab === 'certs' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Chứng nhận hoàn thành kỹ năng</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Các chứng chỉ được cấp sau khi bạn hoàn thành đầy đủ bài thi Cambridge Reading &amp; Listening trên hệ thống EduFlow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'cert-cambridge-reading',
                  title: 'Cambridge IELTS Academic Reading Mastery',
                  subtitle: 'Hoàn thành 28 đề thi Full Tests & 84 Passages học thuật',
                  date: 'Tháng 10, 2026',
                  score: 'Band 7.5',
                },
                {
                  id: 'cert-dictation-listening',
                  title: 'IELTS Contextual Dictation & Fluency',
                  subtitle: 'Đạt độ chính xác nghe chép chính tả 95%+ chuẩn Cambridge',
                  date: 'Tháng 10, 2026',
                  score: 'Band 8.0',
                },
              ].map((c) => (
                <Card key={c.id} className="p-5 flex flex-col justify-between gap-4 bg-white border border-stone-200 hover:border-amber-400/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                      <Award size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#064E3B] border border-emerald-200">
                          {c.score}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">{c.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 truncate mt-1">{c.title}</h4>
                      <p className="text-xs text-stone-500 font-sans mt-0.5 leading-relaxed">{c.subtitle}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Đã xác thực
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewCertificate(c.title)}
                    >
                      Xem Chứng Chỉ
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Support */}
        {tab === 'support' && (
          <Card className="p-6 sm:p-8 max-w-2xl space-y-6 bg-white border border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-sans">Trung tâm hỗ trợ học viên EduFlow</h3>
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
                  support@eduflow.edu.vn
                </div>
                <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                  Tiếp nhận phản hồi và giải đáp học thuật chi tiết trong vòng 24 giờ.
                </p>
              </div>
            </div>

            {/* AI Tutor Chatbot Banner */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shrink-0">
                <Sparkles size={18} />
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
