import React, { useEffect, useState } from 'react';

import './AdminPage.css';

// Api
import { createUserByAdmin } from '../../api';

// helpers
import validateEntries from '../../utils/validateEntries';
import UserList from '../../components/CardsAdm';
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

// components
import BarraDeNavegacaoDoAdmin from '../../components/BarraDeNavegacaoDoAdmin';

function AdminPage() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [role, setRole] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disableStatus, setDisableStatus] = useState(true);
  const [registerError, setRegisterError] = useState(false);
  const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState(false);

  const defineDisableStatus = () => disableStatus;

  const handleClick = async (name, email, password) => {
    const userData = { name, email, password, role };

    try {
      await createUserByAdmin(token, userData);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      setRegisterError(true);
    }
  };

  useEffect(() => {
    const validate = validateEntries(userEmail, userPassword, userName);

    if (validate.error || role === '') {
      setDisableStatus(true);
    } else {
      setDisableStatus(false);
    }

    const userFromLocalStorage = getDataFromLocalStorage('user');

    setToken(userFromLocalStorage.token);
  }, [userName, userEmail, userPassword]);

  return (
    <main className="main-content-admin">
      <BarraDeNavegacaoDoAdmin />
      <p className="title">Controle de pessoas usuárias</p>
      <form className="main-content-form">
        <label htmlFor="user-name" className="input-text-form-adm">
          <input
            placeholder="Nome e sobrenome"
            id="user-name"
            type="text"
            value={ userName }
            data-testid={ TESTID.admin.inputName }
            onChange={ (event) => setUserName(event.target.value) }
          />
        </label>
        <label htmlFor="user-email" className="input-text-form-adm">
          <input
            placeholder="email@site.com.br"
            type="text"
            id="user-email"
            value={ userEmail }
            data-testid={ TESTID.admin.inputEmail }
            onChange={ (event) => setUserEmail(event.target.value) }
          />
        </label>
        <label htmlFor="user-password" className="input-text-form-adm pass">
          <input
            placeholder="Senha do Usuário"
            type="text"
            id="user-password"
            value={ userPassword }
            data-testid={ TESTID.admin.inputPassword }
            onChange={ (event) => setUserPassword(event.target.value) }
          />
        </label>
        <label htmlFor="type-role " className="input-select-form-adm">
          <select
            value={ role }
            name="userRole"
            data-testid={ TESTID.admin.selectRole }
            onChange={ (event) => setRole(event.target.value) }
            className="select-tag-input"
          >
            <option selected hidden value="invalid"> Tipo de Usuário</option>
            <option value="admin">Administrador</option>
            <option value="customer">Consumidor</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          className="register-button-adm"
          disabled={ defineDisableStatus() }
          data-testid={ TESTID.admin.buttonRegister }
          type="button"
          onClick={ () => handleClick(userName, userEmail, userPassword) }
        >
          Cadastrar
          <span data-testid={ TESTID.admin.invalidRegister }>
            {registerError}
          </span>
        </button>
      </form>
      <UserList
        refresh={ refresh }
      />
    </main>
  );
}

export default AdminPage;
