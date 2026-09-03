import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailActions } from "../../../../../../components/catalog/DetailActions";
import { PdfStatus } from "../../../../../../components/catalog/PdfStatus";
import { categoriesOrdered, de, modelByPath, modelsByCollection } from "../../../../../../lib/catalog";

export function generateStaticParams() { return categoriesOrdered().flatMap((category) => modelsByCollection(category.slug).flatMap(({ catalogue, models }) => models.map((model) => ({ slug: category.slug, catalogue: catalogue.id, model: model.id })))); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string; catalogue: string; model: string }> }): Promise<Metadata> { const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && modelByPath(category.slug, p.catalogue, p.model); return { title: entry ? `${entry.model.name} — ${de(entry.catalogue.title)}` : "Modell — Kristall Fenster" }; }

export default async function ModelDetail({ params }: { params: Promise<{ slug: string; catalogue: string; model: string }> }) {
  const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && modelByPath(category.slug, p.catalogue, p.model); if (!category || !entry) notFound();
  return <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 md:px-8 md:py-16">
    <nav className="font-mono text-xs text-kamika-steel"><Link href="/catalog">Katalog</Link> <span aria-hidden> / </span><Link href={`/catalog/${category.slug}?collection=${entry.catalogue.id}`}>{de(category.name)}</Link> <span aria-hidden> / </span>{de(entry.catalogue.collection ?? entry.catalogue.title)}</nav>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[520px] rounded-kamika border border-kamika-mist bg-white"><Image src={entry.model.detailImage ?? entry.model.image} alt={entry.model.name} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-contain p-5" /></div>
      <article><p className="kamika-eyebrow">{[entry.catalogue.brand, de(entry.catalogue.collection ?? entry.catalogue.title)].filter(Boolean).join(" · ")}</p><h1 className="mt-2 text-4xl md:text-5xl">{entry.model.name}</h1>{entry.model.family && <p className="mt-3 text-lg text-kamika-ink/60">{entry.model.family}</p>}{entry.model.description && <p className="mt-5 text-sm text-kamika-ink/70">{entry.model.description}</p>}
        {entry.model.specs.length > 0 && <dl className="mt-7 divide-y divide-kamika-mist border-y border-kamika-mist">{entry.model.specs.map((spec, index) => <div key={index} className="flex justify-between gap-6 py-3 text-sm"><dt className="text-kamika-ink/55">{spec.label || "Merkmal"}</dt><dd className="text-right">{spec.value}</dd></div>)}</dl>}
        <p className="mt-5 font-mono text-xs text-kamika-steel">Original-Katalog · Seite {entry.model.page}</p><div className="mt-6"><DetailActions subject={`${entry.model.name} · ${de(entry.catalogue.title)}`} /></div><div className="mt-5"><PdfStatus /></div>
      </article>
    </div>
  </main>;
}
