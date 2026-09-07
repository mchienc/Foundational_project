import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Plus,
  Trash2,
  Shield,
  User as UserIcon,
  CheckCircle,
  TrendingUp,
  Edit,
} from 'lucide-react';
import { Course } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface AdminDashboardProps {
  courses: Course[];
  onAddCourse: (newCourse: Partial<Course>) => void;
  onDeleteCourse: (id: string) => void;
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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  courses,
  onAddCourse,
  onDeleteCourse,
  onNotify,
}) => {
  const [adminTab, setAdminTab] = useState<'courses' | 'users'>('courses');
  const [userList, setUserList] = useState<AdminUserRow[]>(initialAdminUsers);

  // New Course Modal Form
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newHeadline, setNewHeadline] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Lập trình' | 'Thiết kế' | 'Cơ sở dữ liệu' | 'DevOps' | 'Ngoại ngữ'>('Lập trình');
  const [newPrice, setNewPrice] = useState<number>(799000);

  const handleToggleRole = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === 'admin' ? 'student' : 'admin';
          onNotify(`Đã cập nhật vai trò người dùng thành: ${newRole}`, 'info');
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

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onNotify('Vui lòng nhập tên khóa học.', 'error');
      return;
    }

    onAddCourse({
      title: newTitle.trim(),
      headline: newHeadline.trim() || 'Chương trình đào tạo thực chiến chất lượng cao.',
      category: newCategory,
      price: Number(newPrice) || 699000,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    });

    onNotify(`Đã tạo mới khóa học "${newTitle}" thành công!`, 'success');
    setShowAddModal(false);
    setNewTitle('');
    setNewHeadline('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono text-purple-600 uppercase tracking-wider font-semibold block">
            Khu vực quản trị hệ thống
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Management Console
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={15} />}
            onClick={() => setShowAddModal(true)}
          >
            Thêm Khóa Học Mới
          </Button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Tổng Khóa Học</span>
            <div className="text-2xl font-bold font-mono text-slate-900">{courses.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <BookOpen size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Tổng Người Dùng</span>
            <div className="text-2xl font-bold font-mono text-purple-600">{userList.length + 120}</div>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
            <Users size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Lượt Đăng Ký Học</span>
            <div className="text-2xl font-bold font-mono text-emerald-600">9,840</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <TrendingUp size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Tỷ Lệ Hoàn Thành</span>
            <div className="text-2xl font-bold font-mono text-amber-600">88.4%</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
            <CheckCircle size={22} />
          </div>
        </Card>
      </div>

      {/* Tabs: Courses vs Users */}
      <div className="space-y-4">
        <div className="flex gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setAdminTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              adminTab === 'courses'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen size={14} />
            Quản Lý Khóa Học ({courses.length})
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users size={14} />
            Quản Lý Người Dùng ({userList.length})
          </button>
        </div>

        {/* Tab 1: Courses Management Table */}
        {adminTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Khóa Học</th>
                    <th className="p-4">Danh Mục</th>
                    <th className="p-4">Học Phí</th>
                    <th className="p-4">Học Viên</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">
                        {course.title}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                          {course.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-800">
                        {course.price.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="p-4 font-mono text-slate-500">
                        {course.studentsCount.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onNotify(`Chỉnh sửa khóa học "${course.title}"`, 'info')}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Sửa"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa khóa học "${course.title}"?`)) {
                                onDeleteCourse(course.id);
                                onNotify(`Đã xóa khóa học thành công.`, 'success');
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
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
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Họ Và Tên</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Vai Trò</th>
                    <th className="p-4">Ngày Tham Gia</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {userList.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </td>
                      <td className="p-4 font-mono text-slate-500">{user.email}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleRole(user.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          title="Bấm để chuyển vai trò"
                        >
                          {user.role === 'admin' ? <Shield size={11} /> : <UserIcon size={11} />}
                          {user.role} (Đổi)
                        </button>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{user.joinedAt}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa người dùng"
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

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Thêm Khóa Học Mới</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Tên khóa học</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Lập Trình Next.js 15 & GraphQL"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Tóm tắt ngắn gọn</label>
                <textarea
                  rows={2}
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  placeholder="Mô tả giá trị cốt lõi của khóa học..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Danh mục</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="Lập trình">Lập trình</option>
                    <option value="Thiết kế">Thiết kế</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cơ sở dữ liệu">Cơ sở dữ liệu</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Học phí (VNĐ)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Hủy Bỏ
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700 font-bold">
                  Tạo Khóa Học
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
