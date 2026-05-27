import Link from "next/link"
import { catalog } from "@/data/catalog"

export default function PVCWindowsPage() {

  const models = catalog.windows.pvc

  return (

    <main className="min-h-screen bg-[#020817] text-white">

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#031225] to-[#041a38]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_55%)]" />

        <div className="relative max-w-[1700px] mx-auto px-8 py-24">

          <p className="text-blue-400 font-semibold tracking-widest uppercase mb-5">

            WINDOWS / PVC

          </p>

          <h1 className="text-7xl md:text-8xl font-black leading-[0.95]">

            German Engineered

            <span className="block text-blue-400">

              PVC Systems

            </span>

          </h1>

          <p className="mt-8 text-xl text-white/60 max-w-3xl leading-relaxed">

            Premium PVC window profiles engineered for thermal efficiency,
            security and modern architectural design. Built for demanding
            projects and contemporary Mediterranean living.

          </p>

          {/* METRICS */}

          <div className="grid md:grid-cols-3 gap-10 mt-14 max-w-5xl">

            <div>

              <div className="text-4xl font-black text-blue-400">

                Uw 0.75

              </div>

              <div className="mt-2 text-white/60">

                High Performance

              </div>

            </div>

            <div>

              <div className="text-4xl font-black text-blue-400">

                5-7

              </div>

              <div className="mt-2 text-white/60">

                Chamber Systems

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

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-[1700px] mx-auto px-8 py-20">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {models.map((model) => (

            <div
              key={model.slug}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                hover:bg-white/[0.07]
                hover:border-blue-500/40
                hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]
                transition-all
                duration-500
              "
            >

              {/* IMAGE */}

              <div className="relative h-72 overflow-hidden">

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
                    backgroundImage: `url(/products/${model.slug}.jpg)`
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/30 to-transparent" />

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <div className="text-blue-400 text-sm font-semibold uppercase tracking-wide mb-2">

                  {model.manufacturer}

                </div>

                <h2 className="text-3xl font-black mb-4">

                  {model.name}

                </h2>

                <p className="text-blue-100/60 leading-relaxed min-h-[90px]">

                  {model.description}

                </p>

                {/* TECHNICAL */}

                <div className="mt-6 space-y-2 text-sm text-white/70">

                  <div>

                    Depth: {model.technical.installationDepth}

                  </div>

                  <div>

                    Chambers: {model.technical.chambers}

                  </div>

                  <div>

                    Uw: {model.technical.uw}

                  </div>

                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between mt-8">

                  <div>

                    <div className="text-white/40 text-sm">

                      Starting from

                    </div>

                    <div className="text-3xl font-black text-blue-400">

                      €{model.minPrice}

                    </div>

                  </div>

                  <Link
                    href={`/windows/pvc/${model.slug}`}
                    className="
                      px-6
                      py-3
                      rounded-xl
                      bg-blue-600
                      hover:bg-blue-500
                      transition-all
                      font-semibold
                    "
                  >

                    View Details

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