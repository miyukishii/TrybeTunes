import React from 'react';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../componentes/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesList: [],
    };
  }

  componentDidMount() {
    this.fetchFavoritesSongs();
  }

  fetchFavoritesSongs = async () => {
    this.setState({ loading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoritesList: [...favorites],
        });
      });
  }

  render() {
    const { loading, favoritesList } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="favorites-container">
          <h2 className="page-title">Favorites songs</h2>
          {favoritesList.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicData={ music }
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Favorites;
