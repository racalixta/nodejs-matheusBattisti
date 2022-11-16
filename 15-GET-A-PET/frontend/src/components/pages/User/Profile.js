import { useEffect, useState } from 'react';
import api from '../../../utils/api';

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'

import Input from '../../form/Input';

function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') ||'');
  
  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data);
    })

  }, [token])

  function onFileChange(e) {

  }
  
  function onHandleChange(e) {

  }


  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        <p>Preview image</p>
      </div>

      <form className={formStyles.form_container}>

        <Input 
          text="Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />

        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={onHandleChange}
          value={user.email || ''}
        />

        <Input 
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={onHandleChange}
          value={user.name || ''}
        />

        <Input 
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={onHandleChange}
          value={user.phone || ''}
        />

        <Input 
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={onHandleChange}
        />

        <Input 
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={onHandleChange}
        />

        <input type="submit" value="Editar" />

      </form>
    </section>
  )
}

export default Profile;
