const jwt = require('jsonwebtoken');
const { statusCode: { UNAUTHORIZED, INTERNAL_SERVER_ERROR } } = require('../default.json')

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(UNAUTHORIZED).json({ success: false, message: "token not provided" })
        }

        // const token = bearerToken.split(' ')[1]; // not needed since we not using bearer Token

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userName = verifyToken.userName;
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.log(error)
        if (error.name === 'JsonWebTokenError') {
            return res.status(UNAUTHORIZED).json({ success: false, message: "Token not verified" });
        }
        return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" })
    }
}
