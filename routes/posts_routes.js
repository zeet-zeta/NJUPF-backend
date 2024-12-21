const express = require('express');
const { createPost, getLatestPosts, getPopularPosts, searchPosts, getPostDetails, createComment } = require('../controllers/posts_controller');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// router.post('/posts', upload.array('images', 9), createPost);
router.post('/posts', (req, res, next) => {
    upload.array('images', 9)(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            createPost(req, res);
        }
    });
});
router.get('/posts/latest', getLatestPosts);
router.get('/posts/popular', getPopularPosts);
router.get('/posts/search', searchPosts);
router.get('/posts/detail', getPostDetails);
router.post('/comments', createComment);

module.exports = router;