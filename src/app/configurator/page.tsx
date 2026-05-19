import Navbar from "@/components/Navbar"
import Configurator from "@/components/Configurator"

export default function ConfiguratorPage() {

  return (

    <main className="min-h-screen bg-[#020b1d] text-white">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-16">

          <p className="text-blue-400 font-semibold mb-4">
            LIVE CONFIGURATOR
          </p>

          <h1 className="text-6xl font-black leading-none">

            Build your
            <span className="text-blue-400">
              {" "}perfect system.
            </span>

          </h1>

          <p className="mt-8 text-xl text-blue-100/60 max-w-2xl leading-relaxed">

            Configure premium German windows with real-time
            visualization, dimensions and dynamic pricing.

          </p>

        </div>

        <Configurator />

      </section>

    </main>
  )
}