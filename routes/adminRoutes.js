// routes/adminRoutes.js
// Tất cả route trong file này đều đã được bảo vệ bởi checkAuth + checkAdmin
// ở app.js (chỉ admin mới truy cập được).

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const lessonController = require('../controllers/lessonController');

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

module.exports = router;
