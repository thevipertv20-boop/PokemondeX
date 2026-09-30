
// todos 

// html grundgerüst aufbauen ! / Erledig
// styls und js inportieren /  erledigt 
// Header Footer und Main / Erldigt
// in main ein contaienr erstellen in dem  pokemon daten rein gerendert soll der braucht eine ID damit ich den bereich erreiche / Erledigt
// wir baruchen ein dilaog um dateis von  den pokemen  anzuzeigen / Erledigt 
// in dialog links und recht pfeile hinzufügen / datei hinzufügen bild Namen des pokemons und ein  X butten 
// in header eingabe felt input und ein Butten suchen / Erledigt




// css






// js 


// speichert die erste Liste von der API.
let allPokemonBasicData;
// soll später die vollständigen Detaildaten aller Pokémon speichern
const allPokemonDetailData = [];
// wie viele Pokémon pro Anfrage geladen werden
const pokemonLimit = 25;
// ab welcher Position die API die nächsten Pokémon liefern soll (0 = ab dem ersten Pokémon)
let currentOffset = 0;
// verhindert, dass bei einem Doppelklick zweimal gleichzeitig geladen wird
let isLoadingMore = false;

// Eine start funktion die beim Öffne meiner Webseite aufgerufen wird / Erledigt
async function init(){ 
    // hir werden Basicdaten der ersten 25 Pokémon laden
    allPokemonBasicData = await getBasicPokemonData();
    // hir wird Geprüft ob die Pokémon-Liste angekommen ist
    await fetchDetailedPokemonData();

    renderPokemon();
    // "Mehr laden"-Button anzeigen, wenn es noch weitere Pokémon gibt
    updateLoadMoreButton();

    
    // Durch alle Pokémon der Liste laufen
    // Erste Pokémon-Liste laden
    // Durch alle Pokémon der Liste laufen
    // Für jedes Pokémon die Detail-URL aufrufen
    // Detaildaten abrufen
    // Detaildaten in allPokemonData speichern
    // Vollständige Pokémon-Daten zurückgeben
}

// eine fuktion  die pokemon daten ins html rendert
// pokemonList ist optional: ohne Angabe werden alle geladenen Pokémon angezeigt (z.B. beim Start),
// bei der Suche wird nur die gefilterte Liste übergeben
function renderPokemon(pokemonList = allPokemonDetailData, searchTerm = ""){
    let contaienr = document.getElementById("pokemonContainer");
    // Container leeren, damit bei einer neuen Suche keine alten Karten stehen bleiben
    contaienr.innerHTML = "";
    // Wenn nichts gefunden wurde, eine Meldung statt Karten anzeigen
    if (pokemonList.length === 0) {
        contaienr.innerHTML = noResultsTemplate(searchTerm);
        return;
    }
    for (let i = 0; i < pokemonList.length; i++)
    // Fügt die PokémonKarten in den Container ein
    contaienr.innerHTML += pokemonCardTemplate(pokemonList[i]);

    console.log(allPokemonDetailData[0].sprites.front_default);
    // container auswälen 
    // pokemon durlaufen 
    // pokemon karten anzeigen 
    // HTML für die pokemon erstllen 
}

// Die Funktion holt die Pokémon-Daten von der PokeAPI. Dafür wird eine Anfrage gesendet 
async function getBasicPokemonData(){ 
    // hir ist ne variabele mit dem  namen pokemonData zuweisung Pokemon daten fetchen
    // limit = wie viele Pokémon, offset = ab welcher Position (beim Start: limit=25&offset=0)
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${currentOffset}`);
    // Die Daten der API werden aus der Antwort gelesen und als JSON gespeichert
    let pokemonData = await response.json();
    // Die Funktion gibt die geladenen Pokémon-Daten

    return pokemonData; 
// ich  würde die bilder über schnietstelle abrufen 
}

//allPokemonBasicData.results[i].url alle fetchen und jeweils den  Response der 
async function fetchDetailedPokemonData() {
    
    for (let i = 0; i < allPokemonBasicData.results.length; i++){
        //Ich hole die URL des aktuellen Pokémon aus dem Array results und speichere sie in der Variable pokemonUrl damit ich sie später mit fetch aufrufen kann
        let pokemonUrl = allPokemonBasicData.results[i].url
        // Die URL des aktuellen Pokémon wird aufgerufen und die Antwort der API in response gespeichert
        let response = await fetch(pokemonUrl)
        // Die Antwort der API wird in JSON umgewandelt und in pokemonDetailData gespeichert
        let pokemonDeteilData = await response.json();
        // Die vollständigen Detaildaten des Pokémon werden in allPokemonDetailData gespeichert damit sie später gerendert werden können
        allPokemonDetailData.push(pokemonDeteilData)
        // Zeigt alle gespeicherten Pokémon-Detaildaten in der Konsole an
        
    }
    console.log(allPokemonDetailData[0]);
}

// Lädt beim Klick auf "Mehr Pokémon laden" die nächsten 25 Pokémon und hängt sie an
async function loadMorePokemon() {
    if (isLoadingMore) return;
    isLoadingMore = true;
    setLoadMoreButtonLoading(true);
    // Offset um 25 erhöhen, damit die API die nächsten Pokémon liefert
    currentOffset += pokemonLimit;
    try {
        allPokemonBasicData = await getBasicPokemonData();
        // hängt die neuen Pokémon an allPokemonDetailData an, die alten bleiben erhalten
        await fetchDetailedPokemonData();
    } catch (error) {
        // bei einem Fehler Offset zurücksetzen, damit ein neuer Klick dieselben Pokémon erneut versucht
        currentOffset -= pokemonLimit;
        console.error("Weitere Pokémon konnten nicht geladen werden:", error);
    }
    // Wenn gerade gesucht wird, die Suche mit den neuen Pokémon wiederholen, sonst alle anzeigen
    if (document.getElementById("searchInput").value.trim() !== "") {
        searchPokemon();
    } else {
        renderPokemon();
    }
    isLoadingMore = false;
    setLoadMoreButtonLoading(false);
    updateLoadMoreButton();
}

// Zeigt den Button nur, solange die API noch weitere Pokémon hat (next ist dann nicht null)
function updateLoadMoreButton() {
    let button = document.getElementById("loadMoreButton");
    if (allPokemonBasicData && allPokemonBasicData.next) {
        button.classList.remove("d-none");
    } else {
        button.classList.add("d-none");
    }
}

// Schaltet den Button während des Ladens auf "Lädt..." und sperrt ihn
function setLoadMoreButtonLoading(isLoading) {
    let button = document.getElementById("loadMoreButton");
    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.querySelector(".load-more-text").textContent = isLoading ? "Lädt..." : "Mehr Pokémon laden";
}





























// Damit die geladenen Pokémon gespeichert werden So kann ich später suchen oder den Dialog öffnen
// 'function allPokemon(){}



// // eine funktion die bei ausführen den  dialog  öffnet 
// function openDialog(){ 
//     // pokemon auswälen 
//     // daten anzeigen 
//     // dialog öffnen 

// }


// // eine fuktion die bei ausführen den dialog  zum  schliessen
// function closeDialog(){ 

// }


// // eine fuktion die in vorherigen pokemon  springt 
// function previousPokemon(){ 

// }


// // eine fuktion die in nächste  pokemon  springt
// function nextPokemon(){ 
//     // Neue pokemon anzeigen 

// }


// eine funktion die nach den  pokemon  sucht
function searchPokemon(){
    // Suchbegriff aus dem inputfeld lesen (Leerzeichen weg, alles klein)
    let searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    // Leeres Suchfeld: wieder alle geladenen Pokémon anzeigen
    if (searchTerm === "") {
        renderPokemon();
        return;
    }
    // all pokemon durchsuchen und passende Pokemon finden (nur bereits geladene Daten, keine neue API-Anfrage)
    let foundPokemon = allPokemonDetailData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    // suchergebnis anzeigen
    renderPokemon(foundPokemon, searchTerm);
}

// Startet die Suche, wenn im Suchfeld Enter gedrückt wird
function searchOnEnter(event){
    if (event.key === "Enter") {
        searchPokemon();
    }
}

// Zeigt wieder alle Pokémon, sobald das Suchfeld geleert wird
function resetSearchIfEmpty(){
    if (document.getElementById("searchInput").value.trim() === "") {
        renderPokemon();
    }
}

// // hir werden die daten für den benutzer geladen 
// function showLoading(){ 

// }
// // Entfert die geladene daten von  ladebildschirm 
// function hideLoading(){ 
//     // 
// }'





































































// 'async function loadPokemon() {

//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0");
//     const data = await response.json();
//     const container = document.getElementById("pokemonContainer");container.innerHTML = "";allPokemon = [];
//     for (let i = 0; i < data.results.length; i++) {
//         const pokemonResponse = await fetch(data.results[i].url);
//         const pokemonData = await pokemonResponse.json();allPokemon.push(pokemonData);
//         const type = pokemonData.types[0].type.name;
//         const bgColor = typeColors[type];container.innerHTML += pokemonCardTemplate(
//             pokemonData,
//             bgColor
//         );
//     }
// }

// function searchPokemon() {
//     const searchValue = document.getElementById("searchInput").value.toLowerCase();
//     let container = document.getElementById("pokemonContainer");container.innerHTML = "";
//     let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue));
//     filteredPokemon.forEach(pokemon => {
//         let type = pokemon.types[0].type.name;
//         let bgColor = typeColors[type];
//         container.innerHTML += pokemonCardTemplate(pokemon,bgColor);
//     });
// }

// async function openDialog(id) {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     const pokemonData = await response.json();
//     const hp = pokemonData.stats[0].base_stat;
//     const attack = pokemonData.stats[1].base_stat;
//     const defense = pokemonData.stats[2].base_stat;
//     document.getElementById("dialogContent").innerHTML = pokemonDialogTemplate(
//         pokemonData,
//         hp,
//         attack,
//         defense
//     );
//     document.getElementById("pokemonDialog").showModal();
// }

// function closeDialog() {
//     document.getElementById("pokemonDialog").close();
// }'


