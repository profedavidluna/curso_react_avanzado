function PerformanceChecklist() {
  return (
    <aside className="performance-checklist-card">
      <h3>Buenas prácticas aplicadas</h3>
      <ul className="performance-checklist-list">
        <li>
          <strong>Medir primero:</strong> contadores de render en tarjetas, resumen y listado.
        </li>
        <li>
          <strong>Virtualizar:</strong> el DOM solo monta la ventana visible del catálogo.
        </li>
        <li>
          <strong>Segmentar:</strong> la vista de performance se compone de toolbar, resumen y lista
          virtualizada.
        </li>
        <li>
          <strong>Mantener estado cerca:</strong> filtros y scroll viven donde se usan.
        </li>
        <li>
          <strong>Memoizar con criterio:</strong> `BookCard`, `BookList` y el resumen evitan renders
          cuando sus props no cambian.
        </li>
      </ul>
    </aside>
  );
}

export default PerformanceChecklist;
