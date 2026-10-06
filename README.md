# Fietstechniek Race – versie 10 controle-update

Deze GitHub-versie is volledig nagekeken en blijft eenvoudig te plaatsen: de complete website werkt vanuit één zelfstandige `index.html`.

## Wat is verbeterd?

- Verkeerslichten en vragenlijnen staan niet meer bijna op dezelfde plek.
- Alle routevarianten zijn gecontroleerd op een vrije, haalbare doorgang.
- Het moeilijkste mountainbikelevel blijft druk, maar kan de fietser niet meer volledig insluiten.
- De 14-jaarsvariant heeft nu 35 unieke vragen; tijdens één complete rit hoeft geen vraag te worden herhaald.
- Alle leeftijdsniveaus, montageonderdelen, tegenliggers, verkeerslichten, afbeeldingen, timers en einduitslagen zijn opnieuw gecontroleerd.
- Het tabblad heeft nu een eigen fietsicoon.

## Snel op GitHub zetten

1. Pak dit ZIP-bestand uit.
2. Open jouw GitHub-repository.
3. Verwijder of vervang de oude `index.html`.
4. Upload de nieuwe `index.html` naar de **hoofdmap** van de repository.
5. Upload ook `README.md` en eventueel de map `assets`.
6. Klik op **Commit changes**.
7. Wacht één of twee minuten en open jouw GitHub Pages-website.
8. Zie je nog de oude versie? Druk op `Ctrl + F5`.

Alleen `index.html` is nodig om het spel te laten werken. De vormgeving, spelcode en vijftien gebruikte afbeeldingen zijn daarin ingebouwd. Daardoor kunnen de realistische foto's niet meer ontbreken door een verkeerd geüploade map.

## Leeftijdsniveaus

| Leeftijd | Fiets | Montage | Route | Vragen/opdrachten |
|---|---|---:|---:|---:|
| 12 jaar | Stadsfiets basis | 8 onderdelen | 10 levels / 10 km | 10 |
| 13 jaar | Stadsfiets plus | 12 onderdelen | 12 levels / 15 km | 18 |
| 14 jaar | Mountainbike | 16 onderdelen | 15 levels / 22,5 km | 35 unieke vragen |

Iedere leerling monteert eerst de fiets. Daarna volgt de route met bochten, verkeerslichten, vragen, reparatieopdrachten, hindernissen en tegenliggers. Een botsing met een tegenligger start het huidige level opnieuw. Na het laatste level moet het verdiende achterlicht nog worden gemonteerd.

## Zelf bewerken

- `index.html` is de zelfstandige, direct te gebruiken GitHub-versie.
- `index-bronversie.html` is dezelfde pagina met losse bronbestanden.
- `assets/style.css` bevat de vormgeving.
- `assets/app.js` bevat leeftijden, onderdelen, vragen, routes en spelregels.
- De realistische beelden staan eveneens in `assets`.

Als je `assets/app.js` of `assets/style.css` wijzigt, test je dat met `index-bronversie.html`. Voor de extra betrouwbare alles-in-éénversie moeten zulke wijzigingen daarna opnieuw in `index.html` worden ingebouwd.

## Controleverslag

De automatische controle heeft 2.960 routevarianten getest, verdeeld over alle leeftijden en levels. In totaal zijn 35.702 controles geslaagd, waaronder:

- aantallen onderdelen, levels, afstanden en vragen;
- unieke onderdeel-id's en geldige montageplekken;
- unieke vragen en geldige antwoorden;
- afstand tussen verkeerslichten en vragenlijnen;
- passeerbaarheid van hindernissen en tegenliggers;
- wisselende routevormen;
- bestaande HTML-elementen en aanwezige afbeeldingsbestanden;
- geldige JavaScript-syntaxis.
