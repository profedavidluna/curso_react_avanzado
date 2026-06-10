import { memo } from 'react';

function PerformanceOverviewComponent({ stats }) {
  return (
    <div className="performance-summary-grid">
      <article className="performance-summary-card">
        <span className="performance-summary-label">Catálogo extendido</span>
        <strong className="performance-summary-value">{stats.totalBooks}</strong>
        <p>Copias simuladas del catálogo para enseñar virtualización con un caso realista.</p>
      </article>
      <article className="performance-summary-card">
        <span className="performance-summary-label">Resultados visibles</span>
        <strong className="performance-summary-value">{stats.filteredBooks}</strong>
        <p>Filtro y orden viven en un hook, no en el árbol visual.</p>
      </article>
      <article className="performance-summary-card">
        <span className="performance-summary-label">Componentes segmentados</span>
        <strong className="performance-summary-value">3 bloques</strong>
        <p>Toolbar, resumen y lista virtualizada se actualizan con responsabilidades separadas.</p>
      </article>
    </div>
  );
}

export const PerformanceOverview = memo(PerformanceOverviewComponent);

export default PerformanceOverview;
