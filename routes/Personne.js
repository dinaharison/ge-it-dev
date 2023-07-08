const express = require('express');
const router = express.Router();

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("seminaire.db");

router.get("/", (req,res) => {
    renderPersonne(res);
});

router.get("/:id", (req,res) => {
    const querry = "DELETE FROM personne WHERE id_personne=?";
    db.serialize(() => {
        db.run(querry, [req.params.id], err => {
            if(err) throw err;
            renderPersonne(res);
        })
    })
})

router.get("/:id/:nom/:prenom", (req, res) => {
    const querry = "UPDATE personne SET nom_personne = ? , prenom_personne = ? WHERE id_personne = ?";
    db.serialize(() => {
        db.run(querry, [req.params.nom, req.params.prenom, req.params.id], err => {
            if(err) throw err;
            renderPersonne(res);
        })
    })
})

router.post("/", (req, res) => {
    const querry = "INSERT INTO personne(nom_personne, prenom_personne) VALUES(?,?)"
    db.serialize(() => {
        db.run(querry, [req.body.nom, req.body.prenom], (err) => {
            if(err) throw err;
            else renderPersonne(res);
        })
    })
})

function renderPersonne(res){
    const querry = "SELECT * FROM personne";
    const initialData = {};
    db.serialize(() => {
        db.all(querry, [], (err, rows) => {
            if(err) throw err;
            else{
                res.render("../vues/personne.hbs", {initialData:initialData, personne:rows});
            }
        })
    });
}

module.exports = router;