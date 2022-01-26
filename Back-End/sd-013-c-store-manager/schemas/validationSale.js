const { ObjectId } = require('mongodb');

const status = 422;
const code = 'invalid_data';
const error = 'Wrong product ID or invalid quantity';

const validateId = (id) => !ObjectId.isValid(id);
const validateQuantity = (quantity, min) => quantity < min;
const typeQuantity = (quantity) => typeof quantity === 'string';

const validations = async (products) => {
  const productValidated = products.map((product) => {
    const { productId, quantity } = product;
      switch (true) {
      case validateId(productId): return false;
      case validateQuantity(quantity, 1): return false;
      case typeQuantity(quantity): return false;
      default: return product;
    }
  });

  if (productValidated.includes(false)) {
    return {
      status,
      content: { err: { code, message: error } },
    };
  }

  return productValidated;
};

module.exports = {
  validations,
};
