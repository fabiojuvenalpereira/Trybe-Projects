const Joi = require('joi');

const { ERR } = require('../utils/dictionary'); 

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidation = ({ email, password }) => {
  if (!email || !password) {
    return { status: ERR.status.empty, content: ERR.messages.empty };
  }

  const isValid = schema.validate({ email, password });
  if (isValid.error) return { status: ERR.status.invEntries, content: ERR.messages.invEntries };
};

module.exports = loginValidation;