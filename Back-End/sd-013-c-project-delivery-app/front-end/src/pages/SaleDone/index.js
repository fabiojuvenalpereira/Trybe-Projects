import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import './SaleDone.css';

import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';

function SaleDone() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const TIMER = 1000;

  const redirectFunction = () => {
    const id = getDataFromLocalStorage('detailsPage');
    setTimeout(() => {
      history.push(`${id}`);
    }, TIMER);
  };

  useEffect(() => {
    if (loading === true) {
      redirectFunction();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="main-content">
      <p className="aviso">Compra realizada</p>
    </div>
  );
}

export default SaleDone;
