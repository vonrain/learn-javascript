import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
// ensure import UserModel before use model('user')
import UserModel from '../../models/User.model'
import { secret } from '../config/index';


const User = mongoose.model('User');

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