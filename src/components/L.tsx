"use client";

/**
 * Hoja de texto localizada: pinta un `Localized<string>` en el idioma
 * activo. Permite que las páginas del catálogo sigan siendo
 * componentes de SERVIDOR (las rejillas de 584 modelos no viajan al
 * navegador como JS) y aun así reaccionen a los botoncitos DE/EN/PL:
 * solo estas hojitas son de cliente.
 */
import { pick, useLocale } from "../lib/i18n";
import type { Localized } from "../data/catalog/types";

export function L({ t }: { t: Localized<string> }) {
  const { locale } = useLocale();
  return <>{pick(t, locale)}</>;
}
