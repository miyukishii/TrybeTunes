import React from 'react';
import Header from '../componentes/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>componente Album</p>
      </div>
    );
  }
}

export default Album;
