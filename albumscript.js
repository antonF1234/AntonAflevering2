async function getJSON() {
    try {
    const response = await fetch("albumdata/albums.json");
    const jsonData = await response.json();
    generateTable(jsonData);
} catch (error) {
        console.error("fejl ved indlæsning af json",error);
    }
}
function generateTable(json){
  const table = document.getElementById("albumtable");  
} 
const selectedFields = {
    "albumName": "navn",
    "artistName" : "artist",
    "rating": "bedømmelse",
    "productionYear": "udgivelsesår",
};
let headerRow = "<tr>";

for (let i = 0; i < selectedFields.length; i++) {
    headerRow += "<th>" + selectedFields[i] + "</th>";
}

  headerRow += "</tr>";
  
  let rows = "";

  for(let i = 0; i < json.length; i++) {
    let row = "<tr>";
        
    for (let j = 0; j < selectedFields.length; j++) {
        let field = selectedFields[j];
        row += "<td>" + json[i][field] + "</td>";
}
    row += "</tr>";
    rows += row;
  
    table.innerHTML = headerRow + rows;
}   
window.onload = getJSON;