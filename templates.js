// Farben für Typen, die in db.js (typeColors) noch fehlen
const extraTypeColors = {
    flying: "#A890F0",
    steel: "#B8B8D0",
    dark: "#705848"
};

// Gibt die Farbe zu einem Typ zurück (erst db.js, dann extraTypeColors, sonst Cyan)
function getTypeColor(typeName) {
    return typeColors[typeName] || extraTypeColors[typeName] || "#22d3ee";
}

// Erstellt das HTML für eine Pokémon-Karte (neues Design)
function pokemonCardTemplate(pokemonData) {
    // Die Farbe des Haupttyps bestimmt Tönung und Glow der Karte
    let mainType = pokemonData.types[0].type.name;
    let glowColor = getTypeColor(mainType);
    // Großes Artwork aus der API, falls nicht vorhanden das kleine Sprite
    let image = pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default;

    return `
        <div class="pokemon-card" style="--type-color:${glowColor}">
            <div class="pokemon-card-top">
                <span class="pokemon-id">#${String(pokemonData.id).padStart(3, "0")}</span>
            </div>
            <div class="pokemon-image">
                <img src="${image}" alt="${pokemonData.name}" loading="lazy">
            </div>
            <h2>${pokemonData.name}</h2>
            <div class="pokemon-types">
                ${pokemonTypesTemplate(pokemonData.types)}
            </div>
        </div>
    `;
}

// Erstellt die Typ-Badges unten auf der Karte
function pokemonTypesTemplate(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        let typeName = types[i].type.name;
        let color = getTypeColor(typeName);
        html += `<span class="type-badge" style="--badge-color:${color}">${typeName}</span>`;
    }
    return html;
}

// Meldung, wenn die Suche kein Pokémon findet
function noResultsTemplate(searchTerm) {
    // Suchbegriff sicher anzeigen (keine HTML-Zeichen aus dem Eingabefeld ausführen)
    let safeTerm = searchTerm.replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);
    return `
        <div class="no-results">
            <div class="no-results-icon">?</div>
            <h2>Kein Pokémon gefunden</h2>
            <p>Für „<strong>${safeTerm}</strong>“ gibt es unter den geladenen Pokémon keinen Treffer.</p>
            <p>Prüfe die Schreibweise oder leere das Suchfeld, um wieder alle zu sehen.</p>
        </div>
    `;
}

// 'function pokemonCardTemplate(pokemonData, bgColor) {
//     return `
//         <div
//             class="pokemon-card"
//             onclick="openDialog(${pokemonData.id})">
//             <div class="pokemon-header">
//                 <span>#${pokemonData.id}</span>
//                 <span>
//                     ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
//                 </span>
//             </div>
//             <div
//                 class="pokemon-middle"
//                 style="background-color:${bgColor}">
//                 <img
//                     src="${pokemonData.sprites.other["official-artwork"].front_default}"
//                     alt="${pokemonData.name}">
//             </div>
//             <div class="pokemon-bottom">
//                 ${pokemonData.types.map(type => `
//                     <div class="type-circle ${type.type.name}">
//                         <img
//                             class="type-icon"
//                             src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${type.type.name}.svg"
//                             alt="${type.type.name}">
//                     </div>
//                 `).join("")}
//             </div>
//         </div>
//     `;
// }

// overlay.innerHTML = `
//     <div class="overlay-card">
//         <button onclick="closeOverlay()">✕</button>
//         <h2>${pokemonData.name}</h2>
//         <img src="${pokemonData.sprites.front_default}">
//         <p>ID: #${pokemonData.id}</p>
//         <p>Größe: ${pokemonData.height}</p>
//         <p>Gewicht: ${pokemonData.weight}</p>
//         <div class="overlay-nav">
//             <button onclick="openPokemon(${pokemonData.id - 1})">←</button>
//             <button onclick="openPokemon(${pokemonData.id + 1})">→</button>
//         </div>
//     </div>
// `;

// function pokemonDialogTemplate(
//     pokemonData,
//     hp,
//     attack,
//     defense
// ) {
//     return `
//         <h2>${pokemonData.name.toUpperCase()}</h2>
//         <img
//             class="dialog-img"
//             src="${pokemonData.sprites.other["official-artwork"].front_default}"
//             alt="${pokemonData.name}">
//         <div class="stat-box">
//             <p>HP</p>
//             <div class="bar">
//                 <div class="fill hp" style="width:${hp}%">
//                     ${hp}
//                 </div>
//             </div>
//             <p>Attack</p>
//             <div class="bar">
//                 <div class="fill attack" style="width:${attack}%">
//                     ${attack}
//                 </div>
//             </div>
//             <p>Defense</p>
//             <div class="bar">
//                 <div class="fill defense" style="width:${defense}%">
//                     ${defense}
//                 </div>
//             </div>
//         </div>
//         <p>ID: #${pokemonData.id}</p>
//         <p>Größe: ${pokemonData.height}</p>
//         <p>Gewicht: ${pokemonData.weight}</p>
//     `;
// }'