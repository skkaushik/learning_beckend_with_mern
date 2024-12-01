const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetailsById } = require('../controllers/userControllers');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/details/:id', getUserDetailsById);

module.exports = router;