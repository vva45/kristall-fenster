import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_CONFIG } from "../src/components/configurator/state";
import { POST } from "../src/app/api/quote/pdf/route";

const item = { id: "one", roomName: "Kuchnia Łódź", config: { ...DEFAULT_CONFIG, notes: "Żółć, Größe & szczegóły" }, addedAt: 1 };
const request = (body: string, contentType = "application/json") => new Request("http://localhost/api/quote/pdf", { method: "POST", headers: { "content-type": contentType }, body });

test("rechaza tipos, JSON y configuraciones manipuladas", async () => {
  assert.equal((await POST(request("{}", "text/plain"))).status, 415);
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal((await POST(request(JSON.stringify({ items: [{ ...item, config: { ...DEFAULT_CONFIG, widthMm: 99999 } }] })))).status, 400);
});

test("devuelve un PDF localizado con cabeceras defensivas", async () => {
  const response = await POST(request(JSON.stringify({ items: [item], reference: "KF-ŁÓDŹ", locale: "pl" })));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/pdf");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.match(response.headers.get("content-security-policy") ?? "", /sandbox/);
  const pdf = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...pdf.slice(0, 5)], [...new TextEncoder().encode("%PDF-")]);
  assert.equal(Number(response.headers.get("content-length")), pdf.byteLength);
});
