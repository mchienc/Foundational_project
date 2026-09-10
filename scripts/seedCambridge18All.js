// scripts/seedCambridge18All.js
// Nạp toàn bộ 4 Test đầy đủ (12 Passages, 160 Câu hỏi chuẩn) của Cambridge 18 vào MySQL Database

require('dotenv').config();
const seedTest1 = require('./seeders/cam18_test1');
const seedTest2 = require('./seeders/cam18_test2');
const seedTest3 = require('./seeders/cam18_test3');
const seedTest4 = require('./seeders/cam18_test4');
const db = require('../config/db');

async function runAll() {
  console.log('🚀 BẮT ĐẦU NẠP TRỌN BỘ 4 TEST CAMBRIDGE 18 VÀO MYSQL CSDL...\n');

  try {
    await seedTest1();
    await seedTest2();
    await seedTest3();
    await seedTest4();

    // Thống kê tổng số lượng sau khi nạp
    const [[{ totalPassages }]] = await db.query(
      "SELECT COUNT(*) AS totalPassages FROM cambridge_reading_passages WHERE source LIKE 'Cambridge 18%'"
    );
    const [[{ totalQuestions }]] = await db.query(
      "SELECT COUNT(*) AS totalQuestions FROM cambridge_reading_questions WHERE passage_id LIKE 'cambridge-18%'"
    );

    console.log('\n======================================================');
    console.log('🎉 NẠP TRỌN BỘ CAMBRIDGE 18 THÀNH CÔNG VÀO MYSQL!');
    console.log(`📚 Tổng số bài đọc Cambridge 18: ${totalPassages} Passages (Test 1 -> 4)`);
    console.log(`❓ Tổng số câu hỏi khảo thí: ${totalQuestions} Câu hỏi (Đầy đủ 40 câu/Test)`);
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi nạp Cambridge 18:', error);
    process.exit(1);
  }
}

runAll();
