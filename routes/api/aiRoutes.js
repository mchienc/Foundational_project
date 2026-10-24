// routes/api/aiRoutes.js
// Routes phục vụ chấm bài IELTS Writing & Speaking bằng AI với Validation và Rate Limiting phía server (SEC-02)

const express = require('express');
const router = express.Router();
const aiGradingController = require('../../controllers/aiGradingController');

// In-memory rate limiting map theo IP/Session: key -> { count: number, resetAt: number }
const rateLimitMap = new Map();
// Daily quota map: key `${userId}_${skill}_${YYYY-MM-DD}` -> count (P1-08)
const dailyQuotaMap = new Map();

const requireAuthAndQuota = (skillType) => async (req, res, next) => {
  const sessionUser = req.session && req.session.user;
  const userId = sessionUser ? (sessionUser.id || req.session.userId) : null;

  // 1. Enforce Authentication (P1-08)
  if (!userId) {
    return res.status(401).json({
      success: false,
      errorCode: 'UNAUTHORIZED',
      message: 'Vui lòng đăng nhập để sử dụng tính năng chấm bài IELTS bằng AI.'
    });
  }

  // 2. Check Plan Quota (Free vs PRO)
  const isPro = Boolean(sessionUser.is_pro || sessionUser.role === 'admin');
  const todayKey = new Date().toISOString().slice(0, 10);
  const quotaKey = `${userId}_${skillType}_${todayKey}`;

  const currentUsage = dailyQuotaMap.get(quotaKey) || 0;
  const maxQuota = isPro ? 50 : 3; // Free: 3 bài/ngày, Pro: 50 bài/ngày

  if (currentUsage >= maxQuota) {
    return res.status(429).json({
      success: false,
      errorCode: 'QUOTA_EXCEEDED',
      message: isPro 
        ? 'Bạn đã đạt giới hạn 50 lượt chấm AI hôm nay. Vui lòng quay lại vào ngày mai.'
        : 'Bạn đã dùng hết 3 lượt chấm AI miễn phí trong ngày. Vui lòng nâng cấp tài khoản Pro để tiếp tục luyện tập không giới hạn!',
      isPro,
      limit: maxQuota,
      used: currentUsage
    });
  }

  dailyQuotaMap.set(quotaKey, currentUsage + 1);
  req.remainingQuota = maxQuota - (currentUsage + 1);
  next();
};

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

// POST /api/ai/grade-writing (P1-08: Auth & Free/PRO Quota)
router.post('/grade-writing', requireAuthAndQuota('writing'), rateLimitGuard, validateWritingPayload, aiGradingController.gradeWriting);

// POST /api/ai/grade-speaking (P1-08: Auth & Free/PRO Quota)
router.post('/grade-speaking', requireAuthAndQuota('speaking'), rateLimitGuard, validateSpeakingPayload, aiGradingController.gradeSpeaking);

// POST /api/ai/composite-writing-band
router.post('/composite-writing-band', aiGradingController.calculateCompositeBand);

router.requireAuthAndQuota = requireAuthAndQuota;
router.dailyQuotaMap = dailyQuotaMap;

module.exports = router;
