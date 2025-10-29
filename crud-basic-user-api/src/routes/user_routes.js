// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// CRUD routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/:id',userController.checkUser)
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
