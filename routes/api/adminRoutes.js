// routes/api/adminRoutes.js
// Định tuyến các API quản trị hệ thống EduFlow: thống kê, quản lý người dùng, phân quyền RBAC và bảng điểm toàn sàn

const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

// 1. Thống kê tổng quan hệ thống
router.get('/stats', adminController.getAdminStats);

// 2. Danh sách toàn bộ người dùng
router.get('/users', adminController.getAllUsers);

// 3. Phân quyền / Cập nhật vai trò (student <-> admin)
router.put('/users/:id/role', adminController.updateUserRole);

// 4. Xoá tài khoản người dùng
router.delete('/users/:id', adminController.deleteUser);

// 5. Bảng điểm nộp bài khảo thí toàn sàn
router.get('/exam-results', adminController.getAllExamResults);

// 6. Quản lý kho đề thi Cambridge
router.get('/tests', adminController.getCambridgeTests);
router.put('/tests/:id/status', adminController.toggleTestStatus);
router.put('/tests/:id', adminController.updateCambridgeTest);

module.exports = router;
