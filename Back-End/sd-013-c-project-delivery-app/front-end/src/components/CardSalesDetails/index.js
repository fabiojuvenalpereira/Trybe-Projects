import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './CardSalesDetails.css';
// helpers
import TESTID from '../../utils/testIdDictionary';

// components
import Loading from '../Loading';
function CardSalesDetails({ id, status, name, saleDate }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading === true) {
      setLoading(false);
    }
  }, [loading]);

  if (loading) return <Loading />;
  return (
    <section className="orderDetails">
      <div data-testid={ TESTID.customer.orderId }>
        pedido:
        { id }
      </div>
      <div data-testid={ TESTID.customer.name }>{name}</div>
      <div data-testid={ TESTID.customer.date }>{saleDate.toLocaleDateString('en-GB')}</div>
      <div data-testid={ TESTID.customer.stts }>{status}</div>
    </section>
  );
}

CardSalesDetails.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
}.isRequired;

export default CardSalesDetails;
