// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quizzes/:id', quizController.showQuiz);
router.post('/quizzes/:id/submit', quizController.submitQuiz);
router.get('/results/:resultId', quizController.showResult);
router.get('/my-results', quizController.myResults);

module.exports = router;
