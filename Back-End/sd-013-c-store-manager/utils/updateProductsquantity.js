const { ObjectId } = require('mongodb');
const productService = require('../services/products.services');

const byCreateSale = async (products) => {
  const result = products.map(async (product) => {
    const { productId, quantity } = product;

    const productExists = await productService.getProductById(ObjectId(productId));
    if (!productExists) return false;

    
  });

  if (result.includes(false)) {
    return { 
      status: 404,
      content: { err: { code: 'Not_found', message: 'Product id not found in data base' } } };
  }

  return {};
};

module.exports = {
  byCreateSale,
};