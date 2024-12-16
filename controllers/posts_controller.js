const postsService = require('../services/posts_service');

const createPost = async (req, res) => {
    const { userID, title, content } = req.body;
    try {
        const { postID, createdTime } = await postsService.createPost(userID, title, content, req.files.map(file => file.filename));
        res.status(201).json({ postID, createdTime, iamges: req.files.map(file => file.filename)});
    } catch (error) {
        res.status(400).json({ error: "Invalid userID" });
    }
};

const getLatestPosts = async (req, res) => {
    try {
        const posts = await postsService.getLatestPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve posts' });
    }
};

const getPopularPosts = async (req, res) => {
    try {
        const posts = await postsService.getPopularPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve posts' });
    }
};

const searchPosts = async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const posts = await postsService.searchPosts(keyword);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve posts' });
    }
};

const getPostDetails = async (req, res) => {
    const postID = req.query.postID;
    try {
        const post = await postsService.getPostDetails(postID);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Invalid postID' });
    }
};

const createComment = async (req, res) => {
    const { userID, postID, comment, rating } = req.body;
    try {
        const { commentID, createdTime, newAverageRating } = await postsService.createComment(userID, postID, comment, rating);
        res.status(201).json({ commentID, createdTime, newAverageRating});
    } catch (error) {
        res.status(400).json({ error: 'Invalid userID or postID' });
    }
};

module.exports = { createPost, getLatestPosts, getPopularPosts, searchPosts, getPostDetails, createComment };