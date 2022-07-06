import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistMusics: '',
      item: '',
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
      const [item, ...artistMusics] = await getMusics(match.params.id);
      this.setState({
        artistMusics: [...artistMusics],
        item,
        loading: false,
      });
    });
  }

  render() {
    const { artistMusics, loading, item } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{item.artistName}</h2>
        <h3 data-testid="album-name">{item.collectionName}</h3>
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
