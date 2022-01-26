const saleService = require('../services/sales.services');

const getAllSales = async (_req, res, next) => {
  try {
    const getSales = await saleService.getAllSales();
    return res.status(getSales.status).json(getSales.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const getSale = await saleService.getById(req);
    return res.status(getSale.status).json(getSale.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createSale = async (req, res, next) => {
  try {
    const sale = await saleService.createSale(req);
    return res.status(sale.status).json(sale.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const editSale = async (req, res, next) => {
  try {
    const editedSale = await saleService.editSale(req);
    res.status(editedSale.status).json(editedSale.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const deletedSale = await saleService.deleteById(req);
    return res.status(deletedSale.status).json(deletedSale.content);
  } catch (err) {
    console.log(err);
    next();
  }
};

const deleteAll = async (_req, res, next) => {
  try {
    const clear = await saleService.deleteAll();
    res.status(clear.status).json(clear.content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  editSale,
  deleteById,
  deleteAll,
};