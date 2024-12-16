const express = require('express');
const { createPost, getLatestPosts, searchPosts, getHotestPost, getDetail, postComments } = require('../controllers/posts_controller');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/latest', getLatestPosts);
router.post('/search', authenticateToken, searchPosts);
router.get('/popular',getHotestPost);
router.get('/detail',getDetail);
router.post('/comments',postComments);
module.exports = router;