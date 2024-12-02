const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel');

dotenv.config();

// Create JWT Token
const jwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
    const { name, email, address, password, phoneNumber } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exist' });
        }
        const newUser = new User({ name, email, address, password, phoneNumber });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User Registered Successfully!'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!(existUser.password === password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwtToken(existUser.id);

        res.status(200).json({
            success: true,
            message: 'User Logged Successfully!',
            token: token,
            data: {
                id: existUser.id,
                name: existUser.name,
                email: existUser.email
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getUserDetailsById = async (req, res) => {
    const { id } = req.params;

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            res.status(400).json({
                succuess: false,
                message: "User not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User Details Fetch Successfully",
            data: existingUser
        })
    } catch (err) {
        res.status(500).json({
            succuess: false,
            message: err.message
        })
    }
}

module.exports = { registerUser, loginUser, getUserDetailsById };