// services/emailService.js
// Dịch vụ gửi email thật (Real Email Dispatcher) qua Nodemailer & Gmail SMTP / Custom SMTP

const nodemailer = require('nodemailer');

function createTransporter() {
  const rawUser = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASS;

  if (!rawUser || !rawPass) {
    return null;
  }

  // Loại bỏ dấu ngoặc kép hoặc khoảng trắng dư thừa nếu người dùng cấu hình trên Render
  const user = rawUser.trim().replace(/^["']|["']$/g, '');
  const pass = rawPass.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '');

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Gửi email chứa mã OTP khôi phục mật khẩu thật đến hộp thư của người dùng
 */
async function sendOtpEmail(toEmail, otp) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log(`[Email Service] Chưa cấu hình EMAIL_USER & EMAIL_PASS trong biến môi trường (Environment Variables). Mã OTP cho ${toEmail} là: ${otp}`);
    return { sent: false, reason: 'NOT_CONFIGURED', otp };
  }

  const senderUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
  const mailOptions = {
    from: `"EduFlow Platform" <${senderUser}>`,
    to: toEmail,
    subject: `[EduFlow] Mã xác nhận khôi phục mật khẩu: ${otp}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fafaf9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #064E3B; margin: 0; font-size: 22px;">EduFlow Platform</h2>
          <p style="color: #78716c; font-size: 13px; margin-top: 4px;">Nền Tảng Luyện Thi IELTS & Học Từ Vựng Trực Tuyến</p>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e7e5e4;">
          <h3 style="color: #1c1917; margin-top: 0; font-size: 16px;">Yêu cầu đặt lại mật khẩu</h3>
          <p style="color: #44403c; font-size: 14px; line-height: 1.6;">
            Xin chào, hệ thống nhận được yêu cầu đặt lại mật khẩu cho tài khoản <strong>${toEmail}</strong> trên nền tảng EduFlow.
          </p>
          <p style="color: #44403c; font-size: 14px; margin-bottom: 8px;">Mã xác thực OTP của bạn là:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #064E3B; background-color: #ecfdf5; padding: 12px 28px; border-radius: 10px; border: 1px solid #a7f3d0; font-family: monospace;">
              ${otp}
            </span>
          </div>
          <p style="color: #78716c; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
            Mã OTP này có hiệu lực trong vòng <strong>120 giây (2 phút)</strong>. Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #a8a29e; font-size: 11px;">
          © 2026 EduFlow Platform. All rights reserved.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Đã gửi mã OTP thật thành công đến ${toEmail}: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[Email Service Error] Không thể gửi email đến ${toEmail}:`, err.message);
    return { sent: false, reason: err.message, otp };
  }
}

module.exports = {
  sendOtpEmail,
};
