const recipesServices = require('../services/recipesService');

const createRecipe = async (req, res, next) => {
  try {
    const created = await recipesServices.createRecipe(req, res);
    return res.status(created.status).json(created.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const getAll = await recipesServices.getAllRecipes();
    return res.status(getAll.status).json(getAll.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getOneRecipe = async (req, res, next) => {
  try {
    const foundRecipe = await recipesServices.getRecipe(req);
    return res.status(foundRecipe.status).json(foundRecipe.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const editedRecipe = await recipesServices.editRecipe(req, res);
    return res.status(editedRecipe.status).json(editedRecipe.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const excludeRecipe = await recipesServices.deleteRecipe(req);
    return res.status(excludeRecipe.status).json(excludeRecipe.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addImage = async (req, res, next) => {
  try {
    const addedImage = await recipesServices.addImage(req);
    return res.status(addedImage.status).json(addedImage.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};