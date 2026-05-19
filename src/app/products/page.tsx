import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function ProductsPage() {

  const products = [

    {
      title: "PVC Windows",
      description:
        "High efficiency German PVC systems with modern thermal insulation.",
      color:
        "from-blue-500/30 to-blue-900/30",
    },

    {
      title: "Aluminium Systems",
      description:
        "Premium aluminium windows for minimalist modern architecture.",
      color:
        "from-slate-400/20 to-slate-900/40",
    },

    {
      title: "Wood Systems",
      description:
        "Elegant wood solutions with exceptional acoustic insulation.",
      color:
        "from-amber-500/20 to-orange-900/30",
    },

    {
      title: "Sliding Doors",
      description:
        "Lift & slide panoramic systems for luxury interiors.",
      color:
        "from-cyan-500/20 to-blue-900/30",
    },

    {
      title: "Entrance Doors",
      description:
        "Modern secure entrance systems with premium German hardware.",
      color:
        "from-zinc-500/20 to-black/40",
    },

    {
      title: "Pergolas",
      description:
        "Outdoor premium pergola systems for modern living spaces.",
      color:
        "from-orange-500/20 to-yellow-900/30",
    },

    {
      title: "Garage Doors",
      description:
        "Automated garage systems with insulation and smart control.",
      color:
        "from-neutral-500/20 to-neutral-900/40",
    },

    {
      title: "Roller Shutters",
      description:
        "Security and insulation shutter systems for modern homes.",
      color:
        "from-gray-500/20 to-gray-900/40",
    },

  ]

  return (

    <main className="min-h-screen bg-[#020b1d] text-white">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-[#02142f] to-[#031b44]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-4xl">

            <p className="text-blue-400 font-semibold mb-6">
              PRODUCT COLLECTION
            </p>

            <h1 className="text-6xl md:text-7xl font-black leading-none">

              Explore our
              <span className="text-blue-400">
                {" "}premium systems.
              </span>

            </h1>

            <p className="mt-8 text-xl text-blue-100/60 leading-relaxed max-w-2xl">

              Discover German-engineered windows, doors and pergolas
              designed for modern architecture and premium living.

            </p>

          </div>

        </div>

      </section>

      {/* PRODUCTS GRID */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {products.map((product, index) => (

            <div
              key={index}
              className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500"
            >

              {/* IMAGE AREA */}

              <div
                className={`h-72 bg-gradient-to-br ${product.color} relative overflow-hidden`}
              >

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-40 h-52 rounded-[28px] border-[14px] border-white/90 bg-blue-50/90 shadow-2xl relative">

                    <div className="absolute inset-4 rounded-[12px] bg-gradient-to-br from-blue-100 to-blue-200" />

                    <div className="absolute top-4 bottom-4 left-1/2 w-[4px] -translate-x-1/2 bg-black/10" />

                  </div>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h2 className="text-3xl font-black">
                  {product.title}
                </h2>

                <p className="mt-4 text-blue-100/60 leading-relaxed">

                  {product.description}

                </p>

                <div className="mt-10 flex items-center justify-between">

                  <span className="text-blue-400 font-semibold">
                    Premium Collection
                  </span>

                  <Link
                    href="/configurator"
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
                  >
                    Configure
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}