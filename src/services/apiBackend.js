
  export const enregistrement = async (register, username, password) => {
    const resp = await fetch("http://fauques.freeboxos.fr:3000/register", {
      method: "POST",
      headers: {
            "username": username,
            "password": password    
      },
      body: JSON.stringify(register),
    });
    return resp.json();
  };