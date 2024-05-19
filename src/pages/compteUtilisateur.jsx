import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/apiBackend';
import MatchList from '../assets/matchesList';
import ButtonPlay from "../assets/buttonPlay";
import { Box, Typography, Link } from '@mui/material';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed', // Ajoutez cette ligne
    bottom: '8%', // Ajoutez cette ligne
    width: '80vh', // Ajoutez cette ligne
    zIndex: 1,
  },
};

const texteMain = "#fffffe"
const texteParagraph = "#a7a9be"

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
      <Typography variant='h1' color={texteMain}>Bienvenue {currentUser}</Typography>
      <Typography variant='h3' color={texteMain}>Historique de matchs</Typography>
      <Link variant='subtitle2' color={texteParagraph} href='/' >Changer d'utilisateur</Link>
      <MatchList matches={matches} currentUser={currentUser} />
      <div style={styles.container}>
        <ButtonPlay title='Jouer' chemin='/Matches'/>
      </div>
    </>
  );
}

export default CompteUtilisateur;
