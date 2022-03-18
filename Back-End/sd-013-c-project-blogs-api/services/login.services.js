const validate = require('../auth/validateEntries');
const userService = require('./user.services');
const generateToken = require('../auth/generateToken');

const userLogin = async (req) => {
  const { email, password } = req.body;

  const invalidLogin = await validate.loginValidation(email, password);
  if (invalidLogin) return { status: invalidLogin.status, content: invalidLogin.content };

  const { content } = await userService.findUserByEmail(email);
  
  if (content.message || content.foundUser.password !== password) {
    return { 
      status: 400,
      content: { message: 'Invalid fields' },
    };
  }

  const { password: pass, ...userWithoutPassword } = content.foundUser.dataValues;

  const token = await generateToken(userWithoutPassword);
  return { status: 200, content: { token } };
};

module.exports = {
  userLogin,
};