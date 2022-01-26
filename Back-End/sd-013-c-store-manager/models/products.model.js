const connection = require('./connection');

const getAllProductsOnDb = async () => {
  const conn = await connection();

  const query = await conn
    .collection('products')
    .find({})
    .toArray();

  return query;
};

const getProductByIdOnDb = async (id) => {
  const conn = await connection();

  const product = await conn
    .collection('products')
    .findOne(id);

  return product;
};

const getProductByNameOnDb = async (name) => {
  const conn = await connection();

  const query = await conn
    .collection('products')
    .findOne({ name: `${name}` });

  return query;
};

const createProductOnDb = async ({ name, quantity }) => {
  const conn = await connection();

  const { insertedId } = await conn
    .collection('products')
    .insertOne({ name, quantity });

  return { _id: insertedId, name, quantity };
};

const editProductOnDb = async (id, name, quantity) => {
  const conn = await connection();

  await conn
    .collection('products')
    .updateOne(
      { _id: id },
      { $set: { name, quantity } },
  );
  return { id, name, quantity };
};

const deleteProductsFromDb = async () => {
  const conn = await connection();
  await conn.collection('products').deleteMany({});
};

const deleteProductsByIdFromDb = async (id) => {
  const conn = await connection();
  const productDeleted = await conn
    .collection('products')
    .deleteOne(
      { _id: id },
    );
  return productDeleted;
};

module.exports = {
  getAllProductsOnDb,
  getProductByIdOnDb,
  getProductByNameOnDb,
  createProductOnDb,
  editProductOnDb,
  deleteProductsByIdFromDb,
  deleteProductsFromDb,
};