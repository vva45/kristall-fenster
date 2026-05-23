import Link from "next/link"
import Navbar from "@/components/Navbar"
import { catalog } from "@/data/catalog"

export default function PVCWindowsPage() {

  const models = catalog.windows.pvc

  return (

    <main className="min-h-screen bg-[#020817] text-white">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="text-blue-400 font-semibold mb-4">

            WINDOWS / PVC

          </p>

          <h1 className="text-6xl font-black mb-6">

            PVC Window Systems

          </h1>

          <p className="max-w-3xl text-xl text-blue-100/60">

            Premium German PVC window profiles with excellent thermal insulation,
            security and modern aesthetics.

          </p>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {models.map((model) => (

            <div
              key={model.slug}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-300"
            >

              {/* IMAGE */}

              <div className="h-72 bg-gradient-to-br from-blue-500/20 to-blue-900/30 flex items-center justify-center">

                <div className="text-7xl opacity-30">
                  🪟
                </div>

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
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
                  >

                    View More

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