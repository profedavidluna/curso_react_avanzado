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
