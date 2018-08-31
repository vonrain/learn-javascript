var iChing = require("i-ching");

var fn_iChing= async (ctx, next) => {
    var name = ctx.params.name;
    var reading = iChing.ask(name);
    var result = reading.hexagram.number + reading.hexagram.character + reading.hexagram.names.join(', ')
    console.log(result);
    console.log(iChing.asGraph());

    var names= reading.hexagram.names,
        number= reading.hexagram.number,
        character = reading.hexagram.character,
        cnumber = '' ,
        cnames = '' ,
        ccharacter = '';

    if (reading.change) {
        cnumber = reading.change.to.number ;
        cnames = reading.change.to.names ;
        ccharacter = reading.change.to.character;
    }

    ctx.render('iching.html', {
        name: names,
        number: number,
        character: character,
        cnumber: cnumber ,
        cname: cnames ,
        ccharacter: ccharacter
    });
    //ctx.response.body = `<h1>Hello, ${reading.hexagram.number}, ${reading.hexagram.character}, ${reading.hexagram.names.join(', ')}!</h1>`;
};

module.exports = {
    'GET /iching/:name': fn_iChing
};

