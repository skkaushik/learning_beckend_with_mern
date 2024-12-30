const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetailsById, getUsers, updateUserById, deleteUserById } = require('../controllers/userControllers');
const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sachin
 *               email:
 *                 type: string
 *                 example: sachin@yopmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phoneNumber:
 *                 type: string
 *                 example: 9838389382
 *               address:
 *                 type: string
 *                 example: aligarh
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sachin@yopmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /details/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/details/:id', authMiddleware, authorizeRole('individual'), getUserDetailsById);

router.get('/list', authMiddleware, authorizeRole('admin'), getUsers);

router.put('/update/:id', authMiddleware, authorizeRole('admin'), updateUserById)

router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), deleteUserById);

module.exports = router;