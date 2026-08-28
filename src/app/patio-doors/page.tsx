export default function PatioDoorsPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
          <p className="kamika-eyebrow">Kristall Fenster</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Patio Doors</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#0f1114]/60">Premium sliding and folding patio door systems engineered for panoramic views, thermal efficiency and minimalist architecture.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {["Sliding systems","Lift & slide","Folding systems"].map((item, index) => (
            <div key={item} className="border-t border-[#2f4c74] bg-[#f0f5fc] p-7 shadow-[4px_4px_0_#e4e9f0]">
              <span className="font-mono text-xs text-[#2f4c74]">0{index + 1}</span>
              <h2 className="mt-4 text-2xl font-semibold">{item}</h2>
              <p className="mt-3 text-sm text-[#0f1114]/60">Catalogue section in preparation.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
