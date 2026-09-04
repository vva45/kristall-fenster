import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailActions } from "../../../../../../components/catalog/DetailActions";
import { PdfStatus } from "../../../../../../components/catalog/PdfStatus";
import { L } from "../../../../../../components/L";
import { LocalizedMetadata } from "../../../../../../components/LocalizedMetadata";
import { SYSTEMS } from "../../../../../../data/configurator/systems";
import type { Localized } from "../../../../../../data/catalog/types";
import { categoriesOrdered, manufacturersFor, systemByPath } from "../../../../../../lib/catalog";
import { CS } from "../../../../../../lib/catalog-strings";

export function generateStaticParams() { return categoriesOrdered().flatMap((category) => manufacturersFor(category.slug).flatMap((manufacturer) => manufacturer.systems.map((system) => ({ slug: category.slug, manufacturer: manufacturer.id, system: system.id })))); }
export const dynamicParams = false;
const localized = (value: string | Localized<string>): Localized<string> => typeof value === "string" ? { en: value } : value;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; manufacturer: string; system: string }> }): Promise<Metadata> {
  const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && systemByPath(category.slug, p.manufacturer, p.system);
  return { title: entry ? `${entry.manufacturer.name} ${entry.system.name} — Kamika Bauelemente` : "System — Kamika Bauelemente" };
}

export default async function SystemDetail({ params }: { params: Promise<{ slug: string; manufacturer: string; system: string }> }) {
  const p = await params; const category = categoriesOrdered().find((item) => item.slug === p.slug); const entry = category && systemByPath(category.slug, p.manufacturer, p.system); if (!category || !entry) notFound();
  const configurable = SYSTEMS.some((system) => system.id === entry.system.id);
  const pageTitle = { en: `${entry.manufacturer.name} ${entry.system.name}` };
  return <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 md:px-8 md:py-16">
    <LocalizedMetadata title={pageTitle} />
    <nav className="font-mono text-xs text-kamika-steel"><Link href="/catalog"><L t={CS.catalogue} /></Link> <span aria-hidden> / </span><Link href={`/catalog/${category.slug}?brand=${encodeURIComponent(entry.manufacturer.name)}`}><L t={category.name} /></Link></nav>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-kamika bg-kamika-blue-50"><Image src={entry.system.image} alt={`${entry.manufacturer.name} ${entry.system.name}`} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" /></div>
      <article><p className="kamika-eyebrow">{entry.manufacturer.name} · <L t={category.name} /></p><h1 className="mt-2 text-4xl md:text-5xl">{entry.system.name}</h1><p className="mt-4 text-lg text-kamika-ink/65"><L t={entry.system.tagline} /></p>{entry.system.description && <p className="mt-5 text-sm text-kamika-ink/70"><L t={entry.system.description} /></p>}
        {entry.system.specs?.length ? <dl className="mt-7 divide-y divide-kamika-mist border-y border-kamika-mist">{entry.system.specs.map((spec, index) => <div key={index} className="flex justify-between gap-6 py-3 text-sm"><dt className="text-kamika-ink/55"><L t={spec.label} /></dt><dd className="text-right font-mono"><L t={localized(spec.value)} />{spec.unit ? ` ${spec.unit}` : ""}</dd></div>)}</dl> : <p className="mt-7 rounded-kamika bg-kamika-blue-50 p-4 text-sm"><L t={CS.technicalDataPending} /></p>}
        <div className="mt-7"><DetailActions systemId={configurable ? entry.system.id : undefined} subject={`${entry.manufacturer.name} ${entry.system.name}`} /></div>
        {entry.system.datasheet && <div className="mt-5"><PdfStatus /></div>}
      </article>
    </div>
  </main>;
}
