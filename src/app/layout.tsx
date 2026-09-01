import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { LocaleProvider } from "../lib/i18n";

/*
 * Fuentes autoalojadas con los mismos nombres de variable que usa la
 * web principal (--font-outfit / --font-inter / --font-plex-mono): así
 * el configurador se muda allí sin tocar CSS y el build no usa red.
 * Este laboratorio reutiliza los archivos Geist/Geist Mono incluidos
 * en la dependencia Next.js, sin añadir binarios al repositorio.
 */
const outfit = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-outfit",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const inter = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const plexMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Kristall Fenster — Konfigurator-Labor",
  description:
    "Development playground for the Kamika window configurator. Example prices only.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${outfit.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Proveedor de idioma GLOBAL: los botoncitos del navbar valen
            para todo — catálogo, home y configurador. Es un componente
            de cliente, pero children llega como slot del servidor, así
            que las páginas siguen prerenderizadas. */}
        <LocaleProvider>
          <Navbar />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
