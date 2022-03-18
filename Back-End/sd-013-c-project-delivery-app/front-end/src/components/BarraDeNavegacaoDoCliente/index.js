import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './BarraDeNavegacaoDoCliente.css';
import logo from '../../images/logowhite.svg';

// helpers
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

function BarraDeNavegacaoDoCliente() {
  const [userName, setUserName] = useState('');

  const history = useHistory();

  const goToProducts = () => {
    history.push('/customer/products');
  };

  const goToMeusPedidos = () => {
    history.push('/customer/orders');
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
      <img src={ logo } alt="logo" />
      <button
        type="button"
        className="produto-color"
        data-testid={ TESTID.customer.linkProductsTestId }
        onClick={ goToProducts }
      >
        PRODUTOS
      </button>
      <button
        type="button"
        className="meuspedidos-color"
        data-testid={ TESTID.customer.linkOrdersTestId }
        onClick={ goToMeusPedidos }
      >
        MEUS PEDIDOS
      </button>
      <button
        type="button"
        className="nomedocliente-color"
        data-testid={ TESTID.customer.fullNameTestId }
      >
        {userName}
      </button>
      <button
        type="button"
        className="sair-color"
        data-testid={ TESTID.customer.linkLogoutTestId }
        onClick={ exitFunction }
      >
        Sair
      </button>
    </div>
  );
}

export default BarraDeNavegacaoDoCliente;

// Template retirado de: https://www.w3schools.com/howto/howto_js_topnav.asp
