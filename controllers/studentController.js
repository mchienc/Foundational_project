// controllers/studentController.js
// Xử lý các chức năng phía học viên: xem danh sách khóa học, xem chi tiết,
// đăng ký tham gia khóa học, xem nội dung bài học.

const db = require('../config/db');

// Trang danh sách tất cả khóa học (ai đăng nhập cũng xem được)
async function listCourses(req, res) {
  try {
    const userId = req.session.user.id;

    // Lấy tất cả khóa học, kèm theo thông tin: user này đã đăng ký khóa nào chưa
    const [courses] = await db.query(
      `SELECT c.*,
              e.id AS enrollment_id
       FROM courses c
       LEFT JOIN enrollments e ON e.course_id = c.id AND e.user_id = ?
       ORDER BY c.created_at DESC`,
      [userId]
    );

    res.render('student/courses', { courses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách khóa học.');
  }
}

// Trang chi tiết 1 khóa học: hiển thị danh sách bài học,
// nếu chưa đăng ký thì hiện nút "Đăng ký tham gia"
async function courseDetail(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }

    const [enrollments] = await db.query(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );
    const isEnrolled = enrollments.length > 0;

    const [lessons] = await db.query(
      'SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
      [id]
    );

    res.render('student/course_detail', {
      course: courses[0],
      lessons,
      isEnrolled
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý đăng ký tham gia khóa học
async function enroll(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params; // course id

    // Kiểm tra đã đăng ký chưa để tránh lỗi trùng (UNIQUE KEY trong DB cũng đã chặn việc này)
    const [existing] = await db.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );
    if (existing.length === 0) {
      await db.query(
        'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
        [userId, id]
      );
    }

    res.redirect(`/courses/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi đăng ký khóa học.');
  }
}

// Trang xem nội dung 1 bài học cụ thể
// Chỉ cho xem nếu học viên đã đăng ký khóa học chứa bài học đó
async function lessonDetail(req, res) {
  try {
    const userId = req.session.user.id;
    const { courseId, lessonId } = req.params;

    const [enrollments] = await db.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    if (enrollments.length === 0) {
      return res.status(403).send('Bạn cần đăng ký khóa học này trước khi xem bài học.');
    }

    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [lessonId]);
    if (courses.length === 0 || lessons.length === 0) {
      return res.status(404).send('Không tìm thấy nội dung.');
    }

    // Lấy danh sách tất cả bài học để hiển thị menu điều hướng bên cạnh
    const [allLessons] = await db.query(
      'SELECT id, title, order_index FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
      [courseId]
    );

    // Kiểm tra bài học này đã có bài kiểm tra chưa, để hiện nút "Làm bài kiểm tra"
    const [quizzes] = await db.query('SELECT id FROM quizzes WHERE lesson_id = ?', [lessonId]);

    res.render('student/lesson_detail', {
      course: courses[0],
      lesson: lessons[0],
      allLessons,
      quiz: quizzes.length > 0 ? quizzes[0] : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

module.exports = { listCourses, courseDetail, enroll, lessonDetail };
