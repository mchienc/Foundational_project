// routes/api/dictationRoutes.js
// Định tuyến RESTful API cho Xưởng Luyện Nghe Chép Chính Tả YouTube (/dictation)

const express = require('express');
const router = express.Router();
const dictationController = require('../../controllers/dictationController');

// POST /api/dictation/extract-youtube
router.post('/extract-youtube', dictationController.extractYoutubeTranscript);

module.exports = router;
