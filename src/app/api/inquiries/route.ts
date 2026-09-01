import { COMPANY } from "../../../lib/company";
import { createQuotePdf } from "../../../lib/quote-pdf";
import { parseStoredQuote } from "../../../lib/quote-storage";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const attempts = new Map<string, { count: number; resetAt: number }>();

const text = (form: FormData, key: string, max: number) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const rateLimited = (request: Request) => {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  if (attempts.size > 1_000) {
    for (const [storedKey, attempt] of attempts) {
      if (attempt.resetAt < now) attempts.delete(storedKey);
    }
  }
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
};

export async function POST(request: Request) {
  if (rateLimited(request)) return Response.json({ error: "rate_limited" }, { status: 429 });

  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "invalid_form" }, { status: 400 });
  if (text(form, "website", 100)) return Response.json({ ok: true }); // honeypot

  const name = text(form, "name", 100);
  const email = text(form, "email", 160);
  const phone = text(form, "phone", 50);
  const postcode = text(form, "postcode", 20);
  const address = text(form, "address", 200);
  const requestedDate = text(form, "requestedDate", 40);
  const message = text(form, "message", 3000);
  const privacy = form.get("privacy") === "on";
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !phone || !privacy) {
    return Response.json({ error: "required_fields" }, { status: 400 });
  }

  const files = form.getAll("attachments").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (
    files.length > MAX_FILES ||
    files.some((file) => file.size > MAX_FILE_BYTES || !ALLOWED_TYPES.has(file.type)) ||
    files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES
  ) {
    return Response.json({ error: "invalid_attachments" }, { status: 400 });
  }

  const items = parseStoredQuote(text(form, "quote", 1_000_000));
  const requestId = `KF-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const details = [
    ["Name", name], ["E-Mail", email], ["Telefon", phone], ["PLZ", postcode],
    ["Adresse", address], ["Wunschtermin", requestedDate], ["Nachricht", message],
    ["Positionen", String(items.length)], ["Referenz", requestId],
  ].filter(([, value]) => value);
  const html = `<h1>Neue Anfrage ${escapeHtml(requestId)}</h1><dl>${details
    .map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`)
    .join("")}</dl><p>Preise werden nach technischer Prüfung erstellt.</p>`;

  const attachments = await Promise.all(files.map(async (file) => ({
    filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
    content: Buffer.from(await file.arrayBuffer()).toString("base64"),
  })));
  if (items.length > 0) {
    attachments.unshift({
      filename: `${requestId}.pdf`,
      content: Buffer.from(createQuotePdf(items, requestId)).toString("base64"),
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || COMPANY.email;
  if (!apiKey || !from) {
    console.error("Inquiry email is not configured", { requestId });
    return Response.json({ error: "email_not_configured" }, { status: 503 });
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Neue Fensteranfrage ${requestId} · ${name}`,
      html,
      attachments,
    }),
  });
  if (!sent.ok) {
    console.error("Inquiry email failed", { requestId, status: sent.status });
    return Response.json({ error: "email_failed" }, { status: 502 });
  }

  const confirmation = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: to,
      subject: `Ihre Anfrage ${requestId}`,
      html: `<p>Guten Tag ${escapeHtml(name)},</p><p>wir haben Ihre Anfrage erhalten. Ihre Referenz lautet <strong>${escapeHtml(requestId)}</strong>.</p><p>Das Kamika-Team prüft die Konfiguration und meldet sich mit einem verbindlichen Angebot.</p>`,
    }),
  });
  if (!confirmation.ok) console.error("Inquiry confirmation failed", { requestId, status: confirmation.status });

  return Response.json({ ok: true, requestId });
}
