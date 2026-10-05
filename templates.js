const extraTypeColors = {
    flying: "#A890F0",
    steel: "#B8B8D0",
    dark: "#705848"
};

const statNames = {
    "hp": "HP",
    "attack": "Angriff",
    "defense": "Verteidigung",
    "special-attack": "Spezial-Angriff",
    "special-defense": "Spezial-Verteidigung",
    "speed": "Initiative"
};


function pokemonCardTemplate(pokemonData) {
    let glowColor = getTypeColor(pokemonData.types[0].type.name);
    let image = getCardImage(pokemonData);

    return `
        <div class="pokemon-card" style="--type-color:${glowColor}" onclick="openDialog(${pokemonData.id})">
            <div class="pokemon-card-top">
                <span class="pokemon-id">#${String(pokemonData.id).padStart(4, "0")}</span>
                <h2>${pokemonData.name}</h2>
            </div>
            <div class="pokemon-image">
                <img src="${image}" alt="${pokemonData.name}" loading="lazy" decoding="async">
            </div>
            <div class="pokemon-card-bottom">
                ${pokemonTypeIconsTemplate(pokemonData.types)}
            </div>
        </div>
    `;
}


function getCardImage(pokemonData) {
    let other = pokemonData.sprites.other || {};
    let dreamWorld = other.dream_world ? other.dream_world.front_default : null;
    let officialArtwork = other["official-artwork"] ? other["official-artwork"].front_default : null;
    return dreamWorld || officialArtwork || pokemonData.sprites.front_default;
}


function pokemonTypeIconsTemplate(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        let typeName = types[i].type.name;
        let color = getTypeColor(typeName);
        html += `
            <span class="type-icon-circle" style="--badge-color:${color}" title="${typeName}">
                <img class="type-icon" src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${typeName}.svg"
                    alt="${typeName}" loading="lazy" onerror="this.remove()">
            </span>
        `;
    }
    return html;
}


function pokemonTypesTemplate(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        let typeName = types[i].type.name;
        let color = getTypeColor(typeName);
        html += `
            <span class="type-badge" style="--badge-color:${color}">
                <img
                    class="type-badge-icon"
                    src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg"
                    alt=""
                    onerror="this.remove()"
                >
                ${typeName}
            </span>
        `;
    }
    return html;
}

function getTypeColor(typeName) {
    return typeColors[typeName] || extraTypeColors[typeName] || "#22d3ee";
}


function pokemonDialogTemplate(pokemonData, hasPrevious = true, hasNext = true) {
    let image = pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default;
    let height = (pokemonData.height / 10).toLocaleString("de-DE", { minimumFractionDigits: 1 });
    let weight = (pokemonData.weight / 10).toLocaleString("de-DE", { minimumFractionDigits: 1 });

    return `
        <div class="dialog-hero">
            <span class="pokemon-id">#${String(pokemonData.id).padStart(3, "0")}</span>
            <button class="dialog-close" onclick="closeDialog()" aria-label="Dialog schließen">✕</button>
            <button class="dialog-nav dialog-nav-prev" onclick="previousPokemon()" aria-label="Vorheriges Pokémon" ${hasPrevious ? "" : "disabled"}>‹</button>
            <div class="dialog-image">
                <img class="dialog-artwork" src="${image}" alt="${pokemonData.name}">
            </div>
            <button class="dialog-nav dialog-nav-next" onclick="nextPokemon()" aria-label="Nächstes Pokémon" ${hasNext ? "" : "disabled"}>›</button>
        </div>
        <div class="dialog-body">
            <h2 class="dialog-name">${pokemonData.name}</h2>
            <div class="pokemon-types">
                ${pokemonTypesTemplate(pokemonData.types)}
            </div>
            <div class="dialog-info">
                <div class="info-box">
                    <span>Größe</span>
                    <strong>${height} m</strong>
                </div>
                <div class="info-box">
                    <span>Gewicht</span>
                    <strong>${weight} kg</strong>
                </div>
            </div>
            <h3 class="dialog-section-title">Basiswerte</h3>
            <div class="stat-list">
                ${pokemonStatsTemplate(pokemonData.stats)}
            </div>
        </div>
    `;
}


function pokemonStatsTemplate(stats) {
    let html = "";
    let total = 0;
    for (let i = 0; i < stats.length; i++) {
        let value = stats[i].base_stat;
        let name = statNames[stats[i].stat.name] || stats[i].stat.name;
        let percent = Math.min(value / 255 * 100, 100);
        total += value;
        html += `
            <div class="stat-row">
                <span class="stat-name">${name}</span>
                <span class="stat-value">${value}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width:${percent}%; animation-delay:${i * 60}ms"></div>
                </div>
            </div>
        `;
    }
    html += `
        <div class="stat-row stat-total">
            <span class="stat-name">Gesamt</span>
            <span class="stat-value">${total}</span>
        </div>
    `;
    return html;
}


function noResultsTemplate(searchTerm) {
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
