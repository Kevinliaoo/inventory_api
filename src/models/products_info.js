const Sequelize = require('sequelize'); 

const db = require('../utils/db');

const Products = db.define('products_infos', {
    _id: {
        type: Sequelize.STRING, 
        primaryKey: true,
    }, 
    name: { 
        type: Sequelize.STRING, 
    }, 
    model: {
        type: Sequelize.STRING, 
    }, 
    brand: {
        type: Sequelize.STRING, 
    }, 
    weight: {
        type: Sequelize.FLOAT, 
    }, 
    volume: {
        type: Sequelize.FLOAT,
    },
    description: {
        type: Sequelize.STRING, 
    }, 
})

module.exports = Products;