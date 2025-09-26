const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/promotions - все акции
router.get('/', asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT id, image, discount, price, original_price, title, rating
    FROM promotions 
    ORDER BY id DESC
  `);
  res.status(200).json(result.rows);
}));

// GET /api/promotions/:id - одна акция
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`
    SELECT id, image, discount, price, original_price, title, rating
    FROM promotions
    WHERE id = $1
  `, [id]);

  if (!result.rows.length) {
    return res.status(404).json({ error: 'Акция не найдена' });
  }

  res.status(200).json(result.rows[0]);
}));

module.exports = router;
