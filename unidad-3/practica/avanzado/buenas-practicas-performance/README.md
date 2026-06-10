# Práctica avanzada – Buenas prácticas de performance

Este laboratorio aplica de forma integrada las tres estrategias del punto 3.3: virtualización de listas, segmentación de componentes pesados y buenas prácticas de performance. El punto de partida es medir, luego optimizar con criterio.

## Conceptos que refuerza
- medir antes de optimizar (render counters, Profiler),
- virtualización + memoización combinadas,
- estado local cerca de donde se usa,
- optimizaciones justificadas por impacto medible,
- checklist de performance accionable.

## Cómo usar este ejemplo
1. Cree un proyecto React con su herramienta preferida.
2. Copie el contenido de `src/` en el proyecto.
3. Interactúe con los filtros y observe los contadores de render en cada sección.
4. Lea `src/performance-checklist.md` para entender las decisiones tomadas.

## Qué observar
- `IncidentFeed` está memoizado: solo se re-renderiza cuando cambia la lista filtrada.
- `useFilteredIncidents` centraliza filtrado y orden con `useMemo`; la lógica no vive en el componente.
- Los handlers de filtro están estabilizados con `useCallback` para no romper la memoización del feed.
- La virtualización limita los nodos del DOM a ~10 elementos independientemente del dataset.

## Ejercicio propuesto para el alumno
1. Abrir `src/components/IncidentFeed.jsx` y eliminar `React.memo`. Observar la diferencia en renders.
2. Mover el estado de `sortOrder` dentro de `IncidentFeed` y medir el impacto.
3. Añadir un nuevo filtro por severidad y mantener todas las optimizaciones vigentes.
4. Completar los ítems pendientes del checklist en `src/performance-checklist.md`.
