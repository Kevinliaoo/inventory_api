const jwt = require('jsonwebtoken'); 
const { SECRET } = require('./config');

function sign(data) {
    return jwt.sign(data, SECRET);  
}

function verify(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    sign, 
    verify
}