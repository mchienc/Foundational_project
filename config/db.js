// config/db.js
// File này tạo một "connection pool" tới MySQL — nghĩa là thay vì mở/đóng
// kết nối mỗi lần truy vấn, ta giữ sẵn một nhóm kết nối để dùng lại,
// giúp ứng dụng chạy nhanh và ổn định hơn.

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// .promise() cho phép ta dùng async/await thay vì callback,
// giúp code dễ đọc hơn rất nhiều.
const db = pool.promise();

module.exports = db;
