const connection = require('./connection');

const login = async ({ email }) => {
  const conn = await connection();
  const query = await conn.collection('users').findOne({ email });
  return query;
};

module.exports = {
  login,
};