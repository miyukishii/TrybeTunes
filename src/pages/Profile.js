import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import { getUser } from '../services/userAPI';
import Loading from '../componentes/Loading';
import blankProfile from '../images/blank-profile.png';

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
    const { name, email, description } = userData;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? (<Loading />)
          : (
            <div className="profile-container">
              <div className="profile-section">
                <h2>{ name }</h2>
                <img
                  data-testid="profile-image"
                  id="profile-image"
                  className="profile-image"
                  src={ blankProfile }
                  alt={ name }
                />
                <h3>
                  E-mail:
                  {' '}
                  { email }
                </h3>
                <h3>
                  Description:
                  {' '}
                  { description }
                </h3>
                <Link to="/profile/edit">
                  <p className="edit-button">Edit profile</p>
                </Link>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
