const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://kursach_user:rmAlkg1FeNrZgUtqWSmziDGy8q2G3ZWq@dpg-d3fs69p5pdvs73bq34j0-a.oregon-postgres.render.com/kursachdb",
  ssl: {
    rejectUnauthorized: false
  }
});


module.exports = pool;