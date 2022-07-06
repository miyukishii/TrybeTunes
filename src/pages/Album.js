import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistMusics: '',
      albumData: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { match } = this.props;
      const [albumData, ...artistMusics] = await getMusics(match.params.id);
      this.setState({
        artistMusics: [...artistMusics],
        albumData,
        loading: false,
      });
    });
  }

  render() {
    const { artistMusics, loading, albumData } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{albumData.artistName}</h2>
        <h3 data-testid="album-name">{albumData.collectionName}</h3>
        {artistMusics.map((music) => (
          <MusicCard
            key={ music.trackId }
            musicData={ music }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
