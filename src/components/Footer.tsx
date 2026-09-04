"use client";

import Link from "next/link";
import { COMPANY } from "../lib/company";
import { pick, useLocale, type Localized } from "../lib/i18n";

const TEXT = {
  lab: {
    en: "Configurator lab by",
    de: "Konfigurator-Labor von",
    pl: "Laboratorium konfiguratora firmy",
  },
  contact: { en: "Contact", de: "Kontakt", pl: "Kontakt" },
} satisfies Record<string, Localized<string>>;

export function Footer() {
  const { locale } = useLocale();
  return (
    <footer className="mt-auto border-t border-kamika-mist bg-kamika-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 text-sm md:grid-cols-3 md:px-8">
        <div><strong className="font-display text-lg">KRISTALL FENSTER</strong><p className="mt-2 text-white/60">{pick(TEXT.lab, locale)} {COMPANY.name}</p></div>
        <div><p><a href={COMPANY.phoneHref}>{COMPANY.phone}</a></p><p><a href={COMPANY.emailHref}>{COMPANY.email}</a></p></div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end" aria-label="Rechtliches">
          <Link href="/contact">{pick(TEXT.contact, locale)}</Link><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
