const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetailsById } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/details/:id', authMiddleware, getUserDetailsById);

module.exports = router;