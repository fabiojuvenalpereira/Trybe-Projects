const dictionary = {
  status: {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
  },
  messages: {
    errorInvData: 'Invalid data entered',
    errorUserNF: 'User or Password not valid',
    errorUserExist: 'User already registered',
    errorInvToken: 'Token not found or invalid',
    errorEmptyDb: 'banco de dados vazio',
    errorSaleRegister: 'não foi possível cadastrar venda, id_user ou id_seller não existe',
    errorInvProductId: 'id do produto inválido',
  },
};

module.exports = dictionary;
