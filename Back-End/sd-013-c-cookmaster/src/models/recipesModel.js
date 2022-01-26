const connection = require('./connection');

const createRecipeOnDb = async (recipe) => {
  const conn = await connection();
  const query = await conn.collection('recipes').insertOne(recipe);
  return query.ops[0];
};

const getAllRecipesFromDb = async () => {
  const conn = await connection();
  const query = await conn.collection('recipes').find({}).toArray();
  return query;
};

const getRecipeFromDb = async (id) => {
  const conn = await connection();
  const query = await conn.collection('recipes').findOne({ _id: id });
  return query;
};

const editRecipeOnDb = async (recipe, id) => {
  const { name, ingredients, preparation } = recipe;
  const conn = await connection();
  const { value } = await conn.collection('recipes').findOneAndUpdate(
        { _id: id },
        { $set: { name, ingredients, preparation } },
    );
  const toReturn = { _id: id, name, ingredients, preparation, userId: value.userId };

  return toReturn;
};

const excludeRecipeOnDb = async (id) => {
  const conn = await connection();
  const exclude = await conn.collection('recipes').deleteOne({ _id: id });
  return exclude;
};

const editRecipeAddUrlOnDb = async (imagePath, id) => {
  const conn = await connection();
  const query = await conn.collection('recipes').findOneAndUpdate(
    { _id: id },
    { $set: { image: imagePath } },
    { returnOriginal: false },
  );
  return query.value;
};

module.exports = {
  createRecipeOnDb,
  getAllRecipesFromDb,
  getRecipeFromDb,
  editRecipeOnDb,
  excludeRecipeOnDb,
  editRecipeAddUrlOnDb,
};