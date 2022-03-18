import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './BarraDeNavegacaoDoAdmin.css';

// helpers
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

function BarraDeNavegacaoDoAdmin() {
  const [userName, setUserName] = useState('');

  const history = useHistory();

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
        data-testid={ TESTID.admin.linkOrders }
      >
        GERENCIAR USUÁRIOS
      </button>
      <button
        type="button"
        className="nomedocliente-color"
        data-testid={ TESTID.admin.fullName }
      >
        {userName}
      </button>
      <button
        type="button"
        className="sair-color"
        data-testid={ TESTID.admin.linkLogout }
        onClick={ exitFunction }
      >
        Sair
      </button>
    </div>
  );
}

export default BarraDeNavegacaoDoAdmin;

// Template retirado de: https://www.w3schools.com/howto/howto_js_topnav.asp
