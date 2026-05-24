# Teoría y explicaciones para estudiantes – Unidad 1

Este material está pensado para estudiar los puntos clave de la unidad con lenguaje claro y enfoque práctico.

---

## 1) Organización estructural de aplicaciones

### ¿Qué debes comprender?
- La estructura del proyecto impacta velocidad de desarrollo, calidad y mantenimiento.
- En entornos profesionales se organiza por **dominios de negocio** (features), no solo por tipos de archivo.

### Idea clave
Organizar por dominios facilita que cada equipo trabaje con menos fricción y menos riesgo de romper otras áreas.

### Señales de una buena estructura
- Carpetas con propósito de negocio claro.
- Fronteras entre módulos bien definidas.
- Dependencias explícitas y controladas.

### Errores frecuentes
- Usar una carpeta global de `components` sin criterio.
- Mezclar lógica de negocio con renderizado.
- Crear estructura “bonita” pero difícil de navegar.

---

## 2) Patrones avanzados de componentes

### ¿Qué debes comprender?
- Los patrones ayudan a reutilizar lógica sin duplicación.
- No todos los patrones aplican siempre: se eligen según el problema.

### Patrones que debes dominar
- **Container/Presentational:** separa lógica y UI.
- **Compound Components:** API expresiva basada en composición.
- **Controlled vs Uncontrolled:** control de datos en React o en el DOM.
- **HOC y Render Props (contexto histórico):** importantes para leer y mantener código legado.

### Criterio profesional
El mejor patrón es el que reduce complejidad total del sistema, no el más “elegante” en teoría.

---

## 3) Diseño profesional de componentes

### ¿Qué debes comprender?
- Un componente profesional tiene una responsabilidad principal y una API predecible.
- Reutilizable no significa “hacerlo genérico para todo”.

### Principios de diseño
- Alta cohesión.
- Bajo acoplamiento.
- Nombres y props con semántica clara.
- Extensibilidad sin romper consumidores.

### Preguntas de autoevaluación
- ¿Este componente tiene una sola intención?
- ¿Su API se entiende sin leer implementación interna?
- ¿Se puede reutilizar en otro contexto sin hacks?

---

## 4) Refactorización arquitectónica

### ¿Qué debes comprender?
- Refactorizar no es reescribir desde cero.
- En empresa se prioriza cambio incremental con riesgo controlado.

### Estrategia recomendada
1. Diagnosticar deuda técnica.
2. Reorganizar estructura sin cambiar comportamiento.
3. Extraer lógica repetida.
4. Validar por etapas.

### Riesgos a evitar
- Cambiar arquitectura y funcionalidad al mismo tiempo.
- Introducir abstracciones sin evidencia de necesidad.
- Hacer refactorización “big bang”.

---

## Checklist de estudio de la unidad
- [ ] Puedo explicar cuándo conviene arquitectura por dominios.
- [ ] Puedo comparar al menos 3 patrones de componentes.
- [ ] Puedo diseñar una API de componente coherente.
- [ ] Puedo proponer un plan de refactorización incremental.

## Preguntas de repaso
1. ¿Qué problema empresarial resuelve la organización por features?
2. ¿Cuándo usarías componente controlado y por qué?
3. ¿Qué señales muestran deuda estructural en una app React?
4. ¿Cómo reducirías riesgo en una refactorización de producción?
