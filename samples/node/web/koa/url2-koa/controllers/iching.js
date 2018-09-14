var iChing = require("i-ching");

var fn_iChing= async (ctx, next) => {
    var name = ctx.params.name;
    var reading = iChing.ask(name);
    var result = reading.hexagram.number + reading.hexagram.character + reading.hexagram.names.join(', ')

    console.log(result);
    console.log(typeof(result));

    ctx.response.body = `<h1>Hello, ${reading.hexagram.number}, ${reading.hexagram.character}, ${reading.hexagram.names.join(', ')}!</h1>`;
};



module.exports = {
    'GET /iching/:name': fn_iChing
};

