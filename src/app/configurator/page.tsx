/**
 * /configurator — el configurador de ventanas, reconstruido en React.
 *
 * Antes: un shell de ids + un script vanilla de 1300 líneas
 * manipulando el DOM (el prototipo). Ahora: estado tipado en
 * componentes de verdad, datos reales de Kamika y precios de ejemplo
 * claramente marcados (data/configurator/pricing.ts).
 */
import type { Metadata } from "next";
import { ConfiguratorApp } from "../../components/configurator/ConfiguratorApp";

export const metadata: Metadata = {
  title: "Fenster-Konfigurator — Kamika Labor",
  description:
    "Window configurator with real profile systems and colour charts. Prices on request.",
};

export default async function ConfiguratorPage({ searchParams }: { searchParams: Promise<{ system?: string | string[] }> }) {
  const requested = (await searchParams).system;
  // El LocaleProvider vive en el layout raíz: el idioma se elige con
  // los botoncitos del navbar y vale para todo el laboratorio.
  return (
    <main className="flex-1">
      <ConfiguratorApp initialSystemId={typeof requested === "string" ? requested : undefined} />
    </main>
  );
}
