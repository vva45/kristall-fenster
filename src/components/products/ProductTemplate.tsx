import Link from "next/link"
import { catalog } from "@/data/catalog"

type Props = { slug: string }

export default function ProductTemplate({ slug }: Props) {
  const product = catalog.windows.pvc.find((p) => p.slug === slug)
  if (!product) return <div>Product not found</div>

  const title = product.name
  const manufacturer = product.manufacturer
  const description = product.description
  const image = `/products/${product.slug}.png`
  const technical = product.technical
  const features = [
    `${technical.chambers} chamber system`,
    technical.glazing,
    `${technical.installationDepth} installation depth`,
    "German engineering",
  ]

  return (
    <main className="min-h-screen bg-white text-[#0f1114]">
      <section className="kamika-grid-bg border-b border-[#e4e9f0]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kamika-eyebrow">{manufacturer}</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#0f1114]/60">{description}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/configurator?product=${slug}`} className="rounded-[4px] bg-[#0f1114] px-6 py-3.5 font-semibold text-white shadow-[4px_4px_0_#afc9ef] transition-transform hover:-translate-y-0.5">Configure Product</Link>
              <Link href="/contact" className="rounded-[4px] border border-[#2f4c74] bg-white px-6 py-3.5 font-semibold text-[#2f4c74] hover:bg-[#afc9ef]">Request Quote</Link>
            </div>
          </div>

          <div className="overflow-hidden border border-[#d8e0e9] bg-white shadow-[4px_4px_0_#e4e9f0]">
            <img src={image} alt={title} className="h-[500px] w-full scale-125 object-contain" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <p className="kamika-eyebrow">Product profile</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Key Features</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature} className="border-t border-[#2f4c74] bg-[#f0f5fc] p-6 shadow-[3px_3px_0_#e4e9f0]">
              <span className="font-mono text-xs text-[#2f4c74]">0{index + 1}</span>
              <h3 className="mt-5 text-lg font-medium">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e4e9f0] bg-[#f0f5fc]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
          <p className="kamika-eyebrow">Technical data</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Technical Specifications</h2>
          <div className="mt-10 grid border border-[#d8e0e9] bg-white md:grid-cols-2">
            {[
              ["Installation Depth", technical.installationDepth],
              ["Chambers", technical.chambers],
              ["Glazing", technical.glazing],
              ["Uw", technical.uw],
            ].map(([label, value], index) => (
              <div key={label} className={`p-7 md:p-8 ${index < 2 ? "border-b border-[#e4e9f0]" : ""} ${index % 2 === 0 ? "md:border-r md:border-[#e4e9f0]" : ""}`}>
                <span className="kamika-eyebrow">{label}</span>
                <strong className="mt-3 block text-3xl font-semibold">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
