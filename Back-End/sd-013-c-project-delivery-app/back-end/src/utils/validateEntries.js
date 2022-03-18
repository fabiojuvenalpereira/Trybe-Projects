const Joi = require('joi');

const SCHEMAUSER = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const SCHEMASALE = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().max(100).required(),
  deliveryNumber: Joi.string().max(50).required(),
  status: Joi.string().max(50).required(),
});

const validateEntriesCreateNewUser = ({ name, email, role, password }) => {
  const userValidate = SCHEMAUSER.validate({ name, email, role, password });
  return userValidate;
};

const validateEntriesCreateSale = ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status,
}) => {
  const validateSale = SCHEMASALE.validate({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  });
  return validateSale;
};

module.exports = {
  validateEntriesCreateNewUser,
  validateEntriesCreateSale,
};