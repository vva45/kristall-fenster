import Link from "next/link"
export default function WindowsPage() {

  const categories = [

    {
      title: "PVC WINDOWS",
      description:
        "Energy-efficient multi-chamber PVC systems with exceptional thermal performance.",
      image:
        "/categories/windows-pvc.jpg",
      href:
        "/windows/pvc"
    },

    {
      title: "ALUMINIUM WINDOWS",
      description:
        "Slim profiles and panoramic glazing for contemporary architecture.",
      image:
        "/categories/windows-aluminium.jpg",
      href:
        "/windows/aluminium"
    },

    {
      title: "WOOD WINDOWS",
      description:
        "Natural timber craftsmanship combined with modern insulation technology.",
      image:
        "/categories/windows-wood.jpg",
      href:
        "/windows/wood"
    },

    {
      title: "STEEL WINDOWS",
      description:
        "Industrial elegance with ultra-slim sightlines and premium durability.",
      image:
        "/categories/windows-steel.jpg",
      href:
        "/windows/steel"
    },

    {
      title: "WOOD-ALUMINIUM",
      description:
        "Warm natural interiors with weather-resistant aluminium protection.",
      image:
        "/categories/windows-wood-alu.jpg",
      href:
        "/windows/wood-alu"
    },

  ]

  return (

    <main className="min-h-screen bg-[#020817] text-white">

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#031225] to-[#041a38]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_55%)]" />

        <div className="relative max-w-[1700px] mx-auto px-8 py-24">

          <p className="text-blue-400 font-semibold tracking-widest uppercase mb-5">

            Window Collection

          </p>

          <h1 className="text-7xl md:text-8xl font-black leading-[0.95]">

            German Engineered

            <span className="block text-blue-400">

              Window Systems

            </span>

          </h1>

          <p className="mt-8 text-xl text-white/60 max-w-3xl leading-relaxed">

            Explore premium German-engineered window solutions designed
            for luxury homes, modern architecture and energy-efficient projects.

          </p>

          {/* METRICS */}

          <div className="grid md:grid-cols-3 gap-10 mt-14 max-w-5xl">

            <div>

              <div className="text-4xl font-black text-blue-400">

                German Engineered

              </div>

              <div className="mt-2 text-white/60">

                Window Systems

              </div>

            </div>

            <div>

              <div className="text-4xl font-black text-blue-400">

                  Made in EU

              </div>

              <div className="mt-2 text-white/60">

                Premium Manufacturing

              </div>

            </div>

            <div>

              <div className="text-4xl font-black text-blue-400">

                Uw 0.75
              </div>

              <div className="mt-2 text-white/60">

                High Peromance

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MATERIALS */}

      <section className="max-w-[1700px] mx-auto px-8 py-20">

        <div className="flex flex-wrap justify-center gap-8">

          {categories.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              className="
                group
                relative
                w-full
                max-w-[370px]
                h-[520px]
                rounded-[32px]
                overflow-hidden
                border
                border-white/10
                bg-[#041226]
                transition-all
                duration-500
                hover:border-blue-500/40
                hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]
              "
            >

              {/* IMAGE */}

              <div
                className="
                  absolute
                  inset-0
                  bg-cover
                  bg-center
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/55 to-transparent" />

              {/* BLUE GLOW */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/10 transition-all duration-500" />

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 right-0 p-8">

                <div className="w-12 h-[3px] bg-blue-500 mb-6" />

                <h2 className="text-[34px] leading-none font-black mb-5">

                  {item.title}

                </h2>

                <p className="text-white/70 text-[17px] leading-relaxed mb-8">

                  {item.description}

                </p>

                <span className="text-blue-400 font-semibold text-lg">

                  View Systems →

                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  )
}