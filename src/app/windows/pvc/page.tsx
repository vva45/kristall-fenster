import Link from "next/link"
import { catalog } from "@/data/catalog"

export default function PVCWindowsPage() {
  const models = catalog.windows.pvc

  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-24">
          <p className="kamika-eyebrow">Windows / PVC</p>
          <h1 className="mt-4 max-w-5xl text-[39px] font-semibold leading-[.95] tracking-[-0.05em] md:mt-5 md:text-7xl">German engineered <span className="block text-[#2f4c74]">PVC systems.</span></h1>
          <p className="mt-6 max-w-3xl text-[14px] leading-6 text-[#0f1114]/60 md:mt-7 md:text-lg md:leading-relaxed">Premium PVC profiles engineered for thermal efficiency, security and contemporary architectural design.</p>
          <div className="mt-9 grid max-w-5xl grid-cols-3 gap-3 md:mt-12 md:gap-6">
            {[['Uw 0.72','High performance'],['5–7','Chamber systems'],['Made in EU','Premium manufacturing']].map(([a,b]) => (
              <div key={a} className="border-t border-[#2f4c74] pt-3 md:pt-4"><strong className="block text-[14px] font-semibold leading-tight text-[#2f4c74] md:text-2xl">{a}</strong><span className="mt-1 block text-[9px] leading-tight text-[#0f1114]/55 md:text-sm">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
          {models.map((model) => (
            <article key={model.slug} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[3px_3px_0_#e4e9f0] transition-transform hover:-translate-y-1 md:shadow-[4px_4px_0_#e4e9f0]">
              <div className="relative flex h-[190px] items-center justify-center overflow-hidden bg-[#f0f5fc] md:h-72">
                <img src={`/products/${model.slug}.png`} alt={model.name} className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.035] md:p-7" />
              </div>
              <div className="p-5 md:p-7">
                <p className="kamika-eyebrow">{model.manufacturer}</p>
                <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] md:mt-3 md:text-3xl">{model.name}</h2>
                <p className="mt-2 text-[13px] leading-5 text-[#0f1114]/60 md:mt-4 md:min-h-[72px] md:text-base">{model.description}</p>

                <div className="mt-5 grid grid-cols-3 border-y border-[#e4e9f0] md:mt-6">
                  <div className="py-3 pr-2 md:py-4 md:pr-3"><span className="block text-[8px] uppercase tracking-[.08em] text-[#0f1114]/45 md:text-[11px]">Depth</span><strong className="mt-1 block text-[11px] font-medium md:text-sm">{model.technical.installationDepth}</strong></div>
                  <div className="border-l border-[#e4e9f0] px-2 py-3 md:px-3 md:py-4"><span className="block text-[8px] uppercase tracking-[.08em] text-[#0f1114]/45 md:text-[11px]">Chambers</span><strong className="mt-1 block text-[11px] font-medium md:text-sm">{model.technical.chambers}</strong></div>
                  <div className="border-l border-[#e4e9f0] py-3 pl-2 md:py-4 md:pl-3"><span className="block text-[8px] uppercase tracking-[.08em] text-[#0f1114]/45 md:text-[11px]">Uw</span><strong className="mt-1 block whitespace-nowrap text-[10px] font-medium md:text-sm">{model.technical.uw}</strong></div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 md:mt-7 md:gap-4">
                  <div><span className="text-[9px] text-[#0f1114]/45 md:text-xs">Starting from</span><div className="mt-0.5 text-[24px] font-semibold leading-none text-[#2f4c74] md:mt-1 md:text-3xl">€{model.minPrice}</div></div>
                  <Link href={`/windows/pvc/${model.brandSlug}/${model.slug}`} className="rounded-[3px] bg-[#0f1114] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[3px_3px_0_#afc9ef] transition-transform hover:-translate-y-0.5 md:px-5 md:py-3 md:text-base">View Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
