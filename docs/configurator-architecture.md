# Arquitectura del configurador — decisión de Fase 2

El configurador se mantiene como **un único flujo y una única lista de oferta**, pero cada familia usa su propio catálogo de sistemas, tipologías y reglas. Esta decisión permite reutilizar medidas, colores, datos de contacto, PDF y persistencia sin permitir combinaciones entre herrajes incompatibles.

## Familias

- **Ventanas** y **correderas** viven ya en el flujo común, con selección explícita de familia. Sus sistemas y composiciones se filtran por separado.
- **Puertas de entrada**, **persianas independientes** y **portones** deben incorporarse como módulos separados dentro de la misma ruta cuando existan fichas técnicas suficientes. No deben modelarse como una ventana: necesitan campos propios (panel, umbral y control de acceso; cajón y lama; o guía, motor y panel, respectivamente).
- Una persiana asociada a una ventana o corredera continúa como accesorio del elemento principal. Una persiana independiente será otra familia y otra posición del presupuesto.

## Fuente de verdad

`src/data/configurator/rules.ts` concentra límites y compatibilidades por sistema. La interfaz usa estas reglas para desactivar opciones imposibles, el reducer normaliza cambios de familia y el validador vuelve a comprobar los datos antes de persistir o enviar una solicitud. La validación del servidor no debe confiar en que la interfaz haya ejecutado esa normalización.

Los límites actuales son deliberadamente conservadores y no sustituyen el cálculo del fabricante. Cada nueva ficha técnica deberá traducirse a una excepción identificada por sistema, acompañada de una prueba.
