import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import './CardDoPedidoDaVendedora.css';

// helpers
import setDataToLocalStorage
  from '../../schemas/LocalStorageSetAndGet/setLocalStotageData';
import TESTID from '../../utils/testIdDictionary';

function CardDoPedidoDaVendedora({
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber }) {
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
      className="pedido-vendedora-card"
      aria-hidden="true"
    >
      <div className="primary-content-card">
        <p data-testid={ `${TESTID.seller.elementorderId}${id}` }>
          { id }
        </p>
      </div>
      <div className="secondary-content-card">
        <div className="pedido-vendedora-status-data-price">
          <div className={ `pedido-vendedora-status  ${statusCard}` }>
            <p data-testid={ `${TESTID.seller.deliveryStatus}${id}` }>
              { status }
            </p>
          </div>
          <div className="pedido-vendedora-data-price">
            <p data-testid={ `${TESTID.seller.elementorderDate}${id}` }>
              Data
              { saleDate }
            </p>
            <p data-testid={ `${TESTID.seller.cardPrice}${id}` }>
              R$
              { totalPrice }
            </p>
          </div>
        </div>
        <div className="pedido-vendedora-address">
          <p data-testid={ `${cardAddress}${id}` }>
            {`${deliveryAddress}, ${deliveryNumber}`}
          </p>
        </div>
      </div>
    </div>
  );
}

CardDoPedidoDaVendedora.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
  deliveryNumber: PropTypes.string,
}.isRequired;

export default CardDoPedidoDaVendedora;
