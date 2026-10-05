let allPokemonBasicData;
const allPokemonDetailData = [];
const pokemonCache = new Map();
const pokemonLimit = 25;
let currentOffset = 0;
let isLoadingMore = false;
let currentDialogIndex = -1;
let isSearchActive = false;


async function init() {
    try {
        allPokemonBasicData = await getBasicPokemonData();
        await fetchDetailedPokemonData();
    } catch (error) {
        console.error("Pokémon konnten nicht geladen werden:", error);
        return;
    }
    renderPokemon();
    updateLoadMoreButton();
}


async function getBasicPokemonData() {
    return fetchJson(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${currentOffset}`);
}


async function fetchJson(url) {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response.json();
}


async function fetchDetailedPokemonData() {
    let newPokemon = await Promise.all(allPokemonBasicData.results.map(pokemon => getPokemonDetail(pokemon)));
    allPokemonDetailData.push(...newPokemon);
    return newPokemon;
}


function getPokemonDetail(pokemon) {
    if (!pokemonCache.has(pokemon.name)) {
        let request = fetchJson(pokemon.url);
        request.catch(() => pokemonCache.delete(pokemon.name));
        pokemonCache.set(pokemon.name, request);
    }
    return pokemonCache.get(pokemon.name);
}


function renderPokemon(pokemonList = allPokemonDetailData, searchTerm = "") {
    let container = document.getElementById("pokemonContainer");
    isSearchActive = pokemonList !== allPokemonDetailData;
    if (pokemonList.length === 0) {
        container.innerHTML = noResultsTemplate(searchTerm);
        return;
    }
    container.innerHTML = pokemonCardsHtml(pokemonList);
}


function appendPokemon(pokemonList) {
    document.getElementById("pokemonContainer").insertAdjacentHTML("beforeend", pokemonCardsHtml(pokemonList));
}


function pokemonCardsHtml(pokemonList) {
    let html = "";
    for (let i = 0; i < pokemonList.length; i++) {
        html += pokemonCardTemplate(pokemonList[i]);
    }
    return html;
}


async function loadMorePokemon() {
    if (isLoadingMore) return;
    isLoadingMore = true;
    setLoadMoreButtonLoading(true);
    currentOffset += pokemonLimit;
    try {
        allPokemonBasicData = await getBasicPokemonData();
        let newPokemon = await fetchDetailedPokemonData();
        if (document.getElementById("searchInput").value.trim() !== "") {
            searchPokemon();
        } else {
            appendPokemon(newPokemon);
        }
    } catch (error) {
        currentOffset -= pokemonLimit;
        console.error("Weitere Pokémon konnten nicht geladen werden:", error);
    }
    isLoadingMore = false;
    setLoadMoreButtonLoading(false);
    updateLoadMoreButton();
}

function updateLoadMoreButton() {
    let button = document.getElementById("loadMoreButton");
    if (allPokemonBasicData && allPokemonBasicData.next) {
        button.classList.remove("d-none");
    } else {
        button.classList.add("d-none");
    }
}

function setLoadMoreButtonLoading(isLoading) {
    let button = document.getElementById("loadMoreButton");
    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.querySelector(".load-more-text").textContent = isLoading ? "Lädt..." : "Mehr Pokémon laden";
}


function searchPokemon() {
    let searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    if (searchTerm === "") {
        if (isSearchActive) renderPokemon();
        return;
    }
    let foundPokemon = allPokemonDetailData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    renderPokemon(foundPokemon, searchTerm);
}

function searchOnEnter(event) {
    if (event.key === "Enter") {
        searchPokemon();
    }
}

function resetSearchIfEmpty() {
    if (isSearchActive && document.getElementById("searchInput").value.trim() === "") {
        renderPokemon();
    }
}


function openDialog(id) {
    let index = allPokemonDetailData.findIndex(pokemon => pokemon.id === id);
    if (index === -1) return;
    currentDialogIndex = index;
    renderDialog();
    document.getElementById("pokemonDialog").showModal();
}

function renderDialog() {
    let pokemon = allPokemonDetailData[currentDialogIndex];
    let dialog = document.getElementById("pokemonDialog");
    dialog.style.setProperty("--type-color", getTypeColor(pokemon.types[0].type.name));
    let hasPrevious = currentDialogIndex > 0;
    let hasNext = currentDialogIndex < allPokemonDetailData.length - 1;
    document.getElementById("dialogContent").innerHTML = pokemonDialogTemplate(pokemon, hasPrevious, hasNext);
}

function closeDialog() {
    document.getElementById("pokemonDialog").close();
}

function closeDialogOnBackdrop(event) {
    if (event.target === event.currentTarget) {
        closeDialog();
    }
}


function dialogKeyNavigation(event) {
    if (event.key === "ArrowLeft") previousPokemon();
    if (event.key === "ArrowRight") nextPokemon();
}

function previousPokemon() {
    if (currentDialogIndex <= 0) return;
    currentDialogIndex--;
    renderDialog();
    focusDialogButton(".dialog-nav-prev");
}

function nextPokemon() {
    if (currentDialogIndex >= allPokemonDetailData.length - 1) return;
    currentDialogIndex++;
    renderDialog();
    focusDialogButton(".dialog-nav-next");
}


function focusDialogButton(selector) {
    let button = document.querySelector(`#dialogContent ${selector}`);
    if (!button || button.disabled) {
        button = document.querySelector("#dialogContent .dialog-close");
    }
    button.focus();
}
