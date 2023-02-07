import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiRequest, requestSuccessful, submitExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: '',
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(apiRequest());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => Object.keys(data).filter((curr) => curr !== 'USDT'))
      // .then((data) => console.log(data));
      .then((stat) => dispatch(requestSuccessful(stat)));
  }

  cleanState = () => {
    this.setState({
      id: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: '',
    });
  };

  fetchExpenses = async () => {
    const allExp = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resp = await allExp.json();
    return resp;
  };

  submitInfos = async () => {
    const { expenses, dispatch } = this.props;
    dispatch(apiRequest());
    const fetchResp = await this.fetchExpenses();
    const data = {
      ...this.state,
      id: expenses.length,
      exchangeRates: fetchResp,
    };
    // console.log(this.state);
    // console.log(expenses.length);
    // console.log(fetchResp);
    // console.log(data);
    dispatch(submitExpense(data));
    this.cleanState();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, dispatch } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Info da Despesa:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies
              ? currencies.map((data, ind) => (
                <option key={ ind } value={ data }>
                  {data}
                </option>
              ))
              : ''}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tipo de Despesa:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          // onClick={ () => dispatch(this.submitInfos) }
          onClick={ this.submitInfos }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
