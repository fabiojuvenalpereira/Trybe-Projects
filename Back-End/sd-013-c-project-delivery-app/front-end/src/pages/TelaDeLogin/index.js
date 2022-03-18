import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './TelaDeLogin.css';
import logoimage from '../../images/logowhite.svg';

// helpers
import validateEntries from '../../utils/validateEntries';
import PATH from '../../utils/paths';
import makeLoginAndSetLocalStorage from '../../utils/loginAndSetLocalStorage';

// components
import ElementoOculto from '../../components/ElementoOculto';
import createKeyOnLocalStorage from '../../schemas/LocalStorageSetAndGet/createKey';
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import IsLogged from '../../schemas/verifyLogin/verifylogin';

function TelaDeLogin() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disableStatus, setDisableStatus] = useState(true);
  const [forbidLogin, setforbidLogin] = useState(false);

  const history = useHistory();

  const defineDisableStatus = () => disableStatus;

  const handleChange = (event) => {
    if (event.target.id === 'user-email') {
      setUserEmail(event.target.value);
    }
    if (event.target.id === 'user-password') {
      setUserPassword(event.target.value);
    }
  };

  const handleClick = () => {
    history.push(PATH.register);
  };

  const logginIn = async (email, password) => {
    const TIME = 3000;

    const data = {
      email,
      password,
    };

    createKeyOnLocalStorage('orderedProducts');

    try {
      const { role } = await makeLoginAndSetLocalStorage(data);

      switch (role) {
      case 'seller':
        history.push(PATH.seller);
        break;
      case 'customer':
        history.push(PATH.consumerProducts);
        break;
      case 'administrator':
        history.push(PATH.adminPage);
        break;
      default:
        break;
      }
    } catch (error) {
      setforbidLogin(true);
      setTimeout(() => setforbidLogin(false), TIME);
    }
  };

  useEffect(() => {
    if (getDataFromLocalStorage('user')) {
      history.push(IsLogged());
    }
    const validate = validateEntries(userEmail, userPassword);
    if (validate.error) {
      setDisableStatus(true);
    } else {
      setDisableStatus(false);
    }
  }, [userEmail, userPassword]);

  return (
    <div className="main-login-page">

      { forbidLogin
        ? (<ElementoOculto dataTestId="common_login__element-invalid-email" />)
        : ('') }

      <form className="main-content-page">
        <div className="left-side-login-screen">
          <div className="text-login">Bem-vindo de volta!</div>
          <label htmlFor="user-email" className="input-login-label">
            Login
            <input
              type="text"
              autoComplete="off"
              id="user-email"
              className="input-login input"
              data-testid="common_login__input-email"
              value={ userEmail }
              onChange={ (event) => handleChange(event) }
            />
          </label>

          <label htmlFor="user-password" className="input-password-label">
            Senha
            <input
              type="password"
              autoComplete="off"
              id="user-password"
              className="input-password input"
              data-testid="common_login__input-password"
              value={ userPassword }
              onChange={ (event) => handleChange(event) }
            />
          </label>

          <button
            type="button"
            className="login-button"
            disabled={ defineDisableStatus() }
            data-testid="common_login__button-login"
            onClick={ () => logginIn(userEmail, userPassword) }
          >
            LOGIN
          </button>
        </div>

        <div className="right-side-login-screen">
          <img className="logo-image" src={ logoimage } alt="logo" />
          <button
            type="button"
            onClick={ handleClick }
            className="create-acount-button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>

      </form>
    </div>
  );
}

export default TelaDeLogin;
