import { createQuotePdf } from "../../../../lib/quote-pdf";
import { parseStoredQuote } from "../../../../lib/quote-storage";

export async function POST(request: Request) {
  const requestBody: unknown = await request.json().catch(() => null);
  const record = typeof requestBody === "object" && requestBody !== null ? requestBody as Record<string, unknown> : {};
  const items = parseStoredQuote(JSON.stringify(record.items ?? []));
  if (items.length === 0) return Response.json({ error: "empty_quote" }, { status: 400 });
  const reference = typeof record.reference === "string" ? record.reference.slice(0, 80) : "Online";
  const pdf = createQuotePdf(items, reference);
  const pdfBody = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
  return new Response(pdfBody, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="kristall-fenster-anfrage.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
