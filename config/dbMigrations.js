// config/dbMigrations.js
// Idempotent DB migrations supporting MySQL 5.7, 8.0+, MariaDB, TiDB

async function ensureColumnExists(db, tableName, columnName, columnDefinition) {
  try {
    const [cols] = await db.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [tableName, columnName]
    );
    if (cols.length === 0) {
      await db.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${columnName}\` ${columnDefinition}`);
      console.log(`[DB Migration] Added column ${columnName} to ${tableName}`);
    }
  } catch (err) {
    console.warn(`[DB Migration] Warning for ${tableName}.${columnName}:`, err.message);
  }
}

async function runStartupMigrations(db) {
  try {
    // 1. users table columns
    await ensureColumnExists(db, 'users', 'avatar', 'LONGTEXT');
    await ensureColumnExists(db, 'users', 'phone', 'VARCHAR(50)');
    await ensureColumnExists(db, 'users', 'is_pro', 'TINYINT(1) DEFAULT 0');
    await ensureColumnExists(db, 'users', 'pro_expires_at', 'VARCHAR(50)');

    // 2. user_cambridge_test_attempts table
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

    // Ensure columns in user_cambridge_test_attempts if legacy table existed
    await ensureColumnExists(db, 'user_cambridge_test_attempts', 'is_verified', 'TINYINT(1) DEFAULT 0');
    await ensureColumnExists(db, 'user_cambridge_test_attempts', 'client_reported', 'TINYINT(1) DEFAULT 1');

    console.log('[DB Migration] All schema checks and migrations completed successfully.');
  } catch (err) {
    console.error('[DB Migration Error]', err.message);
  }
}

module.exports = { ensureColumnExists, runStartupMigrations };
