const postsService = require('../services/posts_service');

const createPost = async (req, res) => {
    const { title, author, content, createdAt, images } = req.body;
    try {
        const postId = await postsService.createPost({ title, author, content, createdAt, images });
        res.status(201).json({ message: "Post created successfully", postId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getLatestPosts = async (req, res) => {
    try {
        const posts = await postsService.getLatestPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

module.exports = { createPost, getLatestPosts };