import React, { useEffect, useState } from 'react';

import './ElementoOculto.css';

import TESTID from '../../utils/testIdDictionary';

const ElementoOculto = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [closing, setClosing] = useState('');

  const TIMER = 1000;

  useEffect(() => {
    setErrorMessage('Dados inválidos ou usuário inexistente');

    setTitleError('Não foi possível fazer o Login');

    setTimeout(() => {
      setClosing('closing');
    }, TIMER);
  }, [errorMessage]);

  return (
    <div
      className={ `main-element-content ${closing}` }
      data-testid={ TESTID.element.data }
    >
      <div className="box-message">
        <p className="title-error">{titleError}</p>
        <p className="error-content">
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ElementoOculto;
