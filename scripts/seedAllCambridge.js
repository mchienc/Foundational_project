// scripts/seedAllCambridge.js
// Script tổng hợp nạp toàn bộ dữ liệu Cambridge IELTS (13, 14, 15, 16, 18, 19, 20) vào MySQL / TiDB Cloud

require('dotenv').config();
const db = require('../config/db');
const { seedCambridge13Vocab } = require('./seeders/cam13_vocab');

const BOOKS = [13, 14, 15, 16, 18, 19, 20];

async function seedAll() {
  const targetBook = process.argv[2] ? parseInt(process.argv[2], 10) : null;
  const booksToRun = targetBook ? BOOKS.filter((b) => b === targetBook) : BOOKS;

  console.log(`🚀 BẮT ĐẦU NẠP DỮ LIỆU CAMBRIDGE (${booksToRun.join(', ')}) VÀO CSDL...\n`);

  try {
    for (const book of booksToRun) {
      console.log(`--- Đang nạp Cambridge ${book} ---`);
      for (let test = 1; test <= 4; test++) {
        const seedFn = require(`./seeders/cam${book}_test${test}`);
        await seedFn();
      }
      if (book === 13) {
        await seedCambridge13Vocab();
      }
    }

    const [[{ totalPassages }]] = await db.query(
      'SELECT COUNT(*) AS totalPassages FROM cambridge_reading_passages'
    );
    const [[{ totalQuestions }]] = await db.query(
      'SELECT COUNT(*) AS totalQuestions FROM cambridge_reading_questions'
    );

    console.log('\n======================================================');
    console.log('🎉 NẠP DỮ LIỆU CAMBRIDGE THÀNH CÔNG!');
    console.log(`📚 Tổng số bài đọc: ${totalPassages} Passages`);
    console.log(`❓ Tổng số câu hỏi: ${totalQuestions} Câu hỏi`);
    console.log('======================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi nạp dữ liệu Cambridge:', error);
    process.exit(1);
  }
}

seedAll();
