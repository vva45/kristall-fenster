console.log("SIMULATOR LOADED");

window.addEventListener("load", () => {
  console.log("WINDOW LOADED");
  init();
});
const catalog = {
  materials: {
    pvc: { label: "PVC / Kunststoff", multiplier: 1, note: "Base eficiente" },
    wood: { label: "Madera / Holz", multiplier: 1.42, note: "Acabado natural" },
    aluminium: { label: "Aluminio", multiplier: 1.78, note: "Marco resistente" },
    woodAlu: { label: "Madera-aluminio", multiplier: 2.06, note: "Interior calido" },
    pvcAlu: { label: "PVC-aluminio", multiplier: 1.54, note: "Exterior reforzado" },
  },
  profiles: [
    { key: "salamander-green76ad", material: "pvc", brand: "Salamander", label: "greenEvolution 76 AD", depth: "76 mm", uw: ">= 0,83", lead: "desde 1 semana", multiplier: 1, base: 18 },
    { key: "salamander-green76md", material: "pvc", brand: "Salamander", label: "greenEvolution 76 MD", depth: "76 mm", uw: ">= 0,77", lead: "desde 1 semana", multiplier: 1.06, base: 24 },
    { key: "salamander-blue82", material: "pvc", brand: "Salamander", label: "bluEvolution 82 MD Classic", depth: "82 mm", uw: ">= 0,75", lead: "desde 2 semanas", multiplier: 1.15, base: 38 },
    { key: "salamander-blue92", material: "pvc", brand: "Salamander", label: "bluEvolution 92 MD Classic", depth: "92 mm", uw: ">= 0,73", lead: "desde 2 semanas", multiplier: 1.27, base: 54 },
    { key: "salamander-blue92round", material: "pvc", brand: "Salamander", label: "bluEvolution 92 MD Round", depth: "92 mm", uw: ">= 0,73", lead: "desde 2 semanas", multiplier: 1.31, base: 62 },
    { key: "aluplast-neo", material: "pvc", brand: "aluplast", label: "IDEAL Neo MD", depth: "76 mm", uw: ">= 0,78", lead: "desde 1 semana", multiplier: 1.08, base: 26 },
    { key: "aluplast-4000", material: "pvc", brand: "aluplast", label: "IDEAL 4000", depth: "70 mm", uw: ">= 0,90", lead: "desde 1 semana", multiplier: 0.96, base: 10 },
    { key: "aluplast-8000", material: "pvc", brand: "aluplast", label: "IDEAL 8000", depth: "85 mm", uw: ">= 0,74", lead: "desde 2 semanas", multiplier: 1.2, base: 44 },
    { key: "kommerling-70", material: "pvc", brand: "Kömmerling", label: "Kömmerling 70 AD", depth: "70 mm", uw: ">= 0,86", lead: "desde 2 semanas", multiplier: 1.04, base: 22 },
    { key: "kommerling-76", material: "pvc", brand: "Kömmerling", label: "Kömmerling 76 MD", depth: "76 mm", uw: ">= 0,78", lead: "desde 2 semanas", multiplier: 1.12, base: 34 },
    { key: "drutex-iglo5", material: "pvc", brand: "Drutex", label: "Iglo 5", depth: "70 mm", uw: ">= 0,89", lead: "desde 1 semana", multiplier: 0.98, base: 12 },
    { key: "drutex-igloenergy", material: "pvc", brand: "Drutex", label: "Iglo Energy", depth: "82 mm", uw: ">= 0,75", lead: "desde 1 semana", multiplier: 1.18, base: 42 },
    { key: "gealan-s8000", material: "pvc", brand: "Gealan", label: "S 8000 IQ", depth: "74 mm", uw: ">= 0,83", lead: "desde 2 semanas", multiplier: 1.03, base: 20 },
    { key: "gealan-s9000", material: "pvc", brand: "Gealan", label: "S 9000", depth: "82,5 mm", uw: ">= 0,74", lead: "desde 2 semanas", multiplier: 1.17, base: 40 },
    { key: "rehau-synego", material: "pvc", brand: "Rehau", label: "Synego", depth: "80 mm", uw: ">= 0,76", lead: "desde 2 semanas", multiplier: 1.19, base: 46 },
    { key: "rehau-geneo", material: "pvc", brand: "Rehau", label: "Geneo", depth: "86 mm", uw: ">= 0,73", lead: "desde 3 semanas", multiplier: 1.36, base: 70 },
    { key: "veka-soft70", material: "pvc", brand: "Veka", label: "Softline 70 AD", depth: "70 mm", uw: ">= 0,87", lead: "desde 3 semanas", multiplier: 1.04, base: 22 },
    { key: "veka-soft82", material: "pvc", brand: "Veka", label: "Softline 82 MD", depth: "82 mm", uw: ">= 0,74", lead: "desde 3 semanas", multiplier: 1.2, base: 48 },
    { key: "schuco-focus70", material: "pvc", brand: "Schüco", label: "FocusIng 70", depth: "70 mm", uw: ">= 0,86", lead: "desde 3 semanas", multiplier: 1.08, base: 30 },
    { key: "schuco-living82", material: "pvc", brand: "Schüco", label: "LivIng 82", depth: "82 mm", uw: ">= 0,73", lead: "desde 3 semanas", multiplier: 1.25, base: 58 },

    { key: "wood-softline68", material: "wood", brand: "Drutex", label: "Softline 68", depth: "68 mm", uw: ">= 0,94", lead: "desde 3 semanas", multiplier: 1, base: 55 },
    { key: "wood-softline78", material: "wood", brand: "Drutex", label: "Softline 78", depth: "78 mm", uw: ">= 0,82", lead: "desde 3 semanas", multiplier: 1.13, base: 78 },
    { key: "wood-softline88", material: "wood", brand: "Drutex", label: "Softline 88", depth: "88 mm", uw: ">= 0,74", lead: "desde 4 semanas", multiplier: 1.29, base: 104 },
    { key: "wood-nature80", material: "wood", brand: "Nature", label: "Nature 80", depth: "80 mm", uw: ">= 0,80", lead: "desde 4 semanas", multiplier: 1.18, base: 88 },

    { key: "alu-mb45", material: "aluminium", brand: "Aluprof", label: "MB-45", depth: "45 mm", uw: ">= 1,35", lead: "desde 3 semanas", multiplier: 1, base: 82 },
    { key: "alu-mb79", material: "aluminium", brand: "Aluprof", label: "MB-79N", depth: "79 mm", uw: ">= 0,83", lead: "desde 3 semanas", multiplier: 1.18, base: 118 },
    { key: "alu-mb86", material: "aluminium", brand: "Aluprof", label: "MB-86N", depth: "86 mm", uw: ">= 0,72", lead: "desde 4 semanas", multiplier: 1.32, base: 144 },
    { key: "alu-superial", material: "aluminium", brand: "Aliplast", label: "Superial", depth: "75 mm", uw: ">= 0,96", lead: "desde 3 semanas", multiplier: 1.12, base: 104 },
    { key: "alu-decalu", material: "aluminium", brand: "Deceuninck", label: "Decalu 88", depth: "88 mm", uw: ">= 0,82", lead: "desde 4 semanas", multiplier: 1.25, base: 132 },

    { key: "woodalu-duoline68", material: "woodAlu", brand: "Drutex", label: "Duoline 68", depth: "68 mm", uw: ">= 0,86", lead: "desde 4 semanas", multiplier: 1.08, base: 126 },
    { key: "woodalu-duoline78", material: "woodAlu", brand: "Drutex", label: "Duoline 78", depth: "78 mm", uw: ">= 0,78", lead: "desde 4 semanas", multiplier: 1.19, base: 154 },
    { key: "woodalu-duoline88", material: "woodAlu", brand: "Drutex", label: "Duoline 88", depth: "88 mm", uw: ">= 0,72", lead: "desde 5 semanas", multiplier: 1.34, base: 188 },

    { key: "pvcalu-76", material: "pvcAlu", brand: "aluplast", label: "IDEAL 76 AluClip", depth: "76 mm", uw: ">= 0,78", lead: "desde 3 semanas", multiplier: 1.12, base: 92 },
    { key: "pvcalu-living82", material: "pvcAlu", brand: "Schüco", label: "LivIng 82 Alu Inside", depth: "82 mm", uw: ">= 0,73", lead: "desde 4 semanas", multiplier: 1.24, base: 124 },
  ],
  sashTypes: {
    one: { label: "1 hoja", note: "Elemento simple", multiplier: 1, panels: 1 },
    two: { label: "2 hojas", note: "Con parteluz central", multiplier: 1.32, panels: 2 },
    three: { label: "3 hojas", note: "Composición amplia", multiplier: 1.72, panels: 3 },
    topLight: { label: "Oberlicht", note: "Elemento superior", multiplier: 1.24, panels: 2 },
    bottomLight: { label: "Unterlicht", note: "Elemento inferior", multiplier: 1.2, panels: 2 },
  },
  openings: {
    fixed: { label: "Fijo", note: "Sin apertura", multiplier: 0.82 },
    fixedSash: { label: "Hoja fija", note: "Aspecto de hoja", multiplier: 0.92 },
    turnLeft: { label: "Giro izquierda", note: "Abatible", multiplier: 1.06 },
    turnRight: { label: "Giro derecha", note: "Abatible", multiplier: 1.06 },
    tilt: { label: "Inclinacion", note: "Basculante", multiplier: 1.05 },
    tiltTurnLeft: { label: "Oscilobatiente izquierda", note: "Inclinacion + giro", multiplier: 1.13 },
    tiltTurnRight: { label: "Oscilobatiente derecha", note: "Inclinacion + giro", multiplier: 1.13 },
  },
  gasketColors: {
    black: { label: "Negro", value: "#1f2221", fixed: 0 },
    lightGray: { label: "Gris claro", value: "#c7cac4", fixed: 8 },
  },
  colors: [
    { key: "white", label: "Weiss (sin decor)", value: "#f6f7f2", fixed: 0, area: 0 },
    { key: "anthracite", label: "Anthrazitgrau SAL 55", value: "#33383a", fixed: 42, area: 10 },
    { key: "anthraciteSand", label: "Anthrazitgrau sand SAL 88", value: "#3f4547", fixed: 54, area: 12 },
    { key: "cream", label: "Creme SAL 59", value: "#ede0bf", fixed: 38, area: 9 },
    { key: "darkGreen", label: "Dunkelgrün SAL 03", value: "#263f32", fixed: 46, area: 11 },
    { key: "goldenOak", label: "Golden Oak SAL 51", value: "#a66b35", fixed: 58, area: 14 },
    { key: "silverGray", label: "Silbergrau SAL 42", value: "#aeb4b2", fixed: 44, area: 10 },
    { key: "mahogany", label: "Mahagoni SAL 26", value: "#5f2b20", fixed: 62, area: 15 },
    { key: "moorOak", label: "Mooreiche SAL 25", value: "#3b2b22", fixed: 62, area: 15 },
    { key: "walnut", label: "Nussbaum SAL 21", value: "#6a432b", fixed: 62, area: 15 },
    { key: "steelBlue", label: "Stahlblau SAL 11", value: "#2e5268", fixed: 48, area: 12 },
    { key: "agateGray", label: "Achatgrau SAL 72", value: "#9ca39b", fixed: 52, area: 12 },
    { key: "db703", label: "Alux DB 703 SAL 37", value: "#555b5d", fixed: 68, area: 17 },
    { key: "amberMatt", label: "Amber Matt SAL 08", value: "#b28a5a", fixed: 56, area: 14 },
    { key: "basaltGray", label: "Basaltgrau SAL 74", value: "#5a5f61", fixed: 52, area: 12 },
    { key: "basaltSand", label: "Basaltgrau sand SAL 84", value: "#666b6c", fixed: 64, area: 15 },
    { key: "mountainPine", label: "Bergkiefer SAL 50", value: "#b47a45", fixed: 58, area: 14 },
    { key: "brilliantWhite", label: "Brillantweiss SAL 116", value: "#ffffff", fixed: 28, area: 6 },
    { key: "douglas", label: "Douglasie SAL 27", value: "#c58b4b", fixed: 58, area: 14 },
    { key: "darkGreenWood", label: "Dunkelgrün Woodgrain SAL 113", value: "#2d4a39", fixed: 62, area: 15 },
    { key: "golden", label: "Golden SAL 110", value: "#c39248", fixed: 62, area: 15 },
    { key: "concrete", label: "Grey Concrete SAL 115", value: "#86827c", fixed: 58, area: 14 },
    { key: "lightGrayDecor", label: "Lichtgrau SAL 73", value: "#c4c8c5", fixed: 44, area: 10 },
    { key: "metbrush", label: "Metbrush SAL 69", value: "#8f918d", fixed: 68, area: 17 },
    { key: "nebraska", label: "Nebraska SAL 33", value: "#b17442", fixed: 58, area: 14 },
    { key: "oregon", label: "Oregon 4 SAL 52", value: "#b77a4c", fixed: 58, area: 14 },
    { key: "platinum", label: "Platinum SAL 109", value: "#a7aaa7", fixed: 64, area: 15 },
    { key: "polarOak", label: "Polareiche SAL 43", value: "#d0c6af", fixed: 58, area: 14 },
    { key: "quartzGray", label: "Quarzgrau SAL 78", value: "#72766f", fixed: 54, area: 13 },
    { key: "quartzSand", label: "Quarzgrau sand SAL 90", value: "#7a7d75", fixed: 66, area: 16 },
    { key: "blackMatt", label: "Schwarz Matt SAL 98", value: "#161716", fixed: 72, area: 18 },
    { key: "blackBrown", label: "Schwarzbraun SAL 71", value: "#2a211b", fixed: 62, area: 15 },
    { key: "blackBrownBrush", label: "Schwarzbraun X-Brush SAL 108", value: "#332923", fixed: 68, area: 17 },
    { key: "signalGray", label: "Signalgrau sand SAL 87", value: "#8a8d88", fixed: 64, area: 15 },
    { key: "silverAlux", label: "Silver Alux SAL 107", value: "#b8bab7", fixed: 68, area: 17 },
    { key: "steelBlueBrush", label: "Stahlblau X-Brush SAL 111", value: "#355b72", fixed: 68, area: 17 },
    { key: "umbra", label: "Umbra SAL 96", value: "#645044", fixed: 62, area: 15 },
    { key: "wineRed", label: "Weinrot SAL 19", value: "#71303a", fixed: 54, area: 13 },
    { key: "whiteSand", label: "Weiss Sandstruktur SAL 112", value: "#f2f1e9", fixed: 40, area: 9 },
    { key: "whiteStructure", label: "Weiss strukturell SAL 39", value: "#eeeee8", fixed: 40, area: 9 },
    { key: "woodecAlpine", label: "Woodec Alpine SAL 92", value: "#d8d2c0", fixed: 72, area: 18 },
    { key: "woodecOak", label: "Woodec Oak SAL 91", value: "#b68a57", fixed: 72, area: 18 },
  ],
  glazing: {
    double: { label: "2-fach Verglasung", note: "Doble vidrio", fixed: 0, area: 0, multiplier: 1 },
    doubleWarm: { label: "2-fach Verglasung warme Kante", note: "Doble con borde calido", fixed: 18, area: 12, multiplier: 1.02 },
    triple: { label: "3-fach Verglasung", note: "Triple vidrio", fixed: 36, area: 38, multiplier: 1.06 },
    tripleWarm: { label: "3-fach Verglasung warme Kante", note: "Triple con borde calido", fixed: 54, area: 46, multiplier: 1.08 },
  },
  soundGlass: {
    none: { label: "No", fixed: 0, area: 0 },
    rw32: { label: "Schallschutz 32 dB", fixed: 36, area: 22 },
    rw37: { label: "Schallschutz 37 dB", fixed: 62, area: 34 },
    rw42: { label: "Schallschutz 42 dB", fixed: 96, area: 52 },
  },
  safetyGlass: {
    none: { label: "No", fixed: 0, area: 0 },
    vsgInside: { label: "VSG interior", fixed: 48, area: 28 },
    vsgOutside: { label: "VSG exterior", fixed: 54, area: 32 },
    vsgBoth: { label: "VSG ambos lados", fixed: 96, area: 58 },
    esg: { label: "ESG templado", fixed: 66, area: 42 },
  },
  decorGlass: {
    none: { label: "No", fixed: 0, area: 0 },
    satinato: { label: "Satinato mate", fixed: 36, area: 24 },
    mastercarre: { label: "Mastercarre", fixed: 44, area: 28 },
    chinchilla: { label: "Chinchilla", fixed: 38, area: 26 },
    bronze: { label: "Bronce solar", fixed: 58, area: 36 },
    reflexGray: { label: "Reflex gris", fixed: 68, area: 44 },
    sunStop: { label: "Sonnenschutz premium", fixed: 86, area: 58 },
  },
  muntins: {
    none: { label: "No", note: "Sin cuarterones", fixed: 0, area: 0 },
    internal: { label: "Innenliegende Sprossen", note: "Entre cristales", fixed: 24, area: 7 },
    applied: { label: "Aufgesetzte Sprossen", note: "Sobre vidrio", fixed: 42, area: 12 },
  },
  shutters: {
    none: { label: "No", note: "Sin persiana", fixed: 0, area: 0 },
    cleverBox: { label: "Aufsatzrollladen CleverBox", note: "Cajon compacto", fixed: 168, area: 38 },
    exteElite: { label: "Aufsatzrollladen Exte Elite XT", note: "Cajon premium", fixed: 214, area: 48 },
    rokaTop: { label: "Beck+Heun ROKA-TOP 2", note: "Revision interior", fixed: 248, area: 56 },
  },
  shutterControls: {
    belt: { label: "Cinta", fixed: 0 },
    crank: { label: "Manivela", fixed: 42 },
    motor: { label: "Motor", fixed: 118 },
    smart: { label: "Motor smart", fixed: 178 },
  },
  handles: {
    none: { label: "No", note: "Solo fijo", fixed: 0 },
    standard: { label: "Standardgriff", note: "Manilla estandar", fixed: 0 },
    button: { label: "Mit Druckknopf", note: "Con pulsador", fixed: 18 },
    lockable: { label: "Abschliessbar", note: "Con llave", fixed: 34 },
  },
  securityHardware: {
    base: { label: "Basissicherheit", note: "Herraje base", fixed: 0, area: 0 },
    level1: { label: "Sicherheitsstufe 1", note: "Puntos reforzados", fixed: 68, area: 8 },
    level2: { label: "Sicherheitsstufe 2", note: "Mayor resistencia", fixed: 126, area: 16 },
  },
  extras: {
    hiddenHinge: { label: "Herraje oculto", hint: "Verdeckt liegender Beschlag", fixed: 62, area: 0 },
    fullReinforcement: { label: "Refuerzo cerrado 2 mm", hint: "Rahmenvollverstärkung", fixed: 58, area: 12 },
    predrill: { label: "Taladros de montaje", hint: "Montagevorbohrungen", fixed: 24, area: 0 },
    sillConnector: { label: "Conector alféizar 30 mm", hint: "Fensterbankanschluss", fixed: 32, area: 0 },
    reedContact: { label: "Contacto reed", hint: "Vigilancia de cierre", fixed: 74, area: 0 },
    ventilation: { label: "Sistema de ventilación", hint: "Lüftungssysteme", fixed: 86, area: 14 },
    frameExtension: { label: "Ensanche de marco", hint: "Rahmenverbreiterung", fixed: 48, area: 10 },
    handleMiddle: { label: "Manilla centrada", hint: "Fenstergriffhöhe mittig", fixed: 18, area: 0 },
  },
  delivery: {
    standard: { label: "Estándar", fixed: 0 },
    priority: { label: "Prioritaria", fixed: 49 },
    site: { label: "A pie de obra", fixed: 96 },
  },
};

const state = {
  material: "pvc",
  brand: "Salamander",
  profile: "salamander-green76ad",
  sash: "one",
  opening: "tiltTurnRight",
  leafOpenings: ["tiltTurnRight"],
  width: 1000,
  height: 1200,
  quantity: 1,
  delivery: "standard",
  specialRequest: "",
  gasket: "black",
  exteriorColor: "white",
  interiorColor: "white",
  glazing: "double",
  soundGlass: "none",
  safetyGlass: "none",
  decorGlass: "none",
  muntin: "none",
  muntinVertical: 1,
  muntinHorizontal: 1,
  shutter: "none",
  shutterControl: "belt",
  mosquito: false,
  handle: "standard",
  security: "base",
  extras: new Set(),
};

let quoteItems = loadQuote();

const elements = {
  materialOptions: document.querySelector("#materialOptions"),
  brand: document.querySelector("#brand"),
  profile: document.querySelector("#profile"),
  profileSpecs: document.querySelector("#profileSpecs"),
  sashOptions: document.querySelector("#sashOptions"),
  openingPresets: document.querySelector("#openingPresets"),
  leafFunctionOptions: document.querySelector("#leafFunctionOptions"),
  width: document.querySelector("#width"),
  height: document.querySelector("#height"),
  quantity: document.querySelector("#quantity"),
  delivery: document.querySelector("#delivery"),
  specialRequest: document.querySelector("#specialRequest"),
  dimensionHint: document.querySelector("#dimensionHint"),
  gasketOptions: document.querySelector("#gasketOptions"),
  exteriorColor: document.querySelector("#exteriorColor"),
  interiorColor: document.querySelector("#interiorColor"),
  exteriorColorName: document.querySelector("#exteriorColorName"),
  interiorColorName: document.querySelector("#interiorColorName"),
  exteriorSwatch: document.querySelector("#exteriorSwatch"),
  interiorSwatch: document.querySelector("#interiorSwatch"),
  glazingOptions: document.querySelector("#glazingOptions"),
  soundGlass: document.querySelector("#soundGlass"),
  safetyGlass: document.querySelector("#safetyGlass"),
  decorGlass: document.querySelector("#decorGlass"),
  muntinOptions: document.querySelector("#muntinOptions"),
  muntinControls: document.querySelector("#muntinControls"),
  muntinVertical: document.querySelector("#muntinVertical"),
  muntinHorizontal: document.querySelector("#muntinHorizontal"),
  shutterHint: document.querySelector("#shutterHint"),
  shutterOptions: document.querySelector("#shutterOptions"),
  shutterControlOptions: document.querySelector("#shutterControlOptions"),
  mosquito: document.querySelector("#mosquito"),
  handleOptions: document.querySelector("#handleOptions"),
  securityOptions: document.querySelector("#securityOptions"),
  extrasList: document.querySelector("#extrasList"),
  productPreview: document.querySelector("#productPreview"),
  liveTotal: document.querySelector("#liveTotal"),
  summaryTotal: document.querySelector("#summaryTotal"),
  priceBreakdown: document.querySelector("#priceBreakdown"),
  metaProfile: document.querySelector("#metaProfile"),
  metaType: document.querySelector("#metaType"),
  metaSize: document.querySelector("#metaSize"),
  metaOpening: document.querySelector("#metaOpening"),
  addToQuote: document.querySelector("#addToQuote"),
  copySummary: document.querySelector("#copySummary"),
  quoteList: document.querySelector("#quoteList"),
  quoteTotal: document.querySelector("#quoteTotal"),
  clearQuote: document.querySelector("#clearQuote"),
  printQuote: document.querySelector("#printQuote"),
};

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

init();

function init() {
  renderStaticOptions();
  bindEvents();
  syncProfileSelectors();
  syncForm();
  update();
  renderQuote();
}

function renderStaticOptions() {
  renderChoiceGroup(elements.materialOptions, catalog.materials, "material");
  renderChoiceGroup(elements.sashOptions, catalog.sashTypes, "sash");
  renderChoiceGroup(elements.gasketOptions, catalog.gasketColors, "gasket");
  renderChoiceGroup(elements.glazingOptions, catalog.glazing, "glazing");
  renderChoiceGroup(elements.muntinOptions, catalog.muntins, "muntin");
  renderChoiceGroup(elements.shutterOptions, catalog.shutters, "shutter");
  renderChoiceGroup(elements.shutterControlOptions, catalog.shutterControls, "shutterControl");
  renderChoiceGroup(elements.handleOptions, catalog.handles, "handle");
  renderChoiceGroup(elements.securityOptions, catalog.securityHardware, "security");
  renderSelect(elements.exteriorColor, Object.fromEntries(catalog.colors.map((item) => [item.key, item])));
  renderSelect(elements.interiorColor, Object.fromEntries(catalog.colors.map((item) => [item.key, item])));
  renderSelect(elements.soundGlass, catalog.soundGlass);
  renderSelect(elements.safetyGlass, catalog.safetyGlass);
  renderSelect(elements.decorGlass, catalog.decorGlass);
  renderSelect(elements.delivery, catalog.delivery);
  renderExtras();
  ensureLeafOpeningsForSash(false);
  renderOpeningConfigurator();
}

function renderChoiceGroup(container, options, stateKey) {
  container.innerHTML = Object.entries(options)
    .map(([value, option]) => {
      const note = option.note || option.hint || "";
      return `
        <button class="option-button" type="button" data-choice="${stateKey}" data-value="${value}">
          <strong>${option.label}</strong>
          ${note ? `<span>${note}</span>` : ""}
        </button>
      `;
    })
    .join("");
}

function renderSelect(select, options) {
  select.innerHTML = Object.entries(options)
    .map(([value, option]) => `<option value="${value}">${option.label}</option>`)
    .join("");
}

function renderExtras() {
  elements.extrasList.innerHTML = Object.entries(catalog.extras)
    .map(
      ([value, extra]) => `
        <label class="extra-item" data-extra-wrap="${value}">
          <span>
            <strong>${extra.label}</strong>
            <span>${extra.hint}</span>
          </span>
          <input type="checkbox" value="${value}" />
        </label>
      `,
    )
    .join("");
}

function renderOpeningConfigurator() {
  renderOpeningPresets();
  renderLeafFunctionOptions();
}

function renderOpeningPresets() {
  const presets = getOpeningPresets();
  const current = getLeafOpenings().join(",");
  elements.openingPresets.innerHTML = presets
    .map((preset) => {
      const value = preset.openings.join(",");
      const selected = value === current ? " is-selected" : "";
      return `
        <button class="opening-preset${selected}" type="button" data-opening-preset="${preset.key}" data-openings="${value}">
          ${renderPresetIcon(preset.openings)}
          <strong>${preset.label}</strong>
        </button>
      `;
    })
    .join("");
}

function renderLeafFunctionOptions() {
  const openings = getLeafOpenings();
  elements.leafFunctionOptions.innerHTML = openings
    .map(
      (opening, index) => `
        <label class="leaf-function">
          <span>${getLeafName(index, openings.length)}</span>
          <select data-leaf-opening="${index}">
            ${Object.entries(catalog.openings)
              .map(
                ([value, option]) =>
                  `<option value="${value}" ${opening === value ? "selected" : ""}>${option.label}</option>`,
              )
              .join("")}
          </select>
        </label>
      `,
    )
    .join("");
}

function renderPresetIcon(openings) {
  const w = 118;
  const h = 96;
  const gap = 4;
  const panelW = (w - 20 - gap * (openings.length - 1)) / openings.length;
  const panels = openings
    .map((opening, index) => {
      const x = 10 + index * (panelW + gap);
      const y = 10;
      return `
        <rect x="${x}" y="${y}" width="${panelW}" height="${h - 26}" fill="#dff4fb" stroke="#8b9491" stroke-width="2" />
        ${renderPresetOpeningLine(opening, x, y, panelW, h - 26)}
      `;
    })
    .join("");

  return `
    <svg class="preset-icon" viewBox="0 0 ${w} ${h}" aria-hidden="true">
      <rect x="6" y="6" width="${w - 12}" height="${h - 18}" fill="#f6f7f4" stroke="#8b9491" stroke-width="3" />
      ${panels}
    </svg>
  `;
}

function renderPresetOpeningLine(opening, x, y, w, h) {
  if (opening === "fixed" || opening === "fixedSash") return "";
  const stroke = "#e55353";
  const midX = x + w / 2;
  const midY = y + h / 2;
  const left = opening === "turnLeft" || opening === "tiltTurnLeft";
  const hingeX = left ? x + 4 : x + w - 4;
  const handleX = left ? x + w - 4 : x + 4;

  if (opening === "tilt") {
    return `<path d="M ${x + 5} ${y + 6} L ${midX} ${y + h - 6} L ${x + w - 5} ${y + 6}" fill="none" stroke="${stroke}" stroke-width="2" />`;
  }

  if (opening === "tiltTurnLeft" || opening === "tiltTurnRight") {
    return `
      <path d="M ${hingeX} ${y + 6} L ${handleX} ${midY} L ${hingeX} ${y + h - 6}" fill="none" stroke="${stroke}" stroke-width="2" />
      <path d="M ${x + 5} ${y + 6} L ${midX} ${y + h - 6} L ${x + w - 5} ${y + 6}" fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.75" />
    `;
  }

  return `<path d="M ${hingeX} ${y + 6} L ${handleX} ${midY} L ${hingeX} ${y + h - 6}" fill="none" stroke="${stroke}" stroke-width="2" />`;
}

function getOpeningPresets() {
  const count = getLeafCountForSash();
  if (count === 1) {
    return [
      { key: "one-fixed", label: "Fijo", openings: ["fixed"] },
      { key: "one-tilt", label: "Inclinacion", openings: ["tilt"] },
      { key: "one-turn-left", label: "Giro izquierda", openings: ["turnLeft"] },
      { key: "one-turn-right", label: "Giro derecha", openings: ["turnRight"] },
      { key: "one-tilt-turn-left", label: "Oscilobatiente izquierda", openings: ["tiltTurnLeft"] },
      { key: "one-tilt-turn-right", label: "Oscilobatiente derecha", openings: ["tiltTurnRight"] },
    ];
  }

  if (count === 2) {
    return [
      { key: "two-fixed-fixed", label: "Fijo + Fijo", openings: ["fixed", "fixed"] },
      { key: "two-fixedsash-fixedsash", label: "Hoja fija + Hoja fija", openings: ["fixedSash", "fixedSash"] },
      { key: "two-tilt-tilt", label: "Inclinacion + Inclinacion", openings: ["tilt", "tilt"] },
      { key: "two-tiltturn-fixed", label: "Oscilobatiente + Fijo", openings: ["tiltTurnRight", "fixed"] },
      { key: "two-fixed-tiltturn", label: "Fijo + Oscilobatiente", openings: ["fixed", "tiltTurnLeft"] },
      { key: "two-turns", label: "Giro + Giro", openings: ["turnRight", "turnLeft"] },
      { key: "two-tiltturns", label: "Oscilobatiente + Oscilobatiente", openings: ["tiltTurnRight", "tiltTurnLeft"] },
      { key: "two-post-left", label: "Giro + Oscilobatiente", openings: ["turnRight", "tiltTurnLeft"] },
      { key: "two-post-right", label: "Oscilobatiente + Giro", openings: ["tiltTurnRight", "turnLeft"] },
      { key: "two-guillotine-left", label: "Oscilobatiente + Giro guillotina", openings: ["tiltTurnLeft", "turnRight"] },
    ];
  }

  return [
    { key: "three-fixed-all", label: "Fijo + Fijo + Fijo", openings: ["fixed", "fixed", "fixed"] },
    { key: "three-center-mobile", label: "Fijo + Oscilobatiente + Fijo", openings: ["fixed", "tiltTurnRight", "fixed"] },
    { key: "three-sides-mobile", label: "Oscilobatiente + Fijo + Oscilobatiente", openings: ["tiltTurnRight", "fixed", "tiltTurnLeft"] },
    { key: "three-all-tilt", label: "Inclinacion + Inclinacion + Inclinacion", openings: ["tilt", "tilt", "tilt"] },
    { key: "three-turn-center", label: "Fijo + Giro + Fijo", openings: ["fixed", "turnRight", "fixed"] },
    { key: "three-all-mobile", label: "Giro + Oscilobatiente + Giro", openings: ["turnRight", "tiltTurnRight", "turnLeft"] },
  ];
}

function bindEvents() {
  document.querySelectorAll(".step-tab").forEach((tab) => {
    tab.addEventListener("click", () => setStep(tab.dataset.stepTarget));
  });

  document.querySelector("#configForm").addEventListener("click", (event) => {
    const button = event.target.closest("[data-choice]");
    if (!button || button.disabled) return;
    const key = button.dataset.choice;
    state[key] = button.dataset.value;
    if (key === "material") {
      setMaterialDefaults();
    }
    if (key === "sash") {
      ensureLeafOpeningsForSash(false);
      renderOpeningConfigurator();
    }
    update();
  });

  elements.openingPresets.addEventListener("click", (event) => {
    const button = event.target.closest("[data-opening-preset]");
    if (!button) return;
    state.leafOpenings = button.dataset.openings.split(",");
    state.opening = state.leafOpenings[0];
    renderOpeningConfigurator();
    update();
  });

  elements.leafFunctionOptions.addEventListener("change", (event) => {
    if (!event.target.matches("[data-leaf-opening]")) return;
    const index = Number(event.target.dataset.leafOpening);
    ensureLeafOpeningsForSash(true);
    state.leafOpenings[index] = event.target.value;
    state.opening = state.leafOpenings[0];
    renderOpeningConfigurator();
    update();
  });

  elements.brand.addEventListener("change", (event) => {
    state.brand = event.target.value;
    state.profile = getProfilesForCurrentBrand()[0].key;
    syncProfileSelectors();
    update();
  });

  elements.profile.addEventListener("change", (event) => {
    state.profile = event.target.value;
    update();
  });

  ["width", "height", "quantity", "muntinVertical", "muntinHorizontal"].forEach((key) => {
    elements[key].addEventListener("input", (event) => {
      state[key] = Number(event.target.value) || 0;
      update();
    });
    elements[key].addEventListener("blur", () => {
      clampNumericState();
      syncForm();
      update();
    });
  });

  [
    "delivery",
    "exteriorColor",
    "interiorColor",
    "soundGlass",
    "safetyGlass",
    "decorGlass",
  ].forEach((key) => {
    elements[key].addEventListener("change", (event) => {
      state[key] = event.target.value;
      update();
    });
  });

  elements.specialRequest.addEventListener("input", (event) => {
    state.specialRequest = event.target.value.trim();
  });

  elements.mosquito.addEventListener("change", (event) => {
    state.mosquito = event.target.checked;
    update();
  });

  elements.extrasList.addEventListener("change", (event) => {
    if (!event.target.matches("input[type='checkbox']")) return;
    if (event.target.checked) {
      state.extras.add(event.target.value);
    } else {
      state.extras.delete(event.target.value);
    }
    update();
  });

  elements.addToQuote.addEventListener("click", addCurrentToQuote);
  elements.copySummary.addEventListener("click", copyCurrentSummary);
  elements.clearQuote.addEventListener("click", clearQuote);
  elements.printQuote.addEventListener("click", () => window.print());
}

function setMaterialDefaults() {
  const brands = getBrandsForMaterial();
  state.brand = brands[0];
  state.profile = getProfilesForCurrentBrand()[0].key;
  syncProfileSelectors();
}

function getBrandsForMaterial() {
  return [...new Set(catalog.profiles.filter((profile) => profile.material === state.material).map((profile) => profile.brand))];
}

function getProfilesForCurrentBrand() {
  return catalog.profiles.filter(
    (profile) => profile.material === state.material && profile.brand === state.brand,
  );
}

function getCurrentProfile() {
  return catalog.profiles.find((profile) => profile.key === state.profile) || catalog.profiles[0];
}

function getLeafCountForSash() {
  return catalog.sashTypes[state.sash].panels;
}

function getLeafOpenings() {
  ensureLeafOpeningsForSash(true);
  return state.leafOpenings.slice(0, getLeafCountForSash());
}

function ensureLeafOpeningsForSash(preserve = true) {
  const count = getLeafCountForSash();
  const defaults = getDefaultLeafOpenings(count);
  const current = Array.isArray(state.leafOpenings) ? state.leafOpenings : [state.opening || "tiltTurnRight"];
  state.leafOpenings = Array.from({ length: count }, (_, index) => {
    if (preserve && current[index] && catalog.openings[current[index]]) {
      return current[index];
    }
    return defaults[index] || defaults[0] || "tiltTurnRight";
  });
  state.opening = state.leafOpenings[0];
}

function getDefaultLeafOpenings(count) {
  if (count === 1) return ["tiltTurnRight"];
  if (count === 2) return ["fixed", "tiltTurnLeft"];
  return ["fixed", "tiltTurnRight", "fixed"];
}

function getLeafName(index, count) {
  if (count === 1) return "Hoja";
  if (count === 2) return index === 0 ? "Hoja izquierda" : "Hoja derecha";
  if (index === 0) return "Hoja izquierda";
  if (index === count - 1) return "Hoja derecha";
  return "Hoja central";
}

function getOpeningSummary() {
  const openings = getLeafOpenings();
  return openings
    .map((opening, index) => {
      const name = getLeafName(index, openings.length).replace("Hoja ", "");
      return `${name}: ${catalog.openings[opening].label}`;
    })
    .join(" · ");
}

function getItemOpeningSummary(item) {
  const count = catalog.sashTypes[item.sash]?.panels || 1;
  const openings =
    Array.isArray(item.leafOpenings) && item.leafOpenings.length
      ? item.leafOpenings
      : Array.from({ length: count }, () => item.opening || "fixed");
  return openings
    .map((opening, index) => {
      const option = catalog.openings[opening];
      return `${getLeafName(index, openings.length).replace("Hoja ", "")}: ${option?.label || opening}`;
    })
    .join(" · ");
}

function getOpeningMultiplier() {
  const openings = getLeafOpenings();
  const average =
    openings.reduce((sum, opening) => sum + catalog.openings[opening].multiplier, 0) /
    openings.length;
  const movableCount = openings.filter((opening) => !isFixedOpening(opening)).length;
  return average + Math.max(0, movableCount - 1) * 0.04;
}

function isFixedOpening(opening) {
  return opening === "fixed" || opening === "fixedSash";
}

function getColor(key) {
  return catalog.colors.find((color) => color.key === key) || catalog.colors[0];
}

function syncProfileSelectors() {
  const brands = getBrandsForMaterial();
  elements.brand.innerHTML = brands.map((brand) => `<option value="${brand}">${brand}</option>`).join("");
  elements.brand.value = state.brand;

  const profiles = getProfilesForCurrentBrand();
  elements.profile.innerHTML = profiles
    .map((profile) => `<option value="${profile.key}">${profile.label} · Uw ${profile.uw}</option>`)
    .join("");
  elements.profile.value = state.profile;
}

function syncForm() {
  elements.brand.value = state.brand;
  elements.profile.value = state.profile;
  elements.width.value = state.width;
  elements.height.value = state.height;
  elements.quantity.value = state.quantity;
  elements.delivery.value = state.delivery;
  elements.specialRequest.value = state.specialRequest;
  elements.exteriorColor.value = state.exteriorColor;
  elements.interiorColor.value = state.interiorColor;
  elements.soundGlass.value = state.soundGlass;
  elements.safetyGlass.value = state.safetyGlass;
  elements.decorGlass.value = state.decorGlass;
  elements.muntinVertical.value = state.muntinVertical;
  elements.muntinHorizontal.value = state.muntinHorizontal;
  elements.mosquito.checked = state.mosquito;
}

function clampNumericState() {
  state.width = clamp(state.width, 350, 2500);
  state.height = clamp(state.height, 350, 3000);
  state.quantity = clamp(state.quantity, 1, 99);
  state.muntinVertical = clamp(state.muntinVertical, 0, 5);
  state.muntinHorizontal = clamp(state.muntinHorizontal, 0, 5);
}

function setStep(step) {
  document.querySelectorAll(".step-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.stepTarget === step);
  });

  document.querySelectorAll(".config-step").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.step === step);
  });
}

function update() {
  normalizeConditionalState();
  const calculation = calculatePrice();
  renderSelectedStates();
  renderProfileSpecs();
  renderMeta();
  renderBreakdown(calculation);
  renderPreview();
}

function normalizeConditionalState() {
  ensureLeafOpeningsForSash(true);
  if (!isShutterAvailable() && state.shutter !== "none") {
    state.shutter = "none";
  }
  if (state.shutter === "none") {
    state.shutterControl = "belt";
    state.mosquito = false;
  }
  if (isFixedOnly()) {
    state.handle = "none";
    state.security = "base";
    state.extras.delete("handleMiddle");
    state.extras.delete("hiddenHinge");
    state.extras.delete("reedContact");
  } else if (state.handle === "none") {
    state.handle = "standard";
  }
}

function calculatePrice() {
  const area = getArea();
  const material = catalog.materials[state.material];
  const profile = getCurrentProfile();
  const sash = catalog.sashTypes[state.sash];
  const glazing = catalog.glazing[state.glazing];
  const exterior = getColor(state.exteriorColor);
  const interior = getColor(state.interiorColor);
  const gasket = catalog.gasketColors[state.gasket];

  const base = 36 + area * 96 + profile.base;
  const system =
    base *
    material.multiplier *
    profile.multiplier *
    sash.multiplier *
    getOpeningMultiplier() *
    glazing.multiplier;
  const colors =
    colorPrice(exterior, area) +
    colorPrice(interior, area) * 0.64 +
    (state.exteriorColor !== state.interiorColor ? 22 : 0) +
    gasket.fixed;
  const glass =
    glazing.fixed +
    glazing.area * area +
    catalog.soundGlass[state.soundGlass].fixed +
    catalog.soundGlass[state.soundGlass].area * area +
    catalog.safetyGlass[state.safetyGlass].fixed +
    catalog.safetyGlass[state.safetyGlass].area * area +
    catalog.decorGlass[state.decorGlass].fixed +
    catalog.decorGlass[state.decorGlass].area * area;
  const muntins = muntinPrice(area);
  const shutter = shutterPrice(area);
  const extras = extrasPrice(area);
  const delivery = catalog.delivery[state.delivery].fixed;
  const dimensions = dimensionSurcharge(area);
  const unitPrice = roundMoney(system + colors + glass + muntins + shutter + extras + delivery + dimensions);
  const total = roundMoney(unitPrice * state.quantity);

  return {
    area,
    unitPrice,
    total,
    rows: [
      ["Sistema y apertura", system],
      ["Color y juntas", colors],
      ["Cristal", glass],
      ["Sprossen", muntins],
      ["Persiana", shutter],
      ["Extras", extras],
      ["Entrega", delivery],
      ["Medida especial", dimensions],
      [`Cantidad x ${state.quantity}`, total],
    ],
  };
}

function colorPrice(color, area) {
  return color.fixed + color.area * area;
}

function muntinPrice(area) {
  if (state.muntin === "none") return 0;
  const option = catalog.muntins[state.muntin];
  const bars = state.muntinVertical + state.muntinHorizontal;
  const panelFactor = catalog.sashTypes[state.sash].panels;
  return bars * panelFactor * (option.fixed + option.area * area);
}

function shutterPrice(area) {
  if (state.shutter === "none") return 0;
  const shutter = catalog.shutters[state.shutter];
  const control = catalog.shutterControls[state.shutterControl];
  const mosquito = state.mosquito ? 72 + area * 14 : 0;
  return shutter.fixed + shutter.area * area + control.fixed + mosquito;
}

function extrasPrice(area) {
  const handle = catalog.handles[state.handle].fixed;
  const security =
    catalog.securityHardware[state.security].fixed +
    catalog.securityHardware[state.security].area * area;
  const extras = [...state.extras].reduce((sum, key) => {
    const extra = catalog.extras[key];
    return sum + extra.fixed + extra.area * area;
  }, 0);
  return handle + security + extras;
}

function dimensionSurcharge(area) {
  const large = area > 3.4 ? (area - 3.4) * 58 : 0;
  const tall = state.height > 2400 ? 48 : 0;
  const wide = state.width > 2200 ? 42 : 0;
  return large + tall + wide;
}

function getArea() {
  return Math.max((state.width * state.height) / 1_000_000, 0.13);
}

function isShutterAvailable() {
  return state.width >= 650 && state.height >= 650 && state.width <= 2500 && state.height <= 2600;
}

function isFixedOnly() {
  return getLeafOpenings().every(isFixedOpening);
}

function renderSelectedStates() {
  document.querySelectorAll("[data-choice]").forEach((button) => {
    const key = button.dataset.choice;
    button.classList.toggle("is-selected", state[key] === button.dataset.value);
  });

  document.querySelectorAll("[data-choice='shutter']").forEach((button) => {
    const disabled = button.dataset.value !== "none" && !isShutterAvailable();
    button.disabled = disabled;
    button.classList.toggle("is-disabled", disabled);
  });

  document.querySelectorAll("[data-choice='shutterControl']").forEach((button) => {
    const disabled = state.shutter === "none";
    button.disabled = disabled;
    button.classList.toggle("is-disabled", disabled);
  });

  document.querySelectorAll("[data-choice='handle'], [data-choice='security']").forEach((button) => {
    const disabled = isFixedOnly() && button.dataset.value !== "none" && button.dataset.value !== "base";
    button.disabled = disabled;
    button.classList.toggle("is-disabled", disabled);
  });

  document.querySelectorAll("[data-extra-wrap]").forEach((wrap) => {
    const checked = state.extras.has(wrap.dataset.extraWrap);
    const disabled =
      isFixedOnly() &&
      ["handleMiddle", "hiddenHinge", "reedContact"].includes(wrap.dataset.extraWrap);
    wrap.classList.toggle("is-selected", checked);
    wrap.classList.toggle("is-disabled", disabled);
    wrap.querySelector("input").checked = checked;
    wrap.querySelector("input").disabled = disabled;
  });

  elements.muntinControls.hidden = state.muntin === "none";
  elements.mosquito.disabled = state.shutter === "none";
  elements.mosquito.checked = state.mosquito;
  elements.shutterHint.textContent = isShutterAvailable()
    ? "La persiana se calcula con cajon superior y accionamiento seleccionado."
    : "Con estas medidas no se ofrece persiana en el configurador de ejemplo.";

  elements.dimensionHint.textContent =
    state.width < 350 || state.width > 2500 || state.height < 350 || state.height > 3000
      ? "Rango valido: 350-2500 mm de ancho y 350-3000 mm de alto."
      : "";

  const exterior = getColor(state.exteriorColor);
  const interior = getColor(state.interiorColor);
  elements.exteriorColorName.textContent = exterior.label;
  elements.interiorColorName.textContent = interior.label;
  elements.exteriorSwatch.style.background = exterior.value;
  elements.interiorSwatch.style.background = interior.value;
}

function renderProfileSpecs() {
  const profile = getCurrentProfile();
  elements.profileSpecs.innerHTML = `
    <div>
      <span>Material</span>
      <strong>${catalog.materials[state.material].label}</strong>
    </div>
    <div>
      <span>Profundidad</span>
      <strong>${profile.depth}</strong>
    </div>
    <div>
      <span>Uw aprox.</span>
      <strong>${profile.uw}</strong>
    </div>
    <div>
      <span>Plazo</span>
      <strong>${profile.lead}</strong>
    </div>
  `;
}

function renderMeta() {
  const profile = getCurrentProfile();
  elements.metaProfile.textContent = profile.label;
  elements.metaType.textContent = catalog.sashTypes[state.sash].label;
  elements.metaSize.textContent = `${state.width} × ${state.height} mm`;
  elements.metaOpening.textContent = getOpeningSummary();
}

function renderBreakdown(calculation) {
  elements.liveTotal.textContent = euro.format(calculation.total);
  elements.summaryTotal.textContent = euro.format(calculation.total);
  elements.priceBreakdown.innerHTML = calculation.rows
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${euro.format(value)}</dd>
        </div>
      `,
    )
    .join("");
}

function renderPreview() {
  const svg = elements.productPreview;
  const exterior = getColor(state.exteriorColor);
  const interior = getColor(state.interiorColor);
  const gasket = catalog.gasketColors[state.gasket].value;
  const p = getPreviewGeometry();
  const shutter = state.shutter !== "none";
  const panels = getPanelRects(p);
  const frameShade = shadeColor(exterior.value, -18);
  const rail = interior.value;

  svg.setAttribute("viewBox", `0 0 ${p.canvasW} ${p.canvasH}`);
  svg.innerHTML = `
    <defs>
      <linearGradient id="glassGradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#eefbff" />
        <stop offset="54%" stop-color="#b9d7e2" />
        <stop offset="100%" stop-color="#f8fcff" />
      </linearGradient>
      <linearGradient id="frameShade" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${exterior.value}" />
        <stop offset="100%" stop-color="${frameShade}" />
      </linearGradient>
      <pattern id="mesh" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3b5158" stroke-width="0.9" opacity="0.24" />
      </pattern>
    </defs>
    ${shutter ? renderShutter(p, exterior.value) : ""}
    <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="4" fill="url(#frameShade)" />
    <rect x="${p.x + p.frame}" y="${p.y + p.frame}" width="${p.w - p.frame * 2}" height="${p.h - p.frame * 2}" rx="3" fill="url(#glassGradient)" />
    <rect x="${p.x + p.frame * 0.62}" y="${p.y + p.frame * 0.62}" width="${p.w - p.frame * 1.24}" height="${p.h - p.frame * 1.24}" fill="none" stroke="${rail}" stroke-width="${Math.max(8, p.frame * 0.34)}" opacity="0.95" />
    ${renderSashRails(p, rail)}
    ${panels.map((panel) => renderMuntins(panel, gasket)).join("")}
    ${renderOpeningLines(panels)}
    ${state.mosquito ? `<rect x="${p.x + p.frame}" y="${p.y + p.frame}" width="${p.w - p.frame * 2}" height="${p.h - p.frame * 2}" fill="url(#mesh)" opacity="0.75" />` : ""}
    ${renderHandles(panels, gasket)}
    <text x="${p.canvasW / 2}" y="${p.canvasH - 22}" text-anchor="middle" fill="#48504a" font-size="18" font-weight="700">${state.width} × ${state.height} mm</text>
  `;
}

function getPreviewGeometry() {
  const maxW = 620;
  const maxH = 500;
  const ratio = state.width / state.height;
  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  const canvasW = Math.max(680, w + 96);
  const canvasH = Math.max(600, h + (state.shutter !== "none" ? 150 : 114));
  return {
    canvasW,
    canvasH,
    x: (canvasW - w) / 2,
    y: state.shutter !== "none" ? 78 : 42,
    w,
    h,
    frame: Math.max(18, Math.min(34, w * 0.055)),
  };
}

function getPanelRects(p) {
  const x = p.x + p.frame * 1.2;
  const y = p.y + p.frame * 1.2;
  const w = p.w - p.frame * 2.4;
  const h = p.h - p.frame * 2.4;
  const gap = p.frame * 0.5;
  const openings = getLeafOpenings();

  if (state.sash === "topLight") {
    const topH = h * 0.28;
    return [
      { x, y, w, h: topH - gap * 0.5, opening: openings[0], leafIndex: 0 },
      { x, y: y + topH + gap, w, h: h - topH - gap, opening: openings[1], leafIndex: 1 },
    ];
  }

  if (state.sash === "bottomLight") {
    const bottomH = h * 0.28;
    return [
      { x, y, w, h: h - bottomH - gap, opening: openings[0], leafIndex: 0 },
      { x, y: y + h - bottomH + gap * 0.5, w, h: bottomH - gap * 0.5, opening: openings[1], leafIndex: 1 },
    ];
  }

  const count = getLeafCountForSash();
  const panelW = (w - gap * (count - 1)) / count;
  return Array.from({ length: count }, (_, index) => ({
    x: x + index * (panelW + gap),
    y,
    w: panelW,
    h,
    opening: openings[index],
    leafIndex: index,
  }));
}

function renderSashRails(p, rail) {
  const rails = [];
  if (state.sash === "topLight") {
    rails.push(`<rect x="${p.x}" y="${p.y + p.h * 0.32}" width="${p.w}" height="${p.frame * 0.72}" fill="${rail}" />`);
  } else if (state.sash === "bottomLight") {
    rails.push(`<rect x="${p.x}" y="${p.y + p.h * 0.7}" width="${p.w}" height="${p.frame * 0.72}" fill="${rail}" />`);
  } else {
    const count = getLeafCountForSash();
    for (let i = 1; i < count; i += 1) {
      const x = p.x + (p.w / count) * i;
      rails.push(`<rect x="${x - p.frame * 0.34}" y="${p.y + p.frame * 0.6}" width="${p.frame * 0.68}" height="${p.h - p.frame * 1.2}" fill="${rail}" />`);
    }
  }
  return rails.join("");
}

function renderMuntins(panel, stroke) {
  if (state.muntin === "none") return "";
  const lines = [];
  for (let i = 1; i <= state.muntinVertical; i += 1) {
    const x = panel.x + (panel.w / (state.muntinVertical + 1)) * i;
    lines.push(`<line x1="${x}" y1="${panel.y}" x2="${x}" y2="${panel.y + panel.h}" stroke="${stroke}" stroke-width="4" opacity="0.7" />`);
  }
  for (let i = 1; i <= state.muntinHorizontal; i += 1) {
    const y = panel.y + (panel.h / (state.muntinHorizontal + 1)) * i;
    lines.push(`<line x1="${panel.x}" y1="${y}" x2="${panel.x + panel.w}" y2="${y}" stroke="${stroke}" stroke-width="4" opacity="0.7" />`);
  }
  return lines.join("");
}

function renderOpeningLines(panels) {
  return panels.map((panel) => renderLeafOpening(panel)).join("");
}

function renderLeafOpening(panel) {
  if (isFixedOpening(panel.opening)) return "";

  const stroke = "#e55353";
  const leftHinge = panel.opening === "turnLeft" || panel.opening === "tiltTurnLeft";
  const hingeX = leftHinge ? panel.x + 12 : panel.x + panel.w - 12;
  const handleX = leftHinge ? panel.x + panel.w - 12 : panel.x + 12;
  const yTop = panel.y + 12;
  const yMid = panel.y + panel.h / 2;
  const yBottom = panel.y + panel.h - 12;
  const tiltPath = `<path d="M ${panel.x + 12} ${yBottom} L ${panel.x + panel.w / 2} ${yTop} L ${panel.x + panel.w - 12} ${yBottom}" fill="none" stroke="${stroke}" stroke-width="3" opacity="0.82" />`;
  const turnPath = `<path d="M ${hingeX} ${yTop} L ${handleX} ${yMid} L ${hingeX} ${yBottom}" fill="none" stroke="${stroke}" stroke-width="3" opacity="0.92" />`;

  if (panel.opening === "tilt") return tiltPath;
  if (panel.opening === "tiltTurnLeft" || panel.opening === "tiltTurnRight") {
    return `${turnPath}${tiltPath}`;
  }
  return turnPath;
}

function renderHandles(panels, stroke) {
  if (state.handle === "none") return "";
  return panels
    .filter((panel) => !isFixedOpening(panel.opening))
    .map((panel) => renderLeafHandle(panel, stroke))
    .join("");
}

function renderLeafHandle(panel, stroke) {
  const leftHinge = panel.opening === "turnLeft" || panel.opening === "tiltTurnLeft";
  const x = leftHinge ? panel.x + panel.w - 8 : panel.x + 8;
  const y = panel.y + panel.h * 0.52;
  return `
    <rect x="${x - 4}" y="${y - 22}" width="8" height="44" rx="4" fill="${stroke}" opacity="0.9" />
    <rect x="${leftHinge ? x - 28 : x + 2}" y="${y - 4}" width="28" height="8" rx="4" fill="${stroke}" opacity="0.9" />
  `;
}

function renderShutter(p, color) {
  const y = p.y - 56;
  const slats = Array.from({ length: 8 }, (_, index) => {
    const lineY = y + 10 + index * 7;
    return `<line x1="${p.x - 14}" y1="${lineY}" x2="${p.x + p.w + 14}" y2="${lineY}" stroke="${shadeColor(color, -34)}" stroke-width="2" opacity="0.35" />`;
  }).join("");

  return `
    <rect x="${p.x - 18}" y="${y}" width="${p.w + 36}" height="56" rx="4" fill="${shadeColor(color, 12)}" />
    ${slats}
  `;
}

function addCurrentToQuote() {
  clampNumericState();
  syncForm();
  const calculation = calculatePrice();
  const profile = getCurrentProfile();
  const item = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    profile: state.profile,
    profileLabel: profile.label,
    material: state.material,
    brand: state.brand,
    sash: state.sash,
    opening: state.opening,
    leafOpenings: getLeafOpenings(),
    width: state.width,
    height: state.height,
    quantity: state.quantity,
    exteriorColor: state.exteriorColor,
    interiorColor: state.interiorColor,
    glazing: state.glazing,
    shutter: state.shutter,
    total: calculation.total,
    specialRequest: state.specialRequest,
  };
  quoteItems.push(item);
  saveQuote();
  renderQuote();
}

function renderQuote() {
  if (!quoteItems.length) {
    elements.quoteList.innerHTML = `<div class="quote-empty">No hay elementos en el presupuesto.</div>`;
    elements.quoteTotal.textContent = euro.format(0);
    return;
  }

  elements.quoteList.innerHTML = quoteItems
    .map((item) => {
      const description = [
        catalog.materials[item.material]?.label || item.material,
        item.brand,
        item.profileLabel,
        catalog.sashTypes[item.sash]?.label || item.sash,
        getItemOpeningSummary(item),
        `${item.width} × ${item.height} mm`,
        `x ${item.quantity}`,
      ]
        .filter(Boolean)
        .join(" · ");

      return `
        <article class="quote-item">
          <div>
            <strong>Ventana configurada</strong>
            <span>${description}</span>
          </div>
          <div class="quote-price">${euro.format(item.total)}</div>
          <button class="icon-button" type="button" aria-label="Eliminar" title="Eliminar" data-remove="${item.id}">×</button>
        </article>
      `;
    })
    .join("");

  elements.quoteTotal.textContent = euro.format(
    quoteItems.reduce((sum, item) => sum + item.total, 0),
  );

  elements.quoteList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      quoteItems = quoteItems.filter((item) => item.id !== button.dataset.remove);
      saveQuote();
      renderQuote();
    });
  });
}

async function copyCurrentSummary() {
  const calculation = calculatePrice();
  const profile = getCurrentProfile();
  const lines = [
    `Ventana ${state.width} x ${state.height} mm`,
    `Material: ${catalog.materials[state.material].label}`,
    `Fabricante: ${state.brand}`,
    `Perfil: ${profile.label}`,
    `Tipo: ${catalog.sashTypes[state.sash].label}`,
    `Apertura: ${getOpeningSummary()}`,
    `Exterior: ${getColor(state.exteriorColor).label}`,
    `Interior: ${getColor(state.interiorColor).label}`,
    `Cristal: ${catalog.glazing[state.glazing].label}`,
    `Persiana: ${catalog.shutters[state.shutter].label}`,
    `Cantidad: ${state.quantity}`,
    `Total: ${euro.format(calculation.total)}`,
  ];

  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    flashCopyButton("Copiado");
  } catch {
    flashCopyButton("No copiado");
  }
}

function flashCopyButton(text) {
  elements.copySummary.textContent = text;
  window.setTimeout(() => {
    elements.copySummary.textContent = "Copiar resumen";
  }, 1400);
}

function clearQuote() {
  quoteItems = [];
  saveQuote();
  renderQuote();
}

function loadQuote() {
  try {
    return JSON.parse(localStorage.getItem("advancedWindowQuoteV2") || "[]");
  } catch {
    return [];
  }
}

function saveQuote() {
  localStorage.setItem("advancedWindowQuoteV2", JSON.stringify(quoteItems));
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || min, min), max);
}

function shadeColor(hex, percent) {
  const clean = hex.replace("#", "");
  const number = parseInt(clean, 16);
  const amount = Math.round(2.55 * percent);
  const r = clampColor((number >> 16) + amount);
  const g = clampColor(((number >> 8) & 0x00ff) + amount);
  const b = clampColor((number & 0x0000ff) + amount);
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

function clampColor(value) {
  return Math.max(0, Math.min(255, value));
}
console.log("SIMULATOR FINISHED");