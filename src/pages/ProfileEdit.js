import React from 'react';
import Header from '../componentes/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      gotUser: false,
      isDisabled: true,
      name: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userData = await getUser();
    this.setState({
      userData,
      gotUser: true,
      name: userData.name,
    });
  }

  render() {
    const { userData, gotUser, isDisabled, name } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {gotUser
        && (
          <form className="edit-profile">
            <label htmlFor="name-input-edit">
              Nome:
              <input
                data-testid="edit-input-name"
                type="text"
                name="name-input-edit"
                id="name-input-edit"
                value={ name }
                placeholder="Digite o nome"
              />
            </label>
            <label
              data-testid="edit-input-email"
              htmlFor="email-input-edit"
            >
              E-mail:
              <input
                type="email"
                id="email-input-edit"
                name="email-input-edit"
                value={ userData }
                placeholder="Digite o e-mail"
              />
            </label>
            <label
              data-testid="edit-input-description"
              htmlFor="description-input-edit"
            >
              Descrição:
              <textarea
                type="textarea"
                id="description-input-edit"
                name="description-input-edit"
                placeholder="Digite uma breve descrição"
              />
            </label>
            <label
              data-testid="edit-input-image"
              htmlFor="image-input-edit"
            >
              Imagem:
              <input
                type="text"
                id="image-input-edit"
                name="image-input-edit"
                placeholder="Anexe uma foto"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onChange={ () => {} }
            >
              Salvar alterações
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
