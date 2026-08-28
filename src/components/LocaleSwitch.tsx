"use client";

/**
 * Los botoncitos DE/EN/PL. Viven en la barra de navegación para que
 * el idioma valga en todo el laboratorio (catálogo, home y
 * configurador comparten el mismo contexto y se recuerda en
 * localStorage).
 */
import { LOCALES, useLocale, type Locale } from "../lib/i18n";

export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      className="flex overflow-hidden rounded-kamika border border-kamika-mist"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            "px-2.5 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors md:px-3 " +
            (locale === l
              ? "bg-kamika-ink text-kamika-paper"
              : "bg-kamika-paper text-kamika-ink/60 hover:text-kamika-ink")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
