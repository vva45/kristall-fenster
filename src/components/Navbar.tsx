import Link from "next/link"

export default function Navbar() {

  return (

    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020b1d]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black shadow-2xl shadow-blue-500/30">
              K
            </div>

            <div>

              <h2 className="text-2xl font-black tracking-wide">
                KRISTALL FENSTER
              </h2>

              <p className="text-sm text-white/40">
                Premium Windows Germany
              </p>

            </div>

          </Link>

          {/* MENU */}

          <nav className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="text-white/70 hover:text-white transition-all"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-white/70 hover:text-white transition-all"
            >
              Products
            </Link>

            <Link
              href="/configurator"
              className="text-white/70 hover:text-white transition-all"
            >
              Configurator
            </Link>

            <Link
              href="/contact"
              className="text-white/70 hover:text-white transition-all"
            >
              Contact
            </Link>

          </nav>

          {/* BUTTON */}

          <Link
            href="/configurator"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-xl shadow-blue-500/20"
          >
            Configure
          </Link>

        </div>

      </div>

    </header>

  )
}