const Joi = require('joi'); 

const schema = Joi.object().keys({
    _id: Joi.string().required(), 
    price: Joi.number(), 
    stock: Joi.number(), 
})

module.exports = schema;