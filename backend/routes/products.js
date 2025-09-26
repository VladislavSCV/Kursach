const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/products - все товары
router.get('/', asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT id, image, price, title, rating, category
    FROM products
    ORDER BY id
  `);
  res.status(200).json(result.rows);
}));

// GET /api/products/:id - один товар
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`
    SELECT id, image, price, title, rating, category
    FROM products
    WHERE id = $1
  `, [id]);

  if (!result.rows.length) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  res.status(200).json(result.rows[0]);
}));

module.exports = router;
