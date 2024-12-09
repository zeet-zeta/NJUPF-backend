const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // 建议用环境变量替代

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // No token, unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token is no longer valid
        }
        req.user = user; // 将解码后的用户信息添加到请求对象中
        next(); // 继续处理请求
    });
};

module.exports = authenticateToken;