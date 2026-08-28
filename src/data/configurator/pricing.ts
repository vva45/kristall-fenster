/**
 * ⚠️ PRECIOS PROVISIONALES — TODOS INVENTADOS A PROPÓSITO. ⚠️
 *
 * Este es EL ÚNICO archivo del configurador con cifras de dinero.
 * Son números de ejemplo para que la mecánica (desglose, totales,
 * presupuesto) se pueda probar; NO salen de ninguna tarifa real y la
 * interfaz lo dice ("Beispielpreise"). El día que Dominik pase sus
 * listas de precios y su regla de margen, se sustituyen las
 * constantes de aquí y no hay que tocar nada más.
 *
 * Estructura del cálculo (la clásica del sector):
 *   precio unidad = (base + área·tarifa_m²) · mult_sistema · mult_hojas
 *                   · mult_apertura · mult_cristal
 *                 + suplementos fijos y por área (color, vidrio
 *                   especial, sprossen, persiana, extras, medidas)
 */
import type {
  ExtraId,
  Glazing,
  LeafOpening,
  Muntin,
  SafetyGlass,
  SashLayout,
  Security,
  Shutter,
  ShutterControl,
  SoundGlass,
  Handle,
} from "./types";

/** Base por elemento y tarifa por m² (antes de multiplicadores). */
export const BASE_PRICE = 120;
export const PRICE_PER_M2 = 210;
/** Área mínima facturable, como hace el sector con ventanas pequeñas. */
export const MIN_AREA_M2 = 0.5;

/**
 * Multiplicador por sistema de perfil. Ordenado a ojo por gama
 * (profundidad/Uw) — ejemplo, igual que todo lo demás aquí.
 */
export const SYSTEM_MULTIPLIER: Record<string, number> = {
  "aluplast-ideal-5000": 1.0,
  "aluplast-ideal-neo-md": 1.12,
  "aluplast-ideal-8000": 1.22,
  "salamander-greenevolution-flex": 1.08,
  "salamander-bluevolution-82": 1.2,
  "salamander-bluevolution-92": 1.32,
  "veka-perfectline": 1.02,
  "veka-softline-76-ad": 1.1,
  "veka-softline-76-md": 1.14,
  "veka-softline-82": 1.24,
  "koemmerling-76-ad": 1.1,
  "koemmerling-76-md": 1.16,
  "koemmerling-88-md": 1.28,
  "iglo-5": 1.0,
  "iglo-energy": 1.18,
  "iglo-edge": 1.26,
  "rehau-synego": 1.18,
  "procural-aluline-pe78n": 1.9,
  "procural-aluline-pe78n-hi": 2.05,
  "procural-aluline-pe96-passive": 2.35,
};

export const SASH_MULTIPLIER: Record<SashLayout, number> = {
  one: 1,
  two: 1.32,
  three: 1.72,
  topLight: 1.24,
  bottomLight: 1.2,
};

export const OPENING_MULTIPLIER: Record<LeafOpening, number> = {
  fixed: 0.82,
  fixedSash: 0.92,
  turnLeft: 1.06,
  turnRight: 1.06,
  tilt: 1.05,
  tiltTurnLeft: 1.13,
  tiltTurnRight: 1.13,
};

export const GLAZING_MULTIPLIER: Record<Glazing, number> = {
  double: 1,
  triple: 1.09,
  triplePlus: 1.16,
};

/** Color: fijo por elemento + €/m². El blanco no suma. */
export const COLOR_PRICE: Record<string, { fixed: number; perM2: number }> = {
  white: { fixed: 0, perM2: 0 },
  foil: { fixed: 48, perM2: 14 }, // decor / foil sobre PVC
  ral: { fixed: 62, perM2: 18 }, // lacado RAL (aluminio)
  anodised: { fixed: 74, perM2: 22 },
};
/** Suplemento cuando exterior e interior van en colores distintos. */
export const BICOLOR_SURCHARGE = 24;
/** Junta gris en vez de negra. */
export const GASKET_GREY_SURCHARGE = 8;

export const SOUND_GLASS_PRICE: Record<SoundGlass, { fixed: number; perM2: number }> = {
  standard: { fixed: 0, perM2: 0 },
  sound38: { fixed: 30, perM2: 42 },
  sound42: { fixed: 44, perM2: 66 },
};

export const SAFETY_GLASS_PRICE: Record<SafetyGlass, { fixed: number; perM2: number }> = {
  standard: { fixed: 0, perM2: 0 },
  esg: { fixed: 22, perM2: 34 },
  "vsg-p2": { fixed: 30, perM2: 48 },
  "vsg-p4": { fixed: 42, perM2: 72 },
};

/** Ornamento: mismo suplemento para toda la carta WIKĘD. */
export const ORNAMENT_GLASS_PRICE = { fixed: 18, perM2: 26 };

/** Sprossen: por barra y por hoja. */
export const MUNTIN_PRICE: Record<Muntin, { perBar: number }> = {
  none: { perBar: 0 },
  internal: { perBar: 14 },
  applied: { perBar: 24 },
};

export const SHUTTER_PRICE: Record<Shutter, { fixed: number; perM2: number }> = {
  none: { fixed: 0, perM2: 0 },
  topBox: { fixed: 180, perM2: 62 },
  frontBox: { fixed: 240, perM2: 74 },
};

export const SHUTTER_CONTROL_PRICE: Record<ShutterControl, number> = {
  belt: 0,
  motor: 120,
  radio: 175,
};

export const MOSQUITO_PRICE = { fixed: 72, perM2: 14 };

export const HANDLE_PRICE: Record<Handle, number> = {
  standard: 0,
  secustik: 18,
  lockable: 32,
};

export const SECURITY_PRICE: Record<Security, { fixed: number; perM2: number }> = {
  base: { fixed: 0, perM2: 0 },
  rc1n: { fixed: 58, perM2: 12 },
  rc2n: { fixed: 128, perM2: 24 },
};

export const EXTRA_PRICE: Record<ExtraId, { fixed: number; perM2: number }> = {
  hiddenHinge: { fixed: 46, perM2: 0 },
  reedContact: { fixed: 38, perM2: 0 },
  trickleVent: { fixed: 34, perM2: 0 },
};

/** Suplementos por medidas fuera de lo habitual. */
export const OVERSIZE = {
  areaFromM2: 3.4,
  perExtraM2: 58,
  tallFromMm: 2400,
  tallFixed: 48,
  wideFromMm: 2200,
  wideFixed: 42,
};
