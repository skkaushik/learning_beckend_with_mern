const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Found' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Invalid Token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
}

// Authorization Middleware

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.id.role !== role) {
            return res.status(403).json({ success: false, message: 'Access Denied: Insufficient permissions' });
        }
        next();
    }
}

module.exports = { authMiddleware, authorizeRole };