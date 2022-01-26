const Joi = require('joi');
const { ERR } = require('../utils/dictionary');

const schema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const recipeValidations = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return { status: ERR.status.invEntries, content: { message: ERR.messages.invEntries } };
  }

  const validate = schema.validate({ name, ingredients, preparation });
  if (validate.error) {
    return {
      status: ERR.status.invEntries,
      content: { message: ERR.messages.invEntries },
    };
  }
};

module.exports = {
  recipeValidations,
};