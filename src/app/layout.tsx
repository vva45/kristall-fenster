import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { LocaleProvider } from "../lib/i18n";

/*
 * Las tres tipografías de Kamika, con los mismos nombres de variable
 * que en la web principal (--font-outfit / --font-inter /
 * --font-plex-mono): así el configurador se muda allí sin tocar CSS.
 */
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
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
