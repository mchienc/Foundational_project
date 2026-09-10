// scripts/seedCambridge16All.js
require('dotenv').config();
const seedTest1 = require('./seeders/cam16_test1');
const seedTest2 = require('./seeders/cam16_test2');
const seedTest3 = require('./seeders/cam16_test3');
const seedTest4 = require('./seeders/cam16_test4');
const db = require('../config/db');

async function runAll() {
  console.log('🚀 BẮT ĐẦU NẠP TRỌN BỘ 4 TEST CAMBRIDGE 16 VÀO MYSQL CSDL...\n');

  try {
    await seedTest1();
    await seedTest2();
    await seedTest3();
    await seedTest4();

    const [[{ totalPassages }]] = await db.query(
      "SELECT COUNT(*) AS totalPassages FROM cambridge_reading_passages WHERE source LIKE 'Cambridge 16%'"
    );
    const [[{ totalQuestions }]] = await db.query(
      "SELECT COUNT(*) AS totalQuestions FROM cambridge_reading_questions WHERE passage_id LIKE 'cambridge-16%'"
    );

    console.log('\n======================================================');
    console.log('🎉 NẠP TRỌN BỘ CAMBRIDGE 16 THÀNH CÔNG VÀO MYSQL!');
    console.log(`📚 Tổng số bài đọc Cambridge 16: ${totalPassages} Passages (Test 1 -> 4)`);
    console.log(`❓ Tổng số câu hỏi khảo thí: ${totalQuestions} Câu hỏi (Đầy đủ 40 câu/Test)`);
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi nạp Cambridge 16:', error);
    process.exit(1);
  }
}

runAll();
