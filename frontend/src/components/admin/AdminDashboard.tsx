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
  Lock,
  Edit3,
  X,
  Save,
  Eye,
  EyeOff,
  Filter,
  Globe,
  Sparkles,
  Crown,
  Check,
  Calendar,
} from 'lucide-react';
import { Course, Screen } from '../../types';
import { Card } from '../common/Card';

interface AdminDashboardProps {
  courses?: Course[];
  onAddCourse?: (newCourse: Partial<Course>) => void;
  onDeleteCourse?: (id: string) => void;
  onNavigate?: (screen: Screen) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

interface AdminUserRow {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'admin';
  created_at: string;
  exams_taken?: number;
  is_pro?: boolean;
  pro_package?: string;
  pro_expiry?: string;
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

export interface TestQuestionItem {
  number: number;
  type: string;
  correctAnswer: string;
  acceptableAnswers?: string;
  explanation?: string;
}

export interface CambridgeTestSummary {
  id: string;
  book: string;
  testNumber: number;
  passagesCount: number;
  questionsCount: number;
  durationMinutes: number;
  status: 'Sẵn Sàng' | 'Tạm Khóa';
  questions?: TestQuestionItem[];
}

// Hàm khởi tạo 40 câu hỏi mẫu cho mỗi bộ đề
function createDefaultQuestions(book: string, testNumber: number): TestQuestionItem[] {
  const types = ['tfng', 'tfng', 'tfng', 'tfng', 'mcq', 'mcq', 'mcq', 'fill_blank', 'fill_blank', 'fill_blank'];
  const questions: TestQuestionItem[] = [];
  for (let i = 1; i <= 40; i++) {
    const qType = types[(i - 1) % types.length];
    let defaultAns = 'TRUE';
    let defaultAcceptable = '';
    const explanation = `Dẫn chứng đáp án câu ${i} trong bài thi ${book} - Test ${testNumber}.`;

    if (qType === 'tfng') {
      defaultAns = i % 3 === 1 ? 'TRUE' : i % 3 === 2 ? 'FALSE' : 'NOT GIVEN';
      defaultAcceptable = defaultAns === 'TRUE' ? 'T' : defaultAns === 'FALSE' ? 'F' : 'NG';
    } else if (qType === 'mcq') {
      const letters = ['A', 'B', 'C', 'D'];
      defaultAns = letters[(i - 1) % 4];
    } else {
      const sampleWords = ['technology', 'environment', 'sustainable', 'infrastructure', 'efficiency', 'architecture', 'temperature', 'biodiversity'];
      defaultAns = sampleWords[(i - 1) % sampleWords.length];
      defaultAcceptable = defaultAns;
    }

    questions.push({
      number: i,
      type: qType === 'tfng' ? 'TRUE / FALSE / NOT GIVEN' : qType === 'mcq' ? 'Trắc nghiệm (MCQ)' : 'Điền từ (Completion)',
      correctAnswer: defaultAns,
      acceptableAnswers: defaultAcceptable,
      explanation,
    });
  }
  return questions;
}

const INITIAL_CAMBRIDGE_TESTS: CambridgeTestSummary[] = [
  // Cam 20
  { id: 'cam-20-1', book: 'Cambridge 20', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 20', 1) },
  { id: 'cam-20-2', book: 'Cambridge 20', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 20', 2) },
  { id: 'cam-20-3', book: 'Cambridge 20', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 20', 3) },
  { id: 'cam-20-4', book: 'Cambridge 20', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 20', 4) },
  // Cam 19
  { id: 'cam-19-1', book: 'Cambridge 19', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 19', 1) },
  { id: 'cam-19-2', book: 'Cambridge 19', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 19', 2) },
  { id: 'cam-19-3', book: 'Cambridge 19', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 19', 3) },
  { id: 'cam-19-4', book: 'Cambridge 19', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 19', 4) },
  // Cam 18
  { id: 'cam-18-1', book: 'Cambridge 18', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 18', 1) },
  { id: 'cam-18-2', book: 'Cambridge 18', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 18', 2) },
  { id: 'cam-18-3', book: 'Cambridge 18', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 18', 3) },
  { id: 'cam-18-4', book: 'Cambridge 18', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 18', 4) },
  // Cam 16
  { id: 'cam-16-1', book: 'Cambridge 16', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 16', 1) },
  { id: 'cam-16-2', book: 'Cambridge 16', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 16', 2) },
  { id: 'cam-16-3', book: 'Cambridge 16', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 16', 3) },
  { id: 'cam-16-4', book: 'Cambridge 16', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 16', 4) },
  // Cam 15
  { id: 'cam-15-1', book: 'Cambridge 15', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 15', 1) },
  { id: 'cam-15-2', book: 'Cambridge 15', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 15', 2) },
  { id: 'cam-15-3', book: 'Cambridge 15', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 15', 3) },
  { id: 'cam-15-4', book: 'Cambridge 15', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 15', 4) },
  // Cam 14
  { id: 'cam-14-1', book: 'Cambridge 14', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 14', 1) },
  { id: 'cam-14-2', book: 'Cambridge 14', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 14', 2) },
  { id: 'cam-14-3', book: 'Cambridge 14', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 14', 3) },
  { id: 'cam-14-4', book: 'Cambridge 14', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 14', 4) },
  // Cam 13
  { id: 'cam-13-1', book: 'Cambridge 13', testNumber: 1, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 13', 1) },
  { id: 'cam-13-2', book: 'Cambridge 13', testNumber: 2, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 13', 2) },
  { id: 'cam-13-3', book: 'Cambridge 13', testNumber: 3, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 13', 3) },
  { id: 'cam-13-4', book: 'Cambridge 13', testNumber: 4, passagesCount: 3, questionsCount: 40, durationMinutes: 60, status: 'Sẵn Sàng', questions: createDefaultQuestions('Cambridge 13', 4) },
];

const fallbackUsers: AdminUserRow[] = [
  { id: '1', full_name: 'Quản Trị Viên Hệ Thống', email: 'admin@example.com', role: 'admin', created_at: '2026-08-01T08:00:00Z', exams_taken: 12, is_pro: true, pro_package: 'Gói Trọn Đời', pro_expiry: 'Vĩnh viễn' },
  { id: '2', full_name: 'Minh Chiến Đặng', email: 'dangchien2005@gmail.com', role: 'student', created_at: '2026-08-15T10:30:00Z', exams_taken: 8, is_pro: false, pro_package: '', pro_expiry: '' },
  { id: '3', full_name: 'Hoàng Kim Yến', email: 'kimyen@example.com', role: 'student', created_at: '2026-08-22T14:15:00Z', exams_taken: 5, is_pro: false, pro_package: '', pro_expiry: '' },
  { id: '4', full_name: 'Trần Hải Đăng', email: 'haidang@example.com', role: 'admin', created_at: '2026-08-28T09:00:00Z', exams_taken: 9, is_pro: true, pro_package: 'Gói Trọn Đời', pro_expiry: 'Vĩnh viễn' },
  { id: '5', full_name: 'Lê Quốc Bảo', email: 'quocbao@example.com', role: 'student', created_at: '2026-09-02T16:20:00Z', exams_taken: 3, is_pro: false, pro_package: '', pro_expiry: '' },
  { id: '6', full_name: 'Nguyễn Phương Thảo', email: 'phuongthao@example.com', role: 'student', created_at: '2026-09-10T11:45:00Z', exams_taken: 6, is_pro: false, pro_package: '', pro_expiry: '' },
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

const PRO_PACKAGES = [
  { id: '1month', name: 'Gói 1 Tháng', durationDays: 30, desc: '30 ngày trải nghiệm AI Chấm Chữa & Luyện Đề' },
  { id: '6months', name: 'Gói 6 Tháng', durationDays: 180, desc: '180 ngày (Khuyên dùng cho kỳ ôn thi nước rút)' },
  { id: '1year', name: 'Gói 1 Năm', durationDays: 365, desc: '365 ngày toàn diện bứt phá mục tiêu IELTS 7.5+' },
  { id: 'lifetime', name: 'Gói Trọn Đời', durationDays: 0, desc: 'Không giới hạn thời gian sử dụng tài nguyên PRO' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onNotify }) => {
  const [adminTab, setAdminTab] = useState<'users' | 'results' | 'tests'>('tests');
  const [userList, setUserList] = useState<AdminUserRow[]>(fallbackUsers);
  const [examResults, setExamResults] = useState<ExamSubmissionRow[]>(fallbackResults);
  const [cambridgeTests, setCambridgeTests] = useState<CambridgeTestSummary[]>(INITIAL_CAMBRIDGE_TESTS);
  const [isLoading, setIsLoading] = useState(false);

  // Quản lý cấp / hủy gói Pro
  const [proModalUser, setProModalUser] = useState<AdminUserRow | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'1month' | '6months' | '1year' | 'lifetime'>('6months');
  const [isUpdatingPro, setIsUpdatingPro] = useState(false);

  // Bộ lọc
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<'all' | 'Reading' | 'Listening'>('all');
  const [searchTestQuery, setSearchTestQuery] = useState('');
  const [selectedTestStatusFilter, setSelectedTestStatusFilter] = useState<'all' | 'Sẵn Sàng' | 'Tạm Khóa'>('all');

  // State Modal Chỉnh Sửa Đề & Đính Chính Đáp Án
  const [editingTest, setEditingTest] = useState<CambridgeTestSummary | null>(null);
  const [editDuration, setEditDuration] = useState<number>(60);
  const [editStatus, setEditStatus] = useState<'Sẵn Sàng' | 'Tạm Khóa'>('Sẵn Sàng');
  const [editQuestions, setEditQuestions] = useState<TestQuestionItem[]>([]);
  const [questionBatchIndex, setQuestionBatchIndex] = useState<number>(0); // 0: 1-10, 1: 11-20, 2: 21-30, 3: 31-40
  const [isSavingTest, setIsSavingTest] = useState(false);

  // Tải dữ liệu người dùng, kết quả thi và kho đề từ API
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, resultsRes, testsRes] = await Promise.allSettled([
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/exam-results').then((r) => r.json()),
        fetch('/api/admin/tests').then((r) => r.json()),
      ]);

      if (usersRes.status === 'fulfilled' && usersRes.value?.success && Array.isArray(usersRes.value.data)) {
        const normalized = usersRes.value.data.map((u: any) => ({
          ...u,
          is_pro: Boolean(u.is_pro),
        }));
        setUserList(normalized);
      }
      if (resultsRes.status === 'fulfilled' && resultsRes.value?.success && Array.isArray(resultsRes.value.data)) {
        setExamResults(resultsRes.value.data);
      }
      if (testsRes.status === 'fulfilled' && testsRes.value?.success && Array.isArray(testsRes.value.data)) {
        setCambridgeTests(testsRes.value.data);
      }
    } catch {
      // Dùng fallback state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // 1. Đổi vai trò người dùng (student <-> admin)
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

  // 2. Xóa tài khoản người dùng
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${userName}" khỏi hệ thống?`)) {
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

  // 2.1. Cấp quyền EduFlow Pro cho học viên
  const handleConfirmGrantPro = async () => {
    if (!proModalUser) return;
    setIsUpdatingPro(true);
    const pkg = PRO_PACKAGES.find((p) => p.id === selectedPackage) || PRO_PACKAGES[1];
    const expiryDate = pkg.durationDays > 0
      ? new Date(Date.now() + pkg.durationDays * 86400000).toLocaleDateString('vi-VN')
      : 'Vĩnh viễn';

    try {
      const res = await fetch(`/api/admin/users/${proModalUser.id}/pro`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: true,
          proPackage: pkg.name,
          proExpiry: expiryDate,
        }),
      });
      const data = await res.json().catch(() => null);

      setUserList((prev) =>
        prev.map((u) =>
          u.id === proModalUser.id
            ? { ...u, is_pro: true, pro_package: pkg.name, pro_expiry: expiryDate }
            : u
        )
      );

      // Cập nhật isolated localStorage key cho tài khoản này nếu đang test chung trình duyệt
      try {
        const userStorageKey = `eduflow_pro_user_${proModalUser.email.trim().toLowerCase()}`;
        const proData = {
          isPro: true,
          writingQuotaLeft: 9999,
          speakingQuotaLeft: 9999,
          lastResetDate: new Date().toISOString().slice(0, 10),
          planName: pkg.name,
          packageId: pkg.id,
          packageExpiry: expiryDate,
          lastOrderId: `ADMIN_GRANT_${Date.now()}`,
        };
        localStorage.setItem(userStorageKey, JSON.stringify(proData));
      } catch (e) {}

      onNotify(data?.message || `Đã cấp thành công ${pkg.name} cho "${proModalUser.full_name}"!`, 'success');
      setProModalUser(null);
    } catch {
      setUserList((prev) =>
        prev.map((u) =>
          u.id === proModalUser.id
            ? { ...u, is_pro: true, pro_package: pkg.name, pro_expiry: expiryDate }
            : u
        )
      );
      try {
        const userStorageKey = `eduflow_pro_user_${proModalUser.email.trim().toLowerCase()}`;
        localStorage.setItem(userStorageKey, JSON.stringify({
          isPro: true,
          writingQuotaLeft: 9999,
          speakingQuotaLeft: 9999,
          lastResetDate: new Date().toISOString().slice(0, 10),
          planName: pkg.name,
          packageId: pkg.id,
          packageExpiry: expiryDate,
          lastOrderId: `ADMIN_GRANT_${Date.now()}`,
        }));
      } catch {}
      onNotify(`Đã cấp thành công ${pkg.name} cho "${proModalUser.full_name}"!`, 'success');
      setProModalUser(null);
    } finally {
      setIsUpdatingPro(false);
    }
  };

  // 2.2. Hủy tư cách Pro của học viên
  const handleRevokePro = async (user: AdminUserRow) => {
    if (!confirm(`Bạn có chắc chắn muốn hủy tư cách Pro của "${user.full_name}" (${user.email})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}/pro`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: false,
          proPackage: null,
          proExpiry: null,
        }),
      });
      const data = await res.json().catch(() => null);

      setUserList((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, is_pro: false, pro_package: undefined, pro_expiry: undefined }
            : u
        )
      );

      // Reset user isolated localStorage key
      try {
        const userStorageKey = `eduflow_pro_user_${user.email.trim().toLowerCase()}`;
        localStorage.setItem(userStorageKey, JSON.stringify({
          isPro: false,
          writingQuotaLeft: 0,
          speakingQuotaLeft: 0,
          lastResetDate: new Date().toISOString().slice(0, 10),
          planName: 'Gói Free',
          packageId: '',
          packageExpiry: '',
          lastOrderId: '',
        }));
      } catch (e) {}

      onNotify(data?.message || `Đã hủy tư cách Pro của "${user.full_name}".`, 'info');
    } catch {
      setUserList((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, is_pro: false, pro_package: undefined, pro_expiry: undefined }
            : u
        )
      );
      try {
        const userStorageKey = `eduflow_pro_user_${user.email.trim().toLowerCase()}`;
        localStorage.setItem(userStorageKey, JSON.stringify({
          isPro: false,
          writingQuotaLeft: 0,
          speakingQuotaLeft: 0,
          lastResetDate: new Date().toISOString().slice(0, 10),
          planName: 'Gói Free',
          packageId: '',
          packageExpiry: '',
          lastOrderId: '',
        }));
      } catch {}
      onNotify(`Đã hủy tư cách Pro của "${user.full_name}".`, 'info');
    }
  };

  // 3. FEATURE 1: Bật/Tắt trạng thái đề thi (Active <-> Inactive / Sẵn Sàng <-> Tạm Khóa)
  const handleToggleTestStatus = async (test: CambridgeTestSummary) => {
    const nextStatus: 'Sẵn Sàng' | 'Tạm Khóa' = test.status === 'Sẵn Sàng' ? 'Tạm Khóa' : 'Sẵn Sàng';

    try {
      const res = await fetch(`/api/admin/tests/${test.id}/status`, {
        method: 'PUT',
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        onNotify(data.message, 'success');
      } else {
        onNotify(
          `Đã chuyển trạng thái đề "${test.book} - Test ${test.testNumber}" sang: ${nextStatus}`,
          nextStatus === 'Sẵn Sàng' ? 'success' : 'info'
        );
      }

      setCambridgeTests((prev) =>
        prev.map((t) => (t.id === test.id ? { ...t, status: nextStatus } : t))
      );
    } catch {
      setCambridgeTests((prev) =>
        prev.map((t) => (t.id === test.id ? { ...t, status: nextStatus } : t))
      );
      onNotify(
        `Đã chuyển trạng thái đề "${test.book} - Test ${test.testNumber}" sang: ${nextStatus}`,
        nextStatus === 'Sẵn Sàng' ? 'success' : 'info'
      );
    }
  };

  // 4. FEATURE 3: Mở Modal Chỉnh Sửa Đề & Đính Chính Đáp Án
  const handleOpenEditModal = (test: CambridgeTestSummary) => {
    setEditingTest(test);
    setEditDuration(test.durationMinutes || 60);
    setEditStatus(test.status);
    const existingQuestions = test.questions && test.questions.length === 40
      ? JSON.parse(JSON.stringify(test.questions))
      : createDefaultQuestions(test.book, test.testNumber);
    setEditQuestions(existingQuestions);
    setQuestionBatchIndex(0);
  };

  // Cập nhật đáp án từng câu hỏi trong Modal
  const handleUpdateQuestionField = (
    index: number,
    field: 'correctAnswer' | 'acceptableAnswers' | 'explanation',
    val: string
  ) => {
    setEditQuestions((prev) =>
      prev.map((q, idx) => (idx === index ? { ...q, [field]: val } : q))
    );
  };

  // Lưu chỉnh sửa đề thi & đính chính đáp án
  const handleSaveEditTest = async () => {
    if (!editingTest) return;
    setIsSavingTest(true);

    const payload = {
      durationMinutes: Number(editDuration),
      status: editStatus,
      questions: editQuestions,
    };

    try {
      const res = await fetch(`/api/admin/tests/${editingTest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        onNotify(data.message, 'success');
      } else {
        onNotify(`Đã lưu đính chính đáp án bộ đề "${editingTest.book} - Test ${editingTest.testNumber}" thành công!`, 'success');
      }

      setCambridgeTests((prev) =>
        prev.map((t) =>
          t.id === editingTest.id
            ? { ...t, durationMinutes: Number(editDuration), status: editStatus, questions: editQuestions }
            : t
        )
      );
      setEditingTest(null);
    } catch {
      setCambridgeTests((prev) =>
        prev.map((t) =>
          t.id === editingTest.id
            ? { ...t, durationMinutes: Number(editDuration), status: editStatus, questions: editQuestions }
            : t
        )
      );
      onNotify(`Đã lưu đính chính đáp án bộ đề "${editingTest.book} - Test ${editingTest.testNumber}" thành công!`, 'success');
      setEditingTest(null);
    } finally {
      setIsSavingTest(false);
    }
  };

  // Filtered lists
  const filteredUsers = useMemo(() => {
    if (!searchUserQuery.trim()) return userList;
    const q = searchUserQuery.toLowerCase();
    return userList.filter(
      (u) =>
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [userList, searchUserQuery]);

  const filteredResults = useMemo(() => {
    if (selectedSkillFilter === 'all') return examResults;
    return examResults.filter((r) => r.skill.toLowerCase() === selectedSkillFilter.toLowerCase());
  }, [examResults, selectedSkillFilter]);

  const filteredTests = useMemo(() => {
    return cambridgeTests.filter((test) => {
      const matchSearch =
        !searchTestQuery.trim() ||
        test.book.toLowerCase().includes(searchTestQuery.toLowerCase()) ||
        `test ${test.testNumber}`.includes(searchTestQuery.toLowerCase());
      const matchStatus =
        selectedTestStatusFilter === 'all' || test.status === selectedTestStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [cambridgeTests, searchTestQuery, selectedTestStatusFilter]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}p ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const studentCount = userList.filter((u) => u.role === 'student').length;
  const adminCount = userList.filter((u) => u.role === 'admin').length;
  const proCount = userList.filter((u) => u.is_pro).length;
  const activeTestsCount = cambridgeTests.filter((t) => t.status === 'Sẵn Sàng').length;
  const lockedTestsCount = cambridgeTests.filter((t) => t.status === 'Tạm Khóa').length;

  // Lấy 10 câu hỏi hiện tại cho trang trong modal
  const currentTenQuestions = useMemo(() => {
    const start = questionBatchIndex * 10;
    return editQuestions.slice(start, start + 10);
  }, [editQuestions, questionBatchIndex]);

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
              RBAC & Test Bank CRUD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
            EduFlow Admin Console
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Kiểm soát quyền truy cập của người dùng, phân cấp Quản trị viên - Học viên, bật/tắt đề thi và đính chính ngân hàng câu hỏi.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {onNavigate && (
            <>
              <button
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer"
                title="Quay về trang chủ giới thiệu EduFlow"
              >
                <Globe size={14} className="text-[#064E3B]" />
                <span>Trang Giới Thiệu</span>
              </button>

              <button
                onClick={() => onNavigate('reading')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer"
                title="Chuyển sang giao diện luyện thi của học viên"
              >
                <BookOpen size={14} className="text-[#D97706]" />
                <span>Giao Diện Học Viên</span>
              </button>
            </>
          )}

          <button
            onClick={loadAdminData}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#064E3B] text-amber-300 hover:bg-[#032B20] transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-amber-300' : ''} />
            {isLoading ? 'Đang đồng bộ...' : 'Làm mới dữ liệu'}
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Kho Đề Thi</span>
            <div className="text-2xl font-bold font-mono text-[#064E3B]">{cambridgeTests.length} Bộ Đề</div>
            <div className="text-[11px] text-stone-400">
              <span className="text-emerald-700 font-semibold">{activeTestsCount} mở</span> • <span className="text-rose-600 font-semibold">{lockedTestsCount} khóa</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-[#064E3B]">
            <BookOpen size={22} />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Học Viên & Bản Quyền</span>
            <div className="text-2xl font-bold font-mono text-[#D97706]">{studentCount} Bạn</div>
            <div className="text-[11px] text-stone-400">
              <span className="text-amber-700 font-semibold">{proCount} gói PRO</span> • <span className="text-stone-500">{studentCount - proCount} miễn phí</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-[#D97706]">
            <Crown size={22} />
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
            onClick={() => setAdminTab('tests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'tests'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <BookOpen size={14} />
            Kho Đề Cambridge & Quản Lý Đáp Án ({cambridgeTests.length})
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Users size={14} />
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
            Bảng Điểm Thi Thử ({examResults.length})
          </button>
        </div>

        {/* ================= TAB 1: KHO ĐỀ CAMBRIDGE & CRUD ĐÁP ÁN ================= */}
        {adminTab === 'tests' && (
          <div className="space-y-4">
            {/* Thanh tìm kiếm & lọc trạng thái */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="relative min-w-[220px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchTestQuery}
                    onChange={(e) => setSearchTestQuery(e.target.value)}
                    placeholder="Tìm bộ đề (vd: Cam 18, Test 1)..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                  <Filter size={13} /> Lọc trạng thái:
                </span>
                <div className="flex gap-1">
                  {(['all', 'Sẵn Sàng', 'Tạm Khóa'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedTestStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        selectedTestStatusFilter === st
                          ? 'bg-[#064E3B] text-white font-bold'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st === 'all' ? 'Tất cả' : st === 'Sẵn Sàng' ? 'Đang Mở' : 'Đang Khóa (Ẩn)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bảng danh sách đề thi */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Bộ Đề Thi</th>
                      <th className="p-4">Cấu Trúc</th>
                      <th className="p-4">Thời Lượng</th>
                      <th className="p-4">Số Câu Hỏi</th>
                      <th className="p-4">Trạng Thái Công Khai</th>
                      <th className="p-4 text-right">Thao Tác Quản Trị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredTests.map((test) => {
                      const isReady = test.status === 'Sẵn Sàng';
                      return (
                        <tr key={test.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-4 font-semibold text-stone-900">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isReady ? 'bg-emerald-500' : 'bg-rose-400'
                                }`}
                              />
                              <div>
                                <div className="font-bold text-stone-900">{test.book} - Test {test.testNumber}</div>
                                <div className="text-[10px] text-stone-400 font-mono">ID: {test.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-stone-600">
                            Full Test ({test.passagesCount} Passages / Sections)
                          </td>
                          <td className="p-4 font-mono font-semibold text-stone-700">
                            {test.durationMinutes} phút
                          </td>
                          <td className="p-4 font-mono text-stone-700">
                            {test.questionsCount} câu hỏi
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                                isReady
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              {isReady ? <CheckCircle size={12} /> : <Lock size={12} />}
                              {isReady ? 'Sẵn Sàng (Công Khai)' : 'Tạm Khóa (Đã Ẩn)'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* FEATURE 1: Nút Bật/Tắt Ẩn Hiện Đề */}
                              <button
                                onClick={() => handleToggleTestStatus(test)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isReady
                                    ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-300'
                                }`}
                                title={isReady ? 'Khóa/Ẩn đề khỏi thư viện học viên' : 'Mở công khai cho học viên làm bài'}
                              >
                                {isReady ? <EyeOff size={13} className="text-rose-500" /> : <Eye size={13} className="text-emerald-600" />}
                                {isReady ? 'Khóa Đề (Ẩn)' : 'Mở Công Khai'}
                              </button>

                              {/* FEATURE 3: Nút Sửa Đề & Đính Chính Đáp Án */}
                              <button
                                onClick={() => handleOpenEditModal(test)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                                title="Chỉnh sửa cấu hình thời gian và đính chính ngân hàng đáp án câu hỏi"
                              >
                                <Edit3 size={13} />
                                Sửa Đề & Đáp Án
                              </button>
                            </div>
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

        {/* ================= TAB 2: QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN ================= */}
        {adminTab === 'users' && (
          <div className="space-y-4">
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
                      <th className="p-4">Vai Trò</th>
                      <th className="p-4">Gói Bản Quyền</th>
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
                        <td className="p-4">
                          {user.is_pro ? (
                            <div className="inline-flex flex-col">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-xs">
                                <Sparkles size={11} className="text-amber-600" />
                                <span>{user.pro_package || 'EduFlow PRO'}</span>
                              </span>
                              {user.pro_expiry && (
                                <span className="text-[10px] text-stone-500 font-mono mt-0.5 ml-1 flex items-center gap-1">
                                  <Calendar size={10} className="text-stone-400" />
                                  Hạn: {user.pro_expiry}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                              Miễn phí (Free)
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono font-semibold text-stone-700">
                          {user.exams_taken ?? 0} bài thi
                        </td>
                        <td className="p-4 font-mono text-stone-400">
                          {new Date(user.created_at).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Cấp / Hủy Quyền Pro */}
                            {user.is_pro ? (
                              <button
                                onClick={() => handleRevokePro(user)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                                title="Hủy tư cách PRO của người dùng này"
                              >
                                <X size={12} />
                                <span>Hủy PRO</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setProModalUser(user);
                                  setSelectedPackage('6months');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer shadow-xs"
                                title="Cấp quyền EduFlow Pro cho học viên"
                              >
                                <Sparkles size={12} className="text-amber-600" />
                                <span>Cấp PRO</span>
                              </button>
                            )}

                            {/* Thăng cấp / Hạ cấp Role */}
                            <button
                              onClick={() => handleToggleRole(user)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                                user.role === 'admin'
                                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-200'
                              }`}
                              title={user.role === 'admin' ? 'Hạ cấp về Học Viên' : 'Nâng cấp lên Quản Trị Viên'}
                            >
                              <Shield size={12} />
                              <span>{user.role === 'admin' ? 'Hạ cấp' : 'Thăng cấp'}</span>
                            </button>

                            {/* Xóa User */}
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

        {/* ================= TAB 3: BẢNG ĐIỂM THI THỬ ================= */}
        {adminTab === 'results' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
              <div className="text-xs text-stone-600">
                Hiển thị kết quả thi thử gần đây của tất cả học viên trong hệ thống.
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
      </div>

      {/* ================= MODAL CHỈNH SỬA ĐỀ & ĐÍNH CHÍNH ĐÁP ÁN (FEATURE 3) ================= */}
      {editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-bold">
                  Quản Trị Đề Thi • Chỉnh Sửa Bộ Đề & Đáp Án
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {editingTest.book} - Test {editingTest.testNumber}
                </h3>
              </div>
              <button
                onClick={() => setEditingTest(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div data-lenis-prevent="true" className="p-6 overflow-y-auto space-y-6">
              {/* Cấu hình chung */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Thời lượng làm bài (Phút)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={180}
                    value={editDuration}
                    onChange={(e) => setEditDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Trạng thái công khai
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'Sẵn Sàng' | 'Tạm Khóa')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                  >
                    <option value="Sẵn Sàng">Sẵn Sàng (Công Khai Học Viên)</option>
                    <option value="Tạm Khóa">Tạm Khóa (Đang Soạn Thảo / Ẩn)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Quy chuẩn bộ đề
                  </label>
                  <div className="text-xs text-stone-500 py-2 font-mono">
                    40 Câu Hỏi • Chuẩn Quốc Tế IDP / BC
                  </div>
                </div>
              </div>

              {/* Ngân hàng câu hỏi & Đính chính đáp án */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 font-serif">
                      Đính Chính Đáp Án & Dẫn Chứng Câu Hỏi
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Cho phép sửa đáp án chính, bổ sung các biến thể chấp nhận được (ngăn cách bởi dấu phẩy) và giải thích.
                    </p>
                  </div>

                  {/* Batch tabs */}
                  <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
                    {[
                      { label: 'Câu 1 - 10', idx: 0 },
                      { label: 'Câu 11 - 20', idx: 1 },
                      { label: 'Câu 21 - 30', idx: 2 },
                      { label: 'Câu 31 - 40', idx: 3 },
                    ].map((tab) => (
                      <button
                        key={tab.idx}
                        onClick={() => setQuestionBatchIndex(tab.idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          questionBatchIndex === tab.idx
                            ? 'bg-white text-[#064E3B] shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-600 uppercase">
                      <tr>
                        <th className="p-3 w-16">Câu</th>
                        <th className="p-3 w-36">Dạng Câu</th>
                        <th className="p-3 w-44">Đáp Án Chuẩn</th>
                        <th className="p-3 w-48">Biến Thể Hợp Lệ (Acceptable)</th>
                        <th className="p-3">Dẫn Chứng / Giải Thích</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {currentTenQuestions.map((q, idx) => {
                        const globalIndex = questionBatchIndex * 10 + idx;
                        return (
                          <tr key={q.number} className="hover:bg-stone-50/50">
                            <td className="p-3 font-mono font-bold text-[#064E3B]">
                              #{q.number}
                            </td>
                            <td className="p-3 text-stone-600 font-medium">
                              {q.type}
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={q.correctAnswer}
                                onChange={(e) =>
                                  handleUpdateQuestionField(globalIndex, 'correctAnswer', e.target.value)
                                }
                                placeholder="Đáp án..."
                                className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 font-semibold text-stone-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={q.acceptableAnswers || ''}
                                onChange={(e) =>
                                  handleUpdateQuestionField(globalIndex, 'acceptableAnswers', e.target.value)
                                }
                                placeholder="vd: sixty, 60%..."
                                className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 font-mono text-stone-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={q.explanation || ''}
                                onChange={(e) =>
                                  handleUpdateQuestionField(globalIndex, 'explanation', e.target.value)
                                }
                                placeholder="Ghi chú đính chính / trích đoạn bài thi..."
                                className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 text-stone-600 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 bg-stone-50">
              <span className="text-xs text-stone-500">
                Lưu ý: Thay đổi đáp án sẽ được cập nhật vào hệ thống tự động chấm điểm.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingTest(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  onClick={handleSaveEditTest}
                  disabled={isSavingTest}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-[#064E3B] hover:bg-[#053d2e] text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Save size={14} />
                  {isSavingTest ? 'Đang lưu...' : 'Lưu Thay Đổi & Đính Chính'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CẤP QUYỀN PRO CHO HỌC VIÊN ================= */}
      {proModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                  <Crown size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">Cấp Quyền EduFlow PRO</h3>
                  <p className="text-xs text-stone-500">
                    Dành cho học viên <strong className="text-stone-800">{proModalUser.full_name}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProModalUser(null)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
              <div className="text-stone-500">Email học viên:</div>
              <div className="font-mono font-bold text-stone-800">{proModalUser.email}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">Chọn thời hạn gói PRO:</label>
              <div className="space-y-2">
                {PRO_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id as any)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          {pkg.name}
                          {pkg.id === '6months' && (
                            <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-sans font-medium">
                              Khuyên dùng
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{pkg.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setProModalUser(null)}
                disabled={isUpdatingPro}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmGrantPro}
                disabled={isUpdatingPro}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>{isUpdatingPro ? 'Đang kích hoạt...' : 'Xác Nhận Cấp PRO'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
