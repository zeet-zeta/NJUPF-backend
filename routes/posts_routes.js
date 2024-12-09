const express = require('express');
const { createPost, getLatestPosts } = require('../controllers/posts_controller');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/latest', getLatestPosts);

module.exports = router;