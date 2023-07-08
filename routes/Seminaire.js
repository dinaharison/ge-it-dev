const express = require('express');
const router = express.Router();
const path = require("path");

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("seminaire.db");

//seminaire accueil
router.get("/", (req, res) => {
    renderSeminaire(res);
});

//ajouter nouveau seminaire
router.post("/", (req, res) => {
    let querry = "INSERT INTO seminaire(nom_seminaire, id_personne) values(?,?)";
    db.serialize(() => {
        db.run(querry, [req.body.nom, req.body.prenom], err => {
            if (err) throw err;
            renderSeminaire(res);
        })
    })
});

//supprimer un seminaire
router.get("/:id", (req, res) => {
    let querry = "DELETE FROM seminaire WHERE id_seminaire = ?";
    db.serialize(() => {
        db.run(querry, [req.params.id], err => {
            if (err) throw err;
            renderSeminaire(res);
        })
    })
});

//modifier un seminaire
router.get("/:id/:nom/:resp", (req, res) => {
    let querry = "UPDATE seminaire set nom_seminaire = ?, id_personne = ? WHERE id_seminaire = ?";
    db.serialize(() => {
        db.run(querry, [req.params.nom, req.params.resp, req.params.id], err => {
            if (err) throw err;
            renderSeminaire(res);
        });
    })
})

//rendu de la page seminaire
function renderSeminaire(res) {
    const dataQuery = "SELECT * from seminaire INNER JOIN personne ON seminaire.id_personne = personne.id_personne";
    const personneQuery = "SELECT * FROM personne";
    db.serialize(() => {
        //récupère la liste de personne et la place dans personneData
        //pour alimenter l'élément select dans la vue
        db.all(personneQuery, [], (err, personneData) => {
            if (err) throw err;

            //récupère la liste des séminaires
            db.all(dataQuery, [], (err, seminaireData) => {
                if (err) throw err;
                //valeur par défaut des inputs lorsque la page seminaire est affichée ou rafraîchie
                let initialData = { id: null, nom: null, resp: "1" };

                //fait un rendu de la page seminaire avec les données des requettes
                //et initialise les inputs dans la vue 
                res.render("../vues/seminaire.hbs", { data: seminaireData, personne: personneData, initialData: initialData });
            });
        });
    });
}

module.exports = router;


