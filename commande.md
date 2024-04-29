npm init (server backend node web)
npm install express (framwork pour node)
npm start

rest.http (pour faire les tests des calls api et avoir les résultats de tests en mêmet temps, restclient)

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

### port d'écoute
app.listen(3000, () => {
    console.log("Server listen on port 3000")
})