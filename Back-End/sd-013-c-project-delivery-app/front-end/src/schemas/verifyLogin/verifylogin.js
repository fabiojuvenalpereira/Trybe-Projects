import PATH from '../../utils/paths';
import getDataFromLocalStorage from '../LocalStorageSetAndGet/getLocalStorageData';

const IsLogged = () => {
  const data = getDataFromLocalStorage('user');

  const { role } = data;

  if (data) {
    switch (role) {
    case 'seller':
      return PATH.seller;
    case 'customer':
      return PATH.consumerProducts;
    case 'administrator':
      return PATH.adminPage;
    default:
      break;
    }
  }
};

export default IsLogged;
