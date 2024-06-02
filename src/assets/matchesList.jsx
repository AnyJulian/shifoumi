import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';


const MatchList = ({ matches, currentUser }) => {

    const getMatchStyles = (match, currentUser) => {
        if (!match.winner) {
            return {
                background: 'rgba(255, 255, 255, 0.21)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.7px)',
                WebkitBackdropFilter: 'blur(6.7px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color:'white',
                marginTop:'5px'
            };
        } else if (match.winner.username === currentUser) {
            return {
                background: 'rgba(255, 137, 6, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.7px)',
                WebkitBackdropFilter: 'blur(6.7px)',
                border: '1px solid rgba(255, 137, 6, 0.4)',
                color:'white',
                marginTop:'5px'
            };
        } else {
            return {
                background: 'rgba(229, 49, 112, 0.42)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.7px)',
                WebkitBackdropFilter: 'blur(6.7px)',
                border: '1px solid rgba(229, 49, 112, 0.4)',
                color:'white',
                marginTop:'5px'
            };
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
        <div style={{ width: "80vh", paddingBottom: '34%' }}>
            {matches.length > 0 ? (
                matches.map((match) => (
                    <Accordion key={match._id} sx={getMatchStyles(match, currentUser)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={match._id}
                            id={match._id}
                        >
                            Adversaire : {getOpponentUsername(match, currentUser)}
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>Vainqueur : {match.winner ? match.winner.username : "Match non joué"}</p>
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
                <Typography sx={{ fontFamily: 'Montserrat', textAlign:'center' }}>{matches.length === 0 ? 'Aucun match joué chef.' : 'Chargement des données...'}</Typography>
            )}
        </div>
    );
};

export default MatchList;
