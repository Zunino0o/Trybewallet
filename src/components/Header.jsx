import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  arrumaProb = (expenses) => {
    if (expenses.length > 0) {
      const finalNum = expenses.reduce((prev, curr) => {
        const { value, currency, exchangeRates } = curr;
        const { ask } = exchangeRates[currency];
        const num1 = parseFloat(value);
        const num2 = parseFloat(ask);
        const resp = num1 * num2;
        // console.log(value, currency, exchangeRates, typeof (ask), typeof (prev), typeof (resp), num1, typeof (num2));
        return prev + parseFloat(resp.toFixed(2));
      }, 0.00);
      return finalNum;
    }

    return 0.00;
  };

  render() {
    const { userEmail, expenses } = this.props;
    const trueValue = this.arrumaProb(expenses);

    return (
      <div>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <h3 data-testid="total-field">{ trueValue > 0 ? trueValue : '0.00' }</h3>
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
