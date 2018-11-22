const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const schema = require("./graphql/graphql-schema");
const resolvers = require('./graphql/graphql-resolvers');
const mutations = require('./graphql/graphql-mutations');

const router = new Router();

router.all('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: { ...resolvers, ...mutations },
    graphiql: true
}));

module.exports = router;