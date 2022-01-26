const { ObjectId } = require('mongodb');
const saleModel = require('../models/sales.model');
const updateProductsquantity = require('../utils/updateProductsquantity');
const { validations } = require('../schemas/validationSale');

const status = {
  OK: 200,
  ERR: 422,
  NOTF: 404,
};

const code = { 
  invalid: 'invalid_data',
  nFound: 'not_found',
};

const error = {
  ididOrQtt: 'Wrong product ID or invalid quantity',
  sale: 'Sale not found',
  id: 'Wrong sale ID format',
};

const getAllSales = async () => {
  const getAll = await saleModel.getAllSalesOnDb();
  if (!getAll) {
    return { 
      status: status.ERR,
      content: { err: { code: code.invalid, message: error.idOrQtt } },
    };
  }

  return { status: status.OK, content: { sales: getAll } };
};

const getById = async (saleId) => {
  const { id } = saleId.params;

  const validateId = ObjectId.isValid(id);
  if (!validateId) {
    return { 
      status: status.NOTF,
      content: { err: { code: code.nFound, message: error.sale } },
    };
  }
  
  const sale = await saleModel.getByIdOnDb(ObjectId(id));
  if (!sale) {
    return { 
      status: status.NOTF,
      content: { err: { code: code.nFound, message: error.sale } },
    };
  }

  return { status: status.OK, content: sale };
};

const createSale = async (sale) => {
  const products = sale.body;
  
  const verification = await validations(products);
  if (verification.status) return { status: verification.status, content: verification.content };

  const createdSale = await saleModel.createSaleOnDb(products);

  if (createdSale) {
    await updateProductsquantity.byCreateSale(products);
    return { status: status.OK, content: createdSale };
  }

  return { status: status.ERR, content: { err: { code, message: 'invalid data' } } };
};

const editSale = async (saleId) => {
  const { id } = saleId.params;
  const products = saleId.body;

  if (!ObjectId.isValid(id)) {
    return { 
      status: status.ERR,
      content: { err: { code, message: error.idOrQtt } },
    };
  }

  const verification = await validations(products);
  if (verification.status) return { status: verification.status, content: verification.content };

  const editedSale = await saleModel.editSaleOnDb(ObjectId(id), products);

  return { status: status.OK, content: editedSale };
};

const deleteById = async (saleId) => {
  const { id } = saleId.params;

  if (!ObjectId.isValid(id)) {
    return {
      status: status.ERR,
      content: { err: { code: code.invalid, message: error.id } } };
  }

  const saleExists = await saleModel.getByIdOnDb(ObjectId(id));

  if (!saleExists) {
    return {
      status: status.ERR,
      content: { err: { code: code.invalid, message: error.id } } };
  }

  const deletedSale = await saleModel.deleteByIdOnDb(ObjectId(id));
  if (deletedSale) return { status: status.OK, content: saleExists };

  return { status: status.ERR, content: { err: { code: code.invalid, message: error.id } } };
};

const deleteAll = async () => {
  await saleModel.deleteAllFromDb();
  return { status: status.OK, content: { message: 'all deleted' } };
};

module.exports = {
  getAllSales,
  getById,
  createSale,
  editSale,
  deleteById,
  deleteAll,
};