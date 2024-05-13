import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { joinMatchesAPI, doTurn } from '../services/apiBackend';
import SubscribeMatche from "../services/subscribe";


function Matches() {

  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [turn, setTurn] = useState(1);

  const handleMove = async (move) => {
    const data = await doTurn(turn, move);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await joinMatchesAPI();
        setMatches([data]); // Les matches doivent être un tableau
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Matches</h1>
      <Link to='/'>Home</Link>
      <div>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h2>Match {index + 1}</h2>
              {match.user1 && <p><strong>Vous êtes:</strong> {match.user1.username}</p>}
              {match.user2 && <p><strong>Votre adversaire est:</strong> {match.user2.username}</p>}
              {match.turns && <p><strong>Numéro du tour:</strong> {match.turns.length + 1}</p>}
            </div>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>
        <div>
          <button onClick={() => handleMove('rock')}>Rock</button>
          <button onClick={() => handleMove('paper')}>Paper</button>
          <button onClick={() => handleMove('scissors')}>Scissors</button>
        </div>
        <button onClick={() => setTurn(turn + 1)}>Tour plus 1</button>     
        <button onClick={() => setTurn(turn - 1)}>Tour moins 1</button>
        <p>{turn}</p>     
        {/* <SubscribeMatche/>    */}
    </>
  );
}

export default Matches;
