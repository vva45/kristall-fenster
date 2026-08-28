/**
 * Opciones del configurador con sus etiquetas en los tres idiomas.
 *
 * Todo lo nombrable aquí es real: los ornamentos de cristal son los
 * de la carta del catálogo WIKĘD PCV/ALU publicada en Kamika, los Ug
 * de los acristalamientos son los estándar que citan las propias
 * fichas de los sistemas ("Ug 1,1 doble / 0,5–0,7 triple, argón").
 * Los PRECIOS no viven aquí — están todos en pricing.ts, marcados
 * como provisionales.
 */
import type {
  ExtraId,
  Glazing,
  Handle,
  LeafOpening,
  Localized,
  Muntin,
  SafetyGlass,
  SashLayout,
  Security,
  Shutter,
  ShutterControl,
  SoundGlass,
} from "./types";

export const MATERIAL_LABEL: Record<"pvc" | "aluminium", Localized<string>> = {
  pvc: { en: "PVC", de: "Kunststoff (PVC)", pl: "PVC" },
  aluminium: { en: "Aluminium", de: "Aluminium", pl: "Aluminium" },
};

export const SASH_LAYOUTS: Record<SashLayout, { label: Localized<string>; note: Localized<string>; panels: number }> = {
  one: {
    label: { en: "1 sash", de: "1 Flügel", pl: "1 skrzydło" },
    note: { en: "Single element", de: "Einzelelement", pl: "Element pojedynczy" },
    panels: 1,
  },
  two: {
    label: { en: "2 sashes", de: "2 Flügel", pl: "2 skrzydła" },
    note: { en: "With centre mullion", de: "Mit Pfosten", pl: "Ze słupkiem" },
    panels: 2,
  },
  three: {
    label: { en: "3 sashes", de: "3 Flügel", pl: "3 skrzydła" },
    note: { en: "Wide composition", de: "Breite Aufteilung", pl: "Szeroki układ" },
    panels: 3,
  },
  topLight: {
    label: { en: "Top light", de: "Oberlicht", pl: "Naświetle górne" },
    note: { en: "Upper element", de: "Oberes Element", pl: "Element górny" },
    panels: 2,
  },
  bottomLight: {
    label: { en: "Bottom light", de: "Unterlicht", pl: "Naświetle dolne" },
    note: { en: "Lower element", de: "Unteres Element", pl: "Element dolny" },
    panels: 2,
  },
};

export const LEAF_OPENINGS: Record<LeafOpening, Localized<string>> = {
  fixed: { en: "Fixed glazing", de: "Festverglasung", pl: "Szklenie stałe" },
  fixedSash: { en: "Fixed sash", de: "Fester Flügel", pl: "Skrzydło stałe" },
  turnLeft: { en: "Turn left", de: "Dreh links", pl: "Rozwierne lewe" },
  turnRight: { en: "Turn right", de: "Dreh rechts", pl: "Rozwierne prawe" },
  tilt: { en: "Tilt only", de: "Kipp", pl: "Uchylne" },
  tiltTurnLeft: { en: "Tilt & turn left", de: "Dreh-Kipp links", pl: "Rozwierno-uchylne lewe" },
  tiltTurnRight: { en: "Tilt & turn right", de: "Dreh-Kipp rechts", pl: "Rozwierno-uchylne prawe" },
};

export const GLAZINGS: Record<Glazing, { label: Localized<string>; note: Localized<string> }> = {
  double: {
    label: { en: "Double glazing", de: "2-fach Verglasung", pl: "Szyba 2-szybowa" },
    note: { en: "Ug 1.1 W/m²K, argon", de: "Ug 1,1 W/m²K, Argon", pl: "Ug 1,1 W/m²K, argon" },
  },
  triple: {
    label: { en: "Triple glazing", de: "3-fach Verglasung", pl: "Szyba 3-szybowa" },
    note: { en: "Ug 0.7 W/m²K, argon", de: "Ug 0,7 W/m²K, Argon", pl: "Ug 0,7 W/m²K, argon" },
  },
  triplePlus: {
    label: { en: "Triple, warm edge", de: "3-fach, warme Kante", pl: "3-szybowa, ciepła ramka" },
    note: { en: "Ug 0.5 W/m²K, argon", de: "Ug 0,5 W/m²K, Argon", pl: "Ug 0,5 W/m²K, argon" },
  },
};

export const SOUND_GLASS: Record<SoundGlass, Localized<string>> = {
  standard: { en: "Standard", de: "Standard", pl: "Standard" },
  sound38: { en: "Sound insulation approx. 38 dB", de: "Schallschutz ca. 38 dB", pl: "Izolacja akustyczna ok. 38 dB" },
  sound42: { en: "Sound insulation approx. 42 dB", de: "Schallschutz ca. 42 dB", pl: "Izolacja akustyczna ok. 42 dB" },
};

export const SAFETY_GLASS: Record<SafetyGlass, Localized<string>> = {
  standard: { en: "Standard float", de: "Standard Float", pl: "Standard float" },
  esg: { en: "Toughened (ESG)", de: "Einscheibensicherheitsglas (ESG)", pl: "Szkło hartowane (ESG)" },
  "vsg-p2": { en: "Laminated VSG P2A", de: "Verbundsicherheitsglas P2A", pl: "Szkło laminowane VSG P2A" },
  "vsg-p4": { en: "Laminated VSG P4A", de: "Verbundsicherheitsglas P4A", pl: "Szkło laminowane VSG P4A" },
};

/**
 * Ornamentos REALES de la carta de cristales del catálogo WIKĘD
 * PCV/ALU (los mismos que enseña /colours en Kamika). Los nombres van
 * tal cual los imprime la carta.
 */
export const ORNAMENT_GLASSES: { id: string; name: string }[] = [
  { id: "flutes-vertical-matt", name: "Flutes, vertical matt" },
  { id: "kathedral", name: "Kathedral" },
  { id: "altdeutsh", name: "Altdeutsh" },
  { id: "matt", name: "Matt" },
  { id: "abstracto", name: "Abstracto" },
  { id: "delta", name: "Delta" },
  { id: "delta-mat", name: "Delta Mat" },
  { id: "atlantic", name: "Atlantic" },
];

export const MUNTINS: Record<Muntin, { label: Localized<string>; note: Localized<string> }> = {
  none: {
    label: { en: "None", de: "Ohne", pl: "Bez" },
    note: { en: "Clear glass", de: "Glatte Scheibe", pl: "Czysta szyba" },
  },
  internal: {
    label: { en: "Between the panes", de: "Im Scheibenzwischenraum", pl: "Międzyszybowe" },
    note: { en: "Easy to clean", de: "Pflegeleicht", pl: "Łatwe w czyszczeniu" },
  },
  applied: {
    label: { en: "Applied (Wiener Sprossen)", de: "Aufgesetzt (Wiener Sprossen)", pl: "Naklejane (wiedeńskie)" },
    note: { en: "Classic look", de: "Klassische Optik", pl: "Klasyczny wygląd" },
  },
};

export const SHUTTERS: Record<Shutter, { label: Localized<string>; note: Localized<string> }> = {
  none: {
    label: { en: "None", de: "Ohne", pl: "Bez" },
    note: { en: "Window only", de: "Nur Fenster", pl: "Samo okno" },
  },
  topBox: {
    label: { en: "Top-mounted roller shutter", de: "Aufsatzrollladen", pl: "Roleta nadstawna" },
    note: { en: "Box above the frame", de: "Kasten auf dem Rahmen", pl: "Skrzynka na ramie" },
  },
  frontBox: {
    label: { en: "Front-mounted roller shutter", de: "Vorbaurollladen", pl: "Roleta zewnętrzna" },
    note: { en: "Box in front of the façade", de: "Kasten vor der Fassade", pl: "Skrzynka na elewacji" },
  },
};

export const SHUTTER_CONTROLS: Record<ShutterControl, Localized<string>> = {
  belt: { en: "Belt winder", de: "Gurtwickler", pl: "Zwijacz taśmy" },
  motor: { en: "Electric motor (switch)", de: "Elektromotor (Schalter)", pl: "Silnik elektryczny (przełącznik)" },
  radio: { en: "Radio motor (remote)", de: "Funkmotor (Fernbedienung)", pl: "Silnik radiowy (pilot)" },
};

export const HANDLES: Record<Handle, { label: Localized<string>; note: Localized<string> }> = {
  standard: {
    label: { en: "Standard handle", de: "Standardgriff", pl: "Klamka standardowa" },
    note: { en: "White or silver", de: "Weiß oder Silber", pl: "Biała lub srebrna" },
  },
  secustik: {
    label: { en: "Security handle", de: "Sicherheitsgriff", pl: "Klamka z zabezpieczeniem" },
    note: { en: "Locking mechanism inside", de: "Sperrmechanik innen", pl: "Mechanizm blokujący" },
  },
  lockable: {
    label: { en: "Lockable handle", de: "Abschließbarer Griff", pl: "Klamka z kluczykiem" },
    note: { en: "With key", de: "Mit Schlüssel", pl: "Zamykana na klucz" },
  },
};

export const SECURITY: Record<Security, { label: Localized<string>; note: Localized<string> }> = {
  base: {
    label: { en: "Standard hardware", de: "Standardbeschlag", pl: "Okucie standardowe" },
    note: { en: "Basic locking points", de: "Basis-Verriegelung", pl: "Podstawowe rygle" },
  },
  rc1n: {
    label: { en: "RC 1N package", de: "RC 1N Paket", pl: "Pakiet RC 1N" },
    note: { en: "Mushroom cams all round", de: "Pilzkopfzapfen umlaufend", pl: "Grzybki obwodowo" },
  },
  rc2n: {
    label: { en: "RC 2N package", de: "RC 2N Paket", pl: "Pakiet RC 2N" },
    note: { en: "Certified burglar inhibition", de: "Geprüfter Einbruchschutz", pl: "Certyfikowana ochrona" },
  },
};

export const EXTRAS: Record<ExtraId, { label: Localized<string>; note: Localized<string> }> = {
  hiddenHinge: {
    label: { en: "Concealed hinges", de: "Verdeckte Bänder", pl: "Zawiasy ukryte" },
    note: { en: "Clean sash edge", de: "Glatte Flügelkante", pl: "Czysta krawędź" },
  },
  reedContact: {
    label: { en: "Reed contact (alarm)", de: "Reedkontakt (Alarm)", pl: "Kontaktron (alarm)" },
    note: { en: "For alarm systems", de: "Für Alarmanlagen", pl: "Do systemów alarmowych" },
  },
  trickleVent: {
    label: { en: "Trickle vent", de: "Fensterfalzlüfter", pl: "Nawiewnik" },
    note: { en: "Background ventilation", de: "Grundlüftung", pl: "Wentylacja podstawowa" },
  },
};

export const GASKETS: Record<"black" | "grey", Localized<string>> = {
  black: { en: "Black", de: "Schwarz", pl: "Czarna" },
  grey: { en: "Light grey", de: "Lichtgrau", pl: "Jasnoszara" },
};

/** Límites de fabricación mostrados en el paso de medidas. */
export const LIMITS = {
  minWidth: 350,
  maxWidth: 2500,
  minHeight: 350,
  maxHeight: 3000,
  maxQuantity: 99,
  /** Fuera de este rango no se ofrece persiana en el configurador. */
  shutter: { minWidth: 650, minHeight: 650, maxWidth: 2500, maxHeight: 2600 },
};
