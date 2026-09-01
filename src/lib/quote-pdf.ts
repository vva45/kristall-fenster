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
  const pages = Array.from({ length: Math.ceil(lines.length / 48) }, (_, index) =>
    lines.slice(index * 48, (index + 1) * 48),
  );
  const pageNumbers = pages.map((_, index) => 4 + index * 2);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pageNumbers.map((page) => `${page} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  pages.forEach((pageLines, index) => {
    const contentNumber = 5 + index * 2;
    const content = ["BT", "/F1 11 Tf", "50 790 Td", "14 TL"];
    pageLines.forEach((line, lineIndex) => {
      if (lineIndex > 0) content.push("T*");
      content.push(`(${ascii(line)}) Tj`);
    });
    content.push("ET");
    const stream = content.join("\n");
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentNumber} 0 R >>`,
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    );
  });
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
