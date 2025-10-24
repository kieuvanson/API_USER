// models/user.js
const pool = require('../config/db.config');

// Lấy tất cả người dùng, hỗ trợ tìm kiếm theo tên (partial, case-insensitive)
const getAllUsers = async (name) => {
  if (name) {
    const result = await pool.query(
      'SELECT * FROM users WHERE name ILIKE $1 ORDER BY id ASC',
      [`%${name}%`]
    );
    return result.rows;
  }

  const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
  return result.rows;
};

// Lấy người dùng theo id

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Tìm 1 người theo tên (partial, case-insensitive), trả về kết quả đầu tiên
const getUserByName = async (name) => {
  if (!name) return null;
  const result = await pool.query(
    'SELECT * FROM users WHERE name ILIKE $1 ORDER BY id ASC LIMIT 1',
    [`%${name}%`]
  );
  return result.rows[0];
};

// Thêm người dùng mới
const createUser = async (name, email, phone, avatar) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, phone, avatar) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, phone, avatar]
  );
  return result.rows[0];
};

// Cập nhật thông tin người dùng
const updateUser = async (id, name, email, phone, avatar) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, phone = $3, avatar = $4 WHERE id = $5 RETURNING *',
    [name, email, phone, avatar, id]
  );
  return result.rows[0];
};

// Xóa người dùng
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return { message: 'User deleted successfully' };
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
