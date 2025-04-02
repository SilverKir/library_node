const express = require('express');
const bookRouter = require('./BookAPIRouter.js');
const userRouter = require('./UserAPIRouter.js');

const router = express.Router();

router.use('/books', bookRouter);
router.use('/user', userRouter);

module.exports = router;