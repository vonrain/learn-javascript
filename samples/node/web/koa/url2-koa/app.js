const connexionString = require('./config/index');
const secret = require('./config/index');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const jwt = require('koa-jwt');

const errorHandle = require('./middlewares/errorHandle');
mongoose.connect(connexionString)
// mongoose promise 风格 [mongoose.Promise = require('bluebird')]
mongoose.Promise = global.Promise

const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(errorHandle);
app.use(jwt({
    secret,
}).unless({
    path:[/\/register/, /\/login/],
}));

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
