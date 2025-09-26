const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/orders - все заказы
router.get('/', asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT id, user_id, items, status, total_price, delivery_time, delivery_date, location, created_at
    FROM orders
    ORDER BY created_at DESC
  `);
  res.status(200).json(result.rows);
}));

// GET /api/orders/user/:userId - заказы конкретного пользователя
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query(`
    SELECT id, items, status, total_price, delivery_time, delivery_date, location, created_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
  `, [userId]);

  res.status(200).json(result.rows);
}));

// POST /api/orders - создать заказ
router.post('/', asyncHandler(async (req, res) => {
  const { userId, items, totalPrice, deliveryTime, deliveryDate, location } = req.body;

  if (!userId || !items || !totalPrice) {
    return res.status(400).json({ error: 'Не хватает обязательных полей' });
  }

  const result = await pool.query(`
    INSERT INTO orders (user_id, items, total_price, delivery_time, delivery_date, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, status, created_at
  `, [userId, JSON.stringify(items), totalPrice, deliveryTime, deliveryDate, location]);

  res.status(201).json(result.rows[0]);
}));

// PATCH /api/orders/:id/status - обновить статус заказа
router.patch('/:id/status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Не указан новый статус' });
  }

  const result = await pool.query(`
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING id, status
  `, [status, id]);

  if (!result.rows.length) {
    return res.status(404).json({ error: 'Заказ не найден' });
  }

  res.status(200).json(result.rows[0]);
}));

module.exports = router;
