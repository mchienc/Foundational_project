// scratch/migrate_phase5.js
// Thêm cột category vào courses và tạo bảng course_ratings

const db = require('../config/db');

async function migrate() {
  try {
    console.log('=== Phase 5 DB Migration ===\n');

    // 1. Thêm cột category vào courses (nếu chưa có)
    const [cols] = await db.query('SHOW COLUMNS FROM courses LIKE "category"');
    if (cols.length === 0) {
      await db.query(`ALTER TABLE courses ADD COLUMN category VARCHAR(100) DEFAULT 'Khác' AFTER description`);
      console.log('[✓] Thêm cột category vào bảng courses');
    } else {
      console.log('[i] Cột category đã tồn tại');
    }

    // 2. Tạo bảng course_ratings
    await db.query(`
      CREATE TABLE IF NOT EXISTS course_ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        stars TINYINT NOT NULL DEFAULT 5 COMMENT '1-5 sao',
        review_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_user_course (user_id, course_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);
    console.log('[✓] Tạo bảng course_ratings');

    // 3. Cập nhật category cho 6 khóa học mẫu
    const categories = [
      [1, 'Ngoại ngữ'],
      [2, 'Lập trình'],
      [3, 'Cơ sở dữ liệu'],
      [4, 'Thiết kế'],
      [5, 'Thuật toán'],
      [6, 'DevOps'],
    ];
    for (const [id, cat] of categories) {
      await db.query('UPDATE courses SET category = ? WHERE id = ?', [cat, id]);
    }
    console.log('[✓] Cập nhật category cho 6 khóa học mẫu');

    console.log('\n>>> Migration Phase 5 COMPLETE!');
    process.exit(0);
  } catch (err) {
    console.error('Migration FAILED:', err.message);
    process.exit(1);
  }
}

migrate();
