import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MatchList = ({ matches }) => {

  return (
    <div style={{width:"80vh"}}>
    {matches.length > 0 ? (
      matches.map((match) => (
        <Accordion key={match._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={match._id}
                id={match._id}
                >
                Match id {match._id}
            </AccordionSummary>
            <AccordionDetails>
            <h3>Players:</h3>
            <p>User 1: {match.user1 ? match.user1.username : "Unknown"}</p>
            <p>User 2: {match.user2 ? match.user2.username : "Unknown"}</p>
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
