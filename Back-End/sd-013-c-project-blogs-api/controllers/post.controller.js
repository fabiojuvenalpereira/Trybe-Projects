const postService = require('../services/blogPost.services');

const createPost = async (req, res, next) => {
  try {
    const createdPost = await postService.createPost(req, res);
    return res.status(createdPost.status).json(createdPost.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await postService.getAllPosts();
    return res.status(allPosts.status).json(allPosts.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
};