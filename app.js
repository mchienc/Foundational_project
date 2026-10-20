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

const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Phục vụ file âm thanh: Tự động redirect sang Cloudflare R2 CDN
app.use('/audio', (req, res) => {
  const cdnBase = process.env.R2_PUBLIC_URL || 'https://pub-4dafa50b652e4874b46d808673d49f67.r2.dev';
  return res.redirect(`${cdnBase.replace(/\/$/, '')}${req.url}`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'eduflow-academic-secret-key',
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

// ----- Khởi động server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
