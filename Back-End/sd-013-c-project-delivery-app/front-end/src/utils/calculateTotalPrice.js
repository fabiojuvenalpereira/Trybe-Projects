import getDataFromLocalStorage
  from '../schemas/LocalStorageSetAndGet/getLocalStorageData';

const calculateTotalPrice = () => {
  const productsToCount = getDataFromLocalStorage('orderedProducts');
  let totalPrice;

  if (productsToCount) {
    const productsToSet = productsToCount.map((item) => {
      const parsedValue = item.price.replace(',', '.');
      return { ...item, price: Number(parsedValue) };
    });

    if (productsToCount.lenght !== 0) {
      const prices = productsToSet.reduce((acc, item) => {
        let value = item.price * item.quantity;
        value += acc;
        return value;
      }, 0);

      const parsedString = prices.toFixed(2).toString();
      totalPrice = parsedString.replace('.', ',');
    }
  } else totalPrice = '0,00';

  return totalPrice;
};

export default calculateTotalPrice;
