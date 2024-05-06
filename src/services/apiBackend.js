let token;

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

export const joinMatchesAPI = async () => {
  const storedToken = localStorage.getItem('token');
  let idMatch;
  
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
    console.log(idMatch)
  }
 

  return idMatch;
};

///fonction faire un tour, avec comme parametre, numéro du tour, id du match, body move du tour