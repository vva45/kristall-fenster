"use client";
import Link from "next/link";
import { useLocale, pick } from "../../lib/i18n";

const labels = {
  configure: { de: "Im Konfigurator öffnen", en: "Open in configurator", pl: "Otwórz w konfiguratorze" },
  inquire: { de: "Dieses Modell anfragen", en: "Enquire about this model", pl: "Zapytaj o ten model" },
};

export function DetailActions({ systemId, subject }: { systemId?: string; subject: string }) {
  const { locale } = useLocale();
  const label = systemId ? pick(labels.configure, locale) : pick(labels.inquire, locale);
  const href = systemId ? `/configurator?system=${encodeURIComponent(systemId)}` : `/contact?product=${encodeURIComponent(subject)}`;
  return <Link href={href} className="inline-flex rounded-kamika bg-kamika-ink px-5 py-3 font-medium text-white hover:bg-kamika-steel">{label} →</Link>;
}
