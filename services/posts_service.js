const express = require('express');
const {Op}  = require('sequelize');
const  { Post } = require('../models');

const createPost = async (postData,res) => {
    try{
       const body = {
           title: postData.title,
           author: postData.author,
           content: postData.content,
           image: postData.image,
           count_views: 0
       }

        const post = await Post.create(body);

        res.status(201).json({
            status: true,
            message:'帖子发布成功',
            data: post
        })
    }

    catch (error) {
        res.status(500).json({
            status: false,
            message:'帖子发布失败',
            data:[error.message]
        })
    }
};

const getLatestPosts = async (req,res) => {
    try {
        const query = req.query;

        const condition = {
            order:[['id','DESC']],

        };

        const {post} = await Post.findAndCountAll(condition);

        res.json({
            status: true,
            message: "帖子查询成功",
            data: post,
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "帖子查询失败",
            error: [error.message]
        });
    }
};


const getHottestPosts = async (req,res) => {
    try {
        const post = await Post.findOne({
            order: [
                ['count_views', 'DESC']
            ]
        });

        if (post) {
            res.json({
                data:post
            });
        }
        else {
            res.status(404).json({
                message: '没有找到帖子。' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: '查询时发生错误',
            error: error.message });
    }

}

module.exports = { createPost, getLatestPosts };