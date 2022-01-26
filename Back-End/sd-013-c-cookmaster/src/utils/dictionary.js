const ERR = {
  status: {
    invEntries: 400,
    email: 409,
    empty: 401,
    invLogin: 401,
    notFound: 404,
  },
  messages: {
    invEntries: 'Invalid entries. Try again.',
    email: 'Email already registered',
    empty: 'All fields must be filled',
    invLogin: 'Incorrect username or password',
    jwtError: 'jwt malformed',
    recNotFound: 'recipe not found',
    missingTkn: 'missing auth token',
    unauthorized: 'user unauthorized',
  },
};

const OK = {
  created: 201, 
  right: 200,
  done: 204,
};

module.exports = {
  ERR,
  OK,
};