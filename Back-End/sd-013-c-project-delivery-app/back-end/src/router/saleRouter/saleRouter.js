const express = require('express');
const rescue = require('express-rescue');

const saleController = require('../../controllers/saleController/sale.controller');
const validateToken = require('../../middlewares/validateToken');

const salesRouter = express.Router();

salesRouter.get('/', rescue(saleController.getAllSales));
salesRouter.get('/details/:id', rescue(saleController.getSaleDetailsById));
salesRouter.post('/', validateToken, rescue(saleController.createSale));
salesRouter.put('/', rescue(saleController.updateSales));
salesRouter.delete('/:id', rescue(saleController.deleteSale));

module.exports = salesRouter;
