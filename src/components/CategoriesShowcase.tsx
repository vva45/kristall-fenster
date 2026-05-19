"use client"

import Link from "next/link"

const categories = [
  {
    title: "WINDOWS",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
  },
  {
    title: "DOORS",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
  },
  {
    title: "PATIO DOORS",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200",
  },
  {
    title: "GARAGE DOORS",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
  },
  {
    title: "ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
  },
]

export default function CategoriesShowcase() {

  return (

    <section className="relative py-24 overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#031225] to-[#020817]" />

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_55%)]" />

      <div className="relative max-w-[1700px] mx-auto px-8">

        {/* TOP FEATURES */}

        <div className="flex flex-wrap items-center gap-14 mb-14">

          {[
            {
              title: "GERMAN ENGINEERING",
              desc: "Precision and innovation",
            },
            {
              title: "PREMIUM QUALITY",
              desc: "High-end materials",
            },
            {
              title: "ENERGY EFFICIENCY",
              desc: "Sustainable performance",
            },
            {
              title: "SECURITY FIRST",
              desc: "Maximum protection",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="flex items-start gap-4"
            >

              <div className="w-10 h-10 rounded-xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center text-blue-400">

                ✦

              </div>

              <div>

                <h3 className="text-white text-sm font-bold tracking-wide">
                  {item.title}
                </h3>

                <p className="text-white/40 text-sm mt-1">
                  {item.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDE */}

          <div className="col-span-8">

            <div className="grid grid-cols-5 gap-5">

              {categories.map((category) => (

                <Link
                  key={category.title}
                  href="/products"
                  className="group relative h-[320px] rounded-[26px] overflow-hidden border border-white/5 bg-[#071120]"
                >

                  {/* IMAGE */}

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/70 to-transparent" />

                  {/* GLOW */}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-blue-500/10" />

                  {/* CONTENT */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <h3 className="text-white text-[28px] font-black leading-none mb-4">
                      {category.title}
                    </h3>

                    <div className="flex items-center gap-2 text-blue-400 font-semibold">

                      View Systems

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

          {/* CONFIGURATOR PREVIEW */}

          <div className="col-span-4">

            <div className="relative h-full rounded-[30px] border border-blue-500/30 bg-[#071120]/90 backdrop-blur-3xl overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.15)]">

              {/* GLOW */}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_55%)]" />

              <div className="relative p-10">

                <h3 className="text-white text-center text-[22px] font-black tracking-wide mb-10">

                  CONFIGURATOR PREVIEW

                </h3>

                {/* WINDOW */}

                <div className="flex justify-center mb-10">

                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
                    alt=""
                    className="w-[220px] h-[260px] object-cover rounded-[24px] border border-white/10"
                  />

                </div>

                {/* SELECTS */}

                <div className="space-y-5">

                  {[
                    "Material",
                    "Color",
                    "Glazing",
                  ].map((item) => (

                    <div key={item}>

                      <label className="block text-white/60 text-sm mb-2 uppercase tracking-wide">

                        {item}

                      </label>

                      <div className="h-[56px] rounded-2xl border border-white/5 bg-[#0b1728] px-5 flex items-center justify-between text-white">

                        <span>
                          Select
                        </span>

                        <span className="text-white/40">
                          ▼
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

                {/* BUTTON */}

                <Link
                  href="/configurator"
                  className="mt-8 h-[64px] rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center text-white font-black tracking-wide shadow-[0_0_40px_rgba(37,99,235,0.45)]"
                >

                  START CONFIGURING

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}