const serviceProducts = require('../../services/productService/product.service');

// getAllProducts
const getAllProducts = async (_req, res) => {
  const { status, data } = await serviceProducts.getAllProducts();
  return res.status(status).json(data);
};

// getProductById
const getProductsById = async (req, res, next) => {
  const id = req.params;

  try {
    const { status, data } = await serviceProducts.getProductById(id);

    return res.status(status).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
};
