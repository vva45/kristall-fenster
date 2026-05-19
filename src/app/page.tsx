import Link from "next/link";
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020b1d] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-[#02142f] to-[#031b44]" />

        <div className="relative max-w-7xl mx-auto px-6 py-32">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              German Engineering Premium Systems
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
              KRISTALL
              <br />
              <span className="text-blue-400">
                FENSTER
              </span>
            </h1>

            <p className="mt-8 text-xl text-blue-100/70 max-w-2xl leading-relaxed">
              Premium German windows, doors and pergolas with a modern
              real-time configurator inspired by the best European platforms.
            </p>

            <div className="flex flex-wrap gap-4 mt-12">

              <Link
                href="/configurator"
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold shadow-2xl shadow-blue-500/30"
              >
                Open Configurator
              </Link>

              <Link
                href="/products"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold"
              >
                Explore Products
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="flex items-end justify-between mb-14">

          <div>
            <p className="text-blue-400 font-semibold mb-3">
              PRODUCT CATEGORIES
            </p>

            <h2 className="text-5xl font-black">
              Designed for
              <span className="text-blue-400"> modern spaces.</span>
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* PVC */}
          <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

            <div className="h-72 bg-gradient-to-br from-blue-500/30 to-blue-900/30" />

            <div className="p-8">

              <h3 className="text-3xl font-black">
                PVC Windows
              </h3>

              <p className="mt-4 text-blue-100/60 leading-relaxed">
                High efficiency Salamander and Rehau systems with modern German engineering.
              </p>

              <div className="flex items-center justify-between mt-8">

                <span className="text-blue-400 font-bold">
                  from €299
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

          {/* ALU */}
          <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

            <div className="h-72 bg-gradient-to-br from-slate-500/30 to-slate-900/30" />

            <div className="p-8">

              <h3 className="text-3xl font-black">
                Aluminium
              </h3>

              <p className="mt-4 text-blue-100/60 leading-relaxed">
                Minimalist premium aluminium systems for luxury architecture.
              </p>

              <div className="flex items-center justify-between mt-8">

                <span className="text-blue-400 font-bold">
                  from €599
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

          {/* WOOD */}
          <div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

            <div className="h-72 bg-gradient-to-br from-amber-700/30 to-yellow-900/30" />

            <div className="p-8">

              <h3 className="text-3xl font-black">
                Wood Systems
              </h3>

              <p className="mt-4 text-blue-100/60 leading-relaxed">
                Warm premium wood solutions with outstanding acoustic insulation.
              </p>

              <div className="flex items-center justify-between mt-8">

                <span className="text-blue-400 font-bold">
                  from €799
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

          {/* BALCONY */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-cyan-500/20 to-blue-900/30" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Balcony Doors
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Elegant balcony systems with premium thermal insulation and modern aesthetics.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>

{/* SLIDING */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-slate-400/20 to-slate-900/40" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Sliding Systems
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Lift and slide premium systems for panoramic openings and luxury spaces.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>

{/* ENTRANCE */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-blue-900/40 to-black/40" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Entrance Doors
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Secure and elegant entrance solutions with premium German hardware.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>

{/* PERGOLAS */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-amber-500/20 to-orange-900/30" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Pergolas
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Modern outdoor pergolas designed for contemporary architecture.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>

{/* GARAGE */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-zinc-400/20 to-zinc-900/40" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Garage Doors
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Automated garage systems with thermal insulation and smart operation.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>

{/* SHUTTERS */}

<div className="group rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all">

  <div className="h-72 bg-gradient-to-br from-neutral-500/20 to-neutral-900/40" />

  <div className="p-8">

    <h3 className="text-3xl font-black">
      Roller Shutters
    </h3>

    <p className="mt-4 text-blue-100/60 leading-relaxed">
      Premium external shutter systems for security, privacy and insulation.
    </p>

    <div className="mt-8">

      <Link
  href="/configurator"
  className="inline-flex px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold"
>
  Configure
</Link>

    </div>

  </div>

</div>
        </div>

      </section>

    </main>
  );
}