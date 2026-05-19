import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function PVCWindowsPage() {

  const models = [

    {
      name: "Ideal 4000",
      description:
        "Reliable classic PVC profile system with excellent thermal insulation.",
      price:
        "from €89",
      href:
        "/windows/pvc/ideal-4000",
      color:
        "from-blue-500/20 to-blue-900/30"
    },

    {
      name: "Ideal 7000",
      description:
        "Advanced energy efficient system for modern architecture.",
      price:
        "from €129",
      href:
        "/windows/pvc/ideal-7000",
      color:
        "from-cyan-500/20 to-blue-950/30"
    },

    {
      name: "Salamander 76",
      description:
        "Premium German PVC profile with elegant minimalist appearance.",
      price:
        "from €149",
      href:
        "/windows/pvc/salamander-76",
      color:
        "from-slate-400/20 to-slate-900/40"
    },

    {
      name: "Gealan S9000",
      description:
        "Luxury PVC solution with exceptional thermal performance.",
      price:
        "from €169",
      href:
        "/windows/pvc/gealan-s9000",
      color:
        "from-indigo-500/20 to-blue-900/40"
    },

    {
      name: "BluEvolution 82",
      description:
        "Ultra efficient premium Salamander system.",
      price:
        "from €189",
      href:
        "/windows/pvc/blu-evolution-82",
      color:
        "from-sky-500/20 to-cyan-900/40"
    },

    {
      name: "Drutex Iglo Energy",
      description:
        "Modern multi chamber PVC system with premium insulation.",
      price:
        "from €159",
      href:
        "/windows/pvc/drutex-iglo-energy",
      color:
        "from-blue-400/20 to-indigo-900/40"
    },

  ]

  return (

    <main className="min-h-screen bg-[#020b1d] text-white">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <p className="text-blue-400 font-semibold mb-6">
            PVC WINDOW SYSTEMS
          </p>

          <h1 className="text-6xl md:text-7xl font-black leading-none">

            Premium
            <span className="text-blue-400">
              {" "}PVC models.
            </span>

          </h1>

          <p className="mt-8 text-xl text-blue-100/60 max-w-3xl leading-relaxed">

            Explore our collection of modern PVC systems
            with German engineering and premium insulation.

          </p>

        </div>

      </section>

      {/* MODELS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {models.map((model, index) => (

            <div
              key={index}
              className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500"
            >

              {/* IMAGE */}

              <div
                className={`h-72 bg-gradient-to-br ${model.color} relative overflow-hidden`}
              >

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-44 h-56 rounded-[30px] border-[14px] border-white/90 bg-blue-50/90 shadow-2xl relative">

                    <div className="absolute inset-4 rounded-[12px] bg-gradient-to-br from-blue-100 to-blue-200" />

                    <div className="absolute top-4 bottom-4 left-1/2 w-[4px] -translate-x-1/2 bg-black/10" />

                    <div className="absolute top-4 bottom-4 left-[35%] w-[3px] bg-black/5" />

                  </div>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h2 className="text-3xl font-black">
                  {model.name}
                </h2>

                <p className="mt-4 text-blue-100/60 leading-relaxed">

                  {model.description}

                </p>

                <div className="mt-8 text-blue-400 font-semibold text-lg">

                  {model.price}

                </div>

                <div className="mt-8 flex items-center justify-between">

                  <span className="text-blue-400 font-semibold">
                    PVC Collection
                  </span>

                  <Link
                    href={model.href}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
                  >
                    View Product
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