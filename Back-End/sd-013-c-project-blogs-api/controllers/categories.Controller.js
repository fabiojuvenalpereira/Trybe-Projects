const categoryService = require('../services/categories.services');

const createCategory = async (req, res, next) => {
  try {
    const createdCategory = await categoryService.createCategory(req);
    return res.status(createdCategory.status).json(createdCategory.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(categories.status).json(categories.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};