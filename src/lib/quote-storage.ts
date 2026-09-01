import { COLORS } from "../data/configurator/colors";
import { LIMITS, ORNAMENT_GLASSES } from "../data/configurator/options";
import { calculateQuote } from "./calculateQuote";
import { SYSTEMS } from "../data/configurator/systems";
import type { QuoteItem, WindowConfig } from "../data/configurator/types";

export const QUOTE_STORAGE_KEY = "kamika-configurator-quote-v1";

const MATERIALS = new Set(["pvc", "aluminium"]);
const SASHES = new Set(["one", "two", "three", "topLight", "bottomLight"]);
const OPENINGS = new Set([
  "fixed",
  "fixedSash",
  "turnLeft",
  "turnRight",
  "tilt",
  "tiltTurnLeft",
  "tiltTurnRight",
]);
const GASKETS = new Set(["black", "grey"]);
const GLAZINGS = new Set(["double", "triple", "triplePlus"]);
const SOUND_GLASSES = new Set(["standard", "sound38", "sound42"]);
const SAFETY_GLASSES = new Set(["standard", "esg", "vsg-p2", "vsg-p4"]);
const MUNTINS = new Set(["none", "internal", "applied"]);
const SHUTTERS = new Set(["none", "topBox", "frontBox"]);
const SHUTTER_CONTROLS = new Set(["belt", "motor", "radio"]);
const HANDLES = new Set(["standard", "secustik", "lockable"]);
const SECURITY = new Set(["base", "rc1n", "rc2n"]);
const EXTRAS = new Set(["hiddenHinge", "reedContact", "trickleVent"]);
const SYSTEM_IDS = new Set(SYSTEMS.map((system) => system.id));
const COLOR_IDS = new Set(COLORS.map((colour) => colour.id));
const ORNAMENT_IDS = new Set(["none", ...ORNAMENT_GLASSES.map((glass) => glass.id)]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isStringIn = (value: unknown, values: Set<string>): value is string =>
  typeof value === "string" && values.has(value);

const isNumberBetween = (value: unknown, min: number, max: number): value is number =>
  isFiniteNumber(value) && value >= min && value <= max;

const isWindowConfig = (value: unknown): value is WindowConfig => {
  if (!isRecord(value)) return false;

  const system = SYSTEMS.find((candidate) => candidate.id === value.systemId);
  const exterior = COLORS.find((colour) => colour.id === value.exteriorColorId);
  const interior = COLORS.find((colour) => colour.id === value.interiorColorId);
  const expectedLeaves =
    value.sash === "one" ? 1 : value.sash === "three" ? 3 : value.sash ? 2 : 0;

  return (
    isStringIn(value.material, MATERIALS) &&
    isStringIn(value.systemId, SYSTEM_IDS) &&
    isStringIn(value.sash, SASHES) &&
    Array.isArray(value.leafOpenings) &&
    value.leafOpenings.length === expectedLeaves &&
    value.leafOpenings.every((opening) => isStringIn(opening, OPENINGS)) &&
    isNumberBetween(value.widthMm, LIMITS.minWidth, LIMITS.maxWidth) &&
    isNumberBetween(value.heightMm, LIMITS.minHeight, LIMITS.maxHeight) &&
    isNumberBetween(value.quantity, 1, LIMITS.maxQuantity) &&
    Number.isInteger(value.quantity) &&
    typeof value.notes === "string" &&
    isStringIn(value.exteriorColorId, COLOR_IDS) &&
    isStringIn(value.interiorColorId, COLOR_IDS) &&
    system?.material === value.material &&
    exterior?.materials.includes(value.material) === true &&
    interior?.materials.includes(value.material) === true &&
    isStringIn(value.gasket, GASKETS) &&
    isStringIn(value.glazing, GLAZINGS) &&
    isStringIn(value.soundGlass, SOUND_GLASSES) &&
    isStringIn(value.safetyGlass, SAFETY_GLASSES) &&
    isStringIn(value.ornamentGlassId, ORNAMENT_IDS) &&
    isStringIn(value.muntin, MUNTINS) &&
    isNumberBetween(value.muntinVertical, 0, 5) &&
    Number.isInteger(value.muntinVertical) &&
    isNumberBetween(value.muntinHorizontal, 0, 5) &&
    Number.isInteger(value.muntinHorizontal) &&
    isStringIn(value.shutter, SHUTTERS) &&
    isStringIn(value.shutterControl, SHUTTER_CONTROLS) &&
    typeof value.mosquito === "boolean" &&
    isStringIn(value.handle, HANDLES) &&
    isStringIn(value.security, SECURITY) &&
    Array.isArray(value.extras) &&
    value.extras.every((extra) => isStringIn(extra, EXTRAS))
  );
};

/**
 * Lee el presupuesto persistido sin confiar en datos manipulados u
 * obsoletos. Los precios siempre se recalculan con la tarifa actual.
 */
export function parseStoredQuote(raw: string | null): QuoteItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((candidate): QuoteItem[] => {
      if (!isRecord(candidate) || !isWindowConfig(candidate.config)) return [];

      const breakdown = calculateQuote(candidate.config);
      return [
        {
          id: typeof candidate.id === "string" ? candidate.id : crypto.randomUUID(),
          roomName: typeof candidate.roomName === "string" ? candidate.roomName.slice(0, 80) : undefined,
          config: candidate.config,
          unitPrice: breakdown.unitPrice,
          total: breakdown.total,
          addedAt: isFiniteNumber(candidate.addedAt) ? candidate.addedAt : Date.now(),
        },
      ];
    });
  } catch {
    return [];
  }
}
