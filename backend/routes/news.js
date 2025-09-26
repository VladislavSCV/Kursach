const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/news - все статьи
router.get('/', asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT id, image, date, title, description
    FROM news 
    ORDER BY id DESC
  `);
  res.status(200).json(result.rows);
}));

// GET /api/news/:id - одна статья
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`
    SELECT id, image, date, title, description
    FROM news
    WHERE id = $1
  `, [id]);

  if (!result.rows.length) {
    return res.status(404).json({ error: 'Статья не найдена' });
  }

  res.status(200).json(result.rows[0]);
}));

module.exports = router;
