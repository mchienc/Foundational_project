// controllers/authController.js
// Xử lý xác thực tài khoản người dùng (RESTful API cho React SPA)

const bcrypt = require('bcryptjs');
const db = require('../config/db');

// API Đăng nhập
async function apiLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const [users] = await db.query('SELECT * FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });
    }

    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    const avatar = user.role === 'admin'
      ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';

    return res.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: String(user.id),
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar,
      },
    });
  } catch (err) {
    console.error('apiLogin error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng nhập.' });
  }
}

// API Đăng ký tài khoản
async function apiRegister(req, res) {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const [existingUsers] = await db.query('SELECT id FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email này đã được đăng ký.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name.trim(), trimmedEmail, hashedPassword, 'student']
    );

    const avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
    const newUser = {
      id: String(result.insertId),
      full_name: full_name.trim(),
      email: trimmedEmail,
      role: 'student',
      avatar,
    };

    req.session.user = {
      id: result.insertId,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
    };

    return res.json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      user: newUser,
    });
  } catch (err) {
    console.error('apiRegister error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng ký.' });
  }
}

// API Kiểm tra trạng thái đăng nhập
function apiMe(req, res) {
  if (req.session && req.session.user) {
    const u = req.session.user;
    return res.json({
      success: true,
      user: {
        id: String(u.id),
        full_name: u.full_name,
        email: u.email,
        role: u.role,
        avatar: u.role === 'admin'
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      },
    });
  }
  return res.json({ success: false, user: null });
}

// API Đăng xuất
function apiLogout(req, res) {
  req.session.destroy(() => {
    return res.json({ success: true, message: 'Đã đăng xuất thành công.' });
  });
}

module.exports = {
  apiLogin,
  apiRegister,
  apiMe,
  apiLogout,
};
