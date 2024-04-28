import { useState } from 'react';
import { Link } from 'react-router-dom'
import { enregistrement } from '../services/apiBackend';



function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await enregistrement("http://fauques.freeboxos.fr:3000/register", "POST", {
      username: username,
      password: password,
    });
    console.log(response);
  };
  return (
    <>
      <div>HomePage</div>
      <Link to='/compteutilisateur'>Compte</Link>
      <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="S'inscrire" />
    </form>
      

    </>

  )
}

export default HomePage