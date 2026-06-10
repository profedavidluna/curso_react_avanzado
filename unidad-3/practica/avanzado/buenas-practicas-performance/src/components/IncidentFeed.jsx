import { memo, useMemo, useRef, useState } from 'react';

const ITEM_HEIGHT = 48;
const VIEWPORT_HEIGHT = 320;
const OVERSCAN = 3;

const SEVERITY_COLORS = {
  alta: '#fee2e2',
  media: '#fef9c3',
  baja: '#dcfce7',
};

// Buena práctica: componente de fila aislado para evitar re-renders
// al hacer scroll (el padre cambia índices pero las filas no cambian).
const IncidentRow = memo(function IncidentRow({ incident }) {
  return (
    <article
      style={{
        height: ITEM_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '0.75rem',
        borderBottom: '1px solid #f1f5f9',
        background: SEVERITY_COLORS[incident.severity] ?? '#fff',
      }}
    >
      <strong style={{ flex: 1 }}>{incident.title}</strong>
      <span
        style={{
          fontSize: '0.75rem',
          padding: '2px 6px',
          borderRadius: 4,
          background: 'rgba(0,0,0,0.06)',
        }}
      >
        {incident.severity}
      </span>
      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
        {new Date(incident.timestamp).toLocaleTimeString()}
      </span>
    </article>
  );
});

// Buena práctica: el componente de lista está memoizado para no re-renderizarse
// cuando cambia estado del padre que no afecta a este árbol (ej. campo de búsqueda
// mientras el usuario escribe y filteredIncidents no cambia aún).
function IncidentFeedComponent({ incidents }) {
  const [scrollTop, setScrollTop] = useState(0);
  const renders = useRef(0);
  renders.current += 1;

  const { visibleItems, offsetTop, totalHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + OVERSCAN * 2;
    const end = Math.min(incidents.length, start + visibleCount);

    return {
      visibleItems: incidents.slice(start, end),
      offsetTop: start * ITEM_HEIGHT,
      totalHeight: incidents.length * ITEM_HEIGHT,
    };
  }, [incidents, scrollTop]);

  return (
    <section>
      <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 0.5rem' }}>
        Nodos en DOM: <strong>{visibleItems.length}</strong> · Renders del feed:{' '}
        <strong>{renders.current}</strong>
      </p>

      <div
        style={{ height: VIEWPORT_HEIGHT, overflowY: 'auto', border: '1px solid #d1d5db', borderRadius: 6 }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
            {visibleItems.map((incident) => (
              <IncidentRow key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const IncidentFeed = memo(IncidentFeedComponent);
