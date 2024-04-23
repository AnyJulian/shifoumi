
  export const enregistrement = async (username2, password2) => {
    const resp = await fetch("http://fauques.freeboxos.fr:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username2,
      password: password2}),
    });
    if (resp.status === 409){
        console.log("Registration failed with 409, trying to login...");
        let loginResp = await login(username2, password2);
        return loginResp;
      }
    return await login(username2, password2);
  };

  export const login = async (username2, password2) => {
    const resp = await fetch("http://fauques.freeboxos.fr:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username2,
      password: password2}),
    });

    return resp.json();
  };