// services/emailService.js
// Dịch vụ gửi email thông minh đa kênh (Hybrid Multi-Channel Email Dispatcher):
// 1. Kênh Ưu Tiên Cloud: HTTP REST API qua cổng HTTPS 443 (Resend / Brevo) -> Hoạt động 100% trên Render Free, Vercel, AWS (không bao giờ bị chặn cổng)
// 2. Kênh Local / VPS: Nodemailer qua Gmail SMTP (cổng 465/587)

const nodemailer = require('nodemailer');

function createSmtpTransporter() {
  const rawUser = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASS;

  if (!rawUser || !rawPass) {
    return null;
  }

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
    connectionTimeout: 4000,
    greetingTimeout: 4000,
    socketTimeout: 5000,
  });
}

function buildOtpHtml(toEmail, otp) {
  return `
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
          Mã OTP này có hiệu lực trong vòng <strong>120 giây (2 phút)</strong>. Tuyệt đối không chia sẻ mã này cho bất kỳ ai. Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #a8a29e; font-size: 11px;">
        © 2026 EduFlow Platform. All rights reserved.
      </div>
    </div>
  `;
}

/**
 * Gửi email chứa mã OTP khôi phục mật khẩu thật đến hộp thư của người dùng
 * Hỗ trợ cả HTTP API (cổng 443) và SMTP truyền thống
 */
async function sendOtpEmail(toEmail, otp) {
  const htmlContent = buildOtpHtml(toEmail, otp);
  const subject = `[EduFlow] Mã xác nhận khôi phục mật khẩu: ${otp}`;

  // 1. KÊNH 1: Resend HTTP REST API (Cổng 443 HTTPS - Hoạt động 100% trên Render Free)
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  if (resendApiKey) {
    try {
      console.log(`[Email Service] Đang gửi thư qua Resend HTTPS API (cổng 443) tới ${toEmail}...`);
      const fromEmail = (process.env.RESEND_FROM || 'EduFlow <onboarding@resend.dev>').trim();
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: subject,
          html: htmlContent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.id) {
        console.log(`[Email Service - Resend HTTPS] Đã gửi thư thành công tới ${toEmail}: ${data.id}`);
        return { sent: true, method: 'RESEND_HTTPS', id: data.id };
      } else {
        console.warn('[Email Service - Resend Warning]:', data);
      }
    } catch (apiErr) {
      console.warn('[Email Service - Resend Error]:', apiErr.message);
    }
  }

  // 2. KÊNH 2: Brevo HTTP REST API (Cổng 443 HTTPS)
  const brevoApiKey = (process.env.BREVO_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  if (brevoApiKey) {
    try {
      console.log(`[Email Service] Đang gửi thư qua Brevo HTTPS API tới ${toEmail}...`);
      const senderUser = (process.env.EMAIL_USER || 'noreply@eduflow.vn').trim().replace(/^["']|["']$/g, '');
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'EduFlow Platform', email: senderUser },
          to: [{ email: toEmail }],
          subject: subject,
          htmlContent: htmlContent,
        }),
      });

      const data = await res.json();
      if (res.ok && (data.messageId || data.id)) {
        console.log(`[Email Service - Brevo HTTPS] Đã gửi thư thành công tới ${toEmail}`);
        return { sent: true, method: 'BREVO_HTTPS', id: data.messageId || data.id };
      } else {
        console.warn('[Email Service - Brevo Warning]:', data);
      }
    } catch (apiErr) {
      console.warn('[Email Service - Brevo Error]:', apiErr.message);
    }
  }

  // 3. KÊNH 3: Gmail SMTP (Chạy mượt trên Local / Máy tính cá nhân / Hosting không chặn cổng SMTP)
  const transporter = createSmtpTransporter();
  if (transporter) {
    const senderUser = (process.env.EMAIL_USER || '').trim().replace(/^["']|["']$/g, '');
    const mailOptions = {
      from: `"EduFlow Platform" <${senderUser}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };

    try {
      const sendPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP_PORT_BLOCKED_BY_CLOUD')), 4500)
      );
      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log(`[Email Service - Gmail SMTP] Đã gửi thư thành công tới ${toEmail}: ${info.messageId}`);
      return { sent: true, method: 'GMAIL_SMTP', id: info.messageId };
    } catch (err) {
      console.error(`[Email Service - Gmail SMTP Failed] Không thể gửi qua SMTP (${err.message}).`);
    }
  }

  console.error(`[Email Service] Không có kênh gửi email nào khả dụng cho ${toEmail}.`);
  return { sent: false, reason: 'NO_EMAIL_SERVICE_AVAILABLE' };
}

module.exports = {
  sendOtpEmail,
};
