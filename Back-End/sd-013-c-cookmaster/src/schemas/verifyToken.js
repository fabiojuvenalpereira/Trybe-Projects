const jwt = require('jsonwebtoken');

const SECRET = '123456789';

module.exports = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    console.log(err);
    return { status: err };
  }
};