"use client";
import { pick, useLocale } from "../../lib/i18n";

const status = {
  title: { de: "PDF derzeit nicht verfügbar", en: "PDF currently unavailable", pl: "PDF obecnie niedostępny" },
  body: { de: "Die Produktdaten und die Original-Seitenangabe sind hier vollständig erfasst. Das Dokument wird erst verlinkt, sobald die Datei bereitsteht.", en: "The product data and original page reference are recorded here. The document will only be linked once the file is available.", pl: "Dane produktu i numer strony źródłowej są dostępne tutaj. Dokument zostanie podlinkowany, gdy plik będzie dostępny." },
};
export function PdfStatus() { const { locale } = useLocale(); return <div className="rounded-kamika border border-kamika-mist bg-kamika-blue-50 p-4"><strong className="text-sm">{pick(status.title, locale)}</strong><p className="mt-1 text-xs text-kamika-ink/60">{pick(status.body, locale)}</p></div>; }
