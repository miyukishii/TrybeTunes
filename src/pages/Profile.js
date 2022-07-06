import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const userData = await getUser();
      this.setState({
        loading: false,
        userData,
      });
    });
  }

  render() {
    const { loading, userData } = this.state;
    const { name, email, description, image } = userData;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        <h3>{ name }</h3>
        <p>{ email }</p>
        <p>{ description }</p>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    );
  }
}

export default Profile;
