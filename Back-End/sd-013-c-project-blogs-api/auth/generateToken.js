const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const CONFIG_JWT = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  const token = jwt.sign(data, SECRET, CONFIG_JWT);
  return token;
};

module.exports = generateToken;