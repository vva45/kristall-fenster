# Kristall Fenster — laboratorio del configurador

Aplicación Next.js que sirve como banco de pruebas para el catálogo y el configurador de ventanas de Kamika. Combina datos reales de fabricantes, colores y modelos con validación explícita y solicitud de revisión técnica.

> [!WARNING]
> El configurador no calcula precios ni sustituye la revisión técnica. La aplicación mantiene `noindex` hasta completar la revisión comercial y jurídica.

## Funcionalidad

- Home trilingüe en alemán, inglés y polaco.
- Catálogo de ocho gamas con fabricantes, sistemas, especificaciones y modelos.
- Configurador de ventanas de PVC y aluminio con progreso, navegación guiada y ocho pasos accesibles por teclado.
- Previsualización SVG claramente orientativa y lista imprimible.
- Selector visual de acabados y lista editable, duplicable y organizado por estancia.
- Solicitud comercial con adjuntos, ficha PDF y entrega por correo transaccional.
- Persistencia local del idioma y el presupuesto.
- Reglas de coherencia para medidas, aperturas, persianas y extras.

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Presentación del laboratorio y gamas principales. |
| `/catalog` | Índice del catálogo. |
| `/catalog/[slug]` | Sistemas y modelos de una gama. |
| `/configurator` | Configurador y lista de presupuesto. |

## Desarrollo local

Requisitos:

- Node.js 24 o posterior. Las pruebas usan el soporte nativo de TypeScript de Node.
- npm, usando `package-lock.json` como fuente reproducible de dependencias.

```bash
npm ci
npm run dev
```

La aplicación estará disponible en <http://localhost:3000>.

Copie `.env.example` a `.env.local` y configure `RESEND_API_KEY` e `INQUIRY_FROM_EMAIL` para activar el envío real de solicitudes. `INQUIRY_TO_EMAIL` es opcional y usa el correo público de Kamika por defecto. Sin estas variables el endpoint responde con un error explícito y nunca simula que una solicitud ha sido entregada.

## Comandos de calidad

```bash
npm run lint          # ESLint y reglas Core Web Vitals
npm run typecheck     # TypeScript estricto, sin emitir archivos
npm test              # cálculo, reducer, persistencia e integridad de datos
npm run validate:data # solo controles de integridad del catálogo
npm run build         # compilación de producción
npm run check         # ejecuta toda la batería anterior
```

Las fuentes se sirven desde los archivos Geist incluidos en la dependencia local de Next.js; el build no necesita contactar con Google Fonts y el repositorio no guarda binarios de tipografía.

## Arquitectura

```text
src/
├── app/                       rutas, layout y estilos
├── components/
│   ├── configurator/          estado, formulario y vista previa SVG
│   └── navbar/                navegación global
├── data/
│   ├── catalog/               categorías, catálogos, fabricantes y modelos
│   └── configurator/          opciones, colores, sistemas y tarifa provisional
└── lib/                       i18n, consultas, cálculo y persistencia validada
tests/                         pruebas unitarias e integridad del catálogo
```

Las páginas de catálogo son Server Components. El configurador, el selector de idioma y las hojas localizadas son componentes cliente. La lista se guarda en un sobre versionado de `localStorage`; al recuperarla se validan tanto su estructura como sus reglas técnicas. El configurador implementa pestañas con relaciones ARIA, navegación mediante flechas, avisos en una región viva y un menú móvil independiente.

## Datos del catálogo

Los archivos de `src/data/catalog` son copias de la fuente de datos de `kamika-bauelemente`; algunos son generados automáticamente. No deben corregirse manualmente en este laboratorio. Cuando cambie la fuente:

1. Volver a copiar o generar los datos y recursos correspondientes.
2. Ejecutar `npm run validate:data`.
3. Comprobar los conteos visibles en la home.
4. Ejecutar `npm run check` antes de integrar el cambio.

La validación comprueba IDs duplicados, referencias entre entidades, existencia de imágenes y páginas de modelos. Los PDF originales no forman parte de este laboratorio; las referencias de página son informativas.

## Internacionalización

La locale predeterminada es alemán. Los textos usan la forma tipada:

```ts
type Localized<T> = { en: T; de?: T; pl?: T };
```

Si falta alemán o polaco, la interfaz cae al inglés. El idioma seleccionado se recuerda en `localStorage`. En la futura web pública se recomienda migrar esta solución a rutas localizadas para producir metadata y `lang` correctos por idioma.

## Revisión técnica y comercial

`validateConfiguration` bloquea combinaciones incoherentes y señala configuraciones que requieren revisión individual. Los precios se preparan exclusivamente después de esa revisión; transporte, montaje, impuestos, descuentos, dimensiones, peso y herrajes se confirman en la oferta vinculante.

## Integración continua

`.github/workflows/ci.yml` ejecuta lint, TypeScript, pruebas, validación del catálogo y build en cada push y pull request. También conserva la caché de npm y `.next/cache` para acelerar compilaciones posteriores.

## Despliegue

La aplicación usa el runtime estándar de Next.js:

```bash
npm run build
npm run start
```

Antes de publicar el proyecto como web comercial hay que revisar precios, reglas técnicas, formulario de contacto, privacidad, páginas legales y la configuración `robots` del layout raíz.

Las páginas legales incluidas son borradores técnicos transparentes: faltan la dirección, forma jurídica, representación, posibles datos registrales, plazos de conservación y la revisión jurídica de la configuración final. No deben considerarse listas para producción hasta que el operador aporte esos datos.
