import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { joinMatches } from '../services/apiBackend';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await joinMatches();
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
              <p><strong>Player 1:</strong> {match.user1.username}</p>
              <p><strong>Player 2:</strong> {match.user2 ? match.user2.username : "Waiting for player 2..."}</p>
              <p><strong>Turns:</strong></p>
              <ul>
                {match.turns.map((turn, idx) => (
                  <li key={idx}>Turn {idx + 1}: {turn}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </>
  );
}

export default Matches;
