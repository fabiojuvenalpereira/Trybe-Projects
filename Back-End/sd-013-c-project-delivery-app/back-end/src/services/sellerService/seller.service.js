const { User } = require('../../database/models');

const findAllSellers = async () => {
  const foundSellers = await User.findAll({
    where: {
      role: 'seller',
    },
  });

  return ({ status: 200, content: foundSellers });
};

module.exports = {
  findAllSellers,
};
