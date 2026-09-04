import type { Metadata } from "next";
import { L } from "../../components/L";
import { LocalizedMetadata } from "../../components/LocalizedMetadata";
import { COMPANY } from "../../lib/company";
import { SITE } from "../../lib/site-strings";

export const metadata: Metadata = { title: "Impressum — Kamika Bauelemente" };
export default function ImpressumPage() {
  return <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 md:px-8 md:py-20">
    <LocalizedMetadata title={SITE.legalNotice} />
    <p className="kamika-eyebrow"><L t={SITE.legalEyebrow} /></p>
    <h1 className="mt-2 text-4xl"><L t={SITE.legalNotice} /></h1>
    <div className="mt-8 space-y-6 text-kamika-ink/75">
      <section><h2 className="text-xl"><L t={SITE.provider} /></h2><p className="mt-2">{COMPANY.name}</p></section>
      <section><h2 className="text-xl"><L t={SITE.contact} /></h2><p className="mt-2"><L t={SITE.phone} />: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a><br /><L t={SITE.email} />: <a href={COMPANY.emailHref}>{COMPANY.email}</a></p></section>
      <aside className="rounded-kamika border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><strong><L t={SITE.publicationNotice} /></strong> <L t={SITE.publicationNoticeBody} /></aside>
      <section><h2 className="text-xl"><L t={SITE.consumerDispute} /></h2><p className="mt-2"><L t={SITE.consumerDisputeBody} /></p></section>
    </div>
  </main>;
}
