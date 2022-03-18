const loginService = require('../services/login.services');

const Login = async (req, res, next) => {
  try {
    const loginReturn = await loginService.userLogin(req);
    return res.status(loginReturn.status).json(loginReturn.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  Login,
};