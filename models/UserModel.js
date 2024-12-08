const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 6,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Define possible roles
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set update date
    },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;