import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SaleContext from './SaleContext';

const OrderSalesProvider = ({ children }) => {
  const [sale, setSale] = useState({});
  const [seller, setSeller] = useState({});
  const [products, setProducts] = useState([]);

  const contextValue = {
    sale,
    setSale,
    seller,
    setSeller,
    products,
    setProducts,
  };

  return (
    <SaleContext.Provider value={ contextValue }>
      { children }
    </SaleContext.Provider>
  );
};

OrderSalesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderSalesProvider;
