// routes/api/chatRoutes.js
// Định tuyến API cho Trợ lý học tập AI EduFlow

const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

router.post('/', chatController.handleChat);

module.exports = router;
