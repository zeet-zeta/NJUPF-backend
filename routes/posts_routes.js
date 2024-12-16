const express = require('express');
const { createPost, getLatestPosts } = require('../controllers/posts_controller');
const router = express.Router();

router.post('/',createPost);
router.get('/latest', getLatestPosts);

module.exports = router;