// routes/api/aiRoutes.js
// Routes phục vụ chấm bài IELTS Writing & Speaking bằng AI

const express = require('express');
const router = express.Router();
const aiGradingController = require('../../controllers/aiGradingController');

// POST /api/ai/grade-writing
router.post('/grade-writing', aiGradingController.gradeWriting);

// POST /api/ai/grade-speaking
router.post('/grade-speaking', aiGradingController.gradeSpeaking);

// POST /api/ai/composite-writing-band
router.post('/composite-writing-band', aiGradingController.calculateCompositeBand);

module.exports = router;
