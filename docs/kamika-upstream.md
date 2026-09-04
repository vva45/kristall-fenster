# Fuente de producto: Kamika Bauelemente

La web principal de **Kamika Bauelemente** es la fuente de verdad del catálogo de
este configurador:

- Repositorio: <https://github.com/vva45/kamika-bauelemente.git>
- Datos de origen: `src/data/catalog/`
- Imágenes de origen: `public/images/`
- Catálogos originales: `public/pdf/catalogues/`

El configurador es otro producto de la misma compañía. Por eso reutiliza la
información comercial y visual de Kamika en lugar de mantener un inventario
paralelo o inventado.

## Material incorporado

La copia local actual incluye:

- Commit local de importación: `1b77b0c` (`El catálogo real de Kamika sustituye al inventado`).
- SHA de origen de Kamika: no quedó registrado en aquella importación histórica;
  no debe inventarse. La próxima sincronización tiene que consignarlo.

| Material | Ubicación local | Cantidad |
| --- | --- | ---: |
| Gamas | `src/data/catalog/categories.ts` | 8 |
| Catálogos documentados | `src/data/catalog/catalogues.ts` | 15 |
| Fabricantes | `src/data/catalog/manufacturers.ts` | 12 |
| Sistemas | `src/data/catalog/manufacturers.ts` | 42 |
| Modelos extraídos de catálogos | `src/data/catalog/catalogue-models.ts` | 584 |
| Imágenes de gamas, portadas, sistemas y modelos | `public/images/` | 660 |

Las fichas conservan nombres, especificaciones, referencias de página y
traducciones en alemán, inglés y polaco. Las imágenes se sirven localmente, de
modo que el catálogo visible no depende de la disponibilidad de la web principal.

## PDFs

Los datos mantienen la ruta pública, el año, el número de páginas y el tamaño de
cada PDF para conservar su trazabilidad, y el índice `/catalog` muestra las 15
portadas y sus metadatos. Los binarios no se duplican en este
laboratorio: en conjunto superan los 100 MB y algunos requieren el proceso de
limpieza de marca descrito en los comentarios de `catalogues.ts`. Las referencias
de página de la interfaz son, por tanto, informativas y no enlaces de descarga.

Antes de habilitar una descarga en este proyecto hay que copiar el PDF ya
preparado desde `public/pdf/catalogues/` de la web principal, sin recuperar una
versión sin procesar del fabricante. También hay que comprobar que el nombre de
archivo coincida exactamente con la propiedad `file` del catálogo.

## Actualización desde la web principal

1. Trabajar desde una revisión identificada del repositorio de Kamika y anotar su
   SHA en el commit de sincronización.
2. Copiar juntos `categories.ts`, `catalogues.ts`, `manufacturers.ts` y
   `catalogue-models.ts`; no mezclar versiones porque contienen referencias entre
   sí.
3. Copiar únicamente las imágenes referenciadas por esos datos, manteniendo sus
   rutas dentro de `public/images/`.
4. Si hacen falta descargas, copiar exclusivamente los PDFs publicados y
   preparados por Kamika, tal como se indica en la sección anterior.
5. Ejecutar `npm run validate:data` para detectar IDs duplicados, referencias
   rotas, imágenes ausentes y páginas de catálogo imposibles.
6. Ejecutar `npm run check` antes de integrar la sincronización.

No deben corregirse aquí errores de producto, traducciones o especificaciones:
se corrigen primero en la web principal y después se vuelve a sincronizar. Así se
evita que el configurador y la página comercial ofrezcan información distinta.
