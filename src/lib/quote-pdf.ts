import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { COLORS } from "../data/configurator/colors";
import { systemById } from "../components/configurator/state";
import {
  EXTRAS, GASKETS, GLAZINGS, HANDLES, LEAF_OPENINGS, MATERIAL_LABEL, MUNTINS,
  ORNAMENT_GLASSES, SAFETY_GLASS, SASH_LAYOUTS, SECURITY, SHUTTERS,
  SHUTTER_CONTROLS, SOUND_GLASS,
} from "../data/configurator/options";
import type { QuoteItem } from "../data/configurator/types";
type Locale = "de" | "en" | "pl";
const pick = <T,>(value: { en: T; de?: T; pl?: T }, locale: Locale): T => value[locale] ?? value.en;

const FONT_PATH = fileURLToPath(new URL("../assets/fonts/dejavu-sans.base64", import.meta.url));
const colour = (id: string) => COLORS.find((entry) => entry.id === id) ?? COLORS[0];
const ornament = (id: string) => ORNAMENT_GLASSES.find((entry) => entry.id === id)?.name ?? id;
const yesNo = { de: ["Ja", "Nein"], en: ["Yes", "No"], pl: ["Tak", "Nie"] } as const;
const copy = {
  de: { title: "KONFIGURATIONSANFRAGE", reference: "Referenz", created: "Erstellt", notice: "Preise auf Anfrage – kein verbindliches Angebot.", item: "Konfiguriertes Fenster", material: "Rahmenmaterial", system: "Profilsystem", layout: "Aufteilung", opening: "Öffnung", size: "Maße / Menge", outside: "Farbe außen", inside: "Farbe innen", gasket: "Dichtung", glazing: "Verglasung", sound: "Schallschutz", safety: "Sicherheitsglas", ornament: "Ornamentglas", bars: "Sprossen", shutter: "Rollladen", control: "Bedienung", mosquito: "Insektenschutz", handle: "Griff", security: "Sicherheit", extras: "Extras", notes: "Hinweise", none: "Ohne", pieces: "Stk." },
  en: { title: "CONFIGURATION REQUEST", reference: "Reference", created: "Created", notice: "Price on request – not a binding quotation.", item: "Configured window", material: "Frame material", system: "Profile system", layout: "Layout", opening: "Opening", size: "Dimensions / quantity", outside: "Exterior colour", inside: "Interior colour", gasket: "Gasket", glazing: "Glazing", sound: "Sound insulation", safety: "Safety glass", ornament: "Ornament glass", bars: "Glazing bars", shutter: "Roller shutter", control: "Operation", mosquito: "Insect screen", handle: "Handle", security: "Security", extras: "Extras", notes: "Notes", none: "None", pieces: "pcs" },
  pl: { title: "ZAPYTANIE KONFIGURACYJNE", reference: "Numer referencyjny", created: "Utworzono", notice: "Cena na zapytanie – dokument nie jest wiążącą ofertą.", item: "Skonfigurowane okno", material: "Materiał ramy", system: "System profili", layout: "Układ", opening: "Otwieranie", size: "Wymiary / ilość", outside: "Kolor zewnętrzny", inside: "Kolor wewnętrzny", gasket: "Uszczelka", glazing: "Szklenie", sound: "Izolacja akustyczna", safety: "Szkło bezpieczne", ornament: "Szkło ornamentowe", bars: "Szprosy", shutter: "Roleta", control: "Sterowanie", mosquito: "Moskitiera", handle: "Klamka", security: "Bezpieczeństwo", extras: "Opcje dodatkowe", notes: "Uwagi", none: "Brak", pieces: "szt." },
} as const;

type PdfObject = Uint8Array;
const bytes = (value: string) => new TextEncoder().encode(value);
const concat = (...chunks: Uint8Array[]) => {
  const output = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
  return output;
};
const stream = (dictionary: string, data: Uint8Array) => concat(bytes(`<< ${dictionary} /Length ${data.length} >>\nstream\n`), data, bytes("\nendstream"));

function cmapGlyph(font: Uint8Array, codePoint: number): number {
  const view = new DataView(font.buffer, font.byteOffset, font.byteLength);
  const tables = view.getUint16(4);
  let cmap = 0;
  for (let i = 0; i < tables; i += 1) {
    const at = 12 + i * 16;
    if (String.fromCharCode(...font.slice(at, at + 4)) === "cmap") cmap = view.getUint32(at + 8);
  }
  const count = view.getUint16(cmap + 2);
  let best = 0;
  for (let i = 0; i < count; i += 1) {
    const at = cmap + 4 + i * 8;
    const platform = view.getUint16(at);
    const format = view.getUint16(cmap + view.getUint32(at + 4));
    if ((platform === 3 || platform === 0) && (format === 12 || (format === 4 && !best))) best = cmap + view.getUint32(at + 4);
  }
  if (view.getUint16(best) === 12) {
    const groups = view.getUint32(best + 12);
    for (let i = 0; i < groups; i += 1) {
      const at = best + 16 + i * 12;
      const start = view.getUint32(at); const end = view.getUint32(at + 4);
      if (codePoint >= start && codePoint <= end) return view.getUint32(at + 8) + codePoint - start;
    }
    return 0;
  }
  const segCount = view.getUint16(best + 6) / 2;
  const endCodes = best + 14; const startCodes = endCodes + segCount * 2 + 2;
  const deltas = startCodes + segCount * 2; const ranges = deltas + segCount * 2;
  for (let i = 0; i < segCount; i += 1) {
    const end = view.getUint16(endCodes + i * 2); const start = view.getUint16(startCodes + i * 2);
    if (codePoint < start || codePoint > end) continue;
    const delta = view.getInt16(deltas + i * 2); const range = view.getUint16(ranges + i * 2);
    if (!range) return (codePoint + delta) & 0xffff;
    const glyph = view.getUint16(ranges + i * 2 + range + (codePoint - start) * 2);
    return glyph ? (glyph + delta) & 0xffff : 0;
  }
  return 0;
}

const wrap = (value: string, limit = 82) => {
  const words = value.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = []; let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > limit && current) { lines.push(current); current = word; }
    else current = `${current} ${word}`.trim();
  }
  if (current) lines.push(current);
  return lines;
};

function itemLines(item: QuoteItem, index: number, locale: Locale): string[] {
  const t = copy[locale]; const c = item.config; const profile = systemById(c.systemId);
  const row = (label: string, value: string) => `${label}: ${value}`;
  return [
    `# ${index + 1}  ${item.roomName?.trim() || t.item}`,
    row(t.material, pick(MATERIAL_LABEL[c.material], locale)),
    row(t.system, `${profile.brand} ${profile.name}`),
    row(t.layout, pick(SASH_LAYOUTS[c.sash].label, locale)),
    row(t.opening, c.leafOpenings.map((entry) => pick(LEAF_OPENINGS[entry], locale)).join(" · ")),
    row(t.size, `${c.widthMm} × ${c.heightMm} mm · ${c.quantity} ${t.pieces}`),
    row(t.outside, `${pick(colour(c.exteriorColorId).name, locale)} (${colour(c.exteriorColorId).code})`),
    row(t.inside, `${pick(colour(c.interiorColorId).name, locale)} (${colour(c.interiorColorId).code})`),
    row(t.gasket, pick(GASKETS[c.gasket], locale)),
    row(t.glazing, pick(GLAZINGS[c.glazing].label, locale)),
    row(t.sound, pick(SOUND_GLASS[c.soundGlass], locale)),
    row(t.safety, pick(SAFETY_GLASS[c.safetyGlass], locale)),
    row(t.ornament, c.ornamentGlassId === "none" ? t.none : ornament(c.ornamentGlassId)),
    row(t.bars, `${pick(MUNTINS[c.muntin].label, locale)}${c.muntin === "none" ? "" : ` · ${c.muntinVertical} × ${c.muntinHorizontal}`}`),
    row(t.shutter, pick(SHUTTERS[c.shutter].label, locale)),
    ...(c.shutter === "none" ? [] : [row(t.control, pick(SHUTTER_CONTROLS[c.shutterControl], locale)), row(t.mosquito, yesNo[locale][c.mosquito ? 0 : 1])]),
    row(t.handle, pick(HANDLES[c.handle].label, locale)),
    row(t.security, pick(SECURITY[c.security].label, locale)),
    row(t.extras, c.extras.length ? c.extras.map((entry) => pick(EXTRAS[entry].label, locale)).join(" · ") : t.none),
    ...(c.notes.trim() ? wrap(row(t.notes, c.notes), 78) : []),
    "",
  ];
}

/** Unicode PDF request sheet containing every configured option and no provisional prices. */
export async function createQuotePdf(items: QuoteItem[], reference: string, locale: Locale = "de"): Promise<Uint8Array> {
  const encodedFont = await readFile(FONT_PATH, "utf8");
  const compressedFont = Buffer.from(encodedFont.slice(encodedFont.indexOf("\n") + 1), "base64");
  const font = new Uint8Array(gunzipSync(compressedFont));
  const t = copy[locale];
  const allLines = [`KRISTALL FENSTER · ${t.title}`, `${t.reference}: ${reference}`, `${t.created}: ${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date())}`, t.notice, "", ...items.flatMap((item, index) => itemLines(item, index, locale))];
  const pages = Array.from({ length: Math.max(1, Math.ceil(allLines.length / 45)) }, (_, index) => allLines.slice(index * 45, (index + 1) * 45));
  const mapping = new Map<number, number>();
  const encode = (text: string) => Array.from(text).map((character) => {
    const unicode = character.codePointAt(0) ?? 0; const glyph = cmapGlyph(font, unicode); mapping.set(glyph, unicode);
    return glyph.toString(16).padStart(4, "0");
  }).join("");
  const contents = pages.map((page) => bytes(["BT", "/F1 10 Tf", "46 795 Td", "16 TL", ...page.flatMap((line, lineIndex) => [lineIndex ? "T*" : "", `<${encode(line)}> Tj`]).filter(Boolean), "ET"].join("\n")));
  const unicodeHex = (unicode: number) => unicode <= 0xffff
    ? unicode.toString(16).padStart(4, "0")
    : [((unicode - 0x10000) >> 10) + 0xd800, ((unicode - 0x10000) & 0x3ff) + 0xdc00]
      .map((unit) => unit.toString(16).padStart(4, "0")).join("");
  const cmapEntries = [...mapping].map(([glyph, unicode]) =>
    `<${glyph.toString(16).padStart(4, "0")}> <${unicodeHex(unicode)}>`,
  ).join("\n");
  const cmap = bytes(`/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /KFUnicode def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n${mapping.size} beginbfchar\n${cmapEntries}\nendbfchar\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend`);
  const pageStart = 8; const objects: PdfObject[] = [
    bytes("<< /Type /Catalog /Pages 2 0 R /Lang (" + locale + ") /ViewerPreferences << /DisplayDocTitle true >> >>"),
    bytes(`<< /Type /Pages /Kids [${pages.map((_, index) => `${pageStart + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`),
    bytes("<< /Type /Font /Subtype /Type0 /BaseFont /DejaVuSans /Encoding /Identity-H /DescendantFonts [4 0 R] /ToUnicode 7 0 R >>"),
    bytes("<< /Type /Font /Subtype /CIDFontType2 /BaseFont /DejaVuSans /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor 5 0 R /CIDToGIDMap /Identity /DW 600 >>"),
    bytes("<< /Type /FontDescriptor /FontName /DejaVuSans /Flags 32 /FontBBox [-1021 -463 1793 1232] /ItalicAngle 0 /Ascent 928 /Descent -236 /CapHeight 928 /StemV 80 /FontFile2 6 0 R >>"),
    stream("/Length1 " + font.length, font), stream("", cmap),
  ];
  contents.forEach((content, index) => objects.push(
    bytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${pageStart + index * 2 + 1} 0 R >>`), stream("", content),
  ));
  const header = concat(bytes("%PDF-1.7\n%"), new Uint8Array([0xe2, 0xe3, 0xcf, 0xd3]), bytes("\n"));
  const chunks = [header]; const offsets = [0]; let offset = header.length;
  objects.forEach((object, index) => { offsets.push(offset); const wrapped = concat(bytes(`${index + 1} 0 obj\n`), object, bytes("\nendobj\n")); chunks.push(wrapped); offset += wrapped.length; });
  const xref = bytes(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((entry) => `${String(entry).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`);
  return concat(...chunks, xref);
}
