# Guía de ejercicios resueltos – Unidad 3

## Nivel básico – Optimización de render en tablero de métricas

### Problema
Un tablero recalcula métricas y re-renderiza filas completas en cada pulsación, incluso cuando los datos visibles no cambian.

### Objetivos
- identificar renders innecesarios,
- aplicar `React.memo` en componentes de fila,
- usar `useMemo` y `useCallback` para estabilizar cálculos y handlers.

### Solución propuesta
Se separa `MetricRow` como componente memoizado y se calcula el resumen con `useMemo`. Las acciones de filtrado se estabilizan con `useCallback` para evitar renders de hijos que dependen de funciones por referencia.

### Valor empresarial
- interfaz más fluida en paneles de operación,
- menor consumo de CPU en sesiones largas,
- base clara para diagnósticos de performance repetibles.

### Ruta del código
`unidad-3/practica/basico/optimizacion-render`

---

## Nivel intermedio – Code splitting progresivo por secciones

### Problema
El módulo de reportes carga vistas pesadas desde el inicio, aumentando el bundle inicial y retrasando la interacción.

### Objetivos
- dividir vistas no críticas con `React.lazy`,
- controlar fallback con `Suspense`,
- aplicar carga progresiva según navegación del usuario.

### Solución propuesta
Las vistas secundarias (`Reportes` y `Auditoría`) se cargan de forma diferida. La vista principal se mantiene inmediata y el usuario recibe feedback visual durante la carga de cada bloque.

### Valor empresarial
- menor tiempo de carga inicial,
- mejor percepción de velocidad,
- escalabilidad para agregar nuevas secciones pesadas.

### Ruta del código
`unidad-3/practica/intermedio/code-splitting-progresivo`

---

## Nivel básico – Virtualización de listas (sección 3.3)

### Problema
Una lista de 3 000 incidencias renderiza todos sus elementos en el DOM. Al filtrar o reordenar, el navegador recalcula layout para miles de nodos aunque la mayoría estén fuera del viewport.

### Objetivos
- comprender el costo de renderizar nodos fuera de pantalla,
- calcular una ventana visible a partir de `scrollTop` y la altura de ítem,
- reducir los nodos activos en DOM de miles a una decena constante.

### Solución propuesta
`NaiveList` monta todos los elementos; `VirtualList` calcula `start` y `end` según scroll y solo renderiza esa franja. El contenedor mantiene la altura total simulada para que la barra de scroll sea correcta.

### Valor empresarial
- listas de alta densidad (logs, feeds, alertas) funcionan sin degradar el hilo principal,
- la mejora escala linealmente con el tamaño del dataset,
- no requiere dependencias externas.

### Ruta del código
`unidad-3/practica/basico/virtualizacion-listas`

---

## Nivel intermedio – Segmentación de componentes pesados (sección 3.3)

### Problema
Un panel operacional concentra en un único componente: cálculo de métricas, buscador de alertas y feed de actividad. Cualquier pulsación en el buscador provoca re-render completo del panel, incluyendo secciones que no cambian.

### Objetivos
- identificar los bloques de responsabilidad dentro de un componente monolítico,
- extraer cada bloque a su propio componente con `React.memo`,
- mover el estado de búsqueda al componente que lo necesita,
- centralizar lógica de datos en un hook.

### Solución propuesta
`MonolithicPanel` se descompone en `MetricsSummary`, `AlertsList` y `ActivityFeed`. El estado de búsqueda vive en `AlertsList`, por lo que un cambio en él no afecta a las otras dos secciones. `useOperationalData` centraliza los datos simulados.

### Valor empresarial
- reducción del radio de render: cada sección solo se actualiza cuando sus datos cambian,
- componentes enfocados son más fáciles de probar y reutilizar,
- separar lógica de datos de presentación facilita el cambio de fuente (API, WebSocket).

### Ruta del código
`unidad-3/practica/intermedio/segmentacion-componentes-pesados`

---

## Nivel avanzado – Buenas prácticas de performance (sección 3.3)

### Problema
Un feed de 5 000 incidencias con filtros y orden necesita ser fluido sin sacrificar mantenibilidad. El reto es aplicar optimizaciones justificadas por impacto medible, no indiscriminadamente.

### Objetivos
- combinar virtualización + memoización de forma coherente,
- estabilizar handlers con `useCallback` para no romper memoización de hijos,
- encapsular filtrado y orden en un hook con dependencias explícitas,
- usar un checklist para guiar decisiones y validar resultados.

### Solución propuesta
`IncidentFeed` virtualiza la lista y está envuelto con `React.memo`. `IncidentRow` también está memoizado para evitar renders en scroll. `useFilteredIncidents` centraliza la lógica de filtrado y orden. Los handlers del formulario están estabilizados con `useCallback`. El checklist en `performance-checklist.md` documenta qué se aplicó y qué queda pendiente.

### Valor empresarial
- performance medible y documentada, no basada en intuición,
- checklist reutilizable como guía de revisión técnica en equipos,
- patrones combinados que escalan a módulos reales de producción.

### Ruta del código
`unidad-3/practica/avanzado/buenas-practicas-performance`

---

## Caso transversal – Estrategias avanzadas de rendimiento sobre la app de biblioteca

### Problema
La aplicación base de la unidad 1 concentra demasiado estado en `App`, filtra el catálogo en cada render y no está preparada para mostrar un volumen alto de libros sin degradar la interfaz.

### Objetivos
- reutilizar la app existente en lugar de crear un ejemplo aislado,
- enseñar virtualización con un catálogo grande pero realista,
- mostrar segmentación de componentes pesados a partir del propio árbol de la app,
- aplicar buenas prácticas de performance sobre un caso cercano a producción.

### Solución propuesta
Se mantiene la app de biblioteca y se añade una vista `⚡ Performance`. Allí el catálogo se amplía en memoria para simular cientos de copias, se virtualiza el listado y se acompaña con un resumen y un checklist de buenas prácticas. Además, la vista principal de libros se segmenta en `LibraryCatalogView` y el formulario deja de vivir en `App` para reducir el radio de render.

### Valor empresarial
- se enseña performance sobre una interfaz conocida por el alumno,
- el mismo caso permite discutir diagnóstico, trade-offs y refactor incremental,
- los cambios son reutilizables en otros módulos del curso.

### Ruta del código
`unidad-1/practica/src`

---

## Nivel avanzado – Performance + testing + mejora continua

### Problema
Una lista extensa degrada experiencia de uso y los cambios de rendimiento generan regresiones por falta de pruebas.

### Objetivos
- aplicar virtualización básica para listas grandes,
- segmentar un componente pesado en piezas enfocadas,
- introducir pruebas de componente/hook/comportamiento,
- documentar refactorización incremental.

### Solución propuesta
Se implementa `VirtualizedList` para renderizar una ventana visible y `useVisibleWindow` para calcular índices según scroll. Se agregan especificaciones de testing profesional y checklist de deuda técnica para guiar mejora continua.

### Valor empresarial
- reducción de trabajo de render en grandes volúmenes,
- menor riesgo de regresiones,
- proceso de mejora sostenible para equipos.

### Ruta del código
`unidad-3/practica/avanzado/performance-quality-lab`
