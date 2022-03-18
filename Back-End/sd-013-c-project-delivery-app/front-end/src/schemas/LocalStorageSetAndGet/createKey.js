import setDataToLocalStorage
  from './setLocalStotageData';
import getDataFromLocalStorage
  from './getLocalStorageData';

const createKeyOnLocalStorage = (key) => {
  if (!getDataFromLocalStorage(key)) setDataToLocalStorage([], key);
};

export default createKeyOnLocalStorage;
