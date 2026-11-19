
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No token provided. Please login.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Support both signup (id) and login (_id) tokens
        const userId = decoded.id || decoded._id;

        if (!userId) {
            return res.status(401).json({
                message: 'Invalid user token.'
            });
        }

        req.user = {
            ...decoded,
            id: userId
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token. Please login again.'
        });
    }
});

module.exports = authenticationMiddleware;
