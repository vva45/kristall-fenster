import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { calculateQuote } from "../src/lib/calculateQuote";
import { parseStoredQuote } from "../src/lib/quote-storage";

const validItem = {
  id: "stored-item",
  config: DEFAULT_CONFIG,
  unitPrice: 1,
  total: 1,
  addedAt: 123,
};

describe("parseStoredQuote", () => {
  test("tolera almacenamiento vacío, JSON dañado y formas inesperadas", () => {
    assert.deepEqual(parseStoredQuote(null), []);
    assert.deepEqual(parseStoredQuote("{"), []);
    assert.deepEqual(parseStoredQuote('{"items":[]}'), []);
  });

  test("descarta entradas inválidas sin perder las válidas", () => {
    const result = parseStoredQuote(JSON.stringify([
      { ...validItem, config: { ...DEFAULT_CONFIG, systemId: "eliminado" } },
      validItem,
      { nope: true },
    ]));

    assert.equal(result.length, 1);
    assert.equal(result[0].id, validItem.id);
  });

  test("recalcula importes para no confiar en precios antiguos manipulados", () => {
    const result = parseStoredQuote(JSON.stringify([validItem]));
    const current = calculateQuote(DEFAULT_CONFIG);

    assert.equal(result[0].unitPrice, current.unitPrice);
    assert.equal(result[0].total, current.total);
  });
});
