import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  arrumaProb = (expenses) => {
    try {
      if (expenses.length > 0) {
        const finalNum = expenses.reduce((prev, curr) => {
          const { value, currency, exchangeRates } = curr;
          const { ask } = exchangeRates[currency];
          const num1 = parseFloat(value);
          const num2 = parseFloat(ask);
          const resp = num1 * num2;
          // console.log(value, currency, exchangeRates, typeof (ask), typeof (prev), typeof (resp), num1, typeof (num2));
          return prev + parseFloat(resp.toFixed(2));
        }, 0);
        return finalNum;
      }
    } catch (error) {
      console.log(error);
    }
    return 0;
    // console.log(expenses, expenses.currency);
    // const { expenses } = this.props;
    // if (expenses.length > 0) {
    //   const valorFial = expenses.reduce((prev, curr) => {
    //     const { value, currency, exchangeRates } = curr;
    //     console.log(typeof (exchangeRates[currency].ask), value, currency, exchangeRates);
    //     const num1 = parseFloat(value);
    //     const callObj = exchangeRates[currency];
    //     const num2 = parseFloat(callObj.ask);
    //     console.log(callObj.ask);
    //     const response = num1 * num2;
    //     const formatado = parseFloat(response);
    //     // console.log(response, Number(value), Number(exchangeRates[currency].ask));
    //     // console.log(num1, num2, callObj, response, formatado);
    //     return prev + formatado;
    //   }, 0);
    //   // this.setState({
    //   //   valorFinal: valorFial,
    //   // });
    //   return valorFial;
    // }
  };

  render() {
    const { userEmail, expenses } = this.props;
    // if (expenses.length > 0) {
    //   const valorFial = expenses.reduce((prev, curr) => {
    //     const { value, currency, exchangeRates } = curr;
    //     // console.log(Number(value), Number(exchangeRates[currency].ask), exchangeRates[currency].ask);
    //     const response = (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2);
    //     const formatado = Number(response);
    //     // console.log(response, Number(value), Number(exchangeRates[currency].ask));
    //     // console.log(exchangeRates[currency], response, formatado);
    //     return prev + formatado;
    //   }, 0);
    //   this.setState({
    //     valorFinal: valorFial,
    //   });
    // }

    return (
      <div>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <h3 data-testid="total-field">{ this.arrumaProb(expenses) }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.shape({
      code: PropTypes.string,
      codein: PropTypes.string,
      name: PropTypes.string,
      high: PropTypes.string,
      low: PropTypes.string,
      varBid: PropTypes.string,
      pctChange: PropTypes.string,
      bid: PropTypes.string,
      ask: PropTypes.string,
      timestamp: PropTypes.string,
      create_date: PropTypes.string,
    }),
  })),
};

Header.defaultProps = {
  userEmail: '',
  expenses: [],
};

export default connect(mapStateToProps)(Header);
