"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useMemo } from "react";
import type { Catalogue, CatalogueModel, Localized, Manufacturer } from "../../data/catalog/types";
import { pick, useLocale } from "../../lib/i18n";

type Props = {
  categorySlug: string;
  manufacturers: Manufacturer[];
  collections: { catalogue: Catalogue; models: CatalogueModel[] }[];
};

const text = {
  search: { de: "Systeme und Modelle suchen", en: "Search systems and models", pl: "Szukaj systemów i modeli" },
  searchHint: { de: "Name, Marke, Kollektion oder Merkmal", en: "Name, brand, collection or feature", pl: "Nazwa, marka, kolekcja lub cecha" },
  brand: { de: "Marke", en: "Brand", pl: "Marka" },
  collection: { de: "Kollektion", en: "Collection", pl: "Kolekcja" },
  all: { de: "Alle", en: "All", pl: "Wszystkie" },
  systems: { de: "Systeme", en: "Systems", pl: "Systemy" },
  models: { de: "Modelle", en: "Models", pl: "Modele" },
  results: { de: "Treffer", en: "results", pl: "wyników" },
  empty: { de: "Keine passenden Systeme oder Modelle gefunden.", en: "No matching systems or models found.", pl: "Nie znaleziono pasujących systemów ani modeli." },
  reset: { de: "Filter zurücksetzen", en: "Clear filters", pl: "Wyczyść filtry" },
  details: { de: "Details ansehen", en: "View details", pl: "Zobacz szczegóły" },
  page: { de: "Katalog S.", en: "Catalogue p.", pl: "Katalog s." },
} satisfies Record<string, Localized<string>>;

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function CatalogExplorer({ categorySlug, manufacturers, collections }: Props) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const brand = params.get("brand") ?? "";
  const collection = params.get("collection") ?? "";
  const deferredQuery = useDeferredValue(query);
  const t = useCallback((value: Localized<string>) => pick(value, locale), [locale]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const brands = [...new Set(manufacturers.map((item) => item.name))];
  const filteredManufacturers = useMemo(() => manufacturers.map((manufacturer) => ({
    ...manufacturer,
    systems: manufacturer.systems.filter((system) => {
      if (collection) return false;
      if (brand && manufacturer.name !== brand) return false;
      const haystack = [manufacturer.name, system.name, t(system.tagline), ...(system.specs ?? []).flatMap((spec) => [t(spec.label), typeof spec.value === "string" ? spec.value : t(spec.value)])].join(" ");
      return normalize(haystack).includes(normalize(deferredQuery));
    }),
  })).filter((manufacturer) => manufacturer.systems.length), [manufacturers, brand, collection, deferredQuery, t]);

  const filteredCollections = useMemo(() => collections.map((group) => ({
    ...group,
    models: group.models.filter((model) => {
      if (brand && group.catalogue.brand !== brand) return false;
      if (collection && group.catalogue.id !== collection) return false;
      const haystack = [model.name, model.family, group.catalogue.brand, t(group.catalogue.title), ...model.specs.flatMap((spec) => [spec.label, spec.value])].filter(Boolean).join(" ");
      return normalize(haystack).includes(normalize(deferredQuery));
    }),
  })).filter((group) => group.models.length), [collections, brand, collection, deferredQuery, t]);

  const count = filteredManufacturers.reduce((sum, item) => sum + item.systems.length, 0) + filteredCollections.reduce((sum, item) => sum + item.models.length, 0);

  return <>
    <section className="sticky top-0 z-20 mt-8 border-y border-kamika-mist bg-white/95 py-4 backdrop-blur" aria-label={t(text.search)}>
      <div className="grid gap-3 md:grid-cols-[minmax(240px,1fr)_220px_240px_auto]">
        <label className="relative"><span className="sr-only">{t(text.search)}</span><input type="search" value={query} onChange={(event) => update("q", event.target.value)} placeholder={t(text.searchHint)} className="w-full rounded-kamika border border-kamika-mist bg-white px-4 py-2.5" /></label>
        <label><span className="sr-only">{t(text.brand)}</span><select value={brand} onChange={(event) => update("brand", event.target.value)} className="w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2.5"><option value="">{t(text.brand)} · {t(text.all)}</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">{t(text.collection)}</span><select value={collection} onChange={(event) => update("collection", event.target.value)} className="w-full rounded-kamika border border-kamika-mist bg-white px-3 py-2.5"><option value="">{t(text.collection)} · {t(text.all)}</option>{collections.map(({ catalogue }) => <option key={catalogue.id} value={catalogue.id}>{t(catalogue.collection ?? catalogue.title)}</option>)}</select></label>
        <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="rounded-kamika border border-kamika-mist px-4 py-2 text-sm hover:border-kamika-steel">{t(text.reset)}</button>
      </div>
      <p className="mt-2 font-mono text-xs text-kamika-ink/55" aria-live="polite">{count} {t(text.results)}</p>
    </section>

    {filteredManufacturers.map((manufacturer) => <section key={manufacturer.id} id={`brand-${manufacturer.id}`} className="mt-14 scroll-mt-28">
      <header className="max-w-3xl"><p className="kamika-eyebrow">{manufacturer.name}</p><h2 className="mt-2 text-2xl md:text-3xl">{t(manufacturer.tagline)}</h2><p className="mt-3 text-sm text-kamika-ink/65">{t(manufacturer.intro)}</p></header>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{manufacturer.systems.map((system) => <Link key={system.id} href={`/catalog/${categorySlug}/system/${manufacturer.id}/${system.id}`} className="group overflow-hidden rounded-kamika border border-kamika-mist bg-white hover:shadow-[var(--shadow-profile)]"><div className="relative aspect-[16/9] bg-kamika-blue-50"><Image src={system.image} alt={`${manufacturer.name} ${system.name}`} fill sizes="(min-width:1280px) 33vw, 50vw" className="object-cover transition-transform group-hover:scale-[1.02]" /></div><div className="p-5"><h3 className="text-lg">{system.name}</h3><p className="mt-1 text-sm text-kamika-ink/60">{t(system.tagline)}</p><span className="mt-4 inline-block text-sm font-medium text-kamika-steel">{t(text.details)} →</span></div></Link>)}</div>
    </section>)}

    {filteredCollections.map(({ catalogue, models }) => <section key={catalogue.id} id={`collection-${catalogue.id}`} className="mt-14 scroll-mt-28"><header className="flex flex-wrap items-end justify-between gap-3"><div><p className="kamika-eyebrow">{[catalogue.brand, catalogue.year].filter(Boolean).join(" · ")}</p><h2 className="mt-1 text-2xl md:text-3xl">{t(catalogue.title)}</h2></div><p className="font-mono text-xs text-kamika-ink/55">{models.length} {t(text.models)}</p></header><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{models.map((model) => <Link key={model.id} href={`/catalog/${categorySlug}/model/${catalogue.id}/${model.id}`} className="group overflow-hidden rounded-kamika border border-kamika-mist bg-white hover:shadow-[var(--shadow-profile)]"><div className="relative aspect-[3/4] bg-white"><Image src={model.image} alt={model.name} fill sizes="(min-width:1280px) 20vw, 33vw" className="object-contain p-2 transition-transform group-hover:scale-[1.02]" /></div><div className="border-t border-kamika-mist p-3"><h3 className="text-sm font-medium">{model.name}</h3>{model.family && <p className="text-xs text-kamika-ink/55">{model.family}</p>}<p className="mt-2 font-mono text-[.65rem] text-kamika-steel">{t(text.page)} {model.page}</p></div></Link>)}</div></section>)}
    {count === 0 && <div className="mt-12 rounded-kamika border border-dashed border-kamika-mist py-12 text-center"><p>{t(text.empty)}</p><button type="button" onClick={() => router.replace(pathname)} className="mt-3 text-sm font-medium text-kamika-steel underline">{t(text.reset)}</button></div>}
  </>;
}
