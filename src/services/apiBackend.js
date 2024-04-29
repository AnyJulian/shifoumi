let token; 

export const enregistrement = async (username2, password2) => {
  const resp = await fetch("http://fauques.freeboxos.fr:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username2, password: password2 }),
  });

  if (resp.status === 409) {
    console.log("Registration failed with 409, trying to login...");
    let loginResp = await login(username2, password2);
    return loginResp;
  }
  if (resp.ok) {
    const data = await resp.json();
    token = data.token; 
    window.location.href = "/compteUtilisateur";
    localStorage.setItem('token', token); 
  }
  return await login(username2, password2);
};

export const login = async (username2, password2) => {
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
    window.location.href = "/compteUtilisateur";
    localStorage.setItem('token', token); 
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
