const express = require ("express");
const mongoose = require("mongoose");
const app = express();
const indexRouter = require("./routes");

module.exports = start = async (port, dbUrl)=> {
    app.use(express.json());
    app.use(express.urlencoded());
    app.set("view engine", "ejs"); 
    app.use( indexRouter);
    try {
        await mongoose.connect(dbUrl);
        app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error);
    } 
    
}
