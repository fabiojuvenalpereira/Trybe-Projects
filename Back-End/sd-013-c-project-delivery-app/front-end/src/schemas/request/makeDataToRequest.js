const makeDataToRequest = (sale, products) => {
  const {
    userId,
    sellerId,
    totalPrice,
    address,
    number,
    status,
  } = sale;

  const data = {
    sale: {
      userId,
      sellerId,
      totalPrice: Number(totalPrice.replace(',', '.')),
      deliveryAddress: address,
      deliveryNumber: `${number}`,
      status,
    },
    products,
  };

  return data;
};

export default makeDataToRequest;
