const express = require('express');

const saleController = require('../controllers/sales.controllers');

const userRouter = express.Router();

userRouter.get('/', saleController.getAllSales);
userRouter.get('/:id', saleController.getSaleById);

userRouter.post('/', saleController.createSale);

userRouter.put('/:id', saleController.editSale);

userRouter.delete('/deleteAll', saleController.deleteAll);
userRouter.delete('/:id', saleController.deleteById);

module.exports = userRouter;