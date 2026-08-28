/**
 * Cálculo del precio de un elemento configurado.
 *
 * Función pura: entra un `WindowConfig`, sale el desglose. TODAS las
 * cifras vienen de data/configurator/pricing.ts — provisionales y
 * marcadas como tales allí; aquí solo vive la mecánica.
 */
import { COLORS } from "../data/configurator/colors";
import {
  BASE_PRICE,
  BICOLOR_SURCHARGE,
  COLOR_PRICE,
  EXTRA_PRICE,
  GASKET_GREY_SURCHARGE,
  GLAZING_MULTIPLIER,
  HANDLE_PRICE,
  MIN_AREA_M2,
  MOSQUITO_PRICE,
  MUNTIN_PRICE,
  OPENING_MULTIPLIER,
  ORNAMENT_GLASS_PRICE,
  OVERSIZE,
  PRICE_PER_M2,
  SAFETY_GLASS_PRICE,
  SASH_MULTIPLIER,
  SECURITY_PRICE,
  SHUTTER_CONTROL_PRICE,
  SHUTTER_PRICE,
  SOUND_GLASS_PRICE,
  SYSTEM_MULTIPLIER,
} from "../data/configurator/pricing";
import { SASH_LAYOUTS } from "../data/configurator/options";
import type { ColorFinish, Localized, WindowConfig } from "../data/configurator/types";

export interface QuoteBreakdown {
  areaM2: number;
  rows: { key: string; label: Localized<string>; amount: number }[];
  unitPrice: number;
  total: number;
}

export const colorById = (id: string): ColorFinish =>
  COLORS.find((c) => c.id === id) ?? COLORS[0];

/** Qué tarifa de color aplica a un acabado. El blanco de serie no suma. */
const colorRate = (colour: ColorFinish) => {
  if (colour.id === "ral-9016") return COLOR_PRICE.white;
  if (colour.group === "anodised") return COLOR_PRICE.anodised;
  if (colour.group === "ral" || colour.group === "special") return COLOR_PRICE.ral;
  return COLOR_PRICE.foil;
};

const round2 = (v: number) => Math.round(v * 100) / 100;

export function calculateQuote(config: WindowConfig): QuoteBreakdown {
  const areaM2 = Math.max((config.widthMm * config.heightMm) / 1_000_000, MIN_AREA_M2);

  // Sistema y apertura: base por m² con todos los multiplicadores.
  const openingAvg =
    config.leafOpenings.length === 0
      ? 1
      : config.leafOpenings.reduce((sum, o) => sum + OPENING_MULTIPLIER[o], 0) /
        config.leafOpenings.length;
  const system =
    (BASE_PRICE + areaM2 * PRICE_PER_M2) *
    (SYSTEM_MULTIPLIER[config.systemId] ?? 1) *
    SASH_MULTIPLIER[config.sash] *
    openingAvg *
    GLAZING_MULTIPLIER[config.glazing];

  // Color: exterior entero, interior con parte proporcional.
  const exterior = colorById(config.exteriorColorId);
  const interior = colorById(config.interiorColorId);
  const extRate = colorRate(exterior);
  const intRate = colorRate(interior);
  const colours =
    extRate.fixed +
    extRate.perM2 * areaM2 +
    (intRate.fixed + intRate.perM2 * areaM2) * 0.64 +
    (config.exteriorColorId !== config.interiorColorId ? BICOLOR_SURCHARGE : 0) +
    (config.gasket === "grey" ? GASKET_GREY_SURCHARGE : 0);

  // Vidrio: suplementos sobre el acristalamiento base.
  const sound = SOUND_GLASS_PRICE[config.soundGlass];
  const safety = SAFETY_GLASS_PRICE[config.safetyGlass];
  const ornament = config.ornamentGlassId === "none" ? { fixed: 0, perM2: 0 } : ORNAMENT_GLASS_PRICE;
  const glass =
    sound.fixed + sound.perM2 * areaM2 +
    safety.fixed + safety.perM2 * areaM2 +
    ornament.fixed + ornament.perM2 * areaM2;

  // Sprossen: por barra, por hoja.
  const bars = config.muntinVertical + config.muntinHorizontal;
  const muntins =
    config.muntin === "none"
      ? 0
      : bars * SASH_LAYOUTS[config.sash].panels * MUNTIN_PRICE[config.muntin].perBar;

  // Persiana.
  const shutterRate = SHUTTER_PRICE[config.shutter];
  const shutter =
    config.shutter === "none"
      ? 0
      : shutterRate.fixed +
        shutterRate.perM2 * areaM2 +
        SHUTTER_CONTROL_PRICE[config.shutterControl] +
        (config.mosquito ? MOSQUITO_PRICE.fixed + MOSQUITO_PRICE.perM2 * areaM2 : 0);

  // Extras.
  const security = SECURITY_PRICE[config.security];
  const extras =
    HANDLE_PRICE[config.handle] +
    security.fixed +
    security.perM2 * areaM2 +
    config.extras.reduce((sum, id) => sum + EXTRA_PRICE[id].fixed + EXTRA_PRICE[id].perM2 * areaM2, 0);

  // Medidas fuera de lo habitual.
  const oversize =
    (areaM2 > OVERSIZE.areaFromM2 ? (areaM2 - OVERSIZE.areaFromM2) * OVERSIZE.perExtraM2 : 0) +
    (config.heightMm > OVERSIZE.tallFromMm ? OVERSIZE.tallFixed : 0) +
    (config.widthMm > OVERSIZE.wideFromMm ? OVERSIZE.wideFixed : 0);

  const unitPrice = round2(system + colours + glass + muntins + shutter + extras + oversize);
  const total = round2(unitPrice * config.quantity);

  return {
    areaM2,
    unitPrice,
    total,
    rows: [
      { key: "system", label: { en: "System and opening", de: "System und Öffnung", pl: "System i otwieranie" }, amount: round2(system) },
      { key: "colour", label: { en: "Colour and gaskets", de: "Farbe und Dichtungen", pl: "Kolor i uszczelki" }, amount: round2(colours) },
      { key: "glass", label: { en: "Glazing", de: "Verglasung", pl: "Szklenie" }, amount: round2(glass) },
      { key: "muntins", label: { en: "Glazing bars", de: "Sprossen", pl: "Szprosy" }, amount: round2(muntins) },
      { key: "shutter", label: { en: "Roller shutter", de: "Rollladen", pl: "Roleta" }, amount: round2(shutter) },
      { key: "extras", label: { en: "Hardware and extras", de: "Beschlag und Extras", pl: "Okucia i dodatki" }, amount: round2(extras) },
      { key: "oversize", label: { en: "Special size", de: "Sondermaß", pl: "Wymiar specjalny" }, amount: round2(oversize) },
    ],
  };
}
