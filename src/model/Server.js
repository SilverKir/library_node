const express = require ("express");
const app = express();
const port = process.env.PORT||3000;
const router = require("../routes/BookRouter");
const userRouter = require("../routes/UserRouter");

module.exports = start = ()=> {
   
    app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    app.use(express.json());
    app.use("/api/books", router);
    app.use("/api/user", userRouter);
  
}
