/** Reglas de fabricación conservadoras. La oferta final sigue sujeta a cálculo técnico. */
import type { ColorFinish, ExtraId, Glazing, Handle, LeafOpening, ProductKind, ProfileSystem, SashLayout, Security, Shutter, ShutterControl } from "./types";

export interface SystemRules {
  kind: ProductKind;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  layouts: SashLayout[];
  glazing: Glazing[];
  shutters: Shutter[];
  security: Security[];
  handles: Handle[];
  shutterControls: ShutterControl[];
  colourGroups: ColorFinish["group"][];
  extras: ExtraId[];
  minLeafWidth: number;
  maxLeafWidth: number;
}

const windowLayouts: SashLayout[] = ["one", "two", "three", "topLight", "bottomLight"];
const windowExtras: ExtraId[] = ["hiddenHinge", "reedContact", "trickleVent"];

export function rulesForSystem(system: ProfileSystem): SystemRules {
  if (system.productKind === "sliding") {
    const liftSlide = system.id.includes("hst") || system.id.includes("hs-");
    return {
      kind: "sliding", minWidth: 1500, maxWidth: liftSlide ? 6500 : 4000,
      minHeight: 1800, maxHeight: liftSlide ? 2800 : 2500,
      layouts: liftSlide ? ["slide2", "slide3", "slide4"] : ["slide2", "slide3"],
      glazing: ["triple", "triplePlus"], shutters: ["none", "frontBox"],
      security: ["base", "rc1n"], handles: ["standard", "lockable"], shutterControls: ["motor", "radio"],
      colourGroups: system.material === "pvc" ? ["ral", "sal-foil", "pvc-foil"] : ["ral", "anodised", "special"],
      extras: ["reedContact"], minLeafWidth: 700, maxLeafWidth: 3300,
    };
  }

  const deep = (system.depthMm ?? 0) >= 80;
  return {
    kind: "window", minWidth: 350, maxWidth: 2500, minHeight: 350, maxHeight: 3000,
    layouts: windowLayouts, glazing: deep ? ["double", "triple", "triplePlus"] : ["double", "triple"],
    shutters: ["none", "topBox", "frontBox"], security: ["base", "rc1n", "rc2n"],
    handles: ["standard", "secustik", "lockable"], shutterControls: ["belt", "motor", "radio"],
    colourGroups: system.material === "pvc" ? ["ral", "sal-foil", "pvc-foil"] : ["ral", "anodised", "special"],
    extras: windowExtras, minLeafWidth: 350, maxLeafWidth: system.material === "aluminium" ? 1400 : 1200,
  };
}

export const isSlidingLayout = (layout: SashLayout) => layout.startsWith("slide");

export function openingsForLayout(layout: SashLayout, index: number): LeafOpening[] {
  if (layout === "slide2") return index === 0 ? ["fixedSash", "slideRight"] : ["slideLeft", "fixedSash"];
  if (layout === "slide3") return index === 1 ? ["slideLeft", "slideRight"] : ["fixedSash", index === 0 ? "slideRight" : "slideLeft"];
  if (layout === "slide4") return index === 1 ? ["slideLeft"] : index === 2 ? ["slideRight"] : ["fixedSash"];
  return ["fixed", "fixedSash", "turnLeft", "turnRight", "tilt", "tiltTurnLeft", "tiltTurnRight"];
}

export const leafWidthsMm = (width: number, layout: SashLayout): number[] =>
  Array.from({ length: layout === "three" || layout === "slide3" ? 3 : layout === "slide4" ? 4 : layout === "one" ? 1 : 2 }, () =>
    Math.round(width / (layout === "three" || layout === "slide3" ? 3 : layout === "slide4" ? 4 : layout === "one" ? 1 : 2)),
  );
