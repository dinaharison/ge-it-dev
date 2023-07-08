//importations des dépendences
var express = require("express");
var bodyParser = require('body-parser');
const path = require("path");
var helmet = require('helmet');

//création du serveur
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.set('view engine', 'hbs');
app.use("/public", express.static(path.join(__dirname,"/public")));

//page d'accueil
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "/vues/index.hbs"));
});

//référence aux routes de la page séminaire
const seminaireRoute = require(path.join(__dirname, "/routes/Seminaire"));
app.use("/seminaire", seminaireRoute);

//référence aux routes de la page personne
const personneRoute = require(path.join(__dirname, "/routes/Personne"));
app.use("/personne", personneRoute);

//référence aux routes de la page animation
const animationRoute = require(path.join(__dirname, "/routes/Animation"));
app.use("/animation", animationRoute);

//lancement du serveur
const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Serveur en marche sur le port : " + HTTP_PORT);
});