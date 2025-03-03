const verifyToken = require('../middleware/authMiddleware');
const {
    login,
    changePassword
} = require("./../controllers/authController");
const express = require('express');

const router = express.Router();

// Login route to authenticate the user and generate JWT token
router.post('/login', login);

// Change password route (secured with verifyToken middleware)
router.post('/change-password', verifyToken, changePassword);

module.exports = router;
