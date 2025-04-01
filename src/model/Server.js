const express = require ("express");
const app = express();
const port = process.env.PORT||3000;
const indexRouter = require("../routes/");

module.exports = start = ()=> {
    app.use(express.json());
    app.use(express.urlencoded());
    app.set("view engine", "ejs"); 
    app.use( indexRouter);
    app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    
}
