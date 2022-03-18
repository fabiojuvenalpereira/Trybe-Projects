const express = require('express');

const loginController = require('../../controllers/login.Controller');
// const validateToken = require('../../auth/validateToken');

const loginRouter = express.Router();

loginRouter.post('/', loginController.Login);

module.exports = loginRouter;