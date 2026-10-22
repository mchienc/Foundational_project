// controllers/paymentController.js
// Cổng thanh toán quét mã VietQR Napas 24/7 (Ngân hàng Quân Đội MB Bank)

const BANK_INFO = {
  bankName: 'MB Bank (Ngân hàng TMCP Quân Đội)',
  bankShortName: 'MB',
  bankBin: '970422',
  accountNo: '0976294907',
  accountName: 'DANG MINH CHIEN',
};

// Bộ nhớ lưu trữ đơn hàng đang xử lý
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

// 2. Kiểm tra trạng thái đơn hàng (Polling)
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

// 3. Xác nhận đã chuyển khoản thành công & Kích hoạt gói Pro
exports.confirmPaid = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.get(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin đơn hàng.',
      });
    }

    order.status = 'completed';
    order.paidAt = Date.now();

    // Tính ngày hết hạn theo gói
    let expiryDate = 'Vĩnh viễn';
    const now = new Date();
    if (order.packageId === 'month') {
      now.setDate(now.getDate() + 30);
      expiryDate = now.toLocaleDateString('vi-VN');
    } else if (order.packageId === '6months') {
      now.setDate(now.getDate() + 180);
      expiryDate = now.toLocaleDateString('vi-VN');
    } else if (order.packageId === 'year') {
      now.setDate(now.getDate() + 365);
      expiryDate = now.toLocaleDateString('vi-VN');
    }

    return res.json({
      success: true,
      message: 'Xác nhận thanh toán thành công! Gói EduFlow Pro đã được kích hoạt.',
      isPro: true,
      packageId: order.packageId,
      planName: order.planName,
      expiryDate,
      order,
    });
  } catch (error) {
    console.error('[confirmPaid error]', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xác nhận thanh toán.',
    });
  }
};
