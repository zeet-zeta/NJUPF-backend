const express = require('express');
const {Op}  = require('sequelize');
const  { views } = require('../models')
const { post } = require('../models');

const makeComments = async (commentsdata) => {
    try {
        const body = {
            author: commentsdata.author,
            content: commentsdata.content,
            point: commentsdata.point,
            postId: commentsdata.postId,
        }
        // 创建评论
        const newComment = await views.create(body);
        const posts = await Post.findByPk(postId);
        if (posts) {
            posts.count += 1;
            await posts.save();
        }
    }
    catch (error) {
    console.log(error);}
}

module.exports = { makeComments };