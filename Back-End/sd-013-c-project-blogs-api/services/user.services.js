const validateEntries = require('../auth/validateEntries');
const generateToken = require('../auth/generateToken');
const { User } = require('../models');

const findUserByEmail = async (email) => {
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) return { status: 200, content: { foundUser } };
  return { status: 401, content: { message: 'User not found' } };
};

// req 4
const findUserById = async (id) => {
  const foundUser = await User.findOne({ where: { id } });
  if (foundUser) return { status: 200, content: foundUser };
  return { status: 404, content: { message: 'User does not exist' } };
};

const getAllUsers = async () => {
  const foundUsers = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return { status: 200, content: foundUsers };
};

const createUser = async (req) => {
  const { displayName, email, password, image } = req.body;

  const validateData = await validateEntries.userCreateValidation(displayName, email, password, image);
    if (validateData) {
    return { 
      status: validateData.status,
      content: { message: validateData.message },
    };
  }

  const { status } = await findUserByEmail(email);
  if (status === 200) return { status: 409, content: { message: 'User already registered' } };

  await User.create({ displayName, email, password, image });

  const token = await generateToken({ displayName, email, image });
  return { status: 201, content: { token } };
};

module.exports = {
  findUserById,
  findUserByEmail,
  getAllUsers,
  createUser,
};