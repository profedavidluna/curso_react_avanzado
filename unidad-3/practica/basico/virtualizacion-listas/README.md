# Práctica básica – Virtualización de listas

Este ejercicio contrasta una lista ingenua que renderiza todos sus elementos contra una lista virtualizada que solo renderiza los visibles.

## Conceptos que refuerza
- costo de renderizar miles de nodos DOM,
- ventana deslizante calculada con scroll,
- reducción de trabajo de reconciliación sin cambiar el comportamiento externo.

## Cómo usar este ejemplo
1. Cree un proyecto React con su herramienta preferida.
2. Copie el contenido de `src/` en el proyecto.
3. Ejecute la aplicación y compare el comportamiento de ambos componentes al hacer scroll.

## Qué observar
- El contador de renders de `NaiveList` sigue subiendo mientras se escribe en el campo de filtro.
- El total de nodos del DOM baja drásticamente al cambiar al componente virtualizado.
- El comportamiento de scroll es idéntico para el usuario final.

## Ejercicio propuesto para el alumno
1. Abrir `src/components/NaiveList.jsx` y comprobar cuántos nodos crea en el DOM.
2. Aplicar la misma lógica de ventana visible que usa `VirtualList.jsx` para reducirlos.
3. Extender la ventana con un overscan de 3 elementos para evitar parpadeo al scroll rápido.
