import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { calculateQuote } from "../src/lib/calculateQuote";

describe("calculateQuote", () => {
  test("calcula de forma determinista la configuración base", () => {
    const quote = calculateQuote(DEFAULT_CONFIG);

    assert.equal(quote.areaM2, 1.2);
    assert.equal(quote.unitPrice, 458.19);
    assert.equal(quote.total, 458.19);
    assert.equal(
      quote.rows.reduce((sum, row) => sum + row.amount, 0),
      quote.unitPrice,
    );
  });

  test("multiplica únicamente el total al cambiar la cantidad", () => {
    const quote = calculateQuote({ ...DEFAULT_CONFIG, quantity: 4 });

    assert.equal(quote.unitPrice, 458.19);
    assert.equal(quote.total, 1832.76);
  });

  test("aplica suplementos de color, vidrio, persiana y extras", () => {
    const base = calculateQuote(DEFAULT_CONFIG);
    const configured = calculateQuote({
      ...DEFAULT_CONFIG,
      exteriorColorId: "sal-03",
      interiorColorId: "ral-9016",
      soundGlass: "sound42",
      safetyGlass: "vsg-p4",
      shutter: "topBox",
      shutterControl: "radio",
      mosquito: true,
      handle: "lockable",
      security: "rc2n",
      extras: ["hiddenHinge", "reedContact", "trickleVent"],
    });

    assert.ok(configured.total > base.total);
    for (const key of ["colour", "glass", "shutter", "extras"]) {
      assert.ok(configured.rows.find((row) => row.key === key && row.amount > 0));
    }
  });

  test("cobra el área mínima y los suplementos de gran formato", () => {
    assert.equal(calculateQuote({ ...DEFAULT_CONFIG, widthMm: 300, heightMm: 300 }).areaM2, 0.5);

    const oversize = calculateQuote({ ...DEFAULT_CONFIG, widthMm: 2600, heightMm: 2600 });
    assert.ok(oversize.rows.find((row) => row.key === "oversize" && row.amount > 0));
  });
});
