import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { LocaleProvider } from "../lib/i18n";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Kristall Fenster — Konfigurator-Labor",
  description:
    "Development playground for the Kamika window configurator. Prices on request.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Reading the nonce opts the tree into request-time rendering, allowing
  // Next.js to attach Proxy's per-request nonce to its bootstrap scripts.
  await headers();
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* Proveedor de idioma GLOBAL: los botoncitos del navbar valen
            para todo — catálogo, home y configurador. Es un componente
            de cliente, pero children llega como slot del servidor, así
            que las páginas siguen prerenderizadas. */}
        <LocaleProvider>
          <Navbar />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
