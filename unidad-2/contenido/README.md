# Guía de contenido – Unidad 2

## Propósito de la unidad
Esta unidad desarrolla la capacidad de diseñar flujo de datos robusto en aplicaciones React de mediana y gran escala. El foco está en mantener consistencia del estado, controlar efectos asíncronos y separar claramente responsabilidades entre lógica y vista.

## Competencias a desarrollar
- Aplicar hooks básicos y avanzados con criterio técnico.
- Encapsular lógica reusable mediante custom hooks profesionales.
- Diseñar estrategias para estado derivado y sincronización de múltiples estados.
- Componer contextos escalables minimizando re-renderizados.
- Elegir entre estado local, contexto y estado global según necesidad arquitectónica.

---

## 2.1 Profundización en Hooks

### Manejo de hooks en React
Los hooks son el mecanismo principal para declarar estado y efectos en componentes funcionales. En contextos empresariales, su uso debe priorizar legibilidad, trazabilidad y facilidad de pruebas.

### Hooks básicos: `useState`, `useEffect`, `useContext`
- `useState`: controla estado local de interacción.
- `useEffect`: sincroniza el componente con sistemas externos o efectos secundarios.
- `useContext`: comparte información transversal sin prop drilling excesivo.

### Hooks avanzados: `useRef`, `useCallback`, `useMemo`, `useReducer`
- `useRef`: referencia mutable estable entre renders.
- `useCallback`: estabiliza funciones para optimizar renders en hijos memoizados.
- `useMemo`: memoriza cálculos costosos o valores derivados.
- `useReducer`: modela transiciones de estado complejas y predecibles.

### Reglas avanzadas
- Mantener orden estable de hooks en cada render.
- Evitar efectos con responsabilidades mezcladas.
- No usar memoización por defecto: medir primero y aplicar solo donde aporta.

### Custom hooks profesionales
Un custom hook profesional encapsula una capacidad de negocio o de UI reutilizable.

**Buenas prácticas**
- exponer una API pequeña y explícita,
- aislar side effects,
- separar datos, acciones y estado de carga/error,
- evitar dependencia implícita del árbol visual.

### Encapsulamiento de lógica y separación lógica-vista
La vista debe enfocarse en composición y render. La lógica de reglas, transformación y sincronización debe vivir en hooks y servicios dedicados.

---

## 2.2 Manejo de estado complejo

### Estado derivado
Estado derivado es información calculada desde otras fuentes de estado. Debe calcularse de forma determinista para evitar duplicidad e inconsistencias.

### Sincronización de múltiples estados
Cuando conviven filtros, paginación, selección y datos remotos, conviene definir una única fuente de verdad y reglas de actualización explícitas.

### Manejo de formularios estructurados
En formularios empresariales, la estructura de estado debe contemplar:
- valores,
- validaciones,
- metadatos de interacción (`touched`, `dirty`),
- estado de envío (`idle`, `loading`, `error`, `success`).

### Estrategias para evitar inconsistencias
- derivar en lugar de duplicar,
- centralizar transiciones en reducer cuando aumenta la complejidad,
- usar normalización mínima para colecciones,
- documentar invariantes de negocio.

---

## 2.3 Context API avanzada

### Diseño escalable de contextos
Un contexto debe tener propósito claro. Evite contextos gigantes con datos no relacionados.

### Composición de múltiples contextos
Separar contexto de sesión, preferencias y datos de dominio reduce acoplamiento y facilita evolución por módulos.

### Optimización para evitar re-renderizados
- memorizar `value` del provider,
- dividir contextos por frecuencia de cambio,
- mantener funciones estables con `useCallback`.

---

## 2.4 Introducción a estado global

### Cuándo centralizar estado
Centralizar solo cuando múltiples áreas necesitan el mismo estado, con coordinación consistente entre eventos y asincronía.

### Redux Toolkit (visión práctica)
Redux Toolkit simplifica reducers, acciones y flujos asíncronos, manteniendo predictibilidad del estado global.

### Alternativas modernas (Zustand – conceptual)
Zustand reduce boilerplate y favorece stores ligeros, útil para equipos que priorizan simplicidad operativa.

### Criterios de decisión arquitectónica
- alcance real del estado compartido,
- necesidad de trazabilidad,
- complejidad de asincronía,
- madurez y experiencia del equipo,
- costo de mantenimiento a largo plazo.

---

## 2.5 Manejo de efectos y asincronía

### `useEffect` avanzado
Dividir efectos por responsabilidad (suscripción, fetch, sincronización visual) mejora mantenimiento y debugging.

### Limpieza de efectos
Toda suscripción, timer o request cancelable debe limpiar recursos al desmontar o cambiar dependencias.

### Manejo estructurado de loading y error states
Modelar explícitamente estados de carga y error evita UI ambigua y mejora experiencia de usuario.

### Separación de responsabilidades en efectos
- un efecto para iniciar carga,
- otro para reaccionar a cambios derivados,
- otro para sincronizar integraciones externas.

---

## Reto práctico de la unidad
**Implementación de estado global estructurado**

### Objetivo
Construir una pantalla que combine filtros, listado y resumen de métricas con estado centralizado, carga asíncrona y manejo explícito de errores.

### Entregables sugeridos
- diseño del estado global,
- reducer y acciones documentadas,
- estrategia de asincronía y cleanup,
- justificación arquitectónica (estado local vs global).

### Criterios de evaluación
- consistencia del estado,
- claridad en separación de responsabilidades,
- robustez frente a errores de carga,
- minimización de renders innecesarios,
- calidad de la argumentación técnica.
