import getDataFromLocalStorage from '../LocalStorageSetAndGet/getLocalStorageData';
import setDataToLocalStorage from '../LocalStorageSetAndGet/setLocalStotageData';

const removeItemFromLocalStorage = (id) => {
  const productArray = getDataFromLocalStorage('orderedProducts');

  if (productArray.length !== 0) {
    productArray
      .find((product, index, array) => (product.id === id) && array.splice(index, 1));
  }

  setDataToLocalStorage(productArray, 'orderedProducts');
};

export default removeItemFromLocalStorage;
