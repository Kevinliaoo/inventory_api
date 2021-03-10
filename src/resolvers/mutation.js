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
    }
}

module.exports = Mutation;