const Joi = require('joi');

const servicesCategory = require('../services/categories.services');

const SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validateCategories = async (categoryIds) => {
  const { content } = await servicesCategory.getAllCategories();

  const getCateogies = content.map((category) => category.id);
  
  let haveAllCategories = true;

  categoryIds.forEach((testCategory) => { 
     if (!getCateogies.includes(testCategory)) haveAllCategories = false;
  });

  return haveAllCategories;
};

const validatePostCreate = async (title, content, categoryIds) => {
  const validateEntries = SCHEMA.validate({ title, content, categoryIds });
  if (validateEntries.error) {
    return {
      status: 400,
      message: validateEntries.error.details[0].message,
    };
  }

  const validateCategory = await validateCategories(categoryIds);
  if (validateCategory === false) {
    return {
      status: 400,
      message: '"categoryIds" not found',
    };
  }
};

module.exports = validatePostCreate;
