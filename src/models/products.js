const Sequelize = require('sequelize'); 

const db = require('../utils/db');

const Products = db.define('products', {
    _id: {
        type: Sequelize.STRING, 
        primaryKey: true,
    }, 
    price: {
        type: Sequelize.FLOAT, 
    }, 
    stock: {
        type: Sequelize.INTEGER,
    }, 
    created_at: {
        type: Sequelize.STRING,
    }, 
    last_updated: {
        type: Sequelize.STRING,
    },
})

module.exports = Products;