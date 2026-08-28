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
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="kamika-eyebrow">German Engineering · Premium Systems</p>
            <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-0.055em] md:text-8xl lg:text-[108px]">
              KRISTALL <span className="block text-[#2f4c74]">FENSTER</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#0f1114]/65 md:text-xl">
              Premium German windows, doors and architectural systems with modern design, outstanding thermal performance and professional online configuration.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/configurator" className="rounded-[4px] bg-[#0f1114] px-6 py-3.5 font-semibold text-white shadow-[4px_4px_0_#afc9ef] transition-transform hover:-translate-y-0.5">Open Configurator</Link>
              <Link href="/windows" className="rounded-[4px] border border-[#2f4c74] bg-white px-6 py-3.5 font-semibold text-[#2f4c74] transition-colors hover:bg-[#afc9ef]">Explore Products</Link>
            </div>
          </div>

          <div className="border-l border-[#2f4c74] pl-6">
            <p className="kamika-eyebrow">Built for demanding projects</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {["German engineering", "Premium quality", "Energy efficiency", "Security first"].map((x, i) => (
                <div key={x} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#d6dde7] pt-4">
                  <span className="font-mono text-sm text-[#2f4c74]">0{i + 1}</span>
                  <strong className="font-medium">{x}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="kamika-eyebrow">Product categories</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Designed for modern spaces.</h2>
          <p className="mt-5 text-[#0f1114]/60">A technical catalogue of complete systems for residential and architectural projects.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {categories.slice(0, 2).map((category) => (
            <Link key={category.title} href={category.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[4px_4px_0_#e4e9f0]">
              <div className="aspect-[16/9] overflow-hidden bg-[#f0f5fc]">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${category.image})` }} />
              </div>
              <div className="p-7 md:p-8">
                <p className="kamika-eyebrow">Category</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{category.title}</h3>
                <p className="mt-3 text-[#0f1114]/60">{category.description}</p>
                <span className="mt-6 inline-block font-semibold text-[#2f4c74]">View systems →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {categories.slice(2).map((category) => (
            <Link key={category.title} href={category.href} className="group overflow-hidden border border-[#d8e0e9] bg-white shadow-[4px_4px_0_#e4e9f0]">
              <div className="aspect-[4/3] overflow-hidden bg-[#f0f5fc]"><div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.025]" style={{ backgroundImage: `url(${category.image})` }} /></div>
              <div className="p-6">
                <p className="kamika-eyebrow">Category</p>
                <h3 className="mt-3 text-2xl font-semibold">{category.title}</h3>
                <p className="mt-3 text-sm text-[#0f1114]/60">{category.description}</p>
                <span className="mt-5 inline-block font-semibold text-[#2f4c74]">View systems →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
