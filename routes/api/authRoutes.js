// routes/api/authRoutes.js
// RESTful API routes cho đăng nhập, đăng ký, Google Sign-in và Quên mật khẩu

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/login', authController.apiLogin);
router.post('/register', authController.apiRegister);
router.post('/google-login', authController.apiGoogleLogin);
router.post('/forgot-password', authController.apiForgotPassword);
router.post('/verify-otp', authController.apiVerifyOtp);
router.post('/reset-password', authController.apiResetPassword);
router.post('/update-password', authController.apiUpdatePassword);
router.post('/update-profile', authController.apiUpdateProfile);
router.put('/update-profile', authController.apiUpdateProfile);
router.get('/me', authController.apiMe);
router.post('/logout', authController.apiLogout);

module.exports = router;
