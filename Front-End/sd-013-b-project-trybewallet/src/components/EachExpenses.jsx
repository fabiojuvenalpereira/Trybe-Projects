import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../styles/wallet.css';

class EachExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toFloated(value) {
    const valor = Number(value).toFixed(2);
    return valor;
  }

  exchange(item) {
    const getExchange = item.exchangeRates;
    const curr = getExchange[item.currency].name;
    return curr;
  }

  conv(item) {
    const { value } = item;
    const { currency } = item;
    const getCurrenciesToConv = item.exchangeRates[currency].ask;
    const mult = value * getCurrenciesToConv;
    const total = `R$ ${mult.toFixed(2)}`;
    return total;
  }

  currToconv(item) {
    const { exchangeRates } = item;
    const { currency } = item;
    const curr = exchangeRates[currency].codein;
    return curr;
  }

  render() {
    const { items } = this.props;
    return (
      items.map((item) => (
        <tr className="table-items" key={ item.id }>
          <td className="table-column">{ item.description }</td>
          <td className="table-column">{ item.tag }</td>
          <td className="table-column">{ item.method }</td>
          <td className="table-column">{ this.toFloated(item.value) }</td>
          <td className="table-column">{ item.currency }</td>
          <td className="table-column">{ this.exchange(item) }</td>
          <td className="table-column">{ this.conv(item) }</td>
          <td className="table-column">{ this.currToconv(item) }</td>
          <td className="table-column-buttons">
            <button type="button" className="edit-button">Editar</button>
            <button type="button" className="delete-button">Apagar</button>
          </td>
        </tr>
      ))
    );
  }
}

EachExpenses.propTypes = {
  items: propTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  items: state.wallet.expenses,
});

export default connect(mapStateToProps)(EachExpenses);
