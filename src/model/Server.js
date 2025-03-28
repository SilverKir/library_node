const express = require ("express");
const app = express();
const port = process.env.PORT||3000;
const APIrouter = require("../routes/API/BookAPIRouter");
const userAPIRouter = require("../routes/API/UserAPIRouter");
const indexRouter = require("../routes/URL/index");
const URLrouter = require("../routes/URL/BookURLRouter");
module.exports = start = ()=> {

    app.use(express.urlencoded());
    app.set("view engine", "ejs");
    app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    app.use(express.json());
    app.use("/", indexRouter);
    app.use("/api/books", APIrouter);
    app.use("/url/books", URLrouter);

    app.use("/api/user", userAPIRouter);

}
