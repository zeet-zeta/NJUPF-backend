const postsService = require('../services/posts_service');

const createPost = async (req, res) => {
    const {username ,title ,content , images} = req.body;
    try {
        //TODO
        const postId = await postsService.createPost({ title, author, content, createdAt, images });
        res.status(201).json({ postID : postId , createdTime : Date()});
    } catch (error) {
        res.status(400).json({error: "Invalid userID"});
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

const getHotestPost= async (req, res) => {
    try {
        const posts = await postsService.getLatestPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

const searchPosts= async (req, res) => {
    const keyword = req.quert;
    //TODO
    res.status(200).json();
};

const getDetail =  async (req, res) => {
    const postId = req.quert;
    //TODO
    res.status(200).json();
};

const postComments = async (req, res) => {
    try {
        const {postID , userID , comment , rating} = req.body;
        //TODO
        res.status(200).json({commentID:0,createdTime: Date() , newAverageRating});
    } catch (error) {
        res.status(400).json({ error: "Invalid postID or userID" });
    }
};

module.exports = { createPost, getLatestPosts ,getHotestPost,getDetail,searchPosts,postComments};