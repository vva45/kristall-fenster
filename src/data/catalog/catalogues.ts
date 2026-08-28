/**
 * COPIA LITERAL de kamika-bauelemente (src/data). No editar aquí:
 * si el catálogo cambia, se vuelve a copiar de allí. Al mudar el
 * laboratorio a Kamika, este archivo sobra.
 */
/**
 * Catálogos REALES, los que envió el proveedor. Ya no son de ejemplo.
 *
 * Título, año, número de páginas y peso están leídos del propio PDF, no
 * estimados. Si se sustituye un fichero hay que volver a leerlos: el
 * peso lo ve el visitante antes de descargar y el número de páginas
 * sale en la tarjeta.
 *
 * Seis son de puertas de entrada y tres de persianas. Todavía no hay
 * catálogo de ventanas —esa gama va por fabricante y ficha de sistema—
 * ni del resto de gamas.
 *
 * Los tres últimos en llegar (D-ART LINE, Außentüren y el de persianas
 * con raffstoren e insectos) vienen del mismo fabricante, que vende
 * también directamente en Alemania. Se publican sin su marca: ver
 * `scripts/prepare_drutex.py`, que es quien deja el PDF así y hay que
 * volver a ejecutar si el proveedor manda una versión nueva.
 *
 * ⚠️ Los nombres de marca (ROKA, Despiro, Aluprof) no se traducen nunca.
 *
 * Nota sobre `entrance-door-panels`: el PDF llegó rotulado con el
 * logotipo de OTRA empresa del sector en la primera página — no el del
 * fabricante, que es Aluprof según confirmó el dueño, sino el de un
 * competidor local. Se sustituyó por el de Kamika dentro del propio
 * fichero —reemplazando los datos de la imagen, no tapándola, así que
 * el logo ajeno ya no existe en el PDF— y se limpiaron los metadatos.
 * Si el proveedor manda una versión nueva, hay que repetir la operación
 * ANTES de publicarla: en esta web no puede aparecer la marca de un
 * competidor.
 */
import type { Catalogue } from "./types";

export const CATALOGUES: Catalogue[] = [
  {
    id: "roka-signature-2025",
    title: { en: "ROKA Signature — entrance doors", de: "ROKA Signature — Haustüren", pl: "ROKA Signature — drzwi zewnętrzne", },
    brand: "ROKA",
    collection: { en: "Signature", de: "Signature", pl: "Signature", },
    category: "entrance-doors",
    file: "/pdf/catalogues/roka-signature-2025.pdf",
    cover: "/images/catalogues/roka-signature-2025-cover.jpg",
    pages: 298,
    sizeMb: 25.0,
    year: 2025,
  },
  {
    id: "roka-select-2025",
    title: { en: "ROKA Select — entrance doors", de: "ROKA Select — Haustüren", pl: "ROKA Select — drzwi zewnętrzne", },
    brand: "ROKA",
    collection: { en: "Select", de: "Select", pl: "Select", },
    category: "entrance-doors",
    file: "/pdf/catalogues/roka-select-2025.pdf",
    cover: "/images/catalogues/roka-select-2025-cover.jpg",
    pages: 23,
    sizeMb: 11.3,
    year: 2025,
  },
  {
    id: "despiro-entrance-doors",
    title: { en: "Despiro entrance doors", de: "Despiro Haustüren", pl: "Drzwi zewnętrzne Despiro", },
    brand: "Despiro",
    collection: { en: "Entrance doors", de: "Haustüren", pl: "Drzwi zewnętrzne", },
    category: "entrance-doors",
    file: "/pdf/catalogues/despiro-entrance-doors.pdf",
    cover: "/images/catalogues/despiro-entrance-doors-cover.jpg",
    pages: 37,
    sizeMb: 5.2,
    year: 2025,
  },
  {
    id: "entrance-door-panels",
    title: { en: "Aluprof entrance door panels", de: "Aluprof Haustür-Paneele", pl: "Panele drzwiowe Aluprof", },
    // Estuvo sin marca mientras no constaba el fabricante; el dueño
    // confirmó que es Aluprof (2026-08). El logotipo que traía el PDF
    // era de un competidor, no de Aluprof — ver la nota de arriba.
    brand: "Aluprof",
    collection: { en: "Door panels", de: "Haustür-Paneele", pl: "Panele drzwiowe", },
    category: "entrance-doors",
    file: "/pdf/catalogues/entrance-door-panels.pdf",
    cover: "/images/catalogues/entrance-door-panels-cover.jpg",
    pages: 194,
    sizeMb: 16.1,
    year: 2025,
  },
  {
    id: "d-art-line",
    title: { en: "D-ART LINE — door collection", de: "D-ART LINE Türenkollektion", pl: "D-ART LINE — kolekcja drzwi", },
    // Sin marca, por el mismo motivo que los dos catálogos de persianas
    // de abajo: el fabricante vende también directo en Alemania. El
    // nombre de la línea sí se mantiene —va impreso en la portada y en
    // el pie de cada modelo, y cambiarlo dejaría la web diciendo una
    // cosa y el PDF otra.
    collection: { en: "D-ART LINE", de: "D-ART LINE", pl: "D-ART LINE", },
    category: "entrance-doors",
    file: "/pdf/catalogues/d-art-line-turenkollektion.pdf",
    cover: "/images/catalogues/d-art-line-cover.jpg",
    pages: 24,
    sizeMb: 8.4,
    year: 2026,
  },
  {
    id: "aussenturen",
    title: { en: "Exterior doors — product catalogue", de: "Außentüren Produktkatalog", pl: "Drzwi zewnętrzne — katalog produktów", },
    collection: { en: "Exterior doors", de: "Außentüren", pl: "Drzwi zewnętrzne", },
    category: "entrance-doors",
    file: "/pdf/catalogues/aussenturen-produktkatalog.pdf",
    cover: "/images/catalogues/aussenturen-cover.jpg",
    pages: 56,
    sizeMb: 14.3,
    year: 2025,
  },
  {
    id: "rollladen-drutex",
    title: {
      en: "Roller shutters, external venetian blinds, insect screens",
      de: "Rollläden, Raffstoren, Insektenschutz",
      pl: "Rolety, raffstory, siatki przeciw owadom",
    },
    collection: { en: "Shutters and screens", de: "Rollläden und Insektenschutz", pl: "Rolety i siatki", },
    category: "roller-shutters",
    file: "/pdf/catalogues/rollladen-raffstoren-insektenschutz.pdf",
    cover: "/images/catalogues/rollladen-drutex-cover.jpg",
    pages: 21,
    sizeMb: 3.0,
    year: 2025,
  },
  {
    id: "salamander-systeme",
    title: {
      en: "Salamander window and sliding systems",
      de: "Salamander Fenster- und Schiebesysteme",
      pl: "Systemy okienne i przesuwne Salamander",
    },
    // Salamander es el fabricante de los perfiles y se le acredita,
    // como a Aluplast o VEKA. El que va sin rastro es el intermediario
    // que lo imprimió, que vende también directo en Alemania — ver
    // `scripts/prepare_salamander.py`, que es quien deja el PDF así.
    // El folleto está en polaco porque así existe; los números no
    // tienen idioma y las fichas de la web van redactadas aparte.
    brand: "Salamander",
    collection: { en: "Window and sliding systems", de: "Fenster- und Schiebesysteme", pl: "Systemy okienne i przesuwne", },
    category: "windows",
    file: "/pdf/catalogues/salamander-systeme.pdf",
    cover: "/images/catalogues/salamander-systeme-cover.jpg",
    pages: 22,
    sizeMb: 7.3,
    year: 2026,
  },
  {
    /**
     * Catálogo del fabricante WIKĘD (2026-08), subido por el dueño.
     * WIKĘD vende por distribuidores y se le acredita como a ROKA o
     * Salamander; lo único retirado es la dirección de contacto de la
     * contraportada — `scripts/prepare_wiked.py` deja el PDF así.
     * Está en polaco porque así existe; dentro van perfiles VEKA,
     * Kömmerling y PROCURAL con los que se montan las fichas de la web.
     * Sin `category` a propósito: cubre ventanas, correderas y puertas
     * ALU a la vez, así que vive en la página de catálogos.
     */
    id: "wiked-pvc-alu",
    title: {
      en: "PVC/ALU joinery — product catalogue",
      de: "PCV/ALU Produktkatalog",
      pl: "Katalog produktów PCV/ALU",
    },
    brand: "WIKĘD",
    collection: { en: "PVC/ALU", de: "PCV/ALU", pl: "PCV/ALU" },
    file: "/pdf/catalogues/wiked-pvc-alu.pdf",
    cover: "/images/catalogues/wiked-pvc-alu-cover.jpg",
    pages: 27,
    sizeMb: 9.2,
    year: 2026,
  },
  {
    id: "rollladen-produktkatalog",
    title: { en: "Roller shutters — product catalogue", de: "Rollladen Produktkatalog", pl: "Rolety — katalog produktów", },
    // Sin marca a propósito: el fabricante de estas persianas vende
    // también directamente al cliente final en Alemania, así que su
    // nombre y sus enlaces se quitaron del PDF autoalojado. Enseñar la
    // marca aquí sería mandarle el cliente. Ver la nota de arriba.
    collection: { en: "Roller shutters", de: "Rollläden", pl: "Rolety", },
    category: "roller-shutters",
    file: "/pdf/catalogues/rollladen-produktkatalog.pdf",
    cover: "/images/catalogues/rollladen-produktkatalog-cover.jpg",
    pages: 53,
    sizeMb: 18.9,
    year: 2026,
  },
  {
    /**
     * Los dos IGLO llegaron en agosto de 2026 y son del mismo
     * fabricante que las persianas y las puertas: vende también directo
     * en Alemania, así que van sin su marca y sin el escudo del club
     * que patrocina —lo pidió el dueño con estas palabras: "make sure
     * the Drutex name and the Bayern Munich logo are not visible"—. Lo
     * hace `scripts/prepare_iglo.py`, que hay que volver a ejecutar si
     * el proveedor manda una versión nueva.
     *
     * IGLO sí se queda: es el nombre de los SISTEMAS, no el del
     * fabricante, y sin él el catálogo no se puede ni citar.
     */
    id: "iglo-fenster",
    title: {
      en: "IGLO — PVC windows and terrace systems",
      de: "IGLO — PVC-Fenster und Terrassensysteme",
      pl: "IGLO — okna PCV i systemy tarasowe",
    },
    collection: { en: "PVC windows", de: "PVC-Fenster", pl: "Okna PCV" },
    category: "windows",
    file: "/pdf/catalogues/iglo-fenster-terrassensysteme.pdf",
    cover: "/images/catalogues/iglo-fenster-cover.jpg",
    // Hojas del PDF, como en el resto de tarjetas (los pliegos cuentan 1).
    pages: 45,
    sizeMb: 10.1,
    year: 2024,
  },
  {
    id: "iglo-terrassen",
    title: {
      en: "IGLO terrace systems",
      de: "IGLO Terrassensysteme",
      pl: "Systemy tarasowe IGLO",
    },
    collection: { en: "Terrace systems", de: "Terrassensysteme", pl: "Systemy tarasowe" },
    category: "patio-doors",
    file: "/pdf/catalogues/iglo-terrassensysteme.pdf",
    cover: "/images/catalogues/iglo-terrassen-cover.jpg",
    pages: 5,
    sizeMb: 1.0,
    year: 2024,
  },
  {
    /**
     * Los dos de la gama Tore llegaron en agosto de 2026, del mismo
     * intermediario que las persianas: van sin su marca, sin sus
     * páginas de autopromoción y con las fotos recomprimidas — el de
     * vallas pesaba 85 MB tal cual llegó. Lo hace
     * `scripts/prepare_eko_gates.py`; volver a ejecutarlo si llega una
     * edición nueva.
     */
    id: "garagentore",
    title: { en: "Garage doors — product catalogue", de: "Garagentore Produktkatalog", pl: "Bramy garażowe — katalog produktów" },
    collection: { en: "Garage doors", de: "Garagentore", pl: "Bramy garażowe" },
    category: "gates",
    file: "/pdf/catalogues/garagentore-produktkatalog.pdf",
    cover: "/images/catalogues/garagentore-cover.jpg",
    pages: 79,
    sizeMb: 22.5,
    year: 2026,
  },
  {
    // Zäune, Tore und Pforten. La gama de vallas se retiró del
    // catálogo de la web, pero el PDF también cubre puertas de finca
    // (Tore und Pforten) y el dueño quiere TODOS los catálogos en la
    // página de catálogos — así que se registra bajo Tore.
    id: "grundstueckszaeune",
    title: { en: "Property fences, gates and wickets", de: "Grundstückszäune — Zäune, Tore und Pforten", pl: "Ogrodzenia posesyjne — ogrodzenia, bramy i furtki" },
    collection: { en: "Fences and gates", de: "Zäune und Tore", pl: "Ogrodzenia i bramy" },
    category: "gates",
    file: "/pdf/catalogues/grundstueckszaeune-katalog.pdf",
    cover: "/images/catalogues/grundstueckszaeune-cover.jpg",
    pages: 62,
    sizeMb: 14.2,
    year: 2026,
  },
  {
    id: "fassadenjalousien",
    title: { en: "Facade blinds — catalogue", de: "Katalog der Fassadenjalousien", pl: "Żaluzje fasadowe — katalog", },
    collection: { en: "Facade blinds", de: "Fassadenjalousien", pl: "Żaluzje fasadowe", },
    category: "roller-shutters",
    file: "/pdf/catalogues/fassadenjalousien.pdf",
    cover: "/images/catalogues/fassadenjalousien-cover.jpg",
    pages: 34,
    sizeMb: 15.1,
    year: 2026,
  },
];

export const getCatalogue = (id: string): Catalogue | undefined =>
  CATALOGUES.find((catalogue) => catalogue.id === id);
