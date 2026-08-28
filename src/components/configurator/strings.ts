/**
 * Cadenas de interfaz del configurador, en los tres idiomas de Kamika.
 * Mismo formato `Localized` que los datos: al mudarlo a Kamika estas
 * entradas se vierten en content/{en,de,pl}.ts tal cual.
 */
import type { Localized } from "../../data/configurator/types";

export const S = {
  eyebrow: { en: "Online configurator", de: "Online-Konfigurator", pl: "Konfigurator online" },
  title: { en: "Configure your window", de: "Fenster konfigurieren", pl: "Skonfiguruj okno" },
  intro: {
    en: "Real profile systems, the real colour chart and the real glass range — combined step by step.",
    de: "Echte Profilsysteme, die echte Farbkarte und das echte Glasprogramm — Schritt für Schritt kombiniert.",
    pl: "Prawdziwe systemy profili, prawdziwa paleta kolorów i prawdziwa oferta szkła — krok po kroku.",
  },
  /** El aviso honesto. Visible SIEMPRE mientras las tarifas no sean reales. */
  demoPrices: {
    en: "Example prices — final quotes come from the Kamika team.",
    de: "Beispielpreise — verbindliche Angebote erstellt das Kamika-Team.",
    pl: "Ceny przykładowe — wiążącą wycenę przygotowuje zespół Kamika.",
  },

  stepSystem: { en: "System", de: "System", pl: "System" },
  stepType: { en: "Type", de: "Typ", pl: "Typ" },
  stepSize: { en: "Size", de: "Maße", pl: "Wymiary" },
  stepColour: { en: "Colour", de: "Farbe", pl: "Kolor" },
  stepGlass: { en: "Glass", de: "Glas", pl: "Szkło" },
  stepMuntins: { en: "Bars", de: "Sprossen", pl: "Szprosy" },
  stepShutter: { en: "Shutter", de: "Rollladen", pl: "Roleta" },
  stepExtras: { en: "Extras", de: "Extras", pl: "Dodatki" },

  material: { en: "Frame material", de: "Rahmenmaterial", pl: "Materiał ramy" },
  brand: { en: "Manufacturer", de: "Hersteller", pl: "Producent" },
  system: { en: "Profile system", de: "Profilsystem", pl: "System profili" },
  specDepth: { en: "Installation depth", de: "Bautiefe", pl: "Głębokość zabudowy" },
  specUw: { en: "Uw from", de: "Uw ab", pl: "Uw od" },
  specChambers: { en: "Chambers", de: "Kammern", pl: "Komory" },

  layout: { en: "Sashes and composition", de: "Flügel und Aufteilung", pl: "Skrzydła i układ" },
  leafFunction: { en: "Function per sash", de: "Funktion je Flügel", pl: "Funkcja skrzydła" },
  leafOne: { en: "Sash", de: "Flügel", pl: "Skrzydło" },
  leafLeft: { en: "Left", de: "Links", pl: "Lewe" },
  leafCentre: { en: "Centre", de: "Mitte", pl: "Środkowe" },
  leafRight: { en: "Right", de: "Rechts", pl: "Prawe" },
  leafTop: { en: "Top light", de: "Oberlicht", pl: "Naświetle" },
  leafBottom: { en: "Bottom light", de: "Unterlicht", pl: "Naświetle dolne" },
  leafMain: { en: "Main sash", de: "Hauptflügel", pl: "Skrzydło główne" },

  width: { en: "Width (mm)", de: "Breite (mm)", pl: "Szerokość (mm)" },
  height: { en: "Height (mm)", de: "Höhe (mm)", pl: "Wysokość (mm)" },
  quantity: { en: "Quantity", de: "Stückzahl", pl: "Ilość" },
  sizeHint: {
    en: "Possible range: 350–2500 mm wide, 350–3000 mm high.",
    de: "Möglicher Bereich: 350–2500 mm breit, 350–3000 mm hoch.",
    pl: "Możliwy zakres: 350–2500 mm szerokości, 350–3000 mm wysokości.",
  },
  notes: { en: "Special requests", de: "Besondere Wünsche", pl: "Uwagi specjalne" },
  notesPlaceholder: {
    en: "Installation details, special sizes, anything we should know…",
    de: "Montagedetails, Sondermaße, alles was wir wissen sollten…",
    pl: "Szczegóły montażu, wymiary specjalne, wszystko co powinniśmy wiedzieć…",
  },

  exteriorColour: { en: "Exterior colour", de: "Farbe außen", pl: "Kolor zewnętrzny" },
  interiorColour: { en: "Interior colour", de: "Farbe innen", pl: "Kolor wewnętrzny" },
  gasket: { en: "Gasket colour", de: "Dichtungsfarbe", pl: "Kolor uszczelki" },
  groupWhite: { en: "Standard", de: "Standard", pl: "Standard" },
  groupSalFoil: { en: "Decor foils (SAL chart)", de: "Dekorfolien (SAL-Karte)", pl: "Folie dekoracyjne (karta SAL)" },
  groupPvcFoil: { en: "Decor foils", de: "Dekorfolien", pl: "Folie dekoracyjne" },
  groupRal: { en: "RAL colours", de: "RAL-Farben", pl: "Kolory RAL" },
  groupAnodised: { en: "Anodised", de: "Eloxiert", pl: "Anodowane" },
  colourNote: {
    en: "On-screen colours are approximate — ask us for a physical sample.",
    de: "Bildschirmfarben sind Näherungswerte — fragen Sie nach einem Muster.",
    pl: "Kolory na ekranie są orientacyjne — poproś o próbnik.",
  },

  glazing: { en: "Glazing", de: "Verglasung", pl: "Szklenie" },
  soundGlass: { en: "Sound insulation", de: "Schallschutz", pl: "Izolacja akustyczna" },
  safetyGlass: { en: "Safety glass", de: "Sicherheitsglas", pl: "Szkło bezpieczne" },
  ornamentGlass: { en: "Ornament glass", de: "Ornamentglas", pl: "Szkło ornamentowe" },
  ornamentNone: { en: "None (clear)", de: "Ohne (klar)", pl: "Bez (przezroczyste)" },
  ornamentNote: {
    en: "Names from the WIKĘD glass chart — samples on the Kamika colours page.",
    de: "Namen aus der WIKĘD-Glaskarte — Muster auf der Kamika-Farbseite.",
    pl: "Nazwy z karty szkła WIKĘD — próbki na stronie kolorów Kamika.",
  },

  muntins: { en: "Glazing bars", de: "Sprossen", pl: "Szprosy" },
  muntinsV: { en: "Vertical divisions", de: "Senkrechte Teilungen", pl: "Podziały pionowe" },
  muntinsH: { en: "Horizontal divisions", de: "Waagerechte Teilungen", pl: "Podziały poziome" },

  shutterType: { en: "Roller shutter", de: "Rollladen", pl: "Roleta" },
  shutterControl: { en: "Operation", de: "Bedienung", pl: "Sterowanie" },
  mosquito: { en: "Integrated insect screen", de: "Integriertes Insektenschutzgitter", pl: "Zintegrowana moskitiera" },
  mosquitoNote: {
    en: "Roll-down screen in the shutter box",
    de: "Rollo im Rollladenkasten",
    pl: "Rolowana siatka w skrzynce rolety",
  },
  shutterUnavailable: {
    en: "No roller shutter is offered for these dimensions.",
    de: "Für diese Maße wird kein Rollladen angeboten.",
    pl: "Dla tych wymiarów roleta nie jest oferowana.",
  },

  handle: { en: "Handle", de: "Griff", pl: "Klamka" },
  security: { en: "Security", de: "Sicherheit", pl: "Bezpieczeństwo" },
  extrasLabel: { en: "Additional options", de: "Weitere Optionen", pl: "Opcje dodatkowe" },
  fixedOnlyHint: {
    en: "Fixed glazing has no handle or opening hardware.",
    de: "Festverglasung hat weder Griff noch Öffnungsbeschlag.",
    pl: "Szklenie stałe nie ma klamki ani okuć otwierania.",
  },

  preview: { en: "Preview", de: "Vorschau", pl: "Podgląd" },
  metaSystem: { en: "System", de: "System", pl: "System" },
  metaType: { en: "Type", de: "Typ", pl: "Typ" },
  metaSize: { en: "Size", de: "Maße", pl: "Wymiary" },
  metaOpening: { en: "Opening", de: "Öffnung", pl: "Otwieranie" },
  estimated: { en: "Estimated price", de: "Preisschätzung", pl: "Cena szacunkowa" },
  perUnit: { en: "per unit", de: "pro Stück", pl: "za sztukę" },
  totalLabel: { en: "Total", de: "Gesamt", pl: "Razem" },
  addToQuote: { en: "Add to quote list", de: "Zur Angebotsliste", pl: "Dodaj do wyceny" },
  copySummary: { en: "Copy summary", de: "Zusammenfassung kopieren", pl: "Kopiuj podsumowanie" },
  copied: { en: "Copied ✓", de: "Kopiert ✓", pl: "Skopiowano ✓" },
  copyFailed: { en: "Could not copy", de: "Kopieren fehlgeschlagen", pl: "Nie udało się skopiować" },

  quoteTitle: { en: "Quote list", de: "Angebotsliste", pl: "Lista wyceny" },
  quoteEyebrow: { en: "Your selection", de: "Ihre Auswahl", pl: "Twój wybór" },
  quoteEmpty: {
    en: "Nothing on the list yet — configure a window and add it.",
    de: "Noch nichts auf der Liste — konfigurieren Sie ein Fenster und fügen Sie es hinzu.",
    pl: "Lista jest pusta — skonfiguruj okno i dodaj je.",
  },
  quoteItem: { en: "Configured window", de: "Konfiguriertes Fenster", pl: "Skonfigurowane okno" },
  quoteTotal: { en: "Quote total", de: "Summe der Liste", pl: "Suma wyceny" },
  print: { en: "Print", de: "Drucken", pl: "Drukuj" },
  clear: { en: "Clear list", de: "Liste leeren", pl: "Wyczyść listę" },
  remove: { en: "Remove", de: "Entfernen", pl: "Usuń" },
  units: { en: "pcs", de: "Stk.", pl: "szt." },
} satisfies Record<string, Localized<string>>;
