import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { createQuotePdf } from "../src/lib/quote-pdf";

const configured = { id: "one", roomName: "Kuchnia Łódź", config: { ...DEFAULT_CONFIG, notes: "Żółć i Größe" }, addedAt: 1 };

test("genera un PDF Unicode, completo y sin precios provisionales", async () => {
  const pdf = await createQuotePdf([configured], "KF-TEST", "pl");
  const content = new TextDecoder().decode(pdf);
  assert.ok(content.startsWith("%PDF-1.7"));
  assert.match(content, /\/Subtype \/Type0/);
  assert.match(content, /\/ToUnicode/);
  assert.match(content, /\/FontFile2/);
  assert.match(content, /\/Lang \(pl\)/);
  assert.doesNotMatch(content, /458\.19/);
});

test("divide solicitudes largas en varias páginas", async () => {
  const content = new TextDecoder().decode(await createQuotePdf(Array.from({ length: 20 }, (_, index) => ({ ...configured, id: String(index) })), "KF-LONG", "de"));
  const count = Number(content.match(/\/Type \/Pages \/Kids \[[^\]]+\] \/Count (\d+)/)?.[1]);
  assert.ok(count > 1);
});
