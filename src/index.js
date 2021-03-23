const { ApolloServer } = require('apollo-server');

const config = require('./utils/config');
const db = require('./utils/db');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./utils/middleware');

const ProductAPI = require('./datasources/ProductAPI');
const UsersAPI = require('./datasources/UsersAPI');

db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(e => console.error(e));

const server = new ApolloServer({
    typeDefs,
    resolvers, 
    dataSources: () => ({
        productAPI: new ProductAPI(),
        userAPI: new UsersAPI(),
    }), 
    context
})

server.listen(config.PORT).then(() => console.log(`Server listening at port ${config.PORT}`));