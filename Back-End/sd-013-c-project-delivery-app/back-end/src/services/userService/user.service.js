const md5 = require('md5');

const { User } = require('../../database/models');

const generateToken = require('../../auth/generateToken');
const Error = require('../../utils/Helpers/errorHelper');
// const { validateEntriesCreateNewUser } = require('../../utils/validateEntries');

// createUser
const createUser = async (name, email, role = 'customer', passWord) => {
  const password = md5(passWord);

  const userToCreate = { name, email, role, password };

  // const validate = validateEntriesCreateNewUser(userToCreate);
  // if (validate.error) throw Error.errorUserNF;

  const foundUserOnDb = await User.findOne({ where: { email, name } });
  if (foundUserOnDb) throw Error.errorUserExist;

  await User.create(userToCreate);

  return { message: 'User Created successfully' };
};

// userLogin
const userLogin = async (email, passWord) => {
  const password = md5(passWord);

  const fondUser = await User.findOne({ where: { email } });
  if (!fondUser || fondUser.password !== password) throw Error.errorUserNF;

  const { password: userPassword, ...userWithoutPassword } = fondUser.dataValues;

  const token = generateToken(userWithoutPassword);

  const Role = (fondUser.role);

  return { status: 200, data: token, Role };
};

// getAllUsers
const getAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 200, response: users };
};

module.exports = {
  getAllUser,
  createUser,
  userLogin,
};
