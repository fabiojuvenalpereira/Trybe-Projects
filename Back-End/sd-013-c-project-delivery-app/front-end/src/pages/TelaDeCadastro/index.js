import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// css
import './TelaDeCadastro.css';
import logo from '../../images/logowhite.svg';

// helpers
import { createUser } from '../../api';
import validateEntries from '../../utils/validateEntries';

// components
import ElementoOculto from '../../components/ElementoOculto';
import makeLoginAndSetLocalStorage from '../../utils/loginAndSetLocalStorage';
import createKeyOnLocalStorage from '../../schemas/LocalStorageSetAndGet/createKey';

function TelaDeCadastro() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disableStatus, setDisableStatus] = useState(true);
  const [registerError, setRegisterError] = useState(false);

  const history = useHistory();

  const defineDisableStatus = () => disableStatus;

  const handleChange = (event) => {
    if (event.target.id === 'user-name') {
      setUserName(event.target.value);
    }
    if (event.target.id === 'user-email') {
      setUserEmail(event.target.value);
    }
    if (event.target.id === 'user-password') {
      setUserPassword(event.target.value);
    }
  };

  useEffect(() => {
    const validate = validateEntries(userEmail, userPassword, userName);
    if (validate.error) {
      setDisableStatus(true);
    } else {
      setDisableStatus(false);
    }
  }, [userName, userEmail, userPassword]);

  const handleClick = async (name, email, password) => {
    const TIME = 3000;
    const role = 'customer';

    const userData = { name, email, password, role };
    const data = { email, password };

    try {
      createKeyOnLocalStorage('orderedProducts');

      await createUser(userData);
      await makeLoginAndSetLocalStorage(data);

      history.push('/customer/products');
    } catch (error) {
      console.log(error);

      setRegisterError(true);

      setTimeout(() => setRegisterError(false), TIME);
    }
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div className="main-register-page">
      {registerError ? (
        <ElementoOculto />
      ) : (
        ''
      )}
      <form className="main-content-register">
        <div className="left-side-register">
          <img src={ logo } alt="logo" className="logo-image-register" />
          <button
            type="button"
            className="login-page-button"
            onClick={ redirectToLogin }
          >
            Login
          </button>
        </div>

        <div className="right-side-register">
          <div className="text-login">Bem-vindo!</div>
          <label htmlFor="user-name" className="input-name-register-label">
            Nome
            <input
              id="user-name"
              autoComplete="off"
              type="text"
              value={ userName }
              className="input-name-register input"
              data-testid="common_register__input-name"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <label htmlFor="user-email" className="input-email-register-label">
            Email
            <input
              id="user-email"
              type="text"
              autoComplete="off"
              value={ userEmail }
              className="input-email-register input"
              data-testid="common_register__input-email"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <label
            htmlFor="user-password"
            className="input-password-register-label"
          >
            Senha
            <input
              type="password"
              autoComplete="off"
              id="user-password"
              value={ userPassword }
              className="input-password-register input"
              data-testid="common_register__input-password"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <button
            type="button"
            className="register-button"
            disabled={ defineDisableStatus() }
            data-testid="common_register__button-register"
            onClick={ () => handleClick(userName, userEmail, userPassword) }
          >
            CADASTRAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default TelaDeCadastro;
