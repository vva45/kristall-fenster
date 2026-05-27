"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

  const [activeMenu, setActiveMenu] =
    useState<string | null>(null)

  const [activeSubmenu, setActiveSubmenu] =
    useState<string | null>(null)

  return (

    <header
      className="sticky top-0 z-50 bg-[#020817]/95 backdrop-blur-2xl border-b border-blue-500/10"
    >

      {/* TOP NAVBAR */}

      <div className="max-w-[1600px] mx-auto px-12">

        <div className="h-[92px] flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4 shrink-0"
          >

            <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_35px_rgba(37,99,235,0.45)]">

              K

            </div>

            <div className="leading-tight">

              <h1 className="text-[28px] font-black tracking-wide text-white">
                KRISTALL FENSTER
              </h1>

              <p className="text-sm text-white/35">
                Premium German Systems
              </p>

            </div>

          </Link>

          {/* NAVIGATION */}

          <nav
  className="hidden xl:flex items-center h-full relative"
  onMouseLeave={() => {
    setActiveMenu(null)
    setActiveSubmenu(null)
  }}
>

            {[
              {
  id: "windows",
  label: "WINDOWS",
  href: "/windows",
  width: "90px",
},
{
  id: "doors",
  label: "DOORS",
  href: "/doors",
  width: "90px",
},
{
  id: "patio",
  label: "PATIO DOORS",
  href: "/patio-doors",
  width: "120px",
},
{
  id: "garage",
  label: "GARAGE DOORS",
  href: "/garage-doors",
  width: "140px",
},
{
  id: "accessories",
  label: "ACCESSORIES",
  href: "/accessories",
  width: "130px",
},
{
  id: "contact",
  label: "CONTACT",
  href: "/contact",
  width: "90px",
},
            ].map((item) => (

              <div
  key={item.id}
  className="relative h-full flex items-center"
  onMouseEnter={() => setActiveMenu(item.id)}
>

                <Link
                href={item.href}
  className={`relative h-full px-8 flex items-center text-[15px] font-semibold tracking-wide transition-all ${
    activeMenu === item.id
      ? "text-blue-400"
      : "text-white/70 hover:text-white"
  }`}
>

                  {item.label}

                  {activeMenu === item.id && (

                    <>
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.95)]"
                        style={{
                          width: item.width,
                        }}
                      />

                      <div className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.95)]" />
                    </>

                  )}

                </Link>

              </div>

            ))}

          </nav>

        </div>

      </div>

      {/* MEGA MENU */}

{activeMenu && (

        <div
          className="border-t border-blue-500/10 bg-[#041022]/98 backdrop-blur-3xl shadow-[0_15px_60px_rgba(0,0,0,0.6)]"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => {
            setActiveMenu(null)
            setActiveSubmenu(null)
          }}
        >

          <div className="max-w-[1600px] mx-auto px-12 py-10">

            <div className="grid grid-cols-5 gap-12">

              {/* WINDOWS */}

              <div className="border-r border-white/5 pr-10">

                <h3 className="text-white text-[15px] font-black tracking-wide uppercase mb-8 relative inline-block">

                  Windows

                  <div className="absolute -bottom-3 left-0 w-16 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.95)]" />

                </h3>

                <div className="space-y-5 pt-2">

                  <Link
                    href="/windows/pvc"
                    className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                  >
                    PVC Windows
                  </Link>

                  <Link
                    href="/windows/aluminium"
                    className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                  >
                    Aluminium Windows
                  </Link>

                  <Link
                    href="/windows/steel"
                    className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                  >
                    Steel Windows
                  </Link>

                  <Link
                    href="/windows/wood"
                    className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                  >
                    Wood Windows
                  </Link>

                </div>

              </div>

              {/* DOORS */}

              <div className="border-r border-white/5 pr-10 relative z-30">

                <h3 className="text-white text-[15px] font-black tracking-wide uppercase mb-8 relative inline-block">

                  Doors

                  <div className="absolute -bottom-3 left-0 w-16 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.95)]" />

                </h3>

                <div className="space-y-5 pt-2">

                  <Link
  href="/doors"
  className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
>
  Front Doors
</Link>

                  <Link
  href="/garage-doors"
  className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
>
  Garage Doors
</Link>

                  {/* SIDE ENTRANCE */}

                  {/* SIDE ENTRANCE */}

<div
  className="relative"
  onMouseEnter={() => setActiveSubmenu("side")}
  onMouseLeave={() => setActiveSubmenu(null)}
>

  <div className="flex items-center justify-between text-[17px] text-white/75 hover:text-blue-400 transition-all cursor-pointer">

    <span>
      Side Entrance Doors
    </span>

    <span className="text-blue-400">
      ›
    </span>

  </div>

  {activeSubmenu === "side" && (

    <div className="absolute left-full top-0 ml-5 z-[999]">

      <div className="w-[240px] rounded-[24px] border border-white/5 bg-[#071827]/98 backdrop-blur-2xl p-6 shadow-[0_10px_45px_rgba(0,0,0,0.45)]">

        <div className="space-y-5">

          <Link
            href="/doors/pvc"
            className="block text-[16px] text-white/70 hover:text-blue-400 transition-all"
          >
            › PVC
          </Link>

          <Link
            href="/doors/aluminium"
            className="block text-[16px] text-white/70 hover:text-blue-400 transition-all"
          >
            › Aluminium
          </Link>

          <Link
            href="/doors/steel"
            className="block text-[16px] text-white/70 hover:text-blue-400 transition-all"
          >
            › Steel
          </Link>

          <Link
            href="/doors/wood"
            className="block text-[16px] text-white/70 hover:text-blue-400 transition-all"
          >
            › Wood
          </Link>

        </div>

      </div>

    </div>

  )}

</div>

                </div>

              </div>

              {/* PATIO */}

              <div className="border-r border-white/5 pr-10 relative z-20">

                <h3 className="text-white text-[15px] font-black tracking-wide uppercase mb-8 relative inline-block">

                  Patio Doors

                  <div className="absolute -bottom-3 left-0 w-16 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.95)]" />

                </h3>

                <div className="space-y-5 pt-2">

                  {[
                    "Balcony Doors",
                    "Parallel Sliding Tilt Doors",
                    "Lift and Slide Doors",
                    "Folding Sliding Doors",
                  ].map((item) => (

                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() =>
                        setActiveSubmenu(item)
                      }
                    >

                      <div className="flex items-center justify-between text-[17px] text-white/75 hover:text-blue-400 transition-all cursor-pointer">

                        <span>
                          {item}
                        </span>

                        <span className="text-blue-400">
                          ›
                        </span>

                      </div>

                      {activeSubmenu === item && (

                        <div
                          className="absolute left-full top-0 ml-5 z-50"
                          onMouseEnter={() =>
                            setActiveSubmenu(item)
                          }
                          onMouseLeave={() =>
                            setActiveSubmenu(null)
                          }
                        >

                          <div className="w-[240px] rounded-[24px] border border-white/5 bg-[#071827]/98 backdrop-blur-2xl p-6 shadow-[0_10px_45px_rgba(0,0,0,0.45)]">

                            <div className="space-y-5">

                              {[
                                "PVC",
                                "Aluminium",
                                "Steel",
                                "Wood",
                              ].map((material) => (

                                <Link
                                  key={material}
                                 href="/patio-doors"
                                  className="block text-[16px] text-white/70 hover:text-blue-400 transition-all"
                                >
                                  › {material}
                                </Link>

                              ))}

                            </div>

                          </div>

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              </div>

              {/* GARAGE */}

              <div className="border-r border-white/5 pr-10">

                <h3 className="text-white text-[15px] font-black tracking-wide uppercase mb-8 relative inline-block">

                  Garage Doors

                  <div className="absolute -bottom-3 left-0 w-16 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.95)]" />

                </h3>

                <div className="space-y-5 pt-2">

                  {[
                    "Sectional Doors",
                    "Roller Doors",
                    "Swing Gates",
                    "Industrial Doors",
                    "Roller Shutter",
                  ].map((item) => (

                    <Link
                      key={item}
                      href="/garage-doors"
                      className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                    >
                      {item}
                    </Link>

                  ))}

                </div>

              </div>

              {/* ACCESSORIES */}

              <div>

                <h3 className="text-white text-[15px] font-black tracking-wide uppercase mb-8 relative inline-block">

                  Accessories

                  <div className="absolute -bottom-3 left-0 w-16 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.95)]" />

                </h3>

                <div className="space-y-5 pt-2">

                  {[
                    "Roller Shutter",
                    "Top-Mounted Roller Shutter",
                    "Exterior Roller Shutter",
                    "Venetian Blinds",
                    "Canopies",
                    "Window Sill",
                    "Window Handles / Door Hardware",
                    "Window Ventilation System",
                    "Insect Protection",
                    "Double Wire Fence",
                    "Additional Profiles",
                    "Mounting Material",
                  ].map((item) => (

                    <Link
                      key={item}
                      href="/accessories"
                      className="block text-[17px] text-white/75 hover:text-blue-400 transition-all"
                    >
                      {item}
                    </Link>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </header>

  )
}