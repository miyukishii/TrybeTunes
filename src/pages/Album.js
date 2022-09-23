import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistMusics: [],
      albumData: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const [albumData, ...artistMusics] = await getMusics(match.params.id);
    this.setState({
      artistMusics: [...artistMusics],
      albumData,
    });
  }

  render() {
    const { artistMusics, albumData } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="songs-container">
          <div className="page-title">
            <h2 data-testid="artist-name">{albumData.artistName}</h2>
            <h3 data-testid="album-name">{albumData.collectionName}</h3>
          </div>
          {artistMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicData={ music }
            />
          ))}
        </div>
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
