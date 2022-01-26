import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getCurrenciesThunk, exchangeRatesThunk } from '../actions';

import EachExpenses from './EachExpenses';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickButton() {
    const { expensesFromGlobal, getexpenses } = this.props;
    let idToExpense = 0;

    if (expensesFromGlobal.lenght === 0) {
      idToExpense = 0;
    } else {
      idToExpense = expensesFromGlobal.length;
    }

    const toSendExpenses = {
      id: idToExpense,
      ...this.state,
    };
    getexpenses(toSendExpenses);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  valueInput(value) {
    return (
      <label htmlFor="input-value" className="input-text">
        Valor
        <input
          name="value"
          type="number"
          id="input-value"
          value={ value }
          className="input-text-area"
          placeholder="Gastou quanto?"
          autoComplete="off"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput(description) {
    return (
      <label htmlFor="input-desc" className="input-text">
        Descrição
        <input
          name="description"
          type="text"
          id="input-desc"
          value={ description }
          className="input-text-area"
          placeholder="Fale me sobre o gasto"
          autoComplete="off"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput(currency) {
    const { currencies } = this.props;
    return (
      <label htmlFor="input-currency" className="input-select">
        Moeda
        <select
          name="currency"
          id="input-currency"
          value={ currency }
          onChange={ this.handleChange }
          className="input-select-area"
        >
          { currencies.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
        </select>
      </label>
    );
  }

  paymentMethodInput(method) {
    return (
      <label htmlFor="input-payment" className="input-select">
        Método de pagamento
        <select
          name="method"
          id="input-payment"
          value={ method }
          onChange={ this.handleChange }
          className="input-select-area"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput(tag) {
    return (
      <label htmlFor="input-tag" className="input-select">
        Tag
        <select
          name="tag"
          id="input-tag"
          value={ tag }
          onChange={ this.handleChange }
          className="input-select-area"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  addButton() {
    return (
      <div className="add-expense-btn-box">
        <button
          type="button"
          onClick={ this.clickButton }
          className="add-expense-btn"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  toReturntr() {
    return (
      <tr className="title-table">
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de Pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio Utilizado</th>
        <th>Valor Convertido</th>
        <th>Moeda de Conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  // renderizando todo o componente
  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="main-form-wallet">
        <form>
          <div className="semi-header">
            { this.valueInput(value) }
            { this.descriptionInput(description) }
            { this.currencyInput(currency) }
            { this.paymentMethodInput(method) }
            { this.tagInput(tag) }
            { this.addButton() }
          </div>
        </form>
        <div className="expenses-tabble">
          <table className="table-content">
            <tbody>
              { this.toReturntr() }
              <EachExpenses />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispath) => ({
  getCurrencies: (payload) => dispath(getCurrenciesThunk(payload)),
  getexpenses: (payload) => dispath(exchangeRatesThunk(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesFromGlobal: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
