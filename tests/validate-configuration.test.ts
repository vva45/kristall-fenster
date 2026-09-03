import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import type { WindowConfig } from "../src/data/configurator/types";
import { validateConfiguration } from "../src/lib/validate-configuration";

const codes = (config: WindowConfig) => validateConfiguration(config).errors.map(({ code }) => code);
const warnings = (config: WindowConfig) => validateConfiguration(config).warnings.map(({ code }) => code);

describe("validateConfiguration", () => {
  test("acepta la configuración base sin inventar una revisión específica", () => {
    assert.deepEqual(validateConfiguration(DEFAULT_CONFIG), {
      valid: true, errors: [], warnings: [], requiresTechnicalReview: false,
    });
  });

  test("valida medidas y cantidad", () => {
    assert.ok(codes({ ...DEFAULT_CONFIG, widthMm: 349 }).includes("invalid_dimensions"));
    assert.ok(codes({ ...DEFAULT_CONFIG, quantity: 1.5 }).includes("invalid_quantity"));
  });

  test("valida que sistema y colores pertenezcan al material", () => {
    const result = codes({ ...DEFAULT_CONFIG, material: "aluminium", exteriorColorId: "sal-03" });
    assert.ok(result.includes("invalid_system"));
    assert.ok(result.includes("invalid_colour"));
  });

  test("valida el número de hojas", () => {
    assert.ok(codes({ ...DEFAULT_CONFIG, sash: "two" }).includes("invalid_leaf_count"));
  });

  test("rechaza persianas fuera de rango y opciones huérfanas", () => {
    assert.ok(codes({ ...DEFAULT_CONFIG, widthMm: 500, shutter: "topBox" }).includes("invalid_shutter_size"));
    assert.ok(codes({ ...DEFAULT_CONFIG, mosquito: true }).includes("shutter_options_without_shutter"));
  });

  test("rechaza herrajes en un elemento totalmente fijo", () => {
    assert.ok(codes({ ...DEFAULT_CONFIG, leafOpenings: ["fixed"], handle: "lockable" }).includes("fixed_hardware"));
  });

  test("rechaza divisiones de barrotillos cuando no hay barrotillos", () => {
    assert.ok(codes({ ...DEFAULT_CONFIG, muntinVertical: 2 }).includes("muntin_divisions_without_muntins"));
  });

  test("marca cada condición que necesita revisión técnica", () => {
    const config: WindowConfig = {
      ...DEFAULT_CONFIG, widthMm: 2000, heightMm: 2500, soundGlass: "sound42",
      security: "rc2n", shutter: "topBox", notes: "Montaje especial",
    };
    assert.deepEqual(warnings(config), ["large_element", "special_glass", "security_package", "roller_shutter", "special_request"]);
    assert.equal(validateConfiguration(config).requiresTechnicalReview, true);
  });
});
