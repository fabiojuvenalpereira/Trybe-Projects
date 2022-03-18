const express = require('express');

const postController = require('../../controllers/post.controller');
const validateToken = require('../../auth/validateToken');

const postRouter = express.Router();

postRouter.post('/', validateToken, postController.createPost);
postRouter.get('/', validateToken, postController.getAllPosts);

module.exports = postRouter;