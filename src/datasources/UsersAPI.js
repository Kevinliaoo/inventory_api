const { DataSource } = require('apollo-datasource');

const schema = require('../schemas/users');
const model = require('../models/users');

const errorResponses = require('../utils/errorResponses');
const { comparePasswords, encryptPassword } = require('../utils/bcrypt_utils');

class ProductAPI extends DataSource {
    constructor() {
        super(); 
    }

    initialize(config) {
        this.context = config.context;
    }

    async _checkIfExists(_id) {
        _id = _id.trim().toUpperCase();
        const res = await this.getUserByUsername(_id); 
        return res.results ? true : false; 
    }

    async getUserByUsername(username) {
        username = username.trim().toUpperCase();
        try {
            const res = await model.findAll({ where: { username: username } });
            return { error: null, results: res[0].dataValues };
        } catch(e) {
            return errorResponses.userNotFound(username);
        }
    }

    async getUserById(_id) {
        try {
            const res = await model.findAll({ where: { uid: _id } }); 
            return { error: null, results: res[0].dataValues }
        } catch(e) {
            return errorResponses.userNotFound(_id);
        }
    }

    async getAdmins() {
        try {
            let res = await model.findAll({ where: { is_admin: 1 } }); 
            res = JSON.stringify(res);
            return { error: null, results: JSON.parse(res) }
        } catch(e) {
            return errorResponses.errorAdmins;
        }
    }

    async getAllUsers() {
        try {
            let res = await model.findAll(); 
            res = JSON.stringify(res);
            return { error: null, results: JSON.parse(res) }
        } catch(e) {
            return errorResponses.usersNotFound; 
        }
    }

    async createNewUser(userInfo) {
        userInfo.username = userInfo.username.trim().toUpperCase();
        if(await this._checkIfExists(userInfo.username)) {
            return errorResponses.userAlreadyExists(userInfo.username)
        };
        const { error, value } = await schema.validate(userInfo); 
        if(error) return errorResponses.invalidDataFormat;

        try {
            delete value.repeat_password; 
            const encrypted = await encryptPassword(value.password);
            value.password = encrypted; 
            value.is_admin = 0;
            await model.create(value);
            return { error: null, results: { username: value.username }};
        } catch(e) {
            return errorResponses.errorCreating;
        }
    }
    
    async login(username, password) {
        const { error, results } = await this.getUserByUsername(username); 
        if(error) return errorResponses.userNotFound(username);
        const res = await comparePasswords(password, results.password);
        if(!res) return errorResponses.incorrectPassword; 
        delete results.password; 
        return { error: null, results };
    }
}

module.exports = ProductAPI;