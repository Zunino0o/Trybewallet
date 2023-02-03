import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  checkButton = () => {
    const { email, password } = this.state;
    const num = 5;
    const checkEmail = /\S+@\S+\.\S+/.test(email);
    // console.log(checkEmail);
    const checkPass = password.length > num;
    const CHECK = checkEmail && checkPass;
    this.setState({
      isDisabled: !CHECK,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(name, value);
    this.setState({
      [name]: value,
    }, this.checkButton);
  };

  // submitInfos = () => {
  //   const { email } = this.state;
  //   store.dispatch(login(email));
  // };

  render() {
    const { email, password, isDisabled } = this.state;
    const { dispatch, userEmail } = this.props;
    return (
      <main>
        <h1>LOGIN</h1>
        <form action="get">
          <input
            name="email"
            type="text"
            data-testid="email-input"
            placeholder="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <br />
          <input
            name="password"
            type="text"
            data-testid="password-input"
            placeholder="password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => dispatch(login(email)) }
          >
            Entrar
          </button>
          { userEmail ? <Redirect to="/carteira" /> : '' }
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Login.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
