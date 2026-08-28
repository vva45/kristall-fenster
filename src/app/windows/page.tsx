import Link from "next/link"

export default function WindowsPage() {
  const categories = [
    { title: "PVC WINDOWS", description: "Energy-efficient multi-chamber PVC systems with exceptional thermal performance.", image: "/categories/windows-pvc.jpg", href: "/windows/pvc" },
    { title: "ALUMINIUM WINDOWS", description: "Slim profiles and panoramic glazing for contemporary architecture.", image: "/categories/windows-aluminium.jpg", href: "/windows/aluminium" },
    { title: "WOOD WINDOWS", description: "Natural timber craftsmanship combined with modern insulation technology.", image: "/categories/windows-wood.jpg", href: "/windows/wood" },
    { title: "STEEL WINDOWS", description: "Industrial elegance with ultra-slim sightlines and premium durability.", image: "/categories/windows-steel.jpg", href: "/windows/steel" },
    { title: "WOOD-ALUMINIUM", description: "Warm natural interiors with weather-resistant aluminium protection.", image: "/categories/windows-wood-alu.jpg", href: "/windows/wood-alu" },
  ]

  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-24">
          <p className="kamika-eyebrow">Window collection</p>
          <h1 className="mt-4 max-w-5xl text-[39px] font-semibold leading-[.95] tracking-[-0.05em] md:mt-5 md:text-7xl">German engineered <span className="block text-[#2f4c74]">window systems.</span></h1>
          <p className="mt-6 max-w-3xl text-[14px] leading-6 text-[#0f1114]/60 md:mt-7 md:text-lg md:leading-relaxed">Explore premium window solutions designed for modern architecture, efficient homes and demanding projects.</p>
          <div className="mt-9 grid max-w-5xl grid-cols-3 gap-3 md:mt-12 md:gap-6">
            {[['German engineered','Window systems'],['Made in EU','Premium manufacturing'],['Uw 0.75','High performance']].map(([a,b]) => (
              <div key={a} className="border-t border-[#2f4c74] pt-3 md:pt-4"><strong className="block text-[14px] font-semibold leading-tight text-[#2f4c74] md:text-2xl">{a}</strong><span className="mt-1 block text-[9px] leading-tight text-[#0f1114]/55 md:text-sm">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {categories.map((item) => (
            <Link key={item.title} href={item.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[3px_3px_0_#e4e9f0] transition-transform hover:-translate-y-1 md:shadow-[4px_4px_0_#e4e9f0]">
              <div className="aspect-[16/9] overflow-hidden bg-[#f0f5fc] md:aspect-[4/3]"><div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${item.image})` }} /></div>
              <div className="p-5 md:p-7"><p className="kamika-eyebrow">Material system</p><h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] md:mt-3 md:text-2xl">{item.title}</h2><p className="mt-2 text-[13px] leading-5 text-[#0f1114]/60 md:mt-4 md:min-h-[72px] md:text-base">{item.description}</p><span className="mt-4 inline-block text-[12px] font-semibold text-[#2f4c74] md:mt-6 md:text-base">View systems →</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
