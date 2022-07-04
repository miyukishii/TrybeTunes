/* eslint-disable react/jsx-indent-props */
import React from 'react';
// import AlbumSearch from '../componentes/AlbumSearch';
import Card from '../componentes/Card';
import Header from '../componentes/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchinput: '',
      artist: '',
      buttonDisabled: true,
      loading: false,
      artistAlbum: [],
      findAlbum: false,
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
    console.log(artistAlbum);
    this.setState({
      artist: searchinput,
      searchinput: '',
      loading: false,
      artistAlbum,
      findAlbum: true,
      buttonDisabled: true,
    });
  }

  handleButton = () => {
    const { searchinput } = this.state;
    this.setState({
      loading: true,
    }, async () => this.fetchAlbums(searchinput));
  }

  render() {
    const { searchinput,
      buttonDisabled, loading, findAlbum, artistAlbum,
      artist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {!loading
        && (
          <form className="seachForm">
            <label htmlFor="searchinput">
              Name
              <input
                data-testid="search-artist-input"
                type="text"
                id="searchinput"
                placeholder="Digite o nome do artista"
                name="searchinput"
                value={ searchinput }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.handleButton }
            >
              Pesquisar
            </button>
          </form>
        )}
        { (artistAlbum.length === 0 && findAlbum)
          ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div className="albums-section">
              <p>
                Resultado de álbuns de:
                { ` ${artist}` }
              </p>
              {artistAlbum.map(({
                collectionId,
                artistName,
                collectionName,
                artworkUrl100,
              }) => (
                <Card
                  key={ collectionId }
                  collectionId={ collectionId }
                  artistName={ artistName }
                  collectionName={ collectionName }
                  artworkUrl100={ artworkUrl100 }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
