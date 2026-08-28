/**
 * Cadenas de interfaz del catálogo y la home, en los tres idiomas.
 * (El contenido — nombres, intros, specs — ya viene localizado en los
 * datos copiados de Kamika; esto son solo los rótulos propios.)
 */
import type { Localized } from "../data/catalog/types";

export const CS = {
  // Navegación (se pintan en mayúsculas vía CSS)
  navCatalogue: { en: "Catalogue", de: "Katalog", pl: "Katalog" },
  navConfigurator: { en: "Configurator", de: "Konfigurator", pl: "Konfigurator" },

  // Índice del catálogo
  sortiment: { en: "Product range", de: "Sortiment", pl: "Oferta" },
  catalogue: { en: "Catalogue", de: "Katalog", pl: "Katalog" },
  catalogueIntro: {
    en: "Eight product ranges with real systems, real models and the data from the original catalogues.",
    de: "Acht Produktbereiche mit echten Systemen, echten Modellen und den Daten aus den Original-Katalogen.",
    pl: "Osiem grup produktów z prawdziwymi systemami, modelami i danymi z oryginalnych katalogów.",
  },
  systems: { en: "systems", de: "Systeme", pl: "systemów" },
  models: { en: "models", de: "Modelle", pl: "modeli" },
  overview: { en: "Overview", de: "Übersicht", pl: "Przegląd" },
  comingSoon: { en: "in preparation", de: "in Vorbereitung", pl: "w przygotowaniu" },
  comingSoonLong: {
    en: "The catalogue for this range is in preparation — the overview follows.",
    de: "Der Katalog dieser Produktlinie ist in Vorbereitung — die Übersicht folgt.",
    pl: "Katalog tej linii produktów jest w przygotowaniu — przegląd wkrótce.",
  },
  noMaterial: {
    en: "No catalogue material for this range yet.",
    de: "Für diese Produktlinie liegt noch kein Katalogmaterial vor.",
    pl: "Dla tej linii produktów nie ma jeszcze materiałów katalogowych.",
  },
  cataloguePage: { en: "Catalogue p.", de: "Katalog S.", pl: "Katalog s." },
  backToCatalogue: { en: "← Catalogue", de: "← Katalog", pl: "← Katalog" },

  // Home
  heroEyebrow: {
    en: "Configurator lab · Real systems",
    de: "Konfigurator-Labor · Echte Systeme",
    pl: "Laboratorium konfiguratora · Prawdziwe systemy",
  },
  heroIntro: {
    en: "The development lab of the Kamika window configurator: real profile systems, the real colour chart and the real catalogue — prices are examples for now.",
    de: "Das Entwicklungslabor des Kamika-Fensterkonfigurators: echte Profilsysteme, die echte Farbkarte und der echte Katalog — Preise vorerst nur als Beispiel.",
    pl: "Laboratorium konfiguratora okien Kamika: prawdziwe systemy profili, prawdziwa paleta kolorów i prawdziwy katalog — ceny na razie przykładowe.",
  },
  openConfigurator: {
    en: "Open the configurator",
    de: "Konfigurator öffnen",
    pl: "Otwórz konfigurator",
  },
  viewCatalogue: { en: "View the catalogue", de: "Katalog ansehen", pl: "Zobacz katalog" },
  fromCatalogues: {
    en: "From the original catalogues",
    de: "Aus den Original-Katalogen",
    pl: "Z oryginalnych katalogów",
  },
  stat1: {
    en: "40 Systems from real manufacturers",
    de: "40 Systeme von echten Herstellern",
    pl: "40 Systemów prawdziwych producentów",
  },
  stat2: { en: "168 Colours and finishes", de: "168 Farben und Oberflächen", pl: "168 Kolorów i wykończeń" },
  stat3: { en: "584 Catalogue models", de: "584 Katalogmodelle", pl: "584 Modele katalogowe" },
  stat4: { en: "8 Product ranges", de: "8 Produktbereiche", pl: "8 Grup produktów" },
  ranges: { en: "Product ranges", de: "Produktbereiche", pl: "Grupy produktów" },
  rangesTitle: { en: "The real range.", de: "Das echte Sortiment.", pl: "Prawdziwa oferta." },
  rangesIntro: {
    en: "Eight product ranges, taken from the Kamika catalogue data — with real systems, models and data sheets.",
    de: "Acht Produktbereiche, übernommen aus den Katalogdaten von Kamika — mit echten Systemen, Modellen und Datenblättern.",
    pl: "Osiem grup produktów przeniesionych z danych katalogowych Kamika — z prawdziwymi systemami, modelami i kartami technicznymi.",
  },
} satisfies Record<string, Localized<string>>;
