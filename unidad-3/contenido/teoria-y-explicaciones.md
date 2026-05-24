# Teoría y explicaciones para estudiantes – Unidad 3

Este material te ayuda a estudiar los temas de rendimiento y calidad desde una perspectiva práctica y profesional.

---

## 1) Optimización de renderizado

### ¿Qué debes comprender?
- Optimizar sin medir puede empeorar mantenibilidad sin mejorar rendimiento.
- `React.memo`, `useMemo` y `useCallback` son herramientas de precisión, no reglas universales.

### Idea clave
Primero diagnostica, luego optimiza.

### Criterios de uso
- `React.memo`: útil en hijos costosos con props estables.
- `useMemo`: para cálculos realmente pesados.
- `useCallback`: cuando la referencia de funciones afecta hijos memoizados.

### Error frecuente
Aplicar memoización indiscriminada y aumentar complejidad sin beneficio medible.

---

## 2) Code Splitting y carga diferida

### ¿Qué debes comprender?
- El objetivo es reducir trabajo inicial del navegador.
- Diferir módulos no críticos mejora el tiempo percibido de interacción.

### Puntos clave
- `React.lazy` para carga bajo demanda.
- `Suspense` para experiencia de espera controlada.
- Segmentación por criticidad de pantalla o ruta.

### Riesgo habitual
Fallbacks pobres que degradan UX aun cuando mejora el bundle.

---

## 3) Estrategias avanzadas de rendimiento

### ¿Qué debes comprender?
- Cuando hay listas grandes, el cuello de botella suele estar en el render del DOM.
- Virtualizar reduce nodos activos y costo de reconciliación.

### Buenas prácticas
- Mantener estado cerca de donde se usa.
- Dividir componentes pesados en piezas enfocadas.
- Priorizar optimizaciones de mayor impacto.

### Enfoque profesional
La performance es una disciplina de decisiones con datos, no de “trucos”.

---

## 4) Testing profesional

### ¿Qué debes comprender?
- Sin pruebas, cada optimización puede introducir regresiones.
- Las pruebas deben validar comportamiento observable.

### Cobertura recomendada
- Componente: estados de UI críticos.
- Hook: transiciones y reglas de negocio.
- Flujo de usuario: interacciones reales del producto.

### Resultado esperado
Confianza para refactorizar y optimizar de forma continua.

---

## 5) Refactorización y calidad continua

### ¿Qué debes comprender?
- La calidad no es un evento puntual; es un proceso.
- Refactorizar en pasos pequeños reduce riesgo y facilita revisión.

### Prácticas clave
- Commits pequeños y reversibles.
- Convenciones claras de estructura y naming.
- Deuda técnica visible y priorizada.

### Error frecuente
Postergar siempre la calidad “para después” hasta que el costo sea crítico.

---

## Checklist de estudio de la unidad
- [ ] Puedo explicar cuándo una optimización vale la pena.
- [ ] Puedo proponer una estrategia de code splitting por criticidad.
- [ ] Puedo justificar virtualización en listas de alta densidad.
- [ ] Puedo definir pruebas mínimas antes de una refactorización.

## Preguntas de repaso
1. ¿Qué diferencia hay entre optimización útil y sobre-optimización?
2. ¿Cómo decidir qué módulos cargar de forma diferida?
3. ¿Qué evidencia usarías para defender una mejora de performance?
4. ¿Qué rol cumple el testing en la mejora continua?
