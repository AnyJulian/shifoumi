import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Modal, CircularProgress } from '@mui/material';
import { joinMatchesAPI, doTurn, getMatcheInfo } from '../services/apiBackend';
import subscribeToMatchInfo from "../services/sse";
import currentUser from "../services/currentUser";
import ButtonEmote from "../assets/buttonEmote";
import ImageLeaveDefault from '../img/leave_default.png';
import ImageLeaveHappy from '../img/leave_happy.png';
import ImagescissorsDefault from '../img/scissors_default.png';
import ImagescissorsHappy from '../img/scissors_happy.png';
import ImagestoneDefault from '../img/stone_default.png';
import ImagestoneHappy from '../img/stone_happy.png';

function Matches() {
  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');

  const [match, setMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [turn, setTurn] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState(null);

  const navigate = useNavigate();

  const handleMove = async (move) => {
    console.log("Faire un tour avec " + move);
    const data = await doTurn(currentTurn, move);
    return data;
  };

  const supprimerIdMatch = () => {
    localStorage.removeItem("idMatch");
    navigate('/compteUtilisateur');
  };

  const getOpponentUsername = (match, currentUser) => {
    if (match.user1 && match.user2) {
      return match.user1.username !== currentUser ? match.user1.username : match.user2.username;
    } else {
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await joinMatchesAPI();
        const matchData = await getMatcheInfo();
        setMatches([data]);
        setMatch(matchData);
      } catch (error) {
        console.error('Error fetching idMatch:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleEvent = (parsedData) => {
      if (parsedData.payload.turnId > 3) {
        return; // Stop updating if turn is greater than 3
      }
      switch (parsedData.type) {
        case 'PLAYER1_JOIN':
          setPlayer1(parsedData.payload.user);
          break;
        case 'PLAYER2_JOIN':
          setPlayer2(parsedData.payload.user);
          break;
        case 'NEW_TURN':
          setCurrentTurn(parsedData.payload.turnId);
          break;
        case 'PLAYER1_MOVED':
        case 'PLAYER2_MOVED':
          setMoves((prevMoves) => [
            ...prevMoves,
            {
              player: parsedData.type === 'PLAYER1_MOVED' ? 'player1' : 'player2',
              turn: parsedData.payload.turn,
            },
          ]);
          break;
        case 'TURN_ENDED':
          setCurrentTurn(parsedData.payload.newTurnId);
          break;
        case 'MATCH_ENDED':
          setWinner(parsedData.payload.winner);
          break;
        default:
          break;
      }
    };

    subscribeToMatchInfo({ storedIdMatch: storedidMatch, storedToken, handleEvent });
  }, [storedidMatch, storedToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const currentPlayer = currentUser();
  const isCurrentUserTurn = (currentTurn === turn);

  return (
    <>
      <Link to='/compteUtilisateur'>Historique de matches</Link>
      <Typography variant="h1" color="whitesmoke">Matche contre {getOpponentUsername(match, currentPlayer)}</Typography>

      <Modal
        open={!player2}
        aria-labelledby="waiting-modal-title"
        aria-describedby="waiting-modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.7)"
        >
          <Box
            bgcolor="background.paper"
            p={4}
            borderRadius={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="waiting-modal-title" variant="h6" component="h2">
              {player2 ? 'Joueur trouvé!' : 'En attente de joueurs...'}
            </Typography>
            {!player2 && <CircularProgress />}
          </Box>
        </Box>
      </Modal>

      <div>
        <p>User 2: {player2 ? player2 : "Waiting for player 2 to join..."}</p>
        <p>Opposent: {getOpponentUsername(match, currentPlayer)}</p>
        <h2>Vous êtes au tour : {currentTurn <= 3 ? currentTurn : 3}</h2>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImageLeaveDefault}
            hoverImage={ImageLeaveHappy}
            effect={() => handleMove('paper')}
            disabled={!isCurrentUserTurn || currentTurn > 3}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImagescissorsDefault}
            hoverImage={ImagescissorsHappy}
            effect={() => handleMove('scissors')}
            disabled={!isCurrentUserTurn || currentTurn > 3}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImagestoneDefault}
            hoverImage={ImagestoneHappy}
            effect={() => handleMove('rock')}
            disabled={!isCurrentUserTurn || currentTurn > 3}
          />
        </Grid>
      </Grid>

      <button onClick={supprimerIdMatch}>Arrêter le match</button>

      <div>
        <h2>Moves</h2>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>
              {move.player} moved on turn {move.turn}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Winner</h2>
        <p>{winner ? winner : 'No winner yet'}</p>
      </div>
    </>
  );
}

export default Matches;
