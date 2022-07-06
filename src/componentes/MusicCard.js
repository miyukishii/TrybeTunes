import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
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
      console.log(favoritesResult);
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
      // console.log(music);
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
          htmlFor={ musicData.trackName }
        >
          Favorita
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
    );
  }
}

MusicCard.propTypes = {
  // favoritesMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
