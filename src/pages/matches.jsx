import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { joinMatchesAPI, doTurn, getMatcheInfo } from '../services/apiBackend';
import SubscribeMatchInfo from "../services/sse";
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
  const [InfoMatches, setInfoMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [turn, setTurn] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(null);

  const navigate = useNavigate();

  const handleMove = async (move) => {
    console.log("Faire un tour avec " + move);
    const data = await doTurn(turn, move);
    if (turn < 3) { 
      setTurn(turn + 1);
    }
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
      <Typography variant="h1" color="whitesmoke">Matche</Typography>
      <Link to='/compteUtilisateur'>Historique de matches</Link>
      <Typography color="whitesmoke">{matches}</Typography>
      <Typography color="whitesmoke">{InfoMatches}</Typography>
      <Typography color="whitesmoke">{currentPlayer}</Typography>

      <div>
        <h1>Match Details</h1>
        <p>ID: {match._id}</p>
        <h2>Players</h2>
        <p>User 1: {match.user1.username}</p>
        <p>User 2: {match.user2 && match.user2.username ? match.user2.username : "pas de 2ème joueur"}</p>
        <p>Opposent: {getOpponentUsername(match, currentPlayer)}</p>
        <h2>Vous êtes au tour : {turn}</h2>
      </div>
      
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImageLeaveDefault}
            hoverImage={ImageLeaveHappy}
            effect={() => handleMove('paper')}
            disabled={!isCurrentUserTurn}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImagescissorsDefault}
            hoverImage={ImagescissorsHappy}
            effect={() => handleMove('scissors')}
            disabled={!isCurrentUserTurn}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonEmote 
            defaultImage={ImagestoneDefault}
            hoverImage={ImagestoneHappy}
            effect={() => handleMove('rock')}
            disabled={!isCurrentUserTurn}
          />
        </Grid>
      </Grid>

      <SubscribeMatchInfo setCurrentTurn={setCurrentTurn} /> 

      <button onClick={supprimerIdMatch}>Supprimer idMatch</button>
    </>
  );
}

export default Matches;
