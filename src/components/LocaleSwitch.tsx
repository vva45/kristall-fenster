"use client";

/**
 * Los botoncitos DE/EN/PL, con el estilo del LanguageSwitcher de
 * Kamika: mono pequeño, y el idioma activo como chip — aquí en el
 * azul steel de la casa (pedido del jefe: como el botón "Open
 * Configurator" de la home, no negro).
 */
import { LOCALES, LOCALE_LABEL, useLocale, type Locale } from "../lib/i18n";

export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <nav aria-label="Sprache / Language / Język" className="flex items-center gap-1">
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={LOCALE_LABEL[l]}
          lang={l}
          className={
            "rounded-kamika px-1.5 py-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase motion-safe:transition-colors " +
            (locale === l
              ? "bg-kamika-steel text-kamika-paper"
              : "text-kamika-ink/55 hover:text-kamika-ink")
          }
        >
          {l}
        </button>
      ))}
    </nav>
  );
}
