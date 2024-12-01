const jwt = require("jsonwebtoken");

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data to request object
        next();
    } catch (err) {
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { verifyToken }