// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Маршруты
const productRoutes = require('./routes/products');
const promotionRoutes = require('./routes/promotions');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 1. Middleware — порядок важен!
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));

// ✅ 2. Разрешаем JSON и формы
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ 3. Маршруты
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/news', newsRoutes);

// ✅ 4. Health check
app.get('/', (req, res) => {
  res.json({ message: 'Severnochka API is running!' });
});

// ✅ 5. Запуск
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
