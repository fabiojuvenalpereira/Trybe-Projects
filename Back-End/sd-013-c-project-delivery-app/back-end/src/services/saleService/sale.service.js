const { Sale, Product } = require('../../database/models');
const { SaleProduct } = require('../../database/models');

const validate = require('../../utils/validateEntries');
const Error = require('../../utils/Helpers/errorHelper');

const getAllSales = async () => {
  const foundSales = await Sale.findAll({});

  if (!foundSales) throw Error.errorSaleRegister;

  return { status: 200, content: foundSales };
};

const createSale = async (sale, products) => {
  const validateEntries = validate.validateEntriesCreateSale({ ...sale });
  if (validateEntries.error) throw Error.errorInvData;

  const createdSale = await Sale.create({ ...sale });
  const saleId = createdSale.dataValues.id;

  const saleProducts = products.map((product) => {
    const newProduct = { ...product, saleId };
    return newProduct;
  });

  SaleProduct.bulkCreate(saleProducts);

  return { status: 201,
    content: {
      sale: createdSale.dataValues,
      products: saleProducts,
    },
  };
};

const deleteSale = async (id) => {
  const foundSale = await Sale.findOne({ where: { id } });
  if (!foundSale) throw Error.errorInvProductId;

  Sale.destroy({ where: { id } });

  return { status: 200, content: { message: `Deleted sale with id: ${id}` } };
};

const getSaleDetails = async (id) => {
  const findSaleById = await Sale.findOne({
    where: { id },
    include: { model: Product, as: 'products', through: { attributes: ['quantity'] } },
  });
  // console.log(findSaleById);
  return findSaleById.dataValues;
};

module.exports = {
  createSale,
  getAllSales,
  deleteSale,
  getSaleDetails,
};
