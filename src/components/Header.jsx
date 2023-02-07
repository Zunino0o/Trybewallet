import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // state = {
  //   totalField: '',
  // };

  render() {
    // const { totalField } = this.state;
    const { userEmail, expenses } = this.props;
    const valorFinal = Object.keys(expenses).reduce((prev, curr) => {
      const { value, currency, exchangeRates } = curr;
      const selectedCurrency = Object.keys(exchangeRates).find((rate) => rate.code === currency).ask;
      return prev + (Number(value) * Number(selectedCurrency));
    }, 0);
    return (
      <div>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <h3 data-testid="total-field">{ valorFinal }</h3>
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
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.shape(PropTypes.shape({
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
    })),
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
