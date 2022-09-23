import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../componentes/Loading';
import audio from '../images/audio.png';

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
    if (loading) {
      return <Loading />;
    }
    return (
      <main className="login-section">
        <form className="login-form" data-testid="page-login">
          <img src={ audio } alt="audio icon" className="login-icon" />
          <h1>Trybe Tunes</h1>
          <input
            className="input-text"
            data-testid="login-name-input"
            type="text"
            id="nameinput"
            name="nameinput"
            placeholder="Type your name"
            value={ nameinput }
            onChange={ this.handleChange }
          />

          <button
            className="login-button"
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleButton }
          >
            Entrar
          </button>
          {createNewUser && <Redirect to="/search" />}
        </form>
      </main>
    );
  }
}

export default Login;
