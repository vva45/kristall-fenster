"use client";

/**
 * i18n de laboratorio — versión reducida del de Kamika.
 *
 * La web principal resuelve el idioma por prefijo de URL (/de /en /pl)
 * y prerenderiza cada página tres veces. Aquí NO: este repo es el
 * banco de pruebas del configurador y sus URLs (/configurator) ya las
 * conoce el dueño, así que el idioma vive en un contexto de cliente
 * con selector en vivo y se recuerda en localStorage.
 *
 * Lo que SÍ es idéntico a Kamika, a propósito: el tipo `Localized<T>`
 * (en obligatorio, de/pl opcionales con caída al inglés) y el helper
 * `pick`. Todos los datos y cadenas del configurador se escriben ya en
 * ese formato — mudarlo a Kamika será consumir el `t()`/`pick` de allí
 * sin tocar los datos.
 */
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Locale = "de" | "en" | "pl";

export const LOCALES: Locale[] = ["de", "en", "pl"];

/** El idioma por defecto: el del mercado. */
export const DEFAULT_LOCALE: Locale = "de";

export const LOCALE_LABEL: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  pl: "Polski",
};

export type Localized<T> = { en: T; de?: T; pl?: T };

/** Elige el idioma pedido con caída automática al inglés. */
export const pick = <T,>(v: Localized<T>, locale: Locale): T => v[locale] ?? v.en;

const isLocale = (value: string | null): value is Locale =>
  value !== null && (LOCALES as string[]).includes(value);

const STORAGE_KEY = "configurator-locale";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: DEFAULT_LOCALE, setLocale: () => {} });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Arranca SIEMPRE en el idioma por defecto para que servidor y
  // cliente pinten lo mismo (sin desajuste de hidratación); el idioma
  // recordado se aplica en un efecto, ya hidratados.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = locale;
    const frame = window.requestAnimationFrame(() => {
      const marker = document.querySelector<HTMLElement>("[data-localized-title]");
      const pageTitle = marker?.dataset.localizedTitle;
      const pageDescription = marker?.dataset.localizedDescription;
      if (pageTitle) document.title = pageTitle;
      if (pageDescription) {
        document.querySelector('meta[name="description"]')?.setAttribute("content", pageDescription);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [locale, pathname]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // Leer el idioma guardado DESPUÉS de hidratar es deliberado:
      // inicializarlo en useState desajustaría servidor y cliente.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* almacenamiento bloqueado: se queda el idioma por defecto */
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* sin persistencia; el cambio vale para la sesión */
    }
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/**
 * Números con el separador del idioma activo: `0,74` en de/pl,
 * `0.74` en inglés — sin tocar los datos.
 */
export const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale === "en" ? "en-GB" : locale === "pl" ? "pl-PL" : "de-DE").format(
    value,
  );

/** Euros como los imprime el mercado alemán: 1.234,56 €. */
export const formatEuro = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale === "en" ? "en-GB" : locale === "pl" ? "pl-PL" : "de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
