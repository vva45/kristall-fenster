"use client";

/**
 * Navegación del laboratorio: Katalog (con las gamas REALES de
 * Kamika en el desplegable) y Konfigurator. Antes había aquí un
 * mega-menú inventado (Steel Windows, Wood Windows, Request a
 * Quote…) que no correspondía a ningún producto real.
 */
import Link from "next/link";
import { useState } from "react";
import { categoriesOrdered, de } from "../../lib/catalog";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-kamika-mist bg-white/95 backdrop-blur-xl print:hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex h-[64px] items-center justify-between gap-6 md:h-[78px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] bg-kamika-ink text-base font-black text-white shadow-[3px_3px_0_var(--kamika-blue)] md:h-11 md:w-11 md:text-xl md:shadow-[4px_4px_0_var(--kamika-blue)]">
              K
            </div>
            <div className="min-w-0 leading-tight">
              <strong className="block whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em] text-kamika-ink md:text-[22px]">
                KRISTALL FENSTER
              </strong>
              <span className="mt-1 block whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.13em] text-kamika-steel md:text-[10px] md:tracking-[0.16em]">
                Konfigurator-Labor
              </span>
            </div>
          </Link>

          <nav className="flex h-full items-center" onMouseLeave={() => setOpen(false)}>
            <div className="relative flex h-full items-center" onMouseEnter={() => setOpen(true)}>
              <Link
                href="/catalog"
                className="relative flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
              >
                KATALOG
                {open && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-kamika-steel md:inset-x-5" />}
              </Link>
            </div>
            <Link
              href="/configurator"
              className="flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
            >
              KONFIGURATOR
            </Link>
          </nav>
        </div>
      </div>

      {/* Desplegable: las ocho gamas reales. */}
      {open && (
        <div
          className="hidden border-t border-kamika-mist bg-kamika-blue-50 lg:block"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-10 gap-y-3 px-8 py-6">
            {categoriesOrdered().map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="text-sm text-kamika-ink/80 transition-colors hover:text-kamika-steel"
                onClick={() => setOpen(false)}
              >
                {de(category.name)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
