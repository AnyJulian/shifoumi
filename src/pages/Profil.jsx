import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches } from '../services/apiBackend';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';


export default function AccordionUsage() {
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
  
    const renderTurns = (turns) => {
      return (
        <>
          <ul>
            {turns.map((turn, index) => (
              <li key={index}>
                {turn.user1} vs {turn.user2} : {turn.winner === 'draw' ? 'Draw' : turn.winner === turn.user1 ? 'User1 Wins' : 'User2 Wins'}
              </li>
            ))}
          </ul>
        </>
      );
    };
  
    const countWins = (match) => {
      let user1Wins = 0;
      let user2Wins = 0;
  
      match.turns.forEach(turn => {
        if (turn.winner === match.user1.username) {
          user1Wins++;
        } else if (turn.winner === match.user2.username) {
          user2Wins++;
        }
      });
  
      return {
        user1: user1Wins,
        user2: user2Wins
      };
    };
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

    function getBackgroundColor(wins) {
        switch (wins) {
          case 2:
            return 'green';
          case 1:
            return 'orange';
          case 0:
            return 'red';
          default:
            return 'gray';
        }
      }

  return (
    <>
        <h1>Historique de matchs</h1>
        <Link to='/'>Home</Link>
        <Link to='/Matches'>Jouer</Link>
        <Link to='/profil'>Go profil</Link>
        <Paper >
        {matches.length > 0 ? (
            matches.map((match, index) => (
            <Accordion key={index} sx={{ bgcolor: getBackgroundColor(countWins(match)[currentUser]) }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={index}
                id={index}
                >
                Match numéro {index + 1}
                </AccordionSummary>
                <AccordionDetails>
                    <p><strong>Adversaire:</strong> {match.user1.username === currentUser ? match.user2.username : match.user1.username}</p>
                    <p><strong>Nombre de match gagné:</strong> {countWins(match)[currentUser]}</p>
                    <p><strong>Historique des actions:</strong></p>
                    {renderTurns(match.turns)}
                </AccordionDetails>
            </Accordion>
            ))
        ) : (
            <p>{matches.length === 0 ? 'Vous n\'avez jamais joué.' : 'Chargement des données...'}</p>
        )}
        </Paper>
    </>
  );
}