const semSelect = document.getElementById("sem");
const animSelect = document.getElementById("anim");
const salaireInput = document.getElementById("salaire");
const dateInput = document.getElementById("datesem");

const modifierButton = document.getElementById("modifier");
const supprimerButton = document.getElementById("supprimer");

const dataTable = document.getElementById("data");

dataTable.onclick = (event) => {
    //prends la ligne séléctionnée par la souris
    const selectedrow = event.target.closest('tr');
    //prends les données de la ligne séléctionnée
    const rowData = Array.from(selectedrow.children).map(cell => cell.textContent);

    semSelect.value = rowData[0];
    animSelect.value = rowData[1];
    dateInput.value = rowData[5];
    salaireInput.value = rowData[7];
}

modifierButton.onclick = () => {
    if(!salaireInput.value && !dateInput.value){
        alert("Veuillez selectionner une donnée à Modifier")
    }
    const link = "/animation/" + semSelect.value + "/" + animSelect.value + "/" + salaireInput.value + "/" + dateInput.value;
    modifierButton.setAttribute("href", link);
}

supprimerButton.onclick = () =>{ 
    if(!salaireInput.value && !dateInput.value){
        alert("Veuillez selectionner une donnée à Supprimer")
    }
    const link = "/animation/" + semSelect.value + "/" + animSelect.value;
    supprimerButton.setAttribute("href",link);
}

