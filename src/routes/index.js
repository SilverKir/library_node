const express = require('express');

const mainRouter= require('./main.js')
const apiRouter = require('./API');
const urlRouter = require('./URL');
const router = express.Router();

router.use('/', mainRouter);
router.use('/api', apiRouter);
router.use('/url', urlRouter);

module.exports = router;