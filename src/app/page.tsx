import Link from "next/link"

const categories = [
  { title: "WINDOWS", image: "/categories/windows.jpg", href: "/windows", description: "Premium PVC, Aluminium, Steel and Wood window systems." },
  { title: "DOORS", image: "/categories/doors.jpg", href: "/doors", description: "Elegant entrance and side entrance door systems." },
  { title: "PATIO DOORS", image: "/categories/patio-doors.jpg", href: "/patio-doors", description: "Sliding, lift-slide and folding panoramic solutions." },
  { title: "GARAGE DOORS", image: "/categories/garage-doors.jpg", href: "/garage-doors", description: "Sectional, roller and industrial garage systems." },
  { title: "ACCESSORIES", image: "/categories/accessories.jpg", href: "/accessories", description: "Roller shutters, blinds, hardware and accessories." },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:px-8 md:py-28 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="kamika-eyebrow">German Engineering · Premium Systems</p>
            <h1 className="mt-5 max-w-5xl text-[52px] font-semibold leading-[.88] tracking-[-0.055em] sm:text-6xl md:mt-6 md:text-8xl lg:text-[108px]">KRISTALL <span className="block text-[#2f4c74]">FENSTER</span></h1>
            <p className="mt-7 max-w-3xl text-[15px] leading-7 text-[#0f1114]/65 md:mt-8 md:text-xl">Premium German windows, doors and architectural systems with modern design, outstanding thermal performance and professional online configuration.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:mt-10">
              <Link href="/configurator" className="rounded-[3px] bg-[#0f1114] px-4 py-3 text-center text-[12px] font-semibold text-white shadow-[3px_3px_0_#afc9ef] transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-base">Open Configurator</Link>
              <Link href="/windows" className="rounded-[3px] border border-[#2f4c74] bg-white px-4 py-3 text-center text-[12px] font-semibold text-[#2f4c74] transition-colors hover:bg-[#afc9ef] sm:px-6 sm:py-3.5 sm:text-base">Explore Products</Link>
            </div>
          </div>

          <div className="border-t border-[#2f4c74] pt-7 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="kamika-eyebrow">Built for demanding projects</p>
            <div className="mt-5 grid gap-0 sm:grid-cols-2 lg:grid-cols-1">
              {["German engineering", "Premium quality", "Energy efficiency", "Security first"].map((x, i) => (
                <div key={x} className="grid grid-cols-[34px_1fr] gap-3 border-t border-[#d6dde7] py-3.5 first:border-t-0 sm:first:border-t lg:first:border-t">
                  <span className="font-mono text-[11px] text-[#2f4c74]">0{i + 1}</span><strong className="text-[13px] font-medium md:text-base">{x}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-24">
        <div className="max-w-3xl"><p className="kamika-eyebrow">Product categories</p><h2 className="mt-3 text-[36px] font-semibold leading-[.98] tracking-[-0.045em] md:mt-4 md:text-6xl">Designed for modern spaces.</h2><p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#0f1114]/60 md:mt-5 md:text-base">A technical catalogue of complete systems for residential and architectural projects.</p></div>

        <div className="mt-9 grid gap-5 md:mt-12 md:gap-8 lg:grid-cols-2">
          {categories.slice(0, 2).map((category) => (
            <Link key={category.title} href={category.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[3px_3px_0_#e4e9f0] md:shadow-[4px_4px_0_#e4e9f0]">
              <div className="aspect-[16/9] overflow-hidden bg-[#f0f5fc]"><div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${category.image})` }} /></div>
              <div className="p-5 md:p-8"><p className="kamika-eyebrow">Category</p><h3 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] md:mt-3 md:text-3xl">{category.title}</h3><p className="mt-2 text-[13px] leading-5 text-[#0f1114]/60 md:mt-3 md:text-base">{category.description}</p><span className="mt-4 inline-block text-[12px] font-semibold text-[#2f4c74] md:mt-6 md:text-base">View systems →</span></div>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:mt-8 md:grid-cols-3 md:gap-8">
          {categories.slice(2).map((category) => (
            <Link key={category.title} href={category.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[3px_3px_0_#e4e9f0] md:shadow-[4px_4px_0_#e4e9f0]">
              <div className="aspect-[16/9] overflow-hidden bg-[#f0f5fc] md:aspect-[4/3]"><div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${category.image})` }} /></div>
              <div className="p-5 md:p-6"><p className="kamika-eyebrow">Category</p><h3 className="mt-2 text-[24px] font-semibold tracking-[-0.025em] md:mt-3 md:text-2xl">{category.title}</h3><p className="mt-2 text-[13px] leading-5 text-[#0f1114]/60 md:mt-3 md:text-sm">{category.description}</p><span className="mt-4 inline-block text-[12px] font-semibold text-[#2f4c74] md:mt-5 md:text-base">View systems →</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
