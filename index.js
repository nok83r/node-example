var argv = require('yargs')
    .usage('Usage: node $0 --l=[num]')
    .demand(['l'])
    .argv;

var utils = require('./utils');

function operations(l) {
    console.log('Init');
    let numI = utils.increment(l);
    console.log("Increment: " + numI);

    let numD = utils.decrement(l,function(error,num){
        if(error) {
            console.log(error);
        } else {
            console.log("Decrement: " + num);
        }
    });
    
}

operations(argv.l);