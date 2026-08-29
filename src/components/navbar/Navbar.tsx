"use client";

/**
 * Navegación del laboratorio: Katalog (con las gamas REALES de
 * Kamika en el desplegable) y Konfigurator. Antes había aquí un
 * mega-menú inventado (Steel Windows, Wood Windows, Request a
 * Quote…) que no correspondía a ningún producto real.
 */
import Link from "next/link";
import { useState } from "react";
import { categoriesOrdered } from "../../lib/catalog";
import { pick, useLocale } from "../../lib/i18n";
import { CS } from "../../lib/catalog-strings";
import { LocaleSwitch } from "../LocaleSwitch";

/* Contacto REAL de Kamika (src/data/company.ts de la web principal) —
   el laboratorio no inventa teléfonos como hacía el prototipo. */
const PHONE = "+49 162 774 2992";
const PHONE_HREF = `tel:${PHONE.replace(/\s+/g, "")}`;
const EMAIL_HREF = "mailto:kamika.bauelemente@gmail.com";

/** El icono de teléfono de Kamika: trazo 1.5, hereda el color. */
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-4"
  >
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-kamika-mist bg-white/95 backdrop-blur-xl print:hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        {/* En móvil no hay menú burger: la fila de enlaces baja a una
            segunda línea (flex-wrap) en vez de solaparse con el logo. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 py-2.5 md:h-[78px] md:flex-nowrap md:py-0">
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

          <nav
            className="flex h-11 w-full items-center md:h-full md:w-auto"
            onMouseLeave={() => setOpen(false)}
          >
            <div className="relative flex h-full items-center" onMouseEnter={() => setOpen(true)}>
              <Link
                href="/catalog"
                className="relative flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] uppercase text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
              >
                {pick(CS.navCatalogue, locale)}
                {open && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-kamika-steel md:inset-x-5" />}
              </Link>
            </div>
            <Link
              href="/configurator"
              className="flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] uppercase text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
            >
              {pick(CS.navConfigurator, locale)}
            </Link>

            {/* Idioma y contacto directo, como en la barra de Kamika. */}
            <div className="ml-auto flex items-center gap-4 md:ml-4">
              <LocaleSwitch />
              <a
                href={PHONE_HREF}
                className="hidden items-center gap-2 font-mono text-[0.8125rem] text-kamika-steel hover:text-kamika-ink lg:flex"
              >
                <PhoneIcon />
                {PHONE}
              </a>
              <a
                href={EMAIL_HREF}
                className="hidden rounded-kamika bg-kamika-steel px-4 py-2 text-sm font-medium text-kamika-paper motion-safe:transition-opacity hover:opacity-85 sm:block"
              >
                {pick(CS.navContact, locale)}
              </a>
            </div>
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
                {pick(category.name, locale)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
