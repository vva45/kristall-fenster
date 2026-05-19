import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function WindowsPage() {

  const categories = [

    {
      title: "PVC Windows",
      description:
        "Energy efficient PVC systems with modern German engineering.",
      color:
        "from-blue-500/20 to-blue-900/30",
      href:
        "/windows/pvc"
    },

    {
      title: "Aluminium Windows",
      description:
        "Minimalist aluminium systems for luxury architecture.",
      color:
        "from-slate-400/20 to-slate-900/40",
      href:
        "/windows/aluminium"
    },

    {
      title: "Wood Windows",
      description:
        "Premium natural wood systems with elegant aesthetics.",
      color:
        "from-amber-500/20 to-orange-900/30",
      href:
        "/windows/wood"
    },

    {
      title: "Steel Windows",
      description:
        "Industrial steel systems with ultra modern appearance.",
      color:
        "from-zinc-500/20 to-zinc-900/40",
      href:
        "/windows/steel"
    },

    {
      title: "Wood-Aluminium",
      description:
        "Combined premium systems with warmth and durability.",
      color:
        "from-orange-500/20 to-neutral-900/40",
      href:
        "/windows/wood-alu"
    },

  ]

  return (

    <main className="min-h-screen bg-[#020b1d] text-white">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <p className="text-blue-400 font-semibold mb-6">
            WINDOW COLLECTION
          </p>

          <h1 className="text-6xl md:text-7xl font-black leading-none">

            Explore our
            <span className="text-blue-400">
              {" "}window systems.
            </span>

          </h1>

          <p className="mt-8 text-xl text-blue-100/60 max-w-3xl leading-relaxed">

            Discover premium German-engineered systems designed
            for modern homes and architectural projects.

          </p>

        </div>

      </section>

      {/* GRID */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {categories.map((item, index) => (

            <div
              key={index}
              className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500"
            >

              {/* IMAGE */}

              <div
                className={`h-72 bg-gradient-to-br ${item.color} relative overflow-hidden`}
              >

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-44 h-56 rounded-[30px] border-[14px] border-white/90 bg-blue-50/90 shadow-2xl relative">

                    <div className="absolute inset-4 rounded-[12px] bg-gradient-to-br from-blue-100 to-blue-200" />

                    <div className="absolute top-4 bottom-4 left-1/2 w-[4px] -translate-x-1/2 bg-black/10" />

                  </div>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h2 className="text-3xl font-black">
                  {item.title}
                </h2>

                <p className="mt-4 text-blue-100/60 leading-relaxed">

                  {item.description}

                </p>

                <div className="mt-10 flex items-center justify-between">

                  <span className="text-blue-400 font-semibold">
                    Premium Systems
                  </span>

                  <Link
                    href={item.href}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
                  >
                    View Models
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