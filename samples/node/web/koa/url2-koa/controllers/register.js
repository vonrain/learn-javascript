const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User.model');
const config = require('../config');

var fn_register = async (ctx, next) =>{
    const { body } = ctx.request;
    try {
        if (!body.username || !body.password) {
            ctx.status = 400;
            ctx.body = {
                error: `expected an object with username, password but got: ${body}`,
            }
            return;
        }
        body.password = await bcrypt.hash(body.password, 5)
        let user = await User.find({ username: body.username });
        if (!user.length) {
            const newUser = new User(body);
            user = await newUser.save();
            ctx.status = 200;
            ctx.body = {
                message: '注册成功',
                user,
            }
        } else {
            ctx.status = 406;
            ctx.body = {
                message: '用户名已经存在',
            }
        }
    } catch (error) {
        ctx.throw(500)
    }
};

module.exports = {
    'POST /register': fn_register
};
