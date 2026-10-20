// routes/api/ankiRoutes.js
// Định tuyến tính năng tạo thẻ Anki Cloze tự động bằng Gemini AI chuẩn IELTS 9.0

const express = require('express');
const router = express.Router();
const ankiAiController = require('../../controllers/ankiAiController');

// POST /api/anki/generate-cloze
router.post('/generate-cloze', ankiAiController.generateAnkiCloze);
router.post('/lookup-word', ankiAiController.lookupWord);

module.exports = router;
