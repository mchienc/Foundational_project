// routes/api/authRoutes.js
// RESTful API routes cho đăng nhập, đăng ký tài khoản học viên và quản trị viên

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/login', authController.apiLogin);
router.post('/register', authController.apiRegister);
router.get('/me', authController.apiMe);
router.post('/logout', authController.apiLogout);

module.exports = router;
