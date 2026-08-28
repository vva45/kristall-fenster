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
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <p className="kamika-eyebrow">Window collection</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">German engineered <span className="block text-[#2f4c74]">window systems.</span></h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#0f1114]/60">Explore premium window solutions designed for modern architecture, efficient homes and demanding projects.</p>
          <div className="mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[['German engineered','Window systems'],['Made in EU','Premium manufacturing'],['Uw 0.75','High performance']].map(([a,b]) => (
              <div key={a} className="border-t border-[#2f4c74] pt-4"><strong className="block text-2xl font-semibold text-[#2f4c74]">{a}</strong><span className="mt-1 block text-sm text-[#0f1114]/55">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <Link key={item.title} href={item.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[4px_4px_0_#e4e9f0] transition-transform hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-[#f0f5fc]"><div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${item.image})` }} /></div>
              <div className="p-7">
                <p className="kamika-eyebrow">Material system</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h2>
                <p className="mt-4 min-h-[72px] text-[#0f1114]/60">{item.description}</p>
                <span className="mt-6 inline-block font-semibold text-[#2f4c74]">View systems →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
