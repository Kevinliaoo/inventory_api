require('dotenv').config()

module.exports = {
    PORT: process.env.PORT, 
    DB_USER: process.env.DB_USER,
    DB_PSW: process.env.DB_PSW,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    SECRET: process.env.SECRET,
}