const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUserById, deleteUserById } = require('../controllers/userControllers');

router.get("/all", getUsers)

router.post('/add', addUser);

router.put('/update/:id', updateUserById)

router.delete('/delete/:id', deleteUserById)

module.exports = router;