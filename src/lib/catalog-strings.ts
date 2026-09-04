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
  navContact: { en: "Contact", de: "Kontakt", pl: "Kontakt" },
  navMenu: { en: "Menu", de: "Menü", pl: "Menu" },
  navOpenCatalogue: { en: "Open product ranges", de: "Produktbereiche öffnen", pl: "Otwórz grupy produktów" },

  // Índice del catálogo
  sortiment: { en: "Product range", de: "Sortiment", pl: "Oferta" },
  catalogue: { en: "Catalogue", de: "Katalog", pl: "Katalog" },
  catalogueIntro: {
    en: "Seven documented product ranges with real systems, real models and data from the original catalogues.",
    de: "Sieben dokumentierte Produktbereiche mit echten Systemen, echten Modellen und Daten aus den Original-Katalogen.",
    pl: "Siedem udokumentowanych grup produktów z prawdziwymi systemami, modelami i danymi z oryginalnych katalogów.",
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
  originalCatalogues: { en: "Original catalogues", de: "Original-Kataloge", pl: "Oryginalne katalogi" },
  originalCataloguesIntro: {
    en: "The documents behind the product data, with their original page count and edition.",
    de: "Die Dokumente hinter den Produktdaten – mit ursprünglicher Seitenzahl und Ausgabe.",
    pl: "Dokumenty źródłowe danych produktowych wraz z oryginalną liczbą stron i wydaniem.",
  },
  pages: { en: "pages", de: "Seiten", pl: "stron" },
  documented: { en: "documented", de: "dokumentiert", pl: "udokumentowany" },
  pdfUnavailable: { en: "PDF in preparation", de: "PDF in Vorbereitung", pl: "PDF w przygotowaniu" },
  brandsAndCollections: { en: "Brands and collections", de: "Marken und Kollektionen", pl: "Marki i kolekcje" },
  feature: { en: "Feature", de: "Merkmal", pl: "Cecha" },
  originalCatalogue: { en: "Original catalogue", de: "Original-Katalog", pl: "Oryginalny katalog" },
  page: { en: "Page", de: "Seite", pl: "Strona" },
  technicalDataPending: {
    en: "Technical data has been requested from the supplier.",
    de: "Technische Daten sind beim Lieferanten angefragt.",
    pl: "Dane techniczne zostały zamówione u dostawcy.",
  },

  // Home
  heroEyebrow: {
    en: "Windows · doors · building elements",
    de: "Fenster · Türen · Bauelemente",
    pl: "Okna · drzwi · elementy budowlane",
  },
  heroIntro: {
    en: "Architectural openings, carefully planned: windows, doors and facade systems with honest materials, precise details and advice from a single source.",
    de: "Architektonische Öffnungen, sorgfältig geplant: Fenster, Türen und Fassadensysteme mit ehrlichen Materialien, präzisen Details und Beratung aus einer Hand.",
    pl: "Starannie zaplanowane otwory architektoniczne: okna, drzwi i systemy fasadowe z autentycznych materiałów, dopracowane w detalu i z kompleksowym doradztwem.",
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
  stat4: { en: "7 Published product ranges", de: "7 veröffentlichte Produktbereiche", pl: "7 opublikowanych grup produktów" },
  ranges: { en: "Product ranges", de: "Produktbereiche", pl: "Grupy produktów" },
  rangesTitle: { en: "The real range.", de: "Das echte Sortiment.", pl: "Prawdziwa oferta." },
  rangesIntro: {
    en: "Seven documented product ranges, taken from the Kamika catalogue data — with real systems, models and data sheets.",
    de: "Sieben dokumentierte Produktbereiche, übernommen aus den Katalogdaten von Kamika — mit echten Systemen, Modellen und Datenblättern.",
    pl: "Siedem udokumentowanych grup produktów przeniesionych z danych katalogowych Kamika — z prawdziwymi systemami, modelami i kartami technicznymi.",
  },
  materials: { en: "Materials and finishes", de: "Materialien und Oberflächen", pl: "Materiały i wykończenia" },
  materialsTitle: { en: "Made to belong.", de: "Gemacht, um zu bleiben.", pl: "Stworzone, by pasować." },
  materialPvc: { en: "PVC systems", de: "Kunststoffsysteme", pl: "Systemy PVC" },
  materialPvcText: { en: "Efficient profiles with calm proportions and excellent thermal values.", de: "Effiziente Profile mit ruhigen Proportionen und hervorragenden Wärmewerten.", pl: "Wydajne profile o spokojnych proporcjach i doskonałej izolacyjności." },
  materialAlu: { en: "Aluminium", de: "Aluminium", pl: "Aluminium" },
  materialAluText: { en: "Slender sightlines, durable surfaces and freedom for large formats.", de: "Schlanke Ansichten, langlebige Oberflächen und Freiheit für große Formate.", pl: "Smukłe profile, trwałe powierzchnie i swoboda dużych formatów." },
  materialGlass: { en: "Glass and light", de: "Glas und Licht", pl: "Szkło i światło" },
  materialGlassText: { en: "Glazing selected for comfort, acoustics and quality daylight.", de: "Verglasungen, gewählt für Komfort, Akustik und gutes Tageslicht.", pl: "Szklenie dobrane pod kątem komfortu, akustyki i światła dziennego." },
} satisfies Record<string, Localized<string>>;
