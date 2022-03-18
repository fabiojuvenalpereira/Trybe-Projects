const userServices = require('../services/user.services');

const findUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    const foundUser = await userServices.findUserByEmail(email);
    return res.status(foundUser.status).json(foundUser.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const findUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await userServices.findUserById(id);
    return res.status(foundUser.status).json(foundUser.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const foundUsers = await userServices.getAllUsers();
    return res.status(foundUsers.status).json(foundUsers.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const createdUser = await userServices.createUser(req);
    return res.status(createdUser.status).json(createdUser.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  findUserById,
  findUserByEmail,
  getAllUsers,
  createUser,
};