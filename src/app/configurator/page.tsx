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
import { LocaleProvider } from "../../lib/i18n";

export const metadata: Metadata = {
  title: "Fenster-Konfigurator — Kamika Labor",
  description:
    "Window configurator prototype with real profile systems and colour charts. Example prices only.",
};

export default function ConfiguratorPage() {
  return (
    <main className="flex-1">
      <LocaleProvider>
        <ConfiguratorApp />
      </LocaleProvider>
    </main>
  );
}
