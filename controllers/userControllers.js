const User = require('../models/UserModel');

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
            message: "User Created"
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
            message: "User Updated"
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "User Deleted"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { getUsers, addUser, updateUserById, deleteUserById }