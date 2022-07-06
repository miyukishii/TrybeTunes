import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSong: false,
    };
  }

  handleChange = ({ target }) => {
    const { id, checked } = target;
    this.setState({
      loading: true,
      favoriteSong: checked,
    }, async () => {
      const { favoriteSong } = this.state;
      if (favoriteSong) {
        await addSong(id);
        this.setState({
          loading: false,
        });
      } else {
        await removeSong(id);
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { musicData } = this.props;
    const { loading, favoriteSong } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ musicData.trackName }</p>
        <audio
          data-testid="audio-component"
          src={ musicData.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          data-testid={ `checkbox-music-${musicData.trackId}` }
          htmlFor={ musicData.trackName }
        >
          Favorita
          <input
            type="checkbox"
            id={ musicData.trackId }
            name={ musicData.trackName }
            checked={ favoriteSong }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
//   favoriteList: PropTypes.arrayOf(PropTypes.object).isRequired,
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
