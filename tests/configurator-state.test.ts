import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  DEFAULT_CONFIG,
  defaultOpeningsFor,
  reducer,
  shutterAvailable,
} from "../src/components/configurator/state";

describe("configurator reducer", () => {
  test("limita medidas, cantidad y barrotillos", () => {
    const result = reducer(DEFAULT_CONFIG, {
      type: "patch",
      patch: {
        widthMm: -1,
        heightMm: 99_999,
        quantity: 999,
        muntinVertical: -2,
        muntinHorizontal: 99,
      },
    });

    assert.deepEqual(
      [result.widthMm, result.heightMm, result.quantity, result.muntinVertical, result.muntinHorizontal],
      [350, 3000, 99, 0, 5],
    );
  });

  test("cambia composición y aperturas como una unidad coherente", () => {
    const result = reducer(DEFAULT_CONFIG, { type: "setSash", sash: "three" });

    assert.deepEqual(result.leafOpenings, defaultOpeningsFor("three"));
  });

  test("recupera una configuración completa al editar una posición", () => {
    const stored = { ...DEFAULT_CONFIG, widthMm: 1450, notes: "Cocina" };
    assert.deepEqual(reducer(DEFAULT_CONFIG, { type: "replace", config: stored }), stored);
  });

  test("elimina accesorios de hoja cuando todas las hojas son fijas", () => {
    const configured = {
      ...DEFAULT_CONFIG,
      handle: "lockable" as const,
      security: "rc2n" as const,
      extras: ["hiddenHinge", "reedContact", "trickleVent"] as (
        | "hiddenHinge"
        | "reedContact"
        | "trickleVent"
      )[],
    };
    const result = reducer(configured, {
      type: "setLeafOpening",
      index: 0,
      opening: "fixed",
    });

    assert.equal(result.handle, "standard");
    assert.equal(result.security, "base");
    assert.deepEqual(result.extras, ["trickleVent"]);
  });

  test("retira una persiana que queda fuera de sus límites", () => {
    const withShutter = reducer(DEFAULT_CONFIG, {
      type: "patch",
      patch: { shutter: "topBox", shutterControl: "radio", mosquito: true },
    });
    const result = reducer(withShutter, { type: "patch", patch: { widthMm: 300 } });

    assert.equal(shutterAvailable(result), false);
    assert.equal(result.shutter, "none");
    assert.equal(result.shutterControl, "belt");
    assert.equal(result.mosquito, false);
  });

  test("cambia a un sistema válido y reinicia colores al cambiar material", () => {
    const coloured = {
      ...DEFAULT_CONFIG,
      exteriorColorId: "sal-03",
      interiorColorId: "sal-06",
    };
    const result = reducer(coloured, { type: "setMaterial", material: "aluminium" });

    assert.equal(result.material, "aluminium");
    assert.match(result.systemId, /^procural-/);
    assert.equal(result.exteriorColorId, "ral-9016");
    assert.equal(result.interiorColorId, "ral-9016");
  });

  test("no ofrece REHAU mientras Synego siga sin ficha técnica", () => {
    const result = reducer(DEFAULT_CONFIG, { type: "setBrand", brand: "REHAU" });
    assert.equal(result.systemId, DEFAULT_CONFIG.systemId);
  });

  test("separa correderas y normaliza tipología, medida y accesorios", () => {
    const result = reducer(DEFAULT_CONFIG, { type: "setProductKind", productKind: "sliding" });
    assert.match(result.systemId, /evolutiondrive/);
    assert.equal(result.sash, "slide2");
    assert.deepEqual(result.leafOpenings, ["fixedSash", "slideLeft"]);
    assert.equal(result.widthMm, 1500);
    assert.equal(result.heightMm, 1800);
    assert.equal(result.glazing, "triple");
  });
});
