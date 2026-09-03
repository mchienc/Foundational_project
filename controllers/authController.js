// controllers/authController.js
// Controller chứa logic xử lý: nhận dữ liệu từ request, thao tác với DB,
// rồi trả kết quả (render trang hoặc redirect).

const bcrypt = require('bcrypt');
const db = require('../config/db');

// Hiển thị trang đăng ký
function showRegisterForm(req, res) {
  res.render('register', { error: null });
}

// Xử lý khi người dùng submit form đăng ký
async function register(req, res) {
  try {
    const { full_name, email, password, confirm_password } = req.body;

    // 1. Validate dữ liệu đầu vào cơ bản
    if (!full_name || !email || !password) {
      return res.render('register', { error: 'Vui lòng điền đầy đủ thông tin.' });
    }
    if (password !== confirm_password) {
      return res.render('register', { error: 'Mật khẩu xác nhận không khớp.' });
    }
    if (password.length < 6) {
      return res.render('register', { error: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }

    // 2. Kiểm tra email đã tồn tại chưa
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.render('register', { error: 'Email này đã được đăng ký.' });
    }

    // 3. Hash mật khẩu trước khi lưu vào DB (KHÔNG BAO GIỜ lưu mật khẩu dạng thô)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Lưu người dùng mới vào DB, mặc định role = 'student'
    await db.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name, email, hashedPassword, 'student']
    );

    // 5. Đăng ký xong thì chuyển sang trang đăng nhập
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
}

// Hiển thị trang đăng nhập
function showLoginForm(req, res) {
  res.render('login', { error: null });
}

// Xử lý khi người dùng submit form đăng nhập
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Tìm người dùng theo email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.render('login', { error: 'Email hoặc mật khẩu không đúng.' });
    }
    const user = users[0];

    // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Email hoặc mật khẩu không đúng.' });
    }

    // 3. Lưu thông tin người dùng vào session để các trang khác biết ai đang đăng nhập
    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    };

    // 4. Điều hướng theo vai trò
    if (user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/courses');
    }
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
}

// Đăng xuất: hủy session và quay lại trang đăng nhập
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = { showRegisterForm, register, showLoginForm, login, logout };
