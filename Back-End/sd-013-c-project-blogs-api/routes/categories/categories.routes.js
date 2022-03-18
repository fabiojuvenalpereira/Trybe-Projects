const express = require('express');

const categoryController = require('../../controllers/categories.Controller');
const validateToken = require('../../auth/validateToken');

const categoryRoutes = express.Router();

categoryRoutes.post('/', validateToken, categoryController.createCategory);
categoryRoutes.get('/', validateToken, categoryController.getAllCategories);

module.exports = categoryRoutes;