# Teoría y explicaciones para estudiantes – Unidad 2

Este material refuerza los puntos de la unidad para que puedas tomar decisiones sólidas sobre estado y flujo de datos.

---

## 1) Profundización en Hooks

### ¿Qué debes comprender?
- Los hooks permiten modelar estado, efectos y reutilización de lógica.
- Usarlos bien mejora mantenimiento; usarlos mal produce bugs difíciles de rastrear.

### Idea clave
Los hooks no son solo sintaxis: son una forma de diseñar responsabilidades dentro del componente.

### Reglas que debes cuidar
- Mantener orden estable de hooks.
- Evitar efectos con responsabilidades mezcladas.
- Usar memoización solo cuando tenga impacto real.

### Enfoque profesional de custom hooks
- API pequeña y clara.
- Separación entre datos, acciones y estados de carga/error.
- Side effects encapsulados y predecibles.

---

## 2) Manejo de estado complejo

### ¿Qué debes comprender?
- El estado complejo aparece cuando hay múltiples dependencias (filtros, paginación, formularios, asincronía).
- Duplicar estado crea inconsistencias.

### Principios clave
- Derivar en vez de duplicar.
- Centralizar transiciones complejas con `useReducer`.
- Definir invariantes de negocio.

### Error común
Agregar más `useState` sin un modelo claro de transiciones.

---

## 3) Context API avanzada

### ¿Qué debes comprender?
- Context no reemplaza todo: se usa para estado compartido con intención clara.
- Un contexto gigante causa acoplamiento y renderizados innecesarios.

### Buenas prácticas
- Separar contextos por responsabilidad.
- Memorizar `value` del provider.
- Mantener funciones estables cuando impactan rendimiento.

### Indicador de madurez
Cada contexto tiene propósito explícito y consumidores bien identificados.

---

## 4) Introducción a estado global

### ¿Qué debes comprender?
- No todo debe ir a estado global.
- Centralizar tiene costo, pero aporta orden cuando hay coordinación transversal.

### Criterios para decidir
- Alcance real del estado compartido.
- Necesidad de trazabilidad.
- Complejidad asíncrona.
- Costo de mantenimiento del equipo.

### Herramientas del módulo
- `useReducer` + Context para bases robustas.
- Redux Toolkit y alternativas modernas como referencia de escalado.

---

## 5) Manejo de efectos y asincronía

### ¿Qué debes comprender?
- Los efectos son puntos críticos de errores (fugas, condiciones de carrera, UI inconsistente).
- Separar efectos por intención mejora control y depuración.

### Prácticas obligatorias
- Cleanup en suscripciones, timers y cargas cancelables.
- Modelar explícitamente estados `loading`, `error`, `success`.
- Evitar lógica de negocio crítica mezclada en `useEffect`.

---

## Checklist de estudio de la unidad
- [ ] Puedo justificar cuándo usar `useReducer` en lugar de múltiples `useState`.
- [ ] Puedo diseñar custom hooks con API clara.
- [ ] Puedo separar contextos para reducir renders.
- [ ] Puedo modelar asincronía con estados explícitos y cleanup.

## Preguntas de repaso
1. ¿Qué problema evita el estado derivado?
2. ¿Cómo decidir entre estado local, contexto y global?
3. ¿Qué riesgos aparecen si no limpias efectos asíncronos?
4. ¿Cómo detectar que un contexto está sobredimensionado?
