const Joi = require('joi'); 

const schema = Joi.object().keys({
    name: Joi.string(), 
    description: Joi.string(), 
    weight: Joi.number(), 
    volume: Joi.number(), 
    brand: Joi.string(), 
    model: Joi.string(),
})

module.exports = schema;