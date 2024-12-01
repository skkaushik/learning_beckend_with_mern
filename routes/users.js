const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUserById, deleteUserById, loginUser } = require('../controllers/userControllers');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', loginUser);

router.get('/all', verifyToken, getUsers);

router.post('/add', verifyToken, addUser);

router.put('/update/:id', verifyToken, updateUserById);

router.delete('/delete/:id', verifyToken, deleteUserById);

module.exports = router;