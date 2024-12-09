const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetailsById, getUsers } = require('../controllers/userControllers');
const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/details/:id', authMiddleware, getUserDetailsById);

router.get('/list', authMiddleware, authorizeRole('admin'), getUsers);

module.exports = router;