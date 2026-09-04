import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailActions } from "../../../../../../components/catalog/DetailActions";
import { PdfStatus } from "../../../../../../components/catalog/PdfStatus";
import { L } from "../../../../../../components/L";
import { LocalizedMetadata } from "../../../../../../components/LocalizedMetadata";
import { categoriesOrdered, de, modelByPath, modelsByCollection } from "../../../../../../lib/catalog";
import { CS } from "../../../../../../lib/catalog-strings";

export function generateStaticParams() { return categoriesOrdered().flatMap((category) => modelsByCollection(category.slug).flatMap(({ catalogue, models }) => models.map((model) => ({ slug: category.slug, catalogue: catalogue.id, model: model.id })))); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string; catalogue: string; model: string }> }): Promise<Metadata> { const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && modelByPath(category.slug, p.catalogue, p.model); return { title: entry ? `${entry.model.name} — ${de(entry.catalogue.title)}` : "Modell — Kamika Bauelemente" }; }

export default async function ModelDetail({ params }: { params: Promise<{ slug: string; catalogue: string; model: string }> }) {
  const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && modelByPath(category.slug, p.catalogue, p.model); if (!category || !entry) notFound();
  const collectionTitle = entry.catalogue.collection ?? entry.catalogue.title;
  const pageTitle = {
    en: `${entry.model.name} — ${collectionTitle.en}`,
    de: `${entry.model.name} — ${collectionTitle.de ?? collectionTitle.en}`,
    pl: `${entry.model.name} — ${collectionTitle.pl ?? collectionTitle.en}`,
  };
  return <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 md:px-8 md:py-16">
    <LocalizedMetadata title={pageTitle} />
    <nav className="font-mono text-xs text-kamika-steel"><Link href="/catalog"><L t={CS.catalogue} /></Link> <span aria-hidden> / </span><Link href={`/catalog/${category.slug}?collection=${entry.catalogue.id}`}><L t={category.name} /></Link> <span aria-hidden> / </span><L t={collectionTitle} /></nav>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[520px] rounded-kamika border border-kamika-mist bg-white"><Image src={entry.model.detailImage ?? entry.model.image} alt={entry.model.name} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-contain p-5" /></div>
      <article><p className="kamika-eyebrow">{entry.catalogue.brand}{entry.catalogue.brand && " · "}<L t={collectionTitle} /></p><h1 className="mt-2 text-4xl md:text-5xl">{entry.model.name}</h1>{entry.model.family && <p className="mt-3 text-lg text-kamika-ink/60">{entry.model.family}</p>}{entry.model.description && <p className="mt-5 text-sm text-kamika-ink/70">{entry.model.description}</p>}
        {entry.model.specs.length > 0 && <dl className="mt-7 divide-y divide-kamika-mist border-y border-kamika-mist">{entry.model.specs.map((spec, index) => <div key={index} className="flex justify-between gap-6 py-3 text-sm"><dt className="text-kamika-ink/55">{spec.label || <L t={CS.feature} />}</dt><dd className="text-right">{spec.value}</dd></div>)}</dl>}
        <p className="mt-5 font-mono text-xs text-kamika-steel"><L t={CS.originalCatalogue} /> · <L t={CS.page} /> {entry.model.page}</p><div className="mt-6"><DetailActions subject={entry.model.name} /></div><div className="mt-5"><PdfStatus /></div>
      </article>
    </div>
  </main>;
}
