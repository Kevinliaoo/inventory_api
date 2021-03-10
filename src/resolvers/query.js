const paginateResult = require('../utils/paginateResult');

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
    }
}

module.exports = Query; 