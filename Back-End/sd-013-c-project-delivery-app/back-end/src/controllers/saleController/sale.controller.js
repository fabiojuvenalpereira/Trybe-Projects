const serviceSale = require('../../services/saleService/sale.service');

// CreateSale
const createSale = async (req, res, next) => {
  const { sale, products } = req.body;

  try {
    const createdSale = await serviceSale.createSale(sale, products);
    res.status(createdSale.status).json(createdSale.content);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// getAllSales
const getAllSales = async (_req, res, next) => {
  try {
    const foundSales = await serviceSale.getAllSales();
    res.status(foundSales.status).json(foundSales.content);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// updateSales
const updateSales = async (req, res, next) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status } = req.body;

  const saleObject = { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status };

  try {
    const updatedSale = await serviceSale.createSale(saleObject);
    res.status(updatedSale.status).json(updatedSale.content);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// deleletSale
const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedSale = await serviceSale.deleteSale(id);
    res.status(deletedSale.status).json(deletedSale.content);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// saleDetails
const getSaleDetailsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await serviceSale.getSaleDetails(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSale,
  getAllSales,
  updateSales,
  deleteSale,
  getSaleDetailsById,
};
