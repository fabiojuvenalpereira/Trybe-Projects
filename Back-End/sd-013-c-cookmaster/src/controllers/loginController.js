const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  try {
    const logged = await loginService.login(req);
    return res.status(logged.status).json(logged.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  login,
};