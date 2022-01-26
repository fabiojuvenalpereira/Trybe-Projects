import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WalletForm from '../components/WalletForm';
import '../styles/wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.totalExpensesValue = this.totalExpensesValue.bind(this);
  }

  totalExpensesValue() {
    const { totalExpenses } = this.props;
    let total = 0;

    const toSumTotal = Object.values(totalExpenses);

    toSumTotal.forEach((element) => {
      const { value, currency, exchangeRates } = element;
      total += Number(value) * Number(exchangeRates[currency].ask);
    });

    return `R$ ${total.toFixed(2)}`;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div className="main-wallet-div">
        <div className="wallet-header">
          <div className="title-div">
            HEADER
          </div>
          <div className="email-header">
            {/* <h5 data-testid="email-field">{userEmail}</h5> */}
            {/* <p data-testid="email-field">fabioJuvenalpereira@hotmail.com</p> */}
            <p data-testid="email-field">{userEmail}</p>
            <div className="total-value">
              <p data-testid="total-field">{ this.totalExpensesValue() }</p>
              <p>BRL</p>
            </div>
          </div>
        </div>
        <WalletForm props={ this.props } />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.func,
  totalExpenses: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
