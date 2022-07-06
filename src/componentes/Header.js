import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        user: name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component" className="header-section">
        {loading && <Loading />}
        {user
        && (
          <h2 data-testid="header-user-name">
            <div className="render-login-name">
              <p>Olá, </p>
              <p>{ user }</p>
              <p> :) </p>
            </div>
          </h2>)}
        <nav className="nav-bar">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
