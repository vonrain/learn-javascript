const mongoose = require('mongoose');

const User = mongoose.model('User');

var fn_users = async (ctx, next) =>{

    /** you can get uers with it
     * curl -X GET http://localhost:3200/api/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
     */
    const users = await User.find()
    ctx.body = {
    	users,
    }
};
module.exports = {
    'GET /users': fn_users
};
