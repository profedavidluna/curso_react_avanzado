# Práctica – app de biblioteca

Esta aplicación sirve como caso base para las unidades del curso. En esta rama se reutiliza la
misma app para explicar el punto **3.3 Estrategias avanzadas de rendimiento** sin abandonar el
dominio del catálogo de libros.

## Qué incluye esta versión

- **Virtualización de listas:** vista `⚡ Performance` con un catálogo expandido y render
  únicamente de la ventana visible.
- **Componentes pesados y segmentación:** `App` deja de concentrar filtros y formulario; esas
  responsabilidades viven en `LibraryCatalogView`, `PerformanceView` y `BookForm`.
- **Buenas prácticas de performance:** `useMemo`, `useCallback`, `React.memo` y estado local cerca
  de donde se usa, más contadores de render para comparar el impacto.

## Dónde mirar

- `/src/App.jsx` — shell principal y coordinación mínima.
- `/src/components/LibraryCatalogView.jsx` — catálogo segmentado con filtros locales.
- `/src/components/PerformanceView.jsx` — laboratorio del punto 3.3.
- `/src/components/VirtualizedBookList.jsx` — ejemplo práctico de virtualización.
- `/src/hooks/usePerformanceCatalog.js` — filtrado, orden y dataset grande memorizado.

## Validación

```bash
npm ci
npm run lint
npm run build
```
