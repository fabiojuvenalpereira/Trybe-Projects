const { BlogPost, User, Category } = require('../models');

const validatePostCreate = require('../utils/validatePostCreate');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = res.locals;

  const validatePost = await validatePostCreate(title, content, categoryIds);
  if (validatePost) {
    return { 
      status: validatePost.status,
      content: { message: validatePost.message },
    };
  }
  
  const createdPost = await BlogPost.create({ userId, title, content });
  
  return { 
    status: 201,
    content: createdPost,
  };
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { 
    status: 200,
    content: allPosts,
  };
};

module.exports = {
  createPost,
  getAllPosts,
};
