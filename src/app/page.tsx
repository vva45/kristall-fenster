import Link from "next/link"
import Navbar from "@/components/Navbar"

const categories = [
  {
    title: "WINDOWS",
    image: "/categories/windows.jpg",
    href: "/windows",
    description:
      "Premium PVC, Aluminium, Steel and Wood window systems.",
  },

  {
    title: "DOORS",
    image: "/categories/doors.jpg",
    href: "/doors",
    description:
      "Elegant entrance and side entrance door systems.",
  },

  {
    title: "PATIO DOORS",
    image: "/categories/patio-doors.jpg",
    href: "/patio-doors",
    description:
      "Sliding, lift-slide and folding panoramic solutions.",
  },

  {
    title: "GARAGE DOORS",
    image: "/categories/garage-doors.jpg",
    href: "/garage-doors",
    description:
      "Sectional, roller and industrial garage systems.",
  },

  {
    title: "ACCESSORIES",
    image: "/categories/accessories.jpg",
    href: "/accessories",
    description:
      "Roller shutters, blinds, hardware and accessories.",
  },
]

export default function Home() {

  return (

    <main className="min-h-screen bg-[#020817] text-white overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#031225] to-[#041a38]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_50%)]" />

        <div className="relative max-w-[1700px] mx-auto px-8 py-32">

          <div className="max-w-5xl">

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 mb-8">

              <div className="w-2 h-2 rounded-full bg-blue-400" />

              German Engineering Premium Systems

            </div>

            <h1 className="text-[90px] leading-[0.9] font-black tracking-tight">

              KRISTALL

              <span className="block text-blue-400">

                FENSTER

              </span>

            </h1>

            <p className="mt-8 text-xl text-white/60 max-w-3xl leading-relaxed">

              Premium German windows, doors and architectural systems
              with modern design, outstanding thermal performance and
              professional online configuration.

            </p>

            <div className="flex flex-wrap gap-4 mt-12">

              <Link
                href="/configurator"
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold shadow-[0_0_40px_rgba(37,99,235,0.4)]"
              >

                Open Configurator

              </Link>

              <Link
                href="/windows"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold"
              >

                Explore Products

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-[1700px] mx-auto px-8 pt-20">

        <div className="grid md:grid-cols-4 gap-10">

          {[
            {
              title: "GERMAN ENGINEERING",
              text: "Precision and innovation",
            },

            {
              title: "PREMIUM QUALITY",
              text: "High-end materials",
            },

            {
              title: "ENERGY EFFICIENCY",
              text: "Maximum thermal insulation",
            },

            {
              title: "SECURITY FIRST",
              text: "Advanced protection systems",
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

                <h3 className="font-bold text-white">

                  {item.title}

                </h3>

                <p className="text-white/40 text-sm mt-1">

                  {item.text}

                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-[1700px] mx-auto px-8 py-20">

        <div className="flex items-end justify-between mb-14">

          <div>

            <p className="text-blue-400 font-semibold mb-3">

              PRODUCT CATEGORIES

            </p>

            <h2 className="text-6xl font-black">

              Designed for

              <span className="text-blue-400">

                {" "}modern spaces.

              </span>

            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {categories.map((category) => (

            <Link
              key={category.title}
              href={category.href}
              className="group relative h-[520px] rounded-[32px] overflow-hidden border border-white/10 bg-[#041226]"
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

              {/* HOVER GLOW */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/10 transition-all duration-500" />

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 right-0 p-8">

                <div className="w-12 h-[3px] bg-blue-500 mb-6" />

                <h3 className="text-[34px] leading-none font-black mb-5">

                  {category.title}

                </h3>

                <p className="text-white/70 text-[17px] leading-relaxed mb-8">

                  {category.description}

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