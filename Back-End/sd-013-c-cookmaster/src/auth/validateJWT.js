const userModel = require('../models/userModel');
const verifyToken = require('../schemas/verifyToken');
const { ERR } = require('../utils/dictionary');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(ERR.status.invLogin).json({ message: ERR.messages.missingTkn });

  const decoded = await verifyToken(token);
  if (decoded.status) {
    return res
      .status(ERR.status.invLogin)
      .json({ message: ERR.messages.jwtError });
  }
  
  const foundUser = await userModel.getByEmailOnDB(decoded.data.email);
  if (!foundUser) return res.status(ERR.status.invLogin).json({ message: ERR.messages.jwtError });
  
  res.locals.user = foundUser;
  next();
};

module.exports = validateToken;