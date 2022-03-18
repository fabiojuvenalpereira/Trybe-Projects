const { Category } = require('../models');
const validateCategoryEntries = require('../utils/validateCategoryEntries');

const createCategory = async (req) => {
  const category = req.body.name;

  const validate = await validateCategoryEntries(category);
  if (validate) return { status: validate.status, content: { message: validate.message } };

  const created = await Category.create({ name: category });

  return { status: 201, content: created };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return { status: 200, content: categories };
};

const findCategory = async (id) => {
  const foundCategory = await Category.findOne({ where: id });
  return { status: 200, content: foundCategory };
};

module.exports = {
  createCategory,
  getAllCategories,
  findCategory,
};