const mysql = require('mysql2/promise');

async function run() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'online_learning',
    port: 3306,
  });

  console.log('Connected to MySQL');

  // Kiểm tra xem cột đã tồn tại chưa
  const [cols] = await db.query('DESCRIBE users');
  const colNames = cols.map((c) => c.Field);

  if (!colNames.includes('is_pro')) {
    await db.query('ALTER TABLE users ADD COLUMN is_pro TINYINT(1) DEFAULT 0');
    console.log('Added is_pro column');
  }
  if (!colNames.includes('pro_package')) {
    await db.query('ALTER TABLE users ADD COLUMN pro_package VARCHAR(100) DEFAULT NULL');
    console.log('Added pro_package column');
  }
  if (!colNames.includes('pro_expiry')) {
    await db.query('ALTER TABLE users ADD COLUMN pro_expiry VARCHAR(100) DEFAULT NULL');
    console.log('Added pro_expiry column');
  }

  // Cập nhật tài khoản Admin và Dangchien2005 lên Pro
  await db.query("UPDATE users SET is_pro = 1, pro_package = 'Gói Trọn Đời', pro_expiry = 'Vĩnh viễn' WHERE role = 'admin'");
  await db.query("UPDATE users SET is_pro = 1, pro_package = 'Gói eng4u PRO Trọn Đời', pro_expiry = 'Vĩnh viễn' WHERE LOWER(email) = 'dangchien2005@gmail.com'");

  const [rows] = await db.query('SELECT id, full_name, email, role, is_pro, pro_package, pro_expiry FROM users');
  console.log('Users in database:', rows);

  await db.end();
  console.log('Done!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
