# Pokémon-Dex

Ein Pokédex im Browser, der Pokémon-Daten live von der PokéAPI lädt und als Karten-Übersicht mit Detailansicht darstellt.

## Technologien

- HTML
- CSS
- JavaScript
- [PokéAPI](https://pokeapi.co/)

Das Projekt kommt ohne Framework und ohne Build-Schritt aus.

## Funktionen

- **Karten-Übersicht:** Jedes Pokémon wird mit Nummer, Name, Bild und Typ-Icons angezeigt, eingefärbt nach seinem ersten Typ.
- **Nachladen:** Beim Start werden 25 Pokémon geladen, über „Mehr Pokémon laden“ kommen jeweils 25 weitere dazu.
- **Suche:** Filtert die bereits geladenen Pokémon nach Namen, per Button oder Enter-Taste. Bei leerem Suchfeld erscheinen wieder alle.
- **Detailansicht:** Ein Klick auf eine Karte öffnet einen Dialog mit Artwork, Typen, Größe, Gewicht und Basiswerten inklusive Gesamtsumme.
- **Navigation im Dialog:** Mit den Pfeil-Buttons oder den Pfeiltasten links/rechts wechselt man zum vorherigen oder nächsten Pokémon.
- **Responsive Layout:** Auf dem Desktop stehen 5 Karten pro Reihe, auf Tablet und Handy passt sich die Spaltenzahl der Bildschirmbreite an.

## Installation und Start

1. Repository klonen:

   ```bash
   git clone https://github.com/thevipertv20-boop/PokemondeX.git
   ```

2. Den Projektordner in Visual Studio Code öffnen.
3. Die Erweiterung **Live Server** installieren, falls noch nicht vorhanden.
4. Rechtsklick auf `index.html` und **„Open with Live Server“** wählen.

Die Seite öffnet sich im Browser unter `http://127.0.0.1:5501` (der Port ist in `.vscode/settings.json` festgelegt). Für das Laden der Daten ist eine Internetverbindung nötig.

## Projektstruktur

| Datei | Inhalt |
| --- | --- |
| `index.html` | Grundgerüst der Seite |
| `style.css` | Gesamtes Styling und responsives Layout |
| `script.js` | Laden der Daten, Suche, Nachladen und Dialog-Steuerung |
| `templates.js` | HTML-Templates für Karten, Dialog und Basiswerte |
| `db.js` | Farbzuordnung der Pokémon-Typen |
| `img/` | Bilddateien |

## API

Alle Pokémon-Daten stammen von der [PokéAPI](https://pokeapi.co/). Verwendet wird der Endpunkt `https://pokeapi.co/api/v2/pokemon` mit den Parametern `limit` und `offset`, anschließend werden die Details zu jedem Pokémon einzeln abgerufen. Ein API-Schlüssel ist nicht nötig.

Die Typ-Icons werden von [pokemon-type-svg-icons](https://github.com/duiker101/pokemon-type-svg-icons) geladen.

## GitHub

Das Projekt liegt auf GitHub: [thevipertv20-boop/PokemondeX](https://github.com/thevipertv20-boop/PokemondeX)
