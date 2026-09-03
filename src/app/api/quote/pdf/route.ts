import { createQuotePdf } from "../../../../lib/quote-pdf";
import { parseStoredQuote } from "../../../../lib/quote-storage";
import type { Locale } from "../../../../lib/i18n";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 250_000;
const MAX_ITEMS = 100;
const isLocale = (value: unknown): value is Locale => value === "de" || value === "en" || value === "pl";
const error = (code: string, status: number) => Response.json({ error: code }, {
  status,
  headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

async function readLimitedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") return error("unsupported_media_type", 415);
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(declaredLength) || declaredLength > MAX_BODY_BYTES) return error("payload_too_large", 413);

  let rawBody: string | null;
  try { rawBody = await readLimitedBody(request); } catch { return error("invalid_encoding", 400); }
  if (rawBody === null) return error("payload_too_large", 413);
  let requestBody: unknown;
  try { requestBody = JSON.parse(rawBody); } catch { return error("invalid_json", 400); }
  if (typeof requestBody !== "object" || requestBody === null || Array.isArray(requestBody)) return error("invalid_payload", 400);

  const record = requestBody as Record<string, unknown>;
  if (!Array.isArray(record.items) || record.items.length === 0) return error("empty_quote", 400);
  if (record.items.length > MAX_ITEMS) return error("too_many_items", 400);
  const items = parseStoredQuote(JSON.stringify({ version: 2, items: record.items }));
  if (items.length !== record.items.length) return error("invalid_quote", 400);

  const reference = typeof record.reference === "string" ? record.reference.trim().slice(0, 80) : "Online";
  const locale: Locale = isLocale(record.locale) ? record.locale : "de";
  const pdf = await createQuotePdf(items, reference || "Online", locale);
  const body = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"kristall-fenster-anfrage.pdf\"; filename*=UTF-8''kristall-fenster-anfrage.pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Length": String(pdf.byteLength),
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
