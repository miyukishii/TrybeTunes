import React from 'react';
import Header from '../componentes/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>componente Profile</p>
      </div>
    );
  }
}

export default Profile;
