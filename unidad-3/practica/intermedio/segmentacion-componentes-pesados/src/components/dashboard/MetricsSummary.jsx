import { memo, useRef } from 'react';

// SOLUCIÓN – Bloque 1: solo métricas.
// Al estar aislado, solo se re-renderiza cuando cambian sus propias props.
function MetricsSummaryComponent({ metrics }) {
  const renders = useRef(0);
  renders.current += 1;

  const totalValue = metrics.reduce((sum, metric) => sum + metric.value, 0);
  const avgValue = metrics.length > 0 ? (totalValue / metrics.length).toFixed(1) : 0;

  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 0 }}>
        Renders de MetricsSummary: <strong>{renders.current}</strong>
      </p>
      <h2 style={{ margin: '0 0 0.5rem' }}>Métricas operacionales</h2>
      <p>
        Total: <strong>{totalValue}</strong> · Promedio: <strong>{avgValue}</strong>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {metrics.map((metric) => (
          <li key={metric.id} style={{ padding: '4px 0' }}>
            {metric.label}: <strong>{metric.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const MetricsSummary = memo(MetricsSummaryComponent);
