const express = require('express');
const multer = require('multer');

const recipesControler = require('../controllers/recipesController');
const validateToken = require('../auth/validateJWT');
const storage = require('../middlewares/storage');

const upload = multer({ storage });

const recipeRouter = express.Router();

recipeRouter.post('/', validateToken, recipesControler.createRecipe);

recipeRouter.get('/', recipesControler.getAllRecipes);
recipeRouter.get('/:id', recipesControler.getOneRecipe);

recipeRouter.put('/:id', validateToken, recipesControler.editRecipe);
recipeRouter.put('/:id/image/', validateToken, upload.single('image'), recipesControler.addImage);

recipeRouter.delete('/:id', validateToken, recipesControler.deleteRecipe);

module.exports = recipeRouter;