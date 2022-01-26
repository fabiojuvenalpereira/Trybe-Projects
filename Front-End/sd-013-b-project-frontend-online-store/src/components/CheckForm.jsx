import React from 'react';
import { Link } from 'react-router-dom';

class CheckForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    // return (<Redirect to="/thanks" />);
  }

  render() {
    return (
      <form className="checkout-form">
        <h1 className="checkout-form-title">
          Dados pessoais e Pagamento
        </h1>
        <input
          className="checkout-form-input"
          type="text"
          id="NomeCompleto"
          placeholder="Nome Completo"
          data-testid="checkout-fullname"
        />
        <input
          className="checkout-form-input"
          type="email"
          id="Email"
          placeholder="Email"
          data-testid="checkout-email"
        />
        <div className="cpf-telefone">
          <input
            className="checkout-form-input cpf"
            type="text"
            id="cpf"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            className="checkout-form-input"
            type="text"
            id="Telefone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
        </div>
        <input
          className="checkout-form-input"
          type="text"
          id="CEP"
          placeholder="CEP"
          data-testid="checkout-cep"
        />
        <input
          className="checkout-form-input"
          type="text"
          id="Endereço"
          placeholder="Endereço"
          data-testid="checkout-address"
        />
        <label
          className="checkout-form-input"
          htmlFor="payment"
        >
          Forma de pagamento:
          <select
            type="select"
            id="payment"
          >
            <option value="pix">Pix</option>
            <option value="cash">Boleto</option>
            <option value="debit">Débito</option>
            <option value="credit">Crédito</option>
          </select>
        </label>
        <Link
          to="/thanks"
          className="checkout-form-submit-btn"
        >
          <div>
            Finalizar compra
          </div>
        </Link>
      </form>
    );
  }
}

export default CheckForm;
