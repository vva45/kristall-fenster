import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function Ideal4000Page() {

  return (

    <main className="min-h-screen bg-[#020b1d] text-white">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-sm text-blue-100/40 mb-6">

            Home / Windows / PVC / Ideal 4000

          </div>

          <h1 className="text-6xl font-black leading-none">

            Ideal 4000
            <span className="text-blue-400">
              {" "}PVC System
            </span>

          </h1>

          <p className="mt-8 text-xl text-blue-100/60 max-w-3xl leading-relaxed">

            Reliable German engineered PVC window system with
            excellent thermal insulation and modern aesthetics.

          </p>

        </div>

      </section>

      {/* PRODUCT */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* IMAGE */}

          <div>

            <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">

              <div className="aspect-square rounded-[32px] bg-gradient-to-br from-blue-500/20 to-blue-950/40 flex items-center justify-center">

                {/* WINDOW */}

                <div className="w-[320px] h-[420px] rounded-[34px] border-[18px] border-white/90 bg-blue-50/90 shadow-2xl relative">

                  {/* GLASS */}

                  <div className="absolute inset-5 rounded-[18px] bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">

                    {/* REFLECTION */}

                    <div className="absolute top-0 left-[-60px] w-[120px] h-full bg-white/20 rotate-12" />

                    {/* CENTER */}

                    <div className="absolute top-0 bottom-0 left-1/2 w-[4px] -translate-x-1/2 bg-black/10" />

                    {/* HANDLE */}

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[8px] h-16 rounded-full bg-gray-500" />

                  </div>

                </div>

              </div>

            </div>

            {/* MINI GALLERY */}

            <div className="grid grid-cols-4 gap-4 mt-6">

              {[1,2,3,4].map((item) => (

                <div
                  key={item}
                  className="aspect-square rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                />

              ))}

            </div>

          </div>

          {/* INFO */}

          <div>

            <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">

              <p className="text-blue-400 font-semibold text-lg">
                Premium PVC Collection
              </p>

              <h2 className="mt-4 text-5xl font-black leading-tight">

                Modern PVC solution
                for contemporary homes.

              </h2>

              <p className="mt-8 text-blue-100/60 leading-relaxed text-lg">

                Ideal 4000 combines modern aesthetics,
                energy efficiency and excellent acoustic insulation.
                Designed for residential and commercial applications.

              </p>

              {/* FEATURES */}

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="w-3 h-3 rounded-full bg-blue-400" />

                  <span>70mm installation depth</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-3 h-3 rounded-full bg-blue-400" />

                  <span>Excellent thermal insulation</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-3 h-3 rounded-full bg-blue-400" />

                  <span>Premium German hardware</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-3 h-3 rounded-full bg-blue-400" />

                  <span>Acoustic protection system</span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-3 h-3 rounded-full bg-blue-400" />

                  <span>Multi chamber PVC technology</span>

                </div>

              </div>

              {/* PRICE */}

              <div className="mt-14 p-8 rounded-[28px] bg-blue-600">

                <p className="text-blue-100">
                  Starting from
                </p>

                <div className="mt-2 text-6xl font-black">
                  €89
                </div>

              </div>

              {/* BUTTON */}

              <div className="mt-10">

                <Link
                  href="/configurator"
                  className="inline-flex items-center justify-center w-full py-5 rounded-2xl bg-white text-black font-black text-lg hover:bg-blue-100 transition-all"
                >
                  Configure Now
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}