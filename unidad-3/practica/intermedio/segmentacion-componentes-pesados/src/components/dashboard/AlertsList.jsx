import { memo, useRef, useState } from 'react';

// SOLUCIÓN – Bloque 2: alertas con su propio estado de búsqueda.
// El estado de búsqueda vive aquí, no afecta a MetricsSummary ni ActivityFeed.
function AlertsListComponent({ alerts }) {
  const [search, setSearch] = useState('');
  const renders = useRef(0);
  renders.current += 1;

  const filteredAlerts = alerts.filter((alert) =>
    alert.message.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 0 }}>
        Renders de AlertsList: <strong>{renders.current}</strong>
      </p>
      <h2 style={{ margin: '0 0 0.5rem' }}>Alertas activas</h2>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar alerta…"
        style={{ marginBottom: '0.5rem', display: 'block' }}
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredAlerts.map((alert) => (
          <li
            key={alert.id}
            style={{
              padding: '4px 8px',
              marginBottom: 4,
              background: alert.level === 'critica' ? '#fee2e2' : '#fef9c3',
              borderRadius: 4,
            }}
          >
            [{alert.level}] {alert.message}
          </li>
        ))}
      </ul>
    </section>
  );
}

export const AlertsList = memo(AlertsListComponent);
