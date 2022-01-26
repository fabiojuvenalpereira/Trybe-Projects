import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { userLogin } from '../actions';

import '../styles/home.css';
import logoImage from '../images/walletlogo.svg';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputLogin: '',
      loginError: 'box-content',
      desativateButton: true,
      loginOk: false,
      emailOk: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.inputFilter = this.inputFilter.bind(this);
    // this.enterPressed = this.enterPressed.bind(this);
  }

  onClick() {
    this.changeStateFilters();
    const { inputEmail } = this.state;
    const { user, props } = this.props;
    user(inputEmail);
    props.history.push('/carteira');
  }

  // enterPressed({ key }) {
  //   const { desativateButton } = this.state;
  //   if (desativateButton === false && key === 'Enter') {
  //     this.onClick();
  //   }
  // }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    }, () => this.inputFilter());
  }

  changeStateFilters() {
    const { loginError, emailOk, loginOk } = this.state;
    const ONE_SECOND = 1000;
    const patternValue = loginError;

    if (emailOk && loginOk === true) {
      this.setState({
        loginError: `${loginError} success`,
        desativateButton: true,
      });
    } else {
      this.setState({
        loginError: `${loginError} error`,
        desativateButton: true,
      });
    }
    setTimeout(() => {
      this.setState({
        loginError: `${patternValue}`,
        desativateButton: false,
      });
    }, ONE_SECOND);
  }

  inputFilter() {
    const { inputEmail, inputLogin } = this.state;
    const regexEmail = /\S+@\S+\.\S+/; // referencia retirada do seguinte site https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const regexLogin = /^(?=.*\d)[0-9a-zA-Z$*&@#]{6,}$/; // referencia retirada do seguin site https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte

    if (regexEmail.test(inputEmail) && regexLogin.test(inputLogin)) {
      this.setState({
        desativateButton: false,
        loginOk: true,
        emailOk: true,
      });
    } else {
      this.setState({
        desativateButton: true,
        loginOk: false,
        emailOk: false,
      });
    }
  }

  inputButton(desativateButton) {
    return (
      <button
        type="button"
        disabled={ desativateButton }
        className="login-button"
        onClick={ this.onClick }
      >
        Entrar
      </button>
    );
  }

  render() {
    const { loginError, desativateButton, inputEmail, inputLogin } = this.state;
    return (
      <div className={ loginError }>
        <div className="login-icon">
          <img src={ logoImage } alt="logo" className="logo" />
        </div>
        <form className="main-form">
          <div className="input-email-box">
            <label htmlFor="inputEmail" className="input-text">
              <input
                type="text"
                id="inputEmail"
                data-testid="email-input"
                placeholder="E-mail"
                maxLength="50"
                value={ inputEmail }
                className="pr-color input-form-base input-email"
                onChange={ this.handleChange }
                // onKeyDown={ this.enterPressed }
                autoComplete="off"
              />
            </label>
          </div>
          <div className="input-login-box">
            <label htmlFor="inputLogin" className="input-password">
              <input
                type="password"
                maxLength="15"
                id="inputLogin"
                data-testid="password-input"
                value={ inputLogin }
                className="pr-color input-form-base input-password"
                onChange={ this.handleChange }
                // onKeyDown={ this.enterPressed }
                placeholder="Senha"
                autoComplete="off"
              />
            </label>
          </div>
          <div className="login-button-area">
            { this.inputButton(desativateButton) }
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispath) => ({
  user: (email) => dispath(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
