const db = require('../config/db');

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

const createPost = (userID, title, content, filenames) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO posts (userID, title, content) VALUES (?, ?, ?) ', [userID, title, content], (err, results) => {
            if (err) {
                for (let i = 0; i < filenames.length; i++) {
                    deleteByFilename(filenames[i]);
                }
                return reject(err);
            }
            const postID = results.insertId;
            for (let i = 0; i < filenames.length; i++) {
                db.query('INSERT INTO images (postID, image) VALUES (?, ?)', [postID, filenames[i]]);
            }
            db.query('SELECT createdTime FROM posts WHERE postID = ?', postID, (err, results2) => {
                resolve({postID: postID, createdTime: results2[0].createdTime});
            });
        });
    });
};

const getAuthorName = (userID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT username FROM users WHERE userID = ?', userID, (err, results) => {
            if (err) return reject(err);
            resolve(results[0].username);
        });
    });
};

const getAuthorAvatar = (userID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT avatar FROM user_avatars WHERE userID = ?', userID, (err, results) => {
            if (err) return reject(err);
            resolve(results[0].avatar);
        });
    });
};

const getFirstImage = (postID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT image FROM images WHERE postID = ? LIMIT 1', postID, (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            resolve(results[0].image);
        });
    });
};

const getLatestPosts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts ORDER BY createdTime DESC', async (err, results) => {
            if (err) return reject(err);
            const posts = [];
            for (let i = 0; i < results.length; i++) {
                const post = results[i];
                posts.push({
                    postID: post.postID,
                    title: post.title,
                    authorName: await getAuthorName(post.userID),
                    authorAvatar: await getAuthorAvatar(post.userID),
                    firstImage: await getFirstImage(post.postID),
                    createdTime: post.createdTime,
                    commentsNum: post.commentsNum,
                    averageRating: post.averageRating
                })
            }
            resolve(posts);
        });
    });
};

const getPopularPosts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts ORDER BY commentsNum DESC', async (err, results) => {
            if (err) return reject(err);
            const posts = [];
            for (let i = 0; i < results.length; i++) {
                const post = results[i];
                posts.push({
                    postID: post.postID,
                    title: post.title,
                    authorName: await getAuthorName(post.userID),
                    authorAvatar: await getAuthorAvatar(post.userID),
                    firstImage: await getFirstImage(post.postID),
                    createdTime: post.createdTime,
                    commentsNum: post.commentsNum,
                    averageRating: post.averageRating
                })
            }
            resolve(posts);
        });
    });
};

const searchPosts = (keyword) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts WHERE title LIKE ?', ['%' + keyword + '%'], async (err, results) => {
            if (err) return reject(err);
            const posts = [];
            for (let i = 0; i < results.length; i++) {
                const post = results[i];
                posts.push({
                    postID: post.postID,
                    title: post.title,
                    authorName: await getAuthorName(post.userID),
                    authorAvatar: await getAuthorAvatar(post.userID),
                    firstImage: await getFirstImage(post.postID),
                    createdTime: post.createdTime,
                    commentsNum: post.commentsNum,
                    averageRating: post.averageRating
                })
            }
            resolve(posts);
        });
    });
};

const getImages = (postID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT image FROM images WHERE postID = ?', postID, (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            const images = [];
            for (let i = 0; i < results.length; i++) {
                images.push(results[i].image);
            }
            resolve(images);
        });
    });
}

const getComments = (postID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comments WHERE postID = ?', postID, async (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            const comments = [];
            for (let i = 0; i < results.length; i++) {
                const comment_i = results[i];
                console.log(comment_i);
                comments.push({
                    senderName: await getAuthorName(comment_i.senderID),
                    senderAvatar: await getAuthorAvatar(comment_i.senderID),
                    comment: comment_i.comment,
                    rating: comment_i.rating,
                    createdTime: comment_i.createdTime
                });
            }
            resolve(comments);
        });
    });
}

const getPostDetails = (postID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts WHERE postID = ?', postID, async (err, results) => {
            if (err || results.length === 0) return reject(err);
            const post = results[0];
            resolve({
                title: post.title,
                authorName: await getAuthorName(post.userID),
                authorAvatar: await getAuthorAvatar(post.userID),
                content: post.content,
                createdTime: post.createdTime,
                images: await getImages(postID),
                averageRating: post.averageRating,
                comments: await getComments(postID)
            });
        });
    });
};

const createComment = (userID, postID, comment, rating) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO comments (senderID, postID, comment, rating) VALUES (?, ?, ?, ?)', [userID, postID, comment, rating], (err, results) => {
            if (err) return reject(err);
            db.query('SELECT createdTime FROM comments WHERE commentID = ?', results.insertId, (err, results2) => {
                db.query('SELECT rating FROM comments WHERE postID = ?', postID, (err, results3) => {
                    let sum = 0;
                    for (let i = 0; i < results3.length; i++) {
                        sum += Number (results3[i].rating);
                    }
                    sum /= results3.length;
                    db.query('UPDATE posts SET commentsNum = commentsNum + 1, averageRating = ? WHERE postID = ?', [sum, postID], (err, results4) => {
                        db.query('SELECT averageRating FROM posts WHERE postID = ?', postID, (err, results5) => {
                            resolve({commentID: results.insertId, createdTime: results2[0].createdTime, newAverageRating: results5[0].averageRating});
                        });
                    });
                });
            });
        });
    });
};

module.exports = { createPost, getLatestPosts, getPopularPosts, searchPosts, getPostDetails, createComment }; 