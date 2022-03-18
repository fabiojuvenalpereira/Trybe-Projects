import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import './CardDoPedidoDoCliente.css';

// helpers
import setDataToLocalStorage
  from '../../schemas/LocalStorageSetAndGet/setLocalStotageData';
import TESTID from '../../utils/testIdDictionary';

function CardDoPedidoDoCliente({ id, status, saleDate, totalPrice }) {
  const [statusCard, setStatusCard] = useState('');
  const history = useHistory();

  const goToDetails = () => {
    setDataToLocalStorage(id, 'detailsPage');
    history.push(`orders/${id}`);
  };

  const changeStatusColor = (statusChange) => {
    switch (statusChange) {
    case 'Pronto':
      return setStatusCard('done');
    case 'Preparando':
      return setStatusCard('preparing');
    default:
      return setStatusCard('pending');
    }
  };

  useEffect(() => {
    changeStatusColor(status);
  }, []);

  return (
    <div
      onClick={ () => goToDetails() }
      className="pedido-cliente-card"
      aria-hidden="true"
    >
      <div className="primary-content-card-cliente">
        <p data-testid={ `${TESTID.customer.elementorderId}${id}` }>
          { id }
        </p>
      </div>
      <div className="secondary-content-card-cliente">
        <div className={ `pedido-cliente-status ${statusCard}` }>
          <h3 data-testid={ `${TESTID.customer.deliveryStatus}${id}` }>
            { status }
          </h3>
        </div>
        <div className="pedido-cliente-data-price">
          <p data-testid={ `${TESTID.customer.orderDates}${id}` }>
            Date
            { saleDate }
          </p>
          <p data-testid={ `${TESTID.customer.cardPrice}${id}` }>
            R$
            { totalPrice }
          </p>
        </div>
      </div>
    </div>
  );
}

CardDoPedidoDoCliente.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
}.isRequired;

export default CardDoPedidoDoCliente;
