const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        _id: String!
        price: Float!
        stock: Int 
        last_updated: String 
        created_at: String
        info: ProductInfo
    }

    type ProductInfo {
        _id: String!
        name: String
        description: String 
        volume: Float
        weight: Float
        brand: String 
        model: String
    }

    input ProductInput {
        _id: String! 
        price: Float! 
        stock: Int!
    }

    input ProductInfoInput {
        name: String 
        description: String 
        volume: Float
        weight: Float 
        brand: String 
        model: String
    }

    type Query {
        "Get a paginated list of Products"
        getProducts(batchSize: Int, after: Int): [Product]
        "Get product by ID" 
        getProduct(_id: String!): Product
    }

    type Mutation {
        "Create a new Product"
        createProduct(inputData: ProductInput!): Product
        "Updates a Product's information to information database"
        updateProductInfo(_id: String!, inputData: ProductInfoInput): ProductInfo
        "Change the price of a single Product to the specified price"
        changePrice(_id: String!, newPrice: Float!): Product
        "Change the price by adding or substracting a percentage of current price"
        changePricePercentage(_id: String!, percentage: Int!): Product
        "Change the stock ammount of a Product"
        changeStock(_id: String!, newStock: Int!): Product
        "Add stock"
        addStock(_id: String!, toAdd: Int!): Product, 
        "Diminish stock"
        removeStock(_id: String!, toRemove: Int!): Product
    }
`;

module.exports = typeDefs;