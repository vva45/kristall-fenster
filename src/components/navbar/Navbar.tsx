"use client"

import Link from "next/link"
import { useState } from "react"

const items = [
  { id: "windows", label: "WINDOWS", href: "/windows" },
  { id: "doors", label: "DOORS", href: "/doors" },
  { id: "patio", label: "PATIO DOORS", href: "/patio-doors" },
  { id: "garage", label: "GARAGE DOORS", href: "/garage-doors" },
  { id: "accessories", label: "ACCESSORIES", href: "/accessories" },
  { id: "contact", label: "CONTACT", href: "/contact" },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce3eb] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex h-[64px] items-center justify-between gap-8 md:h-[78px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] bg-[#0f1114] text-base font-black text-white shadow-[3px_3px_0_#afc9ef] md:h-11 md:w-11 md:text-xl md:shadow-[4px_4px_0_#afc9ef]">K</div>
            <div className="min-w-0 leading-tight">
              <strong className="block whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em] text-[#0f1114] md:text-[22px]">KRISTALL FENSTER</strong>
              <span className="mt-1 block whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.13em] text-[#2f4c74] md:text-[10px] md:tracking-[0.16em]">Premium German Systems</span>
            </div>
          </Link>

          <nav className="hidden h-full items-center lg:flex" onMouseLeave={() => setActiveMenu(null)}>
            {items.map((item) => (
              <div key={item.id} className="relative flex h-full items-center" onMouseEnter={() => setActiveMenu(item.id)}>
                <Link href={item.href} className="relative flex h-full items-center px-5 text-[12px] font-bold tracking-[0.08em] text-[#0f1114]/70 transition-colors hover:text-[#2f4c74]">
                  {item.label}
                  {activeMenu === item.id && <span className="absolute inset-x-5 bottom-0 h-[3px] bg-[#2f4c74]" />}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {activeMenu && activeMenu !== "contact" && (
        <div className="hidden border-t border-[#e4e9f0] bg-[#f0f5fc] lg:block" onMouseEnter={() => setActiveMenu(activeMenu)} onMouseLeave={() => setActiveMenu(null)}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-10 px-8 py-8">
            <div><p className="kamika-eyebrow">Windows</p><div className="mt-4 grid gap-3 text-sm"><Link href="/windows/pvc" className="hover:text-[#2f4c74]">PVC Windows</Link><Link href="/windows/aluminium" className="hover:text-[#2f4c74]">Aluminium Windows</Link><Link href="/windows/steel" className="hover:text-[#2f4c74]">Steel Windows</Link><Link href="/windows/wood" className="hover:text-[#2f4c74]">Wood Windows</Link></div></div>
            <div><p className="kamika-eyebrow">Doors</p><div className="mt-4 grid gap-3 text-sm"><Link href="/doors">Front Doors</Link><Link href="/garage-doors">Garage Doors</Link><Link href="/doors">Side Entrance Doors</Link></div></div>
            <div><p className="kamika-eyebrow">Patio</p><div className="mt-4 grid gap-3 text-sm"><Link href="/patio-doors">Balcony Doors</Link><Link href="/patio-doors">Sliding Systems</Link><Link href="/patio-doors">Lift & Slide</Link></div></div>
            <div><p className="kamika-eyebrow">Tools</p><div className="mt-4 grid gap-3 text-sm"><Link href="/configurator" className="font-semibold text-[#2f4c74]">Open Configurator →</Link><Link href="/accessories">Accessories</Link><Link href="/contact">Request a Quote</Link></div></div>
          </div>
        </div>
      )}
    </header>
  )
}
