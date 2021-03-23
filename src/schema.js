const { gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        _id: String!
        price: Float!
        stock: Int 
        created_at: String
        last_updated: String 
        user_updated: String
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

    type User {
        uid: Int!
        username: String! 
        is_admin: Boolean!
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

    input CreateUserInput {
        username: String!
        password: String!
        repeat_password: String!
    }

    type Query {
        "Get a paginated list of Products"
        getProducts("Result size" batchSize: Int, "Cursor where to start returning from list" after: Int): [Product]
        "Get product by ID" 
        getProduct(_id: String!): Product
        "Get multiple products by ID" 
        getProductsByIds(ids: [String]): [Product]
        "Get all Products created at a specific date"
        getByCreationDate(day: Int!, month: Int!, year: Int!): [Product]
        "Get all products within a price range, both min and max values are by default set to 0"
        getByPriceRange(min: Float, max: Float): [Product]
        "Get a list of all Users"
        getAllUsers(batchSize: Int, after: Int): [User]
        "Get a list of all admin Users"
        getAllAdminUsers: [User]
        "Get User by ID" 
        getUserById(_id: Int!): User
        "Get User by username"
        getUserByUsername(username: String!): User
        "Authenticate a User with username and password"
        login(username: String!, password: String!): String
    }

    type Mutation {
        "Create a new Product"
        createProduct(inputData: ProductInput!): Product
        "Updates a Product's information to information database"
        updateProductInfo(_id: String!, inputData: ProductInfoInput): ProductInfo
        "Change the price of a single Product to the specified price"
        changePrice(_id: String!, "New price to set" newPrice: Float!): Product
        "Change the price by adding or substracting a percentage of current price"
        changePricePercentage(_id: String!, "Percentage to increase or decrease, can be positive or negative" percentage: Int!): Product
        "Change all Product's prices by adding or substracting a percentage of current price"
        changeAllPricesPercentage(ids: [String], percentage: Int!): [Product]
        "Change the stock ammount of a Product"
        changeStock(_id: String!, "New inventory ammount to set" newStock: Int!): Product
        "Add stock"
        addStock(_id: String!, "Units to add" toAdd: Int!): Product, 
        "Diminish stock"
        removeStock(_id: String!, "Units to remove" toRemove: Int!): Product
        "Create a new user"
        createUser(userInfo: CreateUserInput!): User
    }
`;

module.exports = typeDefs;