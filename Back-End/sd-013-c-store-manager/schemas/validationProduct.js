const errors = {
  exists: 'Product already exists',
  minQuantity: '"quantity" must be larger than or equal to 1',
  nameBlank: '"name" length must be at least 5 characters long',
  notNumber: '"quantity" must be a number',
};

const status = 422;
const code = 'invalid_data';

const blank = (value) => (!value);
const isNotNumber = (value) => (typeof value !== 'number');
const quantityMinimal = (value) => (value < 1);
const minLenght = (value, min) => (value.length < min);

const validations = (name, quantity) => {
  switch (true) {
    case blank(name): return { status, err: { code, message: errors.nameBlank } };
    case minLenght(name, 5): return { status, err: { code, message: errors.nameBlank } };
    case quantityMinimal(quantity): return { status, err: { code, message: errors.minQuantity } };
    case isNotNumber(quantity): return { status, err: { code, message: errors.notNumber } };
    default: return {};
  }
};

module.exports = {
  validations,
};