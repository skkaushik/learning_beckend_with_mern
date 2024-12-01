const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// Controller to Authenticate User and Provide JWT (Mock Login)
const loginUser = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user (Mock authentication: no password handling as per your request)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Token
        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            token,
            message: 'Login successful'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Protected Route Examples
const getUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newUser = new User({ name, email, address });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User Created'
        });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: err.message });
    }
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;

    try {
        await User.findByIdAndUpdate(id, { name, email, address })
        res.status(201).json({
            success: true,
            message: 'User Updated'
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: 'User Deleted'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = { loginUser, getUsers, addUser, updateUserById, deleteUserById };