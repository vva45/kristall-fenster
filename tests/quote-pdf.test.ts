import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { createQuotePdf } from "../src/lib/quote-pdf";

test("genera una ficha PDF válida y sin precios provisionales", () => {
  const pdf = createQuotePdf([{
    id: "one",
    roomName: "Küche",
    config: DEFAULT_CONFIG,
    addedAt: 1,
  }], "KF-TEST");
  const content = new TextDecoder().decode(pdf);
  assert.ok(content.startsWith("%PDF-1.4"));
  assert.match(content, /KF-TEST/);
  assert.match(content, /Preise auf Anfrage/);
  assert.doesNotMatch(content, /458\.19/);
});

test("divide presupuestos largos en varias páginas", () => {
  const item = { id: "one", config: DEFAULT_CONFIG, addedAt: 1 };
  const content = new TextDecoder().decode(createQuotePdf(
    Array.from({ length: 20 }, (_, index) => ({ ...item, id: String(index) })),
    "KF-LONG",
  ));
  assert.match(content, /\/Count 2/);
  assert.match(content, /\/Type \/Page/g);
});
