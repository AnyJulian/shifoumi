import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches } from '../services/apiBackend';
import MatchList from '../assets/matchesList';
import ButtonPlay from "../assets/buttonPlay";


function CompteUtilisateur() {

  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
          throw new Error('No token found');
        }

        const user = JSON.parse(atob(userToken.split('.')[1]));
        setCurrentUser(user.username);

        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Compte Utilisateur</h1>
      <Link to='/'>Home</Link>
      <Link to='/Matches'>Jouer</Link>
      <Link to='/profil'>Go profil</Link>
      {/* <ButtonPlay title='Jouer' chemin='/Matches'/> */}
      <div>
      <div>
        <h1>Liste des matchs de {currentUser}</h1>
        <MatchList matches={matches} />
      </div>
      </div>
    </>
  );
}

export default CompteUtilisateur;
