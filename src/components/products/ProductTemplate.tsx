import Link from "next/link"

type Props = {
  title: string
  manufacturer: string
  description: string
  image: string
  slug: string
}

export default function ProductTemplate({
  title,
  manufacturer,
  description,
  image,
  slug,
}: Props) 
{
  return (
    <main className="min-h-screen bg-[#020817] text-white">

      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#031225] to-[#041a38]" />

        <div className="relative max-w-[1600px] mx-auto px-8 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 mb-8">

                {manufacturer}

              </div>

              <h1 className="text-7xl font-black leading-none mb-8">

                {title}

              </h1>

              <p className="text-xl text-white/60 leading-relaxed mb-10">

                {description}

              </p>

              <div className="flex gap-4">

  <Link
  href={`/configurator?product=${slug}`}
  className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold"
>
  Configure Product
</Link>

  <Link
    href="/contact"
    className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold"
  >

    Request Quote

  </Link>

</div>
            </div>

            <div>

              <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#041226]">

                <img
                  src={image}
                  alt={title}
                  className="w-full h-[500px] object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="max-w-[1600px] mx-auto px-8 py-20">

        <h2 className="text-5xl font-black mb-12">

          Key Features

        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            "Premium Thermal Insulation",
            "High Security Hardware",
            "Excellent Sound Reduction",
            "German Engineering"
          ].map((feature) => (

            <div
              key={feature}
              className="rounded-[24px] border border-white/10 bg-[#041226] p-8"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">

                ✦

              </div>

              <h3 className="font-bold text-lg">

                {feature}

              </h3>

            </div>

          ))}

        </div>

      </section>

      <section className="max-w-[1600px] mx-auto px-8 pb-24">

        <h2 className="text-5xl font-black mb-12">

          Technical Specifications

        </h2>

        <div className="rounded-[32px] border border-white/10 bg-[#041226] overflow-hidden">

          <div className="grid md:grid-cols-2">

            <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">

              Installation Depth

            </div>

            <div className="p-8 text-blue-400">

              70 mm

            </div>

            <div className="p-8 border-b md:border-r border-white/10">

              Chambers

            </div>

            <div className="p-8 text-blue-400">

              5

            </div>

            <div className="p-8 border-b md:border-r border-white/10">

              Glazing

            </div>

            <div className="p-8 text-blue-400">

              24-41 mm

            </div>

            <div className="p-8 md:border-r border-white/10">

              Uw Value

            </div>

            <div className="p-8 text-blue-400">

              0.96 W/m²K

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}