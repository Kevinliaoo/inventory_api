const Joi = require('joi'); 

const schema = Joi.object().keys({
    username: Joi.string().required().pattern(new RegExp('[A-Z]+')), 
    password: Joi.string().required(), 
    repeat_password: Joi.ref('password'),
})

module.exports = schema;