const { openDb, migrate, DB_PATH } = require('../server/db');
const fs = require('fs');

function seed() {
  migrate();
  const db = openDb();
  db.serialize(() => {
    const now = new Date().toISOString();
    // Example product
    db.run(
      `INSERT OR IGNORE INTO products (id, name, price, active, createdAt, updatedAt) VALUES (?,?,?,?,?,?)`,
      [1, 'Agua', 0.5, 1, now, now]
    );

    // Example user
    db.run(
      `INSERT OR IGNORE INTO users (sap, name, role, course, allergies, childSap, walletBalance, transactions, active, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      ['1000', 'Estudiante ejemplo', 'student', 'Curso A', '', '[]', 10, '[]', 1, now, now]
    );
  });
  db.close();
  console.log('Seed complete:', DB_PATH);
}

if (require.main === module) {
  seed();
}

module.exports = seed;
