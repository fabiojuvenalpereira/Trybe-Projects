const express = require('express');

const userController = require('../../controllers/user.Controller');
const validateToken = require('../../auth/validateToken');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', validateToken, userController.getAllUsers);
userRouter.get('/:id', validateToken, userController.findUserById);
userRouter.get('/:email', userController.findUserByEmail);

module.exports = userRouter;