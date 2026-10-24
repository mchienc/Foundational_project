// routes/api/aiRoutes.js
// Routes phục vụ chấm bài IELTS Writing & Speaking bằng AI với Validation và Rate Limiting phía server (SEC-02)

const express = require('express');
const router = express.Router();
const aiGradingController = require('../../controllers/aiGradingController');

// In-memory rate limiting map theo IP/Session: key -> { count: number, resetAt: number }
const rateLimitMap = new Map();

const rateLimitGuard = (req, res, next) => {
  const clientKey = (req.session && req.session.user && req.session.user.id) || req.ip || req.connection.remoteAddress || 'guest';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 giờ
  const maxRequests = 30; // 30 bài chấm / giờ

  let record = rateLimitMap.get(clientKey);
  if (!record || now > record.resetAt) {
    record = { count: 0, resetAt: now + windowMs };
  }

  record.count += 1;
  rateLimitMap.set(clientKey, record);

  if (record.count > maxRequests) {
    return res.status(429).json({
      success: false,
      errorCode: 'RATE_LIMIT_EXCEEDED',
      message: 'Bạn đã đạt giới hạn 30 lượt chấm AI trong 1 giờ. Vui lòng thử lại sau.'
    });
  }

  next();
};

const validateWritingPayload = (req, res, next) => {
  const { taskType, essayContent, prompt } = req.body || {};

  if (!taskType || !['task1', 'task2'].includes(taskType)) {
    return res.status(400).json({
      success: false,
      errorCode: 'INVALID_TASK_TYPE',
      message: 'taskType không hợp lệ. Chỉ chấp nhận "task1" hoặc "task2".'
    });
  }

  if (!essayContent || typeof essayContent !== 'string' || essayContent.trim().length === 0) {
    return res.status(400).json({
      success: false,
      errorCode: 'EMPTY_ESSAY',
      message: 'Nội dung bài viết không được để trống.'
    });
  }

  if (essayContent.length > 15000 || (prompt && String(prompt).length > 5000)) {
    return res.status(413).json({
      success: false,
      errorCode: 'PAYLOAD_TOO_LARGE',
      message: 'Nội dung bài viết hoặc đề bài vượt quá giới hạn tối đa cho phép (15,000 ký tự).'
    });
  }

  next();
};

const validateSpeakingPayload = (req, res, next) => {
  const { part, transcript } = req.body || {};
  const partNum = parseInt(part, 10);

  if (!partNum || ![1, 2, 3].includes(partNum)) {
    return res.status(400).json({
      success: false,
      errorCode: 'INVALID_PART',
      message: 'Part thi Speaking không hợp lệ. Chỉ chấp nhận Part 1, 2 hoặc 3.'
    });
  }

  if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
    return res.status(400).json({
      success: false,
      errorCode: 'EMPTY_TRANSCRIPT',
      message: 'Bản gỡ băng câu trả lời không được để trống.'
    });
  }

  if (transcript.length > 8000) {
    return res.status(413).json({
      success: false,
      errorCode: 'PAYLOAD_TOO_LARGE',
      message: 'Bản gỡ băng bài nói vượt quá giới hạn tối đa cho phép (8,000 ký tự).'
    });
  }

  next();
};

// POST /api/ai/grade-writing
router.post('/grade-writing', rateLimitGuard, validateWritingPayload, aiGradingController.gradeWriting);

// POST /api/ai/grade-speaking
router.post('/grade-speaking', rateLimitGuard, validateSpeakingPayload, aiGradingController.gradeSpeaking);

// POST /api/ai/composite-writing-band
router.post('/composite-writing-band', aiGradingController.calculateCompositeBand);

module.exports = router;
