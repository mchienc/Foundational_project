// routes/api/englishRoutes.js
// Định nghĩa các endpoint RESTful API cho hệ thống học tiếng Anh tương tác.

const express = require('express');
const router = express.Router();
const englishController = require('../../controllers/englishController');

// 1. Thẻ Từ Vựng Thông Minh 3D (Spaced Repetition System)
router.get('/flashcards', englishController.getFlashcards);
router.post('/flashcards/:id/review', englishController.reviewFlashcard);

// 2. Phát Âm & Ghi Âm Studio AI
router.get('/speaking', englishController.getSpeakingLessons);
router.post('/speaking/:id/evaluate', englishController.submitSpeakingEvaluation);

// 3. Luyện Nghe Karaoke & Chép Chính Tả (Dictation)
router.get('/listening', englishController.getListeningLessons);
router.post('/listening/:id/dictation-submit', englishController.submitDictation);

// 4. Ghép Câu & Ngữ Pháp (Sentence Builder)
router.get('/sentence-builder', englishController.getSentenceBuilders);
router.post('/sentence-builder/:id/submit', englishController.submitSentenceResult);

// 5. Bảng Xếp Hạng & Gamification (Leaderboard & Stats)
router.get('/leaderboard', englishController.getLeaderboard);
router.get('/user-stats/:userId', englishController.getUserStats);

// 6. AI Academic Writing Evaluator (IELTS Writing Task 1 & 2)
router.get('/writing/prompts', englishController.getWritingPrompts);
router.post('/writing/evaluate', englishController.evaluateWritingEssay);
router.get('/writing/history', englishController.getWritingHistory);

module.exports = router;
