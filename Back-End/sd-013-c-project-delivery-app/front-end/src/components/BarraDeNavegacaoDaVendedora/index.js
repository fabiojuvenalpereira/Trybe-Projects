import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './BarraDeNavegacaoDaVendedora.css';

// helpers
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

function BarraDeNavegacaoDaVendedora() {
  const [userName, setUserName] = useState('');
  const history = useHistory();

  const goToSellerPedidos = () => {
    history.push('/seller/orders');
  };

  const exitFunction = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const { name } = getDataFromLocalStorage('user');
    setUserName(name);
  }, []);

  return (
    <div className="topnav">
      <button
        type="button"
        className="meuspedidos-color"
        data-testid={ TESTID.customer.linkOrders }
        onClick={ goToSellerPedidos }
      >
        PEDIDOS
      </button>
      <button
        type="button"
        className="nomedocliente-color"
        data-testid={ TESTID.customer.fullName }
      >
        {userName}
      </button>
      <button
        type="button"
        className="sair-color"
        data-testid={ TESTID.customer.linkLogoutNameTestId }
        onClick={ exitFunction }
      >
        Sair
      </button>
    </div>
  );
}

export default BarraDeNavegacaoDaVendedora;
