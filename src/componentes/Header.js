import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      gotUser: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name } = await getUser();
    this.setState({
      user: name,
      gotUser: true,
    });
  }

  render() {
    const { user, gotUser } = this.state;
    if (!gotUser) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component" className="header-section">
        <h2 data-testid="header-user-name">
          <div className="render-login-name">
            <h3>
              Hello,
              {' '}
              {gotUser ? user : ''}
              {' '}
              :)
            </h3>
          </div>
        </h2>

        <nav className="nav-bar">
          <Link
            style={ { textDecoration: 'none' } }
            to="/search"
            data-testid="link-to-search"
          >
            <p className="nav-link">Search</p>
          </Link>
          <Link
            style={ { textDecoration: 'none' } }
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <p className="nav-link">Favorites</p>
          </Link>
          <Link
            style={ { textDecoration: 'none' } }
            to="/profile"
            data-testid="link-to-profile"
          >
            <p className="nav-link">Profile</p>
          </Link>
        </nav>

      </header>
    );
  }
}

export default Header;
