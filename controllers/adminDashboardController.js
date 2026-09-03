// controllers/adminDashboardController.js
// Trang tổng quan thống kê dành cho Quản trị viên

const db = require('../config/db');

async function dashboard(req, res) {
  try {
    // === THỐNG KÊ TỔNG QUAN (Stats Cards) ===

    // Tổng số khóa học
    const [[{ totalCourses }]] = await db.query('SELECT COUNT(*) AS totalCourses FROM courses');

    // Tổng số bài học
    const [[{ totalLessons }]] = await db.query('SELECT COUNT(*) AS totalLessons FROM lessons');

    // Tổng số học viên (role = student)
    const [[{ totalStudents }]] = await db.query("SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'");

    // Tổng số lượt ghi danh
    const [[{ totalEnrollments }]] = await db.query('SELECT COUNT(*) AS totalEnrollments FROM enrollments');

    // Tổng số bài kiểm tra đã hoàn thành (quiz_results)
    const [[{ totalQuizResults }]] = await db.query('SELECT COUNT(*) AS totalQuizResults FROM quiz_results');

    // Tổng số câu hỏi thảo luận
    const [[{ totalComments }]] = await db.query('SELECT COUNT(*) AS totalComments FROM lesson_comments');

    // === TOP KHÓA HỌC ĐƯỢC ĐĂNG KÝ NHIỀU NHẤT ===
    const [topCourses] = await db.query(`
      SELECT c.id, c.title, 
             COUNT(e.id) AS enrollment_count,
             ROUND(AVG(e.progress), 0) AS avg_progress
      FROM courses c
      LEFT JOIN enrollments e ON e.course_id = c.id
      GROUP BY c.id, c.title
      ORDER BY enrollment_count DESC
      LIMIT 5
    `);

    // === DANH SÁCH HỌC VIÊN GẦN ĐÂY ===
    const [recentStudents] = await db.query(`
      SELECT u.id, u.full_name, u.email, u.created_at,
             COUNT(DISTINCT e.course_id) AS enrolled_courses,
             COALESCE(MAX(e.progress), 0) AS max_progress
      FROM users u
      LEFT JOIN enrollments e ON e.user_id = u.id
      WHERE u.role = 'student'
      GROUP BY u.id, u.full_name, u.email, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 8
    `);

    // === HOẠT ĐỘNG BÌNH LUẬN GẦN ĐÂY ===
    const [recentComments] = await db.query(`
      SELECT lc.id, lc.content, lc.created_at,
             u.full_name, u.role AS user_role,
             l.title AS lesson_title,
             l.course_id
      FROM lesson_comments lc
      JOIN users u ON u.id = lc.user_id
      JOIN lessons l ON l.id = lc.lesson_id
      ORDER BY lc.created_at DESC
      LIMIT 5
    `);

    // === TIẾN ĐỘ HỌC TẬP TỔNG THỂ ===
    const [[{ completedCount }]] = await db.query(
      'SELECT COUNT(*) AS completedCount FROM enrollments WHERE progress = 100'
    );
    const completionRate = totalEnrollments > 0 
      ? Math.round((completedCount / totalEnrollments) * 100) 
      : 0;

    res.render('admin/dashboard', {
      stats: {
        totalCourses,
        totalLessons,
        totalStudents,
        totalEnrollments,
        totalQuizResults,
        totalComments,
        completionRate,
        completedCount
      },
      topCourses,
      recentStudents,
      recentComments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải Dashboard.');
  }
}

// Trang quản lý người dùng
async function users(req, res) {
  try {
    const [userList] = await db.query(`
      SELECT u.id, u.full_name, u.email, u.role, u.created_at,
             COUNT(DISTINCT e.course_id) AS enrolled_courses,
             COALESCE(ROUND(AVG(e.progress), 0), 0) AS avg_progress
      FROM users u
      LEFT JOIN enrollments e ON e.user_id = u.id
      GROUP BY u.id, u.full_name, u.email, u.role, u.created_at
      ORDER BY u.created_at DESC
    `);

    res.render('admin/users', { userList });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách người dùng.');
  }
}

// Thay đổi vai trò người dùng (student <-> admin)
async function updateUserRole(req, res) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Không cho phép tự thay đổi vai trò của chính mình
    if (Number(userId) === req.session.user.id) {
      return res.redirect('/admin/users?error=Không+thể+thay+đổi+vai+trò+của+chính+mình.');
    }

    if (!['student', 'admin'].includes(role)) {
      return res.redirect('/admin/users?error=Vai+trò+không+hợp+lệ.');
    }

    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi cập nhật vai trò.');
  }
}

// Xóa người dùng
async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    if (Number(userId) === req.session.user.id) {
      return res.redirect('/admin/users?error=Không+thể+xóa+tài+khoản+đang+đăng+nhập.');
    }

    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa người dùng.');
  }
}

module.exports = { dashboard, users, updateUserRole, deleteUser };
