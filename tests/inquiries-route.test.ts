import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "../src/app/api/inquiries/route";

test("valida campos obligatorios antes de enviar correo", async () => {
  const response = await POST(new Request("http://localhost/api/inquiries", {
    method: "POST",
    body: new FormData(),
    headers: { "x-forwarded-for": "test-invalid" },
  }));
  assert.equal(response.status, 400);
});

test("entrega una solicitud válida al proveedor configurado", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.INQUIRY_FROM_EMAIL;
  process.env.RESEND_API_KEY = "test-key";
  process.env.INQUIRY_FROM_EMAIL = "test@example.com";
  let payload = "";
  let calls = 0;
  globalThis.fetch = async (_input, init) => {
    calls += 1;
    payload = String(init?.body);
    return new Response(JSON.stringify({ id: "mail" }), { status: 200 });
  };
  try {
    const form = new FormData();
    form.set("name", "Max Mustermann");
    form.set("email", "max@example.com");
    form.set("phone", "+49 123");
    form.set("privacy", "on");
    form.set("locale", "en");
    form.set("quote", "[]");
    const response = await POST(new Request("http://localhost/api/inquiries", {
      method: "POST",
      body: form,
      headers: { "x-forwarded-for": "test-valid" },
    }));
    assert.equal(response.status, 200);
    assert.equal(calls, 2);
    assert.match(payload, /Max Mustermann/);
    assert.match(payload, /reply_to/);
    assert.match(payload, /Your request/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.INQUIRY_FROM_EMAIL;
    else process.env.INQUIRY_FROM_EMAIL = originalFrom;
  }
});

test("rechaza adjuntos no permitidos antes de llamar al proveedor", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response(null, { status: 200 });
  };
  try {
    const form = new FormData();
    form.set("name", "Max Mustermann");
    form.set("email", "max@example.com");
    form.set("phone", "+49 123");
    form.set("privacy", "on");
    form.set("attachments", new File(["unsafe"], "script.svg", { type: "image/svg+xml" }));
    const response = await POST(new Request("http://localhost/api/inquiries", {
      method: "POST",
      body: form,
      headers: { "x-forwarded-for": "test-attachment" },
    }));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "invalid_attachments" });
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
