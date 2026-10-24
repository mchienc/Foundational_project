// app.js
// Khởi động Express Server: cung cấp RESTful API và phục vụ React SPA (Production Build)

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/api/authRoutes');
const cambridgeRoutes = require('./routes/api/cambridgeRoutes');
const adminRoutes = require('./routes/api/adminRoutes');
const ankiRoutes = require('./routes/api/ankiRoutes');
const dictationRoutes = require('./routes/api/dictationRoutes');
const chatRoutes = require('./routes/api/chatRoutes');
const aiRoutes = require('./routes/api/aiRoutes');
const paymentRoutes = require('./routes/api/paymentRoutes');

const app = express();

// ----- Request Logger -----
app.use((req, res, next) => {
  if (!req.url.startsWith('/assets')) {
    console.log(`[HTTP ${req.method}] ${req.url} - ${new Date().toLocaleTimeString()}`);
  }
  next();
});

// ----- Cấu hình CORS cho Frontend React -----
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ----- Middleware -----
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.json({ limit: '25mb' }));

// Phục vụ file âm thanh: Tự động redirect sang Cloudflare R2 CDN
app.use('/audio', (req, res) => {
  const cdnBase = process.env.R2_PUBLIC_URL || 'https://pub-4dafa50b652e4874b46d808673d49f67.r2.dev';
  return res.redirect(`${cdnBase.replace(/\/$/, '')}${req.url}`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'eng4u-academic-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 },
  })
);

// ----- Phục vụ Frontend React (Production SPA Build) -----
const frontendDist = path.join(__dirname, 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

// ----- RESTful API -----
app.use('/api/auth', authRoutes);
app.use('/api/cambridge', cambridgeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/anki', ankiRoutes);
app.use('/api/dictation', dictationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payment', paymentRoutes);

// ----- SPA Fallback cho React Frontend -----
if (fs.existsSync(frontendDist)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/audio')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.redirect('http://localhost:5173'));
}

// ----- Khởi động server & Kiểm tra cấu trúc DB -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  try {
    const db = require('./config/db');
    await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar LONGTEXT');
    await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50)');
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_cambridge_test_attempts (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        book VARCHAR(50) NOT NULL,
        test_number INT NOT NULL,
        skill VARCHAR(20) NOT NULL,
        band_score FLOAT NOT NULL,
        correct_count INT NOT NULL,
        total_questions INT NOT NULL,
        completed_at VARCHAR(50) NOT NULL,
        is_verified TINYINT(1) DEFAULT 0,
        client_reported TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_history (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await db.query('ALTER TABLE user_cambridge_test_attempts ADD COLUMN IF NOT EXISTS is_verified TINYINT(1) DEFAULT 0');
    await db.query('ALTER TABLE user_cambridge_test_attempts ADD COLUMN IF NOT EXISTS client_reported TINYINT(1) DEFAULT 1');
    console.log('[DB] Đã kiểm tra và đảm bảo bảng users & user_cambridge_test_attempts sẵn sàng.');
  } catch (err) {
    console.warn('[DB Check] Bỏ qua kiểm tra cấu trúc bảng users:', err.message);
  }
});
