
const apiCall = async (url, method, data) => {
  const resp = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.body.json())
  .then(myJson=> console.log(myJson))
return myJson
};

export const enregistrement = async (url, method, data) => {
  console.log("Enregistrement en cours ...");

  const resp = await apiCall (url, method, data);

  console.log("retour api avant vérification : ", resp)
  console.log("resp.error : ", resp.error)


  if (resp.error === "User already exists") {
    console.log("Échec de l'inscription, le compte existe déjà, tentative de connexion...");
    const loginResp = await apiCall("http://fauques.freeboxos.fr:3000/login", method, data);
    console.log("réponse api (login): ", loginResp)
  }
  else {
    console.log("réponse api (register) : ", resp)
  }
};
