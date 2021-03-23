const errorResponses = require("../utils/errorResponses");

const Mutation = {
    createProduct: async (_, { inputData }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.createNewProduct(inputData);
        if(error) throw error; 
        return results;
    }, 
    updateProductInfo: async (_, { _id, inputData }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.updateProductInfo(_id, inputData);
        if(error) throw error;
        return results
    },
    changePrice: async (_, { _id, newPrice }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.updatePrice(_id, newPrice);
        if(error) throw error; 
        return results;
    }, 
    changePricePercentage: async (_, { _id, percentage }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.getProductById(_id); 
        if(error) throw error; 
        const newPrice = results.price * (1 + percentage / 100);
        const updated = await dataSources.productAPI.updatePrice(_id, newPrice); 
        if(updated.error) throw updated.error; 
        return updated.results;
    },
    changeAllPricesPercentage: async (_, { ids, percentage }, { dataSources }) => {
        let products = []; 
        try {
            !ids || ids.length === 0
                ? products = dataSources.productAPI.getAllProducts() 
                : products = dataSources.productAPI.getProductsByIds(ids)
        } catch(e) {
            throw e; 
        }
        // products is a Promise containing a list of Promises
        return (await products).results.map(async promise => {
            const product = await promise; 
            if(product) {
                const { results } = await dataSources.productAPI.updatePrice(
                    product._id, 
                    product.price * (1 + percentage / 100)
                );
                if(results) return results
            }
        })
    },
    changeStock: async (_, { _id, newStock }, { dataSources }) => {
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results;
    }, 
    addStock: async (_, { _id, toAdd }, { dataSources }) => {
        const product = await dataSources.productAPI.getProductById(_id); 
        if(product.error) throw error; 
        const newStock = product.results.stock + toAdd; 
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results; 
    }, 
    removeStock: async (_, { _id, toRemove }, { dataSources }) => {
        const product = await dataSources.productAPI.getProductById(_id); 
        if(product.error) throw error; 
        const newStock = product.results.stock - toRemove; 
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results; 
    },

    createUser: async (_, { userInfo }, { dataSources }) => {
        const { error, results } = await dataSources.userAPI.createNewUser(userInfo);
        if(error) throw error; 
        return results;
    }
}

module.exports = Mutation;