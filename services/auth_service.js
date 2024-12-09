const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // 建议用环境变量替代

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

const loginUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err || results.length === 0) return reject('Invalid username or password');
            
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return reject('Invalid username or password');
            
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            resolve({ token, userId: user.id });
        });
    });
};

module.exports = { registerUser, loginUser };