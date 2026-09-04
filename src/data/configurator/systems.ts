/**
 * Sistemas de perfil REALES — el paso "Sistema" del configurador.
 *
 * Origen de cada número: src/data/manufacturers.ts de
 * kamika-bauelemente, que a su vez copia las fichas técnicas
 * autoalojadas allí (/pdf/windows/). Nada redactado de memoria; el Uw
 * lleva su condición entre paréntesis porque sin ella el número
 * engaña. Un sistema sin ficha (REHAU Synego) va sin specs y con nota.
 *
 * Marcas: solo las que Kamika monta de verdad. Ni Schüco, ni Gealan,
 * ni Drutex — ésas eran del prototipo y no tocan.
 */
import type { ProfileSystem } from "./types";

export const SYSTEMS: ProfileSystem[] = [
  // ── Aluplast (PVC) ───────────────────────────────────────────
  {
    id: "aluplast-ideal-5000",
    material: "pvc",
    brand: "Aluplast",
    name: "Ideal 5000",
    depthMm: 70,
    uw: { en: "0.94 (Ug 0.7, warm edge)", de: "0,94 (Ug 0,7, warme Kante)", pl: "0,94 (Ug 0,7, ciepła ramka)" },
    chambers: { en: "5" },
  },
  {
    id: "aluplast-ideal-neo-md",
    material: "pvc",
    brand: "Aluplast",
    name: "Ideal Neo MD",
    depthMm: 76,
    uw: { en: "0.76 (reference window)", de: "0,76 (Referenzfenster)", pl: "0,76 (okno referencyjne)" },
    chambers: { en: "6" },
  },
  {
    id: "aluplast-ideal-8000",
    material: "pvc",
    brand: "Aluplast",
    name: "Ideal 8000",
    depthMm: 85,
    uw: { en: "0.74 (Ug 0.5, warm edge)", de: "0,74 (Ug 0,5, warme Kante)", pl: "0,74 (Ug 0,5, ciepła ramka)" },
    chambers: { en: "6" },
  },

  // ── Salamander (PVC) ─────────────────────────────────────────
  {
    id: "salamander-greenevolution-flex",
    material: "pvc",
    brand: "Salamander",
    name: "greenEvolution Flex",
    depthMm: 76,
    uw: { en: "0.77–1.20", de: "0,77–1,20", pl: "0,77–1,20" },
    chambers: { en: "5–6 / 5 (frame / sash)", de: "5–6 / 5 (Rahmen / Flügel)", pl: "5–6 / 5 (rama / skrzydło)" },
  },
  {
    id: "salamander-bluevolution-82",
    material: "pvc",
    brand: "Salamander",
    name: "bluEvolution 82",
    depthMm: 82,
    uw: { en: "0.74 (Ug 0.5, warm edge)", de: "0,74 (Ug 0,5, warme Kante)", pl: "0,74 (Ug 0,5, ciepła ramka)" },
    chambers: { en: "6" },
  },
  {
    id: "salamander-bluevolution-92",
    material: "pvc",
    brand: "Salamander",
    name: "bluEvolution 92",
    depthMm: 92,
    uw: { en: "0.73–1.1", de: "0,73–1,1", pl: "0,73–1,1" },
    chambers: { en: "6 / 6 (frame / sash)", de: "6 / 6 (Rahmen / Flügel)", pl: "6 / 6 (rama / skrzydło)" },
  },

  // ── VEKA (PVC) ───────────────────────────────────────────────
  {
    id: "veka-perfectline",
    material: "pvc",
    brand: "VEKA",
    name: "Perfectline",
    depthMm: 70,
    uw: { en: "0.98 (reference window)", de: "0,98 (Referenzfenster)", pl: "0,98 (okno referencyjne)" },
    chambers: { en: "5 / 5 (frame / sash)", de: "5 / 5 (Rahmen / Flügel)", pl: "5 / 5 (rama / skrzydło)" },
  },
  {
    id: "veka-softline-76-ad",
    material: "pvc",
    brand: "VEKA",
    name: "Softline 76 AD",
    depthMm: 76,
    uw: { en: "0.82 (reference window)", de: "0,82 (Referenzfenster)", pl: "0,82 (okno referencyjne)" },
    chambers: { en: "5 / 5 (frame / sash)", de: "5 / 5 (Rahmen / Flügel)", pl: "5 / 5 (rama / skrzydło)" },
  },
  {
    id: "veka-softline-76-md",
    material: "pvc",
    brand: "VEKA",
    name: "Softline 76 MD",
    depthMm: 76,
    uw: { en: "0.79 (reference window)", de: "0,79 (Referenzfenster)", pl: "0,79 (okno referencyjne)" },
    chambers: { en: "5 / 5 (frame / sash)", de: "5 / 5 (Rahmen / Flügel)", pl: "5 / 5 (rama / skrzydło)" },
  },
  {
    id: "veka-softline-82",
    material: "pvc",
    brand: "VEKA",
    name: "Softline 82",
    depthMm: 82,
    uw: { en: "0.76 (reference window)", de: "0,76 (Referenzfenster)", pl: "0,76 (okno referencyjne)" },
    chambers: { en: "7 / 6 (frame / sash)", de: "7 / 6 (Rahmen / Flügel)", pl: "7 / 6 (rama / skrzydło)" },
  },

  // ── Kömmerling (PVC) ─────────────────────────────────────────
  {
    id: "koemmerling-76-ad",
    material: "pvc",
    brand: "Kömmerling",
    name: "Kömmerling 76 AD",
    depthMm: 76,
    uw: { en: "0.81 (reference window)", de: "0,81 (Referenzfenster)", pl: "0,81 (okno referencyjne)" },
    chambers: { en: "5" },
  },
  {
    id: "koemmerling-76-md",
    material: "pvc",
    brand: "Kömmerling",
    name: "Kömmerling 76 MD",
    depthMm: 76,
    uw: { en: "0.78 (reference window)", de: "0,78 (Referenzfenster)", pl: "0,78 (okno referencyjne)" },
    chambers: { en: "6" },
  },
  {
    id: "koemmerling-88-md",
    material: "pvc",
    brand: "Kömmerling",
    name: "Kömmerling 88 MD",
    depthMm: 88,
    uw: { en: "0.74 (reference window)", de: "0,74 (Referenzfenster)", pl: "0,74 (okno referencyjne)" },
    chambers: { en: "7" },
  },

  // ── IGLO (PVC) ───────────────────────────────────────────────
  {
    id: "iglo-5",
    material: "pvc",
    brand: "IGLO",
    name: "Iglo 5",
    depthMm: 70,
    uw: { en: "0.83 (reference window)", de: "0,83 (Referenzfenster)", pl: "0,83 (okno referencyjne)" },
    chambers: { en: "5" },
  },
  {
    id: "iglo-energy",
    material: "pvc",
    brand: "IGLO",
    name: "Iglo Energy",
    depthMm: 82,
    uw: { en: "0.71", de: "0,71", pl: "0,71" },
    chambers: { en: "7" },
  },
  {
    id: "iglo-edge",
    material: "pvc",
    brand: "IGLO",
    name: "Iglo Edge",
    depthMm: 82,
    uw: { en: "0.66 (reference window)", de: "0,66 (Referenzfenster)", pl: "0,66 (okno referencyjne)" },
    chambers: { en: "7" },
  },

  // ── REHAU (PVC) — sin ficha todavía, sin números ─────────────
  {
    id: "rehau-synego",
    material: "pvc",
    brand: "REHAU",
    name: "Synego",
    configurable: false,
    note: {
      en: "Technical sheet on its way from the supplier — specs follow.",
      de: "Technisches Datenblatt ist beim Lieferanten angefragt — Werte folgen.",
      pl: "Karta techniczna w drodze od dostawcy — dane wkrótce.",
    },
  },

  // ── PROCURAL (aluminio) ──────────────────────────────────────
  {
    id: "procural-aluline-pe78n",
    material: "aluminium",
    brand: "PROCURAL",
    name: "Aluline PE78N",
    depthMm: 78,
    uw: { en: "0.88 (reference window)", de: "0,88 (Referenzfenster)", pl: "0,88 (okno referencyjne)" },
    note: { en: "Frame 78 / sash 86 mm, 42 mm thermal break", de: "Rahmen 78 / Flügel 86 mm, 42 mm thermische Trennung", pl: "Rama 78 / skrzydło 86 mm, przekładka 42 mm" },
  },
  {
    id: "procural-aluline-pe78n-hi",
    material: "aluminium",
    brand: "PROCURAL",
    name: "Aluline PE78N HI",
    depthMm: 78,
    uw: { en: "0.74 (reference window)", de: "0,74 (Referenzfenster)", pl: "0,74 (okno referencyjne)" },
    note: { en: "Frame 78 / sash 86 mm, 42 mm thermal break", de: "Rahmen 78 / Flügel 86 mm, 42 mm thermische Trennung", pl: "Rama 78 / skrzydło 86 mm, przekładka 42 mm" },
  },
  {
    id: "procural-aluline-pe96-passive",
    material: "aluminium",
    brand: "PROCURAL",
    name: "Aluline PE96 Passive",
    depthMm: 96,
    uw: { en: "0.66 (reference window)", de: "0,66 (Referenzfenster)", pl: "0,66 (okno referencyjne)" },
    note: { en: "Frame 96 / sash 106 mm, 62 mm thermal break", de: "Rahmen 96 / Flügel 106 mm, 62 mm thermische Trennung", pl: "Rama 96 / skrzydło 106 mm, przekładka 62 mm" },
  },
  // ── Correderas: configurador propio dentro del flujo común ───
  { id: "salamander-evolutiondrive-plus", material: "pvc", brand: "Salamander", name: "evolutionDrive Plus+", productKind: "sliding", depthMm: 152, note: { en: "Sliding patio system", de: "Schiebetürsystem", pl: "System drzwi przesuwnych" } },
  { id: "salamander-evolutiondrive-82-hst", material: "pvc", brand: "Salamander", name: "evolutionDrive 82 HST", productKind: "sliding", depthMm: 194, note: { en: "Lift-and-slide system", de: "Hebeschiebetürsystem", pl: "System podnoszono-przesuwny" } },
  { id: "procural-alu-slide-sl1600tt-hi", material: "aluminium", brand: "PROCURAL", name: "Alu Slide SL1600TT HI", productKind: "sliding", depthMm: 160, note: { en: "Lift-and-slide, two or three tracks", de: "Hebeschiebe, zwei oder drei Schienen", pl: "Podnoszono-przesuwne, dwie lub trzy szyny" } },
];

export const systemById = (id: string): ProfileSystem =>
  SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];

/** Marcas disponibles para un material, en el orden del array. */
export const brandsForMaterial = (material: string, kind: "window" | "sliding" = "window"): string[] => {
  const seen: string[] = [];
  for (const s of SYSTEMS) {
    if (s.material === material && (s.productKind ?? "window") === kind && s.configurable !== false && !seen.includes(s.brand)) seen.push(s.brand);
  }
  return seen;
};

export const systemsForBrand = (material: string, brand: string, kind: "window" | "sliding" = "window"): ProfileSystem[] =>
  SYSTEMS.filter((s) => s.material === material && (s.productKind ?? "window") === kind && s.brand === brand && s.configurable !== false);
