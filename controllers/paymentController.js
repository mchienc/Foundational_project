// controllers/paymentController.js
// Cổng thanh toán VietQR Napas 24/7 & Tự Động Xử Lý Webhook SePay (MB Bank 0976294907)

const BANK_INFO = {
  bankName: 'MB Bank (Ngân hàng TMCP Quân Đội)',
  bankShortName: 'MB',
  bankBin: '970422',
  accountNo: '0976294907',
  accountName: 'DANG MINH CHIEN',
};

// Bộ nhớ lưu trữ đơn hàng
const orders = new Map();

// Dọn dẹp đơn hàng quá hạn (sau 24h)
setInterval(() => {
  const now = Date.now();
  for (const [id, order] of orders.entries()) {
    if (now - order.createdAt > 24 * 60 * 60 * 1000) {
      orders.delete(id);
    }
  }
}, 60 * 60 * 1000);

// Hàm tính ngày hết hạn dựa theo gói học
function calculateExpiryDate(packageId) {
  if (packageId === 'lifetime') return 'Vĩnh viễn';
  const now = new Date();
  if (packageId === 'month') {
    now.setDate(now.getDate() + 30);
  } else if (packageId === '6months') {
    now.setDate(now.getDate() + 180);
  } else if (packageId === 'year') {
    now.setDate(now.getDate() + 365);
  } else {
    now.setDate(now.getDate() + 30);
  }
  return now.toLocaleDateString('vi-VN');
}

// 1. Tạo đơn hàng thanh toán VietQR
exports.createOrder = async (req, res) => {
  try {
    const { packageId, planName, amount, billingCycle, userEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Số tiền thanh toán không hợp lệ.',
      });
    }

    // Sinh mã đơn hàng dạng EDF + 5 số ngẫu nhiên
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderCode = `EDF${randomSuffix}`;
    const orderId = `order_${Date.now()}_${randomSuffix}`;

    // Tạo link ảnh VietQR động chuẩn Napas 24/7
    const transferContent = orderCode;
    const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankShortName}-${BANK_INFO.accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
      transferContent
    )}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

    const newOrder = {
      orderId,
      orderCode,
      packageId: packageId || 'month',
      planName: planName || 'EduFlow Pro',
      amount,
      billingCycle: billingCycle || '1 Tháng',
      userEmail: userEmail || 'user@eduflow.vn',
      transferContent,
      qrUrl,
      bankInfo: BANK_INFO,
      status: 'pending', // 'pending' | 'completed' | 'expired'
      createdAt: Date.now(),
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 phút đếm ngược
      expiryDate: calculateExpiryDate(packageId || 'month'),
    };

    orders.set(orderId, newOrder);

    return res.json({
      success: true,
      message: 'Tạo đơn hàng thanh toán VietQR thành công.',
      order: newOrder,
    });
  } catch (error) {
    console.error('[createOrder error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi tạo đơn hàng thanh toán.',
    });
  }
};

// 2. Kiểm tra trạng thái đơn hàng (Polling từ Frontend mỗi 2-3s)
exports.checkOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.get(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng.',
      });
    }

    if (order.status === 'pending' && Date.now() > order.expiresAt) {
      order.status = 'expired';
    }

    return res.json({
      success: true,
      status: order.status,
      order,
    });
  } catch (error) {
    console.error('[checkOrderStatus error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi kiểm tra trạng thái đơn hàng.',
    });
  }
};

// 3. Xử lý Webhook tự động từ SePay khi MB Bank có biến động số dư
exports.handleSePayWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log('[SePay Webhook Received]:', JSON.stringify(payload));

    // SePay payload:
    // {
    //   "id": 123456,
    //   "gateway": "MBBank",
    //   "transactionDate": "2026-10-22 19:40:00",
    //   "accountNumber": "0976294907",
    //   "transferType": "in",
    //   "transferAmount": 249000,
    //   "content": "EDF72918 chuyen tien",
    //   "referenceCode": "FT...",
    //   "description": "..."
    // }

    // Kiểm tra loại giao dịch tiền vào (inbound)
    if (payload.transferType && payload.transferType !== 'in') {
      return res.json({ success: true, message: 'Bỏ qua giao dịch tiền ra' });
    }

    // Trích xuất mã đơn hàng dạng EDF + 5 số từ content hoặc description
    const fullText = `${payload.content || ''} ${payload.description || ''}`;
    const match = fullText.match(/EDF\d{5}/i);

    if (!match) {
      console.warn('[SePay Webhook] Không tìm thấy mã đơn hàng hợp lệ trong nội dung:', fullText);
      return res.json({ success: false, message: 'Không tìm thấy mã đơn hàng EDF' });
    }

    const matchedCode = match[0].toUpperCase();
    console.log('[SePay Webhook] Khớp mã đơn hàng:', matchedCode);

    // Tìm đơn hàng trong danh sách
    let foundOrder = null;
    for (const [id, order] of orders.entries()) {
      if (order.orderCode.toUpperCase() === matchedCode) {
        foundOrder = order;
        break;
      }
    }

    if (!foundOrder) {
      console.warn('[SePay Webhook] Không tìm thấy đơn hàng với mã:', matchedCode);
      return res.json({ success: false, message: 'Đơn hàng không tồn tại hoặc đã bị xóa' });
    }

    // Kiểm tra số tiền chuyển
    const paidAmount = Number(payload.transferAmount) || 0;
    if (paidAmount < foundOrder.amount) {
      console.warn(
        `[SePay Webhook] Số tiền không đủ. Yêu cầu: ${foundOrder.amount}, thực nhận: ${paidAmount}`
      );
      return res.json({ success: false, message: 'Số tiền chuyển không đủ so với đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành hoàn tất (completed)
    foundOrder.status = 'completed';
    foundOrder.paidAt = Date.now();
    foundOrder.referenceCode = payload.referenceCode || payload.id || 'SEPAY_AUTO';
    foundOrder.actualAmountPaid = paidAmount;

    console.log(
      `[SePay Webhook] Đơn hàng ${foundOrder.orderCode} (${foundOrder.planName}) đã được tự động thanh toán và kích hoạt thành công!`
    );

    return res.json({
      success: true,
      message: 'Kích hoạt đơn hàng thành công!',
      orderCode: foundOrder.orderCode,
      status: 'completed',
    });
  } catch (error) {
    console.error('[handleSePayWebhook error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xử lý SePay webhook',
    });
  }
};

// 4. API Giả lập thanh toán (Dành cho kiểm thử/đánh giá đồ án không mất tiền thật)
exports.simulateTransfer = async (req, res) => {
  try {
    const { orderCode } = req.body;

    if (!orderCode) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mã đơn hàng orderCode.',
      });
    }

    const cleanCode = orderCode.trim().toUpperCase();
    let foundOrder = null;
    for (const [id, order] of orders.entries()) {
      if (order.orderCode.toUpperCase() === cleanCode) {
        foundOrder = order;
        break;
      }
    }

    if (!foundOrder) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng cần giả lập.',
      });
    }

    foundOrder.status = 'completed';
    foundOrder.paidAt = Date.now();
    foundOrder.referenceCode = 'SIMULATED_TEST';

    return res.json({
      success: true,
      message: `Giả lập thanh toán thành công cho đơn hàng ${cleanCode}!`,
      order: foundOrder,
    });
  } catch (error) {
    console.error('[simulateTransfer error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi giả lập thanh toán.',
    });
  }
};

// 5. Xác nhận thanh toán khi người dùng bấm "Tôi đã chuyển tiền thành công"
exports.confirmPaid = async (req, res) => {
  try {
    const { orderId } = req.params;
    let order = orders.get(orderId);

    if (!order) {
      // Tìm theo orderCode nếu client truyền orderCode
      for (const [id, ord] of orders.entries()) {
        if (ord.orderCode === orderId || ord.orderId === orderId) {
          order = ord;
          break;
        }
      }
    }

    if (order) {
      order.status = 'completed';
      order.paidAt = Date.now();
      order.referenceCode = 'USER_CONFIRMED';
    }

    return res.json({
      success: true,
      message: 'Xác nhận thanh toán thành công! Chúc mừng bạn đã nâng cấp EduFlow Pro.',
      isPro: true,
      packageId: order?.packageId || 'month',
      planName: order?.planName || 'EduFlow Pro',
      expiryDate: order?.expiryDate || calculateExpiryDate(order?.packageId || 'month'),
      order: order || { status: 'completed' },
    });
  } catch (error) {
    console.error('[confirmPaid error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xác nhận thanh toán.',
    });
  }
};
