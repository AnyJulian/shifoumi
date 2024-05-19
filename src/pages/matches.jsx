import ImageLeaveDefault from '../img/leave_default.png';
import ImageLeaveHappy from '../img/leave_happy.png';
import ImagescissorsDefault from '../img/scissors_default.png';
import ImagescissorsHappy from '../img/scissors_happy.png';
import ImagestoneDefault from '../img/stone_default.png';
import ImagestoneHappy from '../img/stone_happy.png';
import React, { useState, useEffect } from 'react';
import ButtonEmote from "../assets/buttonEmote";
import { Link } from 'react-router-dom';
import { joinMatchesAPI, doTurn, getMatcheInfo } from '../services/apiBackend';
import SubscribeMatchInfo from "../services/sse";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import currentUser from "../services/currentUser"


function Matches() {

  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');

  const [match, setMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [InfoMatches, setInfoMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [turn, setTurn] = useState(1);

  const handleMove = async (move) => {
    console.log("Faire un tour avec " + move)
    const data = await doTurn(turn, move);
    return data;
  };

  const navigate = useNavigate();

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

  return (
    <>
      <Typography variant="h1" color="whitesmoke">Matche</Typography>
      <Link to='/compteUtilisateur'>Historique de matches</Link>
      <Typography color="whitesmoke">{matches}</Typography>
      <Typography color="whitesmoke">{InfoMatches}</Typography>
      <Typography color="whitesmoke">{currentUser()}</Typography>
      
      <div>
      <h1>Match Details</h1>
      <p>ID: {match._id}</p>
      <h2>Players</h2>
      <p>User 1 : {match.user1.username}</p>
      <p>User 2 : {match.user2 && match.user2.username ? match.user2.username : "pas de 2ème joueur"}</p>
      <p>Opposent : {getOpponentUsername(match, currentUser())}</p>
    </div>
      <div>
      </div>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <ButtonEmote 
              defaultImage={ImageLeaveDefault}
              hoverImage={ImageLeaveHappy}
              effect={() => handleMove('paper')}
            />
          </Grid>
          <Grid xs={4}>
            <ButtonEmote 
              defaultImage={ImagescissorsDefault}
              hoverImage={ImagescissorsHappy}
              effect={() => handleMove('scissors')}
            />
          </Grid>
          <Grid xs={4}>
            <ButtonEmote 
              defaultImage={ImagestoneDefault}
              hoverImage={ImagestoneHappy}
              effect={() => handleMove('rock')}
            />
          </Grid>
        </Grid>
        <button onClick={() => setTurn(turn + 1)}>Tour plus 1</button>     
        <button onClick={() => setTurn(turn - 1)}>Tour moins 1</button>
        <p>{turn}</p>
        <SubscribeMatchInfo/> 

        <button onClick={supprimerIdMatch}>Supprimer idMatch</button>
        {/* <SubscribeMatche/>    */}
    </>
  );
}

export default Matches;
