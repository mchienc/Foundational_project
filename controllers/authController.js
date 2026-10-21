// controllers/authController.js
// Xử lý xác thực tài khoản người dùng, phân quyền RBAC, Google Sign-in và Quên mật khẩu OTP

const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { sendOtpEmail } = require('../services/emailService');

// In-memory store cho OTP quên mật khẩu: email -> { otp: string, expiresAt: number }
const otpStore = new Map();

// In-memory demo users fallback (khi MySQL local chưa bật hoặc để chấm đồ án nhanh)
const fallbackUsers = [
  {
    id: '1',
    full_name: 'Quản Trị Viên Hệ Thống',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    full_name: 'Học Viên EduFlow',
    email: 'student@example.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  },
];

// Helper lấy avatar theo role
const getAvatarByRole = (role, customAvatar) => {
  if (customAvatar) return customAvatar;
  return role === 'admin'
    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
};

// 1. API Đăng nhập
async function apiLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    let user = null;

    try {
      const [users] = await db.query('SELECT * FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
      if (users.length > 0) {
        const dbUser = users[0];
        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (isMatch) {
          user = {
            id: String(dbUser.id),
            full_name: dbUser.full_name,
            email: dbUser.email,
            role: dbUser.role || 'student',
            avatar: getAvatarByRole(dbUser.role),
          };
        }
      }
    } catch (dbErr) {
      console.warn('MySQL connection warning in apiLogin, checking fallback accounts:', dbErr.message);
    }

    // Fallback sang in-memory accounts nếu DB chưa sẵn sàng hoặc khớp tài khoản demo
    if (!user) {
      const memUser = fallbackUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (memUser && bcrypt.compareSync(password, memUser.passwordHash)) {
        user = {
          id: memUser.id,
          full_name: memUser.full_name,
          email: memUser.email,
          role: memUser.role,
          avatar: getAvatarByRole(memUser.role, memUser.avatar),
        };
      }
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không chính xác.' });
    }

    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    return res.json({
      success: true,
      message: `Đăng nhập thành công với vai trò ${user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}!`,
      user,
    });
  } catch (err) {
    console.error('apiLogin error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng nhập.' });
  }
}

// 2. API Đăng ký tài khoản
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
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = null;

    try {
      const [existingUsers] = await db.query('SELECT id FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ success: false, message: 'Email này đã được đăng ký trước đó.' });
      }

      const [result] = await db.query(
        'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
        [full_name.trim(), trimmedEmail, hashedPassword, 'student']
      );

      newUser = {
        id: String(result.insertId),
        full_name: full_name.trim(),
        email: trimmedEmail,
        role: 'student',
        avatar: getAvatarByRole('student'),
      };
    } catch (dbErr) {
      console.warn('MySQL insert warning in apiRegister, using in-memory store:', dbErr.message);
      if (fallbackUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) {
        return res.status(400).json({ success: false, message: 'Email này đã được đăng ký.' });
      }

      newUser = {
        id: String(Date.now()),
        full_name: full_name.trim(),
        email: trimmedEmail,
        passwordHash: hashedPassword,
        role: 'student',
        avatar: getAvatarByRole('student'),
      };
      fallbackUsers.push(newUser);
    }

    req.session.user = {
      id: newUser.id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
    };

    return res.json({
      success: true,
      message: 'Đăng ký tài khoản học viên thành công!',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
    });
  } catch (err) {
    console.error('apiRegister error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng ký.' });
  }
}

// 3. API Đăng nhập / Đăng ký nhanh qua Google (OAuth)
async function apiGoogleLogin(req, res) {
  try {
    const { email, full_name, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin email Google.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const name = full_name?.trim() || email.split('@')[0];
    const userAvatar = avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';

    let user = null;

    try {
      const [users] = await db.query('SELECT * FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
      if (users.length > 0) {
        const u = users[0];
        user = {
          id: String(u.id),
          full_name: u.full_name,
          email: u.email,
          role: u.role || 'student',
          avatar: getAvatarByRole(u.role, userAvatar),
        };
      } else {
        // Tự động khởi tạo tài khoản mới nếu lần đầu đăng nhập Google
        const defaultRole = trimmedEmail.includes('admin') ? 'admin' : 'student';
        const randomPass = Math.random().toString(36).slice(-8) + 'Aa1!';
        const hashedPassword = await bcrypt.hash(randomPass, 10);
        const [insertRes] = await db.query(
          'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
          [name, trimmedEmail, hashedPassword, defaultRole]
        );
        user = {
          id: String(insertRes.insertId),
          full_name: name,
          email: trimmedEmail,
          role: defaultRole,
          avatar: getAvatarByRole(defaultRole, userAvatar),
        };
      }
    } catch (dbErr) {
      console.warn('MySQL query failed in apiGoogleLogin, using fallback:', dbErr.message);
      let existing = fallbackUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (!existing) {
        const defaultRole = trimmedEmail.includes('admin') ? 'admin' : 'student';
        existing = {
          id: 'g-' + Date.now(),
          full_name: name,
          email: trimmedEmail,
          role: defaultRole,
          avatar: userAvatar,
        };
        fallbackUsers.push(existing);
      }
      user = existing;
    }

    req.session.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    return res.json({
      success: true,
      message: `Đăng nhập Google thành công với vai trò ${user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}!`,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error('apiGoogleLogin error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng nhập qua Google.' });
  }
}

// 4. API Yêu cầu mã OTP khôi phục mật khẩu (Forgot Password)
async function apiForgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập địa chỉ email của bạn.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    let accountExists = false;

    try {
      const [users] = await db.query('SELECT id, full_name FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
      if (users.length > 0) accountExists = true;
    } catch (dbErr) {
      console.warn('DB lookup skipped in apiForgotPassword:', dbErr.message);
      accountExists = fallbackUsers.some((u) => u.email.toLowerCase() === trimmedEmail) || trimmedEmail.includes('@');
    }

    if (!accountExists) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản với email này.' });
    }

    // Sinh mã OTP 6 chữ số ngẫu nhiên
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 120 * 1000; // Hết hạn sau 120 giây (2 phút)

    otpStore.set(trimmedEmail, { otp, expiresAt });

    console.log(`[EduFlow Auth] Mã OTP đặt lại mật khẩu cho ${trimmedEmail}: ${otp}`);

    // Gửi email thật qua Nodemailer (nếu đã cấu hình EMAIL_USER & EMAIL_PASS)
    const emailDispatch = await sendOtpEmail(trimmedEmail, otp);

    return res.json({
      success: true,
      message: emailDispatch.sent
        ? `Mã xác nhận OTP đã được gửi đến email ${trimmedEmail}. Vui lòng kiểm tra hộp thư đến (hoặc Spam).`
        : `Lưu ý: Môi trường Render Free chặn cổng SMTP gửi email. Mã OTP của bạn là: ${otp}`,
      isRealEmailSent: emailDispatch.sent,
      otp: emailDispatch.sent ? undefined : otp,
      expiresInSeconds: 120,
    });
  } catch (err) {
    console.error('apiForgotPassword error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi xử lý yêu cầu quên mật khẩu.' });
  }
}

// 5. API Xác thực mã OTP trước khi cho phép đổi mật khẩu
async function apiVerifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email và mã OTP 6 chữ số.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const record = otpStore.get(trimmedEmail);

    if (!record) {
      return res.status(400).json({ success: false, message: 'Mã xác nhận OTP không tồn tại hoặc đã hết hạn.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(trimmedEmail);
      return res.status(400).json({ success: false, message: 'Mã OTP đã hết hạn (quá 120 giây). Vui lòng gửi lại mã mới.' });
    }

    if (String(record.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: 'Mã OTP không chính xác. Vui lòng kiểm tra lại trong email.' });
    }

    return res.json({
      success: true,
      message: 'Xác thực mã OTP thành công! Bạn có thể đặt mật khẩu mới ngay bây giờ.',
    });
  } catch (err) {
    console.error('apiVerifyOtp error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi xác thực mã OTP.' });
  }
}

// 6. API Đặt lại mật khẩu mới với mã OTP (Reset Password)
async function apiResetPassword(req, res) {
  try {
    const { email, otp, new_password } = req.body;
    if (!email || !otp || !new_password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ Email, Mã OTP và Mật khẩu mới.' });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const record = otpStore.get(trimmedEmail);

    if (!record) {
      return res.status(400).json({ success: false, message: 'Yêu cầu đặt lại mật khẩu không tồn tại hoặc đã hết hạn.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(trimmedEmail);
      return res.status(400).json({ success: false, message: 'Mã xác nhận OTP đã hết hạn (quá 120 giây). Vui lòng gửi lại yêu cầu.' });
    }

    if (String(record.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: 'Mã xác nhận OTP không chính xác. Vui lòng kiểm tra lại.' });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(new_password, 10);
    try {
      await db.query('UPDATE users SET password = ? WHERE LOWER(email) = ?', [hashedPassword, trimmedEmail]);
    } catch (dbErr) {
      console.warn('DB update failed, updating in-memory store:', dbErr.message);
      const memUser = fallbackUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (memUser) {
        memUser.passwordHash = hashedPassword;
      }
    }

    // Xóa OTP sau khi sử dụng thành công
    otpStore.delete(trimmedEmail);

    return res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay với mật khẩu mới.',
    });
  } catch (err) {
    console.error('apiResetPassword error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đặt lại mật khẩu.' });
  }
}

// 6. API Kiểm tra trạng thái phiên đăng nhập hiện tại
function apiMe(req, res) {
  if (req.session && req.session.user) {
    const u = req.session.user;
    return res.json({
      success: true,
      user: {
        id: String(u.id),
        full_name: u.full_name,
        email: u.email,
        role: u.role || 'student',
        avatar: getAvatarByRole(u.role),
      },
    });
  }
  return res.json({ success: false, user: null });
}

// 7. API Đăng xuất
function apiLogout(req, res) {
  req.session.destroy(() => {
    return res.json({ success: true, message: 'Đã đăng xuất thành công.' });
  });
}

// 8. API Cập nhật mật khẩu từ Trang Cá Nhân
async function apiUpdatePassword(req, res) {
  try {
    const { email, current_password, new_password, is_google_account } = req.body;
    if (!email || !new_password) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mật khẩu mới.' });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Nếu không phải tài khoản Google, bắt buộc kiểm tra mật khẩu hiện tại
    if (!is_google_account) {
      if (!current_password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập mật khẩu hiện tại của bạn.' });
      }

      try {
        const [users] = await db.query('SELECT password FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
        if (users.length > 0) {
          const isMatch = await bcrypt.compare(current_password, users[0].password);
          if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không chính xác.' });
          }
        }
      } catch (dbErr) {
        console.warn('DB check skipped in updatePassword:', dbErr.message);
      }
    }

    // Hash mật khẩu mới và cập nhật
    const hashedPassword = await bcrypt.hash(new_password, 10);
    try {
      await db.query('UPDATE users SET password = ? WHERE LOWER(email) = ?', [hashedPassword, trimmedEmail]);
    } catch (dbErr) {
      console.warn('DB update failed, updating in-memory store:', dbErr.message);
      const memUser = fallbackUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (memUser) {
        memUser.passwordHash = hashedPassword;
      }
    }

    return res.json({
      success: true,
      message: is_google_account
        ? 'Thiết lập mật khẩu bổ sung thành công! Giờ đây bạn có thể đăng nhập bằng cả Google và Email/Mật khẩu.'
        : 'Cập nhật mật khẩu thành công!',
    });
  } catch (err) {
    console.error('apiUpdatePassword error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi cập nhật mật khẩu.' });
  }
}

module.exports = {
  apiLogin,
  apiRegister,
  apiGoogleLogin,
  apiForgotPassword,
  apiVerifyOtp,
  apiResetPassword,
  apiUpdatePassword,
  apiMe,
  apiLogout,
};
