const Koa = require("koa");
const initializeDatabase = require("./db-initializer");
const router = require('./routes');

const port = 5000;

const bootstrap = async () => {
    await initializeDatabase();

    const app = new Koa();

    app.use(router.routes());
    
    app.listen(port, () => console.log("Application started. Listening to port: ", port));
}

bootstrap();