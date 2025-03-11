async function getJSON() {       //Vi henter data fra json fil og laver en tabel
    try {
    const response = await fetch("albumdata/albums.json");   //Vi bruger fetch til at hente det med
    const jsonData = await response.json();    //"await" venter på at informationen er hentet og "svarer" ligesom med "response" som færdiggøre vores indehentning af dataen 
    generateTable(jsonData); // Det siger sig selv, her genererer vi tabellen
} catch (error) {
        console.error("fejl ved indlæsning af json",error); // Hvis nu vi er uheldige og der sker en fejl, så får vi svar.
    }
}

function generateTable(json) {
    var table = document.getElementById("albumtable"); /* Her laver vi en forbindelse med "albumtable" til vores html dokument, som sætter tabllen sammen med hjælp fra vores json data. */
  
    if(!table) {
    console.error("Table is missing"); // Endnu en meddelse, hvis ikke det går efter planen
    return;
  }

var selectedFields = { //De 4 stykker information, samt objektet der laves med "selectedfields".
    "albumName": "Albumtitel",
    "artistName" : "Artist",
    "rating": "Bedømmelse", // Nøglen "rating" bliver hentet fra albumdata dokumentet og bliver istedet til en værdi der bruges som overskrift i tabellen.
    "productionYear": "Udgivelsesår",
};
var headerRow = "<tr>" + Object.values(selectedFields).map(function(field) { // Nu henter vi vores værdier fra objektet som giver os et array tilbage, derefter laver vi rækker med hjælp af "tr"
return "<th>" + field + "</th>"; // "th" samler kolonneoverskrifterne
}).join('') + "</tr>"; // "join" hjælper os med at samle puslespillet, ''?

  var rows = "";
  for (var i = 0; i < json.length; i++) { // Går igennem alle albums, hver [I] repræsenterer et album
    var row = "<tr>"; // Række laves
    for (var key in selectedFields){ // Finder de 4 forskellige informationer 
        row += "<td>" + json [i][key] + "</td>"; // Der tilføjes info til rækkerne
    }
    row += "</tr>";
    rows += row;
    }
    table.innerHTML =  "<thead>" +  headerRow + "</thead><tbody>" + rows + "</tbody>"; // Tabllen sætter vi nu ind i html dokumentet og vi nævner med "thead" og "tbody" at vi vil have rækker og kolonneoverskrifter med
} 
function toggleTable() {
    var table =document.getElementById("albumtable"); //Jeg laver en funktion der kan gemme hele tabellen væk
    if(table.style.visibility === "hidden") { // forklar ===
        table.style.visibility = "visible"; // Med "else" siges der at hvis der trykkes på knappen, så bliver tabellen skjult.
    }   else {
        table.style.visibility = "hidden";
    }
}
window.onload = getJSON;