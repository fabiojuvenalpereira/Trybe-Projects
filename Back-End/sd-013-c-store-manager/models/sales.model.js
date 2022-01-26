const connection = require('./connection');

const getAllSalesOnDb = async () => {
  const conn = await connection();
  const allSales = await conn
    .collection('sales')
    .find({}).toArray();

  return allSales;
};

const getByIdOnDb = async (id) => {
  const conn = await connection();
  const sale = await conn.collection('sales').findOne({ _id: id });
  return sale;
};

const createSaleOnDb = async (products) => {
  const conn = await connection();

  const { insertedId } = await conn
    .collection('sales')
    .insertOne({ itensSold: products });

  return { _id: insertedId, itensSold: products };
};

const editSaleOnDb = async (idSale, products) => {
  const conn = await connection();

  products.map((product) => (
    conn
    .collection('sales')
    .updateOne(
      { _id: idSale, 'itensSold.productId': product.productId },
      { $set: { 'itensSold.$.quantity': product.quantity } },
    )
  ));
  
  return { _id: idSale, itensSold: products };
};

const deleteByIdOnDb = async (id) => {
  const conn = await connection();
  const deletedSale = await conn
  .collection('sales')
  .deleteOne(
    { _id: id },
  );

  return deletedSale;
};

const deleteAllFromDb = async () => {
  const conn = await connection();
  await conn.collection('sales').deleteMany({});
};

module.exports = {
  getAllSalesOnDb,
  getByIdOnDb,
  createSaleOnDb,
  editSaleOnDb,
  deleteByIdOnDb,
  deleteAllFromDb,
};