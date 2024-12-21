const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetailsById, getUsers, updateUserById, deleteUserById } = require('../controllers/userControllers');
const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/details/:id', getUserDetailsById);

router.get('/list', getUsers);

router.put('/update/:id', updateUserById)

router.delete('/delete/:id', deleteUserById);

module.exports = router;