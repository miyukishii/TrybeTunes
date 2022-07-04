import React from 'react';
import Header from '../componentes/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>componente Favorites</p>
      </div>
    );
  }
}

export default Favorites;
