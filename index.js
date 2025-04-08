const start = require ("./src/Server.js");
const PORT = process.env.PORT||3000;
const DB_URL = process.env.DB_URL;

start(PORT, DB_URL);