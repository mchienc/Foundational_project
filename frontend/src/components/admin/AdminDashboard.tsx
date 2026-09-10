import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Trash2,
  Shield,
  User as UserIcon,
  CheckCircle,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { Course } from '../../types';
import { Card } from '../common/Card';

interface AdminDashboardProps {
  courses?: Course[];
  onAddCourse?: (newCourse: Partial<Course>) => void;
  onDeleteCourse?: (id: string) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  joinedAt: string;
}

const initialAdminUsers: AdminUserRow[] = [
  { id: '1', name: 'Quản Trị Viên (Admin)', email: 'admin@example.com', role: 'admin', joinedAt: '01/08/2026' },
  { id: '2', name: 'Minh Chiến Đặng', email: 'dangchien2005@gmail.com', role: 'student', joinedAt: '15/08/2026' },
  { id: '3', name: 'Hoàng Kim Yến', email: 'kimyen@example.com', role: 'student', joinedAt: '22/08/2026' },
  { id: '4', name: 'Trần Hải Đăng', email: 'haidang@example.com', role: 'admin', joinedAt: '28/08/2026' },
];

interface CambridgeTestSummary {
  id: string;
  book: string;
  testNumber: number;
  passagesCount: number;
  questionsCount: number;
  durationMinutes: number;
  status: 'Sẵn Sàng' | 'Bản Nháp';
}

const CAMBRIDGE_TESTS: CambridgeTestSummary[] = [
  // Cam 20
  { id: 'cam-20-1', book: 'Cambridge 20', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-20-2', book: 'Cambridge 20', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-20-3', book: 'Cambridge 20', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-20-4', book: 'Cambridge 20', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 19
  { id: 'cam-19-1', book: 'Cambridge 19', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-19-2', book: 'Cambridge 19', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-19-3', book: 'Cambridge 19', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-19-4', book: 'Cambridge 19', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 18
  { id: 'cam-18-1', book: 'Cambridge 18', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-18-2', book: 'Cambridge 18', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-18-3', book: 'Cambridge 18', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-18-4', book: 'Cambridge 18', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 16
  { id: 'cam-16-1', book: 'Cambridge 16', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-16-2', book: 'Cambridge 16', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-16-3', book: 'Cambridge 16', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-16-4', book: 'Cambridge 16', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 15
  { id: 'cam-15-1', book: 'Cambridge 15', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-15-2', book: 'Cambridge 15', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-15-3', book: 'Cambridge 15', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-15-4', book: 'Cambridge 15', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 14
  { id: 'cam-14-1', book: 'Cambridge 14', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-14-2', book: 'Cambridge 14', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-14-3', book: 'Cambridge 14', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-14-4', book: 'Cambridge 14', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  // Cam 13
  { id: 'cam-13-1', book: 'Cambridge 13', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-13-2', book: 'Cambridge 13', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-13-3', book: 'Cambridge 13', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
  { id: 'cam-13-4', book: 'Cambridge 13', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNotify,
}) => {
  const [adminTab, setAdminTab] = useState<'tests' | 'users'>('tests');
  const [userList, setUserList] = useState<AdminUserRow[]>(initialAdminUsers);

  const handleToggleRole = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === 'admin' ? 'student' : 'admin';
          onNotify(`Đã cập nhật vai trò người dùng thành: ${newRole === 'admin' ? 'Quản trị viên' : 'Học viên'}`, 'info');
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này khỏi hệ thống?')) {
      setUserList((prev) => prev.filter((u) => u.id !== userId));
      onNotify('Đã xóa người dùng thành công.', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-semibold block">
            Bảng điều khiển quản trị
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            EduFlow Admin Console
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Quản lý dữ liệu đề thi Cambridge IELTS Academic và danh sách tài khoản học viên.
          </p>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 flex items-center justify-between border-stone-200">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Tổng Đề Thi</span>
            <div className="text-2xl font-bold font-mono text-[#064E3B]">28 Bộ Đề</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-[#064E3B]">
            <BookOpen size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Tổng Passages</span>
            <div className="text-2xl font-bold font-mono text-[#D97706]">84 Bài Đọc</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-[#D97706]">
            <Layers size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Tổng Tài Khoản</span>
            <div className="text-2xl font-bold font-mono text-stone-900">{userList.length + 120}</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <Users size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Lượt Làm Bài Thi</span>
            <div className="text-2xl font-bold font-mono text-emerald-700">9,840</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
            <TrendingUp size={22} />
          </div>
        </Card>
      </div>

      {/* Tabs: Tests vs Users */}
      <div className="space-y-4">
        <div className="flex gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setAdminTab('tests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              adminTab === 'tests'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <BookOpen size={14} />
            Kho Đề Cambridge IELTS ({CAMBRIDGE_TESTS.length})
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Users size={14} />
            Quản Lý Tài Khoản ({userList.length})
          </button>
        </div>

        {/* Tab 1: Cambridge Tests Table */}
        {adminTab === 'tests' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Bộ Đề Thi</th>
                    <th className="p-4">Cấu Trúc</th>
                    <th className="p-4">Thời Lượng</th>
                    <th className="p-4">Số Câu Hỏi</th>
                    <th className="p-4">Trạng Thái</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {CAMBRIDGE_TESTS.map((test) => (
                    <tr key={test.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-4 font-semibold text-stone-900">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{test.book} - Test {test.testNumber}</span>
                        </div>
                      </td>
                      <td className="p-4 text-stone-600">
                        Full Test ({test.passagesCount} Passages)
                      </td>
                      <td className="p-4 font-mono text-stone-700">
                        {test.durationMinutes} phút
                      </td>
                      <td className="p-4 font-mono text-stone-700">
                        {test.questionsCount} câu hỏi
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle size={11} />
                          {test.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onNotify(`Đề thi "${test.book} - Test ${test.testNumber}" đã sẵn sàng trong Thư Viện Reading`, 'info')}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        >
                          Xem đề thi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Users Management Table */}
        {adminTab === 'users' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Họ Và Tên</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Vai Trò</th>
                    <th className="p-4">Ngày Tham Gia</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {userList.map((user) => (
                    <tr key={user.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-4 font-semibold text-stone-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </td>
                      <td className="p-4 font-mono text-stone-500">{user.email}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleRole(user.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                            user.role === 'admin'
                              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                              : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          }`}
                          title="Bấm để chuyển vai trò"
                        >
                          {user.role === 'admin' ? <Shield size={11} /> : <UserIcon size={11} />}
                          {user.role === 'admin' ? 'Quản Trị Viên' : 'Học Viên'} (Đổi)
                        </button>
                      </td>
                      <td className="p-4 font-mono text-stone-400">{user.joinedAt}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa tài khoản"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
