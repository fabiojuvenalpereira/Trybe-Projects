const { Product } = require('../../database/models');
const ERROR = require('../../utils/Helpers/errorHelper');

// getAllProducts
const getAllProducts = async () => {
  const products = await Product.findAll({});
  return { status: 200, data: products };
};

// getProductById
const getProductById = async (id) => {
  const foundProduct = await Product.findOne({ where: id });

  if (!foundProduct) throw ERROR.errorInvProductId;

  return { status: 200, data: foundProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
};
