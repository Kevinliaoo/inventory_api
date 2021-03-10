const { DataSource } = require('apollo-datasource');

const product_schema = require('../schemas/products');
const product_model = require('../models/products');
const info_schema = require('../schemas/product_info');
const info_model = require('../models/products_info');

const getToday = require('../utils/getToday');
const errorResponses = require('../utils/errorResponses');

class ProductAPI extends DataSource {
    constructor() {
        super(); 
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAllProducts() {
        try {
            const products = await product_model.findAll();
            const string_res = JSON.stringify(products, null, 2); 
            const results = JSON.parse(string_res).map(async product => {
                return await this._productReducer(product);
            })
            return { error: null, results }; 
        } catch(e) {
            return errorResponses.couldNotGet;
        }
    }

    async getProductById(_id) {
        try {
            const res = await product_model.findAll({ where: { _id: _id } });
            const results = await this._productReducer(res[0].dataValues)
            return { error: null, results };
        } catch(e) {
            return errorResponses.notFound(_id);
        }
    }

    async _productReducer(product) {
        const res = await info_model.findAll({ where: { _id: product._id } }); 
        const info = res[0].dataValues;
        return {
            ...product,
            info,
        }
    }

    async _checkIfExists(_id) {
        const res = await this.getProductById(_id); 
        return res.results ? true : false; 
    }

    async createNewProduct(args) {
        if(await this._checkIfExists(args._id)) return { error: "Product ID already registered", results: null };

        const { error, value } = await product_schema.validate(args); 
        if(error) return errorResponses.invalidDataFormat;

        const now = getToday();
        value.last_updated = now; 
        value.created_at = now; 

        const infoValue = { _id: value._id, name:"", description: "", volume: -1, weight: -1, brand: "", model: "" };

        try {
            await product_model.create(value);
            await info_model.create(infoValue);
            return { error: null, results: value };
        } catch(e) {
            console.log(e)
            return errorResponses.errorCreating;
        }
    }

    async _lastUpdated(_id) {
        const now = getToday(); 
        await product_model.update({ last_updated: now }, { where: { _id: _id } });
    }

    async updatePrice(_id, newPrice) {
        newPrice = newPrice.toFixed(2);
        if(!(await this._checkIfExists(_id))) return errorResponses.notFound(_id);
        try {
            await product_model.update({ price: newPrice }, { where: { _id: _id } });
            await this._lastUpdated(_id);
            const { error, results } = await this.getProductById(_id);
            if(error) return errorResponses.notFound(_id);
            return { error: null, results };
        } catch(e) {
            return errorResponses.couldNotUpdate(_id);
        }
    }

    async changeStock(_id, newStock) {
        if(!(await this._checkIfExists(_id))) return errorResponses.notFound(_id);
        console.log('El producto existe')
        try {
            await product_model.update({ stock: newStock }, { where: { _id: _id } }); 
            await this._lastUpdated(_id);
            const { error, results } = await this.getProductById(_id); 
            if(error) return errorResponses.notFound(_id); 
            return { error: null, results }; 
        } catch(e) {
            return errorResponses.couldNotUpdate(_id);
        }
    }

    async updateProductInfo(_id, info) {
        if(!(await this._checkIfExists(_id))) return errorResponses.notFound(_id);
        const { error, value } = await info_schema.validate(info); 
        if(error) return errorResponses.invalidDataFormat;
        try {
            await info_model.update(value, { where: { _id: _id } });
            await this._lastUpdated(_id);
            const { error, results } = await this.getProductById(_id); 
            if(error) return errorResponses.notFound(_id); 
            return { error: null, results: results.info };
        } catch(e) {
            return errorResponses.couldNotAddInfo(_id);
        }
    }
}

module.exports = ProductAPI;