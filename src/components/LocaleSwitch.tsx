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
    // Discreto a propósito ("más fino, no tan basto"): sin caja ni
    // borde, solo el idioma activo lleva un subrayado corto.
    <div className="flex items-center gap-0.5" role="group" aria-label="Language">
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            "rounded-[2px] px-1.5 py-1 font-mono text-[0.62rem] tracking-[0.1em] uppercase transition-colors " +
            (locale === l
              ? "font-medium text-kamika-ink underline decoration-kamika-steel decoration-2 underline-offset-4"
              : "text-kamika-ink/45 hover:text-kamika-ink")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
