const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const booksRouter = require('./books');

router.use('/auth', authRouter);
router.use('/books', booksRouter);

module.exports = router;
