import setDataToLocalStorage from '../LocalStorageSetAndGet/setLocalStotageData';
import getDataFromLocalStorage from '../LocalStorageSetAndGet/getLocalStorageData';

const setProductsOnLocalStorage = (product) => {
  const { id, quantity } = product;

  const orderedProducts = getDataFromLocalStorage('orderedProducts');

  const mapToLocalStorage = () => {
    const data = orderedProducts.map((element) => {
      if (element.id === id) element.quantity = quantity;

      return element;
    });
    setDataToLocalStorage(data, 'orderedProducts');
  };

  const addProductOnLocalStorage = () => {
    const arrayWithProduct = orderedProducts.push(product);
    setDataToLocalStorage(arrayWithProduct, 'orderedProducts');
  };

  const checkCorrespondence = () => {
    if (!orderedProducts.length) addProductOnLocalStorage();
    if (!orderedProducts.find((element) => element.id === id)) addProductOnLocalStorage();
    if (orderedProducts.find((element) => element.id === id)) mapToLocalStorage();
  };

  if (orderedProducts) {
    checkCorrespondence();
  } else {
    checkCorrespondence();
  }
};

export default setProductsOnLocalStorage;
