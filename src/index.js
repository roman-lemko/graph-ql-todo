const Koa = require("koa");
const { ApolloServer, gql } = require('apollo-server-koa');
const initializeDatabase = require("./db.initializer").initialize;

const port = 5000;

const bootstrap = async () => {
    await initializeDatabase();

    const app = new Koa();

    app.use(async context => context.body = "App is running");

    app.listen(port, () => console.log("Application started. Listening to port: ", port));
}

bootstrap();