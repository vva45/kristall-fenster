"use client";

/**
 * Navegación del laboratorio: Katalog (con las gamas REALES de
 * Kamika en el desplegable) y Konfigurator. Antes había aquí un
 * mega-menú inventado (Steel Windows, Wood Windows, Request a
 * Quote…) que no correspondía a ningún producto real.
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categoriesOrdered } from "../../lib/catalog";
import { pick, useLocale } from "../../lib/i18n";
import { CS } from "../../lib/catalog-strings";
import { LocaleSwitch } from "../LocaleSwitch";
import { COMPANY } from "../../lib/company";

/* Contacto REAL de Kamika (src/data/company.ts de la web principal) —
   el laboratorio no inventa teléfonos como hacía el prototipo. */
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
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const catalogueButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLocale();

  const closeMenus = () => {
    setCatalogueOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (!catalogueOpen && !mobileOpen) return;
      const returnFocus = mobileOpen ? mobileButtonRef.current : catalogueButtonRef.current;
      setCatalogueOpen(false);
      setMobileOpen(false);
      window.requestAnimationFrame(() => returnFocus?.focus());
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [catalogueOpen, mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-kamika-mist bg-white/95 backdrop-blur-xl print:hidden"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setCatalogueOpen(false);
      }}
      onMouseLeave={() => setCatalogueOpen(false)}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex h-[64px] items-center justify-between gap-4 md:h-[78px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 md:gap-4" onClick={closeMenus}>
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

          <button
            ref={mobileButtonRef}
            id="mobile-menu-button"
            type="button"
            aria-label={pick(CS.navMenu, locale)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-kamika border border-kamika-mist md:hidden"
          >
            <span className="sr-only">{pick(CS.navMenu, locale)}</span>
            <span aria-hidden className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-kamika-ink" />
              <span className="block h-0.5 w-5 bg-kamika-ink" />
              <span className="block h-0.5 w-5 bg-kamika-ink" />
            </span>
          </button>

          <nav className="hidden h-full items-center md:flex" aria-label={pick(CS.navMenu, locale)}>
            <div
              className="relative flex h-full items-center"
              onMouseEnter={() => setCatalogueOpen(true)}
            >
              <Link
                href="/catalog"
                className="relative flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] uppercase text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
                onClick={closeMenus}
              >
                {pick(CS.navCatalogue, locale)}
                {catalogueOpen && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-kamika-steel md:inset-x-5" />}
              </Link>
              <button
                ref={catalogueButtonRef}
                id="catalogue-menu-button"
                type="button"
                aria-label={pick(CS.navOpenCatalogue, locale)}
                aria-expanded={catalogueOpen}
                aria-controls="catalogue-menu"
                onClick={() => setCatalogueOpen((value) => !value)}
                className="-ml-3 mr-2 rounded p-2 text-kamika-ink/60 hover:text-kamika-steel"
              >
                <span aria-hidden>⌄</span>
              </button>
            </div>
            <Link
              href="/configurator"
              className="flex h-full items-center px-3 text-[12px] font-bold tracking-[0.08em] uppercase text-kamika-ink/70 transition-colors hover:text-kamika-steel md:px-5"
              onClick={closeMenus}
            >
              {pick(CS.navConfigurator, locale)}
            </Link>

            {/* Idioma y contacto directo, como en la barra de Kamika. */}
            <div className="ml-4 flex items-center gap-4">
              <LocaleSwitch />
              <a
                href={COMPANY.phoneHref}
                className="hidden items-center gap-2 font-mono text-[0.8125rem] text-kamika-steel hover:text-kamika-ink lg:flex"
              >
                <PhoneIcon />
                {COMPANY.phone}
              </a>
              <a
                href="/contact"
                className="hidden rounded-kamika bg-kamika-steel px-4 py-2 text-sm font-medium text-kamika-paper motion-safe:transition-opacity hover:opacity-85 sm:block"
              >
                {pick(CS.navContact, locale)}
              </a>
            </div>
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="border-t border-kamika-mist bg-white px-4 py-4 md:hidden">
          <div className="grid gap-1">
            <Link href="/catalog" onClick={closeMenus} className="rounded-kamika px-3 py-2.5 font-medium">
              {pick(CS.navCatalogue, locale)}
            </Link>
            <div className="grid grid-cols-2 gap-1 border-l-2 border-kamika-blue pl-3">
              {categoriesOrdered().map((category) => (
                <Link
                  key={category.slug}
                  href={`/catalog/${category.slug}`}
                  onClick={closeMenus}
                  className="rounded-kamika px-2 py-2 text-sm text-kamika-ink/70"
                >
                  {pick(category.name, locale)}
                </Link>
              ))}
            </div>
            <Link href="/configurator" onClick={closeMenus} className="mt-2 rounded-kamika px-3 py-2.5 font-medium">
              {pick(CS.navConfigurator, locale)}
            </Link>
            <div className="mt-3 flex items-center justify-between border-t border-kamika-mist pt-4">
              <LocaleSwitch />
              <Link href="/contact" onClick={closeMenus} className="rounded-kamika bg-kamika-steel px-4 py-2 text-sm font-medium text-white">
                {pick(CS.navContact, locale)}
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Desplegable de escritorio: las ocho gamas reales. */}
      {catalogueOpen && (
        <div
          id="catalogue-menu"
          className="hidden border-t border-kamika-mist bg-kamika-blue-50 md:block"
          onMouseEnter={() => setCatalogueOpen(true)}
          onMouseLeave={() => setCatalogueOpen(false)}
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-10 gap-y-3 px-8 py-6">
            {categoriesOrdered().map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="text-sm text-kamika-ink/80 transition-colors hover:text-kamika-steel"
                onClick={closeMenus}
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
