const express = require('express');
const {Op}  = require('sequelize');
const  { post } = require('../models');
const { views } = require('../models');

const createPost = async (postData) => {
        try {


            const body = {
                title: postData.title,
                author: postData.author,
                content: postData.content,
                image: postData.image,
                count_views: 0
            }

            await post.create(body);
        }
        catch (error) {
            console.error(error);
        }
};

const getLatestPosts = async (req) => {
        try {

            const query = req.query;

            const condition = {
                order: [['id', 'DESC']],

            };
            const posts = await post.findAndCountAll(condition);
            return posts;
        }
        catch (error) {
            console.error(error);
        }
};


const getHottestPosts = async () => {
    try {
        const postdata = await post.findOne({
            order: [
                ['count_views', 'DESC']
            ]
        });
        return postdata;
    }
    catch (error) {
        console.error(error);
    }
}

const FuzzySearch = async (req) => {
try {

    const query = req.query;

    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;

    const offset = (currentPage - 1) * pageSize;

    const condition = {
        order: [['id', 'ASC']],
        limit: pageSize,
        offset: offset
    };

    if (query.title) {
        condition.where = {
            title: {
                [Op.like]: `%${query.title}%`
            }
        }
    }
    return {count, rows} = await post.findAndCountAll(condition);
}
catch (error) {
    console.error(error);
}

};

const ReviewPost = async (postId) => {
    try {

        const postData = await post.findOne({
            where: {id: postId},
            include: [{
                model: views,
                as: 'comments'
            }]
        });
        return postData;
    }
    catch (error) {
        console.error(error);
    }
};





module.exports = { createPost, getLatestPosts, getHottestPosts, FuzzySearch, ReviewPost };