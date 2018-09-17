import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
// ensure import UserModel before use model('user')
import UserModel from '../../models/User.model'
import { secret } from '../config/index';


const User = mongoose.model('User');

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
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, secret),
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