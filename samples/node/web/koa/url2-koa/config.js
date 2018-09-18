module.exports = {
    'port':process.env.PORT || 3000,
    'connexionString': 'mongodb://localhost:27017/koa-rest', //暂未用到，用于后期token验证
    'baseApi': 'api',
    'secret': 'jwt_secret'
};

