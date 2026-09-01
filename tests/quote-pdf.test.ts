import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { calculateQuote } from "../src/lib/calculateQuote";
import { createQuotePdf } from "../src/lib/quote-pdf";

test("genera una ficha PDF válida y sin precios provisionales", () => {
  const quote = calculateQuote(DEFAULT_CONFIG);
  const pdf = createQuotePdf([{
    id: "one",
    roomName: "Küche",
    config: DEFAULT_CONFIG,
    unitPrice: quote.unitPrice,
    total: quote.total,
    addedAt: 1,
  }], "KF-TEST");
  const content = new TextDecoder().decode(pdf);
  assert.ok(content.startsWith("%PDF-1.4"));
  assert.match(content, /KF-TEST/);
  assert.match(content, /Preise auf Anfrage/);
  assert.doesNotMatch(content, /458\.19/);
});
