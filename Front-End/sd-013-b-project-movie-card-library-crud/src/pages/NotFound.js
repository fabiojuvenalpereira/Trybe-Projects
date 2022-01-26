import React, { Component } from 'react';
import '../components/style/form.css';

class NotFound extends Component {
  render() {
    return <div className="error" data-testid="404-error">Página não encontrada</div>;
  }
}

export default NotFound;
