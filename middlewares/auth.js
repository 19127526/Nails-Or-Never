const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
exports.isAuth = (permissions) => async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findUserByUserName(decoded.username);
                if (!user) return res.status(401).send({success: false, message: 'User not found'});
                if (permissions && !permissions.includes(user.role)) return res.status(401).send({success: false, message: 'Unauthorized'});
                if (user.token !== token) return res.status(401).send({success: false, message: 'Token expired'});
                req.user = user;
                return next();
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    return res.status(401).send({success: false, message: 'Token expired'});
                } else if (e.name === 'JsonWebTokenError') {
                    return res.status(401).send({success: false, message: 'Invalid token'});
                }
                console.log(e)
                return res.status(401).send({success: false, message: 'Unauthorized'});
            }
        } else {
            return res.status(401).send({success: false, message: 'Unauthorized'});
        }
    } catch (e) {
        return res.status(500).send({success: false, message: 'Internal server error'});
    }
}