import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches } from '../services/apiBackend';

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

  const renderTurns = (turns) => {
    return (
      <ul>
        {turns.map((turn, index) => (
          <li key={index}>
            {turn.user1} vs {turn.user2} : {turn.winner === 'draw' ? 'Draw' : turn.winner === turn.user1 ? 'User1 Wins' : 'User2 Wins'}
          </li>
        ))}
      </ul>
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



  return (
    <>
      <h1>Compte Utilisateur</h1>
      <Link to='/'>Home</Link>
      <Link to='/Matches'>Jouer</Link>
      <div>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index}>
              <h2>Match {index + 1}</h2>
              <p><strong>Adversaire:</strong> {match.user1.username === currentUser ? match.user2.username : match.user1.username}</p>
              <p><strong>Nombre de match gagné:</strong> {countWins(match)[currentUser]}</p>
              <p><strong>Historique des actions:</strong></p>
              {renderTurns(match.turns)}
            </div>
          ))
        ) : (
          <p>{matches.length === 0 ? 'Vous n\'avez jamais joué.' : 'Chargement des données...'}</p>
        )}
      </div>
    </>
  );
}

export default CompteUtilisateur;
