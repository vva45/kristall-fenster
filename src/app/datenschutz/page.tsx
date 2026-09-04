import type { Metadata } from "next";
import { L } from "../../components/L";
import { LocalizedMetadata } from "../../components/LocalizedMetadata";
import { COMPANY } from "../../lib/company";
import { SITE } from "../../lib/site-strings";

export const metadata: Metadata = { title: "Datenschutz — Kamika Bauelemente" };
export default function PrivacyPage() {
  return <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 md:px-8 md:py-20">
    <LocalizedMetadata title={SITE.privacyPolicy} />
    <p className="kamika-eyebrow"><L t={SITE.legalEyebrow} /></p>
    <h1 className="mt-2 text-4xl"><L t={SITE.privacyPolicy} /></h1>
    <div className="mt-8 space-y-6 text-kamika-ink/75">
      <section><h2 className="text-xl"><L t={SITE.responsibleContact} /></h2><p className="mt-2">{COMPANY.name}<br /><a href={COMPANY.emailHref}>{COMPANY.email}</a><br /><a href={COMPANY.phoneHref}>{COMPANY.phone}</a></p></section>
      <section><h2 className="text-xl"><L t={SITE.enquiries} /></h2><p className="mt-2"><L t={SITE.enquiriesBody} /></p></section>
      <section><h2 className="text-xl"><L t={SITE.transmission} /></h2><p className="mt-2"><L t={SITE.transmissionBody} /></p></section>
      <section><h2 className="text-xl"><L t={SITE.localStorage} /></h2><p className="mt-2"><L t={SITE.localStorageBody} /></p></section>
      <section><h2 className="text-xl"><L t={SITE.yourRights} /></h2><p className="mt-2"><L t={SITE.yourRightsBody} /></p></section>
      <aside className="rounded-kamika border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><strong><L t={SITE.draftStatus} /></strong> <L t={SITE.draftStatusBody} /></aside>
    </div>
  </main>;
}
