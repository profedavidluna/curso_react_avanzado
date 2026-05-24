# Guía de contenido – Unidad 3

## Propósito de la unidad
Esta unidad consolida prácticas de rendimiento y calidad técnica para aplicaciones React en escenarios empresariales. El foco es tomar decisiones basadas en evidencia, reducir desperdicio de renderizado y sostener la evolución del producto con pruebas y refactorización continua.

## Competencias a desarrollar
- Diagnosticar renders innecesarios y aplicar memoización con criterio.
- Implementar carga diferida con `React.lazy` y `Suspense` según contexto de uso.
- Aplicar estrategias avanzadas de rendimiento como virtualización y segmentación de componentes pesados.
- Diseñar pruebas de componentes, hooks y comportamiento orientadas a confiabilidad.
- Ejecutar mejora incremental identificando deuda técnica y estandarizando convenciones.

---

## 3.1 Optimización de renderizado

### `React.memo`
Permite evitar renders de componentes puros cuando sus props no cambian de forma relevante. Su uso aporta valor cuando el componente hijo es costoso o se renderiza en listas extensas.

### `useMemo`
Memoriza resultados de cálculos costosos para no recomputar en cada render. Debe usarse sobre operaciones que realmente impacten tiempo de render o consumo de CPU.

### `useCallback`
Estabiliza referencias de funciones para evitar renders en hijos memoizados o recomposición innecesaria de dependencias.

### Identificación de renders innecesarios
- instrumentar componentes con contadores de render,
- usar React DevTools Profiler,
- comparar antes/después de cada optimización,
- priorizar impacto visible antes que micro-optimizaciones.

---

## 3.2 Code Splitting y carga diferida

### `React.lazy`
Permite dividir el bundle en módulos cargados bajo demanda, reduciendo el tiempo inicial de descarga y parseo.

### `Suspense`
Controla la experiencia de espera mientras un módulo diferido se carga, con placeholders coherentes con UX.

### Estrategias de carga progresiva
- diferir paneles secundarios y vistas no críticas,
- pre-cargar módulos por intención del usuario,
- combinar carga diferida con estados visuales explícitos.

---

## 3.3 Estrategias avanzadas de rendimiento

### Virtualización de listas (conceptual y práctica)
Renderizar solo los elementos visibles reduce trabajo de DOM y costo de reconciliación cuando existen grandes volúmenes de datos.

### Componentes pesados y segmentación
Separar cálculos, vista y estados locales por subcomponentes reduce el radio de render y facilita optimización selectiva.

### Buenas prácticas de performance
- medir primero, optimizar después,
- evitar memoización indiscriminada,
- mantener estado cerca de donde se usa,
- limitar efectos con responsabilidades mezcladas,
- revisar payload y frecuencia de actualizaciones.

---

## 3.4 Testing profesional

### Testing de componentes
Validar contratos visuales y estados clave (loading, vacío, error, éxito) priorizando comportamiento observable.

### Testing de hooks
Probar transiciones de estado, reglas de negocio y manejo de efectos en aislamiento.

### Testing de comportamiento
Diseñar pruebas desde la perspectiva del usuario y de flujos reales, no desde detalles internos de implementación.

---

## 3.5 Refactorización y calidad continua

### Identificación de deuda técnica
Detectar duplicación, bajo encapsulamiento, efectos complejos y APIs ambiguas.

### Mejora incremental
Aplicar cambios pequeños, validables y reversibles para sostener entregas sin frenar negocio.

### Convenciones y estándares
Definir acuerdos de estructura, naming, testing y revisión para mantener consistencia técnica entre equipos.

---

## Reto práctico de la unidad
**Optimización y mejora medible de rendimiento**

### Objetivo
Tomar un módulo con problemas de rendimiento (renders excesivos y bundle inicial alto), aplicar optimizaciones progresivas y evidenciar mejora con métricas comparativas.

### Entregables sugeridos
- diagnóstico inicial con hallazgos,
- plan de optimización priorizado,
- implementación de mejoras en render y carga,
- pruebas de regresión de comportamiento,
- comparación de métricas antes/después.

### Criterios de evaluación
- reducción comprobable de trabajo de render,
- mejora del tiempo de interacción percibida,
- estabilidad funcional tras refactorización,
- claridad de decisiones y trade-offs técnicos.
