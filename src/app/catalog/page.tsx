/**
 * /catalog — el sortiment real, con los datos copiados de Kamika.
 * Sustituye al catálogo inventado del prototipo (Schüco, Gealan,
 * precios "desde 299 €"… nada de eso existía). Solo en alemán: la
 * versión trilingüe vive en la web principal.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categoriesOrdered, de, manufacturersFor, modelCountFor } from "../../lib/catalog";

export const metadata: Metadata = {
  title: "Katalog — Kristall Fenster Labor",
  description: "Real product ranges, mirrored from the Kamika catalogue data.",
};

export default function CatalogPage() {
  const categories = categoriesOrdered();
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
        <header className="max-w-2xl pt-10 pb-8 md:pt-14">
          <p className="kamika-eyebrow">Sortiment</p>
          <h1 className="mt-2 text-3xl md:text-4xl">Katalog</h1>
          <p className="mt-3 text-kamika-ink/70">
            Acht Produktbereiche mit echten Systemen, echten Modellen und den
            Daten aus den Original-Katalogen.
          </p>
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
                    <h2 className="text-lg">{de(category.name)}</h2>
                    <p className="shrink-0 font-mono text-[0.72rem] text-kamika-steel">
                      {category.comingSoon
                        ? "in Vorbereitung"
                        : [
                            systems > 0 ? `${systems} Systeme` : null,
                            models > 0 ? `${models} Modelle` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ") || "Übersicht"}
                    </p>
                  </div>
                  <p className="mt-2 line-clamp-3 text-[0.85rem] text-kamika-ink/60">
                    {de(category.intro)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
