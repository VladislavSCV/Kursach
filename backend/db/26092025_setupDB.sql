-- products (товары)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    rating NUMERIC(2,1) DEFAULT 0,
    category VARCHAR(100) NOT NULL
);

-- promotions (акции)
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    discount INTEGER NOT NULL CHECK (discount >= 0 AND discount <= 100),
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    rating NUMERIC(2,1) DEFAULT 0
);

-- news (новости / статьи)
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- orders (заказы)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    items JSONB NOT NULL, -- список товаров [{id, qty, price}]
    status VARCHAR(50) DEFAULT 'pending',
    total_price NUMERIC(10,2) NOT NULL,
    delivery_time VARCHAR(50),
    delivery_date DATE,
    location TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- индекс для быстрого поиска заказов по user_id
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- индекс для быстрого поиска заказов по status
CREATE INDEX idx_orders_status ON orders(status);