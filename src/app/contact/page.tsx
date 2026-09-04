import type { Metadata } from "next";
import { InquiryForm } from "../../components/InquiryForm";
import { L } from "../../components/L";
import { LocalizedMetadata } from "../../components/LocalizedMetadata";
import { COMPANY } from "../../lib/company";
import { SITE } from "../../lib/site-strings";

export const metadata: Metadata = { title: "Kontakt — Kamika Bauelemente", description: "Kontakt und Anfrage an Kamika Bauelemente." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const product = (await searchParams).product;
  return <main className="mx-auto w-full max-w-[1100px] flex-1 px-5 py-12 md:px-8 md:py-20">
    <LocalizedMetadata title={SITE.contact} description={SITE.contactDescription} />
    <p className="kamika-eyebrow"><L t={SITE.contact} /></p><h1 className="mt-2 text-4xl"><L t={SITE.contactTitle} /></h1>
    <div className="mt-8 grid gap-4 sm:grid-cols-2"><a href={COMPANY.phoneHref} className="rounded-kamika border border-kamika-mist p-5"><span className="block text-sm text-kamika-ink/55"><L t={SITE.phone} /></span><strong>{COMPANY.phone}</strong></a><a href={COMPANY.emailHref} className="rounded-kamika border border-kamika-mist p-5"><span className="block text-sm text-kamika-ink/55"><L t={SITE.email} /></span><strong>{COMPANY.email}</strong></a></div>
    <div className="mt-10"><InquiryForm initialMessage={typeof product === "string" ? product : undefined} /></div>
  </main>;
}
