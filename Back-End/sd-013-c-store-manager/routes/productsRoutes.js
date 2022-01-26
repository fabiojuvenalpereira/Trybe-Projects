const express = require('express');

const controller = require('../controllers/products.controllers');

const userRouter = express.Router();

userRouter.get('/', controller.getProducts);
userRouter.get('/:id', controller.getById);
userRouter.get('/:name', controller.getByName);

userRouter.post('/', controller.createProduct);

userRouter.put('/:id', controller.editProduct);

userRouter.delete('/deleteAll', controller.deleteAll);
userRouter.delete('/:id', controller.deleteById);

module.exports = userRouter;