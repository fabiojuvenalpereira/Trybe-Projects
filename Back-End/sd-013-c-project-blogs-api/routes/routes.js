const express = require('express');

const userRouter = require('./userRoutes/user.routes');
const login = require('./login/login.routes');
const categoriesRouter = require('./categories/categories.routes');
const postRouter = require('./post/post.routes');

const router = express.Router();

router.use('/user', userRouter);
router.use('/login', login);
router.use('/categories', categoriesRouter);
router.use('/post', postRouter);

module.exports = router;
