# Checklist de performance – buenas-practicas-performance

Usa esta lista antes y después de cada ciclo de optimización.

## 1. Medir primero
- [x] Identificar el componente o interacción con mayor costo de render.
- [x] Instrumentar contadores de render (`useRef`) en componentes candidatos.
- [ ] Registrar baseline con React DevTools Profiler antes de cada cambio.
- [ ] Comparar métricas de "tiempo de render" antes/después de cada optimización.

## 2. Virtualización
- [x] Comprobar que el contenedor tiene altura fija y `overflow: auto`.
- [x] Calcular ventana visible en función de `scrollTop` e `ITEM_HEIGHT`.
- [x] Aplicar overscan para evitar parpadeo al hacer scroll rápido.
- [ ] Validar que la altura total simulada es correcta al filtrar elementos.

## 3. Memoización
- [x] Envolver `IncidentFeed` con `React.memo` — evita renders cuando `incidents` no cambia.
- [x] Envolver `IncidentRow` con `React.memo` — evita renders de filas estables durante scroll.
- [x] Estabilizar handlers con `useCallback` para no romper memoización de hijos.
- [x] Derivar valores calculados (`stats`) con `useMemo`.
- [ ] Revisar que no existen objetos literales en props que rompan la comparación de `memo`.

## 4. Estado y responsabilidades
- [x] Estado de scroll local a `IncidentFeed`, no en el padre.
- [x] Lógica de filtrado y orden en `useFilteredIncidents`, no en el componente.
- [ ] Evaluar si `sortOrder` debería vivir dentro del feed o en el padre según UX.

## 5. Anti-patrones a evitar
- [ ] No crear funciones anónimas en props de componentes memoizados.
- [ ] No depender de objetos nuevos en cada render como valor de contexto.
- [ ] No memoizar sin medir: si el beneficio no es visible, la complejidad no vale.
- [ ] No omitir dependencias de `useMemo`/`useCallback` para "optimizar".

## 6. Validación final
- [ ] Confirmar que el comportamiento funcional es idéntico antes y después.
- [ ] Verificar que no hay warning de React sobre keys duplicadas o renders en loop.
- [ ] Documentar qué optimizaciones se aplicaron y cuál fue el impacto medido.
