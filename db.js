const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DATA_DIR = process.env.NUTRISCAN_DATA_DIR
  ? path.resolve(process.env.NUTRISCAN_DATA_DIR)
  : path.resolve(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'nutriscan.db');
const LEGACY_DB_PATH = path.resolve(__dirname, 'nutriscan.db');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function openDb() {
  ensureDataDir();
  return new sqlite3.Database(DB_PATH);
}

function migrate() {
  const db = openDb();
  db.serialize(() => {
    const now = new Date().toISOString();
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sap TEXT UNIQUE,
      name TEXT,
      role TEXT,
      course TEXT,
      allergies TEXT,
      childSap TEXT,
      walletBalance REAL DEFAULT 0,
      waterToday REAL DEFAULT 0,
      healthyToday REAL DEFAULT 0,
      transactions TEXT,
      active INTEGER DEFAULT 1,
      createdAt TEXT,
      updatedAt TEXT
    )`);

    // Backward-compatible migration for existing databases created before waterToday existed.
    db.run('ALTER TABLE users ADD COLUMN waterToday REAL DEFAULT 0', () => {});
    db.run('ALTER TABLE users ADD COLUMN healthyToday REAL DEFAULT 0', () => {});

    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL DEFAULT 0,
      active INTEGER DEFAULT 1,
      createdAt TEXT,
      updatedAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      value TEXT,
      updatedAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS nutrition_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sap TEXT,
      summaryDate TEXT,
      calories REAL DEFAULT 0,
      protein REAL DEFAULT 0,
      healthy REAL DEFAULT 0,
      water REAL DEFAULT 0,
      createdAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS nutrition_care_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nutritionistSap TEXT,
      studentSap TEXT,
      attentionDate TEXT,
      assessment TEXT,
      plan TEXT,
      status TEXT,
      weight REAL DEFAULT 0,
      height REAL DEFAULT 0,
      bmi REAL DEFAULT 0,
      bloodPressure TEXT,
      nextDate TEXT,
      createdAt TEXT
    )`);
    db.run('ALTER TABLE nutrition_care_records ADD COLUMN weight REAL DEFAULT 0', () => {});
    db.run('ALTER TABLE nutrition_care_records ADD COLUMN height REAL DEFAULT 0', () => {});
    db.run('ALTER TABLE nutrition_care_records ADD COLUMN bmi REAL DEFAULT 0', () => {});
    db.run('ALTER TABLE nutrition_care_records ADD COLUMN bloodPressure TEXT', () => {});
    db.run('ALTER TABLE nutrition_care_records ADD COLUMN nextDate TEXT', () => {});

    if (fs.existsSync(LEGACY_DB_PATH) && LEGACY_DB_PATH !== DB_PATH) {
      const escapedPath = LEGACY_DB_PATH.replace(/'/g, "''");
      db.run(`ATTACH DATABASE '${escapedPath}' AS legacy_db`);
      db.run(`
        INSERT OR IGNORE INTO users (
          id, sap, name, role, course, allergies, childSap, walletBalance, transactions, active, createdAt, updatedAt
        )
        SELECT id, sap, name, role, course, allergies, childSap, walletBalance, transactions, active, createdAt, updatedAt
        FROM legacy_db.users
        WHERE (SELECT COUNT(*) FROM users) = 0
      `);
      db.run(`
        INSERT OR IGNORE INTO products (
          id, name, price, active, createdAt, updatedAt
        )
        SELECT id, name, price, active, createdAt, updatedAt
        FROM legacy_db.products
        WHERE (SELECT COUNT(*) FROM products) = 0
      `);
      db.run('DETACH DATABASE legacy_db');
    }

    db.run(
      `INSERT OR IGNORE INTO users (
        sap, name, role, course, allergies, childSap, walletBalance, transactions, active, createdAt, updatedAt
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      ['admin', 'administrador', 'admin', '', '', '[]', 0, '[]', 1, now, now]
    );
  });
  db.close();
}

module.exports = { openDb, migrate, DB_PATH, DATA_DIR };
