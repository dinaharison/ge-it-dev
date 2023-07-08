//récupère les élément html: input, table et a(modifier et supprimer)
const idInput = document.getElementById("id");
const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const dataTable = document.getElementById("data");
const modifierBoutton = document.getElementById("modifier");
const ajouterBoutton = document.getElementById("ajouter");
const supprimerBoutton = document.getElementById("supprimer")

//ajout d'évenement onclick sur la table contenant les données
dataTable.onclick = (event) => {
    //prends la ligne séléctionnée par la souris
    const selectedrow = event.target.closest('tr');
    //prends les données de la ligne séléctionnée
    const rowData = Array.from(selectedrow.children).map(cell => cell.textContent);

    idInput.value = rowData[0];
    nomInput.value = rowData[1];
    prenomInput.value = rowData[2];
}

//évenement onclick sur le lien modifier
modifierBoutton.onclick = () => {
    //vérifie si les inputs contiennent des données
    if(!idInput.value && !nomInput.value && !prenomInput.value){
        alert("Veuillez selectionner une donnée à Modifier");
        return;
    }
    //execute la requette http sur la route définie dans href si la condition n'est pas vérifiée
    modifierBoutton.setAttribute("href", "/personne/"+idInput.value.trim()+"/"+nomInput.value.trim()+"/"+prenomInput.value.trim());
}

//évenement onclick sur le lien supprimer
supprimerBoutton.onclick = () => {
    //vérifie si les inputs contiennent des données
    if(!idInput.value && !nomInput.value && !prenomInput.value){
        alert("Veuillez selectionner une donnée à Supprimer");
        return; //sort de la fonction
    }
    //execute la requette http sur la route définie dans href si la condition n'est pas vérifiée
    supprimerBoutton.setAttribute("href", "/personne/"+idInput.value.trim());
}

