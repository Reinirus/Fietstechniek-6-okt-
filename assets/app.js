"use strict";

const COLORS = ["#f36b21", "#1478a7", "#7b4cb4", "#16866b"];
const LEVEL_NAMES = [
  "Woonwijk", "Schoolzone", "Brugroute", "Buitengebied", "Dorpskern",
  "Kanaalroute", "Werkgebied", "Parkroute", "Drukke kruising", "Finaleroute",
  "Bosrand", "Dijkroute", "Bouwplaats", "Heuvelpad", "Techniekfinale"
];
const CITY_PARTS = [
  { id:"voorwiel", label:"Voorwiel", instruction:"Pak het voorwiel en plaats het in de voorvork.", sprite:"c0 r0", pos:[77,65] },
  { id:"achterwiel", label:"Achterwiel", instruction:"Pak het achterwiel en plaats het in de achtervork.", sprite:"c0 r0", pos:[23,65] },
  { id:"zadel", label:"Zadel", instruction:"Zet het zadel op de zadelpen.", sprite:"c1 r0", pos:[36,18] },
  { id:"stuur", label:"Stuur", instruction:"Monteer het stuur boven de voorvork.", sprite:"c2 r0", pos:[70,17] },
  { id:"linkerpedaal", label:"Linkerpedaal", instruction:"Draai het linkerpedaal in de linker crank.", sprite:"c3 r0", pos:[44,61] },
  { id:"rechterpedaal", label:"Rechterpedaal", instruction:"Draai het rechterpedaal in de rechter crank.", sprite:"c3 r0", pos:[50,69] },
  { id:"ketting", label:"Ketting", instruction:"Leg de ketting om de tandwielen.", sprite:"c0 r1", pos:[34,70] },
  { id:"voorlamp", label:"Voorlamp", instruction:"Monteer de voorlamp bij de voorkant van het frame.", sprite:"c1 r1", pos:[72,32] },
  { id:"bel", label:"Fietsbel", instruction:"Monteer de fietsbel links op het stuur.", sprite:"extra c0 r0", pos:[66,14] },
  { id:"spatbord", label:"Achterspatbord", instruction:"Plaats het spatbord boven het achterwiel.", sprite:"extra c1 r0", pos:[24,48] },
  { id:"rem", label:"Voorrem", instruction:"Monteer de voorrem bij de voorvork.", sprite:"extra c2 r0", pos:[73,48] },
  { id:"bagagedrager", label:"Bagagedrager", instruction:"Monteer de bagagedrager boven het achterwiel.", sprite:"extra c3 r0", pos:[24,33] }
];

const MTB_PARTS = [
  { id:"voorvork", label:"Voorvork met vering", instruction:"Plaats de verende voorvork in het balhoofd.", sprite:"mtb c1 r1", pos:[82,48] },
  { id:"mtb-voorwiel", label:"Voorwiel 29 inch", instruction:"Plaats het voorwiel in de verende voorvork.", sprite:"mtb c0 r0", pos:[84,69] },
  { id:"mtb-achterwiel", label:"Achterwiel 29 inch", instruction:"Plaats het achterwiel in de achterbrug.", sprite:"mtb c0 r0", pos:[20,69] },
  { id:"cassette", label:"Cassette", instruction:"Schuif de cassette op de body van het achterwiel.", sprite:"mtb c2 r2", pos:[20,66] },
  { id:"derailleur", label:"Achterderailleur", instruction:"Monteer de achterderailleur bij de cassette.", sprite:"mtb c3 r1", pos:[24,73] },
  { id:"crankstel", label:"Crankstel", instruction:"Monteer het crankstel in de trapas.", sprite:"mtb c2 r1", pos:[49,69] },
  { id:"mtb-ketting", label:"Ketting", instruction:"Leg de ketting over het voorblad en de cassette.", sprite:"mtb c0 r1", pos:[36,73] },
  { id:"mtb-linkerpedaal", label:"Linkerpedaal", instruction:"Draai het linkerpedaal in de linker crank.", sprite:"mtb c3 r0", pos:[45,66] },
  { id:"mtb-rechterpedaal", label:"Rechterpedaal", instruction:"Draai het rechterpedaal in de rechter crank.", sprite:"mtb c3 r0", pos:[53,72] },
  { id:"mtb-zadel", label:"Sportzadel", instruction:"Plaats zadel en zadelpen in het frame.", sprite:"mtb c1 r0", pos:[41,17] },
  { id:"mtb-stuur", label:"Mountainbikestuur", instruction:"Monteer het rechte stuur op de stuurpen.", sprite:"mtb c2 r0", pos:[81,17] },
  { id:"schakelaar", label:"Schakelaar", instruction:"Monteer de versnellingsschakelaar op het stuur.", sprite:"mtb c3 r2", pos:[75,20] },
  { id:"voorrem", label:"Remklauw voor", instruction:"Monteer de voorste hydraulische remklauw.", sprite:"mtb c0 r2", pos:[80,61] },
  { id:"achterrem", label:"Remklauw achter", instruction:"Monteer de achterste hydraulische remklauw.", sprite:"mtb c0 r2", pos:[25,61] },
  { id:"voorremschijf", label:"Remschijf voor", instruction:"Monteer de remschijf op het voorwiel.", sprite:"mtb c1 r2", pos:[84,69] },
  { id:"achterremschijf", label:"Remschijf achter", instruction:"Monteer de remschijf op het achterwiel.", sprite:"mtb c1 r2", pos:[20,69] }
];

const AGE_CONFIGS = {
  12:{age:12,title:"Stadsfiets basis",bike:"city",parts:CITY_PARTS.slice(0,8),levelCount:10,distancePerLevel:1,questionsPerLevel:1,extraQuestionEvery:99,totalKm:10},
  13:{age:13,title:"Stadsfiets plus",bike:"city",parts:CITY_PARTS,levelCount:12,distancePerLevel:1.25,questionsPerLevel:1,extraQuestionEvery:2,totalKm:15},
  14:{age:14,title:"Mountainbike expert",bike:"mtb",parts:MTB_PARTS,levelCount:15,distancePerLevel:1.5,questionsPerLevel:2,extraQuestionEvery:3,totalKm:22.5}
};

// De basisvragen zijn behouden en per leeftijd aangevuld met extra techniekvragen.
const QUESTIONS = [
  { type:"VRAAG", q:"Hoe heet het onderdeel waarop je zit?", answers:["Bagagedrager","Zadel","Frame","Stuur"], correct:1, icon:"c1 r0", hint:"Je zit erop." },
  { type:"VRAAG", q:"Welk onderdeel brengt de kracht van de pedalen naar het achterwiel?", answers:["Ketting","Remkabel","Spaak","Voorvork"], correct:0, icon:"c0 r1", hint:"Dit metalen onderdeel loopt rond de tandwielen." },
  { type:"VRAAG", q:"Waarmee stuur je de fiets naar links en rechts?", answers:["Crank","Bagagedrager","Stuur","Spatbord"], correct:2, icon:"c2 r0", hint:"Je houdt dit met twee handen vast." },
  { type:"PECH", q:"Je band is zacht, maar niet lek. Wat gebruik je?", answers:["Schroevendraaier","Fietspomp","Steeksleutel","Plakset"], correct:1, icon:"c2 r1", hint:"Hiermee doe je lucht in de band." },
  { type:"PECH", q:"Je wilt een buitenband van de velg halen. Welk gereedschap kies je?", answers:["Bandenlichters","Hamer","Zaag","Inbussleutel"], correct:0, icon:"c0 r2", hint:"Gebruik geen schroevendraaier. Die kan de binnenband beschadigen." },
  { type:"PECH", q:"Je binnenband heeft een klein gaatje. Wat heb je nodig?", answers:["Smeerolie","Plakset","Moersleutel","Nieuwe ketting"], correct:1, icon:"c2 r2", hint:"Schuren, lijm aanbrengen en een plakker plaatsen." },
  { type:"VRAAG", q:"Hoe heet één dun metalen staafje in een wiel?", answers:["Spaak","As","Velg","Crank"], correct:0, icon:"c0 r0", hint:"Veel van deze staafjes verbinden de naaf met de velg." },
  { type:"PECH", q:"Een moer zit los. Welk gereedschap past het best?", answers:["Bandenlichter","Fietspomp","Steeksleutel","Plakset"], correct:2, icon:"c3 r1", hint:"Dit gereedschap past om een moer." },
  { type:"PECH", q:"Een kruiskopschroef van de lamp zit los. Wat kies je?", answers:["Schroevendraaier","Pomp","Bandenlichter","Plakset"], correct:0, icon:"c1 r2", hint:"Kies de kruiskop die goed in de schroef past." },
  { type:"VRAAG", q:"Welk onderdeel zorgt dat water niet tegen je kleding spat?", answers:["Spatbord","Kettingkast","Voorvork","Velg"], correct:0, icon:"c0 r0", hint:"Dit zit dicht boven de band." },
  { type:"VRAAG", q:"Wat knijp je in om te remmen?", answers:["Handvat","Bel","Remhendel","Pedaal"], correct:2, icon:"c2 r0", hint:"Dit zit bij je handen aan het stuur." },
  { type:"PECH", q:"De ketting piept en loopt stroef. Wat doe je eerst?", answers:["Band oppompen","Ketting reinigen en smeren","Zadel lager zetten","Lamp vervangen"], correct:1, icon:"c0 r1", hint:"Vuil eraf, daarna een klein beetje kettingolie." },
  { minAge:13,type:"VRAAG",q:"Waarvoor gebruik je een fietsbel?",answers:["Om te remmen","Om anderen te waarschuwen","Om te schakelen","Om de band op te pompen"],correct:1,icon:"extra c0 r0",hint:"Je laat hiermee horen dat je eraan komt." },
  { minAge:13,type:"VRAAG",q:"Wat draagt bagage boven het achterwiel?",answers:["Bagagedrager","Voorvork","Crank","Remklauw"],correct:0,icon:"extra c3 r0",hint:"De naam zegt wat dit onderdeel draagt." },
  { minAge:13,type:"PECH",q:"De remblokjes raken de velg niet goed. Wat controleer je eerst?",answers:["Remkabel en afstelling","Fietsbel","Zadelhoes","Ventieldop"],correct:0,icon:"extra c2 r0",hint:"De kabel trekt de rem dicht." },
  { minAge:13,type:"VRAAG",q:"Waarom moet een wiel recht in de voorvork staan?",answers:["Voor de kleur","Om veilig recht te sturen","Voor een zachter zadel","Om sneller te bellen"],correct:1,icon:"c0 r0",hint:"Een scheef wiel beïnvloedt het sturen." },
  { minAge:13,type:"PECH",q:"De band loopt steeds leeg. Wat doe je?",answers:["Alleen harder fietsen","Binnenband controleren en plakken","Bel smeren","Zadel draaien"],correct:1,icon:"c2 r2",hint:"Zoek eerst waar de lucht ontsnapt." },
  { minAge:13,type:"VRAAG",q:"Wat is de taak van een ventiel?",answers:["Lucht in de band houden","De ketting sturen","Het stuur vastzetten","De lamp bedienen"],correct:0,icon:"c2 r1",hint:"De pomp sluit hierop aan." },
  { minAge:14,type:"VRAAG",q:"Wat doet een achterderailleur?",answers:["De band oppompen","De ketting naar een ander tandwiel sturen","Het zadel veren","De remschijf koelen"],correct:1,icon:"mtb c3 r1",hint:"Dit onderdeel beweegt de ketting bij het schakelen." },
  { minAge:14,type:"VRAAG",q:"Waarom heeft een mountainbike een verende voorvork?",answers:["Om schokken op te vangen","Om de ketting te smeren","Om bagage te dragen","Om harder te bellen"],correct:0,icon:"mtb c1 r1",hint:"Denk aan wortels, stenen en kuilen." },
  { minAge:14,type:"VRAAG",q:"Welk onderdeel draait mee met de pedalen?",answers:["Crankstel","Remklauw","Stuurpen","Ventiel"],correct:0,icon:"mtb c2 r1",hint:"De pedalen zitten hieraan vast." },
  { minAge:14,type:"VRAAG",q:"Waar grijpt een schijfrem op aan?",answers:["Op het zadel","Op de remschijf","Op de ketting","Op het ventiel"],correct:1,icon:"mtb c1 r2",hint:"De ronde metalen schijf zit bij de naaf." },
  { minAge:14,type:"PECH",q:"De ketting slaat over bij het schakelen. Wat controleer je?",answers:["Derailleurafstelling en slijtage","Kleur van het frame","Hoogte van de lamp","Stand van de bel"],correct:0,icon:"mtb c3 r1",hint:"Kijk naar de aandrijving en afstelling." },
  { minAge:14,type:"VRAAG",q:"Waarom hebben mountainbikebanden grove noppen?",answers:["Voor meer grip","Voor minder lucht","Voor een stillere bel","Voor meer licht"],correct:0,icon:"mtb c0 r0",hint:"Noppen grijpen in losse grond." },
  { minAge:14,type:"PECH",q:"Een remschijf loopt aan. Wat controleer je eerst?",answers:["Of wiel en remklauw recht staan","Of het zadel zacht is","Of de bel werkt","Of de band schoon is"],correct:0,icon:"mtb c0 r2",hint:"De schijf moet vrij tussen de remblokken lopen." },
  { minAge:14,type:"VRAAG",q:"Waar zitten de kleinste tandwielen van de cassette?",answers:["Bij het achterwiel","Onder het zadel","In de voorvork","Op het stuur"],correct:0,icon:"mtb c2 r2",hint:"De cassette zit op de achternaaf." },
  { minAge:14,type:"VRAAG",q:"Welke versnelling gebruik je meestal bij een steile klim?",answers:["Een lichte versnelling","De zwaarste versnelling","Geen versnelling","Alleen de voorrem"],correct:0,icon:"mtb c3 r2",hint:"Je wilt makkelijker kunnen ronddraaien." },
  { minAge:14,type:"PECH",q:"Er zit speling op het stuur. Wat moet je doen?",answers:["Stoppen en balhoofd of stuurpen controleren","Harder fietsen","De band leeg laten","Alleen de bel vastzetten"],correct:0,icon:"mtb c2 r0",hint:"Los stuurwerk is onveilig." },
  { minAge:14,type:"VRAAG",q:"Wat is belangrijk bij het vastzetten van onderdelen?",answers:["Het juiste aanhaalmoment","Zo hard mogelijk draaien","Alle bouten los laten","Alleen olie gebruiken"],correct:0,icon:"c3 r1",hint:"Te los én te vast kan schade geven." },
  { minAge:14,type:"PECH",q:"Je ziet een diepe snee in de buitenband. Wat doe je?",answers:["Band vervangen","Alleen extra lucht erin","Bel vervangen","Ketting inkorten"],correct:0,icon:"mtb c0 r0",hint:"Een beschadigde buitenband kan openscheuren." },
  { minAge:14,type:"VRAAG",q:"Met welk gereedschap meet je slijtage van een fietsketting?",answers:["Kettingchecker","Bandenlichter","Spaaksleutel","Fietspomp"],correct:0,icon:"mtb c3 r1",hint:"Dit meetgereedschap leg je tussen de schakels van de ketting." },
  { minAge:14,type:"PECH",q:"Er is olie op de remschijf gekomen. Wat is veilig?",answers:["Doorrijden tot het verdampt","De schijf en remblokken goed controleren en ontvetten of vervangen","Meer olie aanbrengen","Alleen de band oppompen"],correct:1,icon:"mtb c1 r2",hint:"Olie vermindert de remkracht sterk." },
  { minAge:14,type:"VRAAG",q:"Waarom rijd je in los zand vaak met iets lagere bandenspanning?",answers:["Voor meer grip","Om de remschijf te koelen","Om de bel harder te laten klinken","Voor een hogere zadelstand"],correct:0,icon:"mtb c0 r0",hint:"De band raakt dan met een groter vlak de ondergrond." },
  { minAge:14,type:"PECH",q:"Je bent hard gevallen met je helm. Wat doe je vóór de volgende rit?",answers:["Alleen de helm schoonmaken","De helm controleren en bij schade of een harde klap vervangen","De riempjes losknippen","Niets, een helm kan niet beschadigen"],correct:1,icon:"mtb c2 r0",hint:"Schade aan een helm is niet altijd aan de buitenkant zichtbaar." },
  { minAge:14,type:"VRAAG",q:"Wat controleer je bij een tubeless mountainbikeband die langzaam leegloopt?",answers:["Afdichting, ventiel en sealant","Alleen de fietsbel","De hoogte van het stuur","De kleur van de velg"],correct:0,icon:"mtb c0 r0",hint:"Een tubeless band moet luchtdicht zijn en voldoende afdichtmiddel hebben." }
];

const state = {
  players: [], currentPlayer: 0, round: 1, sound: true,
  mountOrder: [], trayOrder: [], mounted: new Set(), selectedPart: null,
  buildStartedAt: 0, timerHandle: null, course: null, bike: null,
  raceStartedAt: 0, animation: null, lastFrame: 0, challenge: null,
  keys: new Set(), messageTimer: null, levelCourses: [], currentLevel: 0,
  lightPoints: 0, questionOrder: [], questionPool: [], activeParts: [], activeConfig:null,
  courseSetsByAge:{}, questionOrdersByAge:{}, roundSeed:0,
  rearLightSelected: false, rearLightMounted: false, restartingLevel:false
};

function loadGameImage(src) {
  if (typeof Image === "undefined") return null;
  const image = new Image();
  image.src = src;
  image.addEventListener("load", () => { if (state.bike) drawCourse(); });
  return image;
}

const roadBackgrounds = [
  loadGameImage("assets/road-urban-v2.webp"),
  loadGameImage("assets/road-bridge-v2.webp"),
  loadGameImage("assets/road-country-v2.webp")
];
const cyclistRearImage = loadGameImage("assets/cyclist-rear-v2.png");
const mtbRiderRearImage = loadGameImage("assets/mtb-rider-rear-v3.png");
const oncomingCyclistImage = loadGameImage("assets/oncoming-cyclist-v3.png");
const routeHazardsImage = loadGameImage("assets/route-hazards-v3.png");
const trafficLightImage = loadGameImage("assets/traffic-light-v2.png");

const $ = id => document.getElementById(id);
const screens = ["setupScreen", "buildScreen", "approvalScreen", "raceScreen", "rearLightScreen", "betweenScreen", "resultsScreen"];

function configForAge(age) { return AGE_CONFIGS[Number(age)] || AGE_CONFIGS[12]; }
function currentConfig() { return state.activeConfig || configForAge(state.players[state.currentPlayer]?.age); }

function showScreen(id, phase) {
  screens.forEach(name => $(name).classList.toggle("active", name === id));
  $("phasePill").textContent = phase;
  window.scrollTo({ top:0, behavior:"smooth" });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function beep(kind="ok") {
  if (!state.sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === "ok" ? "sine" : "sawtooth";
    osc.frequency.value = kind === "ok" ? 620 : 170;
    gain.gain.setValueAtTime(.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .16);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .17);
  } catch (_) {}
}

function formatTime(ms) {
  const total = Math.max(0, ms) / 1000;
  const min = Math.floor(total / 60);
  const sec = Math.floor(total % 60);
  const tenth = Math.floor((total % 1) * 10);
  return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}.${tenth}`;
}

function startTimer(getTime) {
  stopTimer();
  const update = () => { $("timer").textContent = formatTime(getTime()); };
  update();
  state.timerHandle = setInterval(update, 100);
}

function stopTimer() {
  clearInterval(state.timerHandle);
  state.timerHandle = null;
}

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffle(items, random=Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderPlayerInputs() {
  const wrap = $("playerInputs");
  wrap.innerHTML = "";
  state.players.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "player-row";
    row.innerHTML = `<span class="player-number" style="background:${COLORS[i]}">${i + 1}</span><input maxlength="18" autocomplete="off" aria-label="Naam speler ${i + 1}" placeholder="Naam speler ${i + 1}" value="${escapeHtml(p.name || "")}"><select class="player-age" aria-label="Leeftijd speler ${i + 1}"><option value="12"${Number(p.age)===12?" selected":""}>12 jaar</option><option value="13"${Number(p.age)===13?" selected":""}>13 jaar</option><option value="14"${Number(p.age)===14?" selected":""}>14 jaar</option></select>${state.players.length > 2 ? '<button class="remove-player" type="button" aria-label="Verwijder speler">×</button>' : ""}`;
    row.querySelector("input").addEventListener("input", e => { state.players[i].name = e.target.value; });
    row.querySelector("select").addEventListener("change", e => { state.players[i].age = Number(e.target.value); });
    row.querySelector(".remove-player")?.addEventListener("click", () => { state.players.splice(i, 1); renderPlayerInputs(); });
    wrap.appendChild(row);
  });
  $("addPlayerBtn").disabled = state.players.length >= 4;
}

function addPlayer() {
  if (state.players.length >= 4) return;
  state.players.push({ name:"", age:12 });
  renderPlayerInputs();
  setTimeout(() => $("playerInputs").lastElementChild.querySelector("input").focus(), 0);
}

function startFromSignup() {
  const names = state.players.map(p => p.name.trim());
  if (names.some(name => !name)) {
    $("setupError").textContent = "Vul voor iedere speler een naam in.";
    return;
  }
  if (new Set(names.map(name => name.toLowerCase())).size !== names.length) {
    $("setupError").textContent = "Gebruik voor iedere speler een andere naam.";
    return;
  }
  beginRound(state.players.map((p,index) => ({name:names[index],age:Number(p.age)||12})));
}

function beginRound(entries) {
  const seed = (Date.now() ^ (state.round * 2654435761)) >>> 0;
  state.roundSeed = seed;
  state.courseSetsByAge = {};
  state.questionOrdersByAge = {};
  Object.values(AGE_CONFIGS).forEach(config => {
    state.courseSetsByAge[config.age] = Array.from({length:config.levelCount}, (_, index) => createCourse((seed + config.age * 7919 + index * 104729) >>> 0, index, config));
    const pool = QUESTIONS.filter(question => !question.minAge || question.minAge <= config.age);
    state.questionOrdersByAge[config.age] = shuffle([...Array(pool.length).keys()], mulberry32(seed ^ (config.age * 0x9e3779b9)));
  });
  state.currentPlayer = 0;
  state.players = entries.map((entry, i) => ({
    name:entry.name, age:Number(entry.age)||12, color:COLORS[i], buildTime:0, raceTime:0, totalTime:0,
    buildPenalty:0, racePenalty:0, mistakes:0
  }));
  $("roundPill").textContent = `Ronde ${state.round}`;
  startBuildTurn();
}

function activatePlayerProfile() {
  const player = state.players[state.currentPlayer];
  state.activeConfig = configForAge(player.age);
  state.activeParts = state.activeConfig.parts;
  state.levelCourses = state.courseSetsByAge[player.age];
  state.course = state.levelCourses[0];
  state.questionPool = QUESTIONS.filter(question => !question.minAge || question.minAge <= player.age);
  state.questionOrder = state.questionOrdersByAge[player.age];
}

function startBuildTurn() {
  const player = state.players[state.currentPlayer];
  activatePlayerProfile();
  const random = mulberry32((state.levelCourses[0].seed + (state.currentPlayer + 1) * 9176) >>> 0);
  state.mountOrder = shuffle(state.activeParts, random);
  state.trayOrder = shuffle(state.activeParts, random);
  state.mounted = new Set();
  state.selectedPart = null;
  player.buildPenalty = 0;
  state.buildStartedAt = performance.now();
  $("builderName").textContent = player.name;
  $("builderName").style.color = player.color;
  $("playerTurnNumber").textContent = `${state.currentPlayer + 1} VAN ${state.players.length}`;
  $("buildProfile").textContent = `${player.age} JAAR · ${state.activeConfig.title.toUpperCase()}`;
  $("buildTotal").textContent = state.activeParts.length;
  $("buildBikeImage").src = state.activeConfig.bike === "mtb" ? "assets/mtb-frame-workshop-v3.webp" : "assets/bike-frame-workshop.png";
  $("buildBikeImage").alt = state.activeConfig.bike === "mtb" ? "Kaal mountainbikeframe op een montagestandaard" : "Kaal stadsfietsframe op een montagestandaard";
  showScreen("buildScreen", "Monteren");
  startTimer(() => performance.now() - state.buildStartedAt + player.buildPenalty);
  renderBuild();
}

function renderBuild() {
  const current = state.mountOrder[state.mounted.size];
  $("buildCount").textContent = state.mounted.size;
  $("taskNumber").textContent = `Opdracht ${Math.min(state.mounted.size + 1, state.activeParts.length)}`;
  $("targetPart").textContent = current ? current.instruction : "Alle onderdelen zijn gemonteerd.";

  const hotspots = $("bikeHotspots");
  hotspots.innerHTML = "";
  state.activeParts.forEach(part => {
    const spot = document.createElement("button");
    const done = state.mounted.has(part.id);
    const active = current?.id === part.id;
    spot.type = "button";
    spot.className = `hotspot${done ? " done" : ""}${active ? " current" : ""}`;
    spot.style.left = `${part.pos[0]}%`;
    spot.style.top = `${part.pos[1]}%`;
    spot.dataset.part = part.id;
    spot.setAttribute("aria-label", done ? `${part.label} gemonteerd` : `Montageplek ${part.label}`);
    spot.innerHTML = done ? `<span class="sprite mini ${part.sprite}" aria-hidden="true"></span><small>${part.label}</small>` : `<b>${active ? "↓" : "·"}</b>`;
    spot.addEventListener("dragover", e => { if (active) e.preventDefault(); });
    spot.addEventListener("drop", e => { e.preventDefault(); placePart(e.dataTransfer.getData("text/plain"), part.id); });
    spot.addEventListener("click", () => { if (state.selectedPart) placePart(state.selectedPart, part.id); });
    hotspots.appendChild(spot);
  });

  const grid = $("partsGrid");
  grid.innerHTML = "";
  state.trayOrder.forEach(part => {
    const used = state.mounted.has(part.id);
    const card = document.createElement("button");
    card.type = "button";
    card.draggable = !used;
    card.disabled = used;
    card.className = `part-card${used ? " used" : ""}${state.selectedPart === part.id ? " selected" : ""}`;
    card.dataset.part = part.id;
    card.innerHTML = `<span class="sprite ${part.sprite}" aria-hidden="true"></span><span>${part.label}</span><small>${used ? "Gemonteerd" : "Sleep mij"}</small>`;
    card.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", part.id); e.dataTransfer.effectAllowed = "move"; });
    card.addEventListener("click", () => { state.selectedPart = state.selectedPart === part.id ? null : part.id; renderBuild(); });
    grid.appendChild(card);
  });
}

function placePart(partId, hotspotId) {
  const current = state.mountOrder[state.mounted.size];
  const player = state.players[state.currentPlayer];
  if (!current || state.mounted.has(partId)) return;
  const feedback = $("buildFeedback");
  if (partId !== current.id || hotspotId !== current.id) {
    player.mistakes++;
    player.buildPenalty += 2000;
    feedback.textContent = `Nog niet goed. +2 seconden. Zoek de plek voor: ${current.label}.`;
    feedback.className = "feedback bad";
    beep("bad");
    return;
  }
  state.mounted.add(partId);
  state.selectedPart = null;
  feedback.textContent = `${current.label} zit goed vast.`;
  feedback.className = "feedback good";
  beep("ok");
  renderBuild();
  if (state.mounted.size === state.activeParts.length) {
    player.buildTime = performance.now() - state.buildStartedAt + player.buildPenalty;
    stopTimer();
    $("timer").textContent = formatTime(player.buildTime);
    setTimeout(showApproval, 650);
  }
}

function showApproval() {
  const player = state.players[state.currentPlayer];
  const config = currentConfig();
  $("approvedPlayer").textContent = player.name;
  $("approvedPlayer").style.color = player.color;
  $("approvalSummary").textContent = `jouw ${config.title.toLowerCase()} met ${config.parts.length} onderdelen is goedgekeurd. Voltooi nu ${config.levelCount} levels en verdien het achterlicht.`;
  showScreen("approvalScreen", "Goedgekeurd");
}

function createCourse(seed, levelIndex=0, config=AGE_CONFIGS[12]) {
  const random = mulberry32(seed);
  const basicLights = [
    [.72], [.25], [.77], [.18,.75], [.26,.80],
    [.20,.72], [.22,.68,.86], [.16,.72,.88], [.20,.76,.90], [.18,.42,.82]
  ];
  const basicCheckpoints = [.46,.52,.58,.44,.50,.56,.42,.48,.54,.60];
  const backgroundOrder = [0,0,1,2,0,1,0,2,0,1,2,1,0,2,1];
  const templates = [
    [[110,620],[280,585],[390,515],[315,445],[485,380],[590,310],[710,245],[900,175],[1090,88]],
    [[105,625],[300,565],[230,490],[420,425],[520,345],[640,305],[770,230],[955,165],[1090,88]],
    [[100,620],[245,550],[390,500],[335,420],[500,355],[620,305],[735,230],[900,158],[1095,84]],
    [[110,625],[315,580],[270,500],[445,430],[395,360],[605,305],[725,232],[920,160],[1090,90]]
  ];
  const raw = templates[Math.floor(random() * templates.length)];
  const points = raw.map((p, i) => ({
    x:p[0] + (i === 0 || i === raw.length - 1 ? 0 : (random() - .5) * 28),
    y:p[1] + (i === 0 || i === raw.length - 1 ? 0 : (random() - .5) * 14)
  }));
  const segments = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const length = Math.hypot(dx, dy);
    segments.push({ a:points[i], b:points[i + 1], dx, dy, length, start:total });
    total += length;
  }
  const widthStart = config.age === 12 ? 74 : config.age === 13 ? 68 : 62;
  const widthStep = config.age === 12 ? 3 : config.age === 13 ? 2.2 : 1.65;
  const minimumWidth = config.age === 12 ? 47 : config.age === 13 ? 43 : 38;
  let checkpoints = [basicCheckpoints[levelIndex % basicCheckpoints.length]];
  if (config.age === 13 && levelIndex % config.extraQuestionEvery === 1) checkpoints = [.34,.68];
  if (config.age === 14) checkpoints = levelIndex % config.extraQuestionEvery === 2 ? [.25,.50,.76] : [.34,.68];
  const lightCount = config.age === 12 ? null : config.age === 13 ? 2 + (levelIndex >= 7 ? 1 : 0) : 2 + Math.floor(levelIndex / 5);
  const requestedLights = lightCount ? Array.from({length:lightCount},(_,index)=>(index+1)/(lightCount+1)+(random()-.5)*.045) : basicLights[levelIndex % basicLights.length];
  const generatedLights = [];
  requestedLights.forEach(desired => {
    const candidates=Array.from({length:73},(_,index)=>.14+index*.01)
      .filter(progress=>checkpoints.every(value=>Math.abs(value-progress)>=.065))
      .filter(progress=>generatedLights.every(value=>Math.abs(value-progress)>=.105))
      .sort((a,b)=>Math.abs(a-desired)-Math.abs(b-desired));
    generatedLights.push(candidates[0] ?? desired);
  });
  generatedLights.sort((a,b)=>a-b);
  const course = {
    seed, points, segments, total, halfWidth:Math.max(minimumWidth,widthStart-levelIndex*widthStep),
    levelIndex, levelName:LEVEL_NAMES[levelIndex] || `Level ${levelIndex + 1}`,
    difficulty:levelIndex+1, backgroundIndex:backgroundOrder[levelIndex % backgroundOrder.length], age:config.age,
    distanceKm:config.distancePerLevel, lengthMultiplier:(config.age===12?1.15:config.age===13?1.28:1.42)+levelIndex*(config.age===14?.035:.027),
    checkpoints:checkpoints.sort((a,b)=>a-b),
    trafficLights:generatedLights.map((progress,index)=>({progress,phaseOffset:(seed%5000)+index*2100})),
    bridge:{start:.47,end:.57},
    obstacles:[], oncoming:[], scenery:[],
    questionOrder:[]
  };
  let bridgeProgress=.52,bridgeDistance=Infinity;
  for(let i=0;i<=100;i++){
    const progress=i/100;
    const distance=Math.abs(pointAt(course,progress).y-310);
    if(distance<bridgeDistance){bridgeDistance=distance;bridgeProgress=progress;}
  }
  course.bridge={start:Math.max(.05,bridgeProgress-.045),end:Math.min(.95,bridgeProgress+.045)};
  const obstacleGrowth = Math.floor(levelIndex/(config.age===14?3:2));
  const obstacleCount = (config.age===12?2:config.age===13?3:5) + obstacleGrowth;
  const blocked = [...course.checkpoints,...course.trafficLights.map(light=>light.progress)];
  for(let i=0;i<obstacleCount;i++) {
    const desired=.10+(i+1)*(.80/(obstacleCount+1))+(random()-.5)*.018;
    const obstacleCandidates=Array.from({length:85},(_,index)=>.10+index*.01)
      .filter(progress=>blocked.every(value=>Math.abs(value-progress)>=.028))
      .sort((a,b)=>Math.abs(a-desired)-Math.abs(b-desired));
    const progress=obstacleCandidates[0] ?? desired;
    const p = pointAt(course, progress);
    const offset = (random()*2-1)*(course.halfWidth-18);
    const regularTypes=["cone","puddle","barrier","crate"];
    const expertTypes=["bin","roadworks","speedbump","pothole"];
    const typePool=config.age===14?[...regularTypes,...expertTypes]:regularTypes;
    const obstacleType=config.age===14&&i<expertTypes.length?expertTypes[(i+levelIndex)%expertTypes.length]:typePool[Math.floor(random() * typePool.length)];
    course.obstacles.push({
      x:p.x - Math.sin(p.angle) * offset, y:p.y + Math.cos(p.angle) * offset,
      progress, offset, id:i, radius:i % 3 === 0 ? 16 : 13,
      type:obstacleType
    });
    blocked.push(progress);
  }
  const oncomingCount=config.age===12?1:config.age===13?2:2+Math.floor(levelIndex/5);
  for(let i=0;i<oncomingCount;i++){
    const desired=.16+(i+1)*(.70/(oncomingCount+1))+(random()-.5)*.05;
    const candidates=Array.from({length:81},(_,index)=>.11+index*.01)
      .filter(progress=>blocked.every(value=>Math.abs(value-progress)>=.025))
      .sort((a,b)=>Math.abs(a-desired)-Math.abs(b-desired));
    const progress=candidates[0] ?? desired;
    const lane=(i%2===0?-1:1)*(course.halfWidth*(.36+random()*.20));
    course.oncoming.push({id:i,progress,offset:lane,drift:(random()-.5)*8});
    blocked.push(progress);
  }
  return course;
}

function pointAt(course, progress) {
  const target = Math.max(0, Math.min(1, progress)) * course.total;
  const seg = course.segments.find(s => target <= s.start + s.length) || course.segments.at(-1);
  const t = Math.max(0, Math.min(1, (target - seg.start) / seg.length));
  return { x:seg.a.x + seg.dx*t, y:seg.a.y + seg.dy*t, angle:Math.atan2(seg.dy, seg.dx) };
}

function nearestOnCourse(course, x, y) {
  let best = { distance:Infinity, progress:0, x:0, y:0 };
  course.segments.forEach(seg => {
    const length2 = seg.length * seg.length;
    const t = Math.max(0, Math.min(1, ((x-seg.a.x)*seg.dx + (y-seg.a.y)*seg.dy) / length2));
    const px = seg.a.x + seg.dx*t;
    const py = seg.a.y + seg.dy*t;
    const distance = Math.hypot(x-px, y-py);
    if (distance < best.distance) best = { distance, progress:(seg.start + seg.length*t)/course.total, x:px, y:py };
  });
  return best;
}

function startRide() {
  const player = state.players[state.currentPlayer];
  const config = currentConfig();
  player.racePenalty = 0;
  state.currentLevel = 0;
  state.lightPoints = 0;
  state.rearLightSelected = false;
  state.rearLightMounted = false;
  state.raceStartedAt = performance.now();
  state.lastFrame = performance.now();
  state.challenge = null;
  state.keys.clear();
  $("riderName").textContent = player.name;
  $("riderName").style.color = player.color;
  $("raceTurnNumber").textContent = `${state.currentPlayer + 1} VAN ${state.players.length}`;
  $("raceProfile").textContent = `${player.age} JAAR · ${config.title.toUpperCase()}`;
  $("raceDescription").textContent = player.age===12 ? "De vertrouwde route met vragen, verkeerslichten en hindernissen." : player.age===13 ? "Een langere route met extra vragen, onderdelen en tegenliggers." : "De langste mountainbikeroute met extra vragen, tegenliggers en zware hindernissen.";
  $("levelText").textContent = `1 / ${config.levelCount}`;
  $("distanceText").textContent = `0,0 / ${String(config.totalKm).replace(".",",")} km`;
  $("lightPointsText").textContent = `0 / ${config.levelCount}`;
  $("routeProgressBar").style.width = "0%";
  $("penaltyText").textContent = "0 sec";
  $("challengePanel").classList.add("hidden");
  $("levelPanel").classList.add("hidden");
  $("crashPanel").classList.add("hidden");
  $("trafficAlert").className = "traffic-alert hidden";
  showScreen("raceScreen", "Fietsen");
  startTimer(() => performance.now() - state.raceStartedAt + player.racePenalty);
  startLevel(0);
  cancelAnimationFrame(state.animation);
  state.animation = requestAnimationFrame(raceFrame);
}

function startLevel(levelIndex) {
  const config=currentConfig();
  state.currentLevel = levelIndex;
  state.course = state.levelCourses[levelIndex];
  const start = pointAt(state.course, 0);
  state.bike = {
    x:start.x, y:start.y, angle:start.angle, speed:0, progress:0, offset:0,
    safeProgress:0, immuneUntil:0, asked:new Set(), hitObstacles:new Set(), levelComplete:false, roadTravel:0,
    lights:state.course.trafficLights.map(light => ({...light,state:"green",triggered:false,stopped:false,passed:false,violated:false,lastState:"green"}))
  };
  state.challenge = null;
  state.keys.clear();
  state.lastFrame = performance.now();
  $("levelText").textContent = `${levelIndex + 1} / ${config.levelCount}`;
  $("environmentText").textContent = state.course.levelName;
  const progress=levelIndex/config.levelCount;
  $("difficultyText").textContent = progress < .3 ? `Niveau ${levelIndex+1} · rustig` : progress < .7 ? `Niveau ${levelIndex+1} · opletten` : `Niveau ${levelIndex+1} · uitdagend`;
  $("levelPanel").classList.add("hidden");
  $("trafficAlert").className = "traffic-alert hidden";
  showRaceMessage(`Level ${levelIndex + 1}: ${state.course.levelName}. Houd ↑ ingedrukt.`, 3000);
  drawCourse();
}

function raceFrame(now) {
  if (!state.bike) return;
  const dt = Math.min(.05, (now - state.lastFrame) / 1000);
  state.lastFrame = now;
  updateBike(dt, now);
  if (state.bike) {
    drawCourse();
    state.animation = requestAnimationFrame(raceFrame);
  }
}

function updateBike(dt, now) {
  const bike = state.bike;
  if (!bike || state.challenge) return;
  const config=currentConfig();
  const maxSpeed = (config.age===12?118:config.age===13?124:132) + state.currentLevel*(config.age===14?3.4:3);
  if (state.keys.has("ArrowUp")) bike.speed = Math.min(maxSpeed, bike.speed + 220*dt);
  else bike.speed = Math.max(0, bike.speed - 8*dt);
  if (state.keys.has("ArrowDown")) bike.speed = Math.max(0, bike.speed - 270*dt);
  const sideways = (96 + state.currentLevel*3) * dt * (.40 + bike.speed/maxSpeed);
  if (state.keys.has("ArrowLeft")) bike.offset -= sideways;
  if (state.keys.has("ArrowRight")) bike.offset += sideways;
  bike.progress = Math.min(1, bike.progress + bike.speed*dt/(state.course.total*state.course.lengthMultiplier));
  bike.roadTravel += bike.speed*dt;
  syncBikePosition();

  const roadLimit=state.course.halfWidth-13;
  if (Math.abs(bike.offset)>roadLimit) {
    bike.offset=Math.sign(bike.offset)*roadLimit;
    bike.speed*=.62;
    syncBikePosition();
    if(now>bike.immuneUntil) applyCoursePenalty("Je raakte de berm. +2 seconden.",2000);
  }
  updateTrafficLights(now);
  const obstacle=state.course.obstacles.find(o=>!bike.hitObstacles.has(o.id)&&Math.abs(bike.progress-o.progress)<.012&&Math.abs(bike.offset-o.offset)<17);
  if(obstacle){
    bike.hitObstacles.add(obstacle.id);
    bike.speed=Math.max(24,bike.speed*.45);
    bike.offset=Math.max(-roadLimit,Math.min(roadLimit,bike.offset+(bike.offset>=0?-24:24)));
    syncBikePosition();
    applyCoursePenalty("Hindernis geraakt. Je kunt verder. +2 seconden.",2000);
  }
  const oncoming=state.course.oncoming.find(rider=>{
    rider.displayOffset=rider.offset+Math.sin(now*.0015+rider.id*2.1)*rider.drift;
    return Math.abs(bike.progress-rider.progress)<.012&&Math.abs(bike.offset-rider.displayOffset)<21;
  });
  if(oncoming){
    restartAfterOncomingCollision();
    return;
  }

  if (bike.progress > bike.safeProgress + .02) bike.safeProgress = bike.progress;

  state.course.checkpoints.forEach((checkpoint, index) => {
    if (bike.progress >= checkpoint && !bike.asked.has(index)) {
      bike.asked.add(index);
      openChallenge(index);
    }
  });
  const overallProgress = (state.currentLevel + bike.progress) / config.levelCount;
  const travelled = overallProgress * config.totalKm;
  $("distanceText").textContent = `${travelled.toFixed(1).replace(".",",")} / ${String(config.totalKm).replace(".",",")} km`;
  $("routeProgressBar").style.width = `${Math.min(100,overallProgress*100)}%`;

  if (bike.progress >= .995) completeLevel();
}

function completeLevel() {
  const bike = state.bike;
  if (!bike || bike.levelComplete) return;
  bike.levelComplete = true;
  bike.speed = 0;
  const config=currentConfig();
  state.lightPoints = state.currentLevel + 1;
  $("lightPointsText").textContent = `${state.lightPoints} / ${config.levelCount}`;
  $("routeProgressBar").style.width = `${state.lightPoints/config.levelCount*100}%`;
  beep("ok");
  if (state.lightPoints === config.levelCount) {
    showRearLightReward();
    return;
  }
  state.challenge = { kind:"level" };
  $("levelCompleteTitle").textContent = `Level ${state.currentLevel + 1} gehaald!`;
  $("levelCompleteText").textContent = `Goed gedaan. Je hebt ${state.lightPoints} van de ${config.levelCount} lichtpunten.`;
  $("nextLevelBtn").textContent = `Start level ${state.currentLevel + 2}`;
  $("levelPanel").classList.remove("hidden");
}

function nextLevel() {
  if (state.currentLevel >= currentConfig().levelCount - 1) return;
  startLevel(state.currentLevel + 1);
}

function syncBikePosition() {
  if (!state.bike) return;
  const p = pointAt(state.course,state.bike.progress);
  state.bike.angle = p.angle;
  state.bike.x = p.x - Math.sin(p.angle)*state.bike.offset;
  state.bike.y = p.y + Math.cos(p.angle)*state.bike.offset;
}

function updateTrafficLights(now) {
  const bike = state.bike;
  for (const light of bike.lights) {
    if (light.passed) continue;
    const phase=(now+light.phaseOffset)%7200;
    const nextState=phase<2900?"red":phase<6100?"green":"amber";
    light.lastState=light.state;
    light.state=nextState;
    if (!light.triggered && bike.progress >= light.progress - .15) {
      light.triggered = true;
      showTrafficAlert(light.state,light.state==="red"?"ROOD — REM EN STOP!":light.state==="amber"?"ORANJE — REM!":"GROEN — RIJD DOOR!");
    }
    if (!light.triggered) continue;
    if(light.state!==light.lastState){
      if(light.state==="red") showTrafficAlert("red","ROOD — REM EN STOP!");
      else if(light.state==="amber") showTrafficAlert("amber","ORANJE — REM!");
      else showTrafficAlert("green","GROEN — RIJD DOOR!");
    }
    if (light.state === "red") {
      if (bike.speed <= 3 && bike.progress < light.progress - .003) {
        light.stopped = true;
        $("trafficText").textContent = "GOED GESTOPT — WACHT";
      }
      if (bike.progress >= light.progress - .002 && !light.violated) {
        light.violated = true;
        applyCoursePenalty("Je reed door rood. Je kunt verder. +3 seconden.",3000);
        showTrafficAlert("red","DOOR ROOD — +3 SEC");
      }
    }
    if (light.state === "green" && light.stopped && light.lastState!=="green") beep("ok");
    if (bike.progress > light.progress + .018) {
      light.passed = true;
      $("trafficAlert").className = "traffic-alert hidden";
    }
    break;
  }
}

function showTrafficAlert(stateName,text) {
  $("trafficAlert").className = `traffic-alert ${stateName}`;
  $("trafficText").textContent = text;
}

function applyCoursePenalty(message,penalty=2000) {
  const player = state.players[state.currentPlayer];
  player.racePenalty += penalty;
  player.mistakes++;
  state.bike.immuneUntil = performance.now() + 1000;
  $("penaltyText").textContent = `${player.racePenalty/1000} sec`;
  showRaceMessage(message, 1900);
  beep("bad");
}

function restartAfterOncomingCollision() {
  if (state.restartingLevel) return;
  state.restartingLevel = true;
  state.keys.clear();
  state.bike.speed = 0;
  state.challenge = {kind:"crash"};
  state.players[state.currentPlayer].mistakes++;
  $("crashPanel").classList.remove("hidden");
  beep("bad");
  setTimeout(() => {
    $("crashPanel").classList.add("hidden");
    state.restartingLevel = false;
    startLevel(state.currentLevel);
    showRaceMessage("Opnieuw gestart. Blijf rechts en kijk vooruit.",2600);
  },1800);
}

function openChallenge(checkpointIndex) {
  const player = state.players[state.currentPlayer];
  const previousQuestions=state.levelCourses.slice(0,state.currentLevel).reduce((sum,course)=>sum+course.checkpoints.length,0);
  const orderIndex = (state.currentPlayer * 7 + previousQuestions + checkpointIndex) % state.questionOrder.length;
  const question = state.questionPool[state.questionOrder[orderIndex]];
  state.challenge = { kind:"question", question, checkpointIndex };
  state.bike.speed = 0;
  $("challengeType").textContent = question.type;
  $("challengePlayer").textContent = player.name;
  $("challengePlayer").style.color = player.color;
  $("challengeQuestion").textContent = question.q;
  $("challengeIcon").className = `sprite large ${question.icon}`;
  $("challengeFeedback").textContent = "";
  $("challengeFeedback").className = "feedback";
  const answers = $("answerButtons");
  answers.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => answerChallenge(index));
    answers.appendChild(button);
  });
  $("challengePanel").classList.remove("hidden");
}

function answerChallenge(index) {
  if (!state.challenge || state.challenge.kind !== "question") return;
  const { question } = state.challenge;
  const player = state.players[state.currentPlayer];
  const buttons = [...$("answerButtons").querySelectorAll("button")];
  if (index !== question.correct) {
    player.racePenalty += 3000;
    player.mistakes++;
    $("penaltyText").textContent = `${player.racePenalty/1000} sec`;
    $("challengeFeedback").textContent = `Niet goed. +3 seconden. Hint: ${question.hint}`;
    $("challengeFeedback").className = "feedback bad";
    buttons.forEach(button => button.disabled = true);
    setTimeout(() => buttons.forEach(button => button.disabled = false), 900);
    beep("bad");
    return;
  }
  $("challengeFeedback").textContent = question.type === "PECH" ? "Goed gerepareerd! Je mag verder." : "Goed antwoord! Je mag verder.";
  $("challengeFeedback").className = "feedback good";
  buttons.forEach(button => button.disabled = true);
  beep("ok");
  setTimeout(() => { $("challengePanel").classList.add("hidden"); state.challenge = null; }, 500);
}

function showRearLightReward() {
  cancelAnimationFrame(state.animation);
  state.animation = null;
  state.keys.clear();
  state.bike = null;
  state.challenge = { kind:"rear-light" };
  const player = state.players[state.currentPlayer];
  const config=currentConfig();
  $("rearLightPlayer").textContent = player.name;
  $("rearLightPlayer").style.color = player.color;
  $("rewardLevelTotal").textContent = config.levelCount;
  $("rewardPoints").textContent = config.levelCount;
  $("rewardPointsTotal").textContent = config.levelCount;
  $("rewardNeed").textContent = config.levelCount;
  $("rewardBikeImage").src = config.bike === "mtb" ? "assets/mtb-frame-workshop-v3.webp" : "assets/bike-frame-workshop.png";
  $("rewardBikeImage").alt = config.bike === "mtb" ? "Mountainbike in de werkplaats met een lege plek voor het achterlicht" : "Stadsfiets in de werkplaats met een lege plek voor het achterlicht";
  $("rearLightFeedback").textContent = "";
  $("rearLightFeedback").className = "feedback";
  $("rearLightPart").className = "rear-light-part";
  $("rearLightPart").disabled = false;
  $("rearLightTarget").className = "rear-light-target";
  $("rearLightTarget").innerHTML = "<b>LEGE PLEK</b><small>Achterlicht</small>";
  renderRewardBikeParts();
  showScreen("rearLightScreen", "Achterlicht monteren");
}

function renderRewardBikeParts() {
  const wrap = $("rewardBikeParts");
  wrap.innerHTML = "";
  state.activeParts.forEach(part => {
    const mounted = document.createElement("span");
    mounted.className = `reward-mounted-part sprite mini ${part.sprite}`;
    mounted.style.left = `${part.pos[0]}%`;
    mounted.style.top = `${part.pos[1]}%`;
    wrap.appendChild(mounted);
  });
}

function selectRearLight() {
  if (state.rearLightMounted) return;
  state.rearLightSelected = !state.rearLightSelected;
  $("rearLightPart").classList.toggle("selected", state.rearLightSelected);
  $("rearLightFeedback").textContent = state.rearLightSelected ? "Achterlicht gekozen. Tik nu op de lege plek." : "";
}

function mountRearLight() {
  if (state.rearLightMounted) return;
  state.rearLightMounted = true;
  state.rearLightSelected = false;
  $("rearLightPart").className = "rear-light-part mounted";
  $("rearLightPart").disabled = true;
  $("rearLightTarget").className = "rear-light-target mounted";
  $("rearLightTarget").innerHTML = '<img src="assets/rear-light.png" alt="Achterlicht gemonteerd"><strong>GOED GEMONTEERD</strong>';
  $("rearLightFeedback").textContent = "Het achterlicht zit goed vast. De fiets is nu helemaal klaar!";
  $("rearLightFeedback").className = "feedback good";
  state.challenge = null;
  beep("ok");
  setTimeout(finishTurn, 1300);
}

function finishTurn() {
  cancelAnimationFrame(state.animation);
  state.animation = null;
  stopTimer();
  state.keys.clear();
  const player = state.players[state.currentPlayer];
  player.raceTime = performance.now() - state.raceStartedAt + player.racePenalty;
  player.totalTime = player.buildTime + player.raceTime;
  state.bike = null;
  $("trafficAlert").className = "traffic-alert hidden";
  $("timer").textContent = formatTime(player.totalTime);
  beep("ok");
  if (state.currentPlayer === state.players.length - 1) {
    showResults();
    return;
  }
  $("finishedPlayer").textContent = player.name;
  $("finishedPlayer").style.color = player.color;
  $("turnSummary").textContent = `${player.age} jaar · ${currentConfig().levelCount} levels gehaald · achterlicht gemonteerd · totale tijd: ${formatTime(player.totalTime)} · ${player.mistakes} fout${player.mistakes === 1 ? "" : "en"}`;
  $("nextPlayer").textContent = state.players[state.currentPlayer + 1].name;
  showScreen("betweenScreen", "Wisselen");
}

function nextTurn() {
  state.currentPlayer++;
  $("timer").textContent = "00:00.0";
  startBuildTurn();
}

function showResults() {
  const results = [...state.players].sort((a,b) => a.totalTime - b.totalTime);
  showScreen("resultsScreen", "Uitslag");
  $("podium").innerHTML = results.slice(0,3).map((p,i) => `<div class="podium-place"><span>${i===0?"🥇":i===1?"🥈":"🥉"}</span>${escapeHtml(p.name)}<small>${p.age} jaar</small></div>`).join("");
  $("resultList").innerHTML = results.map((p,i) => {const config=configForAge(p.age);return `<div class="result-row"><b>${i+1}</b><span>${escapeHtml(p.name)}<small>${p.age} jaar · ${config.parts.length} onderdelen · ${config.levelCount} levels · achterlicht · ${p.mistakes} fout${p.mistakes===1?"":"en"}</small></span><b>${formatTime(p.totalTime)}</b></div>`}).join("");
}

function restartWithNewRound() {
  const entries = state.players.map(p => ({name:p.name,age:p.age}));
  entries.push(entries.shift());
  state.round++;
  $("timer").textContent = "00:00.0";
  beginRound(entries);
}

function drawCourse() {
  const canvas = $("courseCanvas");
  const ctx = canvas.getContext("2d");
  const course = state.course;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const background=roadBackgrounds[course.backgroundIndex];
  if(background?.complete&&background.naturalWidth) drawBackgroundCover(ctx,background,canvas.width,canvas.height);
  else {ctx.fillStyle="#769b64";ctx.fillRect(0,0,canvas.width,canvas.height);}

  const shade=Math.max(0,state.currentLevel-5)*.025;
  if(shade){ctx.fillStyle=`rgba(8,24,34,${shade})`;ctx.fillRect(0,0,canvas.width,canvas.height);}
  drawRoadMotion(ctx);

  const items=[];
  course.obstacles.forEach(obstacle=>items.push({kind:"obstacle",progress:obstacle.progress,data:obstacle}));
  course.oncoming.forEach(rider=>items.push({kind:"oncoming",progress:rider.progress,data:rider}));
  course.checkpoints.forEach(progress=>items.push({kind:"checkpoint",progress,data:{}}));
  course.trafficLights.forEach((light,index)=>items.push({kind:"light",progress:light.progress,data:state.bike?.lights?.[index]||light}));
  items.push({kind:"finish",progress:1,data:{}});
  items.map(item=>({...item,projected:projectRoadObject(item.progress,item.kind==="light"?course.halfWidth*1.08:item.data.offset||0)}))
    .filter(item=>item.projected)
    .sort((a,b)=>a.projected.y-b.projected.y)
    .forEach(item=>{
      if(item.kind==="obstacle") drawPerspectiveObstacle(ctx,item.data,item.projected);
      else if(item.kind==="oncoming") drawPerspectiveOncoming(ctx,item.data,item.projected);
      else if(item.kind==="checkpoint") drawPerspectiveCheckpoint(ctx,item.projected);
      else if(item.kind==="light") drawPerspectiveTrafficLight(ctx,item.data,item.projected,item.progress);
      else drawPerspectiveFinish(ctx,item.projected);
    });

  if(state.bike) drawPerspectiveRider(ctx);
  const vignette=ctx.createRadialGradient(600,360,210,600,350,720);
  vignette.addColorStop(.55,"rgba(4,17,24,0)");vignette.addColorStop(1,"rgba(4,17,24,.34)");
  ctx.fillStyle=vignette;ctx.fillRect(0,0,1200,700);
}

function drawBackgroundCover(ctx,image,width,height){
  const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
  const sourceWidth=width/scale,sourceHeight=height/scale;
  const sx=(image.naturalWidth-sourceWidth)/2,sy=(image.naturalHeight-sourceHeight)/2;
  ctx.drawImage(image,sx,sy,sourceWidth,sourceHeight,0,0,width,height);
}

function roadViewDistance(){
  const config=currentConfig();
  const base=config.age===12?.27:config.age===13?.245:.225;
  return Math.max(config.age===14?.15:.17,base-(state.currentLevel/config.levelCount)*.07);
}

function projectRoadObject(progress,offset=0){
  if(!state.bike)return null;
  const relative=progress-state.bike.progress;
  const view=roadViewDistance();
  if(relative<-.018||relative>view)return null;
  const nearness=1-Math.max(0,relative)/view;
  const depth=Math.pow(nearness,1.75);
  const y=238+depth*430;
  const roadHalf=44+depth*410;
  const bend=Math.sin((state.bike.progress+relative)*13+(state.course.seed%37))*26*(relative/view);
  const x=600+bend+(offset/state.course.halfWidth)*roadHalf;
  return{x,y,roadHalf,depth,scale:.18+depth*1.18};
}

function drawRoadMotion(ctx){
  if(!state.bike)return;
  ctx.save();
  ctx.strokeStyle="rgba(255,255,255,.36)";ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(158,700);ctx.quadraticCurveTo(485,345,556,238);ctx.stroke();
  ctx.beginPath();ctx.moveTo(1042,700);ctx.quadraticCurveTo(715,345,644,238);ctx.stroke();
  const phase=(state.bike.roadTravel/180)%1;
  for(let i=0;i<9;i++){
    const relative=((i/9-phase+1)%1)*roadViewDistance();
    const p=projectRoadObject(state.bike.progress+relative,0);
    if(!p)continue;
    ctx.fillStyle=`rgba(255,255,255,${.18+p.depth*.5})`;
    ctx.fillRect(p.x-(3+p.depth*5),p.y-(4+p.depth*9),6+p.depth*10,8+p.depth*18);
  }
  const speedAlpha=Math.max(0,(state.bike.speed-55)/160);
  if(speedAlpha>0){
    ctx.strokeStyle=`rgba(255,255,255,${speedAlpha*.32})`;ctx.lineWidth=2;
    for(let i=0;i<12;i++){
      const x=i<6?45+i*35:980+(i-6)*35;
      const y=300+((i*71+state.bike.roadTravel*2)%360);
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(x<600?-18:18),y+55);ctx.stroke();
    }
  }
  ctx.restore();
}

function drawPerspectiveCheckpoint(ctx,p){
  ctx.save();
  const half=p.roadHalf*.82;
  ctx.fillStyle="rgba(255,210,74,.84)";ctx.beginPath();
  ctx.moveTo(p.x-half,p.y-3-p.depth*7);ctx.lineTo(p.x+half,p.y-3-p.depth*7);
  ctx.lineTo(p.x+half,p.y+4+p.depth*8);ctx.lineTo(p.x-half,p.y+4+p.depth*8);ctx.closePath();ctx.fill();
  if(p.depth>.18){
    const w=126*p.scale,h=28*p.scale;
    ctx.fillStyle="rgba(9,31,44,.94)";ctx.fillRect(p.x-w/2,p.y-48*p.scale,w,h);
    ctx.fillStyle="#fff";ctx.font=`900 ${Math.max(10,13*p.scale)}px sans-serif`;ctx.textAlign="center";
    ctx.fillText(`OPDRACHT ${state.currentLevel+1}`,p.x,p.y-28*p.scale);
  }
  ctx.restore();
}

function drawPerspectiveTrafficLight(ctx,light,p,progress){
  const line=projectRoadObject(progress,0);
  if(line){ctx.save();ctx.fillStyle="rgba(255,255,255,.92)";ctx.fillRect(line.x-line.roadHalf*.82,line.y-4,line.roadHalf*1.64,8+line.depth*7);ctx.restore();}
  const h=205*p.scale,w=h*(2/3),top=p.y-h;
  ctx.save();ctx.shadowColor="rgba(0,0,0,.4)";ctx.shadowBlur=12*p.scale;ctx.shadowOffsetY=5*p.scale;
  if(trafficLightImage?.complete&&trafficLightImage.naturalWidth)ctx.drawImage(trafficLightImage,p.x-w/2,top,w,h);
  else{ctx.fillStyle="#20282c";ctx.fillRect(p.x-w*.18,top,w*.36,h);}
  ctx.shadowColor="transparent";
  const colors={red:"#ff2d20",amber:"#ffad18",green:"#32df68"};
  const lensY={red:.105,amber:.208,green:.31};
  const cy=top+h*lensY[light.state||"red"],radius=Math.max(2,w*.105);
  const glow=ctx.createRadialGradient(p.x,cy,0,p.x,cy,radius*2.2);
  glow.addColorStop(0,"#fff");glow.addColorStop(.24,colors[light.state||"red"]);glow.addColorStop(1,"rgba(255,255,255,0)");
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(p.x,cy,radius*2.2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=colors[light.state||"red"];ctx.beginPath();ctx.arc(p.x,cy,radius,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawPerspectiveObstacle(ctx,obstacle,p){
  ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.scale,p.scale);
  ctx.fillStyle="rgba(0,0,0,.32)";ctx.beginPath();ctx.ellipse(0,10,28,9,0,0,Math.PI*2);ctx.fill();
  const hazardIndex={bin:0,roadworks:1,speedbump:2,pothole:3}[obstacle.type];
  if(hazardIndex!==undefined&&routeHazardsImage?.complete&&routeHazardsImage.naturalWidth){
    const sourceWidth=routeHazardsImage.naturalWidth/4;
    const sizes=[82,96,104,94];
    const width=sizes[hazardIndex],height=width*(routeHazardsImage.naturalHeight/sourceWidth);
    ctx.drawImage(routeHazardsImage,hazardIndex*sourceWidth,0,sourceWidth,routeHazardsImage.naturalHeight,-width/2,-height+14,width,height);
  }else drawObstacle(ctx,{...obstacle,x:0,y:-8});
  ctx.restore();
}

function drawPerspectiveOncoming(ctx,rider,p){
  const offset=rider.displayOffset ?? rider.offset;
  const projected=projectRoadObject(rider.progress,offset);
  if(!projected)return;
  const h=185*projected.scale,w=h*(2/3);
  const y=projected.y-h+10;
  ctx.save();
  ctx.fillStyle="rgba(0,0,0,.3)";ctx.beginPath();ctx.ellipse(projected.x,projected.y+5,28*projected.scale,8*projected.scale,0,0,Math.PI*2);ctx.fill();
  if(oncomingCyclistImage?.complete&&oncomingCyclistImage.naturalWidth)ctx.drawImage(oncomingCyclistImage,projected.x-w/2,y,w,h);
  else{ctx.fillStyle="#264e3c";ctx.fillRect(projected.x-14*projected.scale,y,28*projected.scale,h*.72);}
  ctx.restore();
}

function drawPerspectiveFinish(ctx,p){
  const half=p.roadHalf*.84,size=Math.max(3,12*p.scale);
  ctx.save();
  for(let x=-half,i=0;x<half;x+=size,i++){
    ctx.fillStyle=i%2?"#fff":"#17252d";ctx.fillRect(p.x+x,p.y-size*.5,size,size);
  }
  if(p.depth>.18){ctx.fillStyle="rgba(9,31,44,.92)";ctx.fillRect(p.x-58*p.scale,p.y-45*p.scale,116*p.scale,26*p.scale);ctx.fillStyle="#fff";ctx.font=`900 ${Math.max(10,14*p.scale)}px sans-serif`;ctx.textAlign="center";ctx.fillText("FINISH",p.x,p.y-27*p.scale);}
  ctx.restore();
}

function drawPerspectiveRider(ctx){
  const bike=state.bike,course=state.course;
  const x=600+(bike.offset/course.halfWidth)*335;
  const bob=Math.sin(bike.roadTravel*.055)*2.5;
  const h=218,w=h*(2/3),y=470+bob;
  ctx.save();ctx.fillStyle="rgba(0,0,0,.34)";ctx.beginPath();ctx.ellipse(x,y+h-8,48,13,0,0,Math.PI*2);ctx.fill();
  const riderImage=currentConfig().bike==="mtb"?mtbRiderRearImage:cyclistRearImage;
  if(riderImage?.complete&&riderImage.naturalWidth){
    ctx.drawImage(riderImage,x-w/2,y,w,h);
    if(currentConfig().bike!=="mtb"){
      ctx.fillStyle="#181d20";ctx.fillRect(x-w*.048,y+h*.535,w*.098,h*.034);
      ctx.fillStyle="#31373a";ctx.fillRect(x-w*.026,y+h*.628,w*.052,h*.032);
    }
  }else{ctx.fillStyle=state.players[state.currentPlayer].color;ctx.fillRect(x-24,y+30,48,105);}
  ctx.fillStyle=state.players[state.currentPlayer].color;ctx.beginPath();ctx.arc(x,y-11,17,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#fff";ctx.font="900 15px sans-serif";ctx.textAlign="center";ctx.fillText(String(state.currentPlayer+1),x,y-6);
  ctx.restore();
}

function offsetCoursePoints(course,offset) {
  return course.points.map((p,index) => {
    const before = course.points[Math.max(0,index-1)];
    const after = course.points[Math.min(course.points.length-1,index+1)];
    const angle = Math.atan2(after.y-before.y,after.x-before.x);
    return {x:p.x-Math.sin(angle)*offset,y:p.y+Math.cos(angle)*offset};
  });
}

function drawRiver(ctx,course) {
  const mid = pointAt(course,(course.bridge.start+course.bridge.end)/2);
  ctx.save(); ctx.translate(mid.x,mid.y); ctx.rotate(mid.angle);
  const water = ctx.createLinearGradient(-85,0,85,0);
  water.addColorStop(0,"#347fa4");water.addColorStop(.5,"#68b9d4");water.addColorStop(1,"#2e7399");
  ctx.fillStyle=water;ctx.fillRect(-92,-850,184,1700);
  ctx.strokeStyle="rgba(255,255,255,.35)";ctx.lineWidth=3;
  for(let y=-800;y<800;y+=42){ctx.beginPath();ctx.moveTo(-55,y);ctx.quadraticCurveTo(0,y-8,55,y);ctx.stroke();}
  ctx.restore();
}

function drawBridgeRails(ctx,course) {
  const a=pointAt(course,course.bridge.start),b=pointAt(course,course.bridge.end);
  [-80,80].forEach(offset => {
    ctx.save();ctx.strokeStyle="#e1e6e8";ctx.lineWidth=8;ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(a.x-Math.sin(a.angle)*offset,a.y+Math.cos(a.angle)*offset);ctx.lineTo(b.x-Math.sin(b.angle)*offset,b.y+Math.cos(b.angle)*offset);ctx.stroke();
    ctx.strokeStyle="#58666c";ctx.lineWidth=2;ctx.setLineDash([8,7]);ctx.stroke();ctx.restore();
  });
}

function drawTree(ctx,tree) {
  ctx.fillStyle="rgba(18,55,27,.35)";ctx.beginPath();ctx.arc(tree.x+4,tree.y+5,tree.size,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#245d2f";ctx.beginPath();ctx.arc(tree.x,tree.y,tree.size,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#579848";ctx.beginPath();ctx.arc(tree.x-3,tree.y-3,tree.size*.64,0,Math.PI*2);ctx.fill();
}

function drawHouse(ctx,house) {
  const s=house.size;
  ctx.save();ctx.translate(house.x,house.y);ctx.shadowColor="rgba(0,0,0,.28)";ctx.shadowBlur=6;ctx.shadowOffsetY=4;
  ctx.fillStyle=house.color;ctx.fillRect(-s,-s*.75,s*2,s*1.5);
  ctx.fillStyle="#8b3c31";ctx.beginPath();ctx.moveTo(-s*1.2,-s*.7);ctx.lineTo(0,-s*1.45);ctx.lineTo(s*1.2,-s*.7);ctx.closePath();ctx.fill();
  ctx.shadowColor="transparent";ctx.fillStyle="#5d3927";ctx.fillRect(-4,0,8,s*.75);ctx.fillStyle="#8ed0ef";ctx.fillRect(-s*.65,-s*.42,s*.38,s*.38);ctx.fillRect(s*.27,-s*.42,s*.38,s*.38);ctx.restore();
}

function drawPath(ctx, points, width, color, dash=[]) {
  ctx.save(); ctx.lineWidth = width; ctx.strokeStyle = color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); points.slice(1).forEach(p => ctx.lineTo(p.x,p.y)); ctx.stroke(); ctx.restore();
}

function drawCheckpoint(ctx, p, number) {
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle="#ffd24a";ctx.fillRect(-6,-72,12,144);
  ctx.fillStyle="#0d2433";ctx.fillRect(-42,-98,84,26);ctx.fillStyle="white";ctx.font="bold 13px sans-serif";ctx.textAlign="center";ctx.fillText(`VRAAG ${number}`,0,-80);ctx.restore();
}

function drawTrafficLight(ctx,p,stateName) {
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);
  ctx.fillStyle="rgba(255,255,255,.96)";ctx.fillRect(-5,-72,10,144);
  ctx.fillStyle="#1b292f";ctx.fillRect(-4,-96,8,24);ctx.fillRect(-31,-125,46,38);
  ctx.fillStyle=stateName==="red"?"#ff3d2e":"#4b565b";ctx.beginPath();ctx.arc(-18,-106,9,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=stateName==="green"?"#37d56f":"#4b565b";ctx.beginPath();ctx.arc(4,-106,9,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawObstacle(ctx, o) {
  ctx.save(); ctx.translate(o.x,o.y);
  if (o.type === "cone") {
    ctx.fillStyle="#f36b21"; ctx.beginPath(); ctx.moveTo(0,-18);ctx.lineTo(14,14);ctx.lineTo(-14,14);ctx.closePath();ctx.fill();
    ctx.fillStyle="white";ctx.fillRect(-8,-2,16,5);ctx.fillStyle="#252b2e";ctx.fillRect(-17,13,34,6);
  } else if (o.type === "puddle") {
    ctx.fillStyle="#2a6f93";ctx.beginPath();ctx.ellipse(0,0,25,13,-.2,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#72c6e8";ctx.lineWidth=3;ctx.stroke();
  } else if (o.type === "barrier") {
    ctx.fillStyle="#eceff1";ctx.fillRect(-24,-10,48,20);ctx.fillStyle="#d9482b";for(let x=-20;x<22;x+=16)ctx.fillRect(x,-10,8,20);
  } else {
    ctx.fillStyle="#9b6739";ctx.fillRect(-16,-16,32,32);ctx.strokeStyle="#633e22";ctx.lineWidth=3;ctx.strokeRect(-16,-16,32,32);ctx.beginPath();ctx.moveTo(-14,-14);ctx.lineTo(14,14);ctx.moveTo(14,-14);ctx.lineTo(-14,14);ctx.stroke();
  }
  ctx.restore();
}

function drawStartFinish(ctx, p, finish) {
  ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle); ctx.fillStyle = finish ? "#fff" : "#ffd24a"; ctx.fillRect(-6,-73,12,146);
  ctx.fillStyle = "#0d2433"; ctx.fillRect(-42,-100,84,27); ctx.fillStyle = finish ? "#fff" : "#ffd24a"; ctx.font="900 14px sans-serif";ctx.textAlign="center";ctx.fillText(finish?"FINISH":"START",0,-81);ctx.restore();
}

function drawBike(ctx, bike, color) {
  ctx.save(); ctx.translate(bike.x,bike.y); ctx.rotate(bike.angle);
  ctx.fillStyle=color;ctx.globalAlpha=.9;ctx.beginPath();ctx.ellipse(0,0,40,24,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  if(cyclistRearImage?.complete&&cyclistRearImage.naturalWidth) ctx.drawImage(cyclistRearImage,-42,-24,84,48);
  else {ctx.fillStyle="#151a1d";ctx.fillRect(-28,-7,56,14);ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,0,13,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle="white";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(38,-11);ctx.lineTo(50,0);ctx.lineTo(38,11);ctx.stroke();
  ctx.restore();
}

function showRaceMessage(message, duration=1600) {
  clearTimeout(state.messageTimer);
  $("raceMessage").textContent = message;
  $("raceMessage").classList.add("show");
  state.messageTimer = setTimeout(() => $("raceMessage").classList.remove("show"), duration);
}

document.addEventListener("keydown", e => {
  if (!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) return;
  if ($("raceScreen").classList.contains("active")) e.preventDefault();
  state.keys.add(e.key);
});
document.addEventListener("keyup", e => state.keys.delete(e.key));
window.addEventListener("blur", () => state.keys.clear());

$("addPlayerBtn").addEventListener("click", addPlayer);
$("startBuildBtn").addEventListener("click", startFromSignup);
$("startRideBtn").addEventListener("click", startRide);
$("nextLevelBtn").addEventListener("click", nextLevel);
$("nextTurnBtn").addEventListener("click", nextTurn);
$("restartBtn").addEventListener("click", restartWithNewRound);
$("rearLightPart").addEventListener("click", selectRearLight);
$("rearLightPart").addEventListener("dragstart", event => {
  event.dataTransfer.setData("text/plain", "achterlicht");
  event.dataTransfer.effectAllowed = "move";
});
$("rearLightTarget").addEventListener("dragover", event => event.preventDefault());
$("rearLightTarget").addEventListener("drop", event => {
  event.preventDefault();
  if (event.dataTransfer.getData("text/plain") === "achterlicht") mountRearLight();
});
$("rearLightTarget").addEventListener("click", () => {
  if (state.rearLightSelected) mountRearLight();
  else {
    $("rearLightFeedback").textContent = "Kies eerst het achterlicht.";
    $("rearLightFeedback").className = "feedback bad";
  }
});
$("soundBtn").addEventListener("click", () => {
  state.sound = !state.sound;
  $("soundBtn").textContent = state.sound ? "🔊" : "🔇";
  $("soundBtn").setAttribute("aria-label", state.sound ? "Geluid uitzetten" : "Geluid aanzetten");
});

state.players = [{name:"",age:12},{name:"",age:12}];
renderPlayerInputs();
