// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// CRUD routes
router.get('/', userController.getAllUsers);
router.get('/search', userController.getUserByName);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
