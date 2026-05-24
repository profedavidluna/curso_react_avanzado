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

## Nivel intermedio

### Ejercicio 3 – Carga diferida por rutas de panel
**Objetivo:** separar secciones secundarias con code splitting sin afectar la navegación principal.

**Requisitos**
- implementar `React.lazy` en al menos dos vistas,
- usar `Suspense` con fallback consistente,
- mantener experiencia fluida durante la carga.

### Ejercicio 4 – Estrategia de carga progresiva
**Objetivo:** diseñar una estrategia de carga inicial mínima y activación bajo demanda.

**Entregable**
- mapa de módulos críticos/no críticos,
- justificación de segmentación,
- evidencia de mejora en tiempo percibido.

## Nivel avanzado

### Ejercicio 5 – Virtualizar lista de alta densidad
**Objetivo:** renderizar solo elementos visibles en un feed grande para reducir trabajo de DOM.

**Requisitos**
- ventana visible calculada por scroll,
- contenedor con altura total simulada,
- filas posicionadas de forma estable.

### Ejercicio 6 – Testing y refactorización continua
**Objetivo:** cubrir un componente, un hook y un flujo de usuario antes de refactorizar.

**Entregable**
- set mínimo de pruebas confiables,
- refactor incremental con commits pequeños,
- lista de deuda técnica detectada y mitigada.

## Recomendación de uso en clase
- Resolver en plenaria un ejercicio por nivel.
- Asignar práctica complementaria para trabajo en parejas.
- Cerrar con retrospectiva de métricas y decisiones de calidad.
