let token;
import { setLastMatchIdToLocalStorage } from './lastIdMatch';

export const enregistrement = async (username2, password2, navigate) => {
  const resp = await fetch("http://fauques.freeboxos.fr:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username2, password: password2 }),
  });

  if (resp.status === 409) {
    console.log("Registration failed with 409, trying to login...");
    let loginResp = await login(username2, password2, navigate);
    return loginResp;
  }
  if (resp.ok) {
    const data = await resp.json();
    token = data.token; 
    
    localStorage.setItem('token', token); 
    navigate('/compteUtilisateur');
  }
  
  return await login(username2, password2, navigate);
};

export const login = async (username2, password2, navigate) => {
  const resp = await fetch("http://fauques.freeboxos.fr:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username2, password: password2 }),
  });

  if (resp.ok) {
    const data = await resp.json();
    token = data.token; 
    localStorage.setItem('token', token); 
    navigate('/compteUtilisateur');
  }

  return token;
};

export const getMatches = async () => {
  const storedToken = localStorage.getItem('token');
  
  const resp = await fetch("http://fauques.freeboxos.fr:3000/matches", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`, 
    },
  });

  return resp.json();
};

export const getMatcheInfo = async () => {
  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');
  
  try {
    const resp = await fetch(`http://fauques.freeboxos.fr:3000/matches/${storedidMatch}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storedToken}`, 
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();

    return data;
  } catch (error) {
    console.error("Error fetching match info:", error);
    throw error;
  }
};



export const joinMatchesAPI = async (attempt = 1) => {
  const storedToken = localStorage.getItem('token');
  let idMatch = localStorage.getItem('idMatch');
  
  if (idMatch) {
    console.log("Already joined a match.");
    return idMatch;
  }

  const resp = await fetch("http://fauques.freeboxos.fr:3000/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`, 
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    idMatch = data._id; 
    localStorage.setItem('idMatch', idMatch); 
    console.log(idMatch);
    return idMatch;
  }

  if (resp.status == 400 && attempt < 3) {
    console.log("Status 400: Trying to update local storage and retry...");
    await setLastMatchIdToLocalStorage();
    return joinMatchesAPI(attempt + 1);  // Relance la fonction avec une tentative augmentée
  }

  throw new Error('Failed to join match after 3 attempts.');
};


export const doTurn = async (turn, move) => {
  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');

  const resp = await fetch(`http://fauques.freeboxos.fr:3000/matches/${storedidMatch}/turns/${turn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`,
    },
    body: JSON.stringify({ move: move }),
  });

  return resp.json();
};
