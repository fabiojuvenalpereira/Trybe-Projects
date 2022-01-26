const service = require('../services/products.services');

const getProducts = async (_req, res, next) => {
  try {
    const products = await service.getAllProducts();
    return res.status(products.status).json(products.content);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getProduct = await service.getProductById(id);
    return res.status(getProduct.status).json(getProduct.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const getProduct = await service.getProductByName(name);
    return res.status(200).json(getProduct);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  const product = req.body;
  try {
    const productCreated = await service.createNewProduct(product);
    return res.status(productCreated.status).json(productCreated.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const editedProduct = await service.editProductByID(req);
    res.status(editedProduct.status).json(editedProduct.content);
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (_req, res, next) => {
  try {
    const deleted = await service.deleteAllProducts();
    return res.status(200).json(deleted.message);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const deleted = await service.deleteById(req);
    return res.status(deleted.status).json(deleted.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getProducts,
  getById,
  getByName,
  createProduct,
  editProduct,
  deleteById,
  deleteAll,
};
