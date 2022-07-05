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
    this.setState({
      loading: true,
    }, async () => {
      const { favoriteSong } = this.state;
      if (!favoriteSong) {
        await addSong(target.name);
        this.setState({
          loading: false,
          favoriteSong: true,
        });
      } else {
        await removeSong(target.name);
        this.setState({
          loading: false,
          favoriteSong: false,
        });
      }
    });
  }

  render() {
    const { music } = this.props;
    const { loading, favoriteSong } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ music.trackName }</p>
        <audio
          data-testid="audio-component"
          src={ music.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          data-testid={ `checkbox-music-${music.trackId}` }
          htmlFor={ music.trackName }
        >
          Favorita
          <input
            type="checkbox"
            id={ music.trackName }
            name={ music.trackName }
            checked={ favoriteSong }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
