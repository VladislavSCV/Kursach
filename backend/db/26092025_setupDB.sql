-- ----------------------------
-- Таблица пользователей
-- ----------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL UNIQUE,
    photo VARCHAR(255) DEFAULT '/images/user-default.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone);

-- ----------------------------
-- Таблица новостей
-- ----------------------------
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    date DATE DEFAULT CURRENT_DATE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Таблица товаров
-- ----------------------------
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    price NUMERIC(10,2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    rating NUMERIC(3,2) DEFAULT 0,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category);

-- ----------------------------
-- Таблица акций / промо
-- ----------------------------
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    discount NUMERIC(5,2) DEFAULT 0,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    title VARCHAR(255) NOT NULL,
    rating NUMERIC(3,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Таблица заказов
-- ----------------------------
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    items JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_price NUMERIC(10,2) NOT NULL,
    delivery_time TIME,
    delivery_date DATE,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_items ON orders USING GIN(items);

-- ----------------------------
-- Триггер на авто-установку created_at
-- ----------------------------
CREATE OR REPLACE FUNCTION set_created_at()
RETURNS TRIGGER AS $$
BEGIN
   IF NEW.created_at IS NULL THEN
       NEW.created_at := CURRENT_TIMESTAMP;
   END IF;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_created_at BEFORE INSERT ON users FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER trg_news_created_at BEFORE INSERT ON news FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER trg_products_created_at BEFORE INSERT ON products FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER trg_promotions_created_at BEFORE INSERT ON promotions FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER trg_orders_created_at BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION set_created_at();