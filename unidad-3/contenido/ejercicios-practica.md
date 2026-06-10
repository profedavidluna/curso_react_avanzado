# Guía de ejercicios de práctica – Unidad 3

## Nivel básico

### Ejercicio 1 – Diagnóstico de renders innecesarios
**Objetivo:** medir y reducir renders redundantes en un listado de tarjetas.

**Requisitos**
- instrumentar contador de renders por componente,
- aplicar `React.memo` donde exista impacto,
- justificar el uso de `useMemo` y `useCallback`.

**Criterios de éxito**
- reducción observable de renders,
- código más predecible,
- sin regresiones de comportamiento.

### Ejercicio 2 – Memoización con criterio
**Objetivo:** comparar una versión sin memoización vs una optimizada y decidir qué cambios conservar.

**Pistas**
- priorice cálculos costosos,
- evalúe legibilidad vs beneficio,
- descarte optimizaciones sin impacto real.

### Ejercicio 3 – Virtualizar lista de alta densidad *(sección 3.3)*
**Objetivo:** renderizar solo los elementos visibles de una lista de 3 000 ítems para reducir el trabajo de DOM.

**Punto de partida:** `basico/virtualizacion-listas/src/components/NaiveList.jsx`

**Requisitos**
- calcular `start` y `end` de la ventana visible a partir de `scrollTop` e `ITEM_HEIGHT`,
- usar posición absoluta dentro de un contenedor de altura total simulada,
- añadir overscan de al menos 3 elementos para evitar parpadeo.

**Criterios de éxito**
- el número de nodos en DOM es constante (~10) independientemente del tamaño del dataset,
- la barra de scroll refleja la altura real de la lista,
- filtrar la lista actualiza la virtualización correctamente.

## Nivel intermedio

### Ejercicio 4 – Carga diferida por rutas de panel
**Objetivo:** separar secciones secundarias con code splitting sin afectar la navegación principal.

**Requisitos**
- implementar `React.lazy` en al menos dos vistas,
- usar `Suspense` con fallback consistente,
- mantener experiencia fluida durante la carga.

### Ejercicio 5 – Estrategia de carga progresiva
**Objetivo:** diseñar una estrategia de carga inicial mínima y activación bajo demanda.

**Entregable**
- mapa de módulos críticos/no críticos,
- justificación de segmentación,
- evidencia de mejora en tiempo percibido.

### Ejercicio 6 – Segmentar un componente monolítico *(sección 3.3)*
**Objetivo:** descomponer `MonolithicPanel` en subcomponentes con responsabilidad única para reducir el radio de render.

**Punto de partida:** `intermedio/segmentacion-componentes-pesados/src/components/MonolithicPanel.jsx`

**Requisitos**
- identificar los tres bloques de responsabilidad,
- extraer cada bloque a su propio componente dentro de `components/dashboard/`,
- mover el estado de búsqueda al componente que lo necesita,
- extraer la lógica de datos a `hooks/useOperationalData.js`,
- aplicar `React.memo` en los componentes con props estables.

**Criterios de éxito**
- al cambiar el texto del buscador, solo `AlertsList` se re-renderiza,
- `MetricsSummary` y `ActivityFeed` no acumulan renders mientras se busca,
- cada componente tiene una única razón para cambiar.

## Nivel avanzado

### Ejercicio 7 – Buenas prácticas de performance integradas *(sección 3.3)*
**Objetivo:** aplicar virtualización, memoización y extracción de lógica de forma coherente a un feed de 5 000 incidencias.

**Punto de partida:** crear un feed básico con filtro y orden sin ninguna optimización.

**Requisitos**
- virtualizar la lista con overscan,
- memoizar `IncidentFeed` e `IncidentRow`,
- estabilizar handlers con `useCallback`,
- extraer la lógica de filtrado y orden a `useFilteredIncidents`,
- completar el checklist en `performance-checklist.md` marcando lo aplicado y justificando lo omitido.

**Criterios de éxito**
- los nodos en DOM son constantes al filtrar y ordenar,
- el contador de renders del feed deja de crecer por cambios no relacionados,
- cada optimización está justificada con un criterio medible.

### Ejercicio 8 – Aplicar 3.3 en la app de biblioteca
**Objetivo:** reutilizar `unidad-1/practica/src` para aplicar 3.3 sobre una aplicación existente.

**Punto de partida:** `unidad-1/practica/src/App.jsx`

**Requisitos**
- mover el filtrado del catálogo fuera de `App` y dejarlo en una vista enfocada,
- crear una vista `⚡ Performance` sobre el mismo dominio de libros,
- virtualizar un catálogo expandido usando una ventana visible y overscan,
- acompañar la implementación con un checklist de buenas prácticas.

**Criterios de éxito**
- `App` solo coordina vistas, datos base y modales,
- la vista de performance renderiza pocas tarjetas aunque el dataset sea grande,
- el alumno puede señalar dónde vive cada optimización y por qué existe.

### Ejercicio 9 – Testing y refactorización continua
**Objetivo:** cubrir un componente, un hook y un flujo de usuario antes de refactorizar.

**Entregable**
- set mínimo de pruebas confiables,
- refactor incremental con commits pequeños,
- lista de deuda técnica detectada y mitigada.

## Recomendación de uso en clase
- Resolver en plenaria un ejercicio por nivel.
- Asignar práctica complementaria para trabajo en parejas.
- Cerrar con retrospectiva de métricas y decisiones de calidad.
