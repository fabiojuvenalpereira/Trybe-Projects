const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/all', userController.getAll);
userRouter.get('/:id', userController.getById);
// userRouter.get('/email', userController.getByEmail);

userRouter.post('/', userController.createUser);

module.exports = userRouter;