import { colorById } from "./calculateQuote";
import { systemById } from "../components/configurator/state";
import type { QuoteItem } from "../data/configurator/types";

const ascii = (value: string) =>
  value.normalize("NFKD").replace(/[^\x20-\x7e]/g, "").replace(/[()\\]/g, "\\$&");

/** PDF mínimo y deliberadamente sin precios: sirve como ficha de solicitud. */
export function createQuotePdf(items: QuoteItem[], reference: string): Uint8Array {
  const lines = [
    "KRISTALL FENSTER - KONFIGURATIONSANFRAGE",
    `Referenz: ${reference}`,
    `Erstellt: ${new Date().toISOString().slice(0, 10)}`,
    "Preise auf Anfrage - kein verbindliches Angebot.",
    "",
    ...items.flatMap((item, index) => {
      const system = systemById(item.config.systemId);
      const exterior = colorById(item.config.exteriorColorId);
      return [
        `${index + 1}. ${item.roomName || "Konfiguriertes Fenster"}`,
        `   ${system.brand} ${system.name} | ${item.config.widthMm} x ${item.config.heightMm} mm | ${item.config.quantity} Stk.`,
        `   Aussenfarbe: ${exterior.code} | Verglasung: ${item.config.glazing}`,
        item.config.notes ? `   Hinweise: ${item.config.notes}` : "",
      ].filter(Boolean);
    }),
  ];
  const content = ["BT", "/F1 11 Tf", "50 790 Td", "14 TL"];
  for (const [index, line] of lines.entries()) {
    if (index > 0) content.push("T*");
    content.push(`(${ascii(line)}) Tj`);
  }
  content.push("ET");
  const stream = content.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}
