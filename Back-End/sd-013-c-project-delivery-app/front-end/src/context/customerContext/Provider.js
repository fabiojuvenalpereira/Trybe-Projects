import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomerContext from './CustomerContext';

const Provider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshPage, setRefreshPage] = useState(true);

  const contextValue = {
    userName,
    setUserName,
    products,
    setProducts,
    loading,
    setLoading,
    refreshPage,
    setRefreshPage,
  };

  return (
    <CustomerContext.Provider value={ contextValue }>{children}</CustomerContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
