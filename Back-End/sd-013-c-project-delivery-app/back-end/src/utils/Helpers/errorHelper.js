const DICTIONARY = require('../dictionary');

const errors = {
  errorInvData: {
    status: DICTIONARY.status.badRequest,
    error: {
      message: DICTIONARY.messages.errorInvData,
    },
  },

  errorUserNF: {
    status: DICTIONARY.status.notFound,
    error: {
      message: DICTIONARY.messages.errorUserNF,
    },
  },

  errorUserExist: {
    status: DICTIONARY.status.conflict,
    error: {
      message: DICTIONARY.messages.errorUserExist,
    },
  },

  errorInvToken: {
    status: DICTIONARY.status.unauthorized,
    error: {
      message: DICTIONARY.messages.errorInvToken,
    },
  },

  errorEmptyDb: {
    status: DICTIONARY.status.badRequest,
    error: {
      message: DICTIONARY.messages.errorEmptyDb,
    },
  },

  errorSaleRegister: {
    status: DICTIONARY.status.notFound,
    error: {
      message: DICTIONARY.messages.errorSaleRegister,
    },
  },

  errorInvProductId: {
    status: DICTIONARY.status.notFound,
    error: {
      message: DICTIONARY.messages.errorInvProductId,
    },
  },
};

module.exports = errors;
