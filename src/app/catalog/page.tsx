/**
 * /catalog — el sortiment real, con los datos copiados de Kamika.
 * Página de SERVIDOR; los textos localizados van en hojas cliente <L>
 * que reaccionan a los botoncitos DE/EN/PL del navbar.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { L } from "../../components/L";
import {
  cataloguesOrdered,
  categoriesOrdered,
  de,
  manufacturersFor,
  modelCountFor,
} from "../../lib/catalog";
import { CS } from "../../lib/catalog-strings";

export const metadata: Metadata = {
  title: "Katalog — Kristall Fenster Labor",
  description: "Real product ranges, mirrored from the Kamika catalogue data.",
};

export default function CatalogPage() {
  const categories = categoriesOrdered();
  const catalogues = cataloguesOrdered();
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
        <header className="max-w-2xl pt-10 pb-8 md:pt-14">
          <p className="kamika-eyebrow"><L t={CS.sortiment} /></p>
          <h1 className="mt-2 text-3xl md:text-4xl"><L t={CS.catalogue} /></h1>
          <p className="mt-3 text-kamika-ink/70"><L t={CS.catalogueIntro} /></p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const models = modelCountFor(category.slug);
            const systems = manufacturersFor(category.slug).reduce(
              (sum, m) => sum + m.systems.length,
              0,
            );
            return (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="group overflow-hidden rounded-kamika border border-kamika-mist bg-kamika-paper transition-shadow hover:shadow-[var(--shadow-profile)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-kamika-blue-50">
                  <Image
                    src={category.heroImage}
                    alt={de(category.name)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg"><L t={category.name} /></h2>
                    <p className="shrink-0 font-mono text-[0.72rem] text-kamika-steel">
                      {category.comingSoon ? (
                        <L t={CS.comingSoon} />
                      ) : systems > 0 || models > 0 ? (
                        <>
                          {systems > 0 && (
                            <>
                              {systems} <L t={CS.systems} />
                            </>
                          )}
                          {systems > 0 && models > 0 && " · "}
                          {models > 0 && (
                            <>
                              {models} <L t={CS.models} />
                            </>
                          )}
                        </>
                      ) : (
                        <L t={CS.overview} />
                      )}
                    </p>
                  </div>
                  <p className="mt-2 line-clamp-3 text-[0.85rem] text-kamika-ink/60">
                    <L t={category.intro} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="mt-20 border-t border-kamika-mist pt-12" aria-labelledby="catalogue-documents">
          <header className="max-w-2xl">
            <p className="kamika-eyebrow"><L t={CS.fromCatalogues} /></p>
            <h2 id="catalogue-documents" className="mt-2 text-3xl md:text-4xl">
              <L t={CS.originalCatalogues} />
            </h2>
            <p className="mt-3 text-kamika-ink/70"><L t={CS.originalCataloguesIntro} /></p>
          </header>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {catalogues.map((catalogue) => (
              <article
                key={catalogue.id}
                className="overflow-hidden rounded-kamika border border-kamika-mist bg-kamika-paper"
              >
                <div className="relative aspect-[3/4] bg-kamika-blue-50">
                  <Image
                    src={catalogue.cover}
                    alt={de(catalogue.title)}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-kamika-mist p-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-kamika-steel">
                    {[catalogue.brand, catalogue.year].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="mt-1 text-[0.9rem] font-medium leading-snug">
                    <L t={catalogue.title} />
                  </h3>
                  <p className="mt-2 text-[0.72rem] text-kamika-ink/55">
                    {catalogue.pages ? <>{catalogue.pages} <L t={CS.pages} /> · </> : null}
                    {catalogue.sizeMb ? `${catalogue.sizeMb.toLocaleString("de-DE")} MB · ` : null}
                    <L t={CS.pdfUnavailable} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
