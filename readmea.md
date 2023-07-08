TD pour élèves de la classe L1 en informatique à GE-IT

Description : 

Le projet consiste à créer un CRUD pour chaque table de la base de donnée Séminaire

Base de données :
La BD contient trois tables : 
la table séminaire pour stocker toutes les données des séminaires
la table personne relié à la table séminaire, définie les animateurs de chaque séminaire et le responsable du séminaire
la table anime qui définie la relation entre les animateurs et les séminaires
Cette base de donnée a été crée sur sqlite3

L'application utilise : 
en front-end : Handlebars pour la structure de la page, CSS et JavaScript pour les styles et la dynamisation des éléments de la page
en back-end : express.js, helmet et body-parser
