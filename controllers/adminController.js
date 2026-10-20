// controllers/adminController.js
// Nghiệp vụ quản trị hệ thống: Quản lý người dùng, phân quyền (RBAC), theo dõi bảng điểm toàn sàn

const db = require('../config/db');

// Dữ liệu mẫu dự phòng (fallback khi chưa khởi động MySQL local)
let memoryUsers = [
  { id: '1', full_name: 'Quản Trị Viên Hệ Thống', email: 'admin@example.com', role: 'admin', created_at: '2026-08-01T08:00:00Z', exams_taken: 12 },
  { id: '2', full_name: 'Minh Chiến Đặng', email: 'dangchien2005@gmail.com', role: 'student', created_at: '2026-08-15T10:30:00Z', exams_taken: 8 },
  { id: '3', full_name: 'Hoàng Kim Yến', email: 'kimyen@example.com', role: 'student', created_at: '2026-08-22T14:15:00Z', exams_taken: 5 },
  { id: '4', full_name: 'Trần Hải Đăng', email: 'haidang@example.com', role: 'admin', created_at: '2026-08-28T09:00:00Z', exams_taken: 9 },
  { id: '5', full_name: 'Lê Quốc Bảo', email: 'quocbao@example.com', role: 'student', created_at: '2026-09-02T16:20:00Z', exams_taken: 3 },
  { id: '6', full_name: 'Nguyễn Phương Thảo', email: 'phuongthao@example.com', role: 'student', created_at: '2026-09-10T11:45:00Z', exams_taken: 6 },
];

let memoryExamResults = [
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

// 1. Thống kê tổng quan cho Dashboard
exports.getAdminStats = async (req, res) => {
  try {
    let usersCount = memoryUsers.length;
    let studentsCount = memoryUsers.filter((u) => u.role === 'student').length;
    let adminsCount = memoryUsers.filter((u) => u.role === 'admin').length;
    let submissionsCount = memoryExamResults.length;

    try {
      const [uRows] = await db.query('SELECT COUNT(*) AS total, SUM(CASE WHEN role = "admin" THEN 1 ELSE 0 END) AS admins, SUM(CASE WHEN role = "student" THEN 1 ELSE 0 END) AS students FROM users');
      if (uRows && uRows[0] && uRows[0].total > 0) {
        usersCount = uRows[0].total;
        adminsCount = uRows[0].admins || 0;
        studentsCount = uRows[0].students || 0;
      }
      const [eRows] = await db.query('SELECT COUNT(*) AS total FROM user_cambridge_exam_results');
      if (eRows && eRows[0]) {
        submissionsCount = Math.max(submissionsCount, eRows[0].total);
      }
    } catch (dbErr) {
      // Dùng fallback memory state
    }

    res.json({
      success: true,
      data: {
        totalUsers: usersCount,
        studentsCount,
        adminsCount,
        totalSubmissions: submissionsCount,
        totalCambridgeTests: 28,
        activeTestsCount: 28,
      },
    });
  } catch (error) {
    console.error('getAdminStats error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy thống kê.' });
  }
};

// 2. Lấy danh sách toàn bộ người dùng
exports.getAllUsers = async (req, res) => {
  try {
    try {
      const [rows] = await db.query(`
        SELECT u.id, u.full_name, u.email, u.role, u.created_at,
               COUNT(r.id) AS exams_taken
        FROM users u
        LEFT JOIN user_cambridge_exam_results r ON u.id = r.user_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
      `);
      if (rows && rows.length > 0) {
        return res.json({ success: true, count: rows.length, data: rows });
      }
    } catch (dbErr) {
      // Fallback
    }

    res.json({ success: true, count: memoryUsers.length, data: memoryUsers });
  } catch (error) {
    console.error('getAllUsers error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy danh sách người dùng.' });
  }
};

// 3. Phân quyền / Cập nhật vai trò người dùng (student <-> admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Vai trò không hợp lệ (chỉ chấp nhận student hoặc admin).' });
    }

    // Cập nhật CSDL MySQL nếu có kết nối
    try {
      await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    } catch (dbErr) {
      // Fallback memory
    }

    // Cập nhật memory state
    memoryUsers = memoryUsers.map((u) => (String(u.id) === String(id) ? { ...u, role } : u));

    res.json({
      success: true,
      message: `Đã cập nhật vai trò thành: ${role === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}`,
      data: { id, role },
    });
  } catch (error) {
    console.error('updateUserRole error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi cập nhật vai trò.' });
  }
};

// 4. Khoá / Xoá tài khoản người dùng
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Không cho phép tự xoá chính mình nếu ID trùng session user
    if (req.session?.user && String(req.session.user.id) === String(id)) {
      return res.status(400).json({ success: false, message: 'Không thể xoá tài khoản đang đăng nhập của chính bạn.' });
    }

    try {
      await db.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (dbErr) {
      // Fallback memory
    }

    memoryUsers = memoryUsers.filter((u) => String(u.id) !== String(id));

    res.json({
      success: true,
      message: 'Đã xoá tài khoản người dùng khỏi hệ thống thành công.',
      data: { id },
    });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi xoá tài khoản.' });
  }
};

// 5. Lấy bảng điểm nộp bài của toàn bộ học viên trong hệ thống
exports.getAllExamResults = async (req, res) => {
  try {
    try {
      const [rows] = await db.query(`
        SELECT r.id, r.user_id, u.full_name AS user_name, u.email AS user_email,
               p.source AS test_title, 'Reading' AS skill,
               r.correct_count, r.total_count, r.band_score, r.time_taken_seconds,
               r.created_at
        FROM user_cambridge_exam_results r
        JOIN users u ON r.user_id = u.id
        LEFT JOIN cambridge_reading_passages p ON r.passage_id = p.id
        ORDER BY r.created_at DESC
        LIMIT 50
      `);
      if (rows && rows.length > 0) {
        return res.json({ success: true, count: rows.length, data: rows });
      }
    } catch (dbErr) {
      // Fallback
    }

    res.json({ success: true, count: memoryExamResults.length, data: memoryExamResults });
  } catch (error) {
    console.error('getAllExamResults error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy bảng điểm.' });
  }
};
