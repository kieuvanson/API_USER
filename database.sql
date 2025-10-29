CREATE DATABASE user_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, phone, avatar) VALUES
('Nguyen Van A', 'vana@example.com', '0901234567', 'https://i.pravatar.cc/150?img=1'),
('Tran Thi B', 'thib@example.com', '0912345678', 'https://i.pravatar.cc/150?img=2'),
('Le Van C', 'vanc@example.com', '0923456789', 'https://i.pravatar.cc/150?img=3'),
('Pham Thi D', 'thid@example.com', '0934567890', 'https://i.pravatar.cc/150?img=4'),
('Hoang Van E', 'vane@example.com', '0945678901', 'https://i.pravatar.cc/150?img=5'),
('Do Thi F', 'thif@example.com', '0956789012', 'https://i.pravatar.cc/150?img=6'),
('Bui Van G', 'vang@example.com', '0967890123', 'https://i.pravatar.cc/150?img=7'),
('Nguyen Thi H', 'thih@example.com', '0978901234', 'https://i.pravatar.cc/150?img=8'),
('Phan Van I', 'vani@example.com', '0989012345', 'https://i.pravatar.cc/150?img=9'),
('Tran Thi K', 'thik@example.com', '0990123456', 'https://i.pravatar.cc/150?img=10');
SELECT * FROM users