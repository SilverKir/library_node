const express = require('express');
const router = express.Router();
const bookRouter = require('./BookURLRouter.js');

router.use('/books', bookRouter);

module.exports = router;