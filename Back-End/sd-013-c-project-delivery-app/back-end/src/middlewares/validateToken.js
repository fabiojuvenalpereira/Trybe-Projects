const jwt = require('jsonwebtoken');
// const fs = require('fs');

// const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const ERROR = require('../utils/Helpers/errorHelper');

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  try {
    // const tokenVerify = jwt.verify(token, SECRET);
    jwt.verify(token, 'secret_key');

    return next();
  } catch (error) {
    console.log(error);

    next(ERROR.errorInvToken);
  }
};

module.exports = validateToken;
