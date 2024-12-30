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
 *                 example: xyz
 *               email:
 *                 type: string
 *                 example: xyz@yopmail.com
 *               password:
 *                 type: string
 *                 example: 1234561212
 *               phoneNumber:
 *                 type: string
 *                 example: 9838389382
 *               address:
 *                 type: string
 *                 example: Ndida
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
 *                 example: xyz@yopmail.com
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
 * /details/{userId}:
 *   get:
 *     summary: Retrieve user details
 *     tags: [Users]
 *     description: Get detailed information about a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 6772080f2877219ac9332343
 *         description: The ID of the user to retrieve details for.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6772080f2877219ac9332343
 *                 name:
 *                   type: string
 *                   example: xyz
 *                 email:
 *                   type: string
 *                   example: xyz@yopmail.com
 *                 role:
 *                   type: string
 *                   example: individual
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       404:
 *         description: User not found.
 */
router.get('/details/:id', authMiddleware, getUserDetailsById);


/**
 * @swagger
 * /update/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     description: update user by given id.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: 12345abcde67890fghij12345
 *       - name: body
 *         in: body
 *         required: true
 *         description: User details to update.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *             password:
 *               type: string
 *               example: "newpassword123"
 *             phoneNumber:
 *               type: string
 *               example: "9876543210"
 *             address:
 *               type: string
 *               example: "123 Main Street, Springfield, IL"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 12345abcde67890fghij12345
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       example: "9876543210"
 *                     address:
 *                       type: string
 *                       example: "123 Main Street, Springfield, IL"
 *       400:
 *         description: Bad request, invalid data.
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       403:
 *         description: Forbidden, user does not have the 'admin' role.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update/:id', authMiddleware, authorizeRole('individual'), updateUserById)

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     description: Get a list of all users available in the system.
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6772080f2877219ac93322323
 *                   name:
 *                     type: string
 *                     example: Xyz
 *                   email:
 *                     type: string
 *                     example: xyx@yopmail.com
 *                   role:
 *                     type: string
 *                     example: admin
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       500:
 *         description: Internal server error.
 */
router.get('/list', authMiddleware, authorizeRole('admin'), getUsers);

/**
 * @swagger
 * /delete/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Only users with the 'admin' role can delete a user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *           example: 67720ea6ceefca7a0951a6381231223
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully.
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       403:
 *         description: Forbidden, user does not have the 'admin' role.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), deleteUserById);

module.exports = router;