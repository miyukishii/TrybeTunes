import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSong: false,
      favoritesMusics: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  verifyFavorites = () => {
    const { favoritesMusics } = this.state;
    const { musicData } = this.props;
    const isFavorite = favoritesMusics.some((song) => song.trackId === musicData.trackId);
    if (isFavorite) {
      this.setState({
        favoriteSong: true,
      });
    }
  }

  fetchFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoritesResult = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoritesMusics: favoritesResult,
      });
      this.verifyFavorites();
    });
  }

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState({
      loading: true,
    }, async () => {
      const { favoriteSong } = this.state;
      const music = await getMusics(id);
      this.fetchFavorites();
      if (!favoriteSong) {
        await addSong(...music);
        this.setState({
          loading: false,
          favoriteSong: true,
        });
      } else {
        await removeSong(...music);
        this.fetchFavorites();
        this.setState({
          loading: false,
          favoriteSong: false,
        });
      }
    });
  }

  render() {
    const { musicData } = this.props;
    const { loading, favoriteSong } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="favorites">
        <p>{ musicData.trackName }</p>
        <div className="song-infos">

          <img src={ musicData.artworkUrl100 } alt={ musicData.collectionName } />

          <audio
            className="track-player"
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
            htmlFor={ musicData.trackName }
          >
            Favorite
            <input
              data-testid={ `checkbox-music-${musicData.trackId}` }
              type="checkbox"
              id={ musicData.trackId }
              name="favoriteSong"
              checked={ favoriteSong }
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
