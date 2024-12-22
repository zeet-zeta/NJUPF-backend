const db = require('../config/db');
const bcrypt = require('bcrypt');

const deleteByFilename = async (filename) => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', 'public', filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('文件删除失败:', err);
        }
    });
}

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) return reject();
            db.query('INSERT INTO user_avatars (userID, avatar) VALUES (?, ?)', [results.insertId, 'default.png']);
            resolve(results.insertId);
        });
    });
};

const loginUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err || results.length === 0) return reject();
            
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return reject();

            resolve(user.userID);
        });
    });
};

const updateAvatar = async (userID, avatar) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE user_avatars SET avatar = ? WHERE userID = ?', [avatar, userID], (err, results) => {
            if (err || results.affectedRows === 0) {
                deleteByFilename(avatar);
                return reject();
            }
            resolve();
        });
    });
}

const getAvatar = async (userID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT avatar FROM user_avatars WHERE userID = ?', [userID], (err, results) => {
            if (err || results.length === 0) return reject();
            resolve(results[0].avatar);
        });
    });
}

module.exports = { registerUser, loginUser, updateAvatar, getAvatar };