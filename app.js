// app.js
// File khởi động server: cấu hình middleware, view engine, và gắn các routes.

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const { checkAuth, checkAdmin } = require('./middlewares/auth');

const app = express();

// ----- Cấu hình view engine (EJS) -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Middleware -----
app.use(express.urlencoded({ extended: true })); // đọc dữ liệu từ form (req.body)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // phục vụ file css/js/ảnh tĩnh
app.use(methodOverride('_method')); // cho phép dùng PUT/DELETE trong form HTML

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // session sống 2 tiếng
}));

// Biến này giúp mọi view (EJS) đều truy cập được thông tin user đang đăng nhập
// mà không cần truyền tay ở từng route (ví dụ để hiển thị tên trên header).
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ----- Routes -----
app.get('/', (req, res) => res.redirect('/login'));

app.use('/', authRoutes); // /login, /register, /logout

// Toàn bộ trang phía học viên (xem khóa học, đăng ký, học bài) nằm trong studentRoutes
app.use('/', checkAuth, studentRoutes);

// Toàn bộ trang làm bài kiểm tra, xem kết quả, lịch sử
app.use('/', checkAuth, quizRoutes);

// Toàn bộ route quản lý khóa học/bài học nằm dưới /admin/*
// và đều yêu cầu đã đăng nhập (checkAuth) + phải là admin (checkAdmin)
app.use('/admin', checkAuth, checkAdmin, adminRoutes);

// ----- Khởi động server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
