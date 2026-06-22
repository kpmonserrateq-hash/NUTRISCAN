const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { openDb, migrate, DB_PATH, DATA_DIR } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files (the SPA)
app.use(express.static(path.join(__dirname)));

// Ensure DB created
migrate();

// Helpers
function rowToUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    sap: row.sap,
    name: row.name,
    role: row.role,
    course: row.course,
    allergies: row.allergies,
    childSap: row.childSap ? JSON.parse(row.childSap) : [],
    walletBalance: row.walletBalance || 0,
    waterToday: Number(row.waterToday || 0),
    healthyToday: Number(row.healthyToday || 0),
    transactions: row.transactions ? JSON.parse(row.transactions) : [],
    active: row.active === 1,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function rowToProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price || 0),
    active: row.active === 1,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function rowToNutritionHistory(row) {
  if (!row) return null;
  return {
    id: row.id,
    sap: row.sap,
    summaryDate: row.summaryDate,
    calories: Number(row.calories || 0),
    protein: Number(row.protein || 0),
    healthy: Number(row.healthy || 0),
    water: Number(row.water || 0),
    createdAt: row.createdAt
  };
}

function rowToNutritionCare(row) {
  if (!row) return null;
  return {
    id: row.id,
    nutritionistSap: row.nutritionistSap,
    studentSap: row.studentSap,
    attentionDate: row.attentionDate,
    assessment: row.assessment || '',
    plan: row.plan || '',
    status: row.status || '',
    weight: Number(row.weight || 0),
    height: Number(row.height || 0),
    bmi: Number(row.bmi || 0),
    bloodPressure: row.bloodPressure || '',
    nextDate: row.nextDate || '',
    createdAt: row.createdAt
  };
}

// List users
app.get('/api/users', (req, res) => {
  const { role, active } = req.query;
  const conditions = [];
  const params = [];
  if (role) {
    conditions.push('role = ?');
    params.push(role);
  }
  if (typeof active !== 'undefined') {
    conditions.push('active = ?');
    params.push(active === '1' || active === 'true' ? 1 : 0);
  }
  let sql = 'SELECT * FROM users';
  if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`;
  const db = openDb();
  db.all(sql, params, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(rowToUser));
  });
});

// Get by sap
app.get('/api/users/:sap', (req, res) => {
  const sap = String(req.params.sap || '').trim();
  const db = openDb();
  db.get('SELECT * FROM users WHERE sap = ?', [sap], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(rowToUser(row));
  });
});

// Create or update user
app.post('/api/users', (req, res) => {
  const user = req.body || {};
  if (!user.sap) return res.status(400).json({ error: 'sap required' });
  const now = new Date().toISOString();
  const db = openDb();
  db.run(
    `INSERT INTO users (sap,name,role,course,allergies,childSap,walletBalance,waterToday,healthyToday,transactions,active,createdAt,updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(sap) DO UPDATE SET
       name=excluded.name,
       role=excluded.role,
       course=excluded.course,
       allergies=excluded.allergies,
       childSap=excluded.childSap,
       walletBalance=excluded.walletBalance,
       waterToday=excluded.waterToday,
       healthyToday=excluded.healthyToday,
       transactions=excluded.transactions,
       active=excluded.active,
       updatedAt=excluded.updatedAt
    `,
    [
      user.sap,
      user.name || '',
      user.role || '',
      user.course || '',
      user.allergies || '',
      JSON.stringify(user.childSap || []),
      Number(user.walletBalance || 0),
      Number(user.waterToday || 0),
      Number(user.healthyToday || 0),
      JSON.stringify(user.transactions || []),
      typeof user.active !== 'undefined' ? (user.active ? 1 : 0) : 1,
      user.createdAt || now,
      now
    ],
    function (err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM users WHERE sap = ?', [user.sap], (gErr, row) => {
        db.close();
        if (gErr) return res.status(500).json({ error: gErr.message });
        res.json(rowToUser(row));
      });
    }
  );
});

// Update partial user fields
app.patch('/api/users/:sap', (req, res) => {
  const sap = String(req.params.sap || '').trim();
  const updates = req.body || {};
  if (!sap) return res.status(400).json({ error: 'sap required' });
  const fields = [];
  const params = [];
  const allowed = ['sap', 'name', 'role', 'course', 'allergies', 'childSap', 'walletBalance', 'waterToday', 'healthyToday', 'transactions', 'active'];
  allowed.forEach((field) => {
    if (typeof updates[field] !== 'undefined') {
      if (field === 'childSap') {
        fields.push('childSap = ?');
        params.push(JSON.stringify(updates.childSap || []));
      } else if (field === 'walletBalance') {
        fields.push('walletBalance = ?');
        params.push(Number(updates.walletBalance || 0));
      } else if (field === 'waterToday') {
        fields.push('waterToday = ?');
        params.push(Number(updates.waterToday || 0));
      } else if (field === 'healthyToday') {
        fields.push('healthyToday = ?');
        params.push(Number(updates.healthyToday || 0));
      } else if (field === 'transactions') {
        fields.push('transactions = ?');
        params.push(JSON.stringify(updates.transactions || []));
      } else if (field === 'active') {
        fields.push('active = ?');
        params.push(updates.active ? 1 : 0);
      } else {
        fields.push(`${field} = ?`);
        params.push(updates[field]);
      }
    }
  });
  if (!fields.length) return res.status(400).json({ error: 'No valid fields to update' });
  fields.push('updatedAt = ?');
  params.push(new Date().toISOString());
  params.push(sap);
  const db = openDb();
  db.run(`UPDATE users SET ${fields.join(', ')} WHERE sap = ?`, params, function (err) {
    if (err) {
      db.close();
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({ error: 'Not found' });
    }
    const newSap = typeof updates.sap !== 'undefined' ? updates.sap : sap;
    db.get('SELECT * FROM users WHERE sap = ?', [newSap], (gErr, row) => {
      db.close();
      if (gErr) return res.status(500).json({ error: gErr.message });
      res.json(rowToUser(row));
    });
  });
});

// Delete all users
app.delete('/api/users', (req, res) => {
  const db = openDb();
  db.run('DELETE FROM users', [], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Delete user
app.delete('/api/users/:sap', (req, res) => {
  const sap = String(req.params.sap || '').trim();
  const db = openDb();
  db.run('DELETE FROM users WHERE sap = ?', [sap], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// List products
app.get('/api/products', (req, res) => {
  const { active } = req.query;
  const params = [];
  let sql = 'SELECT * FROM products';
  if (typeof active !== 'undefined') {
    sql += ' WHERE active = ?';
    params.push(active === '1' || active === 'true' ? 1 : 0);
  }
  sql += ' ORDER BY id DESC';
  const db = openDb();
  db.all(sql, params, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(rowToProduct));
  });
});

// Get product by id
app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id || 0);
  if (!id) return res.status(400).json({ error: 'id required' });
  const db = openDb();
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(rowToProduct(row));
  });
});

// Create product
app.post('/api/products', (req, res) => {
  const product = req.body || {};
  const name = String(product.name || '').trim();
  const price = Number(product.price || 0);
  if (!name) return res.status(400).json({ error: 'name required' });
  if (Number.isNaN(price) || price < 0) return res.status(400).json({ error: 'valid price required' });
  const now = new Date().toISOString();
  const db = openDb();
  db.run(
    'INSERT INTO products (name, price, active, createdAt, updatedAt) VALUES (?,?,?,?,?)',
    [name, price, typeof product.active !== 'undefined' ? (product.active ? 1 : 0) : 1, now, now],
    function (err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (gErr, row) => {
        db.close();
        if (gErr) return res.status(500).json({ error: gErr.message });
        res.json(rowToProduct(row));
      });
    }
  );
});

// Update product
app.patch('/api/products/:id', (req, res) => {
  const id = Number(req.params.id || 0);
  if (!id) return res.status(400).json({ error: 'id required' });
  const updates = req.body || {};
  const fields = [];
  const params = [];

  if (typeof updates.name !== 'undefined') {
    const name = String(updates.name || '').trim();
    if (!name) return res.status(400).json({ error: 'name cannot be empty' });
    fields.push('name = ?');
    params.push(name);
  }
  if (typeof updates.price !== 'undefined') {
    const price = Number(updates.price);
    if (Number.isNaN(price) || price < 0) return res.status(400).json({ error: 'valid price required' });
    fields.push('price = ?');
    params.push(price);
  }
  if (typeof updates.active !== 'undefined') {
    fields.push('active = ?');
    params.push(updates.active ? 1 : 0);
  }

  if (!fields.length) return res.status(400).json({ error: 'No valid fields to update' });
  fields.push('updatedAt = ?');
  params.push(new Date().toISOString());
  params.push(id);

  const db = openDb();
  db.run(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params, function (err) {
    if (err) {
      db.close();
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({ error: 'Not found' });
    }
    db.get('SELECT * FROM products WHERE id = ?', [id], (gErr, row) => {
      db.close();
      if (gErr) return res.status(500).json({ error: gErr.message });
      res.json(rowToProduct(row));
    });
  });
});

app.get('/api/nutrition-history', (req, res) => {
  const sap = String(req.query.sap || '').trim();
  const db = openDb();
  let sql = 'SELECT * FROM nutrition_history';
  const params = [];
  if (sap) {
    sql += ' WHERE sap = ?';
    params.push(sap);
  }
  sql += ' ORDER BY createdAt DESC, id DESC';
  db.all(sql, params, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json((rows || []).map(rowToNutritionHistory));
  });
});

app.post('/api/nutrition-history', (req, res) => {
  const payload = req.body || {};
  const sap = String(payload.sap || '').trim();
  if (!sap) return res.status(400).json({ error: 'sap required' });
  const summaryDate = String(payload.summaryDate || '').trim() || new Date().toISOString().slice(0, 10);
  const calories = Number(payload.calories || 0);
  const protein = Number(payload.protein || 0);
  const healthy = Number(payload.healthy || 0);
  const water = Number(payload.water || 0);
  if ([calories, protein, healthy, water].some((v) => Number.isNaN(v) || v < 0)) {
    return res.status(400).json({ error: 'invalid nutrition values' });
  }
  const now = new Date().toISOString();
  const db = openDb();
  db.run(
    'INSERT INTO nutrition_history (sap, summaryDate, calories, protein, healthy, water, createdAt) VALUES (?,?,?,?,?,?,?)',
    [sap, summaryDate, calories, protein, healthy, water, now],
    function (err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM nutrition_history WHERE id = ?', [this.lastID], (gErr, row) => {
        db.close();
        if (gErr) return res.status(500).json({ error: gErr.message });
        res.json(rowToNutritionHistory(row));
      });
    }
  );
});

app.get('/api/nutrition-care', (req, res) => {
  const nutritionistSap = String(req.query.nutritionistSap || '').trim();
  const studentSap = String(req.query.studentSap || '').trim();
  const conditions = [];
  const params = [];
  if (nutritionistSap) {
    conditions.push('nutritionistSap = ?');
    params.push(nutritionistSap);
  }
  if (studentSap) {
    conditions.push('studentSap = ?');
    params.push(studentSap);
  }
  let sql = 'SELECT * FROM nutrition_care_records';
  if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`;
  sql += ' ORDER BY attentionDate DESC, createdAt DESC, id DESC';
  const db = openDb();
  db.all(sql, params, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json((rows || []).map(rowToNutritionCare));
  });
});

app.post('/api/nutrition-care', (req, res) => {
  const payload = req.body || {};
  const nutritionistSap = String(payload.nutritionistSap || '').trim();
  const studentSap = String(payload.studentSap || '').trim();
  const attentionDate = String(payload.attentionDate || '').trim();
  if (!nutritionistSap) return res.status(400).json({ error: 'nutritionistSap required' });
  if (!studentSap) return res.status(400).json({ error: 'studentSap required' });
  if (!attentionDate) return res.status(400).json({ error: 'attentionDate required' });
  const assessment = String(payload.assessment || '').trim();
  const plan = String(payload.plan || '').trim();
  const status = String(payload.status || '').trim();
  const weight = Number(payload.weight || 0);
  const height = Number(payload.height || 0);
  const bmi = Number(payload.bmi || 0);
  const bloodPressure = String(payload.bloodPressure || '').trim();
  const nextDate = String(payload.nextDate || '').trim();
  const now = new Date().toISOString();
  const db = openDb();
  db.run(
    'INSERT INTO nutrition_care_records (nutritionistSap, studentSap, attentionDate, assessment, plan, status, weight, height, bmi, bloodPressure, nextDate, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [nutritionistSap, studentSap, attentionDate, assessment, plan, status || 'seguimiento', weight, height, bmi, bloodPressure, nextDate, now],
    function (err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM nutrition_care_records WHERE id = ?', [this.lastID], (gErr, row) => {
        db.close();
        if (gErr) return res.status(500).json({ error: gErr.message });
        res.json(rowToNutritionCare(row));
      });
    }
  );
});

// Simple login endpoint
app.post('/api/login', (req, res) => {
  const sap = String((req.body && req.body.sap) || '').trim();
  if (!sap) return res.status(400).json({ error: 'sap required' });
  const db = openDb();
  db.get('SELECT * FROM users WHERE sap = ?', [sap], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.active !== 1) return res.status(403).json({ error: 'User inactive' });
    res.json(rowToUser(row));
  });
});

// App-wide state persisted in SQLite (portable across machines when copying project folder)
app.get('/api/state/:key', (req, res) => {
  const key = String(req.params.key || '').trim();
  if (!key) return res.status(400).json({ error: 'key required' });
  const db = openDb();
  db.get('SELECT key, value, updatedAt FROM app_state WHERE key = ?', [key], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    let parsed = null;
    try {
      parsed = row.value ? JSON.parse(row.value) : null;
    } catch (parseError) {
      parsed = row.value;
    }
    res.json({ key: row.key, value: parsed, updatedAt: row.updatedAt });
  });
});

app.put('/api/state/:key', (req, res) => {
  const key = String(req.params.key || '').trim();
  if (!key) return res.status(400).json({ error: 'key required' });
  const now = new Date().toISOString();
  const rawValue = typeof req.body?.value === 'undefined' ? null : req.body.value;
  const encoded = JSON.stringify(rawValue);
  const db = openDb();
  db.run(
    `INSERT INTO app_state (key, value, updatedAt)
     VALUES (?,?,?)
     ON CONFLICT(key) DO UPDATE SET
       value=excluded.value,
       updatedAt=excluded.updatedAt`,
    [key, encoded, now],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.json({ key, value: rawValue, updatedAt: now });
    }
  );
});

app.delete('/api/state/:key', (req, res) => {
  const key = String(req.params.key || '').trim();
  if (!key) return res.status(400).json({ error: 'key required' });
  const db = openDb();
  db.run('DELETE FROM app_state WHERE key = ?', [key], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes || 0 });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, dbPath: DB_PATH, dataDir: DATA_DIR });
});

app.listen(PORT, () => {
  console.log(`NutriScan API listening on http://localhost:${PORT}`);
  console.log(`NutriScan data dir: ${DATA_DIR}`);
  console.log(`NutriScan db path: ${DB_PATH}`);
});
