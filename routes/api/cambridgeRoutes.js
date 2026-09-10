// routes/api/cambridgeRoutes.js
// RESTful API endpoints cho hệ thống Cambridge IELTS & Anki SRS

const express = require('express');
const router = express.Router();
const cambridgeController = require('../../controllers/cambridgeController');

// 1. Phân hệ Cambridge Reading
router.get('/reading', cambridgeController.getReadingPassages);
router.get('/reading/:id', cambridgeController.getReadingPassageById);
router.post('/reading/:id/submit', cambridgeController.submitExam);

// 2. Phân hệ Cambridge Listening & Dictation
router.get('/listening', cambridgeController.getListeningTests);
router.get('/listening/:id', cambridgeController.getListeningTestById);

// 3. Phân hệ Anki Flashcards (Spaced Repetition System)
router.get('/anki/decks', cambridgeController.getAnkiDecks);
router.get('/anki/cards', cambridgeController.getAnkiCards);
router.post('/anki/cards', cambridgeController.createAnkiCard);
router.post('/anki/cards/:id/review', cambridgeController.reviewAnkiCard);

module.exports = router;
