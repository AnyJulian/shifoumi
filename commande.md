npm init (server backend node web)
npm install express (framwork pour node)
npm start

eventsource pour le temms réel avec du node ( méthode get sur une route, cette route renvoie lors de son actualisation les infos de celles ci. En l'occurence pour notre projet shifoumi, le match renvoie les player qui join, les new_turn )

rest.http (pour faire les tests des calls api et avoir les résultats de tests en mêmet temps, restclient -> extention)

dans les fichier c'est écrit en js, pour faire le server de base:
server.js :

### initailisation du server
cont express = require("express");
const app = express();

const tasks = [
    { id: 1, title: "Task 1", done: False },
    { id: 2, title: "Task 2", done: True },
]

### pour faire les chemin
app.get("/", (req, res) => { 
    res.send("Hello Word!)
})

app.get("/tasks", (req, res) => {
    ### Select bdd
    res.json
})

app.post()

add.put()

add.delete()

### port d'écoute
app.listen(3000, () => {
    console.log("Server listen on port 3000")
})