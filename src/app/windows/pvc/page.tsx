import Link from "next/link"
import { catalog } from "@/data/catalog"

export default function PVCWindowsPage() {
  const models = catalog.windows.pvc

  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <p className="kamika-eyebrow">Windows / PVC</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">German engineered <span className="block text-[#2f4c74]">PVC systems.</span></h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#0f1114]/60">Premium PVC profiles engineered for thermal efficiency, security and contemporary architectural design.</p>
          <div className="mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[['Uw 0.72','High performance'],['5–7','Chamber systems'],['Made in EU','Premium manufacturing']].map(([a,b]) => (
              <div key={a} className="border-t border-[#2f4c74] pt-4"><strong className="block text-2xl font-semibold text-[#2f4c74]">{a}</strong><span className="mt-1 block text-sm text-[#0f1114]/55">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {models.map((model) => (
            <article key={model.slug} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[4px_4px_0_#e4e9f0] transition-transform hover:-translate-y-1">
              <div className="relative h-72 overflow-hidden bg-[#f0f5fc]">
                <img src={`/products/${model.slug}.png`} alt={model.name} className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-7">
                <p className="kamika-eyebrow">{model.manufacturer}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{model.name}</h2>
                <p className="mt-4 min-h-[72px] text-[#0f1114]/60">{model.description}</p>

                <div className="mt-6 grid grid-cols-3 border-y border-[#e4e9f0] text-sm">
                  <div className="py-4 pr-3"><span className="block text-[11px] uppercase tracking-wide text-[#0f1114]/45">Depth</span><strong className="mt-1 block font-medium">{model.technical.installationDepth}</strong></div>
                  <div className="border-l border-[#e4e9f0] px-3 py-4"><span className="block text-[11px] uppercase tracking-wide text-[#0f1114]/45">Chambers</span><strong className="mt-1 block font-medium">{model.technical.chambers}</strong></div>
                  <div className="border-l border-[#e4e9f0] pl-3 py-4"><span className="block text-[11px] uppercase tracking-wide text-[#0f1114]/45">Uw</span><strong className="mt-1 block font-medium">{model.technical.uw}</strong></div>
                </div>

                <div className="mt-7 flex items-end justify-between gap-4">
                  <div><span className="text-xs text-[#0f1114]/45">Starting from</span><div className="mt-1 text-3xl font-semibold text-[#2f4c74]">€{model.minPrice}</div></div>
                  <Link href={`/windows/pvc/${model.brandSlug}/${model.slug}`} className="rounded-[4px] bg-[#0f1114] px-5 py-3 font-semibold text-white shadow-[3px_3px_0_#afc9ef] transition-transform hover:-translate-y-0.5">View Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
