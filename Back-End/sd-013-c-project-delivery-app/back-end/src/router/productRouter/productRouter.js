const express = require('express');
const rescue = require('express-rescue');

const productController = require('../../controllers/productController/product.controller');

const productRouter = express.Router();

productRouter.get('/', rescue(productController.getAllProducts));
productRouter.get('/:id', rescue(productController.getProductsById));
// productRouter.post('/addProduct', rescue(productController.getAllProducts));
// productRouter.put('/updateProduct', rescue(productController.getAllProducts));

module.exports = productRouter;