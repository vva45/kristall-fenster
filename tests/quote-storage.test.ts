import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { parseStoredQuote, serializeStoredQuote } from "../src/lib/quote-storage";

const validItem = {
  id: "stored-item",
  roomName: "Kitchen",
  config: DEFAULT_CONFIG,
  addedAt: 123,
};

describe("parseStoredQuote", () => {
  test("tolera almacenamiento vacío, JSON dañado y formas inesperadas", () => {
    assert.deepEqual(parseStoredQuote(null), []);
    assert.deepEqual(parseStoredQuote("{"), []);
    assert.deepEqual(parseStoredQuote('{"items":[]}'), []);
    assert.deepEqual(parseStoredQuote('{"version":1,"items":[]}'), []);
  });

  test("serializa con una versión explícita", () => {
    assert.deepEqual(JSON.parse(serializeStoredQuote([validItem])), { version: 2, items: [validItem] });
  });

  test("descarta entradas inválidas sin perder las válidas", () => {
    const result = parseStoredQuote(JSON.stringify({ version: 2, items: [
      { ...validItem, config: { ...DEFAULT_CONFIG, systemId: "eliminado" } },
      validItem,
      { nope: true },
    ] }));

    assert.equal(result.length, 1);
    assert.equal(result[0].id, validItem.id);
    assert.equal(result[0].roomName, validItem.roomName);
  });


});
