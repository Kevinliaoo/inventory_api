const jwt = require('jsonwebtoken'); 

function sign(data) {
    return jwt.sign(data, process.env.SECRET);  
}

module.exports = {
    sign
}