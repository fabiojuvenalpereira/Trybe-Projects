import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
  const decodedToken = jwt.decode(token);
  const { id: userId, iat: userData, exp: userDataUpd, ...dataToken } = decodedToken;
  return dataToken;
};

export const decodeTokenFullInfo = (token) => jwt.decode(token);
