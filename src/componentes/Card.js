import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { albums, artist } = this.props;
    return (
      <div>
        { (albums.length === 0)
          ? <p className="search-result-none">Nenhum álbum foi encontrado</p>
          : (
            <div className="albums-section">
              <p className="search-result">
                Resultado de álbuns de:
                { ` ${artist}` }
              </p>
              <div className="albums">
                {albums.map((album) => (
                  <div key={ album.collectionId } className="album-card">
                    <h3>{ album.collectionName }</h3>
                    <p>{ album.artistName }</p>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                      className="album-info"
                    >
                      See album
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Card.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default Card;
