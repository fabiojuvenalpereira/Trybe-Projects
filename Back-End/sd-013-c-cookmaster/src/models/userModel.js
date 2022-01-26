const connection = require('./connection');

const createUserOnDb = async (user) => {
  const conn = await connection();
  await conn
  .collection('users')
  .insertOne(user);
  return user;
};

const getAllOnDb = async () => {
  const conn = await connection();
  const getAll = await conn.collection('users').find({}).toArray();
  return getAll;
};

const getByEmailOnDB = async (userEmail) => {
  const conn = await connection();
  const query = await conn.collection('users').findOne({ email: userEmail });
  return query;
};

const getByIdlOnDB = async (id) => {
  const conn = await connection();
  const query = await conn.collection('users').findOne({ _id: id });
  return query;
};

module.exports = {
  createUserOnDb,
  getAllOnDb,
  getByEmailOnDB,
  getByIdlOnDB,
};