const error = require('../utils/errors');

const Mutation = {
    createProduct: async (_, { inputData }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.productAPI.createNewProduct(inputData);
        if(error) throw error; 
        return results;
    }, 
    updateProductInfo: async (_, { _id, inputData }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.productAPI.updateProductInfo(_id, inputData);
        if(error) throw error;
        return results
    },
    changePrice: async (_, { _id, newPrice }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.productAPI.updatePrice(_id, newPrice);
        if(error) throw error; 
        return results;
    }, 
    changePricePercentage: async (_, { _id, percentage }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.productAPI.getProductById(_id); 
        if(error) throw error; 
        const newPrice = results.price * (1 + percentage / 100);
        const updated = await dataSources.productAPI.updatePrice(_id, newPrice); 
        if(updated.error) throw updated.error; 
        return updated.results;
    },
    changeAllPricesPercentage: async (_, { ids, percentage }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
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
    changeStock: async (_, { _id, newStock }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results;
    }, 
    addStock: async (_, { _id, toAdd }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const product = await dataSources.productAPI.getProductById(_id); 
        if(product.error) throw error; 
        const newStock = product.results.stock + toAdd; 
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results; 
    }, 
    removeStock: async (_, { _id, toRemove }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const product = await dataSources.productAPI.getProductById(_id); 
        if(product.error) throw error; 
        const newStock = product.results.stock - toRemove; 
        const { error, results } = await dataSources.productAPI.changeStock(_id, newStock); 
        if(error) throw error; 
        return results; 
    },

    createUser: async (_, { userInfo }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser;
        const { error, results } = await dataSources.userAPI.createNewUser(userInfo);
        if(error) throw error; 
        return results.username;
    },

    makeAdmin: async (_, { uid }, { dataSources, authorization }) => {
        if(authorization !== 1) throw error.notAdminUser; 
        const { error, results } = await dataSources.userAPI.makeAdmin(uid); 
        if(error) throw error; 
        return results;
    },

    removeAdmin: async (_, __, { dataSources, authorization, loggedUser }) => {
        if(authorization !==1) return true;  
        const { error, results } = await dataSources.userAPI.removeAdmin(loggedUser.uid);
        if(error) throw error; 
        console.log('Estoy teniendo el resultado, ', results)
        return results;
    }
}

module.exports = Mutation;