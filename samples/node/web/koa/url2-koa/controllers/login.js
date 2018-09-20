/* ensure import UserModel before use model('user')*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User.model');
const config = require('../config');

var fn_login = async (ctx, next) =>{
    const { body } = ctx.request
    try {
        const user = await User.findOne({ username: body.username });
        if (!user) {
            ctx.status = 401
            ctx.body = {
                message: '用户名错误',
            }
            return;
        }
        // 匹配密码是否相等
        if (await bcrypt.compare(body.password, user.password)) {
            ctx.status = 200
            ctx.body = {
                message: '登录成功',
                user: user.userInfo,
                // 生成 token 返回给客户端
                token: jsonwebtoken.sign({
                    data: user,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + ( 60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, config.secret),
            }
        } else {
            ctx.status = 401
            ctx.body = {
                message: '密码错误',
            }
        }
    } catch (error) {
        ctx.throw(500)
    }
};

module.exports = {
    'POST /login': fn_login
};
