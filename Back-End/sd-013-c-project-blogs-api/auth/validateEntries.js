const Joi = require('joi');

const CREATE_SCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const userCreateValidation = (displayName, email, password, image) => {
  const validate = CREATE_SCHEMA.validate({ displayName, email, password, image });
  if (validate.error) {
    return { status: 400, message: validate.error.details[0].message };
  }
};

const loginValidation = (email, password) => {
  const validateLogin = LOGIN_SCHEMA.validate({ email, password });
  if (validateLogin.error) {
    return { status: 400, content: { message: validateLogin.error.details[0].message },
    };
  }
  
  if (!email) return { status: 400, content: { message: '"email" is required' } };
  if (!password) return { status: 400, content: { message: '"password" is required' } };
};

module.exports = {
  userCreateValidation,
  loginValidation,
};