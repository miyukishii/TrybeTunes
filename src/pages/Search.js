import React from 'react';
import Card from '../componentes/Card';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchinput: '',
      artist: '',
      buttonDisabled: true,
      gotAlbums: false,
      artistAlbum: [],

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

  fetchAlbums = async (searchinput) => {
    const artistAlbum = await searchAlbumsAPI(searchinput);
    this.setState({
      artist: searchinput,
      searchinput: '',
      gotAlbums: false,
      artistAlbum,
      buttonDisabled: true,
    });
  };

  handleButton = () => {
    const { searchinput } = this.state;
    this.setState({
      gotAlbums: true,
    }, async () => this.fetchAlbums(searchinput));
  }

  render() {
    const {
      artist,
      artistAlbum,
      searchinput,
      buttonDisabled,
      gotAlbums,
    } = this.state;

    return (
      <div data-testid="page-search" className="page">
        <Header />
        <section className="search-section">
          <form className="searchForm">
            <input
              className="input-text"
              data-testid="search-artist-input"
              type="text"
              id="searchinput"
              placeholder="Search for an artist"
              name="searchinput"
              value={ searchinput }
              onChange={ this.handleChange }
            />
            <button
              className="search-button"
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.handleButton }
            >
              Pesquisar
            </button>
          </form>
          { gotAlbums
            ? <Loading />
            : (
              <Card
                albums={ artistAlbum }
                artist={ artist }
              />)}
        </section>
      </div>);
  }
}

export default Search;
