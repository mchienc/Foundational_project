// controllers/lessonController.js
// Xử lý CRUD cho Bài học, mỗi bài học thuộc về 1 khóa học (course_id).

const db = require('../config/db');

// Hiển thị danh sách bài học của 1 khóa học
async function index(req, res) {
  try {
    const { courseId } = req.params;
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }
    const [lessons] = await db.query(
      `SELECT l.*,
              q.id AS quiz_id,
              q.title AS quiz_title,
              (SELECT COUNT(*) FROM questions WHERE quiz_id = q.id) AS question_count
       FROM lessons l
       LEFT JOIN quizzes q ON q.lesson_id = l.id
       WHERE l.course_id = ?
       ORDER BY l.order_index ASC`,
      [courseId]
    );
    res.render('admin/lessons/index', { course: courses[0], lessons });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách bài học.');
  }
}

// Hiển thị form tạo bài học mới
async function showCreateForm(req, res) {
  try {
    const { courseId } = req.params;
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }
    res.render('admin/lessons/new', { course: courses[0], error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý tạo bài học mới
async function create(req, res) {
  try {
    const { courseId } = req.params;
    const { title, content, video_url, attachment_url, order_index } = req.body;

    if (!title || title.trim() === '') {
      const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
      return res.render('admin/lessons/new', {
        course: courses[0],
        error: 'Vui lòng nhập tên bài học.'
      });
    }

    await db.query(
      'INSERT INTO lessons (course_id, title, content, video_url, attachment_url, order_index) VALUES (?, ?, ?, ?, ?, ?)',
      [courseId, title.trim(), content || null, video_url ? video_url.trim() : null, attachment_url ? attachment_url.trim() : null, order_index || 0]
    );

    res.redirect(`/admin/courses/${courseId}/lessons`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Hiển thị form sửa bài học
async function showEditForm(req, res) {
  try {
    const { courseId, id } = req.params;
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [id]);
    if (courses.length === 0 || lessons.length === 0) {
      return res.status(404).send('Không tìm thấy dữ liệu.');
    }
    res.render('admin/lessons/edit', { course: courses[0], lesson: lessons[0], error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý cập nhật bài học
async function update(req, res) {
  try {
    const { courseId, id } = req.params;
    const { title, content, video_url, attachment_url, order_index } = req.body;

    if (!title || title.trim() === '') {
      const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
      const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [id]);
      return res.render('admin/lessons/edit', {
        course: courses[0],
        lesson: lessons[0],
        error: 'Vui lòng nhập tên bài học.'
      });
    }

    await db.query(
      'UPDATE lessons SET title = ?, content = ?, video_url = ?, attachment_url = ?, order_index = ? WHERE id = ?',
      [title.trim(), content || null, video_url ? video_url.trim() : null, attachment_url ? attachment_url.trim() : null, order_index || 0, id]
    );

    res.redirect(`/admin/courses/${courseId}/lessons`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý xóa bài học
async function remove(req, res) {
  try {
    const { courseId, id } = req.params;
    await db.query('DELETE FROM lessons WHERE id = ?', [id]);
    res.redirect(`/admin/courses/${courseId}/lessons`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa bài học.');
  }
}

module.exports = { index, showCreateForm, create, showEditForm, update, remove };
