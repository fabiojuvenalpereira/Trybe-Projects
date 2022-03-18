const sellerService = require('../../services/sellerService/seller.service');

const getAllSellers = async (_req, res, next) => {
  try {
    const foundSellers = await sellerService.findAllSellers();

    return res.status(foundSellers.status).json(foundSellers.content);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getAllSellers,
};
