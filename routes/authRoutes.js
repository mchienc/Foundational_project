// routes/authRoutes.js
// Định nghĩa các đường dẫn (URL) liên quan tới đăng ký/đăng nhập/đăng xuất,
// mỗi đường dẫn sẽ gọi tới đúng hàm xử lý trong authController.

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.showRegisterForm);   // hiển thị form đăng ký
router.post('/register', authController.register);          // xử lý submit đăng ký

router.get('/login', authController.showLoginForm);          // hiển thị form đăng nhập
router.post('/login', authController.login);                 // xử lý submit đăng nhập

router.get('/logout', authController.logout);                // đăng xuất

module.exports = router;
