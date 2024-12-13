const express = require('express');
const {Op}  = require('sequelize');
const  { userdata } = require('../models');

const registerUser = async (username, password) => {
        try {


        const body = {
            username: username,
            password: password,
        }
        await userdata.create(body);
        }
        catch (error) {
            console.error(error);
        }
};

const loginUser = async (username, password) => {
    try {


        const body = {
            username: username,
            password: password,
        }

        // 查询数据库
        return await userdata.findOne({
            where: {
                username: username,
                password: password
            }
        })
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { registerUser, loginUser };