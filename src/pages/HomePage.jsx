import React, { useState } from "react";
import { enregistrement } from "../services/apiBackend";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password)
    const response = await enregistrement(username, password, navigate);
    if (!response) {
      console.log("Login failed");
    }
  };
  
  return (
    <>
      <div>HomePage</div>
      <Link to='/compteUtilisateur'>Compte</Link>
      <Link to='/connexion'>Connexion</Link>
      <form onSubmit={(event) => handleSubmit(event)}>
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

export default HomePage;
