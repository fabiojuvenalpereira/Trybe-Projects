const jwt = require('jsonwebtoken');

const CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign(data, 'secret_key', CONFIG);
module.exports = generateToken;
