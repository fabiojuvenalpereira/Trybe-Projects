const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const create = await userService.createUser(req);
    return res.status(create.status).json(create.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllUser = await userService.getAll();
    return res.status(getAllUser.status).json(getAllUser.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getByEmail = async (req, res, next) => {
  try {
    const getUserByEmail = await userService.getByEmail(req);
    return res.status(getUserByEmail.status).json(getUserByEmail.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const getUserByID = await userService.getById(req);
    return res.status(getUserByID.status).json(getUserByID.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createUser,
  getAll,
  getByEmail,
  getById,
};