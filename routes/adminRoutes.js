// routes/adminRoutes.js
// Tất cả route trong file này đều đã được bảo vệ bởi checkAuth + checkAdmin
// ở app.js (chỉ admin mới truy cập được).

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const lessonController = require('../controllers/lessonController');
const adminQuizController = require('../controllers/adminQuizController');
const adminDashboardController = require('../controllers/adminDashboardController');

// ----- Dashboard Tổng quan -----
router.get('/dashboard', adminDashboardController.dashboard);

// ----- Quản lý Người dùng -----
router.get('/users', adminDashboardController.users);
router.post('/users/:userId/role', adminDashboardController.updateUserRole);
router.delete('/users/:userId', adminDashboardController.deleteUser);

// ----- Quản lý khóa học -----
router.get('/courses', courseController.index);
router.get('/courses/new', courseController.showCreateForm);
router.post('/courses', courseController.create);
router.get('/courses/:id/edit', courseController.showEditForm);
router.put('/courses/:id', courseController.update);
router.delete('/courses/:id', courseController.remove);

// ----- Quản lý bài học (lồng trong khóa học) -----
router.get('/courses/:courseId/lessons', lessonController.index);
router.get('/courses/:courseId/lessons/new', lessonController.showCreateForm);
router.post('/courses/:courseId/lessons', lessonController.create);
router.get('/courses/:courseId/lessons/:id/edit', lessonController.showEditForm);
router.put('/courses/:courseId/lessons/:id', lessonController.update);
router.delete('/courses/:courseId/lessons/:id', lessonController.remove);

// ----- Quản lý bài kiểm tra trắc nghiệm (Quiz Builder) -----
router.get('/courses/:courseId/lessons/:lessonId/quiz', adminQuizController.showQuiz);
router.post('/courses/:courseId/lessons/:lessonId/quiz', adminQuizController.saveQuiz);
router.post('/courses/:courseId/lessons/:lessonId/quiz/questions', adminQuizController.addQuestion);
router.delete('/courses/:courseId/lessons/:lessonId/quiz/questions/:questionId', adminQuizController.deleteQuestion);
router.delete('/courses/:courseId/lessons/:lessonId/quiz', adminQuizController.deleteQuiz);

module.exports = router;

