// routes/studentRoutes.js
// Các route này áp dụng cho mọi người dùng đã đăng nhập (cả student và admin đều xem được).

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const profileController  = require('../controllers/profileController');

// ----- Profile & My Courses -----
router.get('/profile',         profileController.showProfile);
router.post('/profile/update', profileController.updateProfile);
router.post('/profile/password', profileController.changePassword);
router.get('/my-courses',      profileController.myCourses);

// ----- Khóa học -----
router.get('/courses', studentController.listCourses);
router.get('/courses/:id', studentController.courseDetail);
router.post('/courses/:id/enroll', studentController.enroll);
router.get('/courses/:courseId/lessons/:lessonId', studentController.lessonDetail);
router.post('/courses/:courseId/lessons/:lessonId/toggle-complete', studentController.toggleLessonComplete);
router.post('/courses/:courseId/lessons/:lessonId/comments', studentController.addComment);
router.delete('/courses/:courseId/lessons/:lessonId/comments/:commentId', studentController.deleteComment);
router.get('/courses/:courseId/certificate', studentController.certificate);

module.exports = router;
