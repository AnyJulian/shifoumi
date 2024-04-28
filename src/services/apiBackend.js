
const apiCall = async (url, method, data) => {
  try {
    const resp = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (resp.status === 409) {
      return 409
      // console.log("Échec de l'inscription avec le code 409, tentative de connexion...");
      // const loginResp = await enregistrement("http://fauques.freeboxos.fr:3000/login", "POST", data);
      // return loginResp;
    }
    return resp.json();

  } catch (error) {
    console.error("Erreur lors de l'appel API :", error);
    throw error; // Gérer l'erreur en dehors de cette fonction
  }
};

export const enregistrement = async (url, method, data) => {
  const resp = apiCall (url, method, data);

  if (resp == 409) {
    console.log("Échec de l'inscription avec le code 409, tentative de connexion...");
    const loginResp = await enregistrement("http://fauques.freeboxos.fr:3000/login", "POST", data);
    console.log(loginResp)
  }
  else {
    console.log("Enregistrement en cours");
    const subResp = await enregistrement("http://fauques.freeboxos.fr:3000/login", "POST", data);
    console.log(subResp)
    const loginResp = await enregistrement("http://fauques.freeboxos.fr:3000/login", "POST", data);
    console.log(subResp)
  }
};
