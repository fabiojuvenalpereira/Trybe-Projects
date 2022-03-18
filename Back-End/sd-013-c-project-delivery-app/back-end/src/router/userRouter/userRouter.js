const express = require('express');
const rescue = require('express-rescue');

const userController = require('../../controllers/userController/user.controller');

const userRouter = express.Router();

userRouter.get('/', rescue(userController.getAllUser));

userRouter.post('/register', rescue(userController.createUser));
userRouter.post('/login', rescue(userController.userLogin));

module.exports = userRouter;