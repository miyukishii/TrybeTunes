import React from 'react';
import Header from '../componentes/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchinput: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      searchinput: target.value,
    }, this.verifyInput({ target }));
  }

  verifyInput = ({ target }) => {
    const minInputLength = 2;
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

  render() {
    const { searchinput, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchinput">
            Name
            <input
              data-testid="search-artist-input"
              type="text"
              id="searchinput"
              name="searchinput"
              value={ searchinput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ () => {} }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
