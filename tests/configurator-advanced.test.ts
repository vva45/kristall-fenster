import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import {
  decodeSharedConfiguration,
  encodeSharedConfiguration,
  parseSavedConfigurations,
  recommendationsFor,
  serializeSavedConfigurations,
} from "../src/lib/configurator-advanced";

describe("advanced configurator tools", () => {
  test("round-trips a configuration through a URL-safe payload", () => {
    const config = { ...DEFAULT_CONFIG, notes: "Küche – Süd", widthMm: 1320 };
    const encoded = encodeSharedConfiguration(config);

    assert.doesNotMatch(encoded, /[+/=]/);
    assert.deepEqual(decodeSharedConfiguration(encoded), config);
    assert.equal(decodeSharedConfiguration("not-a-configuration"), null);
  });

  test("persists a bounded, versioned configuration library", () => {
    const item = { id: "favorite-1", name: "Kitchen", config: DEFAULT_CONFIG, savedAt: 123 };
    assert.deepEqual(parseSavedConfigurations(serializeSavedConfigurations([item])), [item]);
    assert.deepEqual(parseSavedConfigurations('{"version":99,"items":[]}'), []);
  });

  test("tailors recommendations to the current element", () => {
    assert.ok(recommendationsFor(DEFAULT_CONFIG).includes("acoustic"));
    assert.equal(recommendationsFor({ ...DEFAULT_CONFIG, widthMm: 2100 })[0], "large-openings");
  });
});
