/**
 * Tipos del configurador. `ColorFinish` y `Material` son copias
 * literales de src/data/types.ts de kamika-bauelemente para que
 * colors.ts (copiado de allí) compile sin cambios; el resto son
 * propios del configurador.
 */
import type { Localized } from "../../lib/i18n";

export type { Localized };

export type Material = "pvc" | "aluminium" | "steel" | "wood" | "wood-alu";

export interface ColorFinish {
  id: string;
  name: Localized<string>;
  code: string; // "RAL 7016", "SAL 55"…
  hex: string;
  group:
    | "ral"
    | "wood-decor"
    | "anodised"
    | "wood-stain"
    | "lamella"
    | "sal-foil"
    | "pvc-foil"
    | "powder"
    | "glass"
    | "ceramic"
    | "liquid-metal"
    | "special";
  materials: Material[];
  image?: string;
  catalogue?: string;
}

/** Material de marco que ofrece el configurador (lo que Kamika monta). */
export type FrameMaterial = "pvc" | "aluminium";

/** Un sistema de perfil real, con specs de su ficha técnica. */
export interface ProfileSystem {
  id: string;
  material: FrameMaterial;
  brand: string; // marca real: Aluplast, Salamander, VEKA…
  name: string; // nombre del sistema tal cual la ficha
  /* Specs de la ficha técnica autoalojada en Kamika. Un sistema sin
     ficha (p. ej. REHAU Synego) va sin números y con una nota honesta
     — la regla de la casa: nada de specs de memoria. */
  depthMm?: number; // profundidad de construcción
  uw?: Localized<string>; // Uw como lo publica la ficha (con su condición)
  chambers?: Localized<string>;
  note?: Localized<string>;
  /** Only documented systems may be selected in a customer request. */
  configurable?: boolean;
}

/** Composición del elemento: cuántas hojas y cómo se reparten. */
export type SashLayout = "one" | "two" | "three" | "topLight" | "bottomLight";

/** Función de una hoja. */
export type LeafOpening =
  | "fixed"
  | "fixedSash"
  | "turnLeft"
  | "turnRight"
  | "tilt"
  | "tiltTurnLeft"
  | "tiltTurnRight";

export type Glazing = "double" | "triple" | "triplePlus";
export type SoundGlass = "standard" | "sound38" | "sound42";
export type SafetyGlass = "standard" | "esg" | "vsg-p2" | "vsg-p4";
export type Muntin = "none" | "internal" | "applied";
export type Shutter = "none" | "topBox" | "frontBox";
export type ShutterControl = "belt" | "motor" | "radio";
export type Handle = "standard" | "secustik" | "lockable";
export type Security = "base" | "rc1n" | "rc2n";
export type ExtraId = "hiddenHinge" | "reedContact" | "trickleVent";

/** El estado completo de un elemento configurado. */
export interface WindowConfig {
  material: FrameMaterial;
  systemId: string;
  sash: SashLayout;
  leafOpenings: LeafOpening[];
  widthMm: number;
  heightMm: number;
  quantity: number;
  notes: string;
  exteriorColorId: string;
  interiorColorId: string;
  gasket: "black" | "grey";
  glazing: Glazing;
  soundGlass: SoundGlass;
  safetyGlass: SafetyGlass;
  ornamentGlassId: string | "none";
  muntin: Muntin;
  muntinVertical: number;
  muntinHorizontal: number;
  shutter: Shutter;
  shutterControl: ShutterControl;
  mosquito: boolean;
  handle: Handle;
  security: Security;
  extras: ExtraId[];
}

/** Un elemento guardado en la lista de presupuesto. */
export interface QuoteItem {
  id: string;
  roomName?: string;
  config: WindowConfig;
  addedAt: number;
}
