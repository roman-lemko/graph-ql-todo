const Koa = require("koa");

const app = new Koa();
const port = 5000;

app.use(context => context.body = "It's alive!");

app.listen(port);

console.log("Application started. Listening to port: ", port);