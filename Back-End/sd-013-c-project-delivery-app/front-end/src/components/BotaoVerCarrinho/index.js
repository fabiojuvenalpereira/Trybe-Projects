import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import './BotaoVerCarrinho.css';

// helpers
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import CustomerContext from '../../context/customerContext/CustomerContext';

const buttomCartTestId = 'customer_products__button-cart';
const bottomValueTestId = 'customer_products__checkout-bottom-value';

function BotaoVerCarrinho() {
  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState(0);
  const { refreshPage } = useContext(CustomerContext);

  const handleClick = () => {
    history.push('checkout');
  };

  const getTotalPrice = () => {
    setTotalPrice(calculateTotalPrice());
  };

  useEffect(() => {
    getTotalPrice();
  }, [refreshPage]);

  return (
    <div>
      <button
        className="seeCartButton"
        data-testid={ buttomCartTestId }
        type="submit"
        disabled={ totalPrice === '0,00' }
        onClick={ handleClick }
      >
        VER CARRINHO R$
        <p data-testid={ bottomValueTestId }>
          { totalPrice }
        </p>
      </button>
    </div>
  );
}

export default BotaoVerCarrinho;
