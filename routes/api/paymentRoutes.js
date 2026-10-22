// routes/api/paymentRoutes.js
// Routes xử lý thanh toán VietQR & Webhook SePay cho EduFlow Pro

const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');

// POST /api/payment/create-order
router.post('/create-order', paymentController.createOrder);

// GET /api/payment/check-status/:orderId
router.get('/check-status/:orderId', paymentController.checkOrderStatus);

// POST /api/payment/webhook (Endpoint chính thức nhận biến động số dư từ SePay)
router.post('/webhook', paymentController.handleSePayWebhook);
router.post('/sepay-webhook', paymentController.handleSePayWebhook);

// POST /api/payment/simulate-transfer (Kiểm thử nhanh không mất tiền thật)
router.post('/simulate-transfer', paymentController.simulateTransfer);

// POST /api/payment/confirm-paid/:orderId (Chỉ thành công khi đơn hàng đã completed)
router.post('/confirm-paid/:orderId', paymentController.confirmPaid);

module.exports = router;
