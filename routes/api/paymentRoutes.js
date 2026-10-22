// routes/api/paymentRoutes.js
// Routes xử lý thanh toán VietQR cho EduFlow Pro

const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');

// POST /api/payment/create-order
router.post('/create-order', paymentController.createOrder);

// GET /api/payment/check-status/:orderId
router.get('/check-status/:orderId', paymentController.checkOrderStatus);

// POST /api/payment/confirm-paid/:orderId
router.post('/confirm-paid/:orderId', paymentController.confirmPaid);

module.exports = router;
