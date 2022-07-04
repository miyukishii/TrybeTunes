import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { collectionId, artistName, collectionName, artworkUrl100 } = this.props;
    return (
      <div>
        <h2>{ collectionName }</h2>
        <h3>{ artistName }</h3>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          See album
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
