const Sequelize = require('sequelize'); 

const config = require('./config');

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PSW, {
    host: config.DB_HOST, 
    dialect: 'postgres',
    operatorAliases: false, 

    pool: {
        max: 5, 
        min: 0, 
        acquire: 30000,
        idle: 10000, 
    },

    define: {
        timestamps: false
    },
}); 

module.exports = db;