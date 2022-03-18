import { makeLogin } from '../api';
import { decodeToken } from '../schemas/decodeJwtToken/decodeToken';
import setDataToLocalStorage from '../schemas/LocalStorageSetAndGet/setLocalStotageData';

const makeLoginAndSetLocalStorage = async (dataToLogin) => {
  const foundUser = await makeLogin(dataToLogin);
  const { token } = foundUser.data;

  const dataFromToken = await decodeToken(token);
  const dataWithToken = { ...dataFromToken, token };

  setDataToLocalStorage(dataWithToken, 'user');
  return dataFromToken;
};

export default makeLoginAndSetLocalStorage;
