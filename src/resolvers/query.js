const paginateResult = require('../utils/paginateResult');
const auth = require('../utils/auth');

const Query = {
    getProducts: async (_, { batchSize = 10, after }, { dataSources }) => {
        // A esta funcion le puedo agregar pagination 
        const { error, results } = await dataSources.productAPI.getAllProducts(); 
        if(error) throw error; 
        const products = paginateResult({
            after, batchSize, results
        })
        return products;
    },
    getProduct: async (_, { _id }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.getProductById(_id); 
        if(error) throw error; 
        return results
    },
    getProductsByIds: async (_, { ids }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.getProductsByIds(ids); 
        if(error) throw error; 
        return results;
    },
    getByCreationDate: async (_, { day, month, year }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.getProductByCreationDate(day, month, year); 
        if(error) throw error; 
        return results;
    },
    getByPriceRange: async (_, { min, max }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.getByPriceRange(min, max); 
        if(error) throw error; 
        return results;
    },

    login: async (_, { username, password }, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.login(username, password);
        if(error) throw error; 
        return auth.sign(results);
    }, 

    getUserByUsername: async (_, { username }, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.getUserByUsername(username); 
        if(error) throw error; 
        return results;
    },

    getUserById: async (_, { _id }, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.getUserById(_id); 
        if(error) throw error; 
        return results;
    }, 

    getAllAdminUsers: async (_, __, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.getAdmins(); 
        if(error) throw error; 
        return results; 
    },

    getAllUsers: async (_, { batchSize = 10, after }, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.getAllUsers(); 
        if(error) throw error; 
        const products = paginateResult({
            after, batchSize, results
        })
        return products;
    }
}

module.exports = Query; 