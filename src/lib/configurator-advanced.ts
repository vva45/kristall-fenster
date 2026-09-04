import type { Localized, WindowConfig } from "../data/configurator/types";
import { DEFAULT_CONFIG } from "../components/configurator/state";

export type PresetId = "renovation" | "insulation" | "acoustic" | "security" | "large-openings";

export interface ConfigurationPreset {
  id: PresetId;
  name: Localized<string>;
  description: Localized<string>;
  patch: Partial<WindowConfig>;
}

export interface SavedConfiguration {
  id: string;
  name: string;
  config: WindowConfig;
  savedAt: number;
}

export const ADVANCED_STORAGE_VERSION = 1;
export const FAVORITES_STORAGE_KEY = "kamika-configurator-favorites";
export const HISTORY_STORAGE_KEY = "kamika-configurator-history";

export const PRESETS: ConfigurationPreset[] = [
  { id: "renovation", name: { en: "Renovation", de: "Sanierung", pl: "Renowacja" }, description: { en: "A versatile triple-glazed window with ventilation.", de: "Vielseitiges Dreifachglasfenster mit Lüftung.", pl: "Uniwersalne okno trzyszybowe z nawiewnikiem." }, patch: { glazing: "triple", extras: ["trickleVent"] } },
  { id: "insulation", name: { en: "Insulation", de: "Wärmeschutz", pl: "Izolacja" }, description: { en: "Enhanced glazing and insulated shutter for thermal comfort.", de: "Stärkere Verglasung und Aufsatzrollladen für Wärmekomfort.", pl: "Lepsze szklenie i roleta nadstawna dla komfortu cieplnego." }, patch: { glazing: "triplePlus", shutter: "topBox", shutterControl: "motor" } },
  { id: "acoustic", name: { en: "Acoustic", de: "Schallschutz", pl: "Akustyka" }, description: { en: "Sound-control glass for exposed rooms.", de: "Schallschutzglas für belastete Räume.", pl: "Szkło akustyczne do pomieszczeń narażonych na hałas." }, patch: { glazing: "triple", soundGlass: "sound42" } },
  { id: "security", name: { en: "Security", de: "Sicherheit", pl: "Bezpieczeństwo" }, description: { en: "RC2N hardware, laminated glass and lockable handle.", de: "RC2N-Beschlag, Verbundglas und abschließbarer Griff.", pl: "Okucia RC2N, szkło laminowane i klamka z kluczem." }, patch: { safetyGlass: "vsg-p4", security: "rc2n", handle: "lockable", extras: ["reedContact"] } },
  { id: "large-openings", name: { en: "Large openings", de: "Große Öffnungen", pl: "Duże przeszklenia" }, description: { en: "A wide sliding composition with safety glass.", de: "Breite Schiebeanlage mit Sicherheitsglas.", pl: "Szeroki układ przesuwny ze szkłem bezpiecznym." }, patch: { material: "pvc", systemId: "salamander-evolutiondrive-82-hst", sash: "slide2", leafOpenings: ["fixedSash", "slideLeft"], widthMm: 3000, heightMm: 2200, glazing: "triple", safetyGlass: "vsg-p2", shutter: "none" } },
];

export function recommendationsFor(config: WindowConfig): PresetId[] {
  const result: PresetId[] = [];
  if (config.widthMm >= 1800 || config.heightMm >= 2200 || config.sash.startsWith("slide")) result.push("large-openings");
  if (config.soundGlass === "standard") result.push("acoustic");
  if (config.security === "base") result.push("security");
  if (config.glazing !== "triplePlus") result.push("insulation");
  return result.slice(0, 3);
}

export function encodeSharedConfiguration(config: WindowConfig): string {
  const bytes = new TextEncoder().encode(JSON.stringify({ version: ADVANCED_STORAGE_VERSION, config }));
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

export function decodeSharedConfiguration(value: string | null): WindowConfig | null {
  if (!value) return null;
  try {
    const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
    const binary = atob(normalized + "=".repeat((4 - (normalized.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as { version?: unknown; config?: unknown };
    if (parsed.version !== ADVANCED_STORAGE_VERSION || !parsed.config || typeof parsed.config !== "object") return null;
    return { ...DEFAULT_CONFIG, ...(parsed.config as Partial<WindowConfig>) };
  } catch {
    return null;
  }
}

export function parseSavedConfigurations(raw: string | null): SavedConfiguration[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; items?: unknown };
    if (parsed.version !== ADVANCED_STORAGE_VERSION || !Array.isArray(parsed.items)) return [];
    return parsed.items.filter((item): item is SavedConfiguration => Boolean(item && typeof item === "object" && typeof item.id === "string" && typeof item.name === "string" && typeof item.savedAt === "number" && item.config && typeof item.config === "object")).slice(0, 20);
  } catch { return []; }
}

export function serializeSavedConfigurations(items: SavedConfiguration[]): string {
  return JSON.stringify({ version: ADVANCED_STORAGE_VERSION, items: items.slice(0, 20) });
}
