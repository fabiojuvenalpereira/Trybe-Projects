const { ObjectId } = require('mongodb');

const userModel = require('../models/userModel');

const validateUser = require('../schemas/userValidation');
const { ERR } = require('../utils/dictionary');
const { OK } = require('../utils/dictionary');

const createUser = async (user) => {
  const userToCreate = user.body;

  const validation = await validateUser(userToCreate);
  if (validation) return { status: validation.status, content: { message: validation.content } };
  
  const isDouble = await userModel.getByEmailOnDB(userToCreate.email);
  if (isDouble) return { status: ERR.status.email, content: { message: ERR.messages.email } };

  const createdUser = await userModel.createUserOnDb({ ...userToCreate, role: 'user' });
  if (!createdUser) {
    return { 
      status: ERR.status.invEntries,
      content: { message: ERR.messages.invEntries },
    };
  }

  const { password, ...userWithoutPassword } = createdUser;

  return { status: OK.created, content: { user: userWithoutPassword } };
};

const getAll = async () => {
  const getAllUsers = await userModel.getAllOnDb();
  if (!getAllUsers) {
    return { 
      status: ERR.status.invEntries,
      content: { message: ERR.messages.invEntries },
    };
  }

  return { status: OK.right, content: getAllUsers };
};

const getByEmail = async (user) => {
  const getByemail = await userModel.getByEmail(user);
  if (!getByemail) {
    return {
      status: ERR.status.invEntries,
      content: { message: ERR.messages.invEntries },
    };
  }

  return { status: OK.right, content: getByemail };
};

const getById = async (req) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return { 
      status: ERR.status.invEntries,
      content: { message: ERR.messages.invEntries },
    };
  }

  const getUser = await userModel.getByIdlOnDB(ObjectId(id));

  return { status: OK.right, content: getUser };
};

module.exports = {
  createUser,
  getAll,
  getByEmail,
  getById,
};