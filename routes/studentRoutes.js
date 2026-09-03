// routes/studentRoutes.js
// Các route này áp dụng cho mọi người dùng đã đăng nhập (cả student và admin đều xem được).

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/courses', studentController.listCourses);
router.get('/courses/:id', studentController.courseDetail);
router.post('/courses/:id/enroll', studentController.enroll);
router.get('/courses/:courseId/lessons/:lessonId', studentController.lessonDetail);

module.exports = router;
