# Guía de ejercicios resueltos – Unidad 1

## Nivel básico – Catálogo de cursos modular

### Problema
Una pantalla de catálogo mezcla filtros, listado y datos en un mismo archivo. Se requiere separar responsabilidades y adoptar una estructura por features.

### Objetivos
- aplicar arquitectura por dominios,
- separar container y presentational,
- usar componentes controlados para filtros.

### Solución propuesta
Se organiza la solución en dos features principales:
- `courses`: listado y render de cursos,
- `filters`: control de búsqueda y nivel.

El componente contenedor `App.jsx` centraliza el estado y compone la UI. `CourseFilters.jsx` es un componente controlado y `CourseList.jsx` se mantiene presentacional.

### Valor empresarial
- facilita agregar nuevos filtros sin tocar el listado,
- mejora la legibilidad para equipos nuevos,
- simplifica pruebas funcionales por responsabilidad.

### Ruta del código
`unidad-1/practica/basico/catalogo-cursos`

---

## Nivel intermedio – Tabs como Compound Components

### Problema
El equipo necesita un bloque reutilizable para alternar entre vistas de métricas, alertas y acuerdos del equipo sin duplicar estado ni lógica de selección.

### Objetivos
- diseñar una API expresiva,
- encapsular estado compartido con contexto,
- comparar composición avanzada frente a props rígidas.

### Solución propuesta
Se implementa un componente `Tabs` con subcomponentes:
- `Tabs.List`
- `Tabs.Trigger`
- `Tabs.Panel`

Esta API favorece lectura, reutilización y bajo acoplamiento entre consumidor e implementación interna.

### Valor empresarial
- reduce duplicación de lógica de navegación local,
- mejora consistencia visual y de interacción,
- permite extender el componente sin romper consumidores.

### Ruta del código
`unidad-1/practica/intermedio/compound-tabs`

---

## Nivel avanzado – Refactorización estructural SOFT-629

### Problema
La aplicación base SOFT-629 tiene una estructura plana, con reglas del negocio mezcladas con JSX y datos simulados acoplados a la vista principal.

### Objetivos
- detectar deuda estructural,
- reorganizar la aplicación por dominios y capas,
- evolucionar el código sin reescribir toda la lógica.

### Solución propuesta
La refactorización separa:
- `app`: entrada y composición principal,
- `features/incidents/components`: renderizado de tablero,
- `features/incidents/hooks`: lógica de filtrado,
- `features/incidents/services`: acceso y preparación de datos,
- `shared/mock`: fuente simulada desacoplada.

### Valor empresarial
- prepara la base para sustituir mocks por API real,
- reduce impacto de cambios en métricas o filtros,
- acelera mantenimiento y onboarding de equipos.

### Ruta del código
`unidad-1/practica/avanzado/soft-629-refactor`
