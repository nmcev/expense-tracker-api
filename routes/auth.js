const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

// Post: register
router.post('/register', authController.register);

// Post: login
router.post('/login', authController.login);

module.exports = router;
