// controllers/userController.js
const userModel = require('../models/User');

// Lấy tất cả người dùng (hỗ trợ query ?name= để tìm theo tên)
const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await userModel.getAllUsers(name);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tìm 1 người theo tên (trả về kết quả đầu tiên)
const getUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Query param "name" is required' });
    const user = await userModel.getUserByName(name);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    const newUser = await userModel.createUser(name, email, phone, avatar);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    const updated = await userModel.updateUser(req.params.id, name, email, phone, avatar);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
