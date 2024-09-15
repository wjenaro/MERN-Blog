const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login a user
router.post('/login', authController.loginUser);

// Get profile
router.get('/profile', authController.getProfile);

// Logout a user
router.post('/logout', authController.logoutUser);

module.exports = router;
