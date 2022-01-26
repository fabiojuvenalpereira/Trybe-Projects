import React from 'react';

import LoginForm from '../components/LoginForm';
import '../styles/home.css';

class Login extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="header-main-page">
          coisas
        </div>
        <div className="main-content">
          <LoginForm props={ this.props } />
        </div>
      </div>
    );
  }
}

export default Login;
