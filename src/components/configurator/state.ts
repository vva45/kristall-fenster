/**
 * Estado del configurador: valores por defecto, reducer y reglas de
 * coherencia (lo que en el prototipo era `normalizeConditionalState`
 * repartido por el DOM, aquí es una función pura testeable).
 */
import { COLORS } from "../../data/configurator/colors";
import { LIMITS } from "../../data/configurator/options";
import { brandsForMaterial, systemById, systemsForBrand } from "../../data/configurator/systems";
import { openingsForLayout, rulesForSystem } from "../../data/configurator/rules";
import type {
  ColorFinish,
  FrameMaterial,
  LeafOpening,
  Localized,
  ProductKind,
  SashLayout,
  WindowConfig,
} from "../../data/configurator/types";
import { S } from "./strings";

export const WHITE_ID = "ral-9016";

export const leafCountFor = (sash: SashLayout): number =>
  sash === "one" ? 1 : sash === "three" || sash === "slide3" ? 3 : sash === "slide4" ? 4 : 2;

export const defaultOpeningsFor = (sash: SashLayout): LeafOpening[] => {
  switch (sash) {
    case "one":
      return ["tiltTurnRight"];
    case "two":
      return ["turnLeft", "tiltTurnRight"];
    case "three":
      return ["turnLeft", "fixedSash", "tiltTurnRight"];
    case "topLight":
      return ["tilt", "tiltTurnRight"]; // [oberlicht, hoja principal]
    case "bottomLight":
      return ["tiltTurnRight", "fixed"]; // [hoja principal, unterlicht]
    case "slide2":
      return ["fixedSash", "slideLeft"];
    case "slide3":
      return ["fixedSash", "slideLeft", "fixedSash"];
    case "slide4":
      return ["fixedSash", "slideLeft", "slideRight", "fixedSash"];
  }
};

/** Nombre de cada hoja para la UI ("Links", "Oberlicht"…). */
export const leafNameFor = (sash: SashLayout, index: number): Localized<string> => {
  if (sash === "one") return S.leafOne;
  if (sash === "topLight") return index === 0 ? S.leafTop : S.leafMain;
  if (sash === "bottomLight") return index === 0 ? S.leafMain : S.leafBottom;
  if (sash === "three") return [S.leafLeft, S.leafCentre, S.leafRight][index];
  if (sash === "slide3") return [S.leafLeft, S.leafCentre, S.leafRight][index];
  if (sash === "slide4") return [S.leafLeft, S.leafCentre, S.leafCentre, S.leafRight][index];
  return [S.leafLeft, S.leafRight][index];
};

export const DEFAULT_CONFIG: WindowConfig = {
  material: "pvc",
  systemId: "aluplast-ideal-5000",
  sash: "one",
  leafOpenings: ["tiltTurnRight"],
  widthMm: 1000,
  heightMm: 1200,
  quantity: 1,
  notes: "",
  exteriorColorId: WHITE_ID,
  interiorColorId: WHITE_ID,
  gasket: "black",
  glazing: "triple",
  soundGlass: "standard",
  safetyGlass: "standard",
  ornamentGlassId: "none",
  muntin: "none",
  muntinVertical: 1,
  muntinHorizontal: 1,
  shutter: "none",
  shutterControl: "belt",
  mosquito: false,
  handle: "standard",
  security: "base",
  extras: [],
};

export const shutterAvailable = (c: WindowConfig): boolean =>
  c.widthMm >= LIMITS.shutter.minWidth &&
  c.heightMm >= LIMITS.shutter.minHeight &&
  c.widthMm <= LIMITS.shutter.maxWidth &&
  c.heightMm <= LIMITS.shutter.maxHeight;

const isFixed = (o: LeafOpening) => o === "fixed" || o === "fixedSash";

export const fixedOnly = (c: WindowConfig): boolean => c.leafOpenings.every(isFixed);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

/** Reglas de coherencia tras cualquier cambio. */
const normalize = (c: WindowConfig): WindowConfig => {
  const next = { ...c };
  const rules = rulesForSystem(systemById(next.systemId));

  next.widthMm = clamp(next.widthMm, rules.minWidth, rules.maxWidth);
  next.heightMm = clamp(next.heightMm, rules.minHeight, rules.maxHeight);
  next.quantity = clamp(Math.round(next.quantity), 1, LIMITS.maxQuantity);
  next.muntinVertical = clamp(Math.round(next.muntinVertical), 0, 5);
  next.muntinHorizontal = clamp(Math.round(next.muntinHorizontal), 0, 5);

  // Nº de aperturas coherente con la composición.
  const count = leafCountFor(next.sash);
  if (next.leafOpenings.length !== count) {
    const defaults = defaultOpeningsFor(next.sash);
    next.leafOpenings = defaults.map((d, i) => next.leafOpenings[i] ?? d);
  }
  if (!rules.layouts.includes(next.sash)) {
    next.sash = rules.layouts[0];
    next.leafOpenings = defaultOpeningsFor(next.sash);
  } else {
    next.leafOpenings = next.leafOpenings.map((opening, index) =>
      openingsForLayout(next.sash, index).includes(opening) ? opening : defaultOpeningsFor(next.sash)[index],
    );
  }
  if (!rules.glazing.includes(next.glazing)) next.glazing = rules.glazing[0];
  if (!rules.shutters.includes(next.shutter)) next.shutter = "none";
  if (!rules.security.includes(next.security)) next.security = "base";
  if (!rules.handles.includes(next.handle)) next.handle = "standard";
  if (next.shutter !== "none" && !rules.shutterControls.includes(next.shutterControl)) next.shutterControl = rules.shutterControls[0];
  next.extras = next.extras.filter((extra) => rules.extras.includes(extra));

  // Sin hueco válido no hay persiana; sin persiana no hay mando ni mosquitera.
  if (next.shutter !== "none" && !shutterAvailable(next)) next.shutter = "none";
  if (next.shutter === "none") {
    next.shutterControl = "belt";
    next.mosquito = false;
  }

  // Todo fijo: fuera manilla, paquetes de seguridad y extras de hoja.
  if (fixedOnly(next)) {
    next.handle = "standard";
    next.security = "base";
    next.extras = next.extras.filter((e) => e === "trickleVent");
  }

  return next;
};

export type Action =
  | { type: "patch"; patch: Partial<WindowConfig> }
  | { type: "replace"; config: WindowConfig }
  | { type: "setMaterial"; material: FrameMaterial }
  | { type: "setProductKind"; productKind: ProductKind }
  | { type: "setBrand"; brand: string }
  | { type: "setSash"; sash: SashLayout }
  | { type: "setLeafOpening"; index: number; opening: LeafOpening }
  | { type: "toggleExtra"; extra: WindowConfig["extras"][number] }
  | { type: "reset" };

export function reducer(state: WindowConfig, action: Action): WindowConfig {
  switch (action.type) {
    case "replace":
      return normalize(action.config);
    case "patch":
      return normalize({ ...state, ...action.patch });
    case "setMaterial": {
      if (action.material === state.material) return state;
      const kind = systemById(state.systemId).productKind ?? "window";
      const brand = brandsForMaterial(action.material, kind)[0];
      const system = systemsForBrand(action.material, brand, kind)[0];
      // Al cambiar de material la carta de colores cambia: vuelta al blanco.
      return normalize({
        ...state,
        material: action.material,
        systemId: system.id,
        exteriorColorId: WHITE_ID,
        interiorColorId: WHITE_ID,
      });
    }
    case "setProductKind": {
      const brand = brandsForMaterial(state.material, action.productKind)[0] ?? brandsForMaterial("pvc", action.productKind)[0];
      const material = brandsForMaterial(state.material, action.productKind).length ? state.material : "pvc";
      const system = systemsForBrand(material, brand, action.productKind)[0];
      return normalize({ ...state, material, systemId: system.id, sash: rulesForSystem(system).layouts[0], leafOpenings: defaultOpeningsFor(rulesForSystem(system).layouts[0]), shutter: "none" });
    }
    case "setBrand": {
      const kind = systemById(state.systemId).productKind ?? "window";
      const system = systemsForBrand(state.material, action.brand, kind)[0];
      if (!system) return state;
      return normalize({ ...state, systemId: system.id });
    }
    case "setSash":
      return normalize({
        ...state,
        sash: action.sash,
        leafOpenings: defaultOpeningsFor(action.sash),
      });
    case "setLeafOpening": {
      const leafOpenings = state.leafOpenings.map((o, i) =>
        i === action.index ? action.opening : o,
      );
      return normalize({ ...state, leafOpenings });
    }
    case "toggleExtra": {
      const extras = state.extras.includes(action.extra)
        ? state.extras.filter((e) => e !== action.extra)
        : [...state.extras, action.extra];
      return normalize({ ...state, extras });
    }
    case "reset":
      return DEFAULT_CONFIG;
  }
}

/* ── Carta de colores por material ──────────────────────────────
   PVC: blanco de serie + folios decorativos (la carta SAL de
   Salamander y la carta PVC, medidas de los catálogos).
   Aluminio: RAL + eloxiert + especiales. */
export interface ColourGroup {
  key: "white" | "sal-foil" | "pvc-foil" | "ral" | "anodised";
  label: Localized<string>;
  colours: ColorFinish[];
}

export const colourGroupsFor = (material: FrameMaterial): ColourGroup[] => {
  const white = COLORS.filter((c) => c.id === WHITE_ID);
  if (material === "pvc") {
    return [
      { key: "white", label: S.groupWhite, colours: white },
      {
        key: "sal-foil",
        label: S.groupSalFoil,
        colours: COLORS.filter((c) => c.group === "sal-foil"),
      },
      {
        key: "pvc-foil",
        label: S.groupPvcFoil,
        colours: COLORS.filter((c) => c.group === "pvc-foil"),
      },
    ];
  }
  return [
    {
      key: "ral",
      label: S.groupRal,
      colours: COLORS.filter(
        (c) => (c.group === "ral" || c.group === "special") && c.materials.includes("aluminium"),
      ),
    },
    {
      key: "anodised",
      label: S.groupAnodised,
      colours: COLORS.filter((c) => c.group === "anodised"),
    },
  ];
};

export { systemById };
