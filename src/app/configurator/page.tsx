import Navbar from "@/components/Navbar"
import CategoriesShowcase from "@/components/CategoriesShowcase"

export default function Home() {

  return (

    <main className="min-h-screen bg-[#020817] overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative min-h-[70vh] flex items-center overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_50%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#031225] to-[#020817]" />

        {/* CONTENT */}

        <div className="relative max-w-[1600px] mx-auto px-10 py-28 w-full">

          <div className="max-w-[900px]">

            <p className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6">

              Premium German Engineering

            </p>

            <h1 className="text-white text-[90px] leading-[0.95] font-black tracking-tight">

              Designed for

              <span className="block text-blue-400">
                modern spaces.
              </span>

            </h1>

            <p className="mt-8 text-white/50 text-xl max-w-[700px] leading-relaxed">

              Configure premium German windows, doors and architectural systems with cinematic modern design and precision engineering.

            </p>

            <div className="mt-12 flex items-center gap-5">

              <a
                href="/configurator"
                className="h-[64px] px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center text-white font-bold shadow-[0_0_45px_rgba(37,99,235,0.35)]"
              >

                Open Configurator

              </a>

              <a
                href="/products"
                className="h-[64px] px-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-white font-bold backdrop-blur-xl"
              >

                Explore Products

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <CategoriesShowcase />

    </main>

  )
}