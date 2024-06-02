import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/apiBackend';
import MatchList from '../assets/matchesList';
import ButtonPlay from "../assets/buttonPlay";
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed', 
    bottom: '8%',
    width: '80vh', 
    zIndex: 1,
  },
};

const texteMain = "#fffffe"
const texteParagraph = "#a7a9be"

function CompteUtilisateur() {

  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      <Box display="flex" sx={{ color:texteParagraph }}>
        <KeyboardDoubleArrowLeftIcon />
        <Link variant='subtitle2' color={texteParagraph} onClick={() => (navigate(`/connexion`))} >Changer d'utilisateur</Link>
      </Box>
      <Box sx={{my:10}}>
        <Typography sx={{ fontFamily: 'Montserrat', textAlign:'center' }} variant='h1' color={texteMain}>Bienvenue {currentUser}</Typography>
        <Typography sx={{ fontFamily: 'Montserrat', textAlign:'center' }} variant='h4' color={texteMain}>Votre historique de matchs</Typography>
      </Box>
      <MatchList matches={matches} currentUser={currentUser} />

      <div style={styles.container}>
        <ButtonPlay title='Jouer' chemin='/Matches'/>
      </div>
    </>
  );
}

export default CompteUtilisateur;
