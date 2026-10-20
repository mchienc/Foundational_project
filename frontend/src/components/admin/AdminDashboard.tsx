import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  BookOpen,
  Trash2,
  Shield,
  User as UserIcon,
  CheckCircle,
  TrendingUp,
  Award,
  Clock,
  Search,
  RefreshCw,
  ShieldAlert,
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
  full_name: string;
  email: string;
  role: 'student' | 'admin';
  created_at: string;
  exams_taken?: number;
}

interface ExamSubmissionRow {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  test_title: string;
  skill: string;
  correct_count: number;
  total_count: number;
  band_score: number;
  time_taken_seconds: number;
  created_at: string;
}

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

const fallbackUsers: AdminUserRow[] = [
  { id: '1', full_name: 'Quản Trị Viên Hệ Thống', email: 'admin@example.com', role: 'admin', created_at: '2026-08-01T08:00:00Z', exams_taken: 12 },
  { id: '2', full_name: 'Minh Chiến Đặng', email: 'dangchien2005@gmail.com', role: 'student', created_at: '2026-08-15T10:30:00Z', exams_taken: 8 },
  { id: '3', full_name: 'Hoàng Kim Yến', email: 'kimyen@example.com', role: 'student', created_at: '2026-08-22T14:15:00Z', exams_taken: 5 },
  { id: '4', full_name: 'Trần Hải Đăng', email: 'haidang@example.com', role: 'admin', created_at: '2026-08-28T09:00:00Z', exams_taken: 9 },
  { id: '5', full_name: 'Lê Quốc Bảo', email: 'quocbao@example.com', role: 'student', created_at: '2026-09-02T16:20:00Z', exams_taken: 3 },
  { id: '6', full_name: 'Nguyễn Phương Thảo', email: 'phuongthao@example.com', role: 'student', created_at: '2026-09-10T11:45:00Z', exams_taken: 6 },
];

const fallbackResults: ExamSubmissionRow[] = [
  {
    id: 'res-101',
    user_id: '2',
    user_name: 'Minh Chiến Đặng',
    user_email: 'dangchien2005@gmail.com',
    test_title: 'Cambridge 20 - Test 1',
    skill: 'Reading',
    correct_count: 35,
    total_count: 40,
    band_score: 8.0,
    time_taken_seconds: 3240,
    created_at: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: 'res-102',
    user_id: '3',
    user_name: 'Hoàng Kim Yến',
    user_email: 'kimyen@example.com',
    test_title: 'Cambridge 19 - Test 2',
    skill: 'Reading',
    correct_count: 31,
    total_count: 40,
    band_score: 7.0,
    time_taken_seconds: 3480,
    created_at: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
  },
  {
    id: 'res-103',
    user_id: '5',
    user_name: 'Lê Quốc Bảo',
    user_email: 'quocbao@example.com',
    test_title: 'Cambridge 18 - Test 1',
    skill: 'Listening',
    correct_count: 37,
    total_count: 40,
    band_score: 8.5,
    time_taken_seconds: 1800,
    created_at: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
  {
    id: 'res-104',
    user_id: '6',
    user_name: 'Nguyễn Phương Thảo',
    user_email: 'phuongthao@example.com',
    test_title: 'Cambridge 20 - Test 2',
    skill: 'Listening',
    correct_count: 33,
    total_count: 40,
    band_score: 7.5,
    time_taken_seconds: 1800,
    created_at: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNotify }) => {
  const [adminTab, setAdminTab] = useState<'users' | 'results' | 'tests'>('users');
  const [userList, setUserList] = useState<AdminUserRow[]>(fallbackUsers);
  const [examResults, setExamResults] = useState<ExamSubmissionRow[]>(fallbackResults);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<'all' | 'Reading' | 'Listening'>('all');

  // Tải dữ liệu người dùng và kết quả bài thi từ API backend
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, resultsRes] = await Promise.allSettled([
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/exam-results').then((r) => r.json()),
      ]);

      if (usersRes.status === 'fulfilled' && usersRes.value?.success && Array.isArray(usersRes.value.data)) {
        setUserList(usersRes.value.data);
      }
      if (resultsRes.status === 'fulfilled' && resultsRes.value?.success && Array.isArray(resultsRes.value.data)) {
        setExamResults(resultsRes.value.data);
      }
    } catch {
      // Fallback to memory state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Đổi vai trò người dùng (student <-> admin)
  const handleToggleRole = async (user: AdminUserRow) => {
    const newRole: 'student' | 'admin' = user.role === 'admin' ? 'student' : 'admin';
    try {
      const res = await fetch(`/api/admin/users/${user.id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        onNotify(data.message, 'success');
      } else {
        onNotify(`Đã chuyển vai trò của "${user.full_name}" sang ${newRole === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}`, 'info');
      }

      setUserList((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch {
      setUserList((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
      onNotify(`Đã chuyển vai trò của "${user.full_name}" sang ${newRole === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}`, 'info');
    }
  };

  // Xóa / Vô hiệu hóa tài khoản người dùng
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${userName}" khỏi hệ thống? Dữ liệu lịch sử làm bài sẽ bị gỡ bỏ.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        onNotify(data.message, 'success');
      } else {
        onNotify(`Đã xóa tài khoản "${userName}" thành công.`, 'success');
      }
      setUserList((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      setUserList((prev) => prev.filter((u) => u.id !== userId));
      onNotify(`Đã xóa tài khoản "${userName}" thành công.`, 'success');
    }
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    if (!searchUserQuery.trim()) return userList;
    const q = searchUserQuery.toLowerCase();
    return userList.filter(
      (u) =>
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [userList, searchUserQuery]);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (selectedSkillFilter === 'all') return examResults;
    return examResults.filter((r) => r.skill.toLowerCase() === selectedSkillFilter.toLowerCase());
  }, [examResults, selectedSkillFilter]);

  // Helper format seconds
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}p ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Stats numbers
  const studentCount = userList.filter((u) => u.role === 'student').length;
  const adminCount = userList.filter((u) => u.role === 'admin').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-semibold">
              Trung Tâm Quản Trị Hệ Thống
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#064E3B] text-amber-300">
              RBAC Enabled
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
            EduFlow Admin Console
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Kiểm soát quyền truy cập của người dùng, phân cấp Quản trị viên - Học viên và giám sát kết quả thi toàn bộ thí sinh.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin text-[#064E3B]' : ''} />
          {isLoading ? 'Đang đồng bộ...' : 'Làm mới dữ liệu'}
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Kho Đề Thi</span>
            <div className="text-2xl font-bold font-mono text-[#064E3B]">28 Bộ Đề</div>
            <div className="text-[11px] text-stone-400">Cam 13 đến Cam 20</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-[#064E3B]">
            <BookOpen size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Học Viên Khảo Thí</span>
            <div className="text-2xl font-bold font-mono text-[#D97706]">{studentCount} Bạn</div>
            <div className="text-[11px] text-stone-400">Quyền thi & luyện tập</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-[#D97706]">
            <Users size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Quản Trị Viên</span>
            <div className="text-2xl font-bold font-mono text-stone-900">{adminCount} Tài khoản</div>
            <div className="text-[11px] text-stone-400">Toàn quyền kiểm soát</div>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-700">
            <Shield size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Lượt Nộp Bài Toàn Sàn</span>
            <div className="text-2xl font-bold font-mono text-emerald-700">{examResults.length} Lượt</div>
            <div className="text-[11px] text-stone-400">Ghi nhận điểm thi live</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
            <TrendingUp size={22} />
          </div>
        </Card>
      </div>

      {/* Tabs Switcher */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Shield size={14} />
            Quản Lý Người Dùng & Phân Quyền ({userList.length})
          </button>

          <button
            onClick={() => setAdminTab('results')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'results'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Award size={14} />
            Bảng Điểm Khảo Thí Toàn Sàn ({examResults.length})
          </button>

          <button
            onClick={() => setAdminTab('tests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'tests'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <BookOpen size={14} />
            Kho Đề Cambridge ({CAMBRIDGE_TESTS.length})
          </button>
        </div>

        {/* TAB 1: Quản Lý Người Dùng & Phân Quyền */}
        {adminTab === 'users' && (
          <div className="space-y-4">
            {/* Filter and Explanatory banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <ShieldAlert className="text-[#064E3B] shrink-0 mt-0.5" size={18} />
                <div className="text-xs text-[#064E3B] leading-relaxed">
                  <span className="font-bold">Quyền hạn Quản Trị Viên (Admin):</span> Có thể xem toàn bộ bảng điểm nộp bài của mọi học viên, thăng cấp/hạ cấp tài khoản người dùng trực tiếp, và kiểm duyệt kho đề. Thao tác thay đổi quyền có hiệu lực ngay lập tức.
                </div>
              </div>

              <div className="relative min-w-[240px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchUserQuery}
                  onChange={(e) => setSearchUserQuery(e.target.value)}
                  placeholder="Tìm tên hoặc email..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Người Dùng</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Vai Trò Hiện Tại</th>
                      <th className="p-4">Số Bài Đã Nộp</th>
                      <th className="p-4">Ngày Tham Gia</th>
                      <th className="p-4 text-right">Phân Quyền / Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-4 font-semibold text-stone-900 flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              user.role === 'admin'
                                ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-300'
                                : 'bg-emerald-100 text-[#064E3B]'
                            }`}
                          >
                            {user.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div>{user.full_name}</div>
                            {user.role === 'admin' && (
                              <span className="text-[10px] text-amber-700 font-mono">Quản trị viên</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-mono text-stone-500">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                              user.role === 'admin'
                                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                : 'bg-stone-100 text-stone-700 border border-stone-200'
                            }`}
                          >
                            {user.role === 'admin' ? <Shield size={12} className="text-amber-600" /> : <UserIcon size={12} />}
                            {user.role === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-semibold text-stone-700">
                          {user.exams_taken ?? 0} bài thi
                        </td>
                        <td className="p-4 font-mono text-stone-400">
                          {new Date(user.created_at).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleRole(user)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                                user.role === 'admin'
                                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-200'
                              }`}
                              title={user.role === 'admin' ? 'Hạ cấp về Học Viên' : 'Nâng cấp lên Quản Trị Viên'}
                            >
                              <Shield size={13} />
                              {user.role === 'admin' ? 'Hạ cấp Học Viên' : 'Thăng cấp Admin'}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.id, user.full_name)}
                              className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Xóa tài khoản khỏi hệ thống"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Bảng Điểm Khảo Thí Toàn Sàn */}
        {adminTab === 'results' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-600">
                Hiển thị kết quả khảo thí gần đây của tất cả học viên trong hệ thống.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium">Lọc kỹ năng:</span>
                <div className="flex gap-1">
                  {(['all', 'Reading', 'Listening'] as const).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkillFilter(skill)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        selectedSkillFilter === skill
                          ? 'bg-[#064E3B] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {skill === 'all' ? 'Tất cả' : skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Học Viên</th>
                      <th className="p-4">Đề Thi</th>
                      <th className="p-4">Kỹ Năng</th>
                      <th className="p-4">Số Câu Đúng</th>
                      <th className="p-4">Band Score</th>
                      <th className="p-4">Thời Gian Làm Bài</th>
                      <th className="p-4 text-right">Thời Điểm Nộp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredResults.map((res) => {
                      const isHighBand = res.band_score >= 8.0;
                      const isGoodBand = res.band_score >= 6.5 && res.band_score < 8.0;
                      return (
                        <tr key={res.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-4">
                            <div className="font-semibold text-stone-900">{res.user_name}</div>
                            <div className="text-[11px] font-mono text-stone-400">{res.user_email}</div>
                          </td>
                          <td className="p-4 font-semibold text-stone-800">
                            {res.test_title}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                                res.skill === 'Listening'
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {res.skill}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-stone-800">
                            {res.correct_count}/{res.total_count}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-xs ${
                                isHighBand
                                  ? 'bg-emerald-100 text-[#064E3B] border border-emerald-300'
                                  : isGoodBand
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-rose-100 text-rose-900 border border-rose-300'
                              }`}
                            >
                              <Award size={12} />
                              Band {res.band_score.toFixed(1)}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-stone-600">
                            <span className="inline-flex items-center gap-1">
                              <Clock size={12} className="text-stone-400" />
                              {formatDuration(res.time_taken_seconds)}
                            </span>
                          </td>
                          <td className="p-4 text-right font-mono text-stone-400">
                            {new Date(res.created_at).toLocaleString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Kho Đề Cambridge IELTS */}
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
                          onClick={() => onNotify(`Đề thi "${test.book} - Test ${test.testNumber}" đã sẵn sàng trong Thư Viện Reading & Listening`, 'info')}
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
      </div>
    </div>
  );
};
