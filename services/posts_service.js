const db = require('../config/db');

const createPost = (postData) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO posts SET ?', postData, (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

const getLatestPosts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT postId, title FROM posts ORDER BY createdAt DESC LIMIT 10', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { createPost, getLatestPosts };