/**
 * Home del laboratorio: el hero de siempre (ya iba en clave Kamika) y
 * debajo las gamas REALES del catálogo de Kamika. Página de SERVIDOR:
 * los textos localizados se pintan con la hoja cliente <L>, que
 * reacciona a los botoncitos DE/EN/PL del navbar.
 */
import Image from "next/image";
import Link from "next/link";
import { L } from "../components/L";
import { categoriesOrdered, de, manufacturersFor, modelCountFor } from "../lib/catalog";
import { CS } from "../lib/catalog-strings";

export default function Home() {
  const categories = categoriesOrdered();
  return (
    <main className="min-h-screen bg-white text-kamika-ink">
      <section className="kamika-grid-bg border-b border-kamika-mist">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:px-8 md:py-28 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="kamika-eyebrow"><L t={CS.heroEyebrow} /></p>
            <h1 className="mt-5 max-w-5xl text-[52px] font-semibold leading-[.88] tracking-[-0.055em] sm:text-6xl md:mt-6 md:text-8xl lg:text-[108px]">
              KRISTALL <span className="block text-kamika-steel">FENSTER</span>
            </h1>
            <p className="mt-7 max-w-3xl text-[15px] leading-7 text-kamika-ink/65 md:mt-8 md:text-xl">
              <L t={CS.heroIntro} />
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:mt-10">
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-kamika-steel bg-kamika-steel px-4 py-3 text-center text-[12px] font-semibold text-white shadow-[3px_3px_0_var(--kamika-blue)] transition-all hover:-translate-y-0.5 hover:opacity-90 sm:px-6 sm:py-3.5 sm:text-base"
              >
                <L t={CS.openConfigurator} /> <span aria-hidden>→</span>
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-kamika-steel bg-white px-4 py-3 text-center text-[12px] font-semibold text-kamika-steel transition-all hover:-translate-y-0.5 hover:bg-kamika-blue-50 sm:px-6 sm:py-3.5 sm:text-base"
              >
                <L t={CS.viewCatalogue} /> <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-kamika-steel pt-7 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="kamika-eyebrow"><L t={CS.fromCatalogues} /></p>
            <div className="mt-5 grid gap-0 sm:grid-cols-2 lg:grid-cols-1">
              {[CS.stat1, CS.stat2, CS.stat3, CS.stat4].map((stat, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[34px_1fr] gap-3 border-t border-kamika-mist py-3.5 first:border-t-0 sm:first:border-t lg:first:border-t"
                >
                  <span className="font-mono text-[11px] text-kamika-steel">0{i + 1}</span>
                  <strong className="text-[13px] font-medium md:text-base"><L t={stat} /></strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="kamika-eyebrow"><L t={CS.ranges} /></p>
          <h2 className="mt-3 text-[36px] font-semibold leading-[.98] tracking-[-0.045em] md:mt-4 md:text-6xl">
            <L t={CS.rangesTitle} />
          </h2>
          <p className="mt-4 max-w-2xl text-[14px] leading-6 text-kamika-ink/60 md:mt-5 md:text-base">
            <L t={CS.rangesIntro} />
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
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
                className="group overflow-hidden rounded-kamika border border-kamika-mist bg-white shadow-[3px_3px_0_var(--kamika-mist)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-kamika-blue-50">
                  <Image
                    src={category.heroImage}
                    alt={de(category.name)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
                    <L t={category.name} />
                  </h3>
                  <p className="mt-1 font-mono text-[0.7rem] text-kamika-steel">
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
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
