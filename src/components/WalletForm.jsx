import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiRequest, requestSuccessful } from '../redux/actions';

// fazer a chamada da API e o dispatch dentro do componentDidMount()
// OU
// RELER Redux Thunk no course

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(apiRequest());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => Object.keys(data).filter((curr) => curr !== 'USDT'))
      // .then((data) => console.log(data));
      .then((stat) => dispatch(requestSuccessful(stat)));
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input" name="select">
          { currencies
            ? currencies
              .map((data) => (
                <option key={ data } value={ data }>{ data }</option>
              ))
            : '' }
        </select>
        <select data-testid="method-input" name="select">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="select">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
