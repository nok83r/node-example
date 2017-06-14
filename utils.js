exports.increment = function(num) {
    return num+1;
}

exports.decrement = function(num, callback) {
    if(num === 0) {
        callback('Error num is 0', null);
    } else {
        callback(null,num-1);
    }
}