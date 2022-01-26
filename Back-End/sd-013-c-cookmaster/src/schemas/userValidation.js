const Joi = require('joi');
const { ERR } = require('../utils/dictionary');
// referência de regex retirado do site https://regexr.com/
const emailRegex = /(^\w.*@\w+\.\w)/;

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailRegex).required(),
  password: [Joi.string(), Joi.number()],
});

const userValidations = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    return { status: ERR.status.invEntries, content: ERR.messages.invEntries };
  }

  const verify = schema.validate({ name, email, password });
  if (verify.error) {
    return { status: ERR.status.invEntries, content: ERR.messages.invEntries };
  }
};

module.exports = userValidations;