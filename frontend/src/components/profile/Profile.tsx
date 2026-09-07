import React, { useState } from 'react';
import { User as UserIcon, Lock, Award, Save } from 'lucide-react';
import { User, UserStats, Course } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface ProfileProps {
  user: User;
  stats: UserStats;
  courses: Course[];
  onUpdateUser: (updated: Partial<User>) => void;
  onViewCertificate: (courseTitle: string) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  stats,
  courses,
  onUpdateUser,
  onViewCertificate,
  onNotify,
}) => {
  const [tab, setTab] = useState<'info' | 'password' | 'certs'>('info');

  // Form states
  const [fullName, setFullName] = useState<string>(user.full_name);
  const [email, setEmail] = useState<string>(user.email);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      onNotify('Vui lòng không để trống họ tên và email.', 'error');
      return;
    }
    onUpdateUser({ full_name: fullName.trim(), email: email.trim() });
    onNotify('Đã cập nhật thông tin cá nhân thành công!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      onNotify('Vui lòng điền đầy đủ các trường mật khẩu.', 'error');
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
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onNotify('Đổi mật khẩu bảo mật thành công!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
          Tài khoản người dùng
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Hồ Sơ & Thiết Lập Bảo Mật
        </h1>
      </div>

      {/* Top Banner: User Avatar & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <Card className="p-6 flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
            {user.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user.full_name}</h2>
            <p className="text-xs text-slate-500 font-mono">{user.email}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-slate-200 bg-slate-50 text-slate-700">
            <span
              className={`w-2 h-2 rounded-full ${
                user.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
              }`}
            />
            Vai trò: {user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}
          </span>
        </Card>

        {/* 4 Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 space-y-1">
            <div className="text-2xl font-bold font-mono text-slate-900">
              {stats.coursesEnrolled}
            </div>
            <div className="text-xs text-slate-500">Khóa đăng ký</div>
          </Card>
          <Card className="p-4 space-y-1">
            <div className="text-2xl font-bold font-mono text-emerald-600">
              {stats.coursesCompleted}
            </div>
            <div className="text-xs text-slate-500">Đã hoàn thành</div>
          </Card>
          <Card className="p-4 space-y-1">
            <div className="text-2xl font-bold font-mono text-amber-600">
              {stats.streakDays}
            </div>
            <div className="text-xs text-slate-500">Ngày streak</div>
          </Card>
          <Card className="p-4 space-y-1">
            <div className="text-2xl font-bold font-mono text-purple-600">
              {stats.certificatesEarned}
            </div>
            <div className="text-xs text-slate-500">Chứng chỉ đạt</div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setTab('info')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'info'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserIcon size={14} />
            Thông Tin Cá Nhân
          </button>
          <button
            onClick={() => setTab('password')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'password'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Lock size={14} />
            Đổi Mật Khẩu
          </button>
          <button
            onClick={() => setTab('certs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'certs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Award size={14} />
            Chứng Chỉ Đạt Được ({courses.slice(2, 4).length})
          </button>
        </div>

        {/* Tab 1: Info */}
        {tab === 'info' && (
          <Card className="p-6 sm:p-8 max-w-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Cập nhật thông tin cơ bản</h3>
            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Họ và tên</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Địa chỉ Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button variant="primary" size="md" type="submit" icon={<Save size={15} />}>
                Lưu Thay Đổi
              </Button>
            </form>
          </Card>
        )}

        {/* Tab 2: Password */}
        {tab === 'password' && (
          <Card className="p-6 sm:p-8 max-w-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Thiết lập mật khẩu mới</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button variant="primary" size="md" type="submit" icon={<Lock size={15} />}>
                Cập Nhật Mật Khẩu
              </Button>
            </form>
          </Card>
        )}

        {/* Tab 3: Certificates */}
        {tab === 'certs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.slice(2, 4).map((c) => (
              <Card key={c.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{c.title}</h4>
                    <span className="text-xs text-slate-400 font-mono">Đạt chuẩn 100%</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewCertificate(c.title)}
                >
                  Xem Chứng Chỉ
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
