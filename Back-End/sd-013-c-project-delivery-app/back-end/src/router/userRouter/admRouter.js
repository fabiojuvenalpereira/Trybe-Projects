const express = require('express');
const rescue = require('express-rescue');
const validateToken = require('../../middlewares/validateToken');

const userController = require('../../controllers/userController/user.controller');

const admRouter = express.Router();

admRouter.post('/manage', validateToken, rescue(userController.createUser));

module.exports = admRouter;