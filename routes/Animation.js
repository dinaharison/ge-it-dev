const express = require('express');
const router = express.Router();

var sqlite3 = require("sqlite3");
const { route } = require('./Personne');
var db = new sqlite3.Database("seminaire.db");

//affichage
router.get("/", (req, res) => {
    renderAnimation(res);
})

//insertion
router.post("/", (req, res) =>{
    const querry = "INSERT INTO anime(date, salaire, id_seminaire, id_personne) VALUES(?,?,?,?)"
    db.run(querry, [req.body.datesem, req.body.salaire, req.body.sem, req.body.anim]), (err) => {
        if(err) throw err;
        renderAnimation(res);
    }
})

//mise à jour
router.get("/:id_sem/:id_pers/:salaire/:date", (req,res) => {
    const querry = "UPDATE anime SET salaire = ?, date = ? WHERE id_seminaire = ? AND id_personne = ?";
    db.run(querry, [req.params.salaire, req.params.date, req.params.id_sem, req.params.id_pers], err => {
        if(err) throw err;
        renderAnimation(res);
    })
});

//suppression
router.get("/:id_sem/:id_anim", (req, res)=> {
    const querry = "DELETE FROM anime WHERE id_seminaire = ? AND id_personne = ?";
    db.serialize(()=>{
        db.run(querry,[req.params.id_sem, req.params.id_anim], (err) => {
            if(err) throw err;
            renderAnimation(res);
        })
    });
})

function renderAnimation(res) {
    const querry = "SELECT a.id_seminaire id_sem, a.id_personne id_pers, r.id_personne id_resp, " +
        " r.nom_seminaire nom_sem,r.nom_personne nom_resp ,r.prenom_personne prenom_resp, " +
        " p.nom_personne nom_anim,p.prenom_personne prenom_anim, salaire, date " +
        " FROM anime a INNER JOIN " +
        "(seminaire s1 INNER JOIN personne p1 ON s1.id_personne = p1.id_personne) r, " +
        " personne p ON r.id_seminaire = a.id_seminaire " +
        " AND a.id_personne = p.id_personne ";

    const querrySeminaire = "Select * from seminaire";
    const querryPersonne = "Select * from personne";

    db.serialize(() => {
        db.all(querry, [], (err, data) => {
            if (err) throw err;

            db.all(querrySeminaire, [], (err, seminaire) => {
                if (err) throw err;

                db.all(querryPersonne, [], (err, personne) => {
                    if (err) throw err;
                    const initialData = { idResp: 1, idPers: 1 , unit : "€"};
                    res.render("../vues/anime.hbs", { data, seminaire, personne, initialData });
                })
            })
        })
    })
}

module.exports = router;