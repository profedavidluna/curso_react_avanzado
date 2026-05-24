# Guía de ejercicios resueltos – Unidad 2

## Nivel básico – Formulario con estado derivado y custom hook

### Problema
La pantalla de inscripción mezcla valores de formulario, validación y resumen en un solo componente con lógica duplicada.

### Objetivos
- separar lógica de formulario en un custom hook,
- calcular resumen desde estado derivado,
- mantener sincronización entre campos relacionados.

### Solución propuesta
Se crea `useEnrollmentForm` para encapsular estado, actualización y cálculo de resumen (`useMemo`). El componente `App` queda orientado a la vista y delega la lógica de consistencia al hook.

### Valor empresarial
- reduce errores por duplicidad de estado,
- facilita escalar validaciones por campo,
- mejora pruebas unitarias de la lógica.

### Ruta del código
`unidad-2/practica/basico/estado-derivado-formulario`

---

## Nivel intermedio – Composición de contextos con optimización

### Problema
Un solo contexto global combina sesión y preferencias, provocando re-renderizados innecesarios en todo el árbol.

### Objetivos
- separar contextos por responsabilidad,
- componer providers,
- estabilizar valores y acciones para reducir renders.

### Solución propuesta
Se implementan `SessionProvider` y `PreferencesProvider` independientes. `Dashboard` consume ambos contextos y mantiene rendering eficiente gracias a `useMemo` y `useCallback` en cada provider.

### Valor empresarial
- mejor performance percibida,
- frontera clara entre capacidades,
- mantenimiento más simple por equipos.

### Ruta del código
`unidad-2/practica/intermedio/contextos-compuestos`

---

## Nivel avanzado – Estado global estructurado con asincronía

### Problema
El tablero operativo requiere compartir filtros, listado, métricas y estados de carga/error entre varios componentes sin inconsistencias.

### Objetivos
- centralizar estado con `useReducer` + contexto,
- modelar acciones y transiciones explícitas,
- separar carga asíncrona en hook dedicado con cleanup.

### Solución propuesta
Se construye `AppStateProvider` con reducer y acciones tipificadas. `useLoadTickets` maneja ciclo de carga (`loading`, `success`, `error`) y cancelación segura al desmontar. La vista consume selectores derivados sin duplicar estado.

### Valor empresarial
- flujo predecible de datos,
- menor riesgo de estados inválidos,
- base sólida para migrar a Redux Toolkit.

### Ruta del código
`unidad-2/practica/avanzado/estado-global-estructurado`
