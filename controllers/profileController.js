// controllers/profileController.js
// Trang cá nhân học viên: xem thống kê, chỉnh sửa hồ sơ, đổi mật khẩu

const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Trang Profile cá nhân
async function showProfile(req, res) {
  try {
    const userId = req.session.user.id;

    // Thông tin cơ bản
    const [[user]] = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
      [userId]
    );

    // Thống kê học tập
    const [[{ enrolledCount }]] = await db.query(
      'SELECT COUNT(*) AS enrolledCount FROM enrollments WHERE user_id = ?', [userId]
    );
    const [[{ completedCount }]] = await db.query(
      'SELECT COUNT(*) AS completedCount FROM enrollments WHERE user_id = ? AND progress = 100', [userId]
    );
    const [[{ totalLessonsCompleted }]] = await db.query(
      'SELECT COUNT(*) AS totalLessonsCompleted FROM lesson_completions WHERE user_id = ?', [userId]
    );
    const [[{ quizCount }]] = await db.query(
      'SELECT COUNT(*) AS quizCount FROM quiz_results WHERE user_id = ?', [userId]
    );
    const [[{ avgScore }]] = await db.query(
      'SELECT ROUND(AVG(score), 1) AS avgScore FROM quiz_results WHERE user_id = ?', [userId]
    );
    const [[{ commentCount }]] = await db.query(
      'SELECT COUNT(*) AS commentCount FROM lesson_comments WHERE user_id = ?', [userId]
    );

    // Khóa học đang học (progress < 100)
    const [inProgress] = await db.query(`
      SELECT c.id, c.title, c.image, e.progress, e.enrolled_at
      FROM enrollments e JOIN courses c ON c.id = e.course_id
      WHERE e.user_id = ? AND e.progress < 100
      ORDER BY e.enrolled_at DESC LIMIT 3
    `, [userId]);

    // Chứng chỉ đã lấy (progress = 100)
    const [certificates] = await db.query(`
      SELECT c.id, c.title, e.enrolled_at
      FROM enrollments e JOIN courses c ON c.id = e.course_id
      WHERE e.user_id = ? AND e.progress = 100
      ORDER BY e.enrolled_at DESC
    `, [userId]);

    res.render('student/profile', {
      user,
      stats: { enrolledCount, completedCount, totalLessonsCompleted, quizCount, avgScore: avgScore || 0, commentCount },
      inProgress,
      certificates,
      query: req.query
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Cập nhật hồ sơ (tên & email)
async function updateProfile(req, res) {
  try {
    const userId = req.session.user.id;
    const { full_name, email } = req.body;

    if (!full_name || !email) {
      return res.redirect('/profile?error=Vui+lòng+điền+đầy+đủ+thông+tin.');
    }

    // Kiểm tra email đã dùng bởi người khác chưa
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]
    );
    if (existing.length > 0) {
      return res.redirect('/profile?error=Email+này+đã+được+sử+dụng+bởi+tài+khoản+khác.');
    }

    await db.query('UPDATE users SET full_name = ?, email = ? WHERE id = ?', [full_name, email, userId]);

    // Cập nhật lại session
    req.session.user.full_name = full_name;
    req.session.user.email = email;

    res.redirect('/profile?success=Cập+nhật+hồ+sơ+thành+công!');
  } catch (err) {
    console.error(err);
    res.redirect('/profile?error=Có+lỗi+xảy+ra,+vui+lòng+thử+lại.');
  }
}

// Đổi mật khẩu
async function changePassword(req, res) {
  try {
    const userId = req.session.user.id;
    const { current_password, new_password, confirm_password } = req.body;

    if (!current_password || !new_password || !confirm_password) {
      return res.redirect('/profile?error=Vui+lòng+điền+đầy+đủ+thông+tin+đổi+mật+khẩu.&tab=security');
    }
    if (new_password.length < 6) {
      return res.redirect('/profile?error=Mật+khẩu+mới+phải+có+ít+nhất+6+ký+tự.&tab=security');
    }
    if (new_password !== confirm_password) {
      return res.redirect('/profile?error=Mật+khẩu+xác+nhận+không+khớp.&tab=security');
    }

    // Xác minh mật khẩu hiện tại
    const [[userRow]] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    const isMatch = await bcrypt.compare(current_password, userRow.password);
    if (!isMatch) {
      return res.redirect('/profile?error=Mật+khẩu+hiện+tại+không+đúng.&tab=security');
    }

    const hashed = await bcrypt.hash(new_password, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

    res.redirect('/profile?success=Đổi+mật+khẩu+thành+công!&tab=security');
  } catch (err) {
    console.error(err);
    res.redirect('/profile?error=Có+lỗi+xảy+ra.&tab=security');
  }
}

// Trang "Khóa học của tôi"
async function myCourses(req, res) {
  try {
    const userId = req.session.user.id;

    const [enrolled] = await db.query(`
      SELECT c.id, c.title, c.description, c.image, e.progress, e.enrolled_at,
             (SELECT COUNT(*) FROM lessons WHERE course_id = c.id) AS total_lessons,
             (SELECT COUNT(*) FROM lesson_completions WHERE user_id = ? AND course_id = c.id) AS done_lessons
      FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      WHERE e.user_id = ?
      ORDER BY e.enrolled_at DESC
    `, [userId, userId]);

    const inProgress = enrolled.filter(c => c.progress < 100);
    const completed  = enrolled.filter(c => c.progress === 100);

    res.render('student/my_courses', { inProgress, completed });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

module.exports = { showProfile, updateProfile, changePassword, myCourses };
