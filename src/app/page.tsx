import Image from "next/image";
import Link from "next/link";
import { L } from "../components/L";
import { categoriesOrdered, de, manufacturersFor, modelCountFor } from "../lib/catalog";
import { CS } from "../lib/catalog-strings";
import { LocalizedMetadata } from "../components/LocalizedMetadata";
import { SITE } from "../lib/site-strings";

const materialStories = [
  { image: "/images/categories/windows-hero.jpg", title: CS.materialPvc, text: CS.materialPvcText, tone: "bg-[#dfe8e6]" },
  { image: "/images/categories/entrance-doors-hero.jpg", title: CS.materialAlu, text: CS.materialAluText, tone: "bg-[#d8c9b7]" },
  { image: "/images/categories/patio-doors-hero.jpg", title: CS.materialGlass, text: CS.materialGlassText, tone: "bg-[#bccbd1]" },
];

export default function Home() {
  const categories = categoriesOrdered();
  return <main className="min-h-screen bg-[#f3f1ec] text-kamika-ink">
    <LocalizedMetadata title={SITE.homeTitle} description={SITE.homeDescription} />
    <section className="architectural-hero relative min-h-[calc(100svh-64px)] overflow-hidden bg-kamika-ink text-white">
      <Image src="/images/categories/patio-doors-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,18,20,.84)_0%,rgba(10,18,20,.42)_47%,rgba(10,18,20,.08)_100%)]" />
      <div className="absolute inset-0 opacity-20 [background:linear-gradient(90deg,transparent_49.9%,white_50%,transparent_50.1%)]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-[1440px] flex-col justify-between px-5 py-10 md:px-8 md:py-14">
        <div className="flex items-center justify-between border-t border-white/35 pt-4 font-mono text-[10px] uppercase tracking-[.18em] text-white/75">
          <L t={CS.heroEyebrow} /><span><L t={SITE.localeEdition} /></span>
        </div>
        <div className="max-w-[880px] pb-6">
          <h1 className="hero-reveal text-[clamp(3.5rem,10vw,9.5rem)] font-medium leading-[.78] tracking-[-.07em]">
            Kamika <span className="block text-kamika-blue">Bauelemente</span>
          </h1>
          <div className="mt-8 grid gap-7 border-t border-white/35 pt-6 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-base leading-7 text-white/80 md:text-lg"><L t={CS.heroIntro} /></p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="soft-button bg-white px-5 py-3 text-sm font-semibold text-kamika-ink"><L t={CS.viewCatalogue} /> ↗</Link>
              <Link href="/configurator" className="soft-button border border-white/60 px-5 py-3 text-sm font-semibold text-white"><L t={CS.openConfigurator} /> →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <p className="kamika-eyebrow"><L t={CS.ranges} /></p>
        <div><h2 className="text-[clamp(2.8rem,6vw,6.5rem)] leading-[.9]"><L t={CS.rangesTitle} /></h2><p className="mt-6 max-w-2xl text-kamika-ink/60"><L t={CS.rangesIntro} /></p></div>
      </div>
      <div className="editorial-grid mt-14">
        {categories.map((category, index) => {
          const models = modelCountFor(category.slug);
          const systems = manufacturersFor(category.slug).reduce((sum, m) => sum + m.systems.length, 0);
          const isFeatured = index === 0 || index === 5;
          const imageSizes = isFeatured
            ? "(min-width: 1440px) 912px, (min-width: 1024px) 66vw, (min-width: 768px) 50vw, 100vw"
            : "(min-width: 1440px) 448px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
          return <Link key={category.slug} href={`/catalog/${category.slug}`} className={`editorial-card group relative overflow-hidden bg-kamika-ink ${isFeatured ? "editorial-card-wide" : ""}`}>
            <Image src={category.heroImage} alt={de(category.name)} fill sizes={imageSizes} className="editorial-card-image object-contain transition duration-700 group-hover:brightness-105" />
            <div className="editorial-card-shade absolute inset-0" />
            <div className="editorial-card-content absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-7">
              <div><span className="font-mono text-[10px] tracking-[.14em] text-white/65">0{index + 1}</span><h3 className="mt-1 text-2xl md:text-3xl"><L t={category.name} /></h3></div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/50 transition group-hover:rotate-45 group-hover:bg-white group-hover:text-black">↗</span>
            </div>
            <span className="editorial-card-count absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] text-black backdrop-blur">{systems || models || "—"} <L t={systems ? CS.systems : CS.models} /></span>
          </Link>;
        })}
      </div>
    </section>

    <section className="bg-kamika-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6"><div><p className="kamika-eyebrow !text-kamika-blue"><L t={CS.materials} /></p><h2 className="mt-4 text-4xl md:text-6xl"><L t={CS.materialsTitle} /></h2></div><span className="hidden font-mono text-xs text-white/45 md:block">01 — 03</span></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">{materialStories.map((story, i) => <article key={i} className={`${story.tone} group text-kamika-ink`}><div className="relative aspect-[4/3] overflow-hidden"><Image src={story.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="origin-top-left object-cover object-left saturate-[.8] transition duration-700 group-hover:scale-105 group-hover:saturate-100" /></div><div className="p-6 md:p-8"><span className="font-mono text-[10px]">0{i+1}</span><h3 className="mt-8 text-3xl"><L t={story.title} /></h3><p className="mt-3 text-sm leading-6 text-kamika-ink/65"><L t={story.text} /></p></div></article>)}</div>
      </div>
    </section>
  </main>;
}
