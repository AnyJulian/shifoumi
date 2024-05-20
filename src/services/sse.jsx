import React, { useEffect, useState } from 'react';
import { fetchEventSource } from "@microsoft/fetch-event-source";

const SubscribeMatchInfo = ({ setCurrentTurn, setPlayer1, setPlayer2 }) => {
  const [data, setData] = useState(null);
  const [currentTurn, setLocalCurrentTurn] = useState(null);
  const [localPlayer1, setLocalPlayer1] = useState(null);
  const [localPlayer2, setLocalPlayer2] = useState(null);
  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState(null);
  const storedIdMatch = localStorage.getItem('idMatch');
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource(`http://fauques.freeboxos.fr:3000/matches/${storedIdMatch}/subscribe`, {
        method: "GET",
        headers: {
          "Content-Type": "text/event-stream",
          'Authorization': `Bearer ${storedToken}`,
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection en temps réel - maintient du service ok");
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          const parsedData = JSON.parse(event.data);
          console.log("Received event:", parsedData);

          if (Array.isArray(parsedData)) {
            parsedData.forEach(item => {
              handleEvent(item);
            });
          } else {
            handleEvent(parsedData);
          }
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    };

    const handleEvent = (parsedData) => {
      if (parsedData.payload.turnId > 3) {
        return; // Stop updating if turn is greater than 3
      }
      switch (parsedData.type) {
        case 'PLAYER1_JOIN':
          setLocalPlayer1(parsedData.payload.user);
          setPlayer1(parsedData.payload.user); // Update the parent's state
          break;
        case 'PLAYER2_JOIN':
          setLocalPlayer2(parsedData.payload.user);
          setPlayer2(parsedData.payload.user); // Update the parent's state
          break;
        case 'NEW_TURN':
          setLocalCurrentTurn(parsedData.payload.turnId);
          setCurrentTurn(parsedData.payload.turnId); // Update the parent's state
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
          setLocalCurrentTurn(parsedData.payload.newTurnId);
          setCurrentTurn(parsedData.payload.newTurnId); // Update the parent's state
          break;
        case 'MATCH_ENDED':
          setWinner(parsedData.payload.winner);
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [storedIdMatch, storedToken, setCurrentTurn, setPlayer1, setPlayer2]);

  return (
    <div>
      {currentTurn !== null ? (
        <p>It's now turn {currentTurn}</p>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <h2>Players</h2>
        <p>Player 1: {localPlayer1 ? localPlayer1 : 'Waiting for player 1 to join...'}</p>
        <p>Player 2: {localPlayer2 ? localPlayer2 : 'Waiting for player 2 to join...'}</p>
      </div>
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
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default SubscribeMatchInfo;
