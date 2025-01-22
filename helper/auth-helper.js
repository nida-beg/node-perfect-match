const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const auth = req.header('Authorization');

    const token = auth.split(' ')[1]

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
module.exports = verifyToken;
