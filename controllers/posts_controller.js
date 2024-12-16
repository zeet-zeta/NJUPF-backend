const postsService = require('../services/posts_service');

const createPost = async (req, res) => {
    const { userID, title, content } = req.body;
    try {
        console.log(req.files);
        const postId = await postsService.createPost({ title, author, content, createdAt, images });
        res.status(201).json({ message: "Post created successfully", postId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const getLatestPosts = async (req, res) => {
//     try {
//         const posts = await postsService.getLatestPosts();
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to retrieve posts' });
//     }
// };

// const getPopularPosts = async (req, res) => {
//     try {
//         const posts = await postsService.getPopularPosts();
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to retrieve posts' });
//     }
// };

// const searchPosts = async (req, res) => {
//     try {
//         const posts = await postsService.searchPosts();
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve posts' });
//     }
// };

module.exports = { createPost };