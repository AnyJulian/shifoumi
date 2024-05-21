import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MatchList = ({ matches, currentUser }) => {

    const getBackgroundColor = (match, currentUser) => {
        if (!match.winner) {
            return "#B5B5B5"; // Match non joué
        } else if (match.winner.username === currentUser) {
            return "#ff8906"; // Match gagné par currentUser
        } else {
            return "#e53170"; // Match perdu par currentUser
        }
    };

    const getOpponentUsername = (match, currentUser) => {
        if (match.user1 && match.user2) {
            return match.user1.username !== currentUser ? match.user1.username : match.user2.username;
        } else {
            return "Unknown";
        }
    };
    

  return (
    <div style={{width:"80vh"}}>
    {matches.length > 0 ? (
      matches.map((match) => (
        <Accordion key={match._id} sx={{ bgcolor: getBackgroundColor(match, currentUser) }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={match._id}
                id={match._id}
                >
                Match id {match._id}
            </AccordionSummary>
            <AccordionDetails>
            <h3>Adversaire:</h3>
            <p>{getOpponentUsername(match, currentUser)}</p>
            <p>Winner: {match.winner ? match.winner.username : "Match non joué"}</p>
            <div>
                <h3>Turns:</h3>
                <ul>
                {match.turns.map((turn, index) => (
                    <li key={index}>
                    {turn.user1} vs {turn.user2} - Winner: {turn.winner}
                    </li>
                ))}
                </ul>
            </div>
            </AccordionDetails>
        </Accordion>
      ))
    ) : (
        <p>{matches.length === 0 ? 'Vous n\'avez jamais joué.' : 'Chargement des données...'}</p>
    )}
  </div>
  );
};

export default MatchList;
