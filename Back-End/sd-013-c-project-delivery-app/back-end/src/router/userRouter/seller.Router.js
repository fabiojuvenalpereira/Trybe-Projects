const express = require('express');
const rescue = require('express-rescue');

const sellerController = require('../../controllers/sellerController/seller.controller');

const sellerRouter = express.Router();

sellerRouter.get('/', rescue(sellerController.getAllSellers));

module.exports = sellerRouter;
