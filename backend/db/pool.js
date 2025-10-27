// db.js
const { Pool } = require('pg');

const createPool = () => new Pool({
  connectionString: "postgresql://kursachdb_zbho_user:J6Bj34EDx4TFz6Q2wdQDAI43U7XPyZgN@dpg-d3vl15odl3ps73ft5jd0-a.oregon-postgres.render.com/kursachdb_zbho",
  ssl: { rejectUnauthorized: false },
  max: 5, // максимум 5 соединений
  idleTimeoutMillis: 10000, // 10 сек до авторазрыва
  connectionTimeoutMillis: 5000, // ждать подключение 5 сек
});

let pool = createPool();

pool.on('error', (err) => {
  console.error('❌ Потеряно соединение с PostgreSQL:', err.message);
  console.log('♻️  Пересоздаём пул соединений...');
  pool = createPool(); // пересоздаём пул при ошибке
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};
