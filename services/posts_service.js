const express = require('express');
const {Op}  = require('sequelize');
const  { Post } = require('../models');

const createPost = async (postData) => {

       const body = {
           title: postData.title,
           author: postData.author,
           content: postData.content,
           image: postData.image,
           count_views: 0
       }

        await Post.create(body);
};

const getLatestPosts = async (req) => {
        const query = req.query;

        const condition = {
            order:[['id','DESC']],

        };
        return await Post.findAndCountAll(condition);
};


const getHottestPosts = async () => {
        return await Post.findOne({
            order: [
                ['count_views', 'DESC']
            ]
        });
}

const FuzzySearch = async (req) => {

        const query = req.query;

        const currentPage = Math.abs(Number(query.currentPage)) || 1;
        const pageSize = Math.abs(Number(query.pageSize)) || 10;

        const offset = (currentPage - 1) * pageSize;

        const condition = {
            order:[['id','ASC']],
            limit:pageSize,
            offset:offset
        };

        if (query.title){
            condition.where = {
                title:{
                    [Op.like]: `%${query.title}%`
                }
            }
        }
        return {count, rows} = await Post.findAndCountAll(condition);

};

const ReviewPost = async (id) => {
    return await Post.findByPk(id);
};





module.exports = { createPost, getLatestPosts, getHottestPosts, FuzzySearch, ReviewPost };