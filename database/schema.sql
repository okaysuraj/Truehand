-- PostgreSQL Schema for TrueHand App
-- Execute this file after creating the truehand database

-- Users Table (Customers, Sellers and Delivery Personnel)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'CUSTOMER', -- CUSTOMER, SELLER, DELIVERY_BOY, ADMIN
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    seller_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    delivery_address VARCHAR(500),
    delivery_city VARCHAR(100),
    delivery_postal_code VARCHAR(20),
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deliveries Table
CREATE TABLE IF NOT EXISTS deliveries (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL UNIQUE REFERENCES orders(id),
    delivery_boy_id INT REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'PENDING',
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP,
    delivery_distance_km DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations Table (Real-time tracking)
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    delivery_id INT NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    user_id INT NOT NULL REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_delivery_boy_id ON deliveries(delivery_boy_id);
CREATE INDEX IF NOT EXISTS idx_locations_delivery_id ON locations(delivery_id);
CREATE INDEX IF NOT EXISTS idx_locations_timestamp ON locations(timestamp);
CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON reviews(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

-- Insert sample users (1 Seller)
INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES
(100, 'seller@truehand.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HCGzzZk5GZ7Z.Vz2', 'TrueHand', 'Seller', 'SELLER')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, category, price, stock_quantity, is_available, seller_id) VALUES
('Fresh Tomatoes', 'Ripe red tomatoes', 'Vegetables', 50.00, 100, true, 100),
('Organic Spinach', 'Fresh organic spinach leaves', 'Vegetables', 40.00, 75, true, 100),
('Whole Milk', 'Fresh pasteurized whole milk 1L', 'Dairy', 60.00, 50, true, 100),
('Greek Yogurt', 'Plain greek yogurt 500g', 'Dairy', 120.00, 40, true, 100),
('Basmati Rice', 'Premium basmati rice 1kg', 'Grains', 200.00, 60, true, 100),
('Olive Oil', 'Extra virgin olive oil 500ml', 'Oils', 350.00, 30, true, 100),
('Bananas', 'Fresh yellow bananas', 'Fruits', 45.00, 80, true, 100),
('Red Apples', 'Sweet red apples', 'Fruits', 80.00, 60, true, 100)
ON CONFLICT DO NOTHING;
