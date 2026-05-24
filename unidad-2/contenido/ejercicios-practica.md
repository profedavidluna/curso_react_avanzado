# Guía de ejercicios de práctica – Unidad 2

## Nivel básico

### Ejercicio 1 – Formulario de onboarding con estado derivado
**Objetivo:** construir un formulario con validación y resumen dinámico sin duplicar estado.

**Requisitos**
- usar `useState` para campos,
- calcular resumen con `useMemo`,
- encapsular lógica en un custom hook.

**Criterios de éxito**
- separación lógica-vista,
- consistencia entre valores y resumen,
- validaciones legibles.

### Ejercicio 2 – Reducer para estado de wizard
**Objetivo:** reemplazar múltiples `useState` por `useReducer` en un flujo de pasos.

**Pistas**
- definir acciones de navegación,
- modelar datos por paso,
- incluir estado de progreso derivado.

## Nivel intermedio

### Ejercicio 3 – Contextos separados para sesión y preferencias
**Objetivo:** diseñar dos contextos independientes y componerlos en la app.

**Requisitos**
- evitar contexto monolítico,
- usar `useMemo` en `value` del provider,
- documentar qué componentes consumen cada contexto.

### Ejercicio 4 – Optimización de re-renderizados
**Objetivo:** identificar renders innecesarios y aplicar optimizaciones con criterio.

**Entregable**
- diagnóstico antes/después,
- cambios realizados (`useCallback`, división de contexto, memoización selectiva),
- justificación técnica.

## Nivel avanzado

### Ejercicio 5 – Estado global para panel de soporte
**Objetivo:** implementar estado global para filtros, tickets y métricas en un dashboard.

**Requisitos**
- reducer con acciones explícitas,
- loading/error states estructurados,
- selectores derivados para métricas.

### Ejercicio 6 – Efectos asíncronos con cleanup
**Objetivo:** separar carga de datos y limpieza de efectos ante cambios de filtro o desmontaje.

**Entregable**
- flujo de efecto documentado,
- manejo de cancelación seguro,
- evidencia de consistencia en UI.

## Recomendación de uso en clase
- Resolver en plenaria un ejercicio por nivel.
- Asignar un ejercicio complementario para trabajo por parejas.
- Cerrar con discusión de decisiones arquitectónicas y trade-offs.
