import Joi from 'joi';

const minLengthName = 12;
const minLengthPassword = 6;

const schema = Joi.object({
  userName: Joi.string().min(minLengthName).required(),
  userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
  userPassword: Joi.string().min(minLengthPassword).required(),
});

const validateEntries = (userEmail, userPassword, userName = 'thisisamockname') => {
  const validateUserData = schema.validate({ userName, userEmail, userPassword });
  return validateUserData;
};

export default validateEntries;
