const jwt = require('jsonwebtoken');

const loginModel = require('../models/loginModel');
const loginValidation = require('../schemas/loginValidation');
const { ERR, OK } = require('../utils/dictionary');

const SECRET = '123456789';

const JWTCONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (req) => {
  const user = req.body;
  
  const validation = await loginValidation(user);
  if (validation) return { status: validation.status, content: { message: validation.content } };
  
  const foundedUser = await loginModel.login(user);
  if (!foundedUser || foundedUser.password !== user.password) {
    return { 
      status: ERR.status.invLogin,
      content: { message: ERR.messages.invLogin },
    };
  }

  const { password: pass, ...userWithoutPassword } = foundedUser;

  const token = jwt.sign({ data: userWithoutPassword }, SECRET, JWTCONFIG);

  return { status: OK.right, content: { token } };
};

module.exports = {
  login,
};