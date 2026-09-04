"use client";

import type { Localized } from "../data/catalog/types";
import { pick, useLocale } from "../lib/i18n";

export function LocalizedMetadata({
  title,
  description,
}: {
  title: Localized<string>;
  description?: Localized<string>;
}) {
  const { locale } = useLocale();
  const pageTitle = `${pick(title, locale)} — Kamika Bauelemente`;
  const pageDescription = description ? pick(description, locale) : undefined;

  return (
    <span
      hidden
      aria-hidden="true"
      data-localized-title={pageTitle}
      data-localized-description={pageDescription}
    />
  );
}
