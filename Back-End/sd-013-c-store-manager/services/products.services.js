const { ObjectId } = require('mongodb');
const model = require('../models/products.model');
const { validations } = require('../schemas/validationProduct');

const getAllProducts = async () => {
  const products = await model.getAllProductsOnDb();
  return { status: 200, content: { products } };
};

const getProductById = async (id) => {
  const status = 422;
  const code = 'invalid_data';
  const message = 'Wrong id format';
  
  if (!ObjectId.isValid(id)) return { status, content: { err: { code, message } } };
  
  const productExists = await model.getProductByIdOnDb(ObjectId(id));
  if (!productExists) return { status, content: { err: { code, message: 'product not found' } } };

  const getProduct = await model.getProductByIdOnDb(ObjectId(id));

  return ({ status: 200, content: getProduct });
};

const getProductByName = async (name) => {
  const getProduct = await model.getProductByNameOnDb(name);
  return getProduct;
};

const createNewProduct = async (product) => {
  const { name, quantity } = product;
  const status = 422;
  const code = 'invalid_data';
  const message = 'Product already exists';

  const productExists = await model.getProductByNameOnDb(name);
  if (productExists) return { status, content: { err: { code, message } } };

  const verification = validations(name, quantity);
  if (verification.status) {
    return { status: verification.status, content: { err: verification.err } };
  }

  const createdProduct = await model.createProductOnDb(product);
  return { status: 201, content: createdProduct };
};

const editProductByID = async (product) => {
  const { id } = product.params;
  const { name, quantity } = product.body;

  const newId = ObjectId(id);

  const status = 422;
  const code = 'invalid_data';
  const message = 'product not found';

  if (!ObjectId.isValid(id)) return { status, content: { err: { code, message: 'invalid id' } } };

  const verification = validations(name, quantity);
  if (verification.status) {
    return { status: verification.status, content: { err: verification.err } };
  }

  const productExists = await model.getProductByIdOnDb(newId);
  if (productExists) {
    const editedProduct = await model.editProductOnDb(newId, name, quantity);
    return { status: 200, content: editedProduct };
  }

  return { status, content: { err: { code, message } } };  
};

const deleteAllProducts = async () => {
  await model.deleteProductsFromDb();
  return { message: 'all deleted' };
};

const deleteById = async (product) => {
  const { id } = product.params;

  const status = 422;
  const code = 'invalid_data';
  const message = 'Wrong id format';

  if (!ObjectId.isValid(id)) return { status, content: { err: { code, message } } };

  const productExists = await model.getProductByIdOnDb(ObjectId(id));
  if (!productExists) return { status, content: { err: { code, message: 'product not found' } } };
  
  await model.deleteProductsByIdFromDb(ObjectId(id));
  return { status: 200, content: productExists };
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createNewProduct,
  editProductByID,
  deleteAllProducts,
  deleteById,
};