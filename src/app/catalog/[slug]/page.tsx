import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogExplorer } from "../../../components/catalog/CatalogExplorer";
import { L } from "../../../components/L";
import { categoriesOrdered, categoryBySlug, de, manufacturersFor, modelsByCollection } from "../../../lib/catalog";
import { CS } from "../../../lib/catalog-strings";

export function generateStaticParams() { return categoriesOrdered().map((category) => ({ slug: category.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = categoryBySlug((await params).slug);
  return { title: `${category ? de(category.name) : "Katalog"} — Kristall Fenster Labor` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = categoryBySlug((await params).slug);
  if (!category) notFound();
  const manufacturers = manufacturersFor(category.slug);
  const collections = modelsByCollection(category.slug);

  return <main className="flex-1">
    <section className="relative overflow-hidden border-b border-kamika-mist bg-kamika-ink">
      <Image src={category.heroImage} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <Link href="/catalog" className="font-mono text-xs uppercase tracking-[.14em] text-white/70 hover:text-white"><L t={CS.backToCatalogue} /></Link>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-5xl"><L t={category.name} /></h1>
        <p className="mt-4 max-w-2xl text-sm text-white/85"><L t={category.intro} /></p>
      </div>
    </section>
    <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
      {category.comingSoon ? <p className="mt-10 rounded-kamika border border-kamika-mist bg-kamika-blue-50 px-4 py-3 text-sm text-kamika-ink/75"><L t={CS.comingSoonLong} /></p> : <>
        {(manufacturers.length > 0 || collections.length > 0) && <nav className="mt-8 flex flex-wrap gap-2" aria-label="Marken und Kollektionen">
          {manufacturers.map((manufacturer) => <Link key={manufacturer.id} href={`?brand=${encodeURIComponent(manufacturer.name)}#brand-${manufacturer.id}`} className="rounded-full border border-kamika-mist px-3 py-1.5 text-xs hover:border-kamika-steel">{manufacturer.name}</Link>)}
          {collections.map(({ catalogue }) => <Link key={catalogue.id} href={`?collection=${catalogue.id}#collection-${catalogue.id}`} className="rounded-full border border-kamika-mist bg-kamika-blue-50 px-3 py-1.5 text-xs hover:border-kamika-steel"><L t={catalogue.collection ?? catalogue.title} /></Link>)}
        </nav>}
        <Suspense fallback={<div className="mt-8 h-24 animate-pulse rounded-kamika bg-kamika-blue-50" />}><CatalogExplorer categorySlug={category.slug} manufacturers={manufacturers} collections={collections} /></Suspense>
        {manufacturers.length === 0 && collections.length === 0 && <p className="mt-10 rounded-kamika border border-dashed border-kamika-mist px-4 py-8 text-center text-sm text-kamika-ink/55"><L t={CS.noMaterial} /></p>}
      </>}
    </div>
  </main>;
}
