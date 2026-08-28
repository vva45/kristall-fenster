export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
          <p className="kamika-eyebrow">Contact</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Tell us about your project.</h1>
          <p className="mt-7 max-w-2xl text-lg text-[#0f1114]/60">The contact and quotation section is being prepared. Product configuration remains available online.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-t border-[#2f4c74] bg-[#f0f5fc] p-8 shadow-[4px_4px_0_#e4e9f0]"><p className="kamika-eyebrow">Quotation</p><h2 className="mt-4 text-3xl font-semibold">Professional project support.</h2></div>
          <div className="border-t border-[#2f4c74] bg-white p-8 shadow-[4px_4px_0_#e4e9f0]"><p className="kamika-eyebrow">Configurator</p><h2 className="mt-4 text-3xl font-semibold">Configure your window online.</h2></div>
        </div>
      </section>
    </main>
  )
}
