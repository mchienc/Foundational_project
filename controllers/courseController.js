// controllers/courseController.js
// Xử lý CRUD (Create - Read - Update - Delete) cho Khóa học, dành cho Admin.

const db = require('../config/db');

// Hiển thị danh sách tất cả khóa học
async function index(req, res) {
  try {
    const [courses] = await db.query(
      'SELECT * FROM courses ORDER BY created_at DESC'
    );
    res.render('admin/courses/index', { courses, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách khóa học.');
  }
}

// Hiển thị form tạo khóa học mới
function showCreateForm(req, res) {
  res.render('admin/courses/new', { error: null });
}

// Xử lý tạo khóa học mới
async function create(req, res) {
  try {
    const { title, description, image } = req.body;

    if (!title || title.trim() === '') {
      return res.render('admin/courses/new', { error: 'Vui lòng nhập tên khóa học.' });
    }

    await db.query(
      'INSERT INTO courses (title, description, image, created_by) VALUES (?, ?, ?, ?)',
      [title, description || null, image || null, req.session.user.id]
    );

    res.redirect('/admin/courses');
  } catch (err) {
    console.error(err);
    res.render('admin/courses/new', { error: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
}

// Hiển thị form sửa khóa học
async function showEditForm(req, res) {
  try {
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }
    res.render('admin/courses/edit', { course: courses[0], error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý cập nhật khóa học
async function update(req, res) {
  try {
    const { title, description, image } = req.body;
    const { id } = req.params;

    if (!title || title.trim() === '') {
      const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
      return res.render('admin/courses/edit', {
        course: courses[0],
        error: 'Vui lòng nhập tên khóa học.'
      });
    }

    await db.query(
      'UPDATE courses SET title = ?, description = ?, image = ? WHERE id = ?',
      [title, description || null, image || null, id]
    );

    res.redirect('/admin/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý xóa khóa học
// Lưu ý: nhờ ON DELETE CASCADE đã thiết lập trong database, xóa khóa học sẽ
// tự động xóa luôn các bài học, bài kiểm tra liên quan — không để lại dữ liệu rác.
async function remove(req, res) {
  try {
    await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.redirect('/admin/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa khóa học.');
  }
}

module.exports = { index, showCreateForm, create, showEditForm, update, remove };
