const { join } = require('path');

const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const { recipeValidations } = require('../schemas/recipesValidation');
const { OK, ERR } = require('../utils/dictionary');

const createRecipe = async (req, res) => {
  const recipe = req.body;
  const { user } = res.locals;
  const { _id: userId } = user;
  
  const recWithUser = { ...recipe, userId };

  const validateRecipe = await recipeValidations(recipe);
  if (validateRecipe) return { status: validateRecipe.status, content: validateRecipe.content };

  const createdRecipe = await recipesModel.createRecipeOnDb(recWithUser);

  return { status: OK.created, content: { recipe: createdRecipe } };
};

const getAllRecipes = async () => {
  const allItens = await recipesModel.getAllRecipesFromDb();
  return { status: OK.right, content: allItens };
};

const getRecipe = async (req) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) { 
    return { 
      status: ERR.status.notFound,
      content: { message: ERR.messages.recNotFound },
    };
  }

  const allItens = await recipesModel.getRecipeFromDb(ObjectId(id));

  return { status: OK.right, content: allItens };
};

const errorMessage = {
  status: ERR.status.notFound,
  content: { message: ERR.messages.unauthorized },
};

const editRecipe = async (req, _res) => {
  const { id } = req.params;
  const recipe = req.body;
  // const { user } = res.locals;
  // const { _id: userIdTkn } = user;

  if (!id || !ObjectId.isValid(id)) return errorMessage;
  
  const validateRecipe = await recipeValidations(recipe);
  if (validateRecipe) return errorMessage;

  // const getRecipeToEdit = await recipesModel.getRecipeFromDb(ObjectId(id));
  // if (getRecipeToEdit.userId === userIdTkn) return errorMessage;

  const edited = await recipesModel.editRecipeOnDb(recipe, ObjectId(id));
  return { status: OK.right, content: edited };
};

  const deleteRecipe = async (req) => {
    const { id } = req.params;
    
    if (!id || !ObjectId.isValid(id)) return errorMessage;
    
    await recipesModel.excludeRecipeOnDb(ObjectId(id));
    return { status: OK.done };
  };

  const addImage = async (req) => {
    const { id } = req.params;
    const { filename } = req.file;
    
    const imagePath = join('localhost:3000', 'src', 'uploads', filename);

    const AddedImageUrl = await recipesModel.editRecipeAddUrlOnDb(imagePath, ObjectId(id));
    return { status: OK.right, content: AddedImageUrl };
  };

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};