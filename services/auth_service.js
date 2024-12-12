const express = require('express');
const {Op}  = require('sequelize');
const  { Userdata } = require('../models');

const registerUser = async (username, password,res) => {
    try{
        const body = {
            username: username,
            password: password,
        }

        const userdata = await Userdata.create(body);
        res.status(201).json({
            status: true,
            message:'账号创建成功',
            data: userdata
        })
    }

    catch (error) {
        res.status(500).json({
            status: false,
            message:'账号创建失败',
            data:[error.message]
        })
    }
};

const loginUser = async (username, password,res) => {
    const body = {
        username:username,
        password:password,
    }
    try {
        // 查询数据库
        const userdata = await Userdata.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if (userdata) {
            // 找到匹配的用户
            res.json({status: true, message: 'User found', data: userdata});
        } else {
            // 没有找到匹配的用户
            res.json({status: false, message: 'User not found', data: []});
        }

    }catch (error) {
        res.status(500).json({
            status: false,
            data:[error.message]
        })
    }
};


module.exports = { registerUser, loginUser };