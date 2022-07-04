import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameinput: '',
      buttonDisabled: true,
      loading: false,
      createNewUser: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInput(target));
  }

  verifyInput = (target) => {
    const minInputLength = 3;
    if (target.value.length >= minInputLength) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleButton = () => {
    this.setState({ loading: true }, async () => {
      const { nameinput } = this.state;
      await createUser({ name: nameinput });
      this.setState({
        loading: false,
        createNewUser: true,
      });
    });
  }

  render() {
    const { nameinput, buttonDisabled, loading, createNewUser } = this.state;
    return (
      <form className="login-section" data-testid="page-login">
        {loading && <Loading />}
        <label htmlFor="nameinput">
          Name
          <input
            data-testid="login-name-input"
            type="text"
            id="nameinput"
            name="nameinput"
            value={ nameinput }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ buttonDisabled }
          onClick={ this.handleButton }
        >
          Entrar
        </button>
        {createNewUser && <Redirect to="/search" />}
      </form>
    );
  }
}

export default Login;
