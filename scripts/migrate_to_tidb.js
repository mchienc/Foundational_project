// scripts/migrate_to_tidb.js
// Script tự động sao chép toàn bộ cấu trúc bảng và dữ liệu từ MySQL local sang TiDB Cloud

const mysql = require('mysql2/promise');

async function migrate() {
  const tidbHost = process.env.TIDB_HOST;
  const tidbPort = parseInt(process.env.TIDB_PORT || '4000', 10);
  const tidbUser = process.env.TIDB_USER;
  const tidbPassword = process.env.TIDB_PASSWORD;
  const tidbDatabase = process.env.TIDB_DATABASE || 'online_learning';

  if (!tidbHost || !tidbUser || !tidbPassword) {
    console.error('❌ Thiếu thông tin TIDB_HOST, TIDB_USER hoặc TIDB_PASSWORD.');
    console.log('💡 Hãy chạy với cú pháp:');
    console.log('   $env:TIDB_HOST="..."; $env:TIDB_USER="..."; $env:TIDB_PASSWORD="..."; node scripts/migrate_to_tidb.js');
    process.exit(1);
  }

  console.log('🔄 Đang kết nối MySQL Local (127.0.0.1:3306)...');
  const localConn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'online_learning',
    port: 3306
  });

  console.log('☁️  Đang kết nối TiDB Cloud (' + tidbHost + ':' + tidbPort + ')...');
  const tidbConn = await mysql.createConnection({
    host: tidbHost,
    port: tidbPort,
    user: tidbUser,
    password: tidbPassword,
    database: tidbDatabase,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  console.log('✅ Đã kết nối thành công tới cả 2 cơ sở dữ liệu!\n');
  await tidbConn.query('SET FOREIGN_KEY_CHECKS = 0;');

  // Lấy danh sách tất cả các bảng từ local
  const [tablesResult] = await localConn.query('SHOW FULL TABLES WHERE Table_type = "BASE TABLE"');
  const tables = tablesResult.map(r => Object.values(r)[0]);

  // Thứ tự ưu tiên nạp bảng để tránh vi phạm khóa ngoại (foreign keys)
  const priorityOrder = [
    'users',
    'courses',
    'lessons',
    'quizzes',
    'questions',
    'answers',
    'cambridge_reading_passages',
    'cambridge_reading_questions',
    'cambridge_target_words',
    'cambridge_listening_tests',
    'cambridge_dictation_sentences',
    'anki_decks',
    'anki_cards',
    'english_flashcards',
    'english_speaking_lessons',
    'english_listening_lessons',
    'english_sentence_builders',
    'english_writing_prompts'
  ];

  const sortedTables = [
    ...priorityOrder.filter(t => tables.includes(t)),
    ...tables.filter(t => !priorityOrder.includes(t))
  ];

  for (const table of sortedTables) {
    process.stdout.write(`⏳ Đang di chuyển bảng [${table}]... `);

    // 1. Tạo bảng trên TiDB nếu chưa có
    const [[createRes]] = await localConn.query(`SHOW CREATE TABLE \`${table}\``);
    let createSql = createRes['Create Table'];
    await tidbConn.query(`DROP TABLE IF EXISTS \`${table}\``);
    await tidbConn.query(createSql);

    // 2. Lấy toàn bộ dữ liệu từ local
    const [rows] = await localConn.query(`SELECT * FROM \`${table}\``);
    if (rows.length === 0) {
      console.log(`(0 dòng)`);
      continue;
    }

    // 3. Nạp vào TiDB theo từng lô (batches of 100)
    const columns = Object.keys(rows[0]);
    const colSql = columns.map(c => `\`${c}\``).join(', ');
    const placeholder = '(' + columns.map(() => '?').join(', ') + ')';

    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const values = [];
      batch.forEach(row => {
        columns.forEach(col => {
          let val = row[col];
          if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
            val = JSON.stringify(val);
          }
          values.push(val);
        });
      });
      const batchPlaceholders = batch.map(() => placeholder).join(', ');
      await tidbConn.query(`INSERT INTO \`${table}\` (${colSql}) VALUES ${batchPlaceholders}`, values);
    }

    console.log(`✅ Thành công (${rows.length} dòng)`);
  }

  console.log('\n🎉 TOÀN BỘ CƠ SỞ DỮ LIỆU ĐÃ ĐƯỢC ĐỒNG BỘ LÊN TIDB CLOUD HOÀN HẢO!');
  await tidbConn.query('SET FOREIGN_KEY_CHECKS = 1;');
  await localConn.end();
  await tidbConn.end();
  process.exit(0);
}

migrate().catch(err => {
  console.error('\n❌ Lỗi trong quá trình migrate:', err.message);
  process.exit(1);
});
