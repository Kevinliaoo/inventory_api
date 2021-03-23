const Sequelize = require('sequelize'); 

const db = require('../utils/db');

const Products = db.define('users', {
    uid: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        
    },
    username: {
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false, 
    }, 
    password: {
        type: Sequelize.STRING, 
        allowNull: false,
    }, 
    is_admin: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Products;