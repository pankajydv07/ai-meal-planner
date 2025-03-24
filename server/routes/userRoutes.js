const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Login user
router.post('/login', userController.loginUser);

// Create a new user
router.post('/', userController.createUser);

// Update user preferences
router.put('/:userId', userController.updateUserPreferences);

// Get user by ID
router.get('/:userId', userController.getUserById);

module.exports = router;
