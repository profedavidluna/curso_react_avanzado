# Práctica intermedia – Segmentación de componentes pesados

Este ejercicio muestra un componente monolítico que mezcla lógica de datos, cálculos y múltiples vistas. El objetivo es descomponerlo en piezas con responsabilidad única para reducir el radio de render y facilitar optimización selectiva.

## Conceptos que refuerza
- principio de responsabilidad única en componentes React,
- separación entre lógica de datos y presentación,
- reducción del radio de re-render al aislar estado local,
- extracción de hooks para encapsular lógica reutilizable.

## Cómo usar este ejemplo
1. Cree un proyecto React con su herramienta preferida.
2. Copie el contenido de `src/` en el proyecto.
3. Observe cómo `MonolithicPanel.jsx` hace re-render de todo al cambiar cualquier estado interno.
4. Compare con la versión segmentada donde cada subcomponente se renderiza de forma independiente.

## Qué observar
- En `MonolithicPanel`, un cambio en el estado de búsqueda provoca re-render de métricas y alertas aunque no hayan cambiado.
- En la versión segmentada, cada pieza tiene su propio ciclo de render.
- El hook `useOperationalData` centraliza la lógica de datos sin afectar el árbol de componentes.

## Ejercicio propuesto para el alumno
1. Identificar los tres bloques de responsabilidad dentro de `MonolithicPanel.jsx`.
2. Extraer cada bloque a su propio componente en `src/components/dashboard/`.
3. Crear `src/hooks/useOperationalData.js` para centralizar los datos simulados.
4. Aplicar `React.memo` en los subcomponentes que reciban props estables.
