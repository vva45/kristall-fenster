/**
 * /catalog/[slug] — una gama entera, pintada desde los datos reales
 * copiados de Kamika: fabricantes con sus sistemas y specs de ficha,
 * y los modelos de cada colección con su imagen y su página del
 * catálogo original. Una sola ruta dinámica en vez de las ~30 páginas
 * escritas a mano del prototipo.
 *
 * Los PDF de los catálogos no se copiaron al laboratorio (100+ MB):
 * la referencia "Katalog S. N" es texto, sin enlace. En Kamika el
 * enlace al PDF autoalojado ya existe.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoriesOrdered,
  categoryBySlug,
  de,
  manufacturersFor,
  modelsByCollection,
} from "../../../lib/catalog";
import type { Localized } from "../../../data/catalog/types";

export function generateStaticParams() {
  return categoriesOrdered().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

const specValue = (v: string | Localized<string>): string =>
  typeof v === "string" ? v : de(v);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const category = categoryBySlug((await params).slug);
  return { title: `${category ? de(category.name) : "Katalog"} — Kristall Fenster Labor` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const category = categoryBySlug((await params).slug);
  if (!category) notFound();

  const manufacturers = manufacturersFor(category.slug);
  const collections = modelsByCollection(category.slug);

  return (
    <main className="flex-1">
      {/* Cabecera con la portada real de la gama. */}
      <section className="relative overflow-hidden border-b border-kamika-mist bg-kamika-ink">
        <Image
          src={category.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <Link
            href="/catalog"
            className="font-mono text-[0.72rem] tracking-[0.14em] text-white/70 uppercase hover:text-white"
          >
            ← Katalog
          </Link>
          <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-5xl">{de(category.name)}</h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] text-white/85">{de(category.intro)}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
        {category.comingSoon && (
          <p className="mt-10 rounded-kamika border border-kamika-mist bg-kamika-blue-50 px-4 py-3 text-[0.9rem] text-kamika-ink/75">
            Der Katalog dieser Produktlinie ist in Vorbereitung — die Übersicht folgt.
          </p>
        )}

        {/* Fabricantes y sus sistemas, con las specs de las fichas. */}
        {manufacturers.map((manufacturer) => (
          <section key={manufacturer.id} className="mt-14">
            <header className="max-w-3xl">
              <p className="kamika-eyebrow">{manufacturer.name}</p>
              <h2 className="mt-2 text-2xl md:text-3xl">{de(manufacturer.tagline)}</h2>
              <p className="mt-3 text-[0.9rem] text-kamika-ink/65">{de(manufacturer.intro)}</p>
            </header>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {manufacturer.systems.map((system) => (
                <article
                  key={system.id}
                  className="overflow-hidden rounded-kamika border border-kamika-mist bg-kamika-paper"
                >
                  <div className="relative aspect-[16/9] bg-kamika-blue-50">
                    <Image
                      src={system.image}
                      alt={`${manufacturer.name} ${system.name}`}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg">{system.name}</h3>
                    <p className="mt-1 text-[0.85rem] text-kamika-ink/60">{de(system.tagline)}</p>
                    {system.specs && system.specs.length > 0 && (
                      <dl className="mt-4 space-y-1.5 border-t border-kamika-mist pt-3 text-[0.8rem]">
                        {system.specs.slice(0, 6).map((spec, i) => (
                          <div key={i} className="flex justify-between gap-4">
                            <dt className="text-kamika-ink/55">{de(spec.label)}</dt>
                            <dd className="text-right font-mono">{specValue(spec.value)}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Modelos por colección, tal cual el catálogo original. */}
        {collections.map(({ catalogue, models }) => (
          <section key={catalogue.id} className="mt-14">
            <header className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="kamika-eyebrow">
                  {[catalogue.brand, catalogue.year].filter(Boolean).join(" · ")}
                </p>
                <h2 className="mt-1 text-2xl md:text-3xl">{de(catalogue.title)}</h2>
              </div>
              <p className="font-mono text-[0.75rem] text-kamika-ink/55">
                {models.length} Modelle
              </p>
            </header>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {models.map((model) => (
                <article
                  key={`${catalogue.id}-${model.id}`}
                  className="overflow-hidden rounded-kamika border border-kamika-mist bg-kamika-paper"
                >
                  <div className="relative aspect-[3/4] bg-white">
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="border-t border-kamika-mist p-3">
                    <h3 className="text-[0.9rem] font-medium">{model.name}</h3>
                    {model.family && (
                      <p className="text-[0.72rem] text-kamika-ink/55">{model.family}</p>
                    )}
                    {model.specs && model.specs.length > 0 && (
                      <dl className="mt-2 space-y-0.5 text-[0.7rem] text-kamika-ink/60">
                        {model.specs.slice(0, 2).map((spec, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <dt className="truncate">{specValue(spec.label)}</dt>
                            <dd className="truncate text-right">{specValue(spec.value)}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <p className="mt-2 font-mono text-[0.65rem] text-kamika-steel">
                      Katalog S. {model.page}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {!category.comingSoon && manufacturers.length === 0 && collections.length === 0 && (
          <p className="mt-10 rounded-kamika border border-dashed border-kamika-mist px-4 py-8 text-center text-[0.9rem] text-kamika-ink/55">
            Für diese Produktlinie liegt noch kein Katalogmaterial vor.
          </p>
        )}
      </div>
    </main>
  );
}
